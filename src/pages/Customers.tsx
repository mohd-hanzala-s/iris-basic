import { Link } from "react-router-dom";
import { customerSegments, getEntityName, companiesByType } from "@/data/index";
import { products } from "@/data/products";
import EntityCard from "@/components/EntityCard";
import SegmentChain from "@/components/SegmentChain";
import CustomerJourney from "@/components/CustomerJourney";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";

export default function Customers() {
  const customers = companiesByType("CUSTOMER");
  const productName = new Map(products.map((p) => [p.id, p.name]));

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Customers</span>
        <h1 className="page-hero-title">Customers</h1>
        <p className="page-hero-lede">
          Who IRIS serves and how. Each segment below is mapped through the six-step
          value chain — customer problem, regulatory requirement, data problem, IRIS
          product, workflow and outcome — plus a realistic end-to-end journey.
        </p>
      </header>

      <section className="section">
        <h2>Customer segments</h2>
        <div className="segment-list">
          {customerSegments.map((seg) => (
            <div key={seg.id} className="segment-card">
              <div className="segment-head">
                <h3>{seg.name}</h3>
                <CertaintyTag certainty={seg.certainty} />
              </div>
              <p className="segment-desc">{seg.description}</p>

              <h4>Value chain</h4>
              <SegmentChain chain={seg.chain} />

              <h4>Customer journey</h4>
              <CustomerJourney journey={seg.journey} />

              <div className="segment-footer">
                <div className="segment-products">
                  <span className="segment-foot-label">Products</span>
                  {seg.productIds.map((pid) => (
                    <Link key={pid} to={`/product/${pid}`} className="segment-chip">
                      {productName.get(pid) ?? pid}
                    </Link>
                  ))}
                </div>
                {seg.entityRefs.length > 0 && (
                  <div className="segment-entities">
                    <span className="segment-foot-label">Examples</span>
                    {seg.entityRefs.map((ref) => (
                      <Link
                        key={`${ref.type}:${ref.id}`}
                        to={ref.type === "regulator" ? `/regulator/${ref.id}` : `/company/${ref.id}`}
                        className="segment-chip segment-chip-entity"
                      >
                        {getEntityName(ref)}
                      </Link>
                    ))}
                  </div>
                )}
                <SourceList sourceIds={seg.sources} inline />
              </div>
            </div>
          ))}
        </div>
      </section>

      {customers.length > 0 && (
        <section className="section">
          <h2>Named customers</h2>
          <div className="entity-grid">
            {customers.map((c) => (
              <EntityCard key={c.id} entity={c} href={`/company/${c.id}`} />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
