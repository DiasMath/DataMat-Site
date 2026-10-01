import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { casesTeaser } from "../../content/home";
import { clients } from "../../content/clients";
import { DreScene } from "../scenes/DreScene";
import { useInView } from "../scenes/useInView";

/**
 * Chamada para a página de cases: texto à esquerda e, à direita, o "trailer"
 * do case do DRE (cena com legenda). O cartão inteiro leva a /cases.
 */
export function CasesTeaser() {
  const [ref, inView] = useInView<HTMLAnchorElement>();
  const [round, setRound] = useState(0);

  return (
    <section className="bg-bg-hero py-20 md:py-28">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-[minmax(0,1fr)] items-center gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-14">
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
            className="group mt-8 inline-flex items-center gap-3 rounded-full bg-amber py-2 pr-2 pl-6 font-semibold text-graphite transition hover:brightness-110"
          >
            {casesTeaser.cta}
            <span className="flex size-9 items-center justify-center rounded-full bg-graphite text-amber transition-transform duration-500 ease-brand-out group-hover:rotate-45">
              <ArrowUpRight size={17} aria-hidden="true" />
            </span>
          </Link>
        </div>

        <Link
          ref={ref}
          to="/cases"
          aria-label="Abrir os cases"
          className="group block rounded-3xl border border-white/10 bg-graphite/40 p-4 transition duration-300 hover:-translate-y-1.5 hover:border-amber/50 md:p-6"
        >
          <div className="mb-4 flex items-center justify-between">
            <span className="flex items-center gap-3 text-sm font-semibold text-cream">
              <img
                src={clients[0].logo}
                alt=""
                width={36}
                height={36}
                className="size-9 rounded-lg"
              />
              {clients[0].name} · DRE automatizado
            </span>
            <span className="hidden items-center gap-1.5 text-sm font-semibold text-text-muted transition group-hover:text-amber sm:flex">
              Ver case <ArrowUpRight size={16} aria-hidden="true" />
            </span>
          </div>
          <DreScene
            key={round}
            playing={inView}
            onEnd={() => window.setTimeout(() => setRound((r) => r + 1), 1500)}
          />
        </Link>
      </div>
    </section>
  );
}
