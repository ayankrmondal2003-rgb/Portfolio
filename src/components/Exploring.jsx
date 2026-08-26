import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Exploring.css';

const Exploring = () => {
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
      // Dynamic overlay for Exploring section
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.85,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      gsap.fromTo(sectionRef.current,
        { opacity: 0 },
        {
          opacity: 1,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
      
      itemsRef.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 30 },
          {
            opacity: 1, y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 90%",
              end: "top 70%",
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section exploring-section" ref={sectionRef}>
      <div className="container">
        <h2 className="display-large exploring-title">
          CURRENTLY<br/>EXPLORING.
        </h2>
        
        <div className="exploring-list">
          {portfolioData.exploring.map((item, index) => (
            <div key={index} className="exploring-item display-large" ref={addToRefs}>
              {item}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Exploring;
