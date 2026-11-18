import { useEffect, useState } from 'react';
import type { BootLine, Profile } from '../data/types';
import { useBootIntro } from '../hooks/useBootIntro';

interface BootIntroProps {
  lines: BootLine[];
  profile: Profile;
}

export function BootIntro({ lines, profile }: BootIntroProps) {
  const { isVisible, dismiss } = useBootIntro();
  const [photoFailed, setPhotoFailed] = useState(false);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = () => dismiss();
    window.addEventListener('keydown', handleKeyDown, { once: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismiss, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="opening-sequence" aria-hidden="true">
      <div className="opening-sequence__stage">
        <span className="opening-sequence__bracket opening-sequence__bracket--tl" />
        <span className="opening-sequence__bracket opening-sequence__bracket--tr" />
        <span className="opening-sequence__bracket opening-sequence__bracket--bl" />
        <span className="opening-sequence__bracket opening-sequence__bracket--br" />

        <div className="opening-sequence__label opening-sequence__label--top hud-label">01 / VISUAL LINK</div>
        <div className="opening-sequence__label opening-sequence__label--right hud-label">DATA / {profile.education}</div>
        <div className="opening-sequence__label opening-sequence__label--bottom hud-label">PORTFOLIO / SCAN COMPLETE</div>
        <div className="opening-sequence__label opening-sequence__label--left hud-label">NODE / CHENNAI</div>

        <div className="opening-sequence__connector opening-sequence__connector--left" />
        <div className="opening-sequence__connector opening-sequence__connector--right" />

        <div className="opening-sequence__radar-wrap">
          <svg className="opening-sequence__radar" viewBox="0 0 400 400" role="presentation">
            <defs>
              <linearGradient id="radar-sweep" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0" stopColor="#3ee6c4" stopOpacity="0.42" />
                <stop offset="1" stopColor="#3ee6c4" stopOpacity="0" />
              </linearGradient>
              <filter id="radar-glow" x="-50%" y="-50%" width="200%" height="200%">
                <feGaussianBlur stdDeviation="2.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
              <path id="radar-tick" d="M200 8v13" />
            </defs>
            <g className="opening-sequence__rings" filter="url(#radar-glow)" fill="none">
              <circle className="opening-sequence__ring opening-sequence__ring--outer" cx="200" cy="200" r="184" />
              <circle className="opening-sequence__ring opening-sequence__ring--middle" cx="200" cy="200" r="142" />
              <circle className="opening-sequence__ring opening-sequence__ring--inner" cx="200" cy="200" r="92" />
              <circle className="opening-sequence__crosshair" cx="200" cy="200" r="38" />
            </g>
            <g className="opening-sequence__ticks" fill="none">
              {Array.from({ length: 24 }, (_, index) => (
                <use href="#radar-tick" key={index} transform={`rotate(${index * 15} 200 200)`} />
              ))}
            </g>
            <g className="opening-sequence__sweep" filter="url(#radar-glow)">
              <path d="M200 200 L200 18 A182 182 0 0 1 246 24 Z" fill="url(#radar-sweep)" />
              <line x1="200" y1="200" x2="200" y2="18" />
            </g>
            <circle className="opening-sequence__dot" cx="200" cy="200" r="4" />
          </svg>
          <div className="opening-sequence__photo">
            {!photoFailed ? (
              <img
                src={profile.photoPath}
                width="160"
                height="160"
                alt=""
                onError={() => setPhotoFailed(true)}
              />
            ) : import.meta.env.DEV ? (
              <span>PHOTO<br />PENDING</span>
            ) : null}
          </div>
          <p className="opening-sequence__scan-text">SCANNING<span className="opening-sequence__ellipsis">...</span></p>
        </div>

        <div className="opening-sequence__identity">
          <p className="opening-sequence__identity-name">{profile.name}</p>
          <p className="opening-sequence__identity-line">{profile.title}</p>
          <p className="opening-sequence__identity-line">{profile.education} / {profile.location}</p>
        </div>

        <div className="opening-sequence__commands">
          {lines.map((line) => (
            <p key={line.command}><span>{line.command}</span>{line.output}</p>
          ))}
        </div>

        <button className="opening-sequence__skip" type="button" tabIndex={-1} onClick={dismiss}>
          Skip sequence
        </button>
      </div>
    </div>
  );
}
