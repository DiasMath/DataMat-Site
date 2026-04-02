import { motion } from "framer-motion";
import { Monitor, AlertTriangle, EyeOff, BarChart } from "lucide-react";

const problems = [
  { icon: Monitor, title: "Dashboards Padrão", desc: "Relatórios genéricos que não refletem a realidade específica do seu negócio." },
  { icon: BarChart, title: "Dados Genéricos", desc: "Métricas superficiais que não respondem as perguntas que realmente importam." },
  { icon: EyeOff, title: "Visão Limitada", desc: "Informações fragmentadas entre sistemas que nunca conversam entre si." },
  { icon: AlertTriangle, title: "Decisões no Escuro", desc: "Sem análise de dados, cada decisão vira um tiro no escuro." },
];

const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const ERPProblemSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">O Problema</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          O que os ERPs entregam hoje
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Seu ERP foi feito para operar, não para analisar. Os dashboards que vêm de fábrica mostram 
          o básico — e o básico não é suficiente para competir.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.12 }}
        className="grid sm:grid-cols-2 gap-6"
      >
        {problems.map((p) => (
          <motion.div key={p.title} variants={item} className="flex gap-5 p-7 rounded-2xl bg-card border border-border hover-lift">
            <div className="w-12 h-12 rounded-xl bg-destructive/10 flex items-center justify-center shrink-0">
              <p.icon className="text-destructive" size={22} />
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

export default ERPProblemSection;
