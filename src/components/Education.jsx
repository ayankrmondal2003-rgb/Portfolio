import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Education.css';

const Education = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic overlay for Education section
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.60,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section education-section" ref={sectionRef}>
      <div className="container">
        
        <h2 className="display-large education-title">
          THE<br/>FOUNDATION.
        </h2>
        
        <div className="education-content">
          <div className="education-bg-graphic display-huge">2026</div>
          
          <div className="education-details">
            <h3 className="education-degree display-large" style={{ fontSize: '2rem', marginBottom: '20px' }}>
              {portfolioData.education.degree}
            </h3>
            
            <div className="education-meta mono-label">
              <p>{portfolioData.education.major}</p>
              <p className="education-highlight">{portfolioData.education.specialization}</p>
            </div>
            
            <div className="education-institute mono-label">
              <p>{portfolioData.education.institute}</p>
              <p>{portfolioData.education.period}</p>
              <p style={{ color: 'var(--accent-magenta)', marginTop: '10px' }}>{portfolioData.education.status}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Education;
