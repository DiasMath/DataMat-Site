import { useRef } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { casesTeaser } from "../../content/home";
import { gsap, useGSAP } from "../../motion/gsap";
import { motionDisabled } from "../../motion/tokens";

const days = Array.from({ length: 30 }, (_, i) => i + 1);

/**
 * Chamada para a página de cases: texto à esquerda e, à direita, um cartão
 * clicável com um "trailer" animado do case (quando o resultado aparece:
 * antes, só depois do fim do mês; agora, todo dia).
 */
export function CasesTeaser() {
  const card = useRef<HTMLAnchorElement>(null);

  useGSAP(
    () => {
      if (motionDisabled) return;
      gsap
        .timeline({
          repeat: -1,
          repeatDelay: 1.2,
          scrollTrigger: { trigger: card.current, start: "top 85%" },
        })
        .from(".day", { autoAlpha: 0.15, stagger: 0.04, duration: 0.2 })
        .from(".late", { autoAlpha: 0, x: -12, duration: 0.4 }, "+=0.2")
        .from(
          ".daily",
          {
            scaleY: 0,
            transformOrigin: "bottom",
            stagger: 0.03,
            duration: 0.25,
          },
          "-=0.2",
        )
        .from(".now", { autoAlpha: 0, y: 8, duration: 0.4 });
    },
    { scope: card },
  );

  return (
    <section className="bg-bg-hero py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl items-center gap-10 px-5 md:px-8 lg:grid-cols-2 lg:gap-16">
        <div data-reveal>
          <p className="text-xs font-semibold tracking-widest text-amber">
            {casesTeaser.eyebrow}
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-semibold tracking-tight text-cream md:text-5xl">
            {casesTeaser.title}
          </h2>
          <p className="mt-5 max-w-md text-lg text-text-muted">
            {casesTeaser.body}
          </p>
          <Link
            to="/cases"
            className="mt-8 inline-flex items-center gap-2 bg-amber px-6 py-3.5 font-semibold text-graphite transition hover:brightness-110"
          >
            {casesTeaser.cta} <ArrowUpRight size={18} aria-hidden="true" />
          </Link>
        </div>

        <Link
          ref={card}
          to="/cases"
          aria-label="Abrir os cases"
          className="group mx-auto block aspect-square w-full max-w-md rounded-3xl border border-white/10 bg-graphite p-7 transition duration-300 hover:-translate-y-1.5 hover:border-amber/50"
        >
          <div className="flex h-full flex-col">
            <div className="flex items-center justify-between">
              <span className="text-xs tracking-widest text-text-muted">
                DRE DO MÊS
              </span>
              <ArrowUpRight
                size={22}
                className="text-text-muted transition group-hover:text-amber"
                aria-hidden="true"
              />
            </div>

            <div className="mt-6 grid grid-cols-10 gap-1.5">
              {days.map((d) => (
                <span
                  key={d}
                  className="day flex aspect-square items-center justify-center rounded bg-white/10 text-[10px] text-text-muted"
                >
                  {d}
                </span>
              ))}
            </div>

            <p className="late mt-5 text-sm text-text-muted">
              <span className="text-cream">Antes:</span> resultado só dias
              depois do fim do mês.
            </p>

            <div className="mt-auto flex h-16 items-end gap-1">
              {days.map((d) => (
                <span
                  key={d}
                  className="daily flex-1 rounded-sm bg-amber"
                  style={{ height: `${30 + ((d * 37) % 70)}%` }}
                />
              ))}
            </div>
            <p className="now mt-3 text-sm text-cream">
              <strong className="text-amber">Agora:</strong> acompanhado todo
              dia.
            </p>
          </div>
        </Link>
      </div>
    </section>
  );
}
