import { chromium } from "/usr/local/lib/node_modules/playwright/index.mjs";

const BASE = "http://localhost:5173";

const NAV_LINKS = [
  "/start", "/regtech", "/iris", "/products", "/regulations", "/technology",
  "/customers", "/competitors", "/strategy",
  "/concepts", "/glossary", "/sources", "/evidence", "/graph",
  "/flashcards", "/quizzes", "/dashboard",
];

const results = [];

const browser = await chromium.launch();
const page = await browser.newPage();

const consoleErrors = [];
page.on("console", (msg) => {
  if (msg.type() === "error") consoleErrors.push(msg.text());
});
page.on("pageerror", (err) => consoleErrors.push("PAGEERROR: " + err.message));

async function checkPage(url, label) {
  consoleErrors.length = 0;
  let resp;
  try {
    resp = await page.goto(BASE + url, { waitUntil: "domcontentloaded", timeout: 30000 });
  } catch (e) {
    results.push({ href: url, status: "goto-fail", note: String(e.message) });
    console.log(`${label.padEnd(28)} GOTO FAIL: ${e.message}`);
    return;
  }
  const status = resp ? resp.status() : "n/a";
  const content = await page.locator(".app-main").first().innerText().catch(() => "");
  const hasContent = content.trim().length > 30;
  const errNote = consoleErrors.length ? consoleErrors.join(" | ") : "";
  const note = (hasContent ? "" : "EMPTY CONTENT") + (errNote ? " ERR: " + errNote : "");
  results.push({ href: url, status: String(status), note: note || "OK" });
  console.log(`${label.padEnd(28)} ${status}  ${note || "OK"}`);
}

console.log("=== Direct page loads (every route) ===\n");
for (const href of NAV_LINKS) await checkPage(href, href);
await checkPage("/product/iris-carbon", "/product/iris-carbon");
await checkPage("/company/iris", "/company/iris");
await checkPage("/regulator/rbi", "/regulator/rbi");
await checkPage("/regulation/esef", "/regulation/esef");
await checkPage("/technology/xbrl-standard", "/technology/xbrl-standard");
await checkPage("/market/india", "/market/india");
await checkPage("/glossary/regtech", "/glossary/regtech");
await checkPage("/concept/regtech", "/concept/regtech");
await checkPage("/learning/regtech-from-zero", "/learning/regtech-from-zero");
await checkPage("/quizzes/quiz-foundations-1", "/quizzes/quiz-foundations-1");
await checkPage("/competitor/sovos", "/competitor/sovos");
await checkPage("/follow/data", "/follow/data");

console.log("\n=== Clicking every nav link from home ===\n");
for (const href of NAV_LINKS) {
  consoleErrors.length = 0;
  await page.goto(BASE + "/", { waitUntil: "domcontentloaded", timeout: 30000 });
  const link = page.locator(`nav a[href="${href}"]`).first();
  if ((await link.count()) === 0) {
    results.push({ href, status: "click", note: "NAV LINK NOT FOUND" });
    console.log(`${href.padEnd(28)} NAV LINK NOT FOUND`);
    continue;
  }
  await link.click().catch(() => {});
  await page.waitForTimeout(1200);
  const url = page.url();
  const content = await page.locator(".app-main").first().innerText().catch(() => "");
  const hasContent = content.trim().length > 30;
  const errNote = consoleErrors.length ? consoleErrors.join(" | ") : "";
  const note = (hasContent ? "" : "EMPTY") + (errNote ? " ERR: " + errNote : "");
  results.push({ href, status: "click->" + url.replace(BASE, ""), note: note || "OK" });
  console.log(`${href.padEnd(28)} -> ${url.replace(BASE, "")}  ${note || "OK"}`);
}

await browser.close();

const bad = results.filter((r) => r.note !== "OK");
console.log(`\n=== SUMMARY: ${results.length} checks, ${bad.length} problems ===`);
for (const b of bad) console.log(`PROBLEM ${b.href} (${b.status}): ${b.note}`);
