import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import './ProjectModal.css';

const ProjectModal = ({ project, onClose }) => {
  const modalRef = useRef(null);
  const contentRef = useRef(null);

  useEffect(() => {
    // Lock body scroll
    document.body.style.overflow = 'hidden';

    const tl = gsap.timeline();
    tl.fromTo(modalRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3, ease: "power2.out" })
      .fromTo(contentRef.current, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 0.4, ease: "power3.out" }, "-=0.1");

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
    <div className="project-modal-overlay" ref={modalRef} onClick={handleClose}>
      <div className="project-modal-content" ref={contentRef} onClick={e => e.stopPropagation()}>
        
        <div className="modal-header">
          <div className="modal-title-group">
            <span className="mono-label modal-id">{project.id}</span>
            <h2 className="display-large modal-title">{project.title}</h2>
          </div>
          <button className="modal-close interactive mono-label" onClick={handleClose}>CLOSE ×</button>
        </div>

        <div className="modal-body">
          {project.coverImage && (
            <div className="modal-cover">
              {/* Fallback to background color if image is missing so it doesn't look broken */}
              <img src={project.coverImage} alt={project.title} onError={(e) => e.target.style.display = 'none'} />
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
    </div>
  );
};

export default ProjectModal;
