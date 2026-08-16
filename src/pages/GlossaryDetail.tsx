import { useParams } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import EntityDetail from "@/components/EntityDetail";
import RelationList from "@/components/RelationList";

export default function GlossaryDetail() {
  const { id } = useParams();
  const term = knowledgeBase.glossary.find((g) => g.id === id);
  if (!term) return <div className="page"><p className="muted">Term not found.</p></div>;

  return (
    <div className="page">
      <EntityDetail
        entity={term}
        backTo="/glossary"
        meta={term.acronymOf ? [{ label: "Full form", value: term.acronymOf }] : []}
      >
        <section>
          <h2>Relationships</h2>
          <RelationList entityRef={{ type: "glossary", id: term.id }} />
        </section>
      </EntityDetail>
    </div>
  );
}
