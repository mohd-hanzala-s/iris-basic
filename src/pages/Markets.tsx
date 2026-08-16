import { knowledgeBase } from "@/data/index";
import EntityCard from "@/components/EntityCard";

export default function Markets() {
  const markets = knowledgeBase.markets;

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Markets</span>
        <h1 className="page-hero-title">Markets</h1>
        <p className="page-hero-lede">
          The geographic and segment markets IRIS operates in. IRIS serves India, the
          Middle East, Asia Pacific, Africa, the US, Europe and the UK.
        </p>
      </header>

      <section className="section">
        <div className="entity-grid">
          {markets.map((m) => (
            <EntityCard key={m.id} entity={m} href={`/market/${m.id}`} meta={m.region} />
          ))}
        </div>
      </section>
    </div>
  );
}
