import React, { useEffect, useRef } from 'react';
import './ScrollVideo.css';

const FRAME_COUNT = 240;
const CACHE_LIMIT = 48;
const PREFETCH_RADIUS = 18;

const ScrollVideo = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext('2d', { alpha: false });
    if (!context) return;

    // Cap decoded image memory as well as the canvas drawing cost.
    const width = Math.min(960, Math.round(window.innerWidth * Math.min(window.devicePixelRatio || 1, 1.5)));
    canvas.width = width;
    canvas.height = Math.round(width * 9 / 16);
    const frames = new Map();
    const pending = new Set();
    const failed = new Set();
    // Retain compressed frames so reversing scroll never refetches an image.
    const sources = new Map();
    const controller = new AbortController();
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    let disposed = false;
    let animationId = null;
    let lastTime = 0;
    let lastDraw = '';
    let maxScroll = 1;
    let target = 1;
    let position = 1;
    let velocity = 0;

    const schedule = () => {
      if (!disposed && !document.hidden && animationId === null) {
        animationId = requestAnimationFrame(render);
      }
    };

    const wantedFrames = () => {
      const wanted = new Set();
      // Decode visible frames first, then the destination and its neighbors.
      for (const center of [position, target]) {
        wanted.add(Math.floor(center));
        wanted.add(Math.min(FRAME_COUNT, Math.floor(center) + 1));
      }
      const direction = target >= position ? 1 : -1;
      // Buffer the path ahead, rather than spending most slots at the destination.
      for (let offset = 1; offset <= PREFETCH_RADIUS; offset++) {
        wanted.add(Math.max(1, Math.min(FRAME_COUNT, Math.round(position) + offset * direction)));
      }
      for (let offset = 1; offset <= PREFETCH_RADIUS; offset++) {
        wanted.add(Math.max(1, Math.min(FRAME_COUNT, Math.round(position) - offset * direction)));
        wanted.add(Math.max(1, Math.min(FRAME_COUNT, Math.round(target) + offset * direction)));
      }
      return [...wanted].slice(0, CACHE_LIMIT);
    };

    const loadFrame = async (index) => {
      pending.add(index);
      try {
        let source = sources.get(index);
        if (!source) {
          const response = await fetch(`${import.meta.env.BASE_URL}frames-smooth/frame_${String(index).padStart(3, '0')}.jpg`, { signal: controller.signal });
          if (!response.ok) throw new Error(`Frame ${index} unavailable`);
          source = await response.blob();
          if (disposed) return;
          sources.set(index, source);
        }
        const bitmap = await createImageBitmap(source, {
          resizeWidth: canvas.width,
          resizeHeight: canvas.height,
          resizeQuality: 'medium',
        });
        if (disposed) {
          bitmap.close();
          return;
        }
        frames.set(index, bitmap);
        const wanted = wantedFrames();
        while (frames.size > CACHE_LIMIT) {
          const stale = [...frames.keys()].find(key => !wanted.includes(key));
          const key = stale ?? frames.keys().next().value;
          frames.get(key).close();
          frames.delete(key);
        }
        schedule();
      } catch (error) {
        if (!disposed && error.name !== 'AbortError') failed.add(index);
      } finally {
        pending.delete(index);
        if (!disposed) preload();
      }
    };

    const preload = () => {
      if (document.hidden) return;
      for (const index of wantedFrames()) {
        if (pending.size >= 3) break;
        if (!frames.has(index) && !pending.has(index) && !failed.has(index)) {
          void loadFrame(index);
        }
      }
    };

    function render(time) {
      animationId = null;
      const delta = lastTime ? Math.min(time - lastTime, 64) : 16.67;
      lastTime = time;
      // Analytic critically damped spring: continuous velocity, including reversals,
      // and the same response on 60 Hz and 120 Hz displays.
      const frequency = 1 / 95;
      const displacement = position - target;
      const spring = velocity + frequency * displacement;
      const decay = Math.exp(-frequency * delta);
      position = target + (displacement + spring * delta) * decay;
      velocity = (velocity - frequency * spring * delta) * decay;
      position = Math.max(1, Math.min(FRAME_COUNT, position));
      if (reducedMotion.matches || (Math.abs(target - position) < 0.001 && Math.abs(velocity) < 0.0001)) {
        position = target;
        velocity = 0;
      }

      const lower = Math.floor(position);
      const upper = Math.min(FRAME_COUNT, lower + 1);
      let firstIndex = lower;
      let secondIndex = upper;
      if (!frames.has(lower) || !frames.has(upper)) {
        const available = [...frames.keys()].sort((a, b) => a - b);
        // Interpolate across loaded neighbors during buffering instead of snapping
        // abruptly between whichever images happen to finish downloading first.
        firstIndex = available.findLast(index => index <= position) ?? available[0];
        secondIndex = available.find(index => index >= position) ?? available.at(-1);
      }
      const first = frames.get(firstIndex);
      const second = frames.get(secondIndex);
      const blend = secondIndex > firstIndex ? Math.max(0, Math.min(1, (position - firstIndex) / (secondIndex - firstIndex))) : 0;
      const signature = `${firstIndex}:${secondIndex}:${blend}`;
      if (first && signature !== lastDraw) {
        context.globalAlpha = 1;
        context.drawImage(first, 0, 0, canvas.width, canvas.height);
        // Blend adjacent source frames to avoid hard steps during slow scrolling.
        if (second && blend > 0) {
          context.globalAlpha = blend;
          context.drawImage(second, 0, 0, canvas.width, canvas.height);
          context.globalAlpha = 1;
        }
        lastDraw = signature;
      }
      preload();
      if (position !== target) schedule();
      else lastTime = 0;
    }

    const onScroll = () => {
      target = reducedMotion.matches ? 1 : 1 + Math.max(0, Math.min(1, window.scrollY / maxScroll)) * (FRAME_COUNT - 1);
      schedule();
    };
    const measure = () => {
      maxScroll = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      onScroll();
    };
    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(animationId);
        animationId = null;
        lastTime = 0;
      } else measure();
    };
    const resizeObserver = new ResizeObserver(measure);
    resizeObserver.observe(document.body);
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', measure);
    document.addEventListener('visibilitychange', onVisibility);
    reducedMotion.addEventListener('change', onScroll);
    measure();
    position = target;
    preload();

    return () => {
      disposed = true;
      controller.abort();
      cancelAnimationFrame(animationId);
      resizeObserver.disconnect();
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', measure);
      document.removeEventListener('visibilitychange', onVisibility);
      reducedMotion.removeEventListener('change', onScroll);
      frames.forEach(frame => frame.close());
      frames.clear();
      sources.clear();
    };
  }, []);

  return (
    <div className="scroll-video-container" id="global-video-container" aria-hidden="true">
      <canvas ref={canvasRef} className="scroll-video" />
      <div className="video-overlay" id="global-video-overlay" />
      <div className="video-vignette" />
    </div>
  );
};

export default ScrollVideo;
