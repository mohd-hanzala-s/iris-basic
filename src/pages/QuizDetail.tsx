import { useState } from "react";
import { useParams, Link } from "react-router-dom";
import { knowledgeBase, resolveRef } from "@/data/index";
import SourceList from "@/components/SourceList";
import ScenarioBlock from "@/components/ScenarioBlock";
import { recordQuizResult } from "@/lib/progress";

export default function QuizDetail() {
  const { id } = useParams();
  const quiz = knowledgeBase.quizzes.find((q) => q.id === id);
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [submitted, setSubmitted] = useState(false);

  if (!quiz) return <div className="page"><p className="muted">Quiz not found.</p></div>;

  const score = quiz.questions.filter((q) => answers[q.id] === q.correctIndex).length;

  function reset() {
    setAnswers({});
    setSubmitted(false);
  }

  const submit = () => {
    setSubmitted(true);
    recordQuizResult(quiz.id, score, quiz.questions.length);
  };

  return (
    <div className="page">
      <nav className="breadcrumb">
        <Link to="/quizzes">← All quizzes</Link>
      </nav>
      <h1>{quiz.title}</h1>
      {quiz.description && <p className="lede">{quiz.description}</p>}

      {submitted && (
        <div className="quiz-score">
          Score: {score} / {quiz.questions.length}
          <button className="btn" onClick={reset}>Retry</button>
        </div>
      )}

      {quiz.questions.map((q, qi) => {
        const chosen = answers[q.id];
        const isCorrect = chosen === q.correctIndex;
        return (
          <section key={q.id} className="quiz-question">
            {q.kind === "scenario" && q.scenario && <ScenarioBlock scenario={q.scenario} />}
            <h2>
              {qi + 1}. {q.prompt}
            </h2>
            <div className="quiz-options">
              {q.options.map((opt, oi) => {
                let cls = "quiz-option";
                if (submitted) {
                  if (oi === q.correctIndex) cls += " correct";
                  else if (oi === chosen) cls += " incorrect";
                } else if (chosen === oi) {
                  cls += " selected";
                }
                return (
                  <button
                    key={oi}
                    className={cls}
                    disabled={submitted}
                    onClick={() => setAnswers({ ...answers, [q.id]: oi })}
                  >
                    <span className="quiz-option-letter">{String.fromCharCode(65 + oi)}</span>
                    {opt}
                  </button>
                );
              })}
            </div>

            {submitted && (
              <div className="quiz-explanation">
                {isCorrect ? <strong>Correct.</strong> : <strong>Incorrect.</strong>}{" "}
                {q.explanation}
                {q.entityRefs && q.entityRefs.length > 0 && (
                  <div className="tag-row">
                    {q.entityRefs.map((refStr) => {
                      const e = resolveRef(refStr);
                      if (!e) return null;
                      const [type, rid] = refStr.split(":");
                      return (
                        <Link key={refStr} to={`/${type}/${rid}`} className="tag tag-link">
                          {e.name}
                        </Link>
                      );
                    })}
                  </div>
                )}
                {q.sources && <SourceList sourceIds={q.sources} />}
              </div>
            )}
          </section>
        );
      })}

      {!submitted && (
        <button className="btn btn-primary" onClick={submit}>
          Submit answers
        </button>
      )}
    </div>
  );
}
