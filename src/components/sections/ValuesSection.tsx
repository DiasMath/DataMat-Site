import { motion } from "framer-motion";
import { Target, Layers, Eye, TrendingUp } from "lucide-react";

const values = [
  { icon: Target, title: "Decisões Baseadas em Evidências", desc: "Cada recomendação é sustentada por dados concretos, não por achismo." },
  { icon: Layers, title: "Simplicidade no Complexo", desc: "Transformamos cenários complexos em soluções claras e acessíveis." },
  { icon: Eye, title: "Transparência", desc: "Processos abertos e comunicação honesta em cada etapa do projeto." },
  { icon: TrendingUp, title: "Foco no Resultado", desc: "Nosso sucesso é medido pelo impacto real que geramos no seu negócio." },
];

const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const ValuesSection = () => (
  <section id="valores" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">Nossos Valores</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">O Que Acreditamos</h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.12 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {values.map((v) => (
          <motion.div
            key={v.title}
            variants={item}
            className="p-7 rounded-2xl bg-card border border-border hover-lift cursor-default text-center"
          >
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
              <v.icon className="text-primary" size={26} />
            </div>
            <h3 className="text-xl font-semibold text-foreground mb-2">{v.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{v.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ValuesSection;
