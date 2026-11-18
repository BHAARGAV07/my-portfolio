import { useEffect, useRef, useState } from 'react';

const startedAt = performance.now();

function formatTime() {
  return new Intl.DateTimeFormat('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: false,
  }).format(new Date());
}

function formatUptime() {
  const seconds = Math.floor((performance.now() - startedAt) / 1000);
  return `${String(Math.floor(seconds / 60)).padStart(2, '0')}:${String(seconds % 60).padStart(2, '0')}`;
}

export function Atmosphere() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [time, setTime] = useState(formatTime);
  const [uptime, setUptime] = useState('00:00');
  const [viewport, setViewport] = useState(`${window.innerWidth}×${window.innerHeight}`);
  const [section, setSection] = useState('hero');

  useEffect(() => {
    const interval = window.setInterval(() => {
      setTime(formatTime());
      setUptime(formatUptime());
    }, 1000);
    const updateViewport = () => setViewport(`${window.innerWidth}×${window.innerHeight}`);
    window.addEventListener('resize', updateViewport);
    return () => {
      window.clearInterval(interval);
      window.removeEventListener('resize', updateViewport);
    };
  }, []);

  useEffect(() => {
    const sections = Array.from(document.querySelectorAll<HTMLElement>('main section[id]'));
    const onScroll = () => {
      const visible = sections.filter((item) => item.getBoundingClientRect().top <= window.innerHeight * 0.45);
      const current = visible[visible.length - 1];
      setSection(current?.id ?? 'hero');
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const context = canvas.getContext('2d');
    if (!context) return;

    let frame = 0;
    let animationFrame = 0;
    let columns: Array<{ x: number; y: number; speed: number; char: string }> = [];
    const glyphs = '01<>/[]{}$#ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const mobile = window.matchMedia('(max-width: 600px)').matches;
    const columnGap = mobile ? 30 : 24;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      canvas.width = Math.floor(window.innerWidth * dpr);
      canvas.height = Math.floor(window.innerHeight * dpr);
      canvas.style.width = `${window.innerWidth}px`;
      canvas.style.height = `${window.innerHeight}px`;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      columns = Array.from({ length: Math.ceil(window.innerWidth / columnGap) }, (_, index) => ({
        x: index * columnGap,
        y: Math.random() * window.innerHeight,
        speed: 0.2 + Math.random() * 0.35,
        char: glyphs[Math.floor(Math.random() * glyphs.length)],
      }));
    };

    const draw = () => {
      frame += 1;
      context.fillStyle = 'rgba(4, 8, 10, 0.14)';
      context.fillRect(0, 0, window.innerWidth, window.innerHeight);
      context.font = '10px IBM Plex Mono, monospace';
      context.fillStyle = '#3ee6c4';
      context.globalAlpha = 0.1;
      columns.forEach((column) => {
        if (frame % 13 === 0) column.char = glyphs[Math.floor(Math.random() * glyphs.length)];
        context.fillText(column.char, column.x, column.y);
        column.y += column.speed;
        if (column.y > window.innerHeight + 20) column.y = -20;
      });
      context.globalAlpha = 1;
      animationFrame = window.requestAnimationFrame(draw);
    };

    const pause = () => window.cancelAnimationFrame(animationFrame);
    const resume = () => { if (!document.hidden) animationFrame = window.requestAnimationFrame(draw); };
    const handleVisibility = () => { if (document.hidden) pause(); else resume(); };
    resize();
    resume();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', handleVisibility);
    return () => {
      pause();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, []);

  return (
    <>
      <canvas className="atmosphere__canvas" ref={canvasRef} aria-hidden="true" />
      <div className="atmosphere__scanlines" aria-hidden="true" />
      <div className="atmosphere__flicker" aria-hidden="true" />
      <aside className="status-bar" aria-label="Live portfolio status">
        <span>IST <strong>{time}</strong></span>
        <span>UPTIME <strong>{uptime}</strong></span>
        <span>VIEW <strong>{viewport}</strong></span>
        <span>SECTION <strong>~/{section}</strong></span>
      </aside>
    </>
  );
}
