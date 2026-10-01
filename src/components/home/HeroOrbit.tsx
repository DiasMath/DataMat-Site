import { useRef } from "react";
import { Check } from "lucide-react";
import { orbitPairs } from "../../content/home";
import { gsap, useGSAP } from "../../motion/gsap";
import { motionDisabled } from "../../motion/tokens";
import { skipIntro } from "../../lib/boot";
import { DatamatSymbol } from "../DatamatSymbol";

/** Órbitas planas (2D), nos mesmos raios dos anéis desenhados (fração do palco). */
const RINGS = [0.245, 0.3725, 0.5];
const OUTER = RINGS[1]; // órbita dos problemas
const INNER = RINGS[0]; // órbita das soluções
const OUTER_PERIOD = 80; // segundos por volta
const INNER_PERIOD = 55;

/** Estrelas fixas (posição em %), algumas piscando. */
const stars = Array.from({ length: 34 }, (_, i) => ({
  x: (i * 37) % 100,
  y: (i * 61 + 13) % 100,
  s: i % 5 === 0 ? 3 : 2,
  twinkle: i % 6 === 0,
}));

/**
 * Sistema solar do hero (2D): os problemas orbitam o sol (símbolo DATAMAT),
 * um a um caem nele e saem como soluções (cartões claros) numa órbita
 * interna, onde ficam. Quando todos viram solução, o ciclo recomeça.
 */
export function HeroOrbit() {
  const stage = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const el = stage.current!;
      const q = gsap.utils.selector(el);
      const cards = q(".planet") as HTMLElement[];
      const comet = q(".comet")[0] as HTMLElement;
      const n = cards.length;

      const state = cards.map((_, i) => ({
        angle: (i / n) * Math.PI * 2,
        radius: OUTER,
        solved: false,
      }));
      let cometAngle = 0;

      const place = () => {
        const size = el.clientWidth;
        state.forEach((s, i) => {
          gsap.set(cards[i], {
            x: Math.cos(s.angle) * s.radius * size,
            y: Math.sin(s.angle) * s.radius * size,
            // encolhe ao cair no sol e cresce ao sair dele
            scale: 0.25 + 0.75 * Math.min(1, s.radius / INNER),
          });
        });
        gsap.set(comet, {
          x: Math.cos(cometAngle) * RINGS[2] * size,
          y: Math.sin(cometAngle) * RINGS[2] * size,
        });
      };

      if (motionDisabled) {
        state.forEach((s) => {
          s.solved = true;
          s.radius = INNER;
        });
        cards.forEach((c) => c.classList.add("is-solved"));
        place();
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      // Movimento contínuo das órbitas.
      let paused = false;
      const tick = (_t: number, dt: number) => {
        if (paused) return;
        const step = dt / 1000;
        state.forEach((s) => {
          s.angle +=
            ((Math.PI * 2) / (s.solved ? INNER_PERIOD : OUTER_PERIOD)) * step;
        });
        cometAngle -= ((Math.PI * 2) / 24) * step;
        place();
      };
      gsap.ticker.add(tick);
      place();

      // Anéis giram devagar, cada um num sentido e ritmo.
      const rings = q(".ring").map((ring, i) =>
        gsap.to(ring, {
          rotate: i % 2 ? -360 : 360,
          duration: 40 + i * 20,
          repeat: -1,
          ease: "none",
        }),
      );

      // Ciclo: um problema por vez cai no sol e sai como solução.
      const cycle = gsap.timeline({
        repeat: -1,
        delay: skipIntro() ? 1.2 : 2.4,
      });
      cycle.to(cards, { autoAlpha: 1, stagger: 0.15, duration: 0.6 });
      state.forEach((s, i) => {
        const card = cards[i];
        cycle
          .to(s, { radius: 0.02, duration: 1.4, ease: "power2.in" }, "+=2.2")
          .to(card, { autoAlpha: 0, duration: 0.25 }, "-=0.25")
          .to(
            q(".sun"),
            { scale: 1.12, duration: 0.25, ease: "power2.out" },
            "<",
          )
          .call(() => {
            s.solved = true;
            card.classList.add("is-solved");
          })
          .to(q(".sun"), {
            scale: 1,
            duration: 0.8,
            ease: "elastic.out(1, 0.45)",
          })
          .to(card, { autoAlpha: 1, duration: 0.3 }, "<")
          .to(s, { radius: INNER, duration: 1.3, ease: "back.out(1.4)" }, "<");
      });
      cycle
        .to(cards, { autoAlpha: 0, duration: 0.6, stagger: 0.1 }, "+=4")
        .call(() => {
          state.forEach((s) => {
            s.solved = false;
            s.radius = OUTER;
          });
          cards.forEach((c) => c.classList.remove("is-solved"));
        });

      // Barras do símbolo acendem uma a uma.
      const bars = gsap.to(q(".bar"), {
        opacity: 0.45,
        duration: 0.5,
        stagger: { each: 0.5, repeat: -1, yoyo: true, repeatDelay: 1.2 },
      });

      // Desempenho: pausa durante o scroll e com o hero fora da tela.
      let visible = true;
      let scrolling = false;
      let idle = 0;
      const apply = () => {
        paused = scrolling || !visible;
        [cycle, bars, ...rings].forEach((t) => t.paused(paused));
      };
      const onScroll = () => {
        if (!scrolling) {
          scrolling = true;
          apply();
        }
        window.clearTimeout(idle);
        idle = window.setTimeout(() => {
          scrolling = false;
          apply();
        }, 180);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        apply();
      });
      io.observe(el);

      return () => {
        gsap.ticker.remove(tick);
        io.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(idle);
      };
    },
    { scope: stage },
  );

  return (
    <div ref={stage} className="relative size-full">
      {/* Céu: estrelas fixas, algumas piscando */}
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-cream ${s.twinkle ? "animate-pulse" : "opacity-40"}`}
          style={{ left: `${s.x}%`, top: `${s.y}%`, width: s.s, height: s.s }}
        />
      ))}

      {/* Anéis (2D), girando devagar com um "planeta" cada */}
      {RINGS.map((r, i) => (
        <div
          key={r}
          className="ring absolute top-1/2 left-1/2 -translate-1/2 rounded-full border border-amber/25"
          style={{ width: `${r * 200}%`, height: `${r * 200}%` }}
        >
          <span
            className="absolute top-1/2 -left-1 size-2 -translate-y-1/2 rounded-full bg-amber shadow-[0_0_12px_var(--color-amber)]"
            style={{ opacity: 1 - i * 0.3 }}
          />
        </div>
      ))}

      <span className="comet absolute top-1/2 left-1/2 z-10 size-1.5 -translate-1/2 rounded-full bg-cream shadow-[0_0_10px_3px_var(--color-amber)]" />

      {/* Sol: símbolo da DATAMAT */}
      <div className="sun absolute top-1/2 left-1/2 z-20 flex size-[24%] -translate-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_38%_28%,#ffcc80,var(--color-amber)_58%,#d77720)] shadow-[0_0_90px_var(--color-amber)]">
        <DatamatSymbol className="w-[42%] text-graphite" />
      </div>

      {/* Problemas que viram soluções (passam por baixo do sol ao cair nele) */}
      {orbitPairs.map((p) => (
        <div
          key={p.problem}
          className="planet group/planet absolute top-1/2 left-1/2 z-10 -translate-1/2 opacity-0"
        >
          <span className="block rounded-lg border border-white/15 bg-graphite px-3.5 py-2 text-[11px] tracking-[0.12em] whitespace-nowrap text-cream shadow-lg shadow-black/40 group-[.is-solved]/planet:hidden md:text-xs">
            {p.problem.toUpperCase()}
          </span>
          <span className="hidden items-center gap-1.5 rounded-lg bg-cream px-3.5 py-2 text-[11px] font-bold tracking-[0.1em] whitespace-nowrap text-graphite shadow-lg shadow-black/40 group-[.is-solved]/planet:flex md:text-xs">
            <Check size={13} className="text-amber" aria-hidden="true" />
            {p.solution.toUpperCase()}
          </span>
        </div>
      ))}
    </div>
  );
}
