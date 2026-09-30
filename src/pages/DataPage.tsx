import { useEffect, useRef, useState } from "react";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { gsap, useGSAP } from "../motion/gsap";
import { skipIntro } from "../lib/boot";
import { motionDisabled } from "../motion/tokens";
import { Container, Eyebrow, SectionIntro } from "../components/ui";
import { DashboardMock } from "../components/mocks";
import { CTA } from "../components/contact";
import { Comparison } from "../components/Comparison";

function SourceFlow() {
  return (
    <div className="source-flow">
      <div className="source-list">
        {["ERP", "CRM", "Excel", "Sheets", "Financeiro"].map((x) => (
          <span key={x}>{x}</span>
        ))}
      </div>
      <div className="source-mid">
        <span>01</span>
        <div className="source-line" />
        <strong>DATAMAT</strong>
        <div className="source-line" />
        <span>02</span>
      </div>
      <div className="source-output">
        <span>VISÃO DO NEGÓCIO</span>
        <strong>Uma leitura para decidir.</strong>
        <small>Informações organizadas no contexto da operação.</small>
      </div>
    </div>
  );
}

function DataHero() {
  const frame = useRef<HTMLDivElement>(null);
  // Peça especial: as barras do gráfico crescem quando o quadro aparece.
  useGSAP(
    () => {
      if (skipIntro() || motionDisabled) return;
      gsap.from(".bar-set b", {
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.05,
        clearProps: "all",
        scrollTrigger: { trigger: frame.current, start: "top 82%", once: true },
      });
    },
    { scope: frame },
  );
  return (
    <section className="product-hero data-hero">
      <Container>
        <div className="data-hero-head">
          <div>
            <Eyebrow>01 / DADOS & BI</Eyebrow>
            <h1 data-reveal="heading">
              Veja sua empresa
              <br />
              <em>por inteiro.</em>
            </h1>
          </div>
          <div>
            <p>
              Sistemas, planilhas e operação em uma visão que ajuda a decidir.
            </p>
            <a className="text-link" href="#conteudo">
              Explorar a visão <ArrowDown size={18} />
            </a>
          </div>
        </div>
        <div className="data-hero-frame" data-reveal ref={frame}>
          <div className="frame-caption">
            <span>DATAMAT / VISÃO DE GESTÃO</span>
            <span>EXEMPLO ILUSTRATIVO</span>
          </div>
          <DashboardMock />
        </div>
        <div className="data-hero-foot">
          <span>ERP</span>
          <span>PLANILHAS</span>
          <span>FINANCEIRO</span>
          <span>VENDAS</span>
          <strong>→ UMA LEITURA</strong>
        </div>
      </Container>
    </section>
  );
}

const dataLenses = [
  {
    name: "Financeiro",
    question: "Como o resultado está evoluindo?",
    caption: "Acompanhe receita, custos e resultado em uma mesma leitura.",
    bars: [42, 56, 51, 68, 63, 81, 75, 93],
  },
  {
    name: "Vendas",
    question: "Onde a operação está ganhando tração?",
    caption: "Compare canais, períodos e comportamento de compra.",
    bars: [36, 62, 49, 72, 57, 84, 78, 96],
  },
  {
    name: "Estoque",
    question: "O que merece atenção antes da ruptura?",
    caption: "Enxergue movimento, cobertura e prioridades de reposição.",
    bars: [76, 71, 66, 61, 58, 50, 43, 35],
  },
];

function DataLens() {
  const [active, setActive] = useState(0);
  const stage = useRef<HTMLDivElement>(null);
  const lens = dataLenses[active];
  useEffect(() => {
    if (!stage.current) return;
    const bars = stage.current.querySelectorAll(".lens-chart i");
    const animation = gsap.fromTo(
      bars,
      { scaleY: 0.15, transformOrigin: "bottom" },
      {
        scaleY: 1,
        duration: 0.6,
        stagger: 0.055,
        ease: "power2.out",
        clearProps: "transform",
      },
    );
    return () => {
      animation.kill();
      gsap.set(bars, { clearProps: "transform" });
    };
  }, [active]);
  return (
    <div className="data-lens" data-reveal>
      <div
        className="data-lens-menu"
        role="tablist"
        aria-label="Perguntas de gestão"
      >
        {dataLenses.map((x, i) => (
          <button
            role="tab"
            aria-selected={active === i}
            className={active === i ? "active" : ""}
            onClick={() => setActive(i)}
            key={x.name}
          >
            <span>0{i + 1}</span>
            {x.name}
            <ArrowUpRight size={17} />
          </button>
        ))}
      </div>
      <div className="data-lens-stage" role="tabpanel" ref={stage}>
        <span>PERGUNTA DE GESTÃO / {lens.name.toUpperCase()}</span>
        <h3>{lens.question}</h3>
        <p>{lens.caption}</p>
        <div className="lens-chart" aria-label="Gráfico ilustrativo">
          {lens.bars.map((v, i) => (
            <div key={i}>
              <i style={{ height: `${v}%` }} />
              <small>{String(i + 1).padStart(2, "0")}</small>
            </div>
          ))}
        </div>
        <small>VISUALIZAÇÃO ILUSTRATIVA</small>
      </div>
    </div>
  );
}

export function DataPage() {
  return (
    <>
      <DataHero />
      <section id="conteudo" className="detail-section data-detail">
        <Container>
          <SectionIntro
            index="01"
            kicker="PERGUNTAS DE GESTÃO"
            title="O dado certo muda a conversa."
            body="Selecione uma área para ver o tipo de pergunta que um BI pode ajudar a responder."
          />
          <DataLens />
        </Container>
      </section>
      <section className="data-sources">
        <Container>
          <SectionIntro
            index="02"
            kicker="DA FONTE À VISÃO"
            title="Tudo se conecta ao negócio."
          />
          <SourceFlow />
        </Container>
      </section>
      <Comparison
        eyebrow="O CUSTO DO MANUAL"
        title="Menos tempo montando. Mais tempo analisando."
        leftTitle="informações espalhadas"
        rightTitle="visão organizada"
        left={[
          "Abrir sistemas diferentes",
          "Exportar arquivos",
          "Cruzar planilhas",
          "Conferir números novamente",
        ]}
        right={[
          "Dados reunidos",
          "Critérios alinhados ao negócio",
          "Dashboard para acompanhar",
          "Mais tempo para interpretar",
        ]}
      />
      <CTA title="Que decisão você precisa enxergar com mais clareza?" />
    </>
  );
}
