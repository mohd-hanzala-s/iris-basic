import { useState, useRef, useEffect } from "react";
import { NavLink, Outlet, useNavigate, useLocation, Link } from "react-router-dom";
import { search, TYPE_LABEL } from "@/lib/search";
import type { SearchHit } from "@/lib/search";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

const NAV_GROUPS: { label: string; items: { to: string; label: string }[] }[] = [
  {
    label: "Learn",
    items: [
      { to: "/start", label: "Start Here" },
      { to: "/guide", label: "Beginner's Guide" },
      { to: "/regtech", label: "RegTech" },
      { to: "/iris", label: "IRIS" },
      { to: "/products", label: "Products" },
      { to: "/regulations", label: "Regulations" },
      { to: "/technology", label: "Technology" },
      { to: "/customers", label: "Customers" },
      { to: "/competitors", label: "Competitors" },
      { to: "/strategy", label: "Strategy" },
    ],
  },
  {
    label: "Explore",
    items: [
      { to: "/concepts", label: "Knowledge Base" },
      { to: "/glossary", label: "Glossary" },
      { to: "/sources", label: "Sources" },
      { to: "/evidence", label: "Evidence" },
      { to: "/graph", label: "Knowledge Graph" },
    ],
  },
  {
    label: "Practice",
    items: [
      { to: "/flashcards", label: "Flashcards" },
      { to: "/quizzes", label: "Quizzes" },
      { to: "/dashboard", label: "Review" },
    ],
  },
];

function SearchBox() {
  const [q, setQ] = useState("");
  const [results, setResults] = useState<SearchHit[]>([]);
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    }
    document.addEventListener("mousedown", onDocClick);
    return () => document.removeEventListener("mousedown", onDocClick);
  }, []);

  function onChange(value: string) {
    setQ(value);
    setResults(value.trim() ? search(value, 8) : []);
    setOpen(true);
  }

  function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (q.trim()) {
      setOpen(false);
      navigate(`/search?q=${encodeURIComponent(q.trim())}`);
    }
  }

  return (
    <div className="search-box" ref={boxRef}>
      <form onSubmit={onSubmit}>
        <input
          type="search"
          placeholder="Search IRIS, products, regulations, competitors…"
          value={q}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </form>
      {open && q.trim() && (
        <div className="search-results">
          {results.length === 0 ? (
            <div className="search-empty">No matches. Press Enter for full search.</div>
          ) : (
            results.map((r) => (
              <Link
                key={`${r.type}:${r.id}`}
                to={r.href}
                className="search-result"
                onClick={() => setOpen(false)}
              >
                <span className="search-result-type">{TYPE_LABEL[r.type]}</span>
                <span className="search-result-title">{r.title}</span>
              </Link>
            ))
          )}
        </div>
      )}
    </div>
  );
}

function ThemeToggle() {
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.getAttribute("data-theme") === "dark" ? "dark" : "light"
  );

  function toggle() {
    const next = theme === "dark" ? "light" : "dark";
    setTheme(next);
    if (next === "dark") {
      document.documentElement.setAttribute("data-theme", "dark");
    } else {
      document.documentElement.removeAttribute("data-theme");
    }
    try {
      localStorage.setItem("iris-theme", next);
    } catch (e) {
      /* ignore */
    }
  }

  return (
    <button className="theme-toggle" onClick={toggle} aria-label="Toggle theme" title="Toggle light / dark">
      {theme === "dark" ? (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
          <circle cx="12" cy="12" r="5" />
          <line x1="12" y1="1" x2="12" y2="3" />
          <line x1="12" y1="21" x2="12" y2="23" />
          <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
          <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
          <line x1="1" y1="12" x2="3" y2="12" />
          <line x1="21" y1="12" x2="23" y2="12" />
          <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
          <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
        </svg>
      ) : (
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
        </svg>
      )}
      <span>{theme === "dark" ? "Light" : "Dark"}</span>
    </button>
  );
}

export default function Layout() {
  return (
    <div className="app">
      <ScrollToTop />
      <header className="app-header">
        <Link to="/" className="brand">
          <span className="brand-mark">I</span>
          <span className="brand-text">
            <span className="brand-name">IRIS RegTech</span>
            <span className="brand-sub">Mastery</span>
          </span>
        </Link>
        <SearchBox />
        <ThemeToggle />
      </header>
      <div className="app-body">
        <nav className="app-nav">
          {NAV_GROUPS.map((group) => (
            <div key={group.label} className="nav-group">
              <div className="nav-group-label">{group.label}</div>
              {group.items.map((item) => (
                <NavLink
                  key={item.to}
                  to={item.to}
                  end={item.to === "/"}
                  className={({ isActive }) => `nav-link${isActive ? " active" : ""}`}
                >
                  {item.label}
                </NavLink>
              ))}
            </div>
          ))}
        </nav>
        <main className="app-main">
          <Outlet />
        </main>
      </div>
      <footer className="app-footer">
        <span>IRIS RegTech Mastery — a personal knowledge &amp; learning system.</span>
        <span>
          Company site:{" "}
          <a href="https://irisregtech.com/" target="_blank" rel="noreferrer">
            irisregtech.com
          </a>
        </span>
      </footer>
    </div>
  );
}
