import { motion } from "framer-motion";

const logos = ["TechCorp", "DataFlow", "InnoSys", "CloudBase", "AnalytiX", "SmartBI"];

const ClientsSection = () => (
  <section id="clientes" className="section-padding">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Nossos Clientes</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Empresas que confiam na DATAMAT</h2>
      </motion.div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 items-center">
        {logos.map((name) => (
          <div
            key={name}
            className="h-16 rounded-xl bg-muted flex items-center justify-center opacity-50 hover:opacity-80 transition-opacity"
          >
            <span className="text-lg font-bold text-muted-foreground tracking-wide">{name}</span>
          </div>
        ))}
      </div>
    </div>
  </section>
);

export default ClientsSection;
