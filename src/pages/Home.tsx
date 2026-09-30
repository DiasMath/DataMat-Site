import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { solutions, needs } from "../data/site";
import type { Kind } from "../data/site";
import { Container, Eyebrow } from "../components/ui";
import { Visual, PowerBiPanel } from "../components/mocks";
import { CTA } from "../components/contact";
import { HomeHero } from "./HomeHero";

export function Demo({ id }: { id?: string }) {
  const [active, setActive] = useState<Kind>("dados");
  const item = solutions.find((s) => s.key === active)!;
  return (
    <section className="home-journey" id={id}>
      <Container>
        <div className="journey-intro" data-reveal>
          <Eyebrow>COMECE PELO SEU DESAFIO</Eyebrow>
          <h2>
            O que está travando
            <br />
            <em>o próximo passo?</em>
          </h2>
          <p>
            Comece pelo que importa agora. Explore uma solução no seu ritmo.
          </p>
        </div>
        <div className="journey-layout">
          <div
            className="journey-choices"
            role="tablist"
            aria-label="Escolha o desafio da sua empresa"
          >
            {solutions.map((s) => (
              <button
                key={s.key}
                type="button"
                role="tab"
                id={`need-${s.key}`}
                aria-controls="journey-panel"
                aria-selected={active === s.key}
                tabIndex={active === s.key ? 0 : -1}
                className={active === s.key ? "active" : ""}
                onClick={() => setActive(s.key)}
                onKeyDown={(event) => {
                  const index = solutions.findIndex(
                    (solution) => solution.key === s.key,
                  );
                  const next =
                    event.key === "Home"
                      ? 0
                      : event.key === "End"
                        ? solutions.length - 1
                        : ["ArrowRight", "ArrowDown"].includes(event.key)
                          ? (index + 1) % solutions.length
                          : ["ArrowLeft", "ArrowUp"].includes(event.key)
                            ? (index + solutions.length - 1) % solutions.length
                            : -1;
                  if (next < 0) return;
                  event.preventDefault();
                  setActive(solutions[next].key);
                  document
                    .getElementById(`need-${solutions[next].key}`)
                    ?.focus({ preventScroll: true });
                }}
              >
                <span>{s.number}</span>
                <strong>{needs[s.key].label}</strong>
                <ArrowUpRight size={20} aria-hidden="true" />
              </button>
            ))}
          </div>
          <div
            className={`journey-panel journey-${active}`}
            id="journey-panel"
            role="tabpanel"
            tabIndex={0}
            aria-labelledby={`need-${active}`}
          >
            <div className="journey-panel-top">
              <span>{item.title}</span>
              <span>EXEMPLO ILUSTRATIVO</span>
            </div>
            <div className="journey-panel-message" key={active}>
              <span className="journey-pain">{needs[active].label}</span>
              <span className="journey-line" aria-hidden="true" />
              <div>
                <h3>{needs[active].outcome}</h3>
                <p>{needs[active].detail}</p>
              </div>
            </div>
            <div className="journey-preview" key={`${active}-visual`}>
              {active === "dados" ? <PowerBiPanel /> : <Visual kind={active} />}
            </div>
            <Link className="journey-link" to={item.path}>
              Explorar {item.title} <ArrowUpRight size={18} />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
}

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

      <Demo id="demonstracoes" />

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

      <section className="cases-whisper">
        <Container>
          <span>RESULTADOS REAIS MERECEM SER VISTOS DE PERTO.</span>
          <p>Nossos cases terão um espaço próprio em breve.</p>
        </Container>
      </section>
      <CTA title="Seu próximo passo começa com uma conversa." />
    </>
  );
}
