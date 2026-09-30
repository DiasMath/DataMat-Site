import { ArrowRight, Clock, Zap } from "lucide-react";
import { cases, client, type ClientCase } from "../content/cases";
import { CTA } from "../components/FinalCta";
import { DreScene } from "../components/scenes/DreScene";
import { ComprasScene } from "../components/scenes/ComprasScene";
import { useInView } from "../components/scenes/useInView";

/** Sequência de etapas em "pílulas" ligadas por setas. */
function Flow({
  steps,
  tone,
}: {
  steps: ClientCase["before"]["steps"];
  tone: "before" | "after";
}) {
  const pill =
    tone === "before"
      ? "border-white/15 bg-white/5 text-text-muted"
      : "border-amber/60 bg-amber/10 text-cream";
  return (
    <ol
      className="flex flex-wrap items-center gap-2"
      data-reveal
      data-stagger="0.12"
    >
      {steps.map((s, i) => (
        <li key={s.label} className="flex items-center gap-2">
          <span className={`rounded-lg border px-3 py-2 text-sm ${pill}`}>
            {s.label}
            {s.note && (
              <small className="block text-xs text-amber/90">{s.note}</small>
            )}
          </span>
          {i < steps.length - 1 && (
            <ArrowRight
              size={16}
              className="text-text-muted"
              aria-hidden="true"
            />
          )}
        </li>
      ))}
    </ol>
  );
}

/** Cena animada do case, tocando quando aparece na tela (uma vez). */
function CaseScene({ visual }: { visual: ClientCase["visual"] }) {
  const [ref, inView] = useInView<HTMLDivElement>(0.3);
  const Scene = visual === "timeline" ? DreScene : ComprasScene;
  return (
    <div ref={ref}>
      <Scene playing={inView} />
    </div>
  );
}

function CaseBlock({ item, index }: { item: ClientCase; index: number }) {
  return (
    <article className="border-t border-white/10 py-16 md:py-20">
      <div className="grid grid-cols-[minmax(0,1fr)] gap-10 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-14">
        <div>
          <p className="text-xs font-semibold tracking-widest text-amber">
            CASE {String(index + 1).padStart(2, "0")}
          </p>
          <h2
            className="mt-3 text-3xl font-semibold tracking-tight text-cream md:text-4xl"
            data-reveal
          >
            {item.title}
          </h2>
          <p className="mt-4 text-lg text-text-muted" data-reveal>
            {item.context}
          </p>

          <div className="mt-8 space-y-6">
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-text-muted">
                <Clock size={16} aria-hidden="true" /> Como era
              </p>
              <Flow steps={item.before.steps} tone="before" />
            </div>
            <div>
              <p className="mb-3 flex items-center gap-2 text-sm font-semibold text-amber">
                <Zap size={16} aria-hidden="true" /> Como ficou
              </p>
              <Flow steps={item.after.steps} tone="after" />
            </div>
          </div>
        </div>

        <div className="flex flex-col gap-6">
          <CaseScene visual={item.visual} />
          <div
            className="grid grid-cols-3 gap-3"
            data-reveal
            data-stagger="0.1"
          >
            {item.results.map((r) => (
              <div key={r.label} className="rounded-xl bg-white/5 p-4">
                <p className="text-2xl font-bold text-cream">{r.value}</p>
                <p className="mt-1 text-xs text-text-muted">{r.label}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </article>
  );
}

export function CasesPage() {
  return (
    <>
      <section className="bg-bg-hero pt-36 pb-16 md:pt-44">
        <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
          <p className="text-xs font-semibold tracking-widest text-amber">
            CASES
          </p>
          <h1
            className="mt-4 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-cream md:text-6xl"
            data-reveal="heading"
          >
            O que mudou nas empresas que atendemos.
          </h1>

          <div className="mt-12 flex items-center gap-5 rounded-2xl border border-white/10 bg-graphite p-5 md:max-w-lg">
            <img
              src={client.logo}
              alt={`Logo ${client.name}`}
              width={56}
              height={56}
              className="size-14 rounded-xl"
            />
            <div>
              <p className="text-xl font-semibold text-cream">{client.name}</p>
              <p className="text-sm text-text-muted">{client.segment}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-bg">
        <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
          {cases.map((c, i) => (
            <CaseBlock key={c.slug} item={c} index={i} />
          ))}
        </div>
      </section>

      <CTA title="Quer ver isso na sua empresa?" />
    </>
  );
}
