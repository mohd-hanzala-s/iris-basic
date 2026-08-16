import { Link } from "react-router-dom";
import { knowledgeBase } from "@/data/index";

export default function Quizzes() {
  const quizzes = knowledgeBase.quizzes;

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Practice · Quizzes</span>
        <h1 className="page-hero-title">Quizzes</h1>
        <p className="page-hero-lede">Test your understanding. Each question links back to the underlying entities.</p>
      </header>

      <section className="section">
        <div className="grid-3">
          {quizzes.map((q) => (
            <Link key={q.id} to={`/quizzes/${q.id}`} className="info-card">
              <h3>{q.title}</h3>
              <p className="muted">
                {q.questions.length} question{q.questions.length === 1 ? "" : "s"}
              </p>
              {q.description && <p>{q.description}</p>}
            </Link>
          ))}
        </div>
      </section>
    </div>
  );
}
