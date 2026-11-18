import type { SkillGroups } from '../data/types';
import { useReveal } from '../hooks/useReveal';

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
        <h2 id="skills-title">Skills</h2>
      </div>
      <div className="skills__list">
        {groups.map(([key, label]) => skills[key].length > 0 && (
          <div className="skills__group" key={key}>
            <h3>{label}</h3>
            <p>{skills[key].join(' · ')}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
