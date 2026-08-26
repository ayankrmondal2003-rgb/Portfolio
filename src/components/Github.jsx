import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Github.css';

const Github = () => {
  const sectionRef = useRef(null);
  const areasRef = useRef([]);
  areasRef.current = [];

  const addToRefs = (el) => {
    if (el && !areasRef.current.includes(el)) {
      areasRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic overlay for Github section
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.80,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 100 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 30%",
            scrub: 1
          }
        }
      );
      
      areasRef.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, x: -20 },
          {
            opacity: 1, x: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 60%",
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section github-section" ref={sectionRef}>
      <div className="container github-container">
        <div className="github-left">
          <h2 className="display-large">CODE<br/>IN MOTION.</h2>
          <div className="github-stats mono-label">
            <span className="github-stat-number">{portfolioData.github.repoCount}</span>
            <span>PUBLIC REPOSITORIES</span>
          </div>
          
          <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="github-cta interactive mono-label">
            EXPLORE GITHUB ↗
          </a>
        </div>
        
        <div className="github-right">
          <div className="github-areas-title mono-label">AREAS OF FOCUS</div>
          <div className="github-areas-list display-large">
            {portfolioData.github.areas.map((area, index) => (
              <div key={index} className="github-area-item" ref={addToRefs}>
                {area}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Github;
