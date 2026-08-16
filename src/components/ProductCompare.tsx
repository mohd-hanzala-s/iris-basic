import { Link } from "react-router-dom";
import { products } from "@/data/products";
import { productDeepDives } from "@/data/productDeep";
import LifecycleTag from "./LifecycleTag";

/**
 * Product comparison table. Rows are products, columns are the key
 * decision dimensions: segment, lifecycle, buyers, core output, geography.
 * Divested TaxTech products are greyed out.
 */
export default function ProductCompare() {
  const dives = new Map(productDeepDives.map((d) => [d.productId, d]));

  const field = (productId: string, heading: string): string => {
    const d = dives.get(productId);
    const a = d?.aspects.find((x) => x.heading === heading);
    return a?.body ?? "—";
  };

  const segmentOf = (productId: string): string => {
    const p = products.find((x) => x.id === productId);
    const cats = p?.category ?? [];
    for (const seg of ["SupTech", "RegTech", "DataTech", "TaxTech"]) {
      if (cats.includes(seg)) return seg;
    }
    return cats.join(" · ") || "—";
  };

  return (
    <div className="compare-wrap">
      <table className="compare-table">
        <thead>
          <tr>
            <th>Product</th>
            <th>Segment</th>
            <th>Lifecycle</th>
            <th>Who buys it</th>
            <th>Core output</th>
            <th>Geography</th>
          </tr>
        </thead>
        <tbody>
          {products.map((p) => {
            const dive = dives.get(p.id);
            const divested = dive?.lifecycle === "DIVESTED";
            return (
              <tr key={p.id} className={divested ? "row-divested" : ""}>
                <td className="compare-name"><Link to={`/product/${p.id}`}>{p.name}</Link></td>
                <td>{segmentOf(p.id)}</td>
                <td>{p.lifecycle ? <LifecycleTag lifecycle={p.lifecycle} /> : "—"}</td>
                <td>{field(p.id, "Who buys it?")}</td>
                <td>{field(p.id, "What comes out?")}</td>
                <td>{field(p.id, "Geography")}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
