import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { pains } from "../../content/home";
import { scenes } from "../scenes";

/**
 * Dor → solução: abas à esquerda, cena animada à direita (estilo "vídeo").
 * Cada cena roda sozinha, a barra da aba mostra o andamento e, ao terminar,
 * passa para a próxima dor. Pausa quando a seção sai da tela.
 */
export function PainSolutions({ id }: { id?: string }) {
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const section = useRef<HTMLElement>(null);
  const bars = useRef<(HTMLSpanElement | null)[]>([]);
  const pain = pains[active];
  const Scene = scenes[pain.key];
  const next = () => setActive((i) => (i + 1) % pains.length);
  const setProgress = (p: number) => {
    const bar = bars.current[active];
    if (bar) bar.style.transform = `scaleX(${p})`;
  };

  useEffect(() => {
    const el = section.current;
    if (!el) return;
    const io = new IntersectionObserver(
      ([entry]) => setVisible(entry.isIntersecting),
      { threshold: 0.35 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    bars.current.forEach((bar) => {
      if (bar) bar.style.transform = "scaleX(0)";
    });
  }, [active]);

  return (
    <section ref={section} id={id} className="bg-bg py-20 md:py-28">
      <div className="mx-auto grid max-w-7xl grid-cols-[minmax(0,1fr)] items-center gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        <div>
          <p
            className="text-xs font-semibold tracking-widest text-amber"
            data-reveal
          >
            COMECE PELO SEU DESAFIO
          </p>
          <h2
            className="mt-4 text-4xl leading-tight font-semibold tracking-tight text-cream md:text-5xl"
            data-reveal
          >
            O que está travando{" "}
            <span className="text-amber">o próximo passo?</span>
          </h2>

          <div
            role="tablist"
            aria-label="Escolha o desafio da sua empresa"
            className="mt-8 flex gap-2 overflow-x-auto pb-2 lg:flex-col lg:overflow-visible lg:pb-0"
          >
            {pains.map((p, i) => {
              const on = i === active;
              return (
                <button
                  key={p.key}
                  type="button"
                  role="tab"
                  aria-selected={on}
                  aria-controls="dor-cena"
                  onClick={() => setActive(i)}
                  className={`relative shrink-0 overflow-hidden rounded-xl border px-4 py-3 text-left transition-colors lg:px-5 lg:py-4 ${on ? "border-amber/60 bg-graphite" : "border-white/10 hover:border-white/25"}`}
                >
                  <span
                    className={`block text-sm font-semibold lg:text-base ${on ? "text-cream" : "text-text-muted"}`}
                  >
                    {p.pain}
                  </span>
                  {on && (
                    <span className="mt-1 hidden text-sm text-text-muted lg:block">
                      {p.answer}
                    </span>
                  )}
                  <span
                    ref={(el) => {
                      bars.current[i] = el;
                    }}
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-0 h-0.5 origin-left scale-x-0 bg-amber"
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div id="dor-cena" role="tabpanel" aria-label={pain.pain}>
          {pain.video ? (
            <video
              key={pain.video}
              className="aspect-[4/5] w-full rounded-2xl object-cover sm:aspect-[16/10]"
              src={pain.video}
              muted
              playsInline
              autoPlay={visible}
              onEnded={next}
              onTimeUpdate={(e) =>
                setProgress(
                  e.currentTarget.currentTime / (e.currentTarget.duration || 1),
                )
              }
            />
          ) : (
            <Scene
              key={pain.key}
              playing={visible}
              onEnd={next}
              onProgress={setProgress}
            />
          )}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
            <p className="text-sm text-text-muted lg:hidden">{pain.answer}</p>
            <Link
              to={pain.path}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream hover:text-amber"
            >
              Conhecer {pain.solution}{" "}
              <ArrowUpRight size={16} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
