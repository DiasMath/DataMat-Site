import { useEffect, useLayoutEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import gsap from "gsap";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { markNavigated, skipIntro } from "../lib/boot";

gsap.registerPlugin(ScrollTrigger, ScrollSmoother, ScrollToPlugin);

export function MotionDirector() {
  const { pathname, hash } = useLocation();
  const pagePath = pathname.replace(/\/+$/, "") || "/";
  const navigate = useNavigate();
  const previousPath = useRef(pathname);

  useLayoutEffect(() => {
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
    // Primeira carga pré-renderizada: o que já está na tela não "pisca".
    const firstPaint = skipIntro();
    const inView = (el: Element) =>
      el.getBoundingClientRect().top < window.innerHeight;

    const context = gsap.context(() => {
      const hero = root.querySelector<HTMLElement>(
        ".product-hero h1, .simple-hero h1",
      );
      if (hero && !firstPaint)
        gsap.from(hero, {
          autoAlpha: 0,
          y: 22,
          duration: 0.8,
          ease: "power3.out",
          clearProps: "all",
        });

      gsap.utils.toArray<HTMLElement>("[data-reveal]").forEach((item) => {
        if (firstPaint && inView(item)) return;
        gsap.from(item, {
          autoAlpha: 0,
          y: 18,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: { trigger: item, start: "top 88%", once: true },
        });
      });

      if (pagePath === "/dados-bi") {
        gsap.from(".data-hero-frame .bar-set b", {
          scaleY: 0,
          transformOrigin: "bottom",
          stagger: 0.05,
          duration: 0.65,
          ease: "power3.out",
          clearProps: "all",
          scrollTrigger: {
            trigger: ".data-hero-frame",
            start: "top 82%",
            once: true,
          },
        });
      }
      if (pagePath === "/sites") {
        gsap.from(".sites-hero .site-viewport", {
          autoAlpha: 0,
          x: 36,
          duration: 0.9,
          ease: "power3.out",
          clearProps: "all",
        });
      }
    }, root);

    const refresh = requestAnimationFrame(() => ScrollTrigger.refresh());
    return () => {
      context.revert();
      cancelAnimationFrame(refresh);
    };
  }, [pathname, pagePath]);

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
