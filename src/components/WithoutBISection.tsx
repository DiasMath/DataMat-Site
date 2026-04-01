import { motion } from "framer-motion";
import { SearchX, Clock, Repeat, ShieldAlert } from "lucide-react";

const pains = [
  { icon: SearchX, title: "Oportunidades Invisíveis", desc: "Padrões de compra, sazonalidades e tendências que passam despercebidos sem análise adequada." },
  { icon: Clock, title: "Tempo Desperdiçado", desc: "Horas montando planilhas manualmente que poderiam ser geradas em segundos com BI." },
  { icon: Repeat, title: "Decisões Reativas", desc: "Sem previsibilidade, você só descobre o problema quando já perdeu dinheiro." },
  { icon: ShieldAlert, title: "Risco Operacional", desc: "Dados desatualizados ou inconsistentes levam a erros que custam caro." },
];

const item = { hidden: { opacity: 0, x: -20 }, show: { opacity: 1, x: 0 } };

const WithoutBISection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">O Custo da Inércia</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          O que você perde sem BI personalizado
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Cada dia sem inteligência de dados é um dia de decisões baseadas em suposições.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.12 }}
        className="space-y-5"
      >
        {pains.map((p) => (
          <motion.div key={p.title} variants={item} className="flex gap-5 p-6 rounded-2xl bg-background border border-border hover-lift">
            <div className="w-11 h-11 rounded-lg bg-secondary/15 flex items-center justify-center shrink-0 mt-0.5">
              <p.icon className="text-secondary" size={20} />
            </div>
            <div>
              <h3 className="text-base font-bold text-foreground mb-1">{p.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{p.desc}</p>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WithoutBISection;
