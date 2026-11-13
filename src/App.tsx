import { content } from './data/content';
import './styles/global.css';

function App() {
  return (
    <div className="site-shell">
      <header>
        <p>{content.profile.name}</p>
      </header>
      <main id="main-content">
        <section className="site-section" aria-labelledby="scaffold-title">
          <h1 id="scaffold-title">Portfolio scaffold</h1>
          <p className="measure">Section content will be built in Phase 3.</p>
        </section>
      </main>
    </div>
  );
}

export default App;
