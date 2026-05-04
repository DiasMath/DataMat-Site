import { MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const WHATSAPP_LINK = "https://wa.me/5521996101868?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20Datamat";

const ContactSection = () => (
  <section id="contato" className="section-padding bg-contact">
    <div className="max-w-7xl mx-auto text-center">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mb-6"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">Contato</p>
        <h2 className="text-3xl md:text-5xl font-bold text-foreground">
          Pronto para transformar seus dados?
        </h2>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="max-w-2xl mx-auto mb-16"
      >
        <p className="text-muted-foreground mb-10">
          Fale conosco pelo WhatsApp. Nossa equipe está pronta para entender sua necessidade.
        </p>
        <a
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 px-8 py-4 rounded-lg bg-primary text-primary-foreground font-bold text-base hover:brightness-110 hover:shadow-xl transition-all"
        >
          <MessageCircle size={24} />
          Falar no WhatsApp
        </a>
      </motion.div>
    </div>
  </section>
);

export default ContactSection;
