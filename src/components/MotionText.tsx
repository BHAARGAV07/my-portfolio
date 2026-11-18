import { useEffect, useState } from 'react';

const glyphs = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789<>[]/';

interface ScrambleHeadingProps {
  as: 'h2' | 'h3' | 'h4';
  children: string;
  className?: string;
  id?: string;
}

export function ScrambleHeading({ as: Tag, children, className, id }: ScrambleHeadingProps) {
  const [display, setDisplay] = useState(children);
  const [element, setElement] = useState<HTMLElement | null>(null);

  useEffect(() => {
    if (!element) return;
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reducedMotion) return;

    let timer = 0;
    const observer = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      let frame = 0;
      const total = children.length;
      timer = window.setInterval(() => {
        frame += 1;
        const settled = Math.floor((frame / 18) * total);
        const next = children.split('').map((character, index) => (
          index < settled ? character : glyphs[Math.floor(Math.random() * glyphs.length)]
        )).join('');
        setDisplay(frame >= 18 ? children : next);
        if (frame >= 18) window.clearInterval(timer);
      }, 30);
      observer.disconnect();
    }, { threshold: 0.2 });
    observer.observe(element);
    return () => {
      window.clearInterval(timer);
      observer.disconnect();
    };
  }, [children, element]);

  return <Tag ref={setElement} id={id} className={className} aria-label={children}><span aria-hidden="true">{display}</span></Tag>;
}

export function TypingText({ text, active = true }: { text: string; active?: boolean }) {
  const [display, setDisplay] = useState(active ? '' : text);

  useEffect(() => {
    if (!active) {
      setDisplay(text);
      return;
    }
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text);
      return;
    }
    let index = 0;
    const timer = window.setInterval(() => {
      index += 1;
      setDisplay(text.slice(0, index));
      if (index >= text.length) window.clearInterval(timer);
    }, 22);
    return () => window.clearInterval(timer);
  }, [active, text]);

  return (
    <span className="typing-text" aria-label={text}>
      <span className="sr-only">{text}</span>
      <span aria-hidden="true">{display}</span><span className="typing-text__cursor" aria-hidden="true" />
    </span>
  );
}

export function DecodeText({ text }: { text: string }) {
  const [display, setDisplay] = useState(() => text.split('').map(() => glyphs[0]).join(''));

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setDisplay(text);
      return;
    }
    let frame = 0;
    const timer = window.setInterval(() => {
      frame += 1;
      setDisplay(text.split('').map((character, index) => (
        index < frame / 2 ? character : glyphs[Math.floor(Math.random() * glyphs.length)]
      )).join(''));
      if (frame >= text.length * 2) window.clearInterval(timer);
    }, 55);
    return () => window.clearInterval(timer);
  }, [text]);

  return <span aria-label={text}>{display}</span>;
}
