import type { Project } from '../data/types';

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

  return (
    <article className="project-entry">
      <div className="project-entry__index meta">{String(index + 1).padStart(2, '0')}</div>
      <div className="project-entry__main">
        {project.name && <h3>{project.name}</h3>}
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
            <summary>Problem / Decisions / Outcome</summary>
            <div className="project-entry__details-content">
              {project.problem && (
                <div>
                  <h4>Problem</h4>
                  <p>{project.problem}</p>
                </div>
              )}
              {project.decisions.length > 0 && (
                <div>
                  <h4>Decisions</h4>
                  <ul>
                    {project.decisions.map((decision) => (
                      <li key={decision.decision}>
                        <strong>{decision.decision}.</strong> {decision.reason}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
              {project.outcome && (
                <div>
                  <h4>Outcome</h4>
                  <p>{project.outcome}</p>
                </div>
              )}
            </div>
          </details>
        )}
      </div>
      <div className="project-entry__media">
        {project.screenshotPath ? (
          <img
            src={project.screenshotPath}
            width="640"
            height="360"
            loading="lazy"
            alt={project.screenshotAlt}
          />
        ) : import.meta.env.DEV ? (
          <div className="project-entry__screenshot-placeholder" role="img" aria-label="Screenshot placeholder">
            Screenshot placeholder
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function Projects({ projects }: ProjectsProps) {
  return (
    <section className="site-section projects" id="projects" aria-labelledby="projects-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/projects</p>
        <h2 id="projects-title">Selected projects</h2>
      </div>
      {projects.length > 0 ? projects.map((project, index) => (
        <ProjectEntry key={`${project.name}-${index}`} project={project} index={index} />
      )) : missingProjects()}
    </section>
  );
}
