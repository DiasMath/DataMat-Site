import { gsap, ScrollSmoother } from "./gsap";

/**
 * Volta ao topo da página com um deslizar visível (não um salto), com ou
 * sem o scroll suave ativo. Funciona igual no desktop e no celular.
 */
export function scrollToTop() {
  const smoother = ScrollSmoother.get();
  const vars = { duration: 1.2, ease: "power3.inOut", overwrite: true };
  if (smoother) gsap.to(smoother, { scrollTop: 0, ...vars });
  else gsap.to(window, { scrollTo: 0, ...vars });
}
