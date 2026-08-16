import Markdown from "./Markdown";

/**
 * Renders the situational context of a scenario question — the "you are the
 * CTO…" setup that precedes the multiple-choice prompt.
 */
export default function ScenarioBlock({ scenario }: { scenario: string }) {
  return (
    <div className="scenario-block">
      <div className="scenario-label">Scenario</div>
      <Markdown text={scenario} />
    </div>
  );
}
