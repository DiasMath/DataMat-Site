import { motion } from "framer-motion";
import { Clock, DollarSign, Zap } from "lucide-react";

const results = [
  { icon: Clock, metric: "80%", label: "Menos tempo em relatórios manuais", desc: "Automatizamos o que antes levava horas — e entregamos em segundos." },
  { icon: DollarSign, metric: "35%", label: "Aumento médio em eficiência", desc: "Decisões mais rápidas significam menos desperdício e mais resultado." },
  { icon: Zap, metric: "3x", label: "Mais velocidade nas decisões", desc: "Dados acessíveis e claros aceleram cada etapa do processo decisório." },
];

const ResultsSection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">Resultados</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Resultados que Transformam
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Impactos reais que nossos clientes experimentam após a implementação de BI personalizado.
        </p>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {results.map((r, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="p-8 rounded-2xl bg-background border border-border hover-lift text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-4">
              <r.icon className="text-primary" size={26} />
            </div>
            <span className="text-4xl font-extrabold text-primary block mb-2">{r.metric}</span>
            <h3 className="text-base font-bold text-foreground mb-2">{r.label}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{r.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ResultsSection;
