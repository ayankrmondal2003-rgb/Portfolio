import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Contact.css';

const Contact = () => {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Background transitions to solid black at the very end
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.95,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });
      
      gsap.fromTo(sectionRef.current,
        { backgroundColor: 'rgba(5, 5, 5, 0)' },
        {
          backgroundColor: 'rgba(5, 5, 5, 1)',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 60%",
            end: "top 20%",
            scrub: true
          }
        }
      );
      
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section contact-section" id="contact" ref={sectionRef}>
      <div className="container contact-container">
        
        <div className="contact-main">
          <p className="mono-label section-kicker">The next good idea starts with a conversation</p>
          <h2 className="display-huge contact-title">Let’s build<br/><span>what’s next.</span></h2>
          
          <p className="body-large contact-desc">
            AI project? Hackathon? Product idea? Research collaboration? Let's talk.
          </p>
          
          <div className="contact-links mono-label">
            <a href={`mailto:${portfolioData.contact.email}`} className="interactive contact-link">{portfolioData.contact.email} ↗</a>
            <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer" className="interactive contact-link">LINKEDIN ↗</a>
            <a href={portfolioData.contact.github} target="_blank" rel="noreferrer" className="interactive contact-link">GITHUB ↗</a>
            {portfolioData.contact.cvUrl && (
              <a href={portfolioData.contact.cvUrl} target="_blank" rel="noreferrer" className="interactive contact-link">VIEW CV ↗</a>
            )}
          </div>
        </div>
        
        <footer className="footer">
          <div className="mono-label footer-info">
            <span>{portfolioData.contact.location}</span>
            <span style={{ color: 'var(--text-muted)' }}>{portfolioData.contact.email}</span>
          </div>
          <div className="mono-label footer-copy">
            AYAN KUMAR MONDAL © 2026<br/>
            <span style={{ color: 'var(--text-muted)' }}>DESIGNED WITH CURIOSITY. BUILT WITH CODE.</span>
          </div>
        </footer>
      </div>
    </section>
  );
};

export default Contact;
