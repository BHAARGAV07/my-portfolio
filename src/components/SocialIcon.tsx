import type { ExternalLink } from '../data/types';

const iconSources: Record<string, string> = {
  GitHub: 'https://img.icons8.com/ios-filled/50/ffffff/github.png',
  LinkedIn: 'https://img.icons8.com/ios-filled/50/ffffff/linkedin.png',
  LeetCode: 'https://img.icons8.com/?size=50&id=qVAmFIlB2tHI&format=png',
  Email: 'https://img.icons8.com/ios-filled/50/ffffff/email.png',
};

export function SocialIcon({ link }: { link: ExternalLink }) {
  const source = iconSources[link.label];

  if (!source) return null;

  return (
    <a className="social-icon" href={link.href} aria-label={link.label} title={link.label}>
      <img className={link.label === 'LeetCode' ? 'social-icon__leetcode' : undefined} src={source} alt="" width="24" height="24" />
    </a>
  );
}
