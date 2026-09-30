/**
 * Catálogo de animações por atributo. Use direto no JSX, sem escrever GSAP:
 *
 *   data-reveal              entra subindo (= "fade-up")
 *   data-reveal="fade"       só aparece
 *   data-reveal="heading"    título principal da página
 *   data-reveal="scale"      cresce levemente
 *   data-reveal="slide-left" entra vindo da direita
 *   data-delay="0.2"         atraso em segundos
 *   data-stagger="0.08"      anima os FILHOS em sequência (com o data-reveal)
 *   data-split="lines"       título entra linha por linha
 *   data-speed="0.85"        parallax: < 1 mais lento, > 1 mais rápido
 *   data-pause-offscreen     pausa animações CSS internas fora da tela
 *
 * Tudo roda a cada troca de página (MotionDirector) e é desfeito ao sair.
 */
import { gsap, ScrollTrigger, SplitText } from "./gsap";
import { motion } from "./tokens";

type Preset = gsap.TweenVars;

const presets: Record<string, Preset> = {
  "fade-up": { autoAlpha: 0, y: motion.distance },
  fade: { autoAlpha: 0 },
  heading: { autoAlpha: 0, y: 22, duration: 0.8 },
  scale: { autoAlpha: 0, scale: 0.94 },
  "slide-left": { autoAlpha: 0, x: 36, duration: motion.duration.slow },
};

const num = (value: string | undefined, fallback = 0) =>
  value === undefined || value === "" ? fallback : Number(value);

/**
 * Aplica o catálogo dentro de `root`. `skipInView`: na primeira carga
 * pré-renderizada, não anima o que já está na tela (evita o texto piscar).
 */
export function applyReveals(root: HTMLElement, { skipInView = false } = {}) {
  const inView = (el: Element) =>
    el.getBoundingClientRect().top < window.innerHeight;

  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    if (skipInView && inView(el)) return;
    const preset =
      presets[el.dataset.reveal || "fade-up"] ?? presets["fade-up"];
    const stagger = el.dataset.stagger;
    const targets = stagger !== undefined ? Array.from(el.children) : el;
    gsap.from(targets, {
      duration: motion.duration.base,
      ease: motion.ease.out,
      ...preset,
      delay: num(el.dataset.delay),
      stagger: stagger !== undefined ? num(stagger, 0.08) : 0,
      clearProps: "all",
      scrollTrigger: { trigger: el, start: motion.start, once: true },
    });
  });

  root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
    if (skipInView && inView(el)) return;
    SplitText.create(el, {
      type: "lines",
      mask: "lines",
      autoSplit: true,
      onSplit: (self) =>
        gsap.from(self.lines, {
          yPercent: 105,
          duration: 1,
          stagger: 0.09,
          ease: "power4.out",
          delay: num(el.dataset.delay),
          scrollTrigger: { trigger: el, start: motion.start, once: true },
        }),
    });
  });

  root.querySelectorAll<HTMLElement>("[data-speed]").forEach((el) => {
    const shift = (1 - num(el.dataset.speed, 1)) * 200;
    gsap.fromTo(
      el,
      { y: -shift / 2 },
      {
        y: shift / 2,
        ease: "none",
        scrollTrigger: {
          trigger: el,
          start: "top bottom",
          end: "bottom top",
          scrub: true,
        },
      },
    );
  });

  root.querySelectorAll<HTMLElement>("[data-pause-offscreen]").forEach((el) => {
    ScrollTrigger.create({
      trigger: el,
      start: "top bottom",
      end: "bottom top",
      onToggle: (self) => el.classList.toggle("is-paused", !self.isActive),
    });
  });
}
