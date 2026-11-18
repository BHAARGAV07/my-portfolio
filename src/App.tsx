import { content } from './data/content';
import { About } from './components/About';
import { BootIntro } from './components/BootIntro';
import { Contact } from './components/Contact';
import { ExperienceProof } from './components/ExperienceProof';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { SiteHeader } from './components/SiteHeader';
import './styles/global.css';

function App() {
  return (
    <>
      <BootIntro lines={content.bootLines} />
      <SiteHeader />
      <main id="main-content" className="site-shell">
        <Hero />
        <Projects projects={content.projects} />
        <ExperienceProof items={content.experience} />
        <About about={content.about} profile={content.profile} />
        <Skills skills={content.skills} />
        <Contact profile={content.profile} links={content.links} />
      </main>
      <footer className="site-footer site-shell">
        <span className="meta">© {new Date().getFullYear()} {content.profile.name}</span>
      </footer>
    </>
  );
}

export default App;
