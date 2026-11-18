import { useState } from 'react';
import { content } from '../data/content';

function missingValue(label: string) {
  return import.meta.env.DEV ? `[${label} — DRAFT - REWRITE IN OWN VOICE]` : '';
}

export function Hero() {
  const [photoFailed, setPhotoFailed] = useState(false);
  const { profile } = content;

  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="hero__photo-wrap">
        {!photoFailed && (
          <img
            className="hero__photo"
            src={profile.photoPath}
            width="360"
            height="440"
            alt={profile.photoAlt}
            fetchPriority="high"
            onError={() => setPhotoFailed(true)}
          />
        )}
        {photoFailed && import.meta.env.DEV && (
          <div className="hero__photo-placeholder" role="img" aria-label="Photo placeholder">
            Photo placeholder — add public/photo.jpg
          </div>
        )}
      </div>
      <div className="hero__content">
        <p className="meta hero__eyebrow"><span className="prompt" aria-hidden="true">&gt;</span> portfolio / bhaargav-kc</p>
        <h1 id="hero-title">{profile.name}<span className="cursor" aria-hidden="true">_</span></h1>
        <p className="hero__statement measure">
          {profile.heroStatement || missingValue('Write one specific sentence about what you build')}
        </p>
        <p className="hero__availability">
          {profile.availability || missingValue('Add role and availability')}
        </p>
        <div className="hero__actions">
          <a className="button button--primary" href={profile.resumePath}>Resume (PDF)</a>
          <a className="button button--secondary" href="#contact">Contact</a>
        </div>
        <div className="hero__links" aria-label="Profile links">
          {content.links.map((link) => (
            <a key={link.label} href={link.href}>{link.label}</a>
          ))}
        </div>
      </div>
    </section>
  );
}
