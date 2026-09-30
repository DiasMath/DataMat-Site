import { useRef } from "react";
import {
  ArrowUpRight,
  BarChart3,
  Database,
  FileSpreadsheet,
  Globe,
  MessageCircle,
} from "lucide-react";
import symbol from "../assets/brand/datamat-symbol.svg";
import { gsap, ScrollTrigger, useGSAP } from "../motion/gsap";
import { motionDisabled } from "../motion/tokens";
import { ContactAction } from "./contact";

/** Pontos que se conectam ao símbolo (posição em % da área do desenho). */
const nodes = [
  { icon: FileSpreadsheet, label: "Planilhas", x: 12, y: 18 },
  { icon: Database, label: "ERP", x: 8, y: 62 },
  { icon: MessageCircle, label: "WhatsApp", x: 88, y: 20 },
  { icon: Globe, label: "Site", x: 92, y: 64 },
  { icon: BarChart3, label: "Indicadores", x: 50, y: 94 },
];

/**
 * Próximo passo em tela cheia: a seção fica presa enquanto o visitante rola,
 * o âmbar toma a tela a partir do símbolo e tudo se conecta à DATAMAT.
 */
export function CTA({
  title = "Vamos conversar sobre o que vem a seguir?",
}: {
  title?: string;
}) {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      if (motionDisabled) {
        gsap.set(q(".fill"), { clipPath: "circle(150% at 72% 50%)" });
        gsap.set(q(".ink"), { color: "var(--color-graphite)" });
        gsap.set(q(".symbol"), { filter: "brightness(0.15)" });
        return;
      }

      // 1. Conexões: linhas se desenham até o símbolo e pulsos correm por elas.
      const lines = Array.from(
        root.current!.querySelectorAll<SVGLineElement>(".link"),
      );
      const pulses = Array.from(
        root.current!.querySelectorAll<SVGCircleElement>(".pulse"),
      );
      gsap.set(lines, { strokeDasharray: 1, strokeDashoffset: 1 });
      const connect = gsap
        .timeline({ paused: true })
        .from(q(".node"), {
          autoAlpha: 0,
          scale: 0.6,
          stagger: 0.12,
          duration: 0.5,
          ease: "back.out(1.6)",
        })
        .to(
          lines,
          {
            strokeDashoffset: 0,
            stagger: 0.12,
            duration: 0.8,
            ease: "power2.inOut",
          },
          "-=0.4",
        )
        .from(
          q(".symbol"),
          { scale: 0.85, autoAlpha: 0.3, duration: 0.6, ease: "back.out(1.8)" },
          "-=0.3",
        );
      pulses.forEach((p, i) => {
        const line = lines[i];
        const x1 = line.x1.baseVal.value,
          y1 = line.y1.baseVal.value;
        const x2 = line.x2.baseVal.value,
          y2 = line.y2.baseVal.value;
        connect.fromTo(
          p,
          { attr: { cx: x1, cy: y1 }, autoAlpha: 1 },
          {
            attr: { cx: x2, cy: y2 },
            autoAlpha: 0,
            duration: 1.6,
            ease: "power1.in",
            repeat: -1,
            repeatDelay: 0.4 + i * 0.3,
          },
          1.2 + i * 0.25,
        );
      });
      gsap.to(q(".symbol"), {
        scale: 1.04,
        duration: 1.2,
        yoyo: true,
        repeat: -1,
        ease: "sine.inOut",
        transformOrigin: "50% 50%",
      });

      // 2. Tela presa: o âmbar cresce a partir do símbolo até cobrir tudo.
      gsap
        .timeline({
          scrollTrigger: {
            trigger: root.current,
            start: "top top",
            end: "+=120%",
            pin: true,
            scrub: 0.6,
            onToggle: (self) =>
              self.isActive ? connect.play() : connect.pause(),
          },
        })
        .fromTo(
          q(".fill"),
          { clipPath: "circle(0% at 72% 50%)" },
          {
            clipPath: "circle(150% at 72% 50%)",
            ease: "power2.in",
            duration: 1,
          },
        )
        .to(q(".ink"), { color: "var(--color-graphite)", duration: 0.3 }, 0.55)
        .to(q(".symbol"), { filter: "brightness(0.15)", duration: 0.3 }, 0.55);

      // Conexões começam assim que a seção aparece, mesmo antes de prender.
      ScrollTrigger.create({
        trigger: root.current,
        start: "top 70%",
        onEnter: () => connect.play(),
      });
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
        className="fill absolute inset-0 bg-amber [clip-path:circle(0%_at_72%_50%)]"
      />

      <div className="relative mx-auto grid w-full max-w-7xl items-center gap-12 px-5 py-24 md:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)]">
        <div data-reveal>
          <p
            data-reveal
            className="ink text-xs font-semibold tracking-widest text-amber"
          >
            PRÓXIMO PASSO
          </p>
          <h2
            id="cta-titulo"
            data-reveal
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
            {nodes.map((n) => (
              <line
                key={n.label}
                className="link"
                x1={n.x}
                y1={n.y}
                x2={50}
                y2={50}
                pathLength={1}
                stroke="currentColor"
                strokeWidth={0.4}
              />
            ))}
            {nodes.map((n) => (
              <circle
                key={n.label}
                className="pulse fill-cream"
                r={0.9}
                cx={n.x}
                cy={n.y}
                opacity={0}
              />
            ))}
          </svg>
          <img
            src={symbol}
            alt=""
            className="symbol absolute top-1/2 left-1/2 w-[30%] -translate-x-1/2 -translate-y-1/2"
          />
          {nodes.map(({ icon: Icon, label, x, y }) => (
            <span
              key={label}
              className="node absolute flex -translate-x-1/2 -translate-y-1/2 items-center gap-1.5 rounded-full border border-white/15 bg-graphite px-3 py-1.5 text-xs font-medium text-cream"
              style={{ left: `${x}%`, top: `${y}%` }}
            >
              <Icon size={14} className="text-amber" /> {label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
