import { useMemo, useState, useEffect, useCallback } from "react";
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
  const [filter, setFilter] = useState<"all" | "unmastered" | "mastered">("all");
  const [shuffled, setShuffled] = useState(false);
  const [customOrder, setCustomOrder] = useState<number[]>([]);

  const rawActive = useMemo(
    () => (deck ? cards.filter((c) => c.deck === deck) : []),
    [deck, cards]
  );

  const filteredCards = useMemo(() => {
    let result = rawActive;
    if (filter === "unmastered") {
      result = result.filter((c) => !progress.flashcards.includes(c.id));
    } else if (filter === "mastered") {
      result = result.filter((c) => progress.flashcards.includes(c.id));
    }
    if (shuffled && customOrder.length === result.length) {
      return customOrder.map((idx) => result[idx]);
    }
    return result;
  }, [rawActive, filter, progress.flashcards, shuffled, customOrder]);

  const current = filteredCards[index];
  const mastered = current ? progress.flashcards.includes(current.id) : false;

  const masteredCount = rawActive.filter((c) => progress.flashcards.includes(c.id)).length;
  const totalDeckCount = rawActive.length;
  const deckMasteryPercent =
    totalDeckCount > 0 ? Math.round((masteredCount / totalDeckCount) * 100) : 0;

  function selectDeck(d: string) {
    setDeck(d);
    setIndex(0);
    setFlipped(false);
    setFilter("all");
    setShuffled(false);
  }

  function handleShuffle() {
    if (filteredCards.length <= 1) return;
    const indices = Array.from({ length: filteredCards.length }, (_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    setCustomOrder(indices);
    setShuffled(true);
    setIndex(0);
    setFlipped(false);
  }

  const handleNext = useCallback(() => {
    if (index < filteredCards.length - 1) {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  }, [index, filteredCards.length]);

  const handlePrev = useCallback(() => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setFlipped(false);
    }
  }, [index]);

  const handleFlip = useCallback(() => {
    setFlipped((f) => !f);
  }, []);

  const handleGrade = useCallback(
    (grade: "hard" | "good" | "easy") => {
      if (!current) return;
      if (grade === "easy") {
        if (!mastered) masterCard(current.id);
      } else if (grade === "hard") {
        if (mastered) unmasterCard(current.id);
      }
      handleNext();
    },
    [current, mastered, handleNext]
  );

  // Keyboard navigation
  useEffect(() => {
    function onKeyDown(e: KeyboardEvent) {
      if (
        document.activeElement?.tagName === "INPUT" ||
        document.activeElement?.tagName === "TEXTAREA"
      ) {
        return;
      }

      if (e.code === "Space" || e.key === "Enter") {
        e.preventDefault();
        handleFlip();
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        handleNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        handlePrev();
      } else if (e.key === "1") {
        handleGrade("hard");
      } else if (e.key === "2") {
        handleGrade("good");
      } else if (e.key === "3") {
        handleGrade("easy");
      }
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [handleFlip, handleNext, handlePrev, handleGrade]);

  if (!deck) {
    return (
      <div className="page">
        <header className="page-hero">
          <span className="eyebrow">Practice · Active Recall</span>
          <h1 className="page-hero-title">Spaced Repetition Flashcards</h1>
          <p className="page-hero-lede">
            Rapid active recall decks to embed definitions, regulations, products, and concepts in memory.
          </p>
        </header>
        <section className="section">
          <div className="grid-3">
            {decks.map((d) => {
              const deckCards = cards.filter((c) => c.deck === d);
              const deckMastered = deckCards.filter((c) =>
                progress.flashcards.includes(c.id)
              ).length;
              const pct = Math.round((deckMastered / deckCards.length) * 100);

              return (
                <button
                  key={d}
                  type="button"
                  className="info-card deck-card enhanced-deck-card"
                  onClick={() => selectDeck(d)}
                >
                  <div className="deck-card-top">
                    <h3>{d}</h3>
                    <span className="deck-pct-badge">{pct}% mastered</span>
                  </div>
                  <p className="muted" style={{ margin: "0.25rem 0 0.75rem" }}>
                    {deckCards.length} Cards in deck
                  </p>
                  <div className="progress-bar-track" style={{ height: "4px" }}>
                    <div className="progress-bar-fill" style={{ width: `${pct}%` }} />
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="page flashcard-study-page">
      <nav className="breadcrumb flex-between">
        <button type="button" className="linklike" onClick={() => setDeck(null)}>
          ← Back to All Decks
        </button>
        <span className="flashcard-deck-name">{deck}</span>
      </nav>

      {/* Deck Progress Bar */}
      <div className="flashcard-stats-banner">
        <div className="stats-info">
          <span>
            Card <strong>{filteredCards.length > 0 ? index + 1 : 0}</strong> of{" "}
            <strong>{filteredCards.length}</strong>
          </span>
          <span className="muted">
            Deck Mastery: {masteredCount}/{totalDeckCount} ({deckMasteryPercent}%)
          </span>
        </div>
        <div className="progress-bar-track" style={{ height: "6px", margin: "0.5rem 0" }}>
          <div
            className="progress-bar-fill"
            style={{ width: `${deckMasteryPercent}%` }}
          />
        </div>

        {/* Filter Controls & Shuffle */}
        <div className="flashcard-toolbar">
          <div className="filter-pill-group">
            <button
              type="button"
              className={`filter-pill ${filter === "all" ? "active" : ""}`}
              onClick={() => {
                setFilter("all");
                setIndex(0);
                setFlipped(false);
              }}
            >
              All ({rawActive.length})
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === "unmastered" ? "active" : ""}`}
              onClick={() => {
                setFilter("unmastered");
                setIndex(0);
                setFlipped(false);
              }}
            >
              Needs Review ({rawActive.length - masteredCount})
            </button>
            <button
              type="button"
              className={`filter-pill ${filter === "mastered" ? "active" : ""}`}
              onClick={() => {
                setFilter("mastered");
                setIndex(0);
                setFlipped(false);
              }}
            >
              Mastered ({masteredCount})
            </button>
          </div>

          <button
            type="button"
            className="btn btn-sm btn-shuffle"
            onClick={handleShuffle}
            title="Randomize card order"
          >
            🔀 Shuffle
          </button>
        </div>
      </div>

      {filteredCards.length === 0 ? (
        <div className="flashcard-empty-state">
          <p>No cards match the selected filter.</p>
          <button
            type="button"
            className="btn btn-primary"
            onClick={() => setFilter("all")}
            style={{ marginTop: "1rem" }}
          >
            Show All Cards
          </button>
        </div>
      ) : (
        <>
          {/* Interactive 3D Card */}
          <div
            className={`flashcard interactive-card ${flipped ? "flipped" : ""}`}
            onClick={handleFlip}
            role="button"
            tabIndex={0}
            aria-label="Flashcard - Click or press Space to flip"
          >
            <div className="flashcard-inner">
              <div className="flashcard-face flashcard-front">
                <span className="card-face-tag">Question / Term</span>
                <div className="card-content-text">{current.front}</div>
                <span className="card-flip-prompt">Click or press [Space] to flip ↺</span>
              </div>
              <div className="flashcard-face flashcard-back">
                <span className="card-face-tag">Answer / Explanation</span>
                <div className="card-content-text">{current.back}</div>
                {current.certainty && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <CertaintyTag certainty={current.certainty} />
                  </div>
                )}
                {current.sources && (
                  <div style={{ marginTop: "0.5rem" }}>
                    <SourceList sourceIds={current.sources} />
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Active Recall Confidence Grading */}
          <div className="flashcard-grading-bar">
            <button
              type="button"
              className="btn btn-grade btn-grade-hard"
              onClick={() => handleGrade("hard")}
            >
              <span className="grade-key">[1]</span> 🔴 Hard (Again)
            </button>
            <button
              type="button"
              className="btn btn-grade btn-grade-good"
              onClick={() => handleGrade("good")}
            >
              <span className="grade-key">[2]</span> 🟡 Good
            </button>
            <button
              type="button"
              className="btn btn-grade btn-grade-easy"
              onClick={() => handleGrade("easy")}
            >
              <span className="grade-key">[3]</span> 🟢 Easy (Mastered)
            </button>
          </div>

          {/* Navigation Controls */}
          <div className="flashcard-controls">
            <button
              type="button"
              className="btn"
              disabled={index === 0}
              onClick={handlePrev}
            >
              ← Previous [←]
            </button>
            <button type="button" className="btn btn-flip" onClick={handleFlip}>
              {flipped ? "Show Front" : "Reveal Answer [Space]"}
            </button>
            <button
              type="button"
              className="btn btn-primary"
              disabled={index === filteredCards.length - 1}
              onClick={handleNext}
            >
              Next [→]
            </button>
          </div>
        </>
      )}
    </div>
  );
}
