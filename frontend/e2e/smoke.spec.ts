import { test, expect } from "@playwright/test";

test("a home carrega e mostra o título principal", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { name: /onde o aroma se transforma em experiência/i })).toBeVisible();
});

test("categoria de essências lista produtos", async ({ page }) => {
  await page.goto("/categorias/essencias");
  const cards = page.locator("article");
  await expect(cards.first()).toBeVisible();
  expect(await cards.count()).toBeGreaterThan(0);
});

// Dados fixos do seed (lib/mocks/catalog.ts / backend/prisma/seed.ts): a categoria "essências"
// tem 4 produtos (bamboo, chá branco, baunilha, figo verde); só bamboo, baunilha e figo verde
// têm "difusor" nas aplicações recomendadas, então o filtro deve deixar exatamente 3.
const TOTAL_ESSENCIAS = 4;
const TOTAL_ESSENCIAS_DIFUSOR = 3;

// Durante a navegação, o Next (Partial Prerendering) pode manter por um instante uma cópia
// oculta do parágrafo de resumo; por isso filtra só pelo elemento :visible, para não esbarrar
// em "strict mode violation" por dois elementos com o mesmo texto.
function summaryText(page: import("@playwright/test").Page, total: number) {
  return page.locator('p[aria-live="polite"]:visible', { hasText: `${total} produtos` });
}

test("filtro por aplicação reduz a lista de produtos", async ({ page }) => {
  await page.goto("/categorias/essencias");
  // toHaveCount reage (poll) até o grid terminar de streamar; não precisa de espera fixa.
  await expect(page.locator("article")).toHaveCount(TOTAL_ESSENCIAS);
  await expect(summaryText(page, TOTAL_ESSENCIAS)).toBeVisible();

  await page.goto("/categorias/essencias?aplicacao=difusor");
  await expect(page.locator("article")).toHaveCount(TOTAL_ESSENCIAS_DIFUSOR);
  await expect(summaryText(page, TOTAL_ESSENCIAS_DIFUSOR)).toBeVisible();
});

test("adicionar ao carrinho atualiza o contador do cabeçalho", async ({ page }) => {
  await page.goto("/produtos/essencia-baunilha");
  await expect(page.getByRole("link", { name: /carrinho, 0 itens/i })).toBeVisible();

  await page.getByRole("button", { name: /adicionar ao carrinho/i }).click();

  await expect(page.getByRole("link", { name: /carrinho, 1 item\b/i })).toBeVisible();
});

test("o carrinho mostra o item adicionado", async ({ page }) => {
  await page.goto("/produtos/essencia-baunilha");
  await page.getByRole("button", { name: /adicionar ao carrinho/i }).click();

  await page.goto("/carrinho");
  await expect(page.getByText("Essência Baunilha")).toBeVisible();
});

test("produto inexistente responde com HTTP 404", async ({ page }) => {
  const response = await page.goto("/produtos/nao-existe");
  expect(response?.status()).toBe(404);
});

test("favoritos abre sem erro", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(String(error)));

  const response = await page.goto("/favoritos");

  expect(response?.status()).toBe(200);
  await expect(page.getByRole("heading", { name: /seus favoritos/i })).toBeVisible();
  expect(errors).toEqual([]);
});
