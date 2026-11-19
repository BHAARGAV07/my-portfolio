import { useState } from 'react';
import type { FormEvent } from 'react';
import type { ExternalLink, Profile } from '../data/types';
import { useReveal } from '../hooks/useReveal';
import { ScrambleHeading } from './MotionText';
import { SocialIcon } from './SocialIcon';

export function Contact({ profile, links }: { profile: Profile; links: ExternalLink[] }) {
  const sectionRef = useReveal<HTMLElement>();
  const [senderEmail, setSenderEmail] = useState('');
  const [message, setMessage] = useState('');

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const subject = `Portfolio message from ${senderEmail}`;
    const body = `Sender email: ${senderEmail}\n\n${message}`;
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <section ref={sectionRef} className="site-section contact" id="contact" aria-labelledby="contact-title">
      <div className="section-heading">
        <p className="meta section-heading__path"><span className="prompt" aria-hidden="true">&gt;</span> ~/contact</p>
        <ScrambleHeading as="h2" id="contact-title">Contact</ScrambleHeading>
      </div>
      <div className="contact__content">
        <a className="contact__email" href={`mailto:${profile.email}`}>{profile.email}</a>
        <div className="contact__links" aria-label="Contact links">
          {links.map((link) => (
            <SocialIcon key={link.label} link={link} />
          ))}
        </div>
        <form className="contact__form" onSubmit={submit}>
          <label htmlFor="sender-email">Your email</label>
          <input
            id="sender-email"
            type="email"
            value={senderEmail}
            onChange={(event) => setSenderEmail(event.target.value)}
            required
            autoComplete="email"
          />
          <label htmlFor="sender-message">Message</label>
          <textarea
            id="sender-message"
            value={message}
            onChange={(event) => setMessage(event.target.value)}
            required
            rows={5}
          />
          <button className="button button--primary" type="submit">Open email client</button>
          <p className="contact__form-note">This opens your email client with the message addressed to {profile.email}.</p>
        </form>
      </div>
    </section>
  );
}
