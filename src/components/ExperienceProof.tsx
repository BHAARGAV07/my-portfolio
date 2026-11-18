import type { ExperienceItem } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { ScrambleHeading } from './MotionText';

export function ExperienceProof({ items }: { items: ExperienceItem[] }) {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="site-section experience" id="experience" aria-labelledby="experience-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/experience</p>
        <ScrambleHeading as="h2" id="experience-title">Experience and proof</ScrambleHeading>
      </div>
      <div className="timeline">
        {items.length > 0 ? items.map((item, index) => (
          <article className="timeline__item" key={`${item.organization}-${item.title}-${index}`}>
            <p className="timeline__date meta">{item.date}</p>
            <div>
              <ScrambleHeading as="h3">{item.title}</ScrambleHeading>
              <p className="timeline__organization">{item.organization}</p>
              <p className="measure">{item.description}</p>
            </div>
          </article>
        )) : import.meta.env.DEV && (
          <p className="dev-placeholder">[Add experience and proof — DRAFT - REWRITE IN OWN VOICE]</p>
        )}
      </div>
    </section>
  );
}
