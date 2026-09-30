# Instruções para agentes de código (Codex, Claude etc.)

Leia o `README.md` para a estrutura. Regras deste projeto:

## Antes de terminar qualquer tarefa

- Rode `npm run check` (TypeScript, lint, formatação e build) e
  `npm run test`. Só conclua com os dois passando. Se mexeu em formatação,
  rode `npm run format`.
- Se o teste visual falhar porque o visual mudou DE PROPÓSITO, rode
  `npm run test:update` e inclua os prints novos. Se não era para mudar,
  corrija o código.
- O `dist/` é publicado como está: rode `npm run build` e inclua o `dist/`.

## CSS e Tailwind

- Seção nova ou redesenhada: estilize com classes do Tailwind v4 no JSX e
  APAGUE o CSS legado dessa seção em `src/styles/`. Não misture Tailwind e
  CSS legado no mesmo elemento.
- Só existem as cores da marca (`src/styles/tokens.css`): `bg-amber`,
  `text-cream`, `bg-graphite` etc. Cor nova → crie o token lá, não use valor
  avulso (`bg-[#123456]`).
- Evite valores avulsos em geral (`p-[13px]`): use a escala do Tailwind.
- Peças "artísticas" complexas (mockups, órbita do hero) podem continuar em
  CSS próprio.
- NÃO acrescente regras "no fim de tudo" para sobrescrever outras. Edite a
  regra existente no arquivo do componente ou da página
  (`src/styles/components/*.css`, `src/styles/pages/*.css`).
- Estilo novo de uma página vai em `src/styles/pages/<pagina>.css`; de algo
  usado em várias páginas, em `src/styles/components/`.
- Cores e fontes: use os tokens de `src/styles/tokens.css`
  (`var(--color-amber)` etc.). Cor nova recorrente → crie um token.
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

- Importe o GSAP e os plugins SEMPRE de `src/motion/gsap.ts`.
- Entradas e efeitos comuns: use o catálogo de atributos de
  `src/motion/reveal.ts` (`data-reveal`, `data-stagger`, `data-split`,
  `data-speed`...). Não escreva GSAP para isso.
- Peça especial (ex.: `src/pages/HomeHero.tsx`): use `useGSAP` com
  `scope`, as durações/curvas de `src/motion/tokens.ts` e respeite
  `skipIntro()` (não animar o que já veio pronto no pré-render) e
  `motionDisabled` (build de testes).
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
