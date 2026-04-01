import { motion } from "framer-motion";
import { Heart, Users, Fingerprint } from "lucide-react";

const WhyUsSection = () => (
  <section className="section-padding">
    <div className="max-w-7xl mx-auto">
      <div className="grid md:grid-cols-2 gap-12 items-center">
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-widest mb-3">Por que nós?</p>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-6">
            Pequenos por escolha. Excelentes por vocação.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            Somos uma consultoria pequena e focada: atendemos poucos clientes com atenção total. 
            Sem burocracia, sem modelos prontos.
          </p>
          <p className="text-muted-foreground leading-relaxed">
            Enquanto grandes consultorias demoram meses e entregam o mesmo para todos, nós mergulhamos 
            nos seus dados e no seu negócio para entregar algo verdadeiramente personalizado.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.5 }}
          className="space-y-6"
        >
          {[
            { icon: Heart, title: "Atenção Total", desc: "Poucos clientes, acompanhamento próximo e dedicação real ao seu projeto." },
            { icon: Fingerprint, title: "100% Personalizado", desc: "Nada de templates. Cada solução é criada do zero para o seu cenário." },
            { icon: Users, title: "Sem Burocracia", desc: "Comunicação direta, decisões rápidas e entregas ágeis — sem camadas desnecessárias." },
          ].map((item) => (
            <div key={item.title} className="flex gap-5 p-6 rounded-2xl bg-card border border-border hover-lift">
              <div className="w-11 h-11 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                <item.icon className="text-primary" size={20} />
              </div>
              <div>
                <h3 className="text-base font-bold text-foreground mb-1">{item.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  </section>
);

export default WhyUsSection;
