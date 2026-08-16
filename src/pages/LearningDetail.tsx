import { useParams, Link } from "react-router-dom";
import { knowledgeBase, resolveRef } from "@/data/index";
import Markdown from "@/components/Markdown";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";
import { useProgress, completeModule, uncompleteModule } from "@/lib/progress";

export default function LearningDetail() {
  const { id } = useParams();
  const mod = knowledgeBase.learningModules.find((m) => m.id === id);
  const progress = useProgress();
  if (!mod) return <div className="page"><p className="muted">Module not found.</p></div>;

  const done = progress.modules.includes(mod.id);
  const level = mod.level;

  return (
    <div className="page">
      <nav className="breadcrumb">
        <Link to="/learning">← All modules</Link>
      </nav>
      <h1>{mod.title}</h1>
      <p className="lede">{mod.summary}</p>

      <div className="module-meta">
        {mod.track && <span className="chip"><span className="chip-type">{mod.track}</span>{mod.track === "PATH" && level ? `Level ${level}` : mod.track === "SNAPSHOT" ? "time-boxed" : "guided"}</span>}
        <button
          className={`btn ${done ? "" : "btn-primary"}`}
          onClick={() => (done ? uncompleteModule(mod.id) : completeModule(mod.id))}
        >
          {done ? "✓ Completed — mark incomplete" : "Mark as complete"}
        </button>
      </div>

      {mod.sections.map((s) => (
        <section key={s.heading} className="section">
          <h2>{s.heading}</h2>
          {s.certainty && <CertaintyTag certainty={s.certainty} />}
          <Markdown text={s.body} />
          {s.sources && s.sources.length > 0 && <SourceList sourceIds={s.sources} />}
        </section>
      ))}

      {mod.entityRefs.length > 0 && (
        <section className="section">
          <h2>Related entities</h2>
          <div className="tag-row">
            {mod.entityRefs.map((refStr) => {
              const e = resolveRef(refStr);
              if (!e) return null;
              return (
                <Link key={refStr} to={`/${refStr.split(":")[0]}/${refStr.split(":")[1]}`} className="tag tag-link">
                  {e.name}
                </Link>
              );
            })}
          </div>
        </section>
      )}
    </div>
  );
}
