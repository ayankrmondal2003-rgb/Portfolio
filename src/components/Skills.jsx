import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Skills.css';

const Skills = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic overlay for Capabilities section
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.40,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      gsap.fromTo(sectionRef.current,
        { opacity: 0, scale: 0.95 },
        {
          opacity: 1,
          scale: 1,
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
    <section className="section skills-section" id="capabilities" ref={sectionRef}>
      <div className="container">
        <h2 className="display-large skills-title">THE TOOLKIT</h2>
        
        <div className="skills-grid">
          {Object.entries(portfolioData.capabilities).map(([category, skills]) => (
            <div key={category} className="skill-category">
              <h3 className="mono-label category-title">{category}</h3>
              <div className="skill-list">
                {skills.map((skill, index) => (
                  <span key={index} className="skill-item">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Skills;
