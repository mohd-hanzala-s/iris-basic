import { useParams } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import EntityDetail from "@/components/EntityDetail";
import RelationList from "@/components/RelationList";

export default function MarketDetail() {
  const { id } = useParams();
  const market = knowledgeBase.markets.find((m) => m.id === id);
  if (!market) return <div className="page"><p className="muted">Market not found.</p></div>;

  return (
    <div className="page">
      <EntityDetail
        entity={market}
        backTo="/markets"
        meta={[
          { label: "Region", value: market.region },
          { label: "Countries", value: (market.countries ?? []).join(" · ") || "—" },
        ]}
      >
        <section>
          <h2>Relationships</h2>
          <RelationList entityRef={{ type: "market", id: market.id }} />
        </section>
      </EntityDetail>
    </div>
  );
}
