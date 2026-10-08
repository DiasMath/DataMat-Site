/**
 * Catálogo de animações por atributo. Use direto no JSX, sem escrever GSAP:
 *
 *   data-reveal              entra subindo (= "fade-up")
 *   data-reveal="fade"       só aparece
 *   data-reveal="heading"    título principal: entra linha por linha (igual à home)
 *   data-reveal="symbol"     símbolo de fundo do topo: surge crescendo devagar
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
  symbol: { autoAlpha: 0, scale: 0.88, duration: 1.8, ease: "expo.out" },
};

const num = (value: string | undefined, fallback = 0) =>
  value === undefined || value === "" ? fallback : Number(value);

/** Estado final comum: visível e na posição original. */
const shown: gsap.TweenVars = { autoAlpha: 1, x: 0, y: 0, scale: 1 };

/** Marca o elemento como revelado (o CSS para de escondê-lo). */
export const markRevealed = (root: ParentNode) =>
  root
    .querySelectorAll<HTMLElement>("[data-reveal]")
    .forEach((el) => el.classList.add("is-revealed"));

/**
 * Aplica o catálogo dentro de `root`. Tudo que tem data-reveal começa
 * escondido pelo CSS (classe .js no <html>, ver animations.css), inclusive
 * na primeira carga: assim cada página "entra" animada, sem piscar.
 * O que já está na tela anima logo ao abrir; o resto, ao rolar.
 */
export function applyReveals(root: HTMLElement) {
  const inView = (el: Element) =>
    el.getBoundingClientRect().top < window.innerHeight * 0.92;

  let entryOrder = 0;
  root.querySelectorAll<HTMLElement>("[data-reveal]").forEach((el) => {
    const { ease: _ease, ...preset } =
      presets[el.dataset.reveal || "fade-up"] ?? presets["fade-up"];
    const presetEase = _ease as string | undefined;
    const stagger = el.dataset.stagger;
    const targets = stagger !== undefined ? Array.from(el.children) : el;
    const visibleNow = inView(el);
    // Na abertura da página, o que está na tela entra em sequência.
    const entryDelay = visibleNow ? 0.1 + entryOrder++ * 0.12 : 0;
    const trigger = visibleNow
      ? {}
      : { scrollTrigger: { trigger: el, start: motion.start, once: true } };

    // Título: linha por linha, saindo de uma máscara (o mesmo da home).
    if (el.dataset.reveal === "heading") {
      SplitText.create(el, {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) => {
          el.classList.add("is-revealed");
          return gsap.from(self.lines, {
            yPercent: 105,
            duration: 1,
            stagger: 0.09,
            ease: "power4.out",
            delay: num(el.dataset.delay) + entryDelay,
            ...trigger,
          });
        },
      });
      return;
    }

    gsap.fromTo(
      targets,
      { ...preset },
      {
        ...shown,
        duration: (preset.duration as number) ?? motion.duration.base,
        ease: presetEase ?? motion.ease.out,
        delay: num(el.dataset.delay) + entryDelay,
        stagger: stagger !== undefined ? num(stagger, 0.08) : 0,
        clearProps: "transform,opacity,visibility",
        onStart: () => el.classList.add("is-revealed"),
        ...trigger,
      },
    );
  });

  root.querySelectorAll<HTMLElement>("[data-split]").forEach((el) => {
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
