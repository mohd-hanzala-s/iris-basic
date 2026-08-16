import { useMemo, useState } from "react";
import { knowledgeBase } from "@/data/index";
import CertaintyTag from "@/components/CertaintyTag";
import SourceList from "@/components/SourceList";
import { useProgress, masterCard, unmasterCard } from "@/lib/progress";

export default function Flashcards() {
  const cards = knowledgeBase.flashcards;
  const progress = useProgress();
  const decks = useMemo(
    () => [...new Set(cards.map((c) => c.deck))].sort(),
    [cards]
  );
  const [deck, setDeck] = useState<string | null>(null);
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const active = deck ? cards.filter((c) => c.deck === deck) : [];
  const current = active[index];
  const mastered = current ? progress.flashcards.includes(current.id) : false;

  function selectDeck(d: string) {
    setDeck(d);
    setIndex(0);
    setFlipped(false);
  }

  if (!deck) {
    return (
      <div className="page">
        <header className="page-hero">
          <span className="eyebrow">Practice · Flashcards</span>
          <h1 className="page-hero-title">Flashcards</h1>
          <p className="page-hero-lede">Choose a deck to study.</p>
        </header>
        <section className="section">
          <div className="grid-3">
            {decks.map((d) => (
              <button key={d} className="info-card deck-card" onClick={() => selectDeck(d)}>
                <h3>{d}</h3>
                <p className="muted">{cards.filter((c) => c.deck === d).length} cards</p>
              </button>
            ))}
          </div>
        </section>
      </div>
    );
  }

  if (!current) {
    return (
      <div className="page">
        <nav className="breadcrumb">
          <button className="linklike" onClick={() => setDeck(null)}>← Decks</button>
        </nav>
        <p className="muted">No cards in this deck.</p>
      </div>
    );
  }

  return (
    <div className="page">
      <nav className="breadcrumb">
        <button className="linklike" onClick={() => setDeck(null)}>← Decks</button>
      </nav>
      <h1>{deck}</h1>
      <p className="muted">
        Card {index + 1} of {active.length}
      </p>

      <div
        className={`flashcard ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped(!flipped)}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && setFlipped(!flipped)}
      >
        <div className="flashcard-face">
          {!flipped ? current.front : current.back}
        </div>
      </div>
      <p className="muted">Click the card to flip.</p>

      {flipped && (
        <div className="flashcard-meta">
          {current.certainty && <CertaintyTag certainty={current.certainty} />}
          {current.sources && <SourceList sourceIds={current.sources} />}
        </div>
      )}

      <div className="flashcard-controls">
        <button
          className="btn"
          disabled={index === 0}
          onClick={() => {
            setIndex(index - 1);
            setFlipped(false);
          }}
        >
          Previous
        </button>
        <button
          className="btn"
          onClick={() => {
            setFlipped(false);
          }}
        >
          Flip
        </button>
        <button
          className="btn btn-primary"
          disabled={index === active.length - 1}
          onClick={() => {
            setIndex(index + 1);
            setFlipped(false);
          }}
        >
          Next
        </button>
      </div>

      <div className="flashcard-master">
        <button
          className={`btn ${mastered ? "" : "btn-primary"}`}
          onClick={() => (mastered ? unmasterCard(current.id) : masterCard(current.id))}
        >
          {mastered ? "✓ Mastered — unmark" : "Mark as mastered"}
        </button>
      </div>
    </div>
  );
}
