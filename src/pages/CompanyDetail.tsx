import { useParams } from "react-router-dom";
import { knowledgeBase } from "@/data/index";
import EntityDetail from "@/components/EntityDetail";
import RelationList from "@/components/RelationList";

export default function CompanyDetail() {
  const { id } = useParams();
  const company = knowledgeBase.companies.find((c) => c.id === id);
  if (!company) return <div className="page"><p className="muted">Company not found.</p></div>;

  return (
    <div className="page">
      <EntityDetail
        entity={company}
        backTo="/"
        meta={[
          { label: "Type", value: company.companyType },
          { label: "Founded", value: company.founded ? String(company.founded) : "—" },
          { label: "Headquarters", value: company.headquarters ?? "—" },
          { label: "Ticker", value: company.ticker ?? "—" },
          { label: "Employees", value: company.employees ? String(company.employees) : "—" },
          { label: "Website", value: company.website ?? "—" },
        ]}
      >
        <section>
          <h2>Relationships</h2>
          <RelationList entityRef={{ type: "company", id: company.id }} />
        </section>
      </EntityDetail>
    </div>
  );
}
