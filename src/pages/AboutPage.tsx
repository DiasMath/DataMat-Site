import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "../data/site";
import { Container, Eyebrow, Button, SectionIntro } from "../components/ui";
import { CTA } from "../components/FinalCta";

export function AboutPage() {
  return (
    <>
      <section className="simple-hero">
        <Container>
          <Eyebrow>DATAMAT / INTELIGÊNCIA PARA NEGÓCIOS</Eyebrow>
          <h1 data-reveal="heading">
            Tecnologia, estratégia e execução mais próximas do negócio.
          </h1>
          <p>Começamos pelo problema. A ferramenta vem depois.</p>
        </Container>
      </section>
      <section className="about-story">
        <Container>
          <SectionIntro
            kicker="NOSSA ABORDAGEM"
            title="Competências diferentes. Uma conversa com o negócio."
          />
          <div className="story-layout">
            <div className="story-path">
              {[
                "Dados",
                "Inteligência",
                "Automação",
                "Marca",
                "Presença digital",
              ].map((x, i) => (
                <div key={x}>
                  <span>{String(i + 1).padStart(2, "0")}</span>
                  {x}
                </div>
              ))}
            </div>
            <div>
              <p>
                A DATAMAT começou pela análise de dados e ampliou sua atuação
                para problemas que também pedem execução, comunicação e presença
                digital.
              </p>
              <p>
                Podemos atuar em uma frente ou conectar competências quando isso
                fizer sentido para o cenário da empresa.
              </p>
              <Button to="/contato">Conte o seu desafio</Button>
            </div>
          </div>
        </Container>
      </section>
      <section className="about-fronts">
        <Container>
          <SectionIntro
            kicker="NOSSAS FRENTES"
            title="Escolha por onde começar."
          />
          <div>
            {solutions.map((s) => (
              <Link key={s.key} to={s.path}>
                <span>{s.number}</span>
                {s.title}
                <ArrowUpRight size={20} />
              </Link>
            ))}
          </div>
        </Container>
      </section>
      <CTA />
    </>
  );
}
