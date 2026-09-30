import { useEffect, useRef, useState } from "react";
import { ArrowDown } from "lucide-react";
import gsap from "gsap";
import { Container, Eyebrow, SectionIntro } from "../components/ui";
import { BrandMock } from "../components/mocks";
import { CTA } from "../components/contact";

export const editorialWeeks = [
  {
    name: "Semana 01",
    theme: "Posicionamento",
    headline: "Deixe claro o que sua marca resolve.",
    detail: "Mensagem e proposta de valor",
    tone: "brand-card-one",
  },
  {
    name: "Semana 02",
    theme: "Educação",
    headline: "Explique o que o cliente precisa entender.",
    detail: "Conteúdo que responde dúvidas",
    tone: "brand-card-two",
  },
  {
    name: "Semana 03",
    theme: "Solução",
    headline: "Mostre a oferta no contexto certo.",
    detail: "Produto ligado ao problema",
    tone: "brand-card-three",
  },
  {
    name: "Semana 04",
    theme: "Aprendizado",
    headline: "Observe a resposta. Ajuste o próximo ciclo.",
    detail: "Leitura de sinais e resultado",
    tone: "brand-card-four",
  },
];

export function EditorialCarousel() {
  const [index, setIndex] = useState(0);
  const preview = useRef<HTMLDivElement>(null);
  const item = editorialWeeks[index];
  useEffect(() => {
    if (!preview.current) return;
    const animation = gsap.fromTo(
      preview.current,
      { autoAlpha: 0.55, y: 14 },
      {
        autoAlpha: 1,
        y: 0,
        duration: 0.42,
        ease: "power2.out",
        clearProps: "all",
      },
    );
    return () => {
      animation.kill();
    };
  }, [index]);
  const change = (delta: number) =>
    setIndex((index + delta + editorialWeeks.length) % editorialWeeks.length);
  return (
    <div className="editorial-carousel" data-reveal>
      <div className="editorial-controls">
        <div>
          <span>PLANEJAMENTO ILUSTRATIVO</span>
          <h3>Um mês com direção.</h3>
        </div>
        <div>
          <button onClick={() => change(-1)} aria-label="Semana anterior">
            ←
          </button>
          <button onClick={() => change(1)} aria-label="Próxima semana">
            →
          </button>
        </div>
      </div>
      <div className="editorial-stage">
        <div className="editorial-timeline">
          {editorialWeeks.map((week, i) => (
            <button
              key={week.name}
              className={index === i ? "active" : ""}
              onClick={() => setIndex(i)}
              aria-label={`${week.name}: ${week.theme}`}
              aria-current={index === i ? "step" : undefined}
            >
              <small>0{i + 1}</small>
              <strong>{week.theme}</strong>
            </button>
          ))}
        </div>
        <div
          className={`editorial-preview ${item.tone}`}
          aria-live="polite"
          ref={preview}
        >
          <div>
            <span>ESTÚDIO / EXEMPLO</span>
            <span>{item.name.toUpperCase()}</span>
          </div>
          <strong>{item.headline}</strong>
          <small>{item.detail}</small>
        </div>
      </div>
      <div className="editorial-footer">
        <span>{String(index + 1).padStart(2, "0")} / 04</span>
        <div className="carousel-progress">
          <i style={{ width: `${(index + 1) * 25}%` }} />
        </div>
        <span>NAVEGUE PELO PLANO</span>
      </div>
    </div>
  );
}

export function BrandHero() {
  return (
    <section className="product-hero brand-hero">
      <Container className="brand-hero-layout">
        <div className="brand-hero-copy">
          <Eyebrow>03 / MARCA & GROWTH</Eyebrow>
          <h1>
            Uma marca forte
            <br />
            começa com <em>clareza.</em>
          </h1>
          <p>
            Estratégia, conteúdo e dados para comunicar o valor da empresa com
            consistência.
          </p>
          <a href="#conteudo" className="text-link">
            Ver o planejamento <ArrowDown size={18} />
          </a>
        </div>
        <div className="brand-hero-art" data-reveal>
          <div className="brand-art-label">
            IDEIA → PLANO → PUBLICAÇÃO → LEITURA
          </div>
          <BrandMock />
        </div>
      </Container>
    </section>
  );
}

export function BrandPage() {
  return (
    <>
      <BrandHero />
      <section id="conteudo" className="editorial-section">
        <Container>
          <EditorialCarousel />
        </Container>
      </section>
      <section className="strategy-section">
        <Container>
          <SectionIntro
            index="01"
            kicker="PRESENÇA COM DIREÇÃO"
            title="Publicar é uma etapa. Ter uma estratégia é o trabalho."
          />
          <div className="strategy-grid">
            <div>
              <span>SEM DIREÇÃO</span>
              <strong>Publicar</strong>
              <strong>Publicar</strong>
              <strong>Publicar</strong>
              <i>?</i>
            </div>
            <div>
              <span>COM ESTRATÉGIA</span>
              {[
                "Posicionamento",
                "Planejamento",
                "Conteúdo",
                "Distribuição",
                "Dados",
                "Otimização",
              ].map((x, i) => (
                <p key={x}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  {x}
                </p>
              ))}
            </div>
          </div>
        </Container>
      </section>
      <section className="measure-section">
        <Container>
          <SectionIntro
            kicker="DEPOIS DE PUBLICAR"
            title="Conteúdo não termina na publicação."
          />
          <div className="measure-line">
            {["Publicação", "Alcance", "Interação", "Leads", "Resultado"].map(
              (x, i) => (
                <div key={x}>
                  <small>{String(i + 1).padStart(2, "0")}</small>
                  <strong>{x}</strong>
                </div>
              ),
            )}
          </div>
          <p>Medimos para aprender e ajustar o próximo ciclo.</p>
        </Container>
      </section>
      <CTA title="Sua marca comunica o valor da sua empresa?" />
    </>
  );
}
