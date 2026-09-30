import { defineConfig, devices } from "@playwright/test";

/**
 * Testes automáticos do site (npm run test).
 * Usam um build especial sem animações (npm run build:test), para os prints
 * saírem sempre iguais. Primeira vez: npx playwright install chromium
 */
export default defineConfig({
  testDir: "tests",
  fullyParallel: true,
  reporter: [["list"], ["html", { open: "never" }]],
  use: {
    baseURL: "http://localhost:4173",
    launchOptions: process.env.CHROMIUM_PATH
      ? { executablePath: process.env.CHROMIUM_PATH }
      : {},
  },
  expect: {
    // Pequena margem: a animação de barras em Dados & BI varia alguns pixels.
    toHaveScreenshot: { maxDiffPixels: 300, animations: "disabled" },
  },
  projects: [
    {
      name: "desktop",
      use: {
        ...devices["Desktop Chrome"],
        viewport: { width: 1440, height: 900 },
      },
    },
    { name: "celular", use: { ...devices["Pixel 7"] } },
  ],
  webServer: {
    command:
      "npm run build:test && npx vite preview --outDir dist-test --port 4173 --strictPort",
    url: "http://localhost:4173",
    reuseExistingServer: !process.env.CI,
    timeout: 180_000,
  },
});
