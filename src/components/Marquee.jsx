import React from 'react';
import { portfolioData } from '../data/portfolioData';
import './Marquee.css';

const Marquee = () => {
  return (
    <div className="marquee-container">
      <div className="marquee-content mono-label">
        <span>{portfolioData.marquee}</span>
        <span>{portfolioData.marquee}</span>
        <span>{portfolioData.marquee}</span>
        <span>{portfolioData.marquee}</span>
      </div>
    </div>
  );
};

export default Marquee;
