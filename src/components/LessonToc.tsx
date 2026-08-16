import { useState, useEffect } from "react";

interface LessonTocProps {
  sections: { heading: string }[];
}

export default function LessonToc({ sections }: LessonTocProps) {
  const [activeHeading, setActiveHeading] = useState<string>(
    sections[0]?.heading || ""
  );

  useEffect(() => {
    function onScroll() {
      const headings = document.querySelectorAll(".lesson-section");
      let current = "";
      headings.forEach((el) => {
        const rect = el.getBoundingClientRect();
        if (rect.top <= 160 && rect.bottom >= 160) {
          const headingText = el.querySelector("h2")?.textContent || "";
          current = headingText;
        }
      });
      if (current) {
        setActiveHeading(current);
      }
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  function scrollToSection(heading: string) {
    const headings = document.querySelectorAll(".lesson-section");
    headings.forEach((el) => {
      const h2 = el.querySelector("h2");
      if (h2 && h2.textContent?.includes(heading)) {
        el.scrollIntoView({ behavior: "smooth", block: "start" });
      }
    });
  }

  if (sections.length <= 1) return null;

  return (
    <nav className="lesson-toc" aria-label="Lesson contents outline">
      <div className="lesson-toc-header">
        <span className="toc-icon">📑</span>
        <span className="toc-title">Lesson Outline</span>
      </div>
      <ol className="lesson-toc-list">
        {sections.map((s, idx) => {
          const isActive = activeHeading.includes(s.heading);
          return (
            <li key={s.heading} className={`lesson-toc-item ${isActive ? "active" : ""}`}>
              <button
                type="button"
                className="lesson-toc-link"
                onClick={() => scrollToSection(s.heading)}
              >
                <span className="toc-num">0{idx + 1}</span>
                <span className="toc-text">{s.heading}</span>
              </button>
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
