import React, { useEffect, useRef, useState } from 'react';
import './ScrollVideo.css';

const ScrollVideo = () => {
  const canvasRef = useRef(null);
  const imagesRef = useRef([]);
  const frameCount = 240; // Total frames
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Preload images
    const currentFrame = index => `/frames/frame_${index.toString().padStart(3, '0')}.jpg`;
    const images = [];
    let loadedCount = 0;

    for (let i = 1; i <= frameCount; i++) {
      const img = new Image();
      img.src = currentFrame(i);
      img.onload = () => {
        loadedCount++;
        if (loadedCount === frameCount) {
          setLoaded(true);
        }
      };
      images[i] = img;
    }
    imagesRef.current = images;
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas || !loaded) return;

    const context = canvas.getContext('2d');
    
    // Set canvas dimensions based on first image
    if (imagesRef.current[1]) {
      canvas.width = imagesRef.current[1].width;
      canvas.height = imagesRef.current[1].height;
      context.drawImage(imagesRef.current[1], 0, 0);
    }

    let animationFrameId;

    const render = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll > 0) {
        const scrollFraction = Math.max(0, Math.min(1, scrollY / maxScroll));
        let frameIndex = Math.min(
          frameCount - 1,
          Math.floor(scrollFraction * frameCount)
        ) + 1;

        if (frameIndex < 1) frameIndex = 1;
        if (frameIndex > frameCount) frameIndex = frameCount;

        if (imagesRef.current[frameIndex] && imagesRef.current[frameIndex].complete) {
          context.drawImage(imagesRef.current[frameIndex], 0, 0);
        }
      }
      
      animationFrameId = requestAnimationFrame(render);
    };

    animationFrameId = requestAnimationFrame(render);

    return () => cancelAnimationFrame(animationFrameId);
  }, [loaded]);

  return (
    <div className="scroll-video-container" id="global-video-container">
      <canvas
        ref={canvasRef}
        className="scroll-video"
      />
      {/* 
        This overlay opacity is controlled dynamically by GSAP 
        in App.jsx or individual components using CSS variables.
      */}
      <div className="video-overlay" id="global-video-overlay" />
      <div className="video-vignette" />
    </div>
  );
};

export default ScrollVideo;
