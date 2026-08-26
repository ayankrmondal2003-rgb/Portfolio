import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Philosophy.css';

const Philosophy = () => {
  const sectionRef = useRef(null);
  const wordsRef = useRef([]);
  wordsRef.current = [];

  const addToRefs = (el) => {
    if (el && !wordsRef.current.includes(el)) {
      wordsRef.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 60%",
          end: "bottom 40%",
          scrub: 1
        }
      });

      tl.fromTo(wordsRef.current,
        { opacity: 0, y: 50 },
        { opacity: 1, y: 0, stagger: 0.2, duration: 1 }
      );
      
      // The line grows
      gsap.fromTo('.philosophy-line', 
        { scaleY: 0 },
        { scaleY: 1, ease: "none", scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 50%",
            end: "bottom 50%",
            scrub: true
          }
        }
      );

      gsap.to(sectionRef.current, {
        opacity: 0,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "bottom 50%",
          end: "bottom top",
          scrub: true
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const statement1 = "I DON'T JUST BUILD PROJECTS.".split(' ');
  const statement2 = "I BUILD EXPERIENCES.".split(' ');

  return (
    <section className="section philosophy-section" ref={sectionRef}>
      <div className="philosophy-line"></div>
      <div className="container philosophy-container">
        <h2 className="display-large philosophy-text">
          {statement1.map((word, i) => (
            <span key={`1-${i}`} className="word" ref={addToRefs}>{word}&nbsp;</span>
          ))}
          <br/>
          {statement2.map((word, i) => (
            <span key={`2-${i}`} className="word accent-word" ref={addToRefs}>{word}&nbsp;</span>
          ))}
        </h2>
      </div>
    </section>
  );
};

export default Philosophy;
