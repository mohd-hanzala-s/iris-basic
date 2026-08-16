import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";

const BASE = "http://localhost:5173";
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1280, height: 900 } });

let consoleErrors = 0;
page.on("console", (m) => { if (m.type() === "error") consoleErrors++; });
page.on("pageerror", () => consoleErrors++);

async function goto(url, tries = 3) {
  for (let i = 0; i < tries; i++) {
    try {
      await page.goto(BASE + url, { waitUntil: "domcontentloaded", timeout: 25000 });
      await page.waitForTimeout(600);
      return true;
    } catch {
      await page.waitForTimeout(1500);
    }
  }
  return false;
}

const routes = [
  "/", "/start", "/guide", "/regtech", "/iris", "/products", "/regulations", "/technology",
  "/customers", "/competitors", "/strategy", "/concepts", "/glossary", "/sources",
  "/evidence", "/graph", "/flashcards", "/quizzes", "/dashboard",
  "/product/iris-carbon", "/company/iris", "/regulator/rbi", "/regulation/esef",
  "/technology/xbrl-standard", "/market/india", "/glossary/regtech",
  "/concept/regtech", "/learning/regtech-from-zero", "/quizzes/quiz-foundations-1",
  "/competitor/sovos", "/follow/data", "/claims", "/search?q=xbrl",
];

const problems = [];
for (const r of routes) {
  consoleErrors = 0;
  const ok = await goto(r);
  if (!ok) { problems.push(`${r}: NAVIGATION TIMEOUT`); console.log(`FAIL ${r}: nav timeout`); continue; }
  const text = await page.locator(".app-main").innerText().catch(() => "");
  const empty = text.trim().length < 30;
  if (empty) problems.push(`${r}: EMPTY`);
  if (consoleErrors > 0) problems.push(`${r}: ${consoleErrors} console errors`);
  console.log(`${empty ? "FAIL" : "OK  "} ${r}${consoleErrors ? "  (" + consoleErrors + " errors)" : ""}`);
}

// Click-through: from each index page, click the first entity card link.
const indexToDetail = [
  ["/products", "a.entity-card", /\/product\//],
  ["/regulations", "a.entity-card", /\/regulation\//],
  ["/technology", "a.entity-card", /\/technology\//],
  ["/customers", ".segment-chip", /\/product\//],
  ["/glossary", ".glossary-term", /\/glossary\//],
  ["/concepts", "a.entity-card", /\/concept\//],
];
console.log("\n=== Click-through from index to detail ===\n");
for (const [idx, sel, re] of indexToDetail) {
  consoleErrors = 0;
  if (!(await goto(idx))) { problems.push(`${idx}: click nav timeout`); console.log(`FAIL ${idx}`); continue; }
  const links = page.locator(sel);
  const count = await links.count();
  if (count === 0) { console.log(`SKIP ${idx} (no ${sel})`); continue; }
  const href = await links.first().getAttribute("href");
  await links.first().click().catch(() => {});
  await page.waitForTimeout(900);
  const url = page.url();
  const text = await page.locator(".app-main").innerText().catch(() => "");
  const empty = text.trim().length < 30;
  if (empty) problems.push(`${idx} -> ${href}: EMPTY after click`);
  if (consoleErrors > 0) problems.push(`${idx} -> ${href}: ${consoleErrors} errors`);
  console.log(`${empty ? "FAIL" : "OK  "} ${idx} -> ${href}  (${url.replace(BASE, "")})`);
}

await browser.close();
console.log(`\n=== ${problems.length} PROBLEM(S) ===`);
for (const p of problems) console.log("  " + p);
process.exit(problems.length ? 1 : 0);
