import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './Statement.css';

const Statement = () => {
  const sectionRef = useRef(null);
  const text1Ref = useRef(null);
  const text2Ref = useRef(null);
  const text3Ref = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top 70%",
          end: "bottom 30%",
          scrub: 1
        }
      });

      tl.fromTo(text1Ref.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
        .fromTo(text2Ref.current, { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 1 })
        .to([text1Ref.current, text2Ref.current], { opacity: 0, duration: 1 }, "+=0.5")
        .fromTo(text3Ref.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1 });
        
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section statement-section" ref={sectionRef}>
      <div className="container statement-container">
        <div className="statement-block" ref={text1Ref}>
          <h2 className="display-large">CURIOUS ENOUGH<br/>TO QUESTION.</h2>
        </div>
        
        <div className="statement-block" ref={text2Ref}>
          <h2 className="display-large" style={{ color: 'var(--accent-primary)' }}>STUBBORN ENOUGH<br/>TO BUILD.</h2>
        </div>
        
        <div className="statement-final" ref={text3Ref}>
          <h1 className="display-huge" style={{ WebkitTextStroke: '2px #fff', color: 'transparent' }}>ALWAYS<br/>LEARNING.</h1>
        </div>
      </div>
    </section>
  );
};

export default Statement;
