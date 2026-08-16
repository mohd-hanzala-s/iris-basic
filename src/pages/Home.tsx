import { Link } from "react-router-dom";
import { knowledgeBase, masteryPath } from "@/data/index";
import { useProgress } from "@/lib/progress";

const icons = {
  seed: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 22V8" />
      <path d="M12 8c0-3 2-5 5-5 1 3 1 5-5 5z" />
      <path d="M12 8c0-3-2-5-5-5-1 3-1 5 5 5z" />
      <path d="M7 22h10" />
    </svg>
  ),
  iris: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="4" y="6" width="16" height="14" rx="2" />
      <path d="M4 10h16" />
      <path d="M8 10V6l4-3 4 3v4" />
    </svg>
  ),
  cube: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 2l8 4.5v9L12 20l-8-4.5v-9L12 2z" />
      <path d="M12 2v9" />
      <path d="M20 6.5l-8 4.5-8-4.5" />
    </svg>
  ),
  scale: (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3v18" />
      <path d="M7 21h10" />
      <path d="M5 7l7-2 7 2" />
      <path d="M5 7l-3 6a4 4 0 0 0 6 0L5 7z" />
      <path d="M19 7l-3 6a4 4 0 0 0 6 0l-3-6z" />
    </svg>
  ),
  arrow: (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 12h14" />
      <path d="M12 5l7 7-7 7" />
    </svg>
  ),
};

export default function Home() {
  const progress = useProgress();
  const counts = {
    products: knowledgeBase.products.length,
    regulations: knowledgeBase.regulations.length,
    technologies: knowledgeBase.technologies.length,
    glossary: knowledgeBase.glossary.length,
    sources: knowledgeBase.sources.length,
    flashcards: knowledgeBase.flashcards.length,
    quizzes: knowledgeBase.quizzes.length,
  };

  const completedLevels = masteryPath.levels.filter((l) => progress.modules.includes(l.moduleId)).length;
  const nextLevel = masteryPath.levels.find((l) => !progress.modules.includes(l.moduleId));

  return (
    <div className="page">
      <header className="hero">
        <div className="hero-kicker">Interactive knowledge &amp; learning platform</div>
        <h1>IRIS RegTech Mastery</h1>
        <p className="lede">
          Your interactive guide to IRIS, RegTech, products, regulations,
          customers and competitive intelligence — a living knowledge base you
          can read, explore and actually learn from.
        </p>
        <div className="hero-actions">
          <Link to="/start" className="btn btn-primary">
            Start Learning {icons.arrow}
          </Link>
          <Link to="/iris" className="btn">
            Meet IRIS
          </Link>
          <Link to="/graph" className="btn">
            Explore the Graph
          </Link>
        </div>
      </header>

      <section className="section">
        <div className="section-head">
          <h2>Where would you like to begin?</h2>
          <p className="muted">Four doors into the same body of knowledge — pick the one that fits you.</p>
        </div>
        <div className="entry-grid">
          <Link to="/guide" className="entry-card">
            <span className="entry-card-icon">{icons.seed}</span>
            <h3>Start from Zero</h3>
            <p>The Beginner's Guide — the problem, the domain and why it exists, from absolute basics.</p>
            <span className="entry-cta">Begin here →</span>
          </Link>
          <Link to="/iris" className="entry-card">
            <span className="entry-card-icon">{icons.iris}</span>
            <h3>Master IRIS</h3>
            <p>The company — history, segments, strategy and the full product ecosystem.</p>
            <span className="entry-cta">Explore IRIS →</span>
          </Link>
          <Link to="/products" className="entry-card">
            <span className="entry-card-icon">{icons.cube}</span>
            <h3>Explore Products</h3>
            <p>iFILE, CARBON, iDEAL, iConnect and more — what each does and who uses it.</p>
            <span className="entry-cta">Browse products →</span>
          </Link>
          <Link to="/competitors" className="entry-card">
            <span className="entry-card-icon">{icons.scale}</span>
            <h3>Understand the Competition</h3>
            <p>Workiva, Regnology, CoreFiling and others — where IRIS wins and where it doesn't.</p>
            <span className="entry-cta">See the landscape →</span>
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>Continue learning</h2>
          <p className="muted">Pick up where you left off, or keep reinforcing what you know.</p>
        </div>

        {nextLevel ? (
          <Link to={`/learning/${nextLevel.moduleId}`} className="recommended-card">
            <div className="recommended-tag">Recommended next · Level {nextLevel.level}</div>
            <h3>{nextLevel.title}</h3>
            <p>{nextLevel.summary}</p>
            <span className="recommended-cta">Continue →</span>
            <div className="recommended-progress">
              <div className="recommended-bar">
                <div
                  className="recommended-bar-fill"
                  style={{ width: `${Math.round((completedLevels / masteryPath.levels.length) * 100)}%` }}
                />
              </div>
              <span>{completedLevels} of {masteryPath.levels.length} levels complete</span>
            </div>
          </Link>
        ) : (
          <div className="recommended-card recommended-done">
            <h3>The mastery path is complete</h3>
            <p>You've finished all {masteryPath.levels.length} levels. Review and reinforce, or keep exploring the knowledge base.</p>
            <Link to="/dashboard" className="btn btn-primary">Review progress</Link>
          </div>
        )}

        <div className="grid-3" style={{ marginTop: "1.25rem" }}>
          <Link to="/learning" className="info-card">
            <h3>The mastery path</h3>
            <p>A ten-level guided route from zero to genuine domain expertise.</p>
          </Link>
          <Link to="/flashcards" className="info-card">
            <h3>Flashcards</h3>
            <p>{counts.flashcards} cards across decks — quick, low-pressure reinforcement.</p>
          </Link>
          <Link to="/quizzes" className="info-card">
            <h3>Quizzes</h3>
            <p>{counts.quizzes} quizzes to test understanding, with explanations after every answer.</p>
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>Explore the knowledge base</h2>
          <p className="muted">
            Browse the underlying research directly — every concept, entity and relationship,
            grounded in sources and labelled by evidence.
          </p>
        </div>
        <div className="grid-3">
          <Link to="/concepts" className="info-card">
            <h3>Knowledge Base</h3>
            <p>Core domain concepts, explained from first principles to professional depth.</p>
          </Link>
          <Link to="/glossary" className="info-card">
            <h3>Glossary</h3>
            <p>{counts.glossary} terms explained simply, professionally, and with an IRIS angle.</p>
          </Link>
          <Link to="/graph" className="info-card">
            <h3>Knowledge Graph</h3>
            <p>Explore how companies, products, regulators and technologies connect.</p>
          </Link>
        </div>
      </section>

      <section className="home-section">
        <div className="section-head">
          <h2>How this system works</h2>
        </div>
        <div className="grid-3">
          <div className="info-card">
            <h3>Connected knowledge</h3>
            <p>Companies, products, regulators, regulations, technologies and markets are linked in a graph, so every page surfaces related entities.</p>
          </div>
          <div className="info-card">
            <h3>Source-grounded</h3>
            <p>Every claim is tagged with its evidential basis — Fact, Company claim, Analyst view, Inference, and more — and cites its source.</p>
          </div>
          <div className="info-card">
            <h3>Built to learn from</h3>
            <p>A ten-level mastery path, flashcards and quizzes turn the knowledge base into a study system, not just a reference.</p>
          </div>
        </div>
      </section>

      <section className="home-section home-stat-strip">
        <div className="home-stats">
          <div className="stat">
            <div className="stat-num">{counts.products}</div>
            <div className="stat-label">Products</div>
          </div>
          <div className="stat">
            <div className="stat-num">{counts.regulations}</div>
            <div className="stat-label">Regulations</div>
          </div>
          <div className="stat">
            <div className="stat-num">{counts.technologies}</div>
            <div className="stat-label">Technologies</div>
          </div>
          <div className="stat">
            <div className="stat-num">{counts.glossary}</div>
            <div className="stat-label">Glossary terms</div>
          </div>
          <div className="stat">
            <div className="stat-num">{counts.sources}</div>
            <div className="stat-label">Sources</div>
          </div>
        </div>
      </section>
    </div>
  );
}
