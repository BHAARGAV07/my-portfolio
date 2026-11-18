import { useEffect, useState } from 'react';
import type { BootLine } from '../data/types';
import { useBootIntro } from '../hooks/useBootIntro';

interface BootIntroProps {
  lines: BootLine[];
}

function missingValue(label: string) {
  return import.meta.env.DEV ? `[${label} — DRAFT - REWRITE IN OWN VOICE]` : '';
}

export function BootIntro({ lines }: BootIntroProps) {
  const { isVisible, dismiss } = useBootIntro();
  const [lineCount, setLineCount] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const interval = window.setInterval(() => {
      setLineCount((count) => Math.min(count + 1, lines.length));
    }, 700);

    return () => window.clearInterval(interval);
  }, [isVisible, lines.length]);

  useEffect(() => {
    if (!isVisible) return;

    const handleKeyDown = () => dismiss();
    window.addEventListener('keydown', handleKeyDown, { once: true });
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dismiss, isVisible]);

  if (!isVisible) return null;

  return (
    <div className="boot-intro" aria-hidden="true">
      <div className="boot-intro__content">
        {lines.slice(0, lineCount).map((line) => (
          <p className="boot-intro__line" key={line.command}>
            <span>{line.command}</span>
            {line.output || missingValue('Add project names')}
          </p>
        ))}
        <button className="boot-intro__skip" type="button" tabIndex={-1} onClick={dismiss}>
          Skip
        </button>
      </div>
    </div>
  );
}
