# Site DATAMAT

Site institucional da DATAMAT — React 19 + TypeScript + Vite, com animações
em GSAP e páginas pré-renderizadas no build.

## Comandos

| Comando               | Para quê                                                                |
| --------------------- | ----------------------------------------------------------------------- |
| `npm install`         | instala as dependências (Node 20.19+; versão em `.nvmrc`)               |
| `npm run dev`         | site em desenvolvimento em `http://localhost:5173`                      |
| `npm run build`       | gera o site final em `dist/` (com pré-render, SEO, sitemap)             |
| `npm run preview`     | serve o `dist/` para testar (abra as páginas com `/` no fim: `/sobre/`) |
| `npm run check`       | TypeScript + lint + formatação + build — **rode antes de cada commit**  |
| `npm run test`        | testes automáticos: páginas, formulário e comparação visual             |
| `npm run test:update` | grava novas referências visuais (após mudar o visual de propósito)      |
| `npm run format`      | formata o código automaticamente                                        |

**Testes (primeira vez):** rode `npx playwright install chromium` e depois
`npm run test:update` para gravar as referências visuais do seu computador;
faça commit da pasta `tests/visual.spec.ts-snapshots/`. Daí em diante,
`npm run test` avisa se alguma página mudou sem querer.

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
  motion/               GSAP: gsap.ts (plugins), tokens.ts (ritmo),
                        reveal.ts (catálogo data-reveal), MotionDirector
  lib/                  lógica sem tela (envio do contato, estado da carga)
  styles/               CSS e tema do Tailwind — ver src/styles/index.css
tests/                  testes automáticos (Playwright)
  assets/               imagens importadas pelo código
```

## Como fazer

**Criar uma página:** componente em `src/pages/`, título/descrição em
`src/data/pages.json`, rota em `src/routes.tsx`, estilos em
`src/styles/pages/<pagina>.css` (importado em `src/styles/index.css`).

**Estilizar:** seções novas ou redesenhadas usam classes do **Tailwind**
no JSX (`bg-graphite text-cream py-24`). As cores disponíveis são as da
marca, definidas em `src/styles/tokens.css`. O CSS antigo de cada seção
(`src/styles/pages/`, `components/`) é apagado quando ela for refeita.

**Animar:** use os atributos do catálogo, sem escrever GSAP:
`data-reveal`, `data-reveal="fade|heading|scale|slide-left"`, `data-delay`,
`data-stagger`, `data-split="lines"`, `data-speed="0.85"`,
`data-pause-offscreen` (detalhes em `src/motion/reveal.ts`). Em
desenvolvimento, abra o site com `?markers` para ver os pontos de início.

**Cenas animadas ("vídeos" da home e dos cases):** ficam em
`src/components/scenes/`. Cada cena tem legendas (passos), duração fixa
(`LENGTH`, mostrada no relógio da aba) e usa `useScene`. Para trocar uma cena
da home por um vídeo real, preencha `video` em `src/content/home.ts`.

**Menu e botões:** itens e descrições do menu em `src/content/navigation.ts`;
o botão "Fale conosco" é o `ContactButton` (`src/components/Header.tsx`); o
"Próximo passo" em tela cheia é o `CTA` de `src/components/FinalCta.tsx`.

**Mudar cores, fonte ou ritmo das animações:** `src/styles/tokens.css` e
`src/motion/tokens.ts`.

**Mudar título/descrição de uma página:** `src/data/pages.json`.

**Publicar no domínio oficial:** em `site.config.mjs`, troque `SITE_URL` e
mude `PERMITIR_INDEXACAO` para `true`.

## Variáveis de ambiente

Copie `.env.example` para `.env.local` (não vai para o Git):
`VITE_WHATSAPP_NUMBER` e as do Firebase
(`firebase/LEIA-ME.md`).

## Segurança

- `public/_headers` traz os cabeçalhos HTTP de segurança (CSP, HSTS,
  anti-iframe etc.) no formato de Cloudflare Pages e Netlify. O build grava
  nele o hash do script embutido do `index.html`. Em outra hospedagem, os
  mesmos cabeçalhos precisam ser configurados no formato dela.
- Se mudar o `<script>` embutido do `index.html`, o hash é refeito sozinho
  no build.

## Publicação na Vercel

O site é publicado pela Vercel a cada `git push` na branch `main`
(configuração em `vercel.json`: build `npm run build`, saída `dist`,
cabeçalhos de segurança e cache).

Variáveis de ambiente (Project → Settings → Environment Variables), as
mesmas do `.env.example`:

- `VITE_WHATSAPP_NUMBER` (obrigatória): número que recebe os contatos.
- `SITE_URL`: domínio oficial (vazio = domínio de produção da Vercel).
- `PERMITIR_INDEXACAO`: `true` libera o Google. Deploys de preview nunca
  são indexados.
- `VITE_CONTACT_EMAIL`, `VITE_CONTACT_HOURS`, `VITE_COMPANY_LEGAL_NAME`,
  `VITE_COMPANY_CNPJ`, `VITE_INSTAGRAM_URL`, `VITE_LINKEDIN_URL`: contatos
  do rodapé (o que ficar vazio não aparece).
- `VITE_CONTACT_EMAIL`, `VITE_CONTACT_HOURS`, `VITE_CONTACT_LEGAL_NAME`,
  `VITE_CONTACT_CNPJ`, `VITE_INSTAGRAM_URL`, `VITE_LINKEDIN_URL`: contatos
  do rodapé (vazios não aparecem).
- `VITE_PORTAL_URL`: link do portal do cliente (vazio = não aparece).
- `VITE_PRIVACY_CONTROLLER`, `VITE_PRIVACY_OFFICER`, `VITE_PRIVACY_EMAIL`:
  responsável e canal de dados na página de privacidade.
- `VITE_FIREBASE_PROJECT_ID` e `VITE_FIREBASE_API_KEY` (opcionais).

Depois de mudar uma variável, faça um novo deploy (Deployments → Redeploy).
No computador, as mesmas variáveis ficam em `.env.local`.
