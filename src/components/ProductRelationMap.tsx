import { Link } from "react-router-dom";
import {
  relations,
  headToHeads,
  getCompetitorProfile,
  customerSegments,
  getEntityName,
} from "@/data/index";
import type { EntityRef } from "@/data/types";
import { COMPETITION_TIER_LABEL } from "@/data/types";

interface MapItem {
  href: string;
  label: string;
  kind: string;
  note?: string;
  tier?: string;
}

interface MapColumn {
  title: string;
  items: MapItem[];
}

function toItem(ref: EntityRef, kind: string, note?: string, tier?: string): MapItem | null {
  const name = getEntityName(ref);
  if (name === `${ref.type}:${ref.id}`) return null;
  const path = ref.type === "useCase" ? "customers" : ref.type;
  return { href: `/${path}/${ref.id}`, label: name, kind, note, tier };
}

function dedup(items: MapItem[]): MapItem[] {
  const seen = new Set<string>();
  return items.filter((i) => {
    const k = `${i.href}|${i.kind}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
}

/**
 * A per-product relationship map: the product in the centre, and its
 * technology → regulation → regulator → customer → competitor relationships
 * laid out as clickable columns. Drives the "CARBON → XBRL → ESEF →
 * listed companies → ESMA/SEC → Workiva/Toppan Merrill" style chains.
 */
export default function ProductRelationMap({ productId }: { productId: string }) {
  const productName = getEntityName({ type: "product", id: productId });

  const tech = relations
    .filter((r) => r.from.type === "product" && r.from.id === productId && r.to.type === "technology")
    .map((r) => toItem(r.to, "built with", r.note));

  const regs = relations
    .filter((r) => r.from.type === "product" && r.from.id === productId && r.to.type === "regulation")
    .map((r) => toItem(r.to, r.kind === "compliesWith" ? "complies with" : "supports", r.note));

  const regIds = new Set(
    relations
      .filter((r) => r.from.type === "product" && r.from.id === productId && r.to.type === "regulation")
      .map((r) => r.to.id)
  );
  const regs2 = relations.filter(
    (r) => r.from.type === "regulator" && r.to.type === "regulation" && regIds.has(r.to.id)
  );
  const regulators = regs2.map((r) => toItem(r.from, "enforces", r.note));

  const uses = relations
    .filter((r) => r.to.type === "product" && r.to.id === productId && r.kind === "uses" && r.from.type === "company")
    .map((r) => toItem(r.from, "uses", r.note));

  const segments = customerSegments
    .filter((s) => s.productIds.includes(productId))
    .map((s) => ({
      href: "/customers",
      label: s.name,
      kind: "segment",
      note: s.chain.problem,
    }));

  const hh = headToHeads.filter((h) => h.irisProductId === productId);
  const competitors = hh
    .map((h) => {
      const prof = getCompetitorProfile(h.competitorCompanyId);
      return toItem(
        { type: "company", id: h.competitorCompanyId },
        "competes with",
        h.summary.replace(/[*#]/g, ""),
        prof ? COMPETITION_TIER_LABEL[prof.tier] : undefined
      );
    })
    .filter((x): x is MapItem => x !== null);

  const relProd = relations
    .filter(
      (r) =>
        (r.from.type === "product" && r.from.id === productId && r.to.type === "product") ||
        (r.to.type === "product" && r.to.id === productId && r.from.type === "product")
    )
    .map((r) => {
      const other = r.from.id === productId ? r.to : r.from;
      return toItem(other, "related to", r.note);
    });

  const columns: MapColumn[] = [
    { title: "Built with", items: dedup(tech.filter((x): x is MapItem => !!x)) },
    { title: "Complies with / supports", items: dedup(regs.filter((x): x is MapItem => !!x)) },
    { title: "Enforced by", items: dedup(regulators.filter((x): x is MapItem => !!x)) },
    { title: "Used by", items: dedup([...(uses.filter((x): x is MapItem => !!x)), ...segments]) },
    { title: "Competes with", items: dedup(competitors) },
    { title: "Related products", items: dedup(relProd.filter((x): x is MapItem => !!x)) },
  ];

  return (
    <div className="prod-map">
      <div className="prod-map-root">
        <span className="prod-map-root-label">Product</span>
        <Link to={`/product/${productId}`} className="prod-map-root-name">
          {productName}
        </Link>
      </div>
      <div className="prod-map-cols">
        {columns.map((col) => (
          <div key={col.title} className="prod-map-col">
            <h4>{col.title}</h4>
            {col.items.length === 0 ? (
              <p className="muted prod-map-empty">—</p>
            ) : (
              <ul className="prod-map-items">
                {col.items.map((it) => (
                  <li key={`${it.href}|${it.kind}|${it.label}`} className="prod-map-item">
                    <Link to={it.href} className="prod-map-link">
                      {it.label}
                    </Link>
                    <span className="prod-map-kind">{it.kind}</span>
                    {it.tier && <span className="prod-map-tier">{it.tier}</span>}
                    {it.note && <span className="prod-map-note">{it.note}</span>}
                  </li>
                ))}
              </ul>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
