import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Timeline.css';

const Timeline = () => {
  const sectionRef = useRef(null);
  const itemsRef = useRef([]);
  itemsRef.current = [];

  const addToRefs = (el) => {
    if (el && !itemsRef.current.includes(el)) {
      itemsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Timeline vertical line grow
      gsap.fromTo('.timeline-line',
        { scaleY: 0 },
        {
          scaleY: 1,
          ease: "none",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "bottom 80%",
            scrub: true
          }
        }
      );

      // Fade in each item
      itemsRef.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, x: -50 },
          {
            opacity: 1,
            x: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 50%",
              scrub: 1
            }
          }
        );
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section timeline-section" id="journey" ref={sectionRef}>
      <div className="container">
        <h2 className="display-large timeline-title">THE JOURNEY</h2>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-items">
            {portfolioData.journey.map((item, index) => (
              <div 
                key={index} 
                className="timeline-item"
                ref={addToRefs}
              >
                <div className="timeline-year display-large">{item.year}</div>
                <div className="timeline-text body-large">{item.text}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Timeline;
