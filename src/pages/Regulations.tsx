import { knowledgeBase } from "@/data/index";
import EntityCard from "@/components/EntityCard";
import ReportingPipeline from "@/components/ReportingPipeline";

export default function Regulations() {
  const regulations = knowledgeBase.regulations;

  const byJurisdiction = new Map<string, typeof regulations>();
  for (const r of regulations) {
    const key = r.jurisdiction.join(" · ");
    if (!byJurisdiction.has(key)) byJurisdiction.set(key, []);
    byJurisdiction.get(key)!.push(r);
  }

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Regulatory frameworks</span>
        <h1 className="page-hero-title">Regulations</h1>
        <p className="page-hero-lede">
          The regulatory mandates that create demand for IRIS products — reporting
          regimes, tax laws and disclosure requirements across the jurisdictions IRIS
          serves. Each framework carries a full eight-part profile.
        </p>
      </header>

      <section className="section">
        <h2>The reporting pipeline</h2>
        <p className="muted">
          Every mandate, whatever its jurisdiction, flows through the same eight
          stages. Hover each stage to see where IRIS products participate.
        </p>
        <ReportingPipeline />
      </section>

      <section className="section">
        <h2>Frameworks by jurisdiction</h2>
        {[...byJurisdiction.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([jur, items]) => (
          <div key={jur} className="category-block">
            <h3>{jur}</h3>
            <div className="entity-grid">
              {items.map((r) => (
                <EntityCard
                  key={r.id}
                  entity={r}
                  href={`/regulation/${r.id}`}
                  meta={r.status ? `Status: ${r.status}` : undefined}
                />
              ))}
            </div>
          </div>
        ))}
      </section>
    </div>
  );
}
