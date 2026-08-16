import { Link } from "react-router-dom";
import { reportingPipeline } from "@/data/reportingPipeline";
import { products } from "@/data/products";
import { technologies } from "@/data/technologies";
import Markdown from "./Markdown";
import SourceList from "./SourceList";

/**
 * The canonical reporting pipeline:
 * REGULATION → TAXONOMY → DATA → TRANSFORMATION → VALIDATION → REPORT → SUBMISSION → REGULATOR.
 * Each stage shows which IRIS products and technologies participate.
 */
export default function ReportingPipeline() {
  const productName = new Map(products.map((p) => [p.id, p.name]));
  const techName = new Map(technologies.map((t) => [t.id, t.name]));

  return (
    <div className="pipeline">
      <p className="pipeline-desc">{reportingPipeline.description}</p>

      <div className="pipeline-stages">
        {reportingPipeline.stages.map((s, i) => (
          <div key={s.id} className="pipeline-stage-wrap">
            <div className="pipeline-stage">
              <div className="pipeline-stage-label">{s.label}</div>
              <h4 className="pipeline-stage-title">{s.title}</h4>
              <Markdown text={s.body} />
              <div className="pipeline-participants">
                {s.irisProducts.length > 0 && (
                  <div className="pipeline-group">
                    <span className="pipeline-group-label">IRIS</span>
                    {s.irisProducts.map((pid) => (
                      <Link key={pid} to={`/product/${pid}`} className="pipeline-chip pipeline-chip-product">
                        {productName.get(pid) ?? pid}
                      </Link>
                    ))}
                  </div>
                )}
                {s.technologies.length > 0 && (
                  <div className="pipeline-group">
                    <span className="pipeline-group-label">Tech</span>
                    {s.technologies.map((tid) => (
                      <Link key={tid} to={`/technology/${tid}`} className="pipeline-chip pipeline-chip-tech">
                        {techName.get(tid) ?? tid}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
              <SourceList sourceIds={s.sources} inline />
            </div>
            {i < reportingPipeline.stages.length - 1 && <div className="flow-arrow">→</div>}
          </div>
        ))}
      </div>
    </div>
  );
}
