import { useState } from "react";
import { timeline, TIMELINE_PHASES, type TimelinePhase } from "@/data/timeline";
import CertaintyTag from "./CertaintyTag";

/**
 * Interactive vertical timeline of IRIS's history, grouped by phase
 * (ORIGIN → EVOLUTION → MAJOR MILESTONES → PRODUCT EVOLUTION →
 * CURRENT POSITION → FUTURE DIRECTION). The phase filter lets the learner
 * focus on one arc of the story at a time.
 */
export default function Timeline() {
  const [phase, setPhase] = useState<TimelinePhase | "ALL">("ALL");

  const events =
    phase === "ALL" ? timeline : timeline.filter((e) => e.phase === phase);

  return (
    <div className="timeline">
      <div className="timeline-filter">
        <button
          className={`chip ${phase === "ALL" ? "chip-active" : ""}`}
          onClick={() => setPhase("ALL")}
        >
          All
        </button>
        {TIMELINE_PHASES.map((p) => (
          <button
            key={p.id}
            className={`chip ${phase === p.id ? "chip-active" : ""}`}
            onClick={() => setPhase(p.id)}
            title={p.blurb}
          >
            {p.label}
          </button>
        ))}
      </div>

      <div className="timeline-track">
        {events.map((e) => (
          <div key={e.id} className="timeline-item">
            <div className="timeline-marker">
              <span className="timeline-year">{e.year}</span>
            </div>
            <div className="timeline-body">
              <div className="timeline-head">
                <span className="timeline-phase-tag">{e.phase}</span>
                <CertaintyTag certainty={e.certainty} />
              </div>
              <h3 className="timeline-title">{e.title}</h3>
              <p className="timeline-desc">{e.description}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
