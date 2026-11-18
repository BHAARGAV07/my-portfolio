import { useState } from 'react';
import type { Project } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { ScrambleHeading, TypingText } from './MotionText';

interface ProjectsProps {
  projects: Project[];
}

function missingProjects() {
  return import.meta.env.DEV ? (
    <p className="dev-placeholder">[Add 3–4 projects — DRAFT - REWRITE IN OWN VOICE]</p>
  ) : null;
}

function ProjectEntry({ project, index }: { project: Project; index: number }) {
  const hasDetails = Boolean(project.problem || project.decisions.length || project.outcome);
  const [open, setOpen] = useState(false);

  return (
    <article className={`project-entry${project.screenshotPath ? '' : ' project-entry--no-media'}`}>
      <div className="project-entry__index meta">{String(index + 1).padStart(2, '0')}</div>
      <div className="project-entry__main">
        {project.name && <ScrambleHeading as="h3">{project.name}</ScrambleHeading>}
        {project.summary && <p className="project-entry__summary">{project.summary}</p>}
        <div className="project-entry__meta meta">
          {project.role && <span>Role: {project.role}</span>}
          {project.stack.length > 0 && <span>Stack: {project.stack.join(' · ')}</span>}
        </div>
        <div className="project-entry__links meta">
          {project.repoUrl && <a href={project.repoUrl}>GitHub repo</a>}
          {project.demoUrl && <a href={project.demoUrl}>Live demo</a>}
        </div>
        {hasDetails && (
          <details className="project-entry__details">
            <summary onClick={() => setOpen((current) => !current)}>Problem / Decisions / Outcome</summary>
            <div className="project-entry__details-content">
              {project.problem && (
                <div>
                  <ScrambleHeading as="h4">Problem</ScrambleHeading>
                  <p><TypingText text={project.problem} active={open} /></p>
                </div>
              )}
              {project.decisions.length > 0 && (
                <div>
                  <ScrambleHeading as="h4">Decisions</ScrambleHeading>
                  <ul>
                    {project.decisions.map((decision) => (
                      <li key={decision.decision}>
                        <strong>{decision.decision}.</strong>{decision.reason && <> <TypingText text={decision.reason} active={open} /></>}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.outcome && (
                <div>
                  <ScrambleHeading as="h4">Outcome</ScrambleHeading>
                  <p><TypingText text={project.outcome} active={open} /></p>
                </div>
              )}
            </div>
          </details>
        )}
      </div>
      {project.screenshotPath && (
        <div className="project-entry__media">
          <img
            src={project.screenshotPath}
            width="640"
            height="360"
            loading="lazy"
            alt={project.screenshotAlt}
          />
        </div>
      )}
    </article>
  );
}

export function Projects({ projects }: ProjectsProps) {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="site-section projects" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/projects</p>
        <ScrambleHeading as="h2" id="projects-title">Selected projects</ScrambleHeading>
      </div>
      {projects.length > 0 ? projects.map((project, index) => (
        <ProjectEntry key={`${project.name}-${index}`} project={project} index={index} />
      )) : missingProjects()}
    </section>
  );
}
