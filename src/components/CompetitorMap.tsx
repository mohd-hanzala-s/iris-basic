import { Link } from "react-router-dom";
import { getEntityName } from "@/data/index";
import { competitorMap, productMatrix } from "@/data/competitorIntelligence";
import { products } from "@/data/products";
import CompetitionTierTag from "./CompetitionTierTag";
import Markdown from "./Markdown";

/**
 * The competitor map (segments → competitors) and the product matrix
 * (products → competitors with tier + note).
 */
export default function CompetitorMap() {
  const productName = new Map(products.map((p) => [p.id, p.name]));

  return (
    <div className="comp-landscape">
      <section>
        <h2>Competitor map</h2>
        <p className="muted">
          Competitors grouped by the IRIS segment they compete in. A company can
          appear in more than one segment.
        </p>
        <div className="comp-map">
          {competitorMap.map((seg) => (
            <div key={seg.segment} className="comp-map-segment">
              <h3>{seg.segment}</h3>
              <Markdown text={seg.description} />
              <div className="comp-map-companies">
                {seg.competitorIds.map((cid) => (
                  <Link key={cid} to={`/company/${cid}`} className="comp-chip">
                    {getEntityName({ type: "company", id: cid })}
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section>
        <h2>Product matrix</h2>
        <p className="muted">
          IRIS product vs competitor, with tier and the nature of the overlap.
        </p>
        <div className="matrix">
          {productMatrix.map((row) => (
            <div key={row.productId} className="matrix-row">
              <div className="matrix-product">
                <Link to={`/product/${row.productId}`}>
                  {productName.get(row.productId) ?? row.productId}
                </Link>
              </div>
              <div className="matrix-cells">
                {row.cells.map((cell) => (
                  <div key={cell.competitorId} className="matrix-cell">
                    <div className="matrix-cell-head">
                      <Link to={`/company/${cell.competitorId}`} className="matrix-cell-name">
                        {getEntityName({ type: "company", id: cell.competitorId })}
                      </Link>
                      <CompetitionTierTag tier={cell.tier} />
                    </div>
                    <span className="matrix-cell-note">{cell.note}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
