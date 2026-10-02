import { CTA } from "../components/FinalCta";
import { HomeHero } from "./HomeHero";
import { clients } from "../content/clients";
import { PainSolutions } from "../components/home/PainSolutions";
import { CasesTeaser } from "../components/home/CasesTeaser";
import { AboutDatamat } from "../components/home/AboutDatamat";

export function Home() {
  return (
    <>
      <HomeHero />

      <section
        id="clientes"
        aria-label="Clientes"
        className="border-y border-white/10 bg-bg-hero"
      >
        <div className="mx-auto flex max-w-7xl flex-wrap items-center gap-x-10 gap-y-5 px-5 py-8 md:px-8">
          <p className="text-xs font-semibold tracking-widest text-text-muted">
            EMPRESAS QUE CONFIAM NA DATAMAT
          </p>

          <ul className="flex flex-wrap items-center gap-6">
            {clients.map((c) => (
              <li key={c.name} className="flex items-center gap-3">
                <img
                  src={c.logo}
                  alt={`Logo ${c.name}`}
                  width={48}
                  height={48}
                  loading="lazy"
                  className="size-38 rounded-lg"
                />
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PainSolutions id="demonstracoes" />

      <AboutDatamat />

      <CasesTeaser />

      <CTA title="Seu próximo passo começa com uma conversa." />
    </>
  );
}