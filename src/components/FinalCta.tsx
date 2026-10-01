import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../motion/gsap";
import { motionDisabled } from "../motion/tokens";
import { ContactAction } from "./contact";
import { DatamatSymbol } from "./DatamatSymbol";

/** Ferramentas que se conectam ao símbolo (posição em % do desenho). */
const nodes = [
  { key: "planilha", label: "Planilhas", x: 13, y: 15 },
  { key: "erp", label: "ERP", x: 9, y: 62 },
  { key: "whatsapp", label: "WhatsApp", x: 87, y: 15 },
  { key: "site", label: "Site", x: 91, y: 62 },
  { key: "painel", label: "Painel", x: 50, y: 93 },
] as const;
type NodeKey = (typeof nodes)[number]["key"];

/** Raio do círculo em volta do símbolo, onde as linhas chegam. */
const RING = 21;
const lineEnd = (x: number, y: number) => {
  const dx = x - 50;
  const dy = y - 50;
  const d = Math.hypot(dx, dy);
  return { x: 50 + (dx / d) * RING, y: 50 + (dy / d) * RING };
};

/** Mini-telas: planilha, ERP, WhatsApp, site e painel. */
function MiniScreen({ kind }: { kind: NodeKey }) {
  const cell = "rounded-[1px] bg-cream/35";
  switch (kind) {
    case "planilha":
      return (
        <span className="grid w-full grid-cols-4 gap-[2px]">
          {Array.from({ length: 20 }, (_, i) => (
            <span
              key={i}
              className={`h-1.5 ${i < 4 ? "rounded-[1px] bg-amber" : cell}`}
            />
          ))}
        </span>
      );
    case "erp":
      return (
        <span className="flex size-full gap-1">
          <span className="flex w-3 flex-col gap-1 rounded-[2px] bg-white/10 p-0.5">
            <span className="h-1 rounded-[1px] bg-amber" />
            <span className={`h-1 ${cell}`} />
            <span className={`h-1 ${cell}`} />
          </span>
          <span className="flex flex-1 flex-col gap-[3px]">
            <span className="h-1.5 w-2/3 rounded-[1px] bg-cream/60" />
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="flex gap-0.5">
                <span className={`h-1 flex-[2] ${cell}`} />
                <span
                  className={`h-1 flex-1 ${i === 1 ? "rounded-[1px] bg-amber" : cell}`}
                />
              </span>
            ))}
          </span>
        </span>
      );
    case "whatsapp":
      return (
        <span className="mx-auto flex h-full w-9 flex-col gap-1 rounded-md border border-cream/40 p-1">
          <span className="h-1.5 w-4 self-start rounded-full bg-cream/40" />
          <span className="h-1.5 w-5 self-end rounded-full bg-amber" />
          <span className="h-1.5 w-3 self-start rounded-full bg-cream/40" />
          <span className="h-1.5 w-5 self-end rounded-full bg-amber" />
        </span>
      );
    case "site":
      return (
        <span className="flex size-full flex-col gap-1 rounded-[3px] border border-cream/40 p-1">
          <span className="flex gap-0.5">
            <span className="size-1 rounded-full bg-amber" />
            <span className="size-1 rounded-full bg-cream/40" />
            <span className="size-1 rounded-full bg-cream/40" />
          </span>
          <span className="h-1.5 w-3/4 rounded-[1px] bg-cream/60" />
          <span className="h-1 w-1/2 rounded-[1px] bg-cream/30" />
          <span className="mt-auto h-2 w-6 rounded-[2px] bg-amber" />
        </span>
      );
    case "painel":
      return (
        <span className="flex size-full flex-col gap-1">
          <span className="flex gap-1">
            <span className="h-2.5 flex-1 rounded-[2px] bg-white/15" />
            <span className="h-2.5 flex-1 rounded-[2px] bg-white/15" />
          </span>
          <span className="flex flex-1 items-end gap-[3px]">
            {[35, 60, 45, 80, 70, 100].map((h) => (
              <span
                key={h}
                className="flex-1 rounded-[1px] bg-amber"
                style={{ height: `${h}%` }}
              />
            ))}
          </span>
        </span>
      );
  }
}

/** Uma "camada" da seção. A clara (âmbar) é uma cópia recortada pelo círculo. */
/** Pulsos por linha: vários ao mesmo tempo dão um fluxo contínuo de dados. */
const PULSES_PER_LINE = 3;
const PULSE_DURATION = 1.6;

/** Uma "camada" da seção. A clara (âmbar) é uma cópia recortada pelo círculo. */
function Layer({ title, amber }: { title: string; amber?: boolean }) {
  const text = amber ? "text-graphite" : "text-cream";
  const Heading = amber ? "p" : "h2";
  return (
    <div className="relative mx-auto grid min-h-svh w-full max-w-screen-2xl items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
      <div data-reveal={amber ? undefined : ""}>
        <p
          className={`text-xs font-semibold tracking-widest ${amber ? "text-graphite" : "text-amber"}`}
        >
          PRÓXIMO PASSO
        </p>
        <Heading
          id={amber ? undefined : "cta-titulo"}
          className={`mt-5 text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl ${text}`}
        >
          {title}
        </Heading>
        <p
          className={`mt-6 max-w-xl text-lg ${amber ? "text-graphite/80" : "text-text-muted"}`}
        >
          Conte o que está acontecendo na sua empresa. A conversa começa pelo
          seu desafio.
        </p>
        <ContactAction
          className={`group mt-10 inline-flex items-center gap-3 rounded-full py-2.5 pr-2.5 pl-7 text-base font-semibold transition ${amber ? "bg-graphite text-cream hover:bg-black" : "bg-amber text-graphite hover:brightness-110"}`}
        >
          Fale conosco
          <span
            className={`flex size-10 items-center justify-center rounded-full transition-transform duration-500 ease-brand-out group-hover:rotate-45 ${amber ? "bg-amber text-graphite" : "bg-graphite text-amber"}`}
          >
            <ArrowUpRight size={18} aria-hidden="true" />
          </span>
        </ContactAction>
      </div>

      <div
        className="relative mx-auto aspect-square w-full max-w-2xl lg:mr-0 lg:ml-auto lg:translate-x-6"
        aria-hidden="true"
      >
        <svg
          viewBox="0 0 100 100"
          className={`absolute inset-0 size-full overflow-visible ${amber ? "text-graphite/45" : "text-white/30"}`}
        >
          {/* O scroll mexe nos grupos (.links-group, .pulses-group, .ring-group);
              a animação contínua mexe nos elementos de dentro. Assim as duas
              nunca brigam, na ida nem na volta. */}
          <g className="ring-group">
            <circle
              className="ring-line"
              cx={50}
              cy={50}
              r={RING}
              fill="none"
              stroke="currentColor"
              strokeWidth={0.4}
            />
          </g>
          <g className="links-group">
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
          </g>
          <g className="pulses-group">
            {nodes.flatMap((n) =>
              Array.from({ length: PULSES_PER_LINE }, (_, k) => (
                <circle
                  key={`${n.key}-${k}`}
                  className={`pulse ${amber ? "fill-graphite" : "fill-amber"}`}
                  r={0.9}
                  cx={n.x}
                  cy={n.y}
                  opacity={0}
                />
              )),
            )}
          </g>
        </svg>

        <div className="symbol-wrap absolute top-1/2 left-1/2 w-[22%]">
          <DatamatSymbol
            className={`symbol relative w-full ${amber ? "text-graphite" : "text-amber"}`}
          />
        </div>

        {amber && (
          <>
            {/* Ondas: círculos perfeitos, centrados no símbolo */}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="ripple absolute top-1/2 left-1/2 aspect-square w-[42%] rounded-full border-2 border-graphite opacity-0"
              />
            ))}
            <span className="joined absolute top-[87%] left-1/2 rounded-full bg-graphite px-6 py-3 text-base font-semibold whitespace-nowrap text-amber opacity-0 md:text-lg">
              Tudo conectado em um só lugar
            </span>
          </>
        )}

        {nodes.map((n) => (
          <span
            key={n.key}
            className="node absolute"
            style={{ left: `${n.x}%`, top: `${n.y}%` }}
          >
            <span className="node-inner flex flex-col items-center gap-2">
              <span className="flex h-20 w-28 items-center justify-center rounded-xl border border-white/10 bg-graphite p-2.5 shadow-lg shadow-black/40">
                <MiniScreen kind={n.key} />
              </span>
              <span
                className={`text-xs font-medium ${amber ? "text-graphite/75" : "text-text-muted"}`}
              >
                {n.label}
              </span>
            </span>
          </span>
        ))}
      </div>
    </div>
  );
}

/**
 * Próximo passo em tela cheia: a seção fica presa enquanto o visitante rola.
 * O âmbar nasce no centro do símbolo e cobre a tela (é uma cópia da seção em
 * cores invertidas, recortada por um círculo: texto e símbolo trocam de cor
 * exatamente onde o âmbar passa). Depois, as ferramentas são absorvidas pelo
 * símbolo, que emite ondas. Tudo reversível ao rolar para cima.
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
      const symbol = q(".symbol")[0]; // da camada escura
      // Centralização feita pelo GSAP (ele assume o transform desses
      // elementos; um translate do CSS seria descartado e as duas camadas
      // ficariam desalinhadas).
      gsap.set(q(".symbol-wrap, .ripple, .node-inner"), {
        xPercent: -50,
        yPercent: -50,
      });
      gsap.set(q(".joined"), { xPercent: -50 });
      if (motionDisabled) {
        gsap.set(q(".fill"), { clipPath: "circle(150vmax at 50% 50%)" });
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
      // Distância de cada ferramenta até o símbolo (posição de repouso, sem transform).
      const toSymbol = (axis: "x" | "y") => (_: number, el: Element) => {
        const node = el as HTMLElement;
        const box = node.offsetParent as HTMLElement;
        const px = (parseFloat(node.style.left) / 100) * box.clientWidth;
        const py = (parseFloat(node.style.top) / 100) * box.clientHeight;
        return axis === "x"
          ? box.clientWidth / 2 - px
          : box.clientHeight / 2 - py;
      };

      // 1. Animação contínua (duas camadas ao mesmo tempo).
      const lines = Array.from(
        section.querySelectorAll<SVGLineElement>(".link"),
      );
      const pulses = Array.from(
        section.querySelectorAll<SVGCircleElement>(".pulse"),
      );
      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
      const connect = gsap
        .timeline({ paused: true })
        .from(q(".node-inner"), {
          autoAlpha: 0,
          scale: 0.6,
          stagger: 0.15,
          duration: 0.6,
          ease: "back.out(1.6)",
        })
        .from(
          q(".ring-line"),
          {
            scale: 0,
            transformOrigin: "50% 50%",
            duration: 0.6,
            ease: "back.out(1.6)",
          },
          "-=0.4",
        )
        .to(
          lines,
          {
            strokeDashoffset: 0,
            stagger: 0.15,
            duration: 0.9,
            ease: "power2.inOut",
          },
          "-=0.3",
        );
      // Fluxo contínuo: vários pulsos por linha, sem pausa entre eles.
      pulses.forEach((p, i) => {
        const line = lines[Math.floor(i / PULSES_PER_LINE)];
        const k = i % PULSES_PER_LINE;
        connect.fromTo(
          p,
          {
            attr: { cx: line.x1.baseVal.value, cy: line.y1.baseVal.value },
            opacity: 1,
          },
          {
            attr: { cx: line.x2.baseVal.value, cy: line.y2.baseVal.value },
            opacity: 0.2,
            duration: PULSE_DURATION,
            ease: "none",
            repeat: -1,
          },
          1.6 + (k * PULSE_DURATION) / PULSES_PER_LINE,
        );
      });
      // Barras do símbolo acendem uma de cada vez, em ordem.
      const barsTl = gsap.to(q(".bar"), {
        opacity: 0.35,
        duration: 0.45,
        paused: true,
        stagger: { each: 0.45, repeat: -1, yoyo: true, repeatDelay: 0.9 },
      });

      // Ondas: suaves e no tempo delas (não presas ao scroll), repetindo
      // devagar enquanto o estado final está na tela.
      const ripples = gsap
        .timeline({ paused: true, repeat: -1, repeatDelay: 0.4 })
        .fromTo(
          q(".ripple"),
          { scale: 0.55, autoAlpha: 0 },
          {
            keyframes: {
              autoAlpha: [0, 0.7, 0.35, 0],
              scale: [0.55, 1.2, 1.9, 2.6],
              easeEach: "none",
            },
            duration: 3.2,
            ease: "sine.out",
            stagger: 0.9,
          },
        );
      let rippling = false;

      // Toca só com a seção na tela e antes da absorção.
      let visible = false;
      let absorbed = false;
      const sync = () => {
        const run = visible && !absorbed;
        connect.paused(!run);
        barsTl.paused(!run);
        if (absorbed) gsap.set(q(".bar"), { opacity: 1 });
      };
      const io = new IntersectionObserver(([e]) => {
        visible = e.isIntersecting;
        sync();
      });
      io.observe(section);

      // 2. Tela presa (scrub). Só mexe em wrappers/grupos, com valores
      //    explícitos de ida e volta, para funcionar igual nos dois sentidos.
      const off = { immediateRender: false };
      gsap
        .timeline({
          scrollTrigger: {
            trigger: section,
            start: "top top",
            end: "+=210%",
            pin: true,
            scrub: 0.6,
            invalidateOnRefresh: true,
            onUpdate: (self) => {
              const now = self.progress > 0.5;
              if (now !== absorbed) {
                absorbed = now;
                sync();
              }
              const ripple = self.progress > 0.66;
              if (ripple !== rippling) {
                rippling = ripple;
                if (ripple) ripples.restart();
                else {
                  ripples.pause(0);
                  gsap.set(q(".ripple"), { autoAlpha: 0 });
                }
              }
            },
          },
        })
        .fromTo(
          q(".fill"),
          { clipPath: () => `circle(0px at ${center().x}px ${center().y}px)` },
          {
            clipPath: () =>
              `circle(150vmax at ${center().x}px ${center().y}px)`,
            ease: "power2.in",
            duration: 0.45,
          },
        )
        .fromTo(
          q(".node"),
          { x: 0, y: 0, scale: 1, autoAlpha: 1 },
          {
            ...off,
            x: toSymbol("x"),
            y: toSymbol("y"),
            scale: 0.3,
            autoAlpha: 0,
            stagger: 0.02,
            duration: 0.18,
            ease: "power2.in",
          },
          0.5,
        )
        .fromTo(
          q(".links-group, .pulses-group"),
          { autoAlpha: 1 },
          { ...off, autoAlpha: 0, duration: 0.12 },
          0.5,
        )
        .fromTo(
          q(".symbol-wrap"),
          { scale: 1 },
          { ...off, scale: 1.3, duration: 0.14, ease: "back.out(2)" },
          0.68,
        )
        .fromTo(
          q(".ring-group"),
          { scale: 1, transformOrigin: "50% 50%" },
          { ...off, scale: 1.3, transformOrigin: "50% 50%", duration: 0.14 },
          0.68,
        )
        .fromTo(
          q(".joined"),
          { autoAlpha: 0, y: 16 },
          { ...off, autoAlpha: 1, y: 0, duration: 0.1 },
          0.8,
        )
        // tempo parado no final, para o visitante ver o resultado
        .to({}, { duration: 0.12 });

      return () => io.disconnect();
    },
    { scope: root },
  );

  return (
    <section
      ref={root}
      className="relative overflow-hidden bg-bg-hero"
      aria-labelledby="cta-titulo"
    >
      <Layer title={title} />
      <div
        aria-hidden="true"
        className="fill pointer-events-none absolute inset-0 bg-amber [clip-path:circle(0px_at_50%_50%)]"
        // A cópia âmbar é só visual: cliques e teclado vão para a camada de baixo.
        inert
      >
        <Layer title={title} amber />
      </div>
    </section>
  );
}
