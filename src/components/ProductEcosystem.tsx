import { Link } from "react-router-dom";
import { productEcosystem, getEntityName } from "@/data/index";
import { products } from "@/data/products";
import Markdown from "./Markdown";

/**
 * IRIS product ecosystem: the portfolio grouped by operating segment, with
 * the relationships between products made explicit. Divested TaxTech products
 * are shown greyed out to signal they are no longer part of IRIS's stack.
 */
export default function ProductEcosystem() {
  const idToName = new Map(products.map((p) => [p.id, p.name]));
  const name = (id: string) => idToName.get(id) ?? getEntityName({ type: "product", id });

  return (
    <div className="ecosystem">
      <Markdown text={productEcosystem.description} />

      <div className="ecosystem-segments">
        {Object.entries(productEcosystem.segments).map(([segment, ids]) => {
          const isDivested = segment.toLowerCase().includes("divested");
          return (
            <div key={segment} className={`ecosystem-segment ${isDivested ? "is-divested" : ""}`}>
              <h3 className="ecosystem-segment-title">{segment}</h3>
              <ul>
                {ids.map((id) => (
                  <li key={id}>
                    <Link to={`/product/${id}`}>{name(id)}</Link>
                  </li>
                ))}
              </ul>
            </div>
          );
        })}
      </div>

      <h3>How products relate</h3>
      <ul className="ecosystem-links">
        {productEcosystem.links.map((l) => (
          <li key={`${l.from}-${l.to}`} className="ecosystem-link">
            <Link to={`/product/${l.from}`}>{name(l.from)}</Link>
            <span className="ecosystem-arrow">→</span>
            <Link to={`/product/${l.to}`}>{name(l.to)}</Link>
            <span className="relation-note">{l.note}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}
