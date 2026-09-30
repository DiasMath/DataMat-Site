// Configurações do site usadas no build (scripts/route-shells.mjs).
// Ajuste aqui quando o domínio oficial estiver definido.

/** Endereço público do site, sem barra no final. */
export const SITE_URL =
  "https://datamat-home-preview.sandesdiasmatheus.chatgpt.site";

/**
 * false = pede ao Google para NÃO indexar (robots.txt + meta noindex).
 * Deixe false enquanto o site estiver no endereço de preview, para o Google
 * não guardar essa URL provisória. Mude para true ao publicar no domínio oficial.
 */
export const PERMITIR_INDEXACAO = false;
