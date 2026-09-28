import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  projectRefs.current = [];
  const [activeProject, setActiveProject] = useState(null);

  const closeProject = useCallback(() => setActiveProject(null), []);

  const addToRefs = (el) => {
    if (el && !projectRefs.current.includes(el)) {
      projectRefs.current.push(el);
    }
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Dynamic overlay for Projects
      gsap.to('#global-video-overlay', {
        '--overlay-opacity': 0.45,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      // Reveal each project
      projectRefs.current.forEach((el) => {
        gsap.fromTo(el,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: "power2.out",
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              once: true
            }
          }
        );
      });

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className="section projects-section" id="work" ref={sectionRef}>
      <div className="container">
        <div className="work-heading"><div><p className="mono-label section-kicker">Ideas, made real</p><h2 className="display-large projects-title">Selected work<span className="accent-period">.</span></h2></div><p className="work-intro">A selection of experiments and products<br/>across AI, the web and the world around us.</p></div>

        <div className="projects-list">
          {portfolioData.projects.map((project) => (
            <article
              key={project.id}
              className="project-item view-cursor"
              ref={addToRefs}
            >
              <div className="project-grid">
                <div className="project-number display-huge">
                  {project.id}
                </div>
                <div className="project-details">
                  {project.badge && <div className="project-badge mono-label">{project.badge}</div>}
                  <h3 className="project-title">{project.title}</h3>
                  {project.subtitle && <div className="project-subtitle mono-label">{project.subtitle}</div>}
                  <div className="project-meta mono-label">
                    {Object.values(project.metadata).map((meta, i) => (
                      <span key={i}>{meta}</span>
                    ))}
                  </div>
                  <p className="project-desc body-large">{project.description}</p>
                  <div className="project-tech mono-label">
                    {project.techStack}
                  </div>
                  <button type="button" className="case-study-link interactive" onClick={() => setActiveProject(project)} aria-label={`Read case study: ${project.title}`}>Explore project <span aria-hidden="true">↗</span></button>
                  <div className="project-hover-line"></div>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>

      {activeProject && (
        <ProjectModal
          project={activeProject}
          onClose={closeProject}
        />
      )}
    </section>
  );
};

export default Projects;
