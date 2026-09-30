import { ArrowRight, ArrowUpRight, Clock, Zap } from "lucide-react";
import { cases, client, type ClientCase } from "../content/cases";
import { ContactAction } from "../components/contact";

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

/** Visual do DRE: quando o resultado do mês fica visível. */
function MonthVisual() {
  const days = Array.from({ length: 30 }, (_, i) => i + 1);
  return (
    <div className="space-y-5 rounded-2xl border border-white/10 bg-graphite p-6">
      <div>
        <p className="mb-2 text-xs tracking-widest text-text-muted">ANTES</p>
        <div className="flex items-center gap-1">
          {days.map((d) => (
            <span key={d} className="h-6 flex-1 rounded-sm bg-white/10" />
          ))}
          <span className="ml-2 shrink-0 rounded bg-white/15 px-2 py-1 text-xs text-cream">
            + dias
          </span>
        </div>
        <p className="mt-2 text-xs text-text-muted">
          O DRE só existe depois que o mês termina.
        </p>
      </div>
      <div>
        <p className="mb-2 text-xs tracking-widest text-amber">AGORA</p>
        <div
          className="flex h-10 items-end gap-1"
          data-reveal
          data-stagger="0.03"
        >
          {days.map((d) => (
            <span
              key={d}
              className="flex-1 rounded-sm bg-amber"
              style={{ height: `${30 + ((d * 37) % 70)}%` }}
            />
          ))}
        </div>
        <p className="mt-2 text-xs text-cream">
          Cada dia fechado vira dado no painel no dia seguinte.
        </p>
      </div>
    </div>
  );
}

/** Visual da compra: de um fator para vários na mesma tela. */
function FactorsVisual() {
  const factors = [
    "Vendas",
    "Margem",
    "Estoque",
    "Prioridade",
    "Melhor produto",
  ];
  return (
    <div className="grid gap-6 rounded-2xl border border-white/10 bg-graphite p-6 sm:grid-cols-2">
      <div>
        <p className="mb-3 text-xs tracking-widest text-text-muted">ANTES</p>
        <span className="inline-block rounded-lg border border-white/15 px-3 py-2 text-sm text-text-muted">
          Vendas de 12 meses
        </span>
        <p className="mt-3 text-xs text-text-muted">Um único critério.</p>
      </div>
      <div>
        <p className="mb-3 text-xs tracking-widest text-amber">AGORA</p>
        <div className="flex flex-wrap gap-2" data-reveal data-stagger="0.08">
          {factors.map((f) => (
            <span
              key={f}
              className="rounded-lg border border-amber/60 bg-amber/10 px-3 py-2 text-sm text-cream"
            >
              {f}
            </span>
          ))}
        </div>
        <p className="mt-3 text-xs text-cream">Tudo na mesma tela de compra.</p>
      </div>
    </div>
  );
}

function CaseBlock({ item, index }: { item: ClientCase; index: number }) {
  return (
    <article className="border-t border-white/10 py-16 md:py-20">
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
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
          {item.visual === "timeline" ? <MonthVisual /> : <FactorsVisual />}
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
        <div className="mx-auto max-w-7xl px-5 md:px-8">
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
        <div className="mx-auto max-w-7xl px-5 md:px-8">
          {cases.map((c, i) => (
            <CaseBlock key={c.slug} item={c} index={i} />
          ))}
        </div>
      </section>

      <section className="bg-bg-hero py-20 text-center">
        <div className="mx-auto max-w-2xl px-5">
          <h2 className="text-3xl font-semibold tracking-tight text-cream md:text-4xl">
            Quer ver isso na sua empresa?
          </h2>
          <ContactAction className="mt-8 inline-flex items-center gap-2 bg-amber px-6 py-3.5 font-semibold text-graphite transition hover:brightness-110">
            Conversar pelo WhatsApp{" "}
            <ArrowUpRight size={18} aria-hidden="true" />
          </ContactAction>
        </div>
      </section>
    </>
  );
}
