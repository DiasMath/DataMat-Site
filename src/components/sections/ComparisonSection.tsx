import { motion } from "framer-motion";
import { X, Check } from "lucide-react";

const erpItems = [
  "Relatórios genéricos pré-configurados",
  "Dados sem cruzamento entre fontes",
  "Visualizações estáticas e limitadas",
  "KPIs padronizados para todos",
  "Não te ajuda nas decisões",
];

const biItems = [
  "Dashboards desenhados para o seu negócio",
  "Dados integrados de múltiplas fontes",
  "Visualizações interativas e dinâmicas",
  "KPIs que importam para sua operação",
  "Dados atualizados em tempo real",
];

const ComparisonSection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">Do Genérico ao Personalizado</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          ERP padrão vs. BI sob medida
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl bg-background border border-border"
        >
          <h3 className="text-lg font-bold text-muted-foreground mb-6">ERP Padrão</h3>
          <ul className="space-y-4">
            {erpItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-muted-foreground">
                <X size={18} className="text-destructive shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="p-8 rounded-2xl bg-background border-2 border-primary/30 shadow-lg relative overflow-hidden"
        >
          <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-4 py-1.5 rounded-bl-xl">
            RECOMENDADO
          </div>
          <h3 className="text-lg font-bold text-foreground mb-6">BI Sob Medida</h3>
          <ul className="space-y-4">
            {biItems.map((item, i) => (
              <li key={i} className="flex items-start gap-3 text-sm text-foreground">
                <Check size={18} className="text-primary shrink-0 mt-0.5" />
                {item}
              </li>
            ))}
          </ul>
        </motion.div>
      </div>
    </div>
  </section>
);

export default ComparisonSection;
