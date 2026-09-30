# Site DATAMAT

Site institucional da DATAMAT — React 19 + TypeScript + Vite, com animações
em GSAP e páginas pré-renderizadas no build.

## Comandos

| Comando | Para quê |
|---|---|
| `npm install` | instala as dependências (Node 20.19+; versão em `.nvmrc`) |
| `npm run dev` | site em desenvolvimento em `http://localhost:5173` |
| `npm run build` | gera o site final em `dist/` (com pré-render, SEO, sitemap) |
| `npm run preview` | serve o `dist/` para testar (abra as páginas com `/` no fim: `/sobre/`) |
| `npm run check` | TypeScript + lint + formatação + build — **rode antes de cada commit** |
| `npm run format` | formata o código automaticamente |

A hospedagem atual publica a pasta `dist/`, então ela é versionada: depois de
mudar o código, rode `npm run build` e inclua o `dist/` no commit.

## Estrutura

```
index.html              HTML base (as tags de SEO por página entram no build)
site.config.mjs         domínio do site e chave de indexação no Google
public/                 arquivos servidos como estão (ícones, og-image, _headers)
scripts/route-shells.mjs  pós-build: pré-render, SEO, robots.txt, sitemap.xml
firebase/               regras do Firestore e passo a passo do formulário
src/
  main.tsx              entrada no navegador
  entry-server.tsx      entrada do pré-render (Node)
  App.tsx               estrutura geral: cabeçalho, conteúdo, rodapé
  routes.tsx            lista de páginas (rota → componente)
  data/pages.json       título e descrição de cada página (SEO)
  data/site.ts          soluções, textos de apoio, links de WhatsApp/Power BI
  components/           peças reutilizadas (Header, Footer, ui, mocks...)
  pages/                uma página por arquivo
  motion/               scroll suave (ScrollSmoother) e animações por rota
  lib/                  lógica sem tela (envio do contato, estado da carga)
  styles/               CSS — ver src/styles/index.css
  assets/               imagens importadas pelo código
```

## Como fazer

**Criar uma página:** componente em `src/pages/`, título/descrição em
`src/data/pages.json`, rota em `src/routes.tsx`, estilos em
`src/styles/pages/<pagina>.css` (importado em `src/styles/index.css`).

**Mudar cores ou fonte:** `src/styles/tokens.css`.

**Mudar título/descrição de uma página:** `src/data/pages.json`.

**Publicar no domínio oficial:** em `site.config.mjs`, troque `SITE_URL` e
mude `PERMITIR_INDEXACAO` para `true`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` (não vai para o Git):
`VITE_WHATSAPP_NUMBER`, `VITE_POWER_BI_EMBED_URL` e as do Firebase
(`firebase/LEIA-ME.md`).

## Segurança

- `public/_headers` traz os cabeçalhos HTTP de segurança (CSP, HSTS,
  anti-iframe etc.) no formato de Cloudflare Pages e Netlify. O build grava
  nele o hash do script embutido do `index.html`. Em outra hospedagem, os
  mesmos cabeçalhos precisam ser configurados no formato dela.
- Se mudar o `<script>` embutido do `index.html`, o hash é refeito sozinho
  no build.
- O relatório de Power BI "Publicar na Web" é público: só dados fictícios.
