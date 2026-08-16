import { useState } from "react";
import { Link } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import type { ProductLifecycle } from "@/data/types";
import EntityCard from "@/components/EntityCard";
import LifecycleTag from "@/components/LifecycleTag";
import ProductEcosystem from "@/components/ProductEcosystem";
import ProductCompare from "@/components/ProductCompare";

const FILTERS: (ProductLifecycle | "ALL")[] = [
  "ALL",
  "CURRENT",
  "LEGACY",
  "DISCONTINUED",
  "DIVESTED",
  "UNCLEAR",
];

export default function Products() {
  const products = knowledgeBase.products;
  const [filter, setFilter] = useState<"ALL" | ProductLifecycle>("ALL");

  const visible = filter === "ALL" ? products : products.filter((p) => p.lifecycle === filter);

  const byCategory = new Map<string, typeof products>();
  for (const p of visible) {
    for (const c of p.category) {
      if (!byCategory.has(c)) byCategory.set(c, []);
      byCategory.get(c)!.push(p);
    }
  }

  return (
    <div className="page">
      <header className="page-hero">
        <span className="eyebrow">Learn · Product portfolio</span>
        <h1 className="page-hero-title">Products</h1>
        <p className="page-hero-lede">
          The IRIS product portfolio, researched and classified by lifecycle. Current products
          span SupTech (iFILE), RegTech (iDEAL, CARBON) and DataTech (iConnect, Credixo, MSME);
          the GST/TaxTech products were divested to Sovos in 2025.
        </p>
      </header>

      <section className="section">
        <h2>Product ecosystem</h2>
        <ProductEcosystem />
      </section>

      <section className="section">
        <h2>Comparison</h2>
        <ProductCompare />
      </section>

      <section className="section">
        <h2>All products</h2>
        <div className="chip-row">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`chip ${filter === f ? "chip-active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "ALL" ? "All" : f.charAt(0) + f.slice(1).toLowerCase()}
            </button>
          ))}
        </div>
        <div className="entity-grid">
          {visible.map((p) => (
            <EntityCard
              key={p.id}
              entity={p}
              href={`/product/${p.id}`}
              meta={p.category.join(" · ")}
              badge={p.lifecycle ? <LifecycleTag lifecycle={p.lifecycle} /> : undefined}
            />
          ))}
        </div>
      </section>

      <section className="section">
        <h2>By category</h2>
        {[...byCategory.entries()].sort((a, b) => a[0].localeCompare(b[0])).map(([cat, items]) => (
          <div key={cat} className="category-block">
            <h3>{cat}</h3>
            <ul>
              {items.map((p) => (
                <li key={p.id}>
                  <Link to={`/product/${p.id}`}>{p.name}</Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </section>
    </div>
  );
}
