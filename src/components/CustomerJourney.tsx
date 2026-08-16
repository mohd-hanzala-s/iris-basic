/**
 * Renders a customer segment's realistic end-to-end journey as a numbered,
 * ordered list of stages. Each step describes what the customer actually
 * does, from first contact with the mandate to ongoing use of the product.
 */
export default function CustomerJourney({ journey }: { journey: string[] }) {
  return (
    <ol className="journey">
      {journey.map((step, i) => (
        <li key={i} className="journey-step">
          <span className="journey-num">{i + 1}</span>
          <span className="journey-body">{step}</span>
        </li>
      ))}
    </ol>
  );
}
