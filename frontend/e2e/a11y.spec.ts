import { test, expect, type Page } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

const WCAG_TAGS = ["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"];
const BLOCKING_IMPACTS = new Set(["critical", "serious"]);

async function auditPage(page: Page, label: string) {
  const results = await new AxeBuilder({ page }).withTags(WCAG_TAGS).analyze();

  const lines = results.violations.flatMap((violation) =>
    violation.nodes.map(
      (node) => `[axe] ${label} | id=${violation.id} impact=${violation.impact} selector=${node.target.join(" ")}`,
    ),
  );
  lines.forEach((line) => console.log(line));

  const blocking = results.violations.filter((v) => BLOCKING_IMPACTS.has(v.impact ?? ""));
  return { violations: results.violations, blocking };
}

test("home — acessibilidade (WCAG 2.0/2.1 A e AA)", async ({ page }) => {
  await page.goto("/");
  const { blocking } = await auditPage(page, "home");
  expect(blocking, "violações critical/serious devem ter sido corrigidas").toEqual([]);
});

test("categoria de essências — acessibilidade", async ({ page }) => {
  await page.goto("/categorias/essencias");
  const { blocking } = await auditPage(page, "/categorias/essencias");
  expect(blocking, "violações critical/serious devem ter sido corrigidas").toEqual([]);
});

test("página de produto — acessibilidade", async ({ page }) => {
  await page.goto("/produtos/essencia-baunilha");
  const { blocking } = await auditPage(page, "/produtos/essencia-baunilha");
  expect(blocking, "violações critical/serious devem ter sido corrigidas").toEqual([]);
});

test("carrinho (com item) — acessibilidade", async ({ page }) => {
  await page.goto("/produtos/essencia-baunilha");
  await page.getByRole("button", { name: /adicionar ao carrinho/i }).click();
  await page.goto("/carrinho");
  await expect(page.getByText("Essência Baunilha")).toBeVisible();

  const { blocking } = await auditPage(page, "/carrinho");
  expect(blocking, "violações critical/serious devem ter sido corrigidas").toEqual([]);
});
