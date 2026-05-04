import { motion } from "framer-motion";
import heroImg from "@/assets/hero-abstract.jpg";

const WHATSAPP_LINK = "https://wa.me/5521996101868?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20DATAMAT";

const HeroSection = () => (
  <section className="relative min-h-screen flex items-center overflow-hidden pt-20" style={{ background: "var(--hero-gradient)" }}>
    <div className="max-w-7xl mx-auto w-full grid lg:grid-cols-2 gap-12 items-center px-6 md:px-12 lg:px-20 py-20">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="space-y-8"
      >
        <h1 className="text-5xl md:text-6xl lg:text-7xl font-logo font-bold tracking-tighter text-foreground -ml-1">
          DATA<span className="text-primary">MAT</span>
        </h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-foreground/80 -mt-2">
          Do Dado à Decisão.
        </h2>

        <blockquote className="border-l-4 border-primary pl-5 py-2">
          <p className="text-base md:text-lg italic text-muted-foreground leading-relaxed">
            "Sem dados, você é apenas mais uma pessoa com uma opinião."
          </p>
          <cite className="text-sm font-medium text-foreground/60 not-italic mt-2 block">
            — W. Edwards Deming
          </cite>
        </blockquote>

        <div className="flex flex-col sm:flex-row gap-4 pt-4">
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-base hover:brightness-110 hover:shadow-xl transition-all text-center"
          >
            Fale no WhatsApp
          </a>
          <a
            href="#sobre"
            className="px-8 py-4 rounded-lg border-2 border-foreground/15 text-foreground font-semibold text-base hover:border-primary hover:text-primary transition-all text-center"
          >
            Saiba Mais
          </a>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="hidden lg:block"
      >
        <img
          src={heroImg}
          alt="Visualização abstrata de dados e analytics"
          width={1024}
          height={768}
          className="w-full rounded-2xl shadow-2xl"
        />
      </motion.div>
    </div>
  </section>
);

export default HeroSection;
