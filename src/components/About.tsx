import type { AboutContent, Profile } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { ScrambleHeading } from './MotionText';

export function About({ about, profile }: { about: AboutContent; profile: Profile }) {
  const sectionRef = useReveal<HTMLElement>();

  return (
    <section ref={sectionRef} className="site-section about" id="about" aria-labelledby="about-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/about</p>
        <ScrambleHeading as="h2" id="about-title">About</ScrambleHeading>
      </div>
      <div className="about__content">
        <div className="about__copy">
          {about.paragraphs.length > 0 ? about.paragraphs.map((paragraph) => (
            <p className="measure" key={paragraph}>{paragraph}</p>
          )) : import.meta.env.DEV && (
            <p className="dev-placeholder">[Add two About paragraphs — DRAFT - REWRITE IN OWN VOICE]</p>
          )}
        </div>
        <div className="about__education">
          <p className="meta">Education</p>
          <p>{profile.education}</p>
          <p>{profile.location}</p>
          <p>Class of {profile.graduationYear}</p>
        </div>
      </div>
    </section>
  );
}
