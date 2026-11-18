import type { SkillGroups } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { ScrambleHeading } from './MotionText';

const groups: Array<[keyof SkillGroups, string]> = [
  ['languages', 'Languages'],
  ['frontend', 'Frontend'],
  ['backendAndData', 'Backend and data'],
  ['tools', 'Tools'],
];

export function Skills({ skills }: { skills: SkillGroups }) {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="site-section skills" id="skills" aria-labelledby="skills-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/skills</p>
        <ScrambleHeading as="h2" id="skills-title">Skills</ScrambleHeading>
      </div>
      <div className="skills__list">
        {groups.map(([key, label]) => skills[key].length > 0 && (
          <div className="skills__group" key={key}>
            <ScrambleHeading as="h3">{label}</ScrambleHeading>
            <p>{skills[key].join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
