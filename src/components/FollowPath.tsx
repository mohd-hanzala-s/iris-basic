import { Link } from "react-router-dom";
import { resolveRef } from "@/data/index";
import type { FollowPath } from "@/data/types";
import Markdown from "./Markdown";
import CertaintyTag from "./CertaintyTag";
import SourceList from "./SourceList";

/**
 * Renders a guided traversal ("Follow the Data" / "Follow the Regulation") as
 * an ordered chain of steps, each linking to the entities involved.
 */
export default function FollowPathView({ path }: { path: FollowPath }) {
  return (
    <div className="follow-path">
      <header className="follow-path-head">
        <h1>{path.title}</h1>
        <Markdown text={path.description} />
      </header>

      <ol className="follow-steps">
        {path.steps.map((step) => (
          <li key={step.label} className="follow-step">
            <div className="follow-step-label">{step.label}</div>
            <Markdown text={step.body} />
            {step.certainty && <CertaintyTag certainty={step.certainty} />}
            {step.refs.length > 0 && (
              <div className="follow-refs">
                {step.refs.map((ref) => {
                  const e = resolveRef(`${ref.type}:${ref.id}`);
                  if (!e) return null;
                  const path = ref.type === "useCase" ? "customers" : ref.type;
                  return (
                    <Link key={`${ref.type}:${ref.id}`} to={`/${path}/${ref.id}`} className="chip">
                      <span className="chip-type">{ref.type}</span>
                      {e.name}
                    </Link>
                  );
                })}
              </div>
            )}
            {step.sources && step.sources.length > 0 && <SourceList sourceIds={step.sources} inline />}
          </li>
        ))}
      </ol>
    </div>
  );
}
