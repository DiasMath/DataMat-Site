import { motion } from "framer-motion";
import { BarChart3, Gauge, Link2, Zap } from "lucide-react";

const deliverables = [
  { icon: BarChart3, title: "Dashboards Estratégicos", desc: "Dashboards personalizados com a identidade da sua empresa para reuniões com clientes, fornecedores e investidores." },
  { icon: Gauge, title: "KPIs do Negócio", desc: "Indicadores-chave definidos com você, medindo o que realmente importa." },
  { icon: Link2, title: "Integração de Fontes", desc: "Conectamos ERP, CRM, planilhas e APIs em uma visão unificada." },
  { icon: Zap, title: "Autonomia para o Cliente", desc: "Treinamos sua equipe para explorar e evoluir os dashboards de forma independente." },
];

const item = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const DeliverablesSection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">O que Entregamos</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">
          Ferramentas que geram impacto real
        </h2>
      </motion.div>

      <motion.div
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        transition={{ staggerChildren: 0.12 }}
        className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6"
      >
        {deliverables.map((d) => (
          <motion.div key={d.title} variants={item} className="p-7 rounded-2xl bg-background border border-border hover-lift text-center">
            <div className="w-14 h-14 rounded-xl bg-primary/15 flex items-center justify-center mx-auto mb-5">
              <d.icon className="text-primary" size={26} />
            </div>
            <h3 className="text-base font-bold text-foreground mb-2">{d.title}</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">{d.desc}</p>
          </motion.div>
        ))}
      </motion.div>
    </div>
  </section>
);

export default DeliverablesSection;
