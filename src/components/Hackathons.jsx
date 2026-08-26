import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Hackathons.css';

const Hackathons = () => {
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
      // Dynamic overlay for Hackathons
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.50,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

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

      // Light up each item as it scrolls into view
      itemsRef.current.forEach((el) => {
        const dot = el.querySelector('.timeline-dot');
        const content = el.querySelector('.timeline-content-wrapper');

        gsap.fromTo([dot, content],
          { opacity: 0.3, filter: 'grayscale(100%)' },
          {
            opacity: 1,
            filter: 'grayscale(0%)',
            scrollTrigger: {
              trigger: el,
              start: "top center",
              end: "bottom center",
              scrub: true
            }
          }
        );
      });
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section hackathons-section" id="hackathons" ref={sectionRef}>
      <div className="container">
        <div className="hackathons-header">
          <h2 className="display-large">BUILT<br/>UNDER PRESSURE.</h2>
          <div className="mono-label hackathons-subtitle">HACKATHON JOURNEY</div>
        </div>
        
        <div className="timeline-container">
          <div className="timeline-line"></div>
          
          <div className="timeline-items">
            {portfolioData.hackathons.map((item, index) => (
              <div 
                key={index} 
                className="timeline-item"
                ref={addToRefs}
              >
                <div className="timeline-dot"></div>
                <div className="timeline-content-wrapper">
                  <div className="timeline-year display-large">{item.year}</div>
                  <div className="timeline-content">
                    <h3 className="timeline-item-title">{item.title}</h3>
                    <div className="timeline-item-status mono-label">{item.status}</div>
                    <p className="timeline-item-desc body-large">{item.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hackathons;
