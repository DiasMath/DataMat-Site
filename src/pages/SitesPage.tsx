import { useState } from "react";
import { Container, Eyebrow, SectionIntro } from "../components/ui";
import { SiteMock } from "../components/mocks";
import { CTA } from "../components/FinalCta";

function SiteViewport() {
  const [device, setDevice] = useState<"desktop" | "mobile">("desktop");
  return (
    <div className="site-viewport" data-reveal="slide-left">
      <div className="viewport-bar">
        <span>PRÉVIA RESPONSIVA / EXEMPLO</span>
        <div role="tablist" aria-label="Visualizar dispositivo">
          <button
            role="tab"
            aria-selected={device === "desktop"}
            className={device === "desktop" ? "active" : ""}
            onClick={() => setDevice("desktop")}
          >
            Desktop
          </button>
          <button
            role="tab"
            aria-selected={device === "mobile"}
            className={device === "mobile" ? "active" : ""}
            onClick={() => setDevice("mobile")}
          >
            Celular
          </button>
        </div>
      </div>
      <div
        className={`viewport-stage ${device === "mobile" ? "is-mobile" : ""}`}
        role="tabpanel"
      >
        <SiteMock />
      </div>
    </div>
  );
}

function SitesHero() {
  return (
    <section className="product-hero sites-hero">
      <Container>
        <div className="sites-hero-head">
          <Eyebrow>04 / SITES & PRESENÇA DIGITAL</Eyebrow>
          <h1 data-reveal="heading">
            Seu site precisa
            <br />
            <em>trabalhar pela empresa.</em>
          </h1>
          <p>
            Uma experiência clara para apresentar o negócio e facilitar o
            próximo contato.
          </p>
        </div>
        <SiteViewport />
      </Container>
    </section>
  );
}

function SiteComparison() {
  const [split, setSplit] = useState(50);
  return (
    <div
      className="site-comparison"
      data-reveal
      style={{ "--split": `${split}%` } as React.CSSProperties}
    >
      <div className="comparison-base">
        <span>DEPOIS / CLARO</span>
        <h3>
          O que você faz.
          <br />
          Para quem.
          <br />
          Qual o próximo passo.
        </h3>
        <div className="comparison-button">Falar com a empresa ↗</div>
        <small>Mensagem • navegação • contato</small>
      </div>
      <div className="comparison-overlay">
        <span>ANTES / CONFUSO</span>
        <h3>
          Bem-vindo
          <br />
          ao nosso site.
        </h3>
        <p>Muitas páginas, pouca direção e o contato escondido.</p>
        <small>Informação dispersa</small>
      </div>
      <div className="comparison-divider">
        <span>↔</span>
      </div>
      <input
        type="range"
        min="0"
        max="100"
        value={split}
        aria-label="Comparar site antes e depois"
        onChange={(e) => setSplit(Number(e.target.value))}
      />
    </div>
  );
}

export function SitesPage() {
  return (
    <>
      <SitesHero />
      <section className="site-compare-section">
        <Container>
          <SectionIntro
            kicker="ANTES / DEPOIS"
            title="Arraste para ver o que muda."
            body="Uma estrutura melhor deixa a mensagem e o contato evidentes."
          />
          <SiteComparison />
        </Container>
      </section>
      <section id="conteudo" className="detail-section site-process">
        <Container>
          <SectionIntro
            index="01"
            kicker="DO BRIEFING AO SITE"
            title="A estrutura vem antes da tela."
          />
          <div className="site-timeline">
            {[
              "Estratégia",
              "Estrutura",
              "Design",
              "Desenvolvimento",
              "Publicação",
              "Administração",
            ].map((x, i) => (
              <div key={x}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{x}</strong>
              </div>
            ))}
          </div>
          <div className="site-care">
            <h3>Depois de publicar, o trabalho continua.</h3>
            <p>
              Conteúdo, manutenção e ajustes de páginas podem fazer parte da
              administração, conforme o escopo.
            </p>
          </div>
        </Container>
      </section>
      <CTA title="O que seu site deveria fazer melhor pela empresa?" />
    </>
  );
}
