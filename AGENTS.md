# Instruções para agentes de código (Codex, Claude etc.)

Leia o `README.md` para a estrutura. Regras deste projeto:

## Antes de terminar qualquer tarefa
- Rode `npm run check` (TypeScript, lint, formatação e build). Só conclua
  com ele passando. Se mexeu em formatação, rode `npm run format`.
- O `dist/` é publicado como está: rode `npm run build` e inclua o `dist/`.

## CSS
- NÃO acrescente regras "no fim de tudo" para sobrescrever outras. Edite a
  regra existente no arquivo do componente ou da página
  (`src/styles/components/*.css`, `src/styles/pages/*.css`).
- Estilo novo de uma página vai em `src/styles/pages/<pagina>.css`; de algo
  usado em várias páginas, em `src/styles/components/`.
- Cores e fontes: use os tokens de `src/styles/tokens.css`
  (`var(--color-amber)` etc.). Cor nova recorrente → crie um token.
- Não use Tailwind nem classes utilitárias: o projeto usa CSS próprio.
- A ordem dos imports em `src/styles/index.css` define a cascata; não mude
  sem motivo.

## Páginas e SEO
- Toda página: componente em `src/pages/`, entrada em `src/data/pages.json`
  (título e descrição) e rota em `src/routes.tsx`.
- As páginas são pré-renderizadas no build (`scripts/route-shells.mjs`). Não
  use `window`/`document` durante a renderização; só dentro de `useEffect`,
  `useLayoutEffect` ou handlers.
- Não crie ids duplicados: o `<main>` usa `id="principal"`.

## Animação
- GSAP e ScrollSmoother. Animações por rota ficam em
  `src/motion/MotionDirector.tsx`; o hero da home em `src/pages/HomeHero.tsx`.
- Use `gsap.context()` e reverta no cleanup do efeito.
- As animações rodam para todos os visitantes, inclusive com "reduzir
  movimento" ligado no sistema (decisão do dono do site).
- Evite efeitos caros em áreas animadas (backdrop-filter, mask-image,
  sombras muito grandes): o hero já foi otimizado por causa disso.

## Formulário de contato
- `src/lib/contact.ts` + `firebase/firestore.rules`. Os limites de tamanho
  dos campos existem nos dois lugares: mude juntos.

## Segurança
- Nunca coloque segredos no código nem em variáveis `VITE_*` (elas vão
  para o navegador). O `.env.local` não é versionado.
- Script embutido novo, domínio externo novo (API, iframe, fonte) → ajuste
  a CSP em `public/_headers`.
