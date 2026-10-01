import { useRef } from "react";
import { ArrowUpRight, Database, MessageCircle } from "lucide-react";
import { gsap, ScrollTrigger, useGSAP } from "../motion/gsap";
import { motionDisabled } from "../motion/tokens";
import { ContactAction } from "./contact";
import { DatamatSymbol } from "./DatamatSymbol";

/** Mini-ilustrações que se conectam ao símbolo (posição em % do desenho). */
const nodes = [
  { key: "planilhas", label: "Planilhas", x: 14, y: 16 },
  { key: "erp", label: "ERP", x: 7, y: 60 },
  { key: "whatsapp", label: "WhatsApp", x: 86, y: 16 },
  { key: "site", label: "Site", x: 93, y: 60 },
  { key: "indicadores", label: "Indicadores", x: 50, y: 95 },
] as const;

/** As linhas param antes do símbolo (ele é vazado e não pode deixar a linha aparecer por trás). */
const GAP = 25;
const lineEnd = (x: number, y: number) => {
  const dx = x - 50;
  const dy = y - 50;
  const d = Math.hypot(dx, dy);
  return { x: 50 + (dx / d) * GAP, y: 50 + (dy / d) * GAP };
};

function NodeArt({ kind }: { kind: (typeof nodes)[number]["key"] }) {
  switch (kind) {
    case "planilhas":
      return (
        <span className="grid grid-cols-3 gap-0.5">
          {Array.from({ length: 9 }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 w-2.5 rounded-[1px] ${i < 3 ? "bg-amber" : "bg-cream/70"}`}
            />
          ))}
        </span>
      );
    case "erp":
      return <Database size={24} className="text-cream" />;
    case "whatsapp":
      return (
        <span className="relative">
          <MessageCircle size={24} className="text-cream" />
          <span className="badge absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-amber text-[9px] font-bold text-graphite">
            3
          </span>
        </span>
      );
    case "site":
      return (
        <span className="flex w-8 flex-col gap-0.5 rounded-sm border border-cream/60 p-0.5">
          <span className="flex gap-0.5">
            <span className="size-1 rounded-full bg-amber" />
            <span className="size-1 rounded-full bg-cream/60" />
          </span>
          <span className="h-1 w-5 rounded-[1px] bg-cream/70" />
          <span className="h-1 w-3 rounded-[1px] bg-amber" />
        </span>
      );
    case "indicadores":
      return (
        <span className="flex h-6 items-end gap-0.5">
          {[40, 70, 55, 100].map((h) => (
            <span
              key={h}
              className="w-1.5 rounded-[1px] bg-amber"
              style={{ height: `${h}%` }}
            />
          ))}
        </span>
      );
  }
}

/**
 * Próximo passo em tela cheia: a seção fica presa enquanto o visitante rola;
 * o âmbar nasce no centro do símbolo e toma a tela, as ferramentas são
 * "absorvidas" pela DATAMAT e o símbolo emite ondas.
 */
export function CTA({
  title = "Vamos conversar sobre o que vem a seguir?",
}: {
  title?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current!;
      const q = gsap.utils.selector(section);
      const symbol = q(".symbol")[0];
      if (motionDisabled) {
        gsap.set(q(".fill"), { clipPath: "circle(150vmax at 50% 50%)" });
        gsap.set(q(".ink"), { color: "var(--color-graphite)" });
        return;
      }

      const center = () => {
        const s = section.getBoundingClientRect();
        const c = symbol.getBoundingClientRect();
        return {
          x: c.left - s.left + c.width / 2,
          y: c.top - s.top + c.height / 2,
        };
      };
      const toSymbol = (axis: "x" | "y") => (_: number, el: Element) => {
        const a = el.getBoundingClientRect();
        const c = symbol.getBoundingClientRect();
        return axis === "x"
          ? c.left + c.width / 2 - (a.left + a.width / 2)
          : c.top + c.height / 2 - (a.top + a.height / 2);
      };

      // 1. Conexões: ferramentas aparecem, linhas se desenham, pulsos correm.
      const lines = Array.from(
        section.querySelectorAll<SVGLineElement>(".link"),
      );
      const pulses = Array.from(
        section.querySelectorAll<SVGCircleElement>(".pulse"),
      );
      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
      const connect = gsap
        .timeline({ paused: true })
        .from(q(".node"), {
          autoAlpha: 0,
          scale: 0.6,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(1.6)",
        })
        .to(
          lines,
          {
            strokeDashoffset: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.5",
        );
      pulses.forEach((p, i) => {
        const l = lines[i];
        connect.fromTo(
          p,
          {
            attr: { cx: l.x1.baseVal.value, cy: l.y1.baseVal.value },
            autoAlpha: 1,
          },
          {
            attr: { cx: l.x2.baseVal.value, cy: l.y2.baseVal.value },
            autoAlpha: 0,
            duration: 1.8,
            ease: "power1.in",
            repeat: -1,
            repeatDelay: 0.5 + i * 0.35,
          },
          1.4 + i * 0.3,
        );
      });
      // Barras do símbolo acendem uma de cada vez, em ordem.
      connect.to(
        q(".bar"),
        {
          opacity: 0.35,
          duration: 0.45,
          stagger: { each: 0.45, repeat: -1, yoyo: true, repeatDelay: 0.9 },
        },
        1,
      );
      connect.to(
        q(".badge"),
        {
          scale: 1.25,
          duration: 0.3,
          yoyo: true,
          repeat: -1,
          repeatDelay: 1.6,
        },
        1.5,
      );

      ScrollTrigger.create({
        trigger: section,
        start: "top 75%",
        onEnter: () => connect.play(),
      });

      // 2. Tela presa: o âmbar cresce do centro do símbolo e tudo é absorvido.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=160%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onToggle: (self) =>
              self.isActive ? connect.play() : connect.pause(),
          },
        })
        .fromTo(
          q(".fill"),
          { clipPath: () => `circle(0px at ${center().x}px ${center().y}px)` },
          {
            clipPath: () =>
              `circle(150vmax at ${center().x}px ${center().y}px)`,
            ease: "power2.in",
            duration: 0.55,
          },
        )
        .to(q(".ink"), { color: "var(--color-graphite)", duration: 0.15 }, 0.4)
        .to(
          q(".node"),
          {
            x: toSymbol("x"),
            y: toSymbol("y"),
            scale: 0.3,
            autoAlpha: 0,
            stagger: 0.03,
            duration: 0.25,
            ease: "power2.in",
          },
          0.6,
        )
        .to(lines, { strokeDashoffset: 1, duration: 0.2 }, 0.6)
        .to(pulses, { autoAlpha: 0, duration: 0.05 }, 0.6)
        .to(
          q(".symbol-wrap"),
          { scale: 1.3, duration: 0.2, ease: "back.out(2)" },
          0.82,
        )
        .fromTo(
          q(".ripple"),
          { scale: 0.4, autoAlpha: 0.7 },
          { scale: 2.4, autoAlpha: 0, stagger: 0.06, duration: 0.25 },
          0.82,
        )
        .from(q(".joined"), { autoAlpha: 0, y: 12, duration: 0.15 }, 0.9);
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative flex min-h-svh items-center overflow-hidden bg-bg-hero"
      aria-labelledby="cta-titulo"
    >
      <div
        aria-hidden="true"
        className="fill absolute inset-0 bg-amber [clip-path:circle(0px_at_50%_50%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div data-reveal>
          <p className="ink text-xs font-semibold tracking-widest text-amber">
            PRÓXIMO PASSO
          </p>
          <h2
            id="cta-titulo"
            className="ink mt-5 text-5xl leading-[1.02] font-semibold tracking-tight text-cream md:text-7xl"
          >
            {title}
          </h2>
          <p className="ink mt-6 max-w-xl text-lg text-text-muted">
            Conte o que está acontecendo na sua empresa. A conversa começa pelo
            seu desafio.
          </p>
          <ContactAction className="group mt-10 inline-flex items-center gap-3 rounded-full bg-graphite py-2.5 pr-2.5 pl-7 text-base font-semibold text-cream transition hover:bg-black">
            Fale conosco
            <span className="flex size-10 items-center justify-center rounded-full bg-amber text-graphite transition-transform duration-500 ease-brand-out group-hover:rotate-45">
              <ArrowUpRight size={18} aria-hidden="true" />
            </span>
          </ContactAction>
        </div>

        <div
          className="relative mx-auto aspect-square w-full max-w-md"
          aria-hidden="true"
        >
          <svg
            viewBox="0 0 100 100"
            className="ink absolute inset-0 size-full overflow-visible text-white/30"
          >
            {nodes.map((n) => {
              const end = lineEnd(n.x, n.y);
              return (
                <line
                  key={n.key}
                  className="link"
                  x1={n.x}
                  y1={n.y}
                  x2={end.x}
                  y2={end.y}
                  pathLength={1}
                  stroke="currentColor"
                  strokeWidth={0.4}
                />
              );
            })}
            {nodes.map((n) => (
              <circle
                key={n.key}
                className="pulse fill-amber"
                r={1}
                cx={n.x}
                cy={n.y}
                opacity={0}
              />
            ))}
          </svg>

          <div className="symbol-wrap absolute top-1/2 left-1/2 w-[28%] -translate-x-1/2 -translate-y-1/2">
            {[0, 1].map((i) => (
              <span
                key={i}
                className="ripple ink absolute top-1/2 left-1/2 size-[170%] -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-current text-amber opacity-0"
              />
            ))}
            <DatamatSymbol className="symbol ink relative w-full text-amber" />
          </div>
          <span className="joined ink absolute bottom-[6%] left-1/2 -translate-x-1/2 text-sm font-semibold whitespace-nowrap text-amber">
            Tudo conectado em um só lugar
          </span>

          {nodes.map((n) => (
            <span
              key={n.key}
              className="node absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1.5"
              style={{ left: `${n.x}%`, top: `${n.y}%` }}
            >
              <span className="flex size-14 items-center justify-center rounded-2xl border border-white/10 bg-graphite shadow-lg shadow-black/40">
                <NodeArt kind={n.key} />
              </span>
              <span className="text-[11px] text-text-muted">{n.label}</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
