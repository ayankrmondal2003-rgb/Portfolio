import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import './CredentialViewer.css';

const CredentialViewer = ({ credential, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);
  const [showPdf, setShowPdf] = useState(false);

  useEffect(() => {
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .fromTo(contentRef.current, { scale: 0.95, opacity: 0 }, { scale: 1, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.1");

    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  const handleClose = () => {
    gsap.to(modalRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      onComplete: onClose 
    });
  };

  return (
    <div className="credential-modal-overlay" ref={modalRef} onClick={handleClose}>
      <div className="credential-modal-content" ref={contentRef} onClick={e => e.stopPropagation()}>
        
        <div className="cred-modal-header">
          <div className="cred-modal-title-group">
            <span className="mono-label cred-modal-id">{credential.id}</span>
            <h2 className="display-large cred-modal-title">{credential.title}</h2>
          </div>
          <button className="cred-modal-close interactive mono-label" onClick={handleClose}>CLOSE ×</button>
        </div>

        <div className="cred-modal-body">
          <div className="cred-modal-meta mono-label">
            <div className="cred-meta-item">
              <span>ISSUER</span>
              <span className="meta-value">{credential.issuer}</span>
            </div>
            <div className="cred-meta-item">
              <span>YEAR</span>
              <span className="meta-value">{credential.year}</span>
            </div>
            {credential.duration && (
              <div className="cred-meta-item">
                <span>DURATION</span>
                <span className="meta-value">{credential.duration}</span>
              </div>
            )}
            <div className="cred-meta-item">
              <span>TYPE</span>
              <span className="meta-value">{credential.type}</span>
            </div>
          </div>

          <div className="cred-modal-preview">
            {!showPdf ? (
              <div className="cred-thumbnail-large">
                {credential.thumbnail ? (
                   <img src={credential.thumbnail} alt={credential.title} onError={(e) => e.target.style.display = 'none'} />
                ) : (
                  <div className="cred-placeholder-large">NO PREVIEW AVAILABLE</div>
                )}
              </div>
            ) : (
              <div className="cred-pdf-viewer">
                {credential.originalFile ? (
                  <iframe src={credential.originalFile} title={credential.title} className="pdf-iframe" />
                ) : (
                  <div className="cred-placeholder-large">ORIGINAL FILE MISSING</div>
                )}
              </div>
            )}
          </div>

          <div className="cred-modal-actions mono-label">
            {credential.originalFile && (
              <button 
                className="cred-action-btn interactive" 
                onClick={() => setShowPdf(!showPdf)}
              >
                {showPdf ? 'HIDE ORIGINAL PDF' : 'VIEW ORIGINAL PDF'}
              </button>
            )}
            {credential.verifyUrl && (
              <a 
                href={credential.verifyUrl} 
                target="_blank" 
                rel="noreferrer" 
                className="cred-action-btn interactive"
              >
                VERIFY CREDENTIAL ↗
              </a>
            )}
          </div>
        </div>

      </div>
    </div>
  );
};

export default CredentialViewer;
