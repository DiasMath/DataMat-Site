import { useRef } from "react";
import { Check } from "lucide-react";
import { orbitPairs } from "../../content/home";
import { gsap, useGSAP } from "../../motion/gsap";
import { motionDisabled } from "../../motion/tokens";
import { skipIntro } from "../../lib/boot";
import { DatamatSymbol } from "../DatamatSymbol";

/** Anéis (2D), em fração do palco. */
const RINGS = [0.22, 0.33, 0.44];
/**
 * Problemas alternam entre os dois anéis maiores; soluções, entre os dois
 * menores. Em telas estreitas (celular), todos usam os anéis de dentro para
 * os cartões não saírem da tela.
 */
let compact = false;
const problemRing = (i: number) =>
  compact ? 0.3 : i % 2 ? RINGS[2] : RINGS[1];
const solutionRing = (i: number) =>
  compact ? RINGS[0] : i % 2 ? RINGS[1] : RINGS[0];
/** Segundos por volta no anel maior (os de dentro giram mais rápido). */
const PERIOD = 70;

/**
 * Sistema solar do hero (2D): os problemas orbitam o sol (símbolo DATAMAT),
 * um a um caem nele e saem como soluções (cartões claros), que ficam
 * orbitando. Quando todos viram solução, o ciclo recomeça.
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
      compact = el.clientWidth < 520;

      const state = cards.map((_, i) => ({
        angle: (i / n) * Math.PI * 2,
        radius: problemRing(i),
      }));
      let cometAngle = 0;

      // Tamanho de cada cartão (muda quando vira solução), para nunca sair do palco.
      const dims = cards.map((c) => ({ w: c.offsetWidth, h: c.offsetHeight }));
      const measure = (i: number) => {
        dims[i] = { w: cards[i].offsetWidth, h: cards[i].offsetHeight };
      };

      const place = () => {
        const size = el.clientWidth;
        const half = size / 2;
        state.forEach((s, i) => {
          // encolhe ao cair no sol e cresce ao sair dele
          const scale =
            (0.25 + 0.75 * Math.min(1, s.radius / RINGS[0])) *
            (compact ? 0.72 : 1);
          const w = (dims[i].w * scale) / 2;
          const h = (dims[i].h * scale) / 2;
          gsap.set(cards[i], {
            x: gsap.utils.clamp(
              -half + w,
              half - w,
              Math.cos(s.angle) * s.radius * size,
            ),
            y: gsap.utils.clamp(
              -half + h,
              half - h,
              Math.sin(s.angle) * s.radius * size,
            ),
            // centraliza pelo próprio GSAP (ele substitui o translate do CSS)
            xPercent: -50,
            yPercent: -50,
            scale,
          });
        });
        gsap.set(comet, {
          xPercent: -50,
          yPercent: -50,
          x: Math.cos(cometAngle) * RINGS[2] * size,
          y: Math.sin(cometAngle) * RINGS[2] * size,
        });
      };

      if (motionDisabled) {
        state.forEach((s, i) => (s.radius = solutionRing(i)));
        cards.forEach((c, k) => {
          c.classList.add("is-solved");
          measure(k);
        });
        place();
        gsap.set(cards, { autoAlpha: 1 });
        return;
      }

      // Movimento contínuo: mais rápido perto do sol, como num sistema solar.
      let paused = false;
      const tick = (_t: number, dt: number) => {
        if (paused) return;
        const step = dt / 1000;
        state.forEach((s) => {
          s.angle +=
            ((Math.PI * 2) / (PERIOD * (s.radius / RINGS[2] + 0.2))) * step;
        });
        cometAngle -= ((Math.PI * 2) / 26) * step;
        place();
      };
      gsap.ticker.add(tick);
      place();

      // Anéis giram devagar, cada um num sentido e ritmo.
      const rings = q(".ring").map((ring, i) =>
        gsap.to(ring, {
          rotate: i % 2 ? -360 : 360,
          duration: 50 + i * 25,
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
          .to(s, { radius: 0.02, duration: 1.6, ease: "power2.in" }, "+=2.2")
          .to(card, { autoAlpha: 0, duration: 0.25 }, "-=0.25")
          .call(() => {
            card.classList.add("is-solved");
            measure(i);
          })
          .to(card, { autoAlpha: 1, duration: 0.3 }, "+=0.5")
          .to(
            s,
            { radius: solutionRing(i), duration: 1.5, ease: "back.out(1.3)" },
            "<",
          );
      });
      cycle
        .to(cards, { autoAlpha: 0, duration: 0.6, stagger: 0.1 }, "+=4")
        .call(() => {
          state.forEach((s, i) => (s.radius = problemRing(i)));
          cards.forEach((c, k) => {
            c.classList.remove("is-solved");
            measure(k);
          });
        });

      // Barras do símbolo acendem uma a uma.
      const bars = gsap.to(q(".bar"), {
        opacity: 0.55,
        duration: 0.6,
        stagger: { each: 0.6, repeat: -1, yoyo: true, repeatDelay: 1.4 },
      });

      // Desempenho: pausa durante o scroll e com o hero fora da tela.
      let visible = true;
      let scrolling = false;
      let idle = 0;
      const apply = () => {
        paused = scrolling || !visible;
        [cycle, bars, ...rings].forEach((t) => t.paused(paused));
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
      {/* Anéis cinza (2D), girando devagar com um ponto cada */}
      {RINGS.map((r, i) => (
        <div
          key={r}
          className="ring absolute top-1/2 left-1/2 -translate-1/2 rounded-full border border-white/[0.07]"
          style={{ width: `${r * 200}%`, height: `${r * 200}%` }}
        >
          <span
            className="absolute top-1/2 -left-[3px] size-1.5 -translate-y-1/2 rounded-full bg-cream/60"
            style={{ opacity: 1 - i * 0.25 }}
          />
        </div>
      ))}

      <span className="comet absolute top-1/2 left-1/2 z-10 size-1.5 rounded-full bg-cream shadow-[0_0_10px_3px_rgba(255,176,63,0.6)]" />

      {/* Sol: esfera com núcleo claro, borda mais escura e coroa suave */}
      <div className="sun absolute top-1/2 left-1/2 z-20 size-[24%] -translate-1/2">
        <span aria-hidden="true" className="sun-corona" />
        <span aria-hidden="true" className="sun-rays" />
        <div className="sun-body">
          <DatamatSymbol className="relative w-[40%] text-graphite/85" />
        </div>
      </div>

      {/* Problemas que viram soluções (passam por baixo do sol ao cair nele) */}
      {orbitPairs.map((p) => (
        <div
          key={p.problem}
          className="planet group/planet absolute top-1/2 left-1/2 z-10 opacity-0"
        >
          <span className="block rounded-lg border border-white/15 bg-graphite/90 px-3.5 py-2 text-[11px] tracking-[0.12em] whitespace-nowrap text-cream shadow-lg shadow-black/40 group-[.is-solved]/planet:hidden md:text-xs">
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
