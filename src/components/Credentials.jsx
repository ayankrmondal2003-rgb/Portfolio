import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import CredentialViewer from './CredentialViewer';
import './Credentials.css';

const Credentials = () => {
  const sectionRef = useRef(null);
  const [filter, setFilter] = useState('ALL');
  const [activeCredential, setActiveCredential] = useState(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic overlay for Credentials section (darker)
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.75,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      gsap.fromTo(sectionRef.current,
        { opacity: 0, y: 50 },
        {
          opacity: 1,
          y: 0,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
            end: "top 40%",
            scrub: 1
          }
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const filteredCredentials = filter === 'ALL' 
    ? portfolioData.credentials 
    : portfolioData.credentials.filter(c => c.type === filter);

  return (
    <section className="section credentials-section" id="credentials" ref={sectionRef}>
      <div className="container">
        <h2 className="display-large credentials-title">
          PROOF OF<br/>PROGRESS.
        </h2>
        <div className="credentials-subtitle mono-label">
          COURSES • CERTIFICATES • HACKATHONS
        </div>

        <div className="credentials-filters mono-label">
          {['ALL', 'COURSES', 'HACKATHONS'].map(f => (
            <button 
              key={f}
              className={`filter-btn interactive ${filter === f ? 'active' : ''}`}
              onClick={() => setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="credentials-grid">
          {filteredCredentials.slice(0, 6).map((cred) => (
            <div 
              key={cred.id} 
              className="credential-card open-cursor"
              onClick={() => setActiveCredential(cred)}
            >
              <div className="credential-thumbnail-wrapper">
                {cred.thumbnail ? (
                  <img src={cred.thumbnail} alt={cred.title} className="credential-thumbnail" onError={(e) => e.target.style.display = 'none'} />
                ) : (
                  <div className="credential-placeholder"></div>
                )}
                <div className="credential-overlay">
                  <span className="mono-label">VIEW CREDENTIAL ↗</span>
                </div>
              </div>
              <div className="credential-info">
                <div className="credential-meta mono-label">
                  <span style={{ color: 'var(--accent-cyan)' }}>{cred.id}</span>
                  <span>{cred.year}</span>
                </div>
                <h4 className="credential-name">{cred.title}</h4>
                <div className="credential-issuer mono-label">{cred.issuer}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {activeCredential && (
        <CredentialViewer 
          credential={activeCredential} 
          onClose={() => setActiveCredential(null)} 
        />
      )}
    </section>
  );
};

export default Credentials;
