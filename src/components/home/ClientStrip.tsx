import { clients, type Client } from "../../content/clients";

/**
 * Faixa "Empresas que confiam": texto em cima, logos embaixo.
 * Com poucos clientes as logos ficam paradas e centralizadas; a partir de
 * MARQUEE_MIN vira um carrossel que roda sozinho (pausa ao passar o mouse e
 * fica parado para quem pede menos movimento no sistema).
 */
const MARQUEE_MIN = 6;

function Logo({ client, small }: { client: Client; small?: boolean }) {
  return (
    <img
      src={client.logo}
      alt={`Logo ${client.name}`}
      width={152}
      height={152}
      loading="lazy"
      className={`rounded-lg object-contain ${small ? "size-20 sm:size-24" : "size-20 sm:size-38"}`}
    />
  );
}

export function ClientStrip() {
  if (clients.length === 0) return null;
  const marquee = clients.length >= MARQUEE_MIN;

  return (
    <section
      id="clientes"
      aria-label="Clientes"
      className="border-y border-white/10 bg-bg-hero"
    >
      <div className="mx-auto max-w-7xl px-5 py-10 md:px-8">
        <p
          className="text-center text-xs font-semibold tracking-widest text-text-muted"
          data-reveal="fade"
        >
          EMPRESAS QUE CONFIAM NA DATAMAT
        </p>

        {marquee ? (
          <div
            className="client-marquee mt-8 overflow-hidden"
            data-pause-offscreen
          >
            <div className="client-marquee-track flex w-max">
              {[0, 1].map((copy) => (
                <ul
                  key={copy}
                  className="flex shrink-0 items-center gap-12 pr-12"
                  aria-hidden={copy === 1 ? true : undefined}
                >
                  {clients.map((c) => (
                    <li key={c.name}>
                      <Logo client={c} small />
                    </li>
                  ))}
                </ul>
              ))}
            </div>
          </div>
        ) : (
          <ul
            className="mt-8 flex flex-wrap items-center justify-center gap-8"
            data-reveal
            data-stagger="0.08"
          >
            {clients.map((c) => (
              <li key={c.name}>
                <Logo client={c} />
              </li>
            ))}
          </ul>
        )}
      </div>
    </section>
  );
}
