import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "../data/site";
import { Container, Eyebrow } from "../components/ui";
import { CTA } from "../components/contact";
import { HomeHero } from "./HomeHero";
import { clients } from "../content/clients";
import { PainSolutions } from "../components/home/PainSolutions";
import { CasesTeaser } from "../components/home/CasesTeaser";

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
            QUEM JÁ TRABALHA COM A DATAMAT
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
                  className="size-12 rounded-lg"
                />

                <span className="text-sm font-semibold text-cream">
                  {c.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <PainSolutions id="demonstracoes" />

      <section className="home-about">
        <Container className="home-about-grid">
          <div data-reveal>
            <Eyebrow>QUEM É A DATAMAT</Eyebrow>
            <h2>
              Começamos pelos dados. <em>Seguimos o problema.</em>
            </h2>
          </div>

          <div className="home-about-detail" data-reveal>
            <p>
              Uma empresa não precisa contratar quatro frentes. Precisa resolver
              o que importa agora.
            </p>

            <p>
              A DATAMAT nasceu da inteligência de dados e reúne competências
              para agir onde o desafio realmente está. Cada solução funciona
              sozinha; quando faz sentido, elas se conectam.
            </p>

            <Link to="/sobre" className="text-link">
              Conhecer a DATAMAT <ArrowUpRight size={17} />
            </Link>
          </div>
        </Container>

        <Container className="about-capabilities">
          {solutions.map((s) => (
            <Link to={s.path} key={s.key}>
              <span>{s.number}</span>
              <strong>{s.title}</strong>
              <ArrowUpRight size={17} />
            </Link>
          ))}
        </Container>
      </section>

      <CasesTeaser />

      <CTA title="Seu próximo passo começa com uma conversa." />
    </>
  );
}