import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CustomCursor.css';

const CustomCursor = () => {
  const cursorRef = useRef(null);
  const textRef = useRef(null);
  const [cursorText, setCursorText] = useState('');

  useEffect(() => {
    // Disable on touch devices
    if ('ontouchstart' in window || navigator.maxTouchPoints > 0) return;
    
    // Only on desktop
    if (window.innerWidth <= 768) return;

    const cursor = cursorRef.current;
    const textEl = textRef.current;
    
    const onMouseMove = (e) => {
      gsap.to(cursor, {
        x: e.clientX,
        y: e.clientY,
        duration: 0.1,
        ease: "power2.out"
      });
    };

    const onMouseOver = (e) => {
      const link = e.target.closest('a');
      const btn = e.target.closest('button');
      const interactive = e.target.closest('.interactive');
      const projectCard = e.target.closest('.view-cursor');
      const credCard = e.target.closest('.open-cursor');

      if (projectCard) {
        setCursorText('VIEW');
        gsap.to(cursor, { scale: 3.5, backgroundColor: "var(--accent-magenta)", borderColor: "var(--accent-magenta)", duration: 0.3 });
      } else if (credCard) {
        setCursorText('OPEN');
        gsap.to(cursor, { scale: 3.5, backgroundColor: "var(--accent-cyan)", borderColor: "var(--accent-cyan)", duration: 0.3 });
      } else if (link && link.target === '_blank') {
        setCursorText('↗');
        gsap.to(cursor, { scale: 2.5, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#fff", duration: 0.3 });
      } else if (link || btn || interactive) {
        setCursorText('');
        gsap.to(cursor, { scale: 2, backgroundColor: "rgba(255,255,255,0.1)", borderColor: "#fff", duration: 0.3 });
      }
    };

    const onMouseOut = (e) => {
      const link = e.target.closest('a');
      const btn = e.target.closest('button');
      const interactive = e.target.closest('.interactive');
      const projectCard = e.target.closest('.view-cursor');
      const credCard = e.target.closest('.open-cursor');

      if (link || btn || interactive || projectCard || credCard) {
        setCursorText('');
        gsap.to(cursor, {
          scale: 1,
          backgroundColor: "transparent",
          borderColor: "#fff",
          duration: 0.3
        });
      }
    };

    window.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mouseover', onMouseOver);
    document.addEventListener('mouseout', onMouseOut);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseover', onMouseOver);
      document.removeEventListener('mouseout', onMouseOut);
    };
  }, []);

  return (
    <div className="custom-cursor" ref={cursorRef}>
      <span className="cursor-text mono-label" ref={textRef}>{cursorText}</span>
    </div>
  );
};

export default CustomCursor;
