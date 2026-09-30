// Roda depois do `vite build`. Gera um index.html por rota com título,
// descrição, tags de compartilhamento (WhatsApp, LinkedIn...) e SEO,
// além de robots.txt e sitemap.xml.
// Também faz o pré-render: o HTML de cada página já sai com o conteúdo
// pronto (bom para o Google e para a primeira pintura no celular).
// Textos das páginas: src/data/pages.json | Domínio: site.config.mjs
import {
  readFileSync,
  writeFileSync,
  mkdirSync,
  readdirSync,
  rmSync,
} from "node:fs";
import { join, resolve } from "node:path";
import { pathToFileURL } from "node:url";
import { SITE_URL, PERMITIR_INDEXACAO } from "../site.config.mjs";

// Pré-render: o conteúdo de cada página já vai dentro do HTML.
const { render: renderApp } = await import(
  pathToFileURL(resolve("dist-ssr/entry-server.js")).href
);

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
    .replace("</head>", `${tags}</head>`)
    .replace(
      '<div id="root"></div>',
      `<div id="root" data-path="${path}">${renderApp(path)}</div>`,
    );
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

rmSync("dist-ssr", { recursive: true, force: true });

console.log(
  `pré-render: ${Object.keys(pages).length} páginas + 404, robots.txt, sitemap.xml` +
    (PERMITIR_INDEXACAO ? "" : " (indexação DESLIGADA)"),
);
