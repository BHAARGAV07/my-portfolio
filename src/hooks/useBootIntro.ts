import { useEffect, useState } from 'react';

const SESSION_KEY = 'bhaargav-portfolio-boot-seen';

export function useBootIntro() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const alreadySeen = window.sessionStorage.getItem(SESSION_KEY) === 'true';

    if (reducedMotion || alreadySeen) return;

    window.sessionStorage.setItem(SESSION_KEY, 'true');
    setIsVisible(true);

    const timeout = window.setTimeout(() => setIsVisible(false), 3000);
    return () => window.clearTimeout(timeout);
  }, []);

  return { isVisible, dismiss: () => setIsVisible(false) };
}
