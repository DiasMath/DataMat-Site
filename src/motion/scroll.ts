import { ScrollSmoother } from "./gsap";

/** Volta suavemente ao topo da página (com ou sem o scroll suave ativo). */
export function scrollToTop() {
  const smoother = ScrollSmoother.get();
  if (smoother) smoother.scrollTo(0, true);
  else window.scrollTo({ top: 0, behavior: "smooth" });
}
