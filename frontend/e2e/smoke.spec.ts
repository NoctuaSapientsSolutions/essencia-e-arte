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

// A rota usa Partial Prerendering: logo após a navegação, a página pode estar numa transição
// momentânea entre o conteúdo anterior e o novo. Espera a contagem de produtos estabilizar
// (mesmo valor em duas leituras seguidas) antes de comparar, para não ler um estado intermediário.
async function countSettledProducts(page: import("@playwright/test").Page): Promise<number> {
  await expect(page.locator("article").first()).toBeVisible();
  await page.waitForLoadState("networkidle");

  let count = await page.locator("article").count();
  await expect
    .poll(async () => {
      const next = await page.locator("article").count();
      const stable = next === count;
      count = next;
      return stable;
    }, { timeout: 5000 })
    .toBe(true);
  return count;
}

test("filtro por aplicação reduz a lista de produtos", async ({ page }) => {
  await page.goto("/categorias/essencias");
  const totalSemFiltro = await countSettledProducts(page);

  await page.goto("/categorias/essencias?aplicacao=difusor");
  const totalComFiltro = await countSettledProducts(page);

  expect(totalComFiltro).toBeGreaterThan(0);
  expect(totalComFiltro).toBeLessThan(totalSemFiltro);
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
