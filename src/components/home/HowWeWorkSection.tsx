import SectionHeading from "@/components/ui-kit/SectionHeading";
import Reveal from "@/components/ui-kit/Reveal";

/**
 * Como trabalhamos — SEÇÃO SÓBRIA (respiro de credibilidade).
 * Regra explícita: zero rotações, zero sobreposições, composição alinhada.
 */
const steps = [
  { n: "01", title: "Diagnóstico", text: "Mapeamos fontes, indicadores e onde a decisão trava hoje." },
  { n: "02", title: "Arquitetura", text: "Definimos modelo de dados, pipeline e governança antes de qualquer tela." },
  { n: "03", title: "Construção", text: "Entregas quinzenais: cada ciclo devolve um painel utilizável." },
  { n: "04", title: "Adoção", text: "Treinamento do time e ajuste fino com quem usa todo dia." },
  { n: "05", title: "Evolução", text: "Monitoramento, novos indicadores e manutenção contínua." },
];

const HowWeWorkSection = () => (
  <section id="como-trabalhamos" className="section-padding bg-paper text-paper-foreground">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        kicker="Como trabalhamos"
        title="Um método, cinco etapas, nenhuma surpresa."
        description="Processo previsível, documentado e auditável — do primeiro diagnóstico à manutenção."
        texture={false}
      />

      <div className="no-scrollbar mt-16 flex snap-x snap-mandatory gap-6 overflow-x-auto pb-4 md:grid md:grid-cols-5 md:gap-8 md:overflow-visible">
        {steps.map((s, i) => (
          <Reveal
            key={s.n}
            delay={i * 0.06}
            className="min-w-[74vw] snap-start md:min-w-0"
          >
            <div className="flex h-full flex-col border-t-2 border-paper-foreground/15 pt-6">
              <span className="font-display text-5xl font-extrabold leading-none text-paper-foreground/20">
                {s.n}
              </span>
              <h3 className="mt-5 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-3 text-sm leading-relaxed text-paper-foreground/70">{s.text}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default HowWeWorkSection;
