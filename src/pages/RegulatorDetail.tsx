import { useParams } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import EntityDetail from "@/components/EntityDetail";
import RelationList from "@/components/RelationList";

export default function RegulatorDetail() {
  const { id } = useParams();
  const regulator = knowledgeBase.regulators.find((r) => r.id === id);
  if (!regulator) return <div className="page"><p className="muted">Regulator not found.</p></div>;

  return (
    <div className="page">
      <EntityDetail
        entity={regulator}
        backTo="/customers"
        meta={[
          { label: "Jurisdiction", value: regulator.jurisdiction.join(" · ") },
          { label: "Type", value: regulator.regulatorType.join(" · ") },
        ]}
      >
        <section>
          <h2>Relationships</h2>
          <RelationList entityRef={{ type: "regulator", id: regulator.id }} />
        </section>
      </EntityDetail>
    </div>
  );
}
