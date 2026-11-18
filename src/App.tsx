import { content } from './data/content';
import { BootIntro } from './components/BootIntro';
import { Hero } from './components/Hero';
import { SiteHeader } from './components/SiteHeader';
import './styles/global.css';

function App() {
  return (
    <>
      <BootIntro lines={content.bootLines} />
      <SiteHeader />
      <main id="main-content" className="site-shell">
        <Hero />
      </main>
    </>
  );
}

export default App;
