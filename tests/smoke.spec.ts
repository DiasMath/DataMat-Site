import { expect, test } from "@playwright/test";
import { paths } from "./pages";

// Cada página abre, tem título e não gera erro no console.
for (const path of paths) {
  test(`página ${path} abre sem erros`, async ({ page }) => {
    const errors: string[] = [];
    page.on("pageerror", (e) => errors.push(e.message));
    page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
    const response = await page.goto(path);
    expect(response?.status()).toBe(200);
    await expect(page.locator("h1").first()).toBeVisible();
    await expect(page).toHaveTitle(/DATAMAT/);
    expect(errors).toEqual([]);
  });
}

test("página inexistente mostra o 404", async ({ page }) => {
  await page.goto("/pagina-que-nao-existe");
  await expect(page.locator("h1")).toHaveText("Esta página não existe.");
});

test("menu leva às páginas de solução", async ({ page, isMobile }) => {
  test.skip(isMobile, "no celular o menu é outro");
  await page.goto("/");
  await page.getByRole("button", { name: /Soluções/ }).click();
  await page
    .getByRole("link", { name: /Dados & BI/ })
    .first()
    .click();
  await expect(page).toHaveURL(/dados-bi/);
  await expect(page.locator("h1")).toContainText("Veja sua empresa");
});

test("formulário avisa que o envio não está conectado", async ({ page }) => {
  await page.goto("/contato/");
  await page.waitForTimeout(3100); // antispam: envio em menos de 3 s é ignorado
  await page.fill("input[name=nome]", "Teste Automático");
  await page.fill("input[name=empresa]", "DATAMAT");
  await page.fill("input[name=email]", "teste@datamat.com.br");
  await page.fill("input[name=whatsapp]", "21999999999");
  await page.selectOption("select[name=solucao]", { index: 1 });
  await page.fill("textarea[name=mensagem]", "Mensagem de teste");
  await page.check("input[name=consentimento]");
  await page.click("button[type=submit]");
  await expect(page.locator(".form-status")).toContainText(
    "não está conectado",
  );
});
