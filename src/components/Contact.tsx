import type { ExternalLink, Profile } from '../data/types';

export function Contact({ profile, links }: { profile: Profile; links: ExternalLink[] }) {
  return (
    <section className="site-section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/contact</p>
        <h2 id="contact-title">Contact</h2>
      </div>
      <div className="contact__content">
        <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="contact__links meta">
          {links.filter((link) => link.label !== 'Email').map((link) => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
