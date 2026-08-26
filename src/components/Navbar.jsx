import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import './Navbar.css';

const Navbar = () => {
  const navRef = useRef(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // Initial entrance animation
    gsap.fromTo(navRef.current, 
      { y: -100, opacity: 0 }, 
      { y: 0, opacity: 1, duration: 1, delay: 2.5, ease: "power3.out" }
    );
  }, []);

  const toggleMenu = () => setMenuOpen(!menuOpen);

  return (
    <>
      <nav className="navbar" ref={navRef}>
        <div className="navbar-logo">
          <a href="#" className="interactive display-large" style={{ fontSize: '1.5rem' }}>AKM.</a>
        </div>
        


        <div className="navbar-links desktop-only mono-label">
          <a href="#about" className="interactive nav-link">ABOUT</a>
          <a href="#work" className="interactive nav-link">WORK</a>
          <a href="#hackathons" className="interactive nav-link">HACKATHONS</a>
          <a href="#credentials" className="interactive nav-link">CREDENTIALS</a>
          <a href="#contact" className="interactive nav-link">CONTACT</a>
        </div>

        <button className="mobile-menu-btn interactive mono-label mobile-only" onClick={toggleMenu}>
          {menuOpen ? 'CLOSE' : 'MENU'}
        </button>
      </nav>

      {/* Fullscreen Mobile Menu */}
      <div className={`mobile-menu ${menuOpen ? 'is-open' : ''}`}>
        <div className="mobile-menu-links display-large">
          <a href="#about" onClick={toggleMenu}><span className="mono-label">01</span> ABOUT</a>
          <a href="#work" onClick={toggleMenu}><span className="mono-label">02</span> WORK</a>
          <a href="#hackathons" onClick={toggleMenu}><span className="mono-label">03</span> HACKATHONS</a>
          <a href="#credentials" onClick={toggleMenu}><span className="mono-label">04</span> CREDENTIALS</a>
          <a href="#contact" onClick={toggleMenu}><span className="mono-label">05</span> CONTACT</a>
        </div>
        <div className="mobile-menu-footer mono-label">
          <a href={portfolioData.contact.github} target="_blank" rel="noreferrer">GITHUB ↗</a>
          <a href={portfolioData.contact.linkedin} target="_blank" rel="noreferrer">LINKEDIN ↗</a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
