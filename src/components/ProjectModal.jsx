import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { createPortal } from 'react-dom';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const [coverError, setCoverError] = useState(false);
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Lock body scroll
    const previousOverflow = document.body.style.overflow;
    const previousFocus = document.activeElement;
    document.body.style.overflow = 'hidden';
    contentRef.current.querySelector('button')?.focus();
    const onKeyDown = (event) => {
      if (event.key === 'Escape') onClose();
      if (event.key !== 'Tab') return;
      const controls = [...contentRef.current.querySelectorAll('button, a[href]')];
      const first = controls[0], last = controls.at(-1);
      if (event.shiftKey && document.activeElement === first) { event.preventDefault(); last.focus(); }
      else if (!event.shiftKey && document.activeElement === last) { event.preventDefault(); first.focus(); }
    };
    document.addEventListener('keydown', onKeyDown);

    const tl = gsap.timeline();
    tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.1");

    return () => {
      tl.kill();
      document.removeEventListener('keydown', onKeyDown);
      document.body.style.overflow = previousOverflow;
      previousFocus?.focus();
    };
  }, [onClose]);

  const handleClose = () => {
    gsap.to(modalRef.current, { 
      opacity: 0, 
      duration: 0.3, 
      onComplete: onClose 
    });
  };

  return createPortal(
    <div className="project-modal-overlay" ref={modalRef} onClick={handleClose}>
      <div role="dialog" aria-modal="true" aria-labelledby="project-dialog-title" className="project-modal-content" ref={contentRef} onClick={e => e.stopPropagation()}>
        
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="mono-label modal-id">{project.id}</span>
            <h2 id="project-dialog-title" className="display-large modal-title">{project.title}</h2>
          </div>
          <button className="modal-close interactive mono-label" onClick={handleClose}>CLOSE ×</button>
        </div>

        <div className="modal-body">
          {project.coverImage && !coverError && (
            <div className="modal-cover">
              {/* Fallback to background color if image is missing so it doesn't look broken */}
              <img src={project.coverImage} alt={project.title} onError={() => setCoverError(true)} />
            </div>
          )}
          
          <div className="modal-details-grid">
            <div className="modal-main-text">
              <section>
                <h4 className="mono-label section-label">OVERVIEW</h4>
                <p className="body-large">{project.caseStudy.overview}</p>
              </section>
              <section>
                <h4 className="mono-label section-label">PROBLEM</h4>
                <p>{project.caseStudy.problem}</p>
              </section>
              <section>
                <h4 className="mono-label section-label">SOLUTION</h4>
                <p>{project.caseStudy.solution}</p>
              </section>
              <section>
                <h4 className="mono-label section-label">MY CONTRIBUTION</h4>
                <p>{project.caseStudy.contribution}</p>
              </section>
              <section>
                <h4 className="mono-label section-label">CHALLENGES & OUTCOME</h4>
                <p>{project.caseStudy.challenges}</p>
                <p>{project.caseStudy.outcome}</p>
              </section>
            </div>

            <div className="modal-sidebar">
              <div className="sidebar-group">
                <h4 className="mono-label section-label">TECH STACK</h4>
                <p className="mono-label sidebar-tech">{project.techStack}</p>
              </div>
              
              <div className="sidebar-group modal-actions">
                {project.liveUrl && (
                  <a href={project.liveUrl} target="_blank" rel="noreferrer" className="modal-link interactive mono-label">
                    LIVE PROJECT ↗
                  </a>
                )}
                {project.githubUrl && (
                  <a href={project.githubUrl} target="_blank" rel="noreferrer" className="modal-link interactive mono-label">
                    GITHUB REPO ↗
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>,
    document.body
  );
};

export default ProjectModal;
