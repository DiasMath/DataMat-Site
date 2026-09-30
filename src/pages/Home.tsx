import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "../data/site";
import { Container, Eyebrow } from "../components/ui";
import { CTA } from "../components/contact";
import { HomeHero } from "./HomeHero";
import { PainSolutions } from "../components/home/PainSolutions";
import { CasesTeaser } from "../components/home/CasesTeaser";

export function Home() {
  return (
    <>
      <HomeHero />

      <section
        className="client-preview"
        id="clientes"
        aria-label="Prévia da área de clientes"
      >
        <Container>
          <div className="client-copy">
            <strong>Empresas que confiam na DATAMAT</strong>
          </div>
          <div
            className="client-placeholder"
            aria-label="Marcas temporárias para revisão do layout"
          >
            {[1, 2, 3, 4].map((n) => (
              <div className="client-mark" key={n}>
                <span className="client-glyph" aria-hidden="true" />
                <span>Cliente {String(n).padStart(2, "0")}</span>
              </div>
            ))}
          </div>
        </Container>
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
