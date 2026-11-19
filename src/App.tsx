import { content } from './data/content';
import { About } from './components/About';
import { Atmosphere } from './components/Atmosphere';
import { BootIntro } from './components/BootIntro';
import { Contact } from './components/Contact';
import { ExperienceProof } from './components/ExperienceProof';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { SiteHeader } from './components/SiteHeader';
import { TerminalPanel } from './components/TerminalPanel';
import './styles/global.css';

function App() {
  return (
    <>
      <Atmosphere />
      <BootIntro lines={content.bootLines} profile={content.profile} />
      <SiteHeader />
      <main id="main-content" className="site-shell">
        <Hero />
        <About about={content.about} profile={content.profile} />
        <Projects projects={content.projects} />
        <TerminalPanel />
        <ExperienceProof experience={content.experience} achievements={content.achievements} volunteering={content.volunteering} />
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
