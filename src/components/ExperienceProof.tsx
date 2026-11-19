import type { AchievementItem, ExperienceItem, VolunteeringItem } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { ScrambleHeading } from './MotionText';

type TimelineItem = ExperienceItem | AchievementItem | VolunteeringItem;

function Timeline({ items }: { items: TimelineItem[] }) {
  return (
    <div className="timeline">
      {items.length > 0 ? items.map((item, index) => (
        <article className="timeline__item" key={`${item.organization}-${item.title}-${index}`}>
          {item.date && <p className="timeline__date meta">{item.date}</p>}
          <div className={!item.date ? 'timeline__content timeline__content--full' : 'timeline__content'}>
            <ScrambleHeading as="h3">{item.title}</ScrambleHeading>
            <p className="timeline__organization">{item.organization}</p>
            <p className="measure">{item.description}</p>
            {(item.proofPath || item.externalUrl) && (
              <p className="timeline__proofs">
                {item.proofPath && <a href={item.proofPath} target="_blank" rel="noreferrer">{item.proofLabel ?? 'View proof'}</a>}
                {item.externalUrl && <a href={item.externalUrl} target="_blank" rel="noreferrer">Read the published paper</a>}
              </p>
            )}
          </div>
        </article>
      )) : import.meta.env.DEV && (
        <p className="dev-placeholder">[Add items here]</p>
      )}
    </div>
  );
}

export function ExperienceProof({ experience, achievements, volunteering }: { experience: ExperienceItem[]; achievements: AchievementItem[]; volunteering: VolunteeringItem[] }) {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="site-section experience" id="experience" aria-labelledby="experience-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/experience</p>
        <ScrambleHeading as="h2" id="experience-title">Experience</ScrambleHeading>
      </div>
      <Timeline items={experience} />
      <div className="subsection-heading">
        <p className="meta"><span className="prompt" aria-hidden="true">&gt;</span> 01 / achievements</p>
        <h3>Achievements</h3>
      </div>
      <Timeline items={achievements} />
      <div className="subsection-heading">
        <p className="meta"><span className="prompt" aria-hidden="true">&gt;</span> 02 / volunteering</p>
        <h3>Volunteering</h3>
      </div>
      <Timeline items={volunteering} />
    </section>
  );
}
