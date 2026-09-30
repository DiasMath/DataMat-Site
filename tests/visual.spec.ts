import { expect, test } from "@playwright/test";
import { freeze, paths } from "./pages";

/**
 * Compara o visual de cada página com a referência salva.
 * Mudou o visual de propósito? Rode: npm run test:update
 */
for (const path of paths) {
  test(`visual ${path}`, async ({ page }) => {
    await page.goto(path, { waitUntil: "networkidle" });
    await page.addStyleTag({ content: freeze });
    await page.evaluate(() => document.fonts.ready);
    await expect(page).toHaveScreenshot({ fullPage: true });
  });
}
