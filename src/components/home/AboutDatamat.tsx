import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowUpRight,
  BarChart3,
  Bot,
  Layers,
  MonitorSmartphone,
  Sparkles,
  Workflow,
  type LucideIcon,
} from "lucide-react";
import { about, fronts, people, principles } from "../../content/about";
import type { Kind } from "../../data/site";
import { DatamatSymbol } from "../DatamatSymbol";
import { useInView } from "../scenes/useInView";
import { motionDisabled } from "../../motion/tokens";

const icons: Record<Kind, LucideIcon> = {
  dados: BarChart3,
  ia: Bot,
  marca: Sparkles,
  sites: MonitorSmartphone,
};
/** Posição de cada frente no mapa (% do quadrado). Dados embaixo: é a base. */
const spots: Record<Kind, { x: number; y: number }> = {
  marca: { x: 50, y: 10 },
  ia: { x: 12, y: 50 },
  sites: { x: 88, y: 50 },
  dados: { x: 50, y: 90 },
};
const principleIcons = [BarChart3, Layers, Workflow];

/**
 * "Quem é a DATAMAT": texto curto, princípios e o mapa das frentes (o símbolo
 * no centro e as 4 frentes conectadas a ele). As frentes acendem uma de cada
 * vez; passar o mouse ou focar escolhe uma.
 */
export function AboutDatamat() {
  const [active, setActive] = useState(0);
  const [hold, setHold] = useState(false);
  const [ref, inView] = useInView<HTMLDivElement>(0.3);

  useEffect(() => {
    if (!inView || hold || motionDisabled) return;
    const id = window.setInterval(
      () => setActive((i) => (i + 1) % fronts.length),
      3200,
    );
    return () => window.clearInterval(id);
  }, [inView, hold]);

  const current = fronts[active];

  return (
    <section className="bg-bg-hero py-20 md:py-28">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-[minmax(0,1fr)] items-center gap-14 px-5 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)]">
        <div>
          <div data-reveal>
            <p className="text-xs font-semibold tracking-widest text-amber">
              {about.eyebrow}
            </p>
            <h2 className="mt-4 text-4xl leading-tight font-semibold tracking-tight text-cream md:text-6xl">
              {about.title}{" "}
              <span className="text-amber">{about.highlight}</span>
            </h2>
            <p className="mt-5 max-w-md text-lg text-text-muted">
              {about.body}
            </p>
          </div>

          <ul className="mt-10 grid gap-5" data-reveal data-stagger="0.12">
            {principles.map((p, i) => {
              const Icon = principleIcons[i];
              return (
                <li key={p.title} className="flex gap-4">
                  <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-amber/10 text-amber ring-1 ring-amber/20">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block font-semibold text-cream">
                      {p.title}
                    </span>
                    <span className="text-sm text-text-muted">{p.text}</span>
                  </span>
                </li>
              );
            })}
          </ul>

          <Link
            to="/sobre"
            className="group mt-10 inline-flex items-center gap-2 border-b border-cream/40 pb-1 font-semibold text-cream transition hover:border-amber hover:text-amber"
          >
            {about.link}
            <ArrowUpRight
              size={17}
              aria-hidden="true"
              className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
            />
          </Link>
        </div>

        {/* Mapa das frentes */}
        <div
          ref={ref}
          className="relative mx-auto aspect-square w-full max-w-xl"
          onMouseLeave={() => setHold(false)}
        >
          <svg
            viewBox="0 0 100 100"
            aria-hidden="true"
            className="absolute inset-0 size-full overflow-visible"
          >
            <circle
              cx={50}
              cy={50}
              r={20}
              fill="none"
              stroke="rgba(255,255,255,0.12)"
              strokeWidth={0.4}
            />
            {fronts.map((f) => {
              const on = f.key === current.key;
              const { x, y } = spots[f.key];
              const d = Math.hypot(x - 50, y - 50);
              const ex = 50 + ((x - 50) / d) * 20;
              const ey = 50 + ((y - 50) / d) * 20;
              return (
                <line
                  key={f.key}
                  x1={x}
                  y1={y}
                  x2={ex}
                  y2={ey}
                  stroke={on ? "var(--color-amber)" : "rgba(255,255,255,0.18)"}
                  strokeWidth={on ? 0.8 : 0.4}
                  className="transition-all duration-500"
                />
              );
            })}
          </svg>

          {/* Símbolo e a frase da frente ativa */}
          <div className="absolute top-1/2 left-1/2 flex w-[34%] -translate-1/2 flex-col items-center text-center">
            <DatamatSymbol className="w-[42%] text-amber" />
          </div>
          <p
            key={current.key}
            className="absolute top-[64%] left-1/2 w-[46%] -translate-x-1/2 animate-fade-up text-center text-sm text-cream md:text-base"
            aria-live="polite"
          >
            {current.line}
          </p>

          {fronts.map((f, i) => {
            const Icon = icons[f.key];
            const on = i === active;
            const { x, y } = spots[f.key];
            return (
              <Link
                key={f.key}
                to={f.path}
                onMouseEnter={() => {
                  setActive(i);
                  setHold(true);
                }}
                onFocus={() => {
                  setActive(i);
                  setHold(true);
                }}
                onBlur={() => setHold(false)}
                className={`group absolute flex -translate-1/2 items-center gap-2.5 rounded-2xl border px-4 py-3 whitespace-nowrap transition duration-500 ${on ? "scale-105 border-amber bg-amber text-graphite shadow-[0_0_40px_-8px_var(--color-amber)]" : "border-white/10 bg-graphite text-cream hover:border-amber/60"}`}
                style={{ left: `${x}%`, top: `${y}%` }}
              >
                <Icon size={18} aria-hidden="true" />
                <span className="text-sm font-semibold md:text-base">
                  {f.title}
                </span>
                {f.key === "dados" && (
                  <span
                    className={`rounded-full px-2 py-0.5 text-[10px] font-bold tracking-wide ${on ? "bg-graphite text-amber" : "bg-amber/15 text-amber"}`}
                  >
                    BASE
                  </span>
                )}
              </Link>
            );
          })}
        </div>
      </div>

      {people.length > 0 && (
        <div className="mx-auto mt-20 grid max-w-screen-2xl gap-6 px-5 md:grid-cols-2 md:px-8 lg:grid-cols-3">
          {people.map((p) => (
            <figure
              key={p.name}
              className="flex items-center gap-5 rounded-3xl border border-white/10 bg-graphite p-5"
              data-reveal
            >
              <img
                src={p.photo}
                alt={p.name}
                width={96}
                height={96}
                loading="lazy"
                className="size-24 rounded-2xl object-cover"
              />
              <figcaption>
                {p.quote && <p className="text-cream">“{p.quote}”</p>}
                <p className="mt-2 font-semibold text-cream">{p.name}</p>
                <p className="text-sm text-text-muted">{p.role}</p>
              </figcaption>
            </figure>
          ))}
        </div>
      )}
    </section>
  );
}
