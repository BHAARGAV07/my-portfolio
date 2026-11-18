import { content } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';

const navigation = [
  { index: '01', label: 'About', href: '#about' },
  { index: '02', label: 'Projects', href: '#projects' },
  { index: '03', label: 'Experience', href: '#experience' },
  { index: '04', label: 'Skills', href: '#skills' },
  { index: '05', label: 'Contact', href: '#contact' },
];
const sectionIds = navigation.map((item) => item.href.slice(1));

export function SiteHeader() {
  const activeSection = useActiveSection(sectionIds);

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
                <a
                  className={activeSection === item.href.slice(1) ? 'is-active' : undefined}
                  href={item.href}
                  aria-current={activeSection === item.href.slice(1) ? 'page' : undefined}
                >
                  <span aria-hidden="true">{item.index} / </span>{item.label}
                </a>
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
