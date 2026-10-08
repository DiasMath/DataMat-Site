import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { clients, type Client } from "../../content/clients";

/**
 * Faixa de clientes da home: título grande em cima, logos embaixo.
 *
 * - Poucos clientes (menos de MARQUEE_MIN): cartões com logo, nome e segmento,
 *   levando aos cases. Com 1 ou 2 logos, um carrossel pareceria vazio.
 * - A partir de MARQUEE_MIN: logos monocromáticas rodando sozinhas, sem
 *   cartão (no estilo das grandes consultorias). Com MARQUEE_TWO_ROWS ou
 *   mais, viram duas faixas em sentidos opostos.
 * O carrossel pausa com o mouse em cima e fica parado para quem pede menos
 * movimento no sistema.
 */
const MARQUEE_MIN = 6;
const MARQUEE_TWO_ROWS = 14;
/** Mínimo de logos por volta da faixa (para preencher telas largas). */
const MARQUEE_FILL = 12;

function MarqueeRow({
  items,
  reverse,
}: {
  items: Client[];
  reverse?: boolean;
}) {
  // Cada cópia precisa ser mais larga que a tela, senão sobra um buraco no loop.
  const filled = Array.from(
    { length: Math.ceil(MARQUEE_FILL / items.length) },
    () => items,
  ).flat();
  return (
    <div className="client-marquee overflow-hidden" data-pause-offscreen>
      <div
        className={`client-marquee-track flex w-max ${reverse ? "is-reverse" : ""}`}
        style={{ animationDuration: `${filled.length * 4}s` }}
      >
        {[0, 1].map((copy) => (
          <ul
            key={copy}
            className="flex shrink-0 items-center gap-14 pr-14 md:gap-20 md:pr-20"
            aria-hidden={copy === 1 ? true : undefined}
          >
            {filled.map((c, i) => (
              <li key={`${c.name}-${i}`}>
                <img
                  src={c.logoMono ?? c.logo}
                  alt={copy === 1 || i >= items.length ? "" : `Logo ${c.name}`}
                  height={56}
                  loading="lazy"
                  className={`h-10 w-auto max-w-40 object-contain transition duration-300 md:h-14 md:max-w-52 ${c.logoMono ? "opacity-60 hover:opacity-100" : "opacity-60 grayscale hover:opacity-100 hover:grayscale-0"}`}
                />
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}

export function ClientStrip() {
  if (clients.length === 0) return null;
  const marquee = clients.length >= MARQUEE_MIN;
  const rows =
    clients.length >= MARQUEE_TWO_ROWS
      ? [
          clients.filter((_, i) => i % 2 === 0),
          clients.filter((_, i) => i % 2 === 1),
        ]
      : [clients];

  return (
    <section
      id="clientes"
      aria-labelledby="clientes-titulo"
      className="border-y border-white/10 bg-bg-hero py-16 md:py-24"
    >
      <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
        <div className="grid grid-cols-[minmax(0,1fr)] gap-6 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:items-end lg:gap-16">
          <div>
            <p
              className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber"
              data-reveal="fade"
            >
              <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
              QUEM JÁ TRABALHA COM A GENTE
            </p>
            <h2
              id="clientes-titulo"
              className="mt-4 text-3xl leading-[1.08] font-semibold tracking-tight text-cream md:text-5xl"
              data-reveal="heading"
            >
              Empresas que já decidem com dados, não no improviso.
            </h2>
          </div>
          <p className="max-w-md text-lg text-text-muted" data-reveal>
            Negócios que trocaram planilha solta e retrabalho por números claros
            e processos que rodam sozinhos.
          </p>
        </div>
      </div>

      {marquee ? (
        <div className="mt-14 grid gap-8 md:mt-16 md:gap-10" data-reveal="fade">
          {rows.map((items, i) => (
            <MarqueeRow key={i} items={items} reverse={i === 1} />
          ))}
        </div>
      ) : (
        <ul
          className="mx-auto mt-12 grid max-w-screen-2xl grid-cols-[minmax(0,1fr)] gap-4 px-5 sm:grid-cols-2 md:mt-14 md:px-8 lg:grid-cols-3"
          data-reveal
          data-stagger="0.08"
        >
          {clients.map((c) => (
            <li key={c.name}>
              <Link
                to="/cases"
                className="group flex items-center gap-5 rounded-2xl border border-white/10 bg-graphite p-5 transition hover:-translate-y-0.5 hover:border-amber/60"
              >
                <img
                  src={c.logo}
                  alt={`Logo ${c.name}`}
                  width={72}
                  height={72}
                  loading="lazy"
                  className="size-16 shrink-0 rounded-xl object-contain md:size-18"
                />
                <span className="min-w-0 flex-1">
                  <span className="block font-semibold text-cream">
                    {c.name}
                  </span>
                  <span className="mt-0.5 block text-sm text-text-muted">
                    {c.segment}
                  </span>
                </span>
                <ArrowUpRight
                  size={18}
                  aria-hidden="true"
                  className="shrink-0 text-text-muted transition group-hover:rotate-45 group-hover:text-amber"
                />
              </Link>
            </li>
          ))}
          {/* Enquanto a lista é curta, o espaço vira convite. */}
          <li>
            <Link
              to="/contato"
              className="group flex h-full items-center gap-5 rounded-2xl border border-dashed border-white/15 p-5 transition hover:border-amber/60"
            >
              <span className="flex size-16 shrink-0 items-center justify-center rounded-xl border border-dashed border-white/20 text-2xl text-text-muted transition group-hover:border-amber group-hover:text-amber md:size-18">
                +
              </span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold text-cream">
                  Sua empresa aqui
                </span>
                <span className="mt-0.5 block text-sm text-text-muted">
                  Conte o desafio e vamos montar o caminho.
                </span>
              </span>
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="shrink-0 text-text-muted transition group-hover:rotate-45 group-hover:text-amber"
              />
            </Link>
          </li>
        </ul>
      )}
    </section>
  );
}
