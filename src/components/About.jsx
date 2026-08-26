import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './About.css';

const About = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic overlay for About section
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.35,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      // Fade and slide in About section
      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 70%",
            end: "top 30%",
            scrub: 1
          }
        }
      );
      
      gsap.to(sectionRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 40%",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section about-section" id="about" ref={sectionRef}>
      <div className="container">
        
        <div className="about-headlines">
          {portfolioData.about.headlines.map((line, i) => (
            <h2 key={i} className="display-large headline-line">{line}</h2>
          ))}
        </div>
        
        <div className="about-content">
          <div className="about-text">
            {portfolioData.about.paragraphs.map((p, i) => (
              <p key={i} className="body-large">{p}</p>
            ))}
          </div>
          
          <div className="about-metadata">
            {Object.entries(portfolioData.about.metadata).map(([key, value]) => (
              <div key={key} className="meta-item">
                <span className="mono-label meta-key">{key}</span>
                <span className="meta-value">{value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
