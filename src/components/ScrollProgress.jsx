import React, { useEffect, useState } from 'react';
import './ScrollProgress.css';

const ScrollProgress = () => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
      
      if (maxScroll <= 0) return;
      
      const scrollProgress = Math.max(0, Math.min(1, scrollY / maxScroll));
      setProgress(scrollProgress * 100);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="scroll-progress-container">
      <span className="mono-label progress-label">01</span>
      <div className="progress-track">
        <div 
          className="progress-fill" 
          style={{ height: `${progress}%` }}
        />
        <div 
          className="progress-indicator" 
          style={{ top: `${progress}%` }}
        />
      </div>
      <span className="mono-label progress-label">09</span>
    </div>
  );
};

export default ScrollProgress;
