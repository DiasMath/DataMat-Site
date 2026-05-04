import { motion } from "framer-motion";
import { Lightbulb, TrendingUp, Brain } from "lucide-react";

const points = [
  { icon: Lightbulb, title: "Clareza nas Decisões", desc: "Dados bem estruturados eliminam o achismo e revelam o caminho mais seguro para o crescimento." },
  { icon: TrendingUp, title: "Vantagem Competitiva", desc: "Empresas orientadas por dados crescem até 23x mais rápido que concorrentes sem inteligência analítica." },
  { icon: Brain, title: "Inteligência Estratégica", desc: "BI transforma números em narrativas — e narrativas em ações que geram resultado real." },
];

const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const WhyBISection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">Por que ter BI?</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          A informação certa no momento certo muda tudo.
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mb-16"
      >
        <p className="text-lg text-muted-foreground leading-relaxed">
          Em um mundo onde dados são gerados a cada segundo, quem sabe interpretá-los sai na frente. 
          Business Intelligence não é luxo — é a base para decisões mais rápidas, precisas e lucrativas.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.15 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {points.map((p) => (
          <motion.div key={p.title} variants={item} className="p-8 rounded-2xl bg-background border border-border hover-lift cursor-default">
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5">
              <p.icon className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">{p.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{p.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default WhyBISection;
