import { motion } from "framer-motion";
import { FileSignature, MessageSquare, Map, Boxes, CheckCircle, BarChart3 } from "lucide-react";

const timeline = [
  { icon: FileSignature, title: "Assinatura do Contrato", desc: "Formalizamos a parceria com termos claros, sem jargões técnicos." },
  { icon: MessageSquare, title: "Reunião de Diagnóstico", desc: "Entendemos seus desafios, objetivos e fontes de dados." },
  { icon: Map, title: "Mapeamento de Dados", desc: "Identificamos e catalogamos todas as fontes relevantes." },
  { icon: Boxes, title: "Modelagem e Desenvolvimento", desc: "Construímos o data warehouse e os dashboards sob medida." },
  { icon: CheckCircle, title: "Validação", desc: "Apresentamos, ajustamos e aprovamos com sua equipe." },
  { icon: BarChart3, title: "Entrega dos Dashboards", desc: "Go-live com treinamento e suporte para autonomia." },
];

const TimelineSection = () => (
  <section className="section-padding bg-background">
    <div className="max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-100px" }}
        transition={{ duration: 0.5 }}
        className="text-center max-w-2xl mx-auto mb-16"
      >
        <p className="text-base font-semibold text-primary uppercase tracking-widest mb-3">Do Contrato aos Primeiros Visuais</p>
        <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
          Você sabe exatamente o que esperar e quando
        </h2>
        <p className="text-lg text-muted-foreground leading-relaxed">
          Um processo transparente, do primeiro aperto de mão até os dashboards rodando na sua tela.
        </p>
      </motion.div>

      <div className="relative max-w-3xl mx-auto">
        {/* Vertical line */}
        <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-border md:-translate-x-px" />

        <div className="space-y-8">
          {timeline.map((t, i) => (
            <motion.div
              key={t.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className={`relative flex items-start gap-5 md:gap-8 ${i % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"} md:text-${i % 2 === 0 ? "right" : "left"}`}
            >
              {/* Content - desktop alternating */}
              <div className="hidden md:block flex-1" />
              
              {/* Icon dot */}
              <div className="relative z-10 w-12 h-12 rounded-full bg-primary/15 border-2 border-primary flex items-center justify-center shrink-0">
                <t.icon className="text-primary" size={20} />
              </div>

              {/* Content */}
              <div className="flex-1 pb-2">
                <h3 className="text-base font-bold text-foreground mb-1">{t.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{t.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

export default TimelineSection;
