import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

import ScrollVideo from './components/ScrollVideo';
import Loader from './components/Loader';
import CustomCursor from './components/CustomCursor';
import ScrollProgress from './components/ScrollProgress';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Marquee from './components/Marquee';
import Projects from './components/Projects';
import StatsGraphic from './components/StatsGraphic';
import Hackathons from './components/Hackathons';
import Education from './components/Education';
import Credentials from './components/Credentials';
import Github from './components/Github';
import Exploring from './components/Exploring';
import Contact from './components/Contact';

gsap.registerPlugin(ScrollTrigger);

function App() {
  const mainRef = useRef(null);

  useEffect(() => {
    // Optional: Refresh ScrollTrigger on resize or after load
    ScrollTrigger.refresh();
  }, []);

  return (
    <>
      <Loader />
      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      
      {/* 
        This wrapper creates the scrollable area.
        We make it very tall so there is enough "scrubbing" distance. 
      */}
      <div className="cinematic-container" ref={mainRef}>
        <ScrollVideo />
        
        {/* All content scrolls over the fixed video */}
        <div className="content-layer">
          <Hero />
          
          <div className="chapter-marker mono-label">CHAPTER / 01 — WHO I AM</div>
          <About />
          <Skills />
          
          <Marquee />
          
          <div className="chapter-marker mono-label">CHAPTER / 02 — SELECTED WORK</div>
          <Projects />
          
          <div className="chapter-marker mono-label">CHAPTER / 03 — BUILT UNDER PRESSURE</div>
          <Hackathons />
          
          <StatsGraphic />
          
          <div className="chapter-marker mono-label">CHAPTER / 04 — PROOF OF PROGRESS</div>
          <Education />
          <Credentials />
          
          <Marquee />
          
          <div className="chapter-marker mono-label">CHAPTER / 05 — CODE & CURIOSITY</div>
          <Github />
          <Exploring />
          
          <Contact />
        </div>
      </div>
    </>
  );
}

export default App;
