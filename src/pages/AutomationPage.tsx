import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { gsap } from "../motion/gsap";
import { Container, Eyebrow, SectionIntro } from "../components/ui";
import { CTA } from "../components/contact";

const steps = [
  "Novo contato",
  "IA interpreta",
  "Consulta informações",
  "Cria tarefa",
  "Equipe avisada",
];

function AutomationRunner() {
  const [step, setStep] = useState(-1);
  const runner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (step < 0 || step >= steps.length) return;
    const timer = window.setTimeout(() => setStep((s) => s + 1), 680);
    return () => window.clearTimeout(timer);
  }, [step]);
  useEffect(() => {
    if (step < 0 || step >= steps.length) return;
    const current = runner.current?.querySelectorAll(".runner-step")[step];
    if (!current) return;
    const animation = gsap.fromTo(
      current,
      { y: 9, scale: 0.96 },
      {
        y: 0,
        scale: 1,
        duration: 0.4,
        ease: "power2.out",
        clearProps: "transform",
      },
    );
    return () => {
      animation.kill();
      gsap.set(current, { clearProps: "transform" });
    };
  }, [step]);
  return (
    <div className="runner" data-reveal ref={runner}>
      <div className="runner-top">
        <div>
          <span>FLUXO / COMERCIAL</span>
          <strong>Exemplo de automação</strong>
        </div>
        <button onClick={() => setStep(0)}>
          {step >= 0 && step < steps.length
            ? "Reiniciar fluxo"
            : "Executar exemplo"}{" "}
          <ArrowRight size={17} />
        </button>
      </div>
      <div className="runner-track">
        {steps.map((x, i) => (
          <div
            className={`runner-step ${step >= i ? "done" : ""} ${step === i ? "current" : ""}`}
            key={x}
          >
            <small>{String(i + 1).padStart(2, "0")}</small>
            <strong>{x}</strong>
            <span>
              {step >= i ? (
                <Check size={16} />
              ) : (
                <span className="runner-dot" />
              )}
            </span>
          </div>
        ))}
      </div>
      <div className="runner-status" role="status">
        {step === -1
          ? "Clique para acompanhar o caminho de uma solicitação."
          : step >= steps.length
            ? "Fluxo ilustrativo concluído. A equipe recebeu o próximo passo."
            : `Etapa ${step + 1} de ${steps.length} em andamento`}
      </div>
    </div>
  );
}

function AutomationHero() {
  return (
    <section className="product-hero automation-hero">
      <Container>
        <Eyebrow>02 / IA & AUTOMAÇÃO</Eyebrow>
        <div className="automation-title">
          <h1 data-reveal="heading">
            Menos tarefa manual.
            <br />
            <em>Mais processo funcionando.</em>
          </h1>
          <p>
            Da entrada de uma solicitação à próxima ação, sem depender de cópias
            e repasses manuais.
          </p>
        </div>
        <AutomationRunner />
      </Container>
    </section>
  );
}

const automationExamples: { label: string; steps: string[] }[] = [
  {
    label: "Atendimento",
    steps: [
      "Solicitação recebida",
      "Identificar assunto",
      "Consultar informações",
      "Direcionar resposta",
    ],
  },
  {
    label: "Comercial",
    steps: [
      "Novo lead",
      "Classificar oportunidade",
      "Registrar no CRM",
      "Notificar responsável",
    ],
  },
  {
    label: "Financeiro",
    steps: [
      "Documento recebido",
      "Conferir dados",
      "Aplicar regras",
      "Encaminhar revisão",
    ],
  },
  {
    label: "Operação",
    steps: [
      "Evento no sistema",
      "Verificar condição",
      "Criar tarefa",
      "Acompanhar execução",
    ],
  },
];

export function AutomationPage() {
  const [selected, setSelected] = useState(0);
  return (
    <>
      <AutomationHero />
      <section id="conteudo" className="examples-section ia-examples">
        <Container>
          <SectionIntro
            kicker="EXEMPLOS DE APLICAÇÃO"
            title="Escolha onde destravar o trabalho."
            body="Quatro cenários ilustrativos. Cada processo real pede regras próprias."
          />
          <div
            className="examples-tabs"
            role="tablist"
            aria-label="Áreas de automação"
          >
            {automationExamples.map((x, i) => (
              <button
                role="tab"
                aria-selected={selected === i}
                className={selected === i ? "active" : ""}
                key={x.label}
                onClick={() => setSelected(i)}
              >
                {x.label}
              </button>
            ))}
          </div>
          <div className="steps-panel" role="tabpanel">
            {automationExamples[selected].steps.map((step, i) => (
              <div key={step}>
                <span>{String(i + 1).padStart(2, "0")}</span>
                <strong>{step}</strong>
              </div>
            ))}
          </div>
        </Container>
      </section>
      <section className="ia-before-after">
        <Container>
          <div data-reveal>
            <span>ANTES</span>
            <h2>Uma pessoa leva a informação de um lugar ao outro.</h2>
            <p>E-mail → planilha → sistema → equipe</p>
          </div>
          <div data-reveal>
            <span>DEPOIS</span>
            <h2>O processo acompanha o caminho da informação.</h2>
            <p>Entrada → regras → ação → pessoa certa</p>
          </div>
        </Container>
      </section>
      <CTA title="Qual tarefa ocupa sua equipe todos os dias?" />
    </>
  );
}
