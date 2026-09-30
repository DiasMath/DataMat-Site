// Roda depois do `vite build`. Gera um index.html por rota com título,
// descrição, tags de compartilhamento (WhatsApp, LinkedIn...) e SEO,
// além de robots.txt e sitemap.xml.
// Textos das páginas: src/data/pages.json | Domínio: site.config.mjs
import { readFileSync, writeFileSync, mkdirSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { SITE_URL, PERMITIR_INDEXACAO } from "../site.config.mjs";

const root = "dist";
const pages = JSON.parse(readFileSync("src/data/pages.json", "utf8"));
const template = readFileSync(join(root, "index.html"), "utf8");

const esc = (s) =>
  s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const ogImage = `${SITE_URL}/og-image.jpg`;

// Pré-carrega a fonte principal para evitar a troca de fonte na primeira visita.
const font = readdirSync(join(root, "assets")).find((f) =>
  /^dm-sans-latin-wght-normal-.*\.woff2$/.test(f),
);
const fontPreload = font
  ? `<link rel="preload" href="/assets/${font}" as="font" type="font/woff2" crossorigin>`
  : "";

const organization = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "DATAMAT",
  url: SITE_URL,
  logo: `${SITE_URL}/apple-touch-icon.png`,
  description: pages["/"].description,
  // Quando tiver, acrescente: telephone, email, address, sameAs (redes sociais).
};

function render({ path, title, description, noindex = false, home = false }) {
  const url = SITE_URL + (path === "/" ? "/" : path);
  const tags = [
    fontPreload,
    `<link rel="canonical" href="${url}">`,
    !PERMITIR_INDEXACAO || noindex
      ? `<meta name="robots" content="noindex, nofollow">`
      : "",
    `<meta property="og:site_name" content="DATAMAT">`,
    `<meta property="og:locale" content="pt_BR">`,
    `<meta property="og:url" content="${url}">`,
    `<meta property="og:image" content="${ogImage}">`,
    `<meta property="og:image:width" content="1200">`,
    `<meta property="og:image:height" content="630">`,
    `<meta property="og:image:alt" content="DATAMAT — Sua empresa precisa de clareza para crescer.">`,
    `<meta name="twitter:card" content="summary_large_image">`,
    `<meta name="twitter:title" content="${esc(title)}">`,
    `<meta name="twitter:description" content="${esc(description)}">`,
    `<meta name="twitter:image" content="${ogImage}">`,
    home
      ? `<script type="application/ld+json">${JSON.stringify(organization)}</script>`
      : "",
  ]
    .filter(Boolean)
    .join("");

  return template
    .replace(/<title>[^<]*<\/title>/, `<title>${esc(title)}</title>`)
    .replace(
      /<meta name="description" content="[^"]*"\s*\/?>/,
      `<meta name="description" content="${esc(description)}">`,
    )
    .replace(
      /<meta property="og:title" content="[^"]*"\s*\/?>/,
      `<meta property="og:title" content="${esc(title)}">`,
    )
    .replace(
      /<meta property="og:description" content="[^"]*"\s*\/?>/,
      `<meta property="og:description" content="${esc(description)}">`,
    )
    .replace("</head>", `${tags}</head>`);
}

for (const [path, { title, description }] of Object.entries(pages)) {
  const dir = path === "/" ? root : join(root, path.slice(1));
  mkdirSync(dir, { recursive: true });
  writeFileSync(
    join(dir, "index.html"),
    render({ path, title, description, home: path === "/" }),
  );
}

writeFileSync(
  join(root, "404.html"),
  render({
    path: "/404",
    title: "Página não encontrada | DATAMAT",
    description: pages["/"].description,
    noindex: true,
  }),
);

writeFileSync(
  join(root, "robots.txt"),
  PERMITIR_INDEXACAO
    ? `User-agent: *\nAllow: /\n\nSitemap: ${SITE_URL}/sitemap.xml\n`
    : `# Indexação desligada em site.config.mjs (PERMITIR_INDEXACAO = false)\nUser-agent: *\nDisallow: /\n`,
);

const today = new Date().toISOString().slice(0, 10);
writeFileSync(
  join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n` +
    Object.keys(pages)
      .map(
        (p) =>
          `  <url><loc>${SITE_URL}${p === "/" ? "/" : p}</loc><lastmod>${today}</lastmod></url>`,
      )
      .join("\n") +
    `\n</urlset>\n`,
);

console.log(
  `route-shells: ${Object.keys(pages).length} páginas, robots.txt, sitemap.xml` +
    (PERMITIR_INDEXACAO ? "" : " (indexação DESLIGADA)"),
);
