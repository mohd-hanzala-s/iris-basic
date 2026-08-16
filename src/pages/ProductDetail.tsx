import { Link, useParams } from "react-router-dom";
import { knowledgeBase, getProductDive } from "@/data/index";
import { products } from "@/data/products";
import Markdown from "@/components/Markdown";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";
import LifecycleTag from "@/components/LifecycleTag";
import ProductWorkflow from "@/components/ProductWorkflow";
import ProductLevels from "@/components/ProductLevels";
import RelationList from "@/components/RelationList";
import ProductRelationMap from "@/components/ProductRelationMap";

export default function ProductDetail() {
  const { id } = useParams();
  const product = knowledgeBase.products.find((p) => p.id === id);
  const dive = id ? getProductDive(id) : undefined;

  if (!product) return <div className="page"><p className="muted">Product not found.</p></div>;

  const relatedProducts = (dive?.relatedProductIds ?? [])
    .map((rid) => products.find((p) => p.id === rid))
    .filter(Boolean);

  return (
    <div className="page">
      <article className="entity-detail">
        <nav className="breadcrumb">
          <Link to="/products">← Back to products</Link>
        </nav>
        <header className="entity-detail-header">
          <h1>{product.name}</h1>
          <div className="product-header-tags">
            <CertaintyTag certainty={product.certainty} />
            {product.lifecycle && <LifecycleTag lifecycle={product.lifecycle} />}
          </div>
        </header>

        <dl className="meta-grid">
          <div className="meta-item"><dt>Provider</dt><dd>IRIS RegTech Solutions Limited</dd></div>
          <div className="meta-item"><dt>Category</dt><dd>{product.category.join(" · ")}</dd></div>
          <div className="meta-item"><dt>Lifecycle</dt><dd>{product.lifecycle}</dd></div>
          {product.launchYear && <div className="meta-item"><dt>Launched</dt><dd>{String(product.launchYear)}</dd></div>}
        </dl>

        <p className="entity-summary">{product.summary}</p>

        {dive && (
          <>
            {dive.lifecycleNote && (
              <p className="lifecycle-note">
                <strong>Lifecycle note:</strong> {dive.lifecycleNote}
              </p>
            )}

            <section>
              <h2>Knowledge base</h2>
              <div className="aspect-list">
                {dive.aspects.map((a) => (
                  <div key={a.heading} className="aspect">
                    <h3>{a.heading}</h3>
                    <Markdown text={a.body} />
                    <div className="perspective-meta">
                      <CertaintyTag certainty={a.certainty} />
                      <SourceList sourceIds={a.sources} inline />
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h2>Visual workflow</h2>
              <ProductWorkflow steps={dive.workflow} />
            </section>

            <section>
              <h2>Five learning levels</h2>
              <ProductLevels levels={dive.levels} />
            </section>

            {relatedProducts.length > 0 && (
              <section>
                <h2>Related products</h2>
                <div className="entity-grid">
                  {relatedProducts.map((rp) => (
                    <div key={rp!.id} className="entity-card">
                      <Link to={`/product/${rp!.id}`} className="entity-card-title">{rp!.name}</Link>
                      <p className="entity-card-summary">{rp!.summary}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}

        <section>
          <h2>Relationship map</h2>
          <ProductRelationMap productId={product.id} />
        </section>

        <section>
          <h2>Relationships</h2>
          <RelationList entityRef={{ type: "product", id: product.id }} />
        </section>

        <section>
          <h2>Sources</h2>
          {product.sources.length > 0 ? (
            <SourceList sourceIds={product.sources} />
          ) : (
            <p className="muted">No sources recorded yet.</p>
          )}
        </section>
      </article>
    </div>
  );
}
