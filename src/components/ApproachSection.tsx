import { motion } from "framer-motion";
import { Search, Boxes, Rocket, RefreshCw } from "lucide-react";

const steps = [
  { icon: Search, step: "01", title: "Diagnóstico", desc: "Entendemos seu negócio, mapeamos suas fontes de dados e identificamos as perguntas que precisam de respostas." },
  { icon: Boxes, step: "02", title: "Modelagem", desc: "Estruturamos o data warehouse, definimos KPIs e desenhamos a arquitetura ideal para seus dados." },
  { icon: Rocket, step: "03", title: "Entrega", desc: "Desenvolvemos dashboards sob medida e validamos cada visual com a equipe antes do go-live." },
  { icon: RefreshCw, step: "04", title: "Evolução Contínua", desc: "Acompanhamos os resultados e evoluímos as análises conforme seu negócio cresce e muda." },
];

const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const ApproachSection = () => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Nossa Abordagem</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Metodologia que entrega resultado
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Um processo claro, transparente e colaborativo — do primeiro contato à entrega final.
        </p>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.15 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {steps.map((s) => (
          <motion.div key={s.step} variants={item} className="relative p-7 rounded-2xl bg-card border border-border hover-lift text-center">
            <span className="text-5xl font-extrabold text-primary/15 absolute top-4 right-5">{s.step}</span>
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
              <s.icon className="text-primary" size={26} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">{s.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default ApproachSection;
