import type { ExternalLink } from '../data/types';

const iconSources: Record<string, string> = {
  GitHub: 'https://img.icons8.com/ios-filled/50/ffffff/github.png',
  LinkedIn: 'https://img.icons8.com/ios-filled/50/ffffff/linkedin.png',
  LeetCode: 'https://img.icons8.com/ios-filled/50/ffffff/leetcode.png',
  Email: 'https://img.icons8.com/ios-filled/50/ffffff/email.png',
};

export function SocialIcon({ link }: { link: ExternalLink }) {
  const source = iconSources[link.label];

  if (!source) return null;

  return (
    <a className="social-icon" href={link.href} aria-label={link.label} title={link.label}>
      <img src={source} alt="" width="24" height="24" />
    </a>
  );
}
