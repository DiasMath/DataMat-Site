import { motion } from "framer-motion";

const stats = [
  { value: "78%", label: "das empresas já implementaram BI, mas não o usam estrategicamente." },
  { value: "67%", label: "dos gestores usam dados para decisões no dia a dia." },
  { value: "2.5x", label: "mais rápido nas decisões para empresas com BI avançado." },
];

const MarketRealitySection = () => (
  <section className="section-padding bg-card">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-3xl mx-auto mb-10"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">A Realidade do Mercado</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground mb-6">
          Os números não mentem — mas a maioria das empresas não os escuta.
        </h2>
      </motion.div>

      <div className="grid md:grid-cols-3 gap-8">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.5, delay: i * 0.15 }}
            className="text-center p-10 rounded-2xl bg-background border border-border"
          >
            <span className="text-5xl md:text-6xl font-extrabold text-primary block mb-4">{s.value}</span>
            <p className="text-muted-foreground leading-relaxed">{s.label}</p>
          </motion.div>
        ))}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="text-center text-lg text-muted-foreground mt-12 max-w-xl mx-auto"
      >
        Se você não está usando seus dados de forma inteligente, <span className="text-highlight font-bold underline decoration-highlight/50 underline-offset-4">alguém do seu mercado está.</span>
      </motion.p>
    </div>
  </section>
);

export default MarketRealitySection;
