import AnimatedCounter from "@/components/ui-kit/AnimatedCounter";
import Reveal from "@/components/ui-kit/Reveal";
import SectionHeading from "@/components/ui-kit/SectionHeading";

/* TODO CONTEÚDO: substituir pelos números reais e auditáveis da Datamat */
const stats = [
  { value: 92, suffix: "%", label: "de redução no tempo de fechamento mensal", rotate: false },
  { value: 40, prefix: "+", label: "painéis em produção rodando todo dia", rotate: true },
  { value: 15, suffix: " dias", label: "do diagnóstico ao primeiro painel entregue", rotate: false },
];

const ResultsSection = () => (
  <section id="resultados" className="section-padding">
    <div className="mx-auto max-w-7xl">
      <SectionHeading kicker="Resultados" title="O que muda depois da Datamat." />

      <div className="mt-16 grid gap-6 md:grid-cols-3 md:items-end">
        {stats.map((s, i) => (
          <Reveal key={s.label} delay={i * 0.08}>
            <div
              className={`relative surface-card p-8 ${
                s.rotate ? "rotate-[-1.5deg] md:mb-8" : i === 2 ? "md:mt-10" : ""
              }`}
            >
              {/* textura de pontos ancorada atrás dos números (assinatura da marca) */}
              <span aria-hidden className="pointer-events-none absolute inset-0 texture-dots opacity-40" />
              <p className="relative font-display text-5xl font-extrabold leading-none text-primary md:text-6xl">
                <AnimatedCounter value={s.value} prefix={s.prefix} suffix={s.suffix} />
              </p>
              <p className="relative mt-4 text-sm leading-relaxed text-muted-foreground">{s.label}</p>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
