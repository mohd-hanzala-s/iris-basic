import { knowledgeBase } from "@/data/index";
import type { DocStatus } from "@/data/types";
import EntityCard from "@/components/EntityCard";
import DocStatusTag from "@/components/DocStatusTag";

const STATUS_ORDER: DocStatus[] = ["PUBLICLY_DOCUMENTED", "ARCHITECTURAL_INFERENCE", "UNKNOWN"];

export default function Technology() {
  const techs = knowledgeBase.technologies;

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Technology</span>
        <h1 className="page-hero-title">Technology</h1>
        <p className="page-hero-lede">
          The technologies and standards underpinning IRIS products and the RegTech
          domain. Every entry is classified by how confidently it is documented as
          something IRIS actually uses — <strong>publicly documented</strong>,{" "}
          <strong>architectural inference</strong>, or <strong>unknown</strong> — so
          speculation is never mistaken for fact.
        </p>
      </header>

      <div className="docstatus-legend">
        {STATUS_ORDER.map((s) => (
          <span key={s} className="docstatus-legend-item">
            <DocStatusTag docStatus={s} />
          </span>
        ))}
      </div>

      <section className="section">
        <div className="entity-grid">
          {techs.map((t) => (
            <EntityCard
              key={t.id}
              entity={t}
              href={`/technology/${t.id}`}
              meta={[t.category.join(" · "), t.standardOf ? `Standard: ${t.standardOf}` : null].filter(Boolean).join("  ·  ")}
              badge={<DocStatusTag docStatus={t.docStatus} />}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
