import { Link } from "react-router-dom";
import { getEntityName } from "@/data/index";
import { products } from "@/data/products";
import { EDGE_LABEL } from "@/data/types";
import type { HeadToHead } from "@/data/types";
import CertaintyTag from "./CertaintyTag";
import Markdown from "./Markdown";
import SourceList from "./SourceList";

/**
 * An IRIS product vs a competitor, compared dimension-by-dimension, with the
 * edge called out per row and a summary of where each side wins and why it
 * matters. No scores are manufactured — edges are qualitative and honest.
 */
export default function HeadToHeadView({ hh }: { hh: HeadToHead }) {
  const product = products.find((p) => p.id === hh.irisProductId);
  const competitor = getEntityName({ type: "company", id: hh.competitorCompanyId });

  return (
    <div className="h2h">
      <div className="h2h-head">
        <Link to={`/product/${hh.irisProductId}`} className="h2h-side h2h-iris">
          {product?.name ?? hh.irisProductId}
        </Link>
        <span className="h2h-vs">vs</span>
        <Link to={`/company/${hh.competitorCompanyId}`} className="h2h-side h2h-competitor">
          {competitor}
        </Link>
        <CertaintyTag certainty={hh.certainty} />
      </div>

      <Markdown text={hh.summary} />

      <div className="h2h-table-wrap">
        <table className="h2h-table">
          <thead>
            <tr>
              <th>Dimension</th>
              <th>{product?.name ?? "IRIS"}</th>
              <th>{competitor}</th>
              <th>Edge</th>
            </tr>
          </thead>
          <tbody>
            {hh.rows.map((r) => (
              <tr key={r.dimension}>
                <td className="h2h-dim">{r.dimension}</td>
                <td>{r.iris}</td>
                <td>{r.competitor}</td>
                <td>
                  <span className={`edge edge-${r.edge.toLowerCase()}`}>{EDGE_LABEL[r.edge]}</span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="grid-2">
        <section className="h2h-edges">
          <h3>Where IRIS has an edge</h3>
          <ul className="bullet-list">
            {hh.irisEdges.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
        <section className="h2h-edges h2h-edges-comp">
          <h3>Where the competitor has an edge</h3>
          <ul className="bullet-list bullet-list-negative">
            {hh.competitorEdges.map((e) => (
              <li key={e}>{e}</li>
            ))}
          </ul>
        </section>
      </div>

      <section>
        <h3>Why that edge matters</h3>
        <Markdown text={hh.whyItMatters} />
      </section>

      <section>
        <h3>Evidence</h3>
        <Markdown text={hh.evidence} />
        <SourceList sourceIds={hh.sources} inline />
      </section>
    </div>
  );
}
