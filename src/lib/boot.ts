/**
 * Estado da primeira carga da página.
 *
 * Com o pré-render, o HTML já chega com o conteúdo visível. Na PRIMEIRA
 * página aberta, as animações de entrada de elementos que já estão na tela
 * são puladas (senão o texto apareceria, sumiria e reapareceria). Ao navegar
 * para outra página dentro do site, as animações rodam normalmente.
 */

const currentPath = () =>
  typeof location === "undefined"
    ? ""
    : location.pathname.replace(/\/index\.html$/, "").replace(/\/+$/, "") ||
      "/";

/**
 * true quando o HTML recebido é o pré-render DESTA página. Se o servidor
 * entregar o HTML de outra rota (ex.: o de "/" para "/dados-bi"), o React
 * renderiza do zero em vez de tentar aproveitar o HTML errado.
 */
export const bootedFromPrerender =
  typeof document !== "undefined" &&
  document.getElementById("root")?.dataset.path === currentPath();

let firstView = true;

/** Chamado pelo MotionDirector na primeira troca de rota. */
export const markNavigated = () => {
  firstView = false;
};

/** Pular a entrada de algo que já veio pronto no HTML pré-renderizado? */
export const skipIntro = () => bootedFromPrerender && firstView;
