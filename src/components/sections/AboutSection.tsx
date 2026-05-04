import { motion } from "framer-motion";
import { BarChart3, Database, Plug } from "lucide-react";

const services = [
  {
    icon: BarChart3,
    title: "Dashboards Interativos",
    desc: "Criamos painéis visuais que transformam dados brutos em insights acionáveis e de fácil compreensão.",
  },
  {
    icon: Database,
    title: "Data Warehouses",
    desc: "Estruturamos e centralizamos seus dados para uma fonte única de verdade, confiável e escalável.",
  },
  {
    icon: Plug,
    title: "Integração de APIs e Planilhas",
    desc: "Conectamos suas ferramentas, sistemas e planilhas Excel/Google Sheets para um fluxo de dados contínuo e automatizado.",
  },
];

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0 },
};

const AboutSection = () => (
  <section id="sobre" className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">Sobre Nós</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          Transformamos complexidade em resultados práticos.
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
          Somos uma consultoria de Business Intelligence jovem e dinâmica, dedicada a ajudar empresas a
          tomarem decisões mais inteligentes. Traduzimos dados complexos em estratégias claras e
          acionáveis — sem jargões, sem complicações.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.15 }}
        className="grid md:grid-cols-3 gap-8"
      >
        {services.map((s) => (
          <motion.div
            key={s.title}
            variants={item}
            className="group p-8 rounded-2xl bg-background border border-border hover-lift cursor-default"
          >
            <div className="w-12 h-12 rounded-xl bg-primary/15 flex items-center justify-center mb-5 group-hover:bg-primary/25 transition-colors">
              <s.icon className="text-primary" size={24} />
            </div>
            <h3 className="text-2xl font-semibold text-foreground mb-2">{s.title}</h3>
            <p className="text-muted-foreground text-sm leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default AboutSection;
