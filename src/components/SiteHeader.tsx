import { content } from '../data/content';

const navigation = [
  { label: 'Projects', href: '#projects' },
  { label: 'Experience', href: '#experience' },
  { label: 'About', href: '#about' },
  { label: 'Skills', href: '#skills' },
  { label: 'Contact', href: '#contact' },
];

export function SiteHeader() {
  return (
    <header className="site-header">
      <div className="site-header__inner">
        <a className="site-header__name" href="#top" aria-label="Back to top">
          <span className="prompt" aria-hidden="true">$</span> {content.profile.name}
        </a>
        <nav aria-label="Primary navigation">
          <ul className="site-header__nav">
            {navigation.map((item) => (
              <li key={item.href}>
                <a href={item.href}>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={content.profile.resumePath}>Resume</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
