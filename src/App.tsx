import { content } from './data/content';
import { BootIntro } from './components/BootIntro';
import { Hero } from './components/Hero';
import { Projects } from './components/Projects';
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
      </main>
    </>
  );
}

export default App;
