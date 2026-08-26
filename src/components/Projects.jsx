import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { portfolioData } from '../data/portfolioData';
import ProjectModal from './ProjectModal';
import './Projects.css';

const Projects = () => {
  const sectionRef = useRef(null);
  const projectRefs = useRef([]);
  projectRefs.current = [];
  const [activeProject, setActiveProject] = useState(null);

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

      // Pin the section title slightly
      gsap.to('.projects-title', {
        y: 200,
        opacity: 0.2,
        scrollTrigger: {
          trigger: sectionRef.current,
          start: "top center",
          end: "bottom center",
          scrub: true
        }
      });

      // Reveal each project
      projectRefs.current.forEach((el, index) => {
        gsap.fromTo(el,
          { opacity: 0, y: 100 },
          {
            opacity: 1,
            y: 0,
            scrollTrigger: {
              trigger: el,
              start: "top 80%",
              end: "top 40%",
              scrub: 1
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
        <h2 className="display-large projects-title">
          SELECTED<br/>WORK.
        </h2>
        
        <div className="projects-list">
          {portfolioData.projects.map((project, index) => (
            <div 
              key={project.id} 
              className="project-item view-cursor"
              ref={addToRefs}
              onClick={() => setActiveProject(project)}
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
                  <div className="project-hover-line"></div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {activeProject && (
        <ProjectModal 
          project={activeProject} 
          onClose={() => setActiveProject(null)} 
        />
      )}
    </section>
  );
};

export default Projects;
