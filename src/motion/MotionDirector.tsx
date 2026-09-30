import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { gsap, ScrollSmoother, ScrollTrigger } from "./gsap";
import { applyReveals } from "./reveal";
import { markNavigated, skipIntro } from "../lib/boot";

/**
 * Orquestra o movimento do site: cria o scroll suave, volta ao topo ao
 * trocar de página, aplica o catálogo de animações (src/motion/reveal.ts)
 * e trata os links âncora (#secao).
 */

export function MotionDirector() {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
    // Em desenvolvimento, abra o site com ?markers para ver onde cada
    // animação de scroll começa e termina.
    ScrollTrigger.defaults({
      markers:
        import.meta.env.DEV &&
        new URLSearchParams(window.location.search).has("markers"),
    });
    const smoother = ScrollSmoother.create({
      wrapper: "#smooth-wrapper",
      content: "#smooth-content",
      smooth: 1.05,
      effects: false,
      // No toque, o scroll nativo do celular é mais natural que o suavizado.
      smoothTouch: false,
    });
    return () => smoother.kill();
  }, []);

  useLayoutEffect(() => {
    const smoother = ScrollSmoother.get();
    if (previousPath.current !== pathname) {
      if (smoother) smoother.scrollTo(0, false);
      else window.scrollTo(0, 0);
      previousPath.current = pathname;
      markNavigated();
    }

    const root = document.getElementById("smooth-content");
    if (!root) return;
    const context = gsap.context(() => {
      // Primeira carga pré-renderizada: o que já está na tela não "pisca".
      applyReveals(root, { skipInView: skipIntro() });
    }, root);

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      context.revert();
      cancelAnimationFrame(refresh);
    };
  }, [pathname]);

  useEffect(() => {
    if (!hash) return;
    const jump = window.setTimeout(() => {
      const target = document.getElementById(hash.slice(1));
      if (!target) return;
      const smoother = ScrollSmoother.get();
      if (smoother) smoother.scrollTo(target, true, "top 96px");
      else
        gsap.to(window, {
          scrollTo: { y: target, offsetY: 96, autoKill: true },
          duration: 0.8,
          ease: "power2.out",
        });
    }, 90);
    return () => clearTimeout(jump);
  }, [pathname, hash]);

  useEffect(() => {
    const onAnchor = (event: MouseEvent) => {
      const anchor = (event.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!anchor) return;
      const id = anchor.getAttribute("href")?.slice(1);
      if (!id || !document.getElementById(id)) return;
      event.preventDefault();
      if (hash === `#${id}`) {
        const target = document.getElementById(id)!;
        const smoother = ScrollSmoother.get();
        if (smoother) smoother.scrollTo(target, true, "top 96px");
        else target.scrollIntoView({ behavior: "smooth" });
      } else navigate(`${pathname}#${id}`);
    };
    document.addEventListener("click", onAnchor);
    return () => document.removeEventListener("click", onAnchor);
  }, [hash, navigate, pathname]);
  return null;
}
