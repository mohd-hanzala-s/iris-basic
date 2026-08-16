import { Link } from "react-router-dom";
import AudioPlayer from "./AudioPlayer";
import { resolveRef } from "@/data/index";

interface ModuleSummaryCardProps {
  level?: number;
  track?: string;
  summary: string;
  sections: { heading: string; body: string }[];
  entityRefs?: string[];
}

export default function ModuleSummaryCard({
  level,
  track,
  summary,
  sections,
  entityRefs = [],
}: ModuleSummaryCardProps) {
  // Calculate approximate reading time based on total words (approx 200 wpm)
  const totalWords = sections.reduce(
    (acc, s) => acc + (s.body.split(/\s+/).length + s.heading.split(/\s+/).length),
    summary.split(/\s+/).length
  );
  const readTimeMinutes = Math.max(1, Math.ceil(totalWords / 180));

  // Extract difficulty based on level or track
  const difficulty =
    level && level <= 3
      ? "Beginner"
      : level && level <= 7
      ? "Intermediate"
      : level
      ? "Mastery"
      : "Executive Overview";

  // Full text for speech player
  const fullText = `${summary}. ${sections
    .map((s) => `${s.heading}. ${s.body}`)
    .join(". ")}`;

  // High-yield takeaway points (first sentence of each section)
  const takeaways = sections.map((s) => {
    const firstSentence = s.body.split(/\.\s+/)[0];
    return {
      heading: s.heading,
      snippet: firstSentence.endsWith(".") ? firstSentence : `${firstSentence}.`,
    };
  });

  return (
    <div className="speed-summary-card">
      <div className="speed-summary-top">
        <div className="speed-summary-badges">
          <span className="badge-pill badge-time">⏱️ {readTimeMinutes} min read</span>
          <span className={`badge-pill badge-diff badge-diff-${difficulty.toLowerCase()}`}>
            🎯 {difficulty}
          </span>
          {track && (
            <span className="badge-pill badge-track">
              {track === "PATH" && level ? `Level ${level} of 10` : track}
            </span>
          )}
        </div>
        <AudioPlayer text={fullText} />
      </div>

      <div className="speed-summary-content">
        <div className="speed-summary-header">
          <span className="speed-summary-icon">⚡</span>
          <h4>60-Second Key Takeaway</h4>
        </div>
        <p className="speed-summary-text">{summary}</p>

        <div className="speed-takeaways-grid">
          {takeaways.slice(0, 4).map((t, idx) => (
            <div key={idx} className="speed-takeaway-item">
              <span className="takeaway-bullet">{idx + 1}</span>
              <div className="takeaway-body">
                <strong>{t.heading}:</strong> <span>{t.snippet.replace(/[*_#]/g, "")}</span>
              </div>
            </div>
          ))}
        </div>

        {entityRefs.length > 0 && (
          <div className="speed-key-terms">
            <span className="key-terms-label">Key Terms to Know:</span>
            <div className="key-terms-row">
              {entityRefs.slice(0, 6).map((refStr) => {
                const e = resolveRef(refStr);
                if (!e) return null;
                const [type, rid] = refStr.split(":");
                return (
                  <Link key={refStr} to={`/${type}/${rid}`} className="key-term-chip">
                    {e.name}
                  </Link>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
