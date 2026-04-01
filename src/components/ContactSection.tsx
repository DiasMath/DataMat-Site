import { useState } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone } from "lucide-react";

const ContactSection = () => {
  const [form, setForm] = useState({ name: "", email: "", company: "", message: "" });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // placeholder
    alert("Mensagem enviada! Entraremos em contato em breve.");
    setForm({ name: "", email: "", company: "", message: "" });
  };

  const inputClass =
    "w-full px-4 py-3 rounded-lg bg-background border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/40 transition-all text-sm";

  return (
    <section id="contato" className="section-padding bg-contact">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Contato</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground">Vamos conversar?</h2>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-12">
          <form onSubmit={handleSubmit} className="lg:col-span-3 space-y-5">
            <div className="grid sm:grid-cols-2 gap-5">
              <input
                required
                placeholder="Seu Nome"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className={inputClass}
              />
              <input
                required
                type="email"
                placeholder="Seu E-mail"
                value={form.email}
                onChange={(e) => setForm({ ...form, email: e.target.value })}
                className={inputClass}
              />
            </div>
            <input
              placeholder="Sua Empresa"
              value={form.company}
              onChange={(e) => setForm({ ...form, company: e.target.value })}
              className={inputClass}
            />
            <textarea
              required
              rows={5}
              placeholder="Sua Mensagem"
              value={form.message}
              onChange={(e) => setForm({ ...form, message: e.target.value })}
              className={inputClass + " resize-none"}
            />
            <button
              type="submit"
              className="px-8 py-3.5 rounded-lg bg-primary text-primary-foreground font-bold text-sm hover:brightness-110 hover:shadow-lg transition-all"
            >
              Enviar Mensagem
            </button>
          </form>

          <div className="lg:col-span-2 space-y-8 pt-2">
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Mail className="text-primary" size={18} />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">E-mail</p>
                <p className="text-muted-foreground text-sm">contato@datamat.com.br</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <Phone className="text-primary" size={18} />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Telefone</p>
                <p className="text-muted-foreground text-sm">(11) 99999-0000</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
              <div className="w-10 h-10 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <MapPin className="text-primary" size={18} />
              </div>
              <div>
                <p className="font-semibold text-foreground text-sm">Localização</p>
                <p className="text-muted-foreground text-sm">São Paulo, SP — Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
