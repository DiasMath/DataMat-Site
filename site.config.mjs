// Configurações do site usadas no build (scripts/route-shells.mjs).
// Os valores vêm de variáveis de ambiente: na Vercel, em Project → Settings
// → Environment Variables; no computador, no arquivo .env.local.

// No computador, lê o .env.local / .env (na Vercel as variáveis já existem).
for (const file of [".env.local", ".env"]) {
  try {
    process.loadEnvFile?.(file);
  } catch {
    // arquivo não existe: tudo bem
  }
}

const env = process.env;

/** Endereço público do site, sem barra no final. */
export const SITE_URL = (
  env.SITE_URL ||
  (env.VERCEL_PROJECT_PRODUCTION_URL
    ? `https://${env.VERCEL_PROJECT_PRODUCTION_URL}`
    : "https://datamat-home-preview.sandesdiasmatheus.chatgpt.site")
).replace(/\/+$/, "");

/**
 * true = permite o Google indexar (robots.txt + meta robots).
 * Só liga com PERMITIR_INDEXACAO=true E fora dos deploys de preview da
 * Vercel, para o Google nunca guardar um endereço provisório.
 */
export const PERMITIR_INDEXACAO =
  env.PERMITIR_INDEXACAO === "true" && env.VERCEL_ENV !== "preview";
