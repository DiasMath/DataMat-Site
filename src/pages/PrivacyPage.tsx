import { HeroSymbol } from "../components/HeroSymbol";
import { Check, ShieldCheck } from "lucide-react";
import {
  privacyOwner,
  privacySections,
  privacySummary,
  privacyUpdatedAt,
  type PrivacyBlock,
} from "../content/privacy";
import { whatsappUrl } from "../data/site";

function Block({ block }: { block: PrivacyBlock }) {
  if (block.type === "p")
    return (
      <p className="mt-4 leading-relaxed text-graphite/80">{block.text}</p>
    );
  if (block.type === "list")
    return (
      <ul className="mt-4 grid gap-2.5">
        {block.items.map((item) => (
          <li
            key={item}
            className="flex gap-3 leading-relaxed text-graphite/80"
          >
            <span
              aria-hidden="true"
              className="mt-2.5 size-1.5 shrink-0 rounded-full bg-amber"
            />
            {item}
          </li>
        ))}
      </ul>
    );
  return (
    <div className="mt-5 overflow-x-auto rounded-2xl border border-graphite/10 bg-white">
      <table className="w-full min-w-[34rem] text-left text-sm">
        <thead>
          <tr className="border-b border-graphite/10 text-graphite/60">
            {block.head.map((h) => (
              <th key={h} className="px-4 py-3 font-semibold">
                {h}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {block.rows.map((row) => (
            <tr
              key={row[0]}
              className="border-b border-graphite/5 last:border-0"
            >
              {row.map((cell, i) => (
                <td
                  key={i}
                  className={`px-4 py-3 align-top leading-relaxed ${i === 0 ? "font-semibold" : "text-graphite/75"}`}
                >
                  {cell}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

/** Política de privacidade (LGPD): resumo, sumário fixo e seções. */
export function PrivacyPage() {
  const { controller, officer, email, cnpj } = privacyOwner;
  return (
    <>
      <section className="relative isolate overflow-hidden bg-bg-hero pt-16 pb-16 md:pt-24 md:pb-20">
        <HeroSymbol />
        <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
          <p
            className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber"
            data-reveal="fade"
          >
            <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
            PRIVACIDADE E LGPD
          </p>
          <h1
            className="mt-5 max-w-3xl text-5xl leading-[1.05] font-semibold tracking-tight text-cream md:text-6xl"
            data-reveal="heading"
          >
            Como tratamos os seus dados.
          </h1>
          <p
            className="mt-5 text-sm text-text-muted"
            data-reveal
            data-delay="0.15"
          >
            Atualizada em {privacyUpdatedAt}
          </p>

          <ul
            className="mt-10 grid gap-3 md:grid-cols-3"
            data-reveal
            data-stagger="0.1"
          >
            {privacySummary.map((s) => (
              <li
                key={s}
                className="flex gap-3 rounded-2xl border border-white/10 bg-graphite p-5 text-cream"
              >
                <Check
                  size={18}
                  aria-hidden="true"
                  className="mt-0.5 shrink-0 text-amber"
                />
                <span className="leading-relaxed">{s}</span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="bg-cream py-16 text-graphite md:py-24">
        <div className="mx-auto grid max-w-screen-2xl grid-cols-[minmax(0,1fr)] gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,3fr)_minmax(0,8fr)] lg:gap-16">
          <nav aria-label="Nesta página" className="hidden lg:block">
            <div className="sticky top-28">
              <p className="text-xs font-semibold tracking-widest text-graphite/75">
                NESTA PÁGINA
              </p>
              <ol className="mt-4 grid gap-2 border-l-2 border-graphite/10">
                {privacySections.map((s) => (
                  <li key={s.id}>
                    <a
                      href={`#${s.id}`}
                      className="-ml-0.5 block border-l-2 border-transparent py-1 pl-4 text-sm text-graphite/70 transition hover:border-amber hover:text-graphite"
                    >
                      {s.title}
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href="#contato-dados"
                    className="-ml-0.5 block border-l-2 border-transparent py-1 pl-4 text-sm text-graphite/70 transition hover:border-amber hover:text-graphite"
                  >
                    Como falar com a gente
                  </a>
                </li>
              </ol>
            </div>
          </nav>

          <div className="max-w-3xl">
            {privacySections.map((s, i) => (
              <article
                key={s.id}
                id={s.id}
                className="scroll-mt-28 border-t-2 border-graphite/10 pt-8 pb-10 first:border-t-0 first:pt-0"
              >
                <h2 className="flex items-baseline gap-3 text-2xl font-semibold tracking-tight md:text-3xl">
                  <span className="rounded-md bg-amber px-1.5 py-0.5 text-xs font-bold tabular-nums">
                    {String(i + 1).padStart(2, "0")}
                  </span>
                  {s.title}
                </h2>
                {s.blocks.map((b, k) => (
                  <Block key={k} block={b} />
                ))}
              </article>
            ))}

            <article
              id="contato-dados"
              className="scroll-mt-28 rounded-3xl bg-graphite p-6 text-cream md:p-8"
            >
              <h2 className="flex items-center gap-3 text-2xl font-semibold tracking-tight">
                <ShieldCheck
                  size={24}
                  aria-hidden="true"
                  className="text-amber"
                />
                Como falar com a gente
              </h2>
              <dl className="mt-6 grid gap-4 sm:grid-cols-2">
                <div>
                  <dt className="text-xs text-text-muted">
                    Responsável pelos dados (controlador)
                  </dt>
                  <dd className="mt-1 font-semibold">
                    {controller || "DATAMAT"}
                    {cnpj && (
                      <span className="block text-sm font-normal text-text-muted">
                        CNPJ {cnpj}
                      </span>
                    )}
                  </dd>
                </div>
                {officer && (
                  <div>
                    <dt className="text-xs text-text-muted">
                      Encarregado de dados
                    </dt>
                    <dd className="mt-1 font-semibold">{officer}</dd>
                  </div>
                )}
                {email && (
                  <div>
                    <dt className="text-xs text-text-muted">
                      E-mail para pedidos sobre dados
                    </dt>
                    <dd className="mt-1">
                      <a
                        href={`mailto:${email}?subject=Pedido%20LGPD`}
                        className="font-semibold [overflow-wrap:anywhere] text-amber hover:underline"
                      >
                        {email}
                      </a>
                    </dd>
                  </div>
                )}
                {whatsappUrl && (
                  <div>
                    <dt className="text-xs text-text-muted">WhatsApp</dt>
                    <dd className="mt-1">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="font-semibold text-amber hover:underline"
                      >
                        Falar pelo WhatsApp
                      </a>
                    </dd>
                  </div>
                )}
              </dl>
              <p className="mt-6 text-sm text-text-muted">
                Para agilizar, diga no pedido qual direito quer exercer e o
                e-mail ou telefone que usou para falar com a gente.
              </p>
            </article>
          </div>
        </div>
      </section>
    </>
  );
}
