import { motion } from "framer-motion";

const logos = [
  { name: "Loja Juntos", src: "/clients_logos/logo_lojajuntos.png" }
];

const ClientsSection = () => (
  <section id="clientes" className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-14"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">Nossos Clientes</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground">Empresas que confiam na DATA<span className="text-primary">MAT</span></h2>
      </motion.div>

      <div className="flex justify-center items-center gap-12 flex-wrap">
        {logos.map((logo) => (
          <motion.div
            key={logo.name}
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center justify-center"
          >
            <img 
              src={logo.src} 
              alt={logo.name} 
              className="h-40 w-auto object-contain"
            />
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default ClientsSection;
