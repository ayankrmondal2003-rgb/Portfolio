import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './StatsGraphic.css';

const StatsGraphic = () => {
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
      itemsRef.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 40%",
              scrub: 1
            }
          }
        );
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const stats = [
    { number: "24H", label: "OFFLINE FINALE" },
    { number: "48H", label: "AI BUILD" },
    { number: "04", label: "FEATURED PROJECTS" }
  ];

  return (
    <section className="section stats-graphic-section" ref={sectionRef}>
      <div className="container stats-container">
        {stats.map((stat, index) => (
          <div key={index} className="stat-block" ref={addToRefs}>
            <div className="stat-number display-huge">{stat.number}</div>
            <div className="stat-label mono-label">{stat.label}</div>
            {index < stats.length - 1 && <div className="stat-divider"></div>}
          </div>
        ))}
      </div>
    </section>
  );
};

export default StatsGraphic;
