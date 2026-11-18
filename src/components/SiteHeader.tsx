import { content } from '../data/content';

const navigation = [
  { index: '01', label: 'Projects', href: '#projects' },
  { index: '02', label: 'Experience', href: '#experience' },
  { index: '03', label: 'About', href: '#about' },
  { index: '04', label: 'Skills', href: '#skills' },
  { index: '05', label: 'Contact', href: '#contact' },
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
                <a href={item.href}><span aria-hidden="true">{item.index} / </span>{item.label}</a>
              </li>
            ))}
            <li>
              <a href={content.profile.resumePath}><span aria-hidden="true">PDF / </span>Resume</a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}
