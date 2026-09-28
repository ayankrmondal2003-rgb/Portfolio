import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Hero.css';

const Hero = () => {
  const sectionRef = useRef(null);
  const titleRefs = useRef([]);
  titleRefs.current = [];

  const addToRefs = (el) => {
    if (el && !titleRefs.current.includes(el)) {
      titleRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial video overlay opacity
      gsap.set('#global-video-overlay', { '--overlay-opacity': 0.25 });

      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Animate the huge name parts dynamically
      tl.fromTo(titleRefs.current[0],
        { x: -200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 }
      )
      .fromTo(titleRefs.current[1],
        { x: 200, opacity: 0 },
        { x: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(titleRefs.current[2],
        { y: 100, opacity: 0, clipPath: 'inset(100% 0 0 0)' },
        { y: 0, opacity: 1, clipPath: 'inset(0% 0 0 0)', duration: 1 },
        "-=0.5"
      );

      // Fade out on scroll away
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
    <section className="section hero-section" ref={sectionRef}>
      <div className="container hero-container">

        <div className="hero-top">
          {portfolioData.availability.enabled && (
            <div className="hero-availability mono-label">
              <span className="pulse-dot"></span>
              {portfolioData.availability.text}
            </div>
          )}
          <div className="hero-info-right">
            <div className="hero-metadata mono-label">
              <span>{portfolioData.hero.metadata.course}</span>
              <span>{portfolioData.hero.metadata.university}</span>
              <span>{portfolioData.hero.metadata.batch}</span>
            </div>
            <div className="hero-roles">
              {portfolioData.hero.roles.map((role, i) => (
                <span key={i} className="mono-label hero-role-item">{role}</span>
              ))}
            </div>
          </div>
        </div>

        <div className="hero-middle">
          <div className="hero-identity">
          <p className="mono-label hero-eyebrow">Independent mind. Practical intelligence.</p>
          <h1 className="hero-titles" aria-label="Ayan Kumar Mondal">
            {portfolioData.hero.name.map((part, index) => (
              <span
                key={index}
                className="display-huge hero-name"
                ref={addToRefs}
              >
                {part}
              </span>
            ))}
          </h1>
          </div>
        </div>

        <div className="hero-bottom">
          <div className="hero-desc-container">
            <p className="hero-desc">{portfolioData.hero.description}</p>
            <p className="hero-tags mono-label">{portfolioData.hero.tags}</p>
          </div>
          <div className="hero-actions">
            <a href="#work" className="mono-label interactive hero-link">EXPLORE WORK ↓</a>
            <a href={portfolioData.contact.cvUrl} target="_blank" rel="noreferrer" className="mono-label interactive hero-link">VIEW CV ↗</a>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Hero;
