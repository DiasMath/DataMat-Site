import { useRef } from "react";
import { Check } from "lucide-react";
import { orbitPairs } from "../../content/home";
import { gsap, useGSAP } from "../../motion/gsap";
import { motionDisabled } from "../../motion/tokens";
import { skipIntro } from "../../lib/boot";
import { DatamatSymbol } from "../DatamatSymbol";

/** Inclinação das órbitas: elipses achatadas dão a sensação de profundidade. */
const TILT = 0.42;
const OUTER = 0.47; // raio da órbita dos problemas (fração do palco)
const INNER = 0.31; // raio da órbita das soluções
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
 * Sistema solar do hero: os problemas orbitam o sol (símbolo DATAMAT), um a
 * um caem nele e saem como soluções (cartões claros) numa órbita interna.
 * Quando todos viram solução, o ciclo recomeça.
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

      // Estado de cada cartão: ângulo, raio atual e se já é solução.
      const state = cards.map((_, i) => ({
        angle: (i / n) * Math.PI * 2,
        radius: OUTER,
        solved: false,
      }));
      let cometAngle = 0;

      const place = () => {
        const size = el.clientWidth;
        state.forEach((s, i) => {
          const x = Math.cos(s.angle) * s.radius * size;
          const y = Math.sin(s.angle) * s.radius * size * TILT;
          const depth = Math.sin(s.angle); // -1 atrás do sol, 1 na frente
          gsap.set(cards[i], {
            x,
            y,
            scale:
              (0.82 + 0.18 * depth) *
              (0.25 + 0.75 * (s.radius / (s.solved ? INNER : OUTER))),
            zIndex: depth > 0 ? 30 : 10,
            opacity: 0.55 + 0.45 * ((depth + 1) / 2),
          });
        });
        gsap.set(comet, {
          x: Math.cos(cometAngle) * 0.5 * size,
          y: Math.sin(cometAngle) * 0.5 * size * TILT,
          zIndex: Math.sin(cometAngle) > 0 ? 30 : 10,
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
      // Todos resolvidos: segura um pouco e recomeça.
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
      gsap.to(q(".bar"), {
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
        cycle.paused(paused);
        el.classList.toggle("is-paused", paused);
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

      {/* Órbitas em elipse (mesma inclinação do movimento) */}
      <svg
        viewBox="-50 -50 100 100"
        className="absolute inset-0 size-full overflow-visible"
      >
        {[OUTER, INNER, 0.5].map((r, i) => (
          <ellipse
            key={r}
            rx={r * 100}
            ry={r * 100 * TILT}
            fill="none"
            stroke="var(--color-amber)"
            strokeOpacity={i === 2 ? 0.08 : 0.22}
            strokeWidth={0.25}
            strokeDasharray={i === 2 ? "0.8 1.6" : undefined}
          />
        ))}
      </svg>

      <span className="comet absolute top-1/2 left-1/2 size-2 -translate-1/2 rounded-full bg-amber shadow-[0_0_14px_4px_var(--color-amber)]" />

      {/* Sol: símbolo da DATAMAT */}
      <div className="sun absolute top-1/2 left-1/2 z-20 flex size-[24%] -translate-1/2 items-center justify-center rounded-full bg-[radial-gradient(circle_at_38%_28%,#ffcc80,var(--color-amber)_58%,#d77720)] shadow-[0_0_90px_var(--color-amber)]">
        <DatamatSymbol className="w-[42%] text-graphite" />
      </div>

      {/* Problemas que viram soluções */}
      {orbitPairs.map((p) => (
        <div
          key={p.problem}
          className="planet group/planet absolute top-1/2 left-1/2 -translate-1/2 opacity-0"
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
