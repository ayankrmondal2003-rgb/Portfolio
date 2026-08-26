import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Loader.css';

const Loader = () => {
  const [loading, setLoading] = useState(true);
  const loaderRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.to(text1Ref.current, { opacity: 1, y: 0, duration: 1, ease: "power2.out", delay: 0.5 })
      .to(text1Ref.current, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, "+=0.5")
      
      .to(text2Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      .to(text2Ref.current, { opacity: 0, y: -20, duration: 0.5, ease: "power2.in" }, "+=0.5")
      
      .to(text3Ref.current, { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" })
      
      // Keep "SCROLL TO ENTER" visible briefly, then slide up loader
      .to(loaderRef.current, {
        yPercent: -100,
        duration: 1.5,
        ease: "power4.inOut",
        delay: 1,
        onComplete: () => setLoading(false)
      });

  }, []);

  if (!loading) return null;

  return (
    <div className="loader-container" ref={loaderRef}>
      <div className="loader-sequence">
        <h1 className="loader-title" ref={text1Ref} style={{ opacity: 0, transform: 'translateY(20px)' }}>AKM.</h1>
        <div className="loader-text mono-label" ref={text2Ref} style={{ opacity: 0, transform: 'translateY(20px)' }}>PORTFOLIO / 2026</div>
        <div className="loader-text mono-label" ref={text3Ref} style={{ opacity: 0, transform: 'translateY(20px)' }}>SCROLL TO ENTER</div>
      </div>
    </div>
  );
};

export default Loader;
