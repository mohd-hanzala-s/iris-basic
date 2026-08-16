import { Link } from "react-router-dom";
import { learningModules, masteryPath, knowledgeBase } from "@/data/index";
import { useProgress, resetProgress } from "@/lib/progress";

function Bar({ value, total }: { value: number; total: number }) {
  const pct = total === 0 ? 0 : Math.round((value / total) * 100);
  return (
    <div className="pbar">
      <div className="pbar-track">
        <div className="pbar-fill" style={{ width: `${pct}%` }} />
      </div>
      <span className="pbar-label">
        {value} / {total} ({pct}%)
      </span>
    </div>
  );
}

/**
 * The learning-progress dashboard. Summarises completed modules, mastered
 * flashcards and passed quizzes, with a detailed breakdown of the mastery path.
 */
export default function ProgressDashboard() {
  const progress = useProgress();
  const flashcards = knowledgeBase.flashcards;
  const quizzes = knowledgeBase.quizzes;

  const pathModules = learningModules.filter((m) => m.track === "PATH").sort((a, b) => a.order - b.order);
  const snapshots = learningModules.filter((m) => m.track === "SNAPSHOT").sort((a, b) => a.order - b.order);

  const completedModules = progress.modules.filter((id) =>
    learningModules.some((m) => m.id === id)
  ).length;
  const masteredCards = progress.flashcards.filter((id) =>
    flashcards.some((f) => f.id === id)
  ).length;
  const passedQuizzes = Object.values(progress.quizzes).filter((q) => q.passed).length;

  const totalUnits = learningModules.length + flashcards.length + quizzes.length;
  const doneUnits = completedModules + masteredCards + passedQuizzes;
  const overallPct = totalUnits === 0 ? 0 : Math.round((doneUnits / totalUnits) * 100);

  return (
    <div className="dashboard">
      <div className="dashboard-hero">
        <div className="dashboard-overall">
          <div className="dashboard-pct">{overallPct}%</div>
          <div className="dashboard-pct-label">overall mastery</div>
        </div>
        <div className="dashboard-stats">
          <div className="dstat">
            <div className="dstat-num">{completedModules}</div>
            <div className="dstat-label">modules completed</div>
          </div>
          <div className="dstat">
            <div className="dstat-num">{masteredCards}</div>
            <div className="dstat-label">cards mastered</div>
          </div>
          <div className="dstat">
            <div className="dstat-num">{passedQuizzes}</div>
            <div className="dstat-label">quizzes passed</div>
          </div>
        </div>
      </div>

      <section className="section">
        <h2>The 10-level mastery path</h2>
        <Bar
          value={pathModules.filter((m) => progress.modules.includes(m.id)).length}
          total={pathModules.length}
        />
        <ol className="dash-levels">
          {masteryPath.levels.map((lvl) => {
            const done = progress.modules.includes(lvl.moduleId);
            return (
              <li key={lvl.level} className={`dash-level ${done ? "done" : ""}`}>
                <span className="dash-level-num">{lvl.level}</span>
                <div className="dash-level-body">
                  <Link to={`/learning/${lvl.moduleId}`} className="dash-level-title">
                    {lvl.title}
                  </Link>
                  <span className="dash-level-summary">{lvl.summary}</span>
                </div>
                <span className={`dash-check ${done ? "on" : ""}`}>{done ? "✓" : "○"}</span>
              </li>
            );
          })}
        </ol>
      </section>

      <section className="section">
        <h2>IRIS snapshots</h2>
        <ul className="dash-snapshots">
          {snapshots.map((s) => {
            const done = progress.modules.includes(s.id);
            return (
              <li key={s.id} className={`dash-snapshot ${done ? "done" : ""}`}>
                <Link to={`/learning/${s.id}`}>{s.title}</Link>
                <span className={`dash-check ${done ? "on" : ""}`}>{done ? "✓" : "○"}</span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section">
        <h2>Quizzes</h2>
        <Bar value={passedQuizzes} total={quizzes.length} />
        <ul className="dash-quizzes">
          {quizzes.map((q) => {
            const r = progress.quizzes[q.id];
            return (
              <li key={q.id} className="dash-quiz">
                <Link to={`/quizzes/${q.id}`}>{q.title}</Link>
                <span className="dash-quiz-score">
                  {r ? `${r.score}/${r.total}` : "not attempted"}
                </span>
              </li>
            );
          })}
        </ul>
      </section>

      <section className="section">
        <h2>Flashcards</h2>
        <Bar value={masteredCards} total={flashcards.length} />
        <p className="muted">
          Cards are marked mastered as you flip through them in the{" "}
          <Link to="/flashcards">Flashcards</Link> study view.
        </p>
      </section>

      <div className="dashboard-actions">
        <button
          className="btn"
          onClick={() => {
            if (confirm("Reset all learning progress?")) resetProgress();
          }}
        >
          Reset progress
        </button>
      </div>
    </div>
  );
}
