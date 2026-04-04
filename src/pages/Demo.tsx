import { motion } from "framer-motion";
import { BarChart3, SlidersHorizontal, Zap, MonitorPlay, ArrowRight } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const features = [
  {
    icon: BarChart3,
    title: "Dashboards Interativos",
    description: "Visualizações dinâmicas que permitem explorar seus dados em profundidade com apenas alguns cliques.",
  },
  {
    icon: SlidersHorizontal,
    title: "Filtros Dinâmicos",
    description: "Segmente e cruze informações em tempo real para encontrar exatamente o que precisa.",
  },
  {
    icon: Zap,
    title: "Dados em Tempo Real",
    description: "Informações atualizadas automaticamente, conectadas diretamente às suas fontes de dados.",
  },
  {
    icon: MonitorPlay,
    title: "Visualização Sob Medida",
    description: "Cada painel é projetado especificamente para as necessidades e KPIs do seu negócio.",
  },
];

const WHATSAPP_LINK =
  "https://wa.me/5521996101868?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20DATAMAT";

const Demo = () => (
  <>
    <Header />

    {/* Hero */}
    <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-foreground">
      <div className="absolute inset-0 bg-gradient-to-br from-foreground via-foreground/95 to-primary/20" />
      <div className="absolute top-20 right-0 w-[500px] h-[500px] rounded-full bg-primary/10 blur-[120px]" />

      <div className="relative max-w-5xl mx-auto px-6 md:px-12 text-center">
        <motion.span
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/15 text-primary text-sm font-semibold tracking-wide"
        >
          Demonstração
        </motion.span>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl font-extrabold text-background leading-tight"
        >
          Veja seus dados{" "}
          <span className="text-primary">ganharem vida</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-6 text-lg md:text-xl text-background/60 max-w-2xl mx-auto"
        >
          Aqui está uma breve demonstração de como você poderá visualizar seus
          dados. Explore, filtre e descubra insights que transformam decisões.
        </motion.p>
      </div>
    </section>

    {/* Features */}
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-primary tracking-widest uppercase mb-4"
        >
          O que você vai experimentar
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
        >
          Funcionalidades em ação
        </motion.h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((f, i) => (
            <motion.div
              key={f.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-6 rounded-2xl border border-border bg-card hover-lift"
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                <f.icon className="w-6 h-6 text-primary" />
              </div>
              <h3 className="text-lg font-bold text-foreground mb-2">{f.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{f.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>

    {/* Dashboard Preview / iframe */}
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-6xl mx-auto px-6 md:px-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            Dashboard de Demonstração
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            Interaja com o painel abaixo para explorar dados fictícios e entender
            o poder de um BI personalizado. Filtre, clique e descubra.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl overflow-hidden border border-border shadow-2xl bg-card"
        >
          {/* Aspect ratio container */}
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            {/* Replace the src below with your real Power BI embed URL */}
            <iframe
              title="Dashboard Power BI - Demonstração DATAMAT"
              src="about:blank"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              style={{ border: "none" }}
            />

            {/* Placeholder overlay — remove when a real iframe src is set */}
            <div className="absolute inset-0 flex flex-col items-center justify-center bg-foreground/5 pointer-events-none">
              <MonitorPlay className="w-16 h-16 text-primary/40 mb-4" />
              <p className="text-muted-foreground text-sm font-medium">
                Espaço reservado para o dashboard Power BI
              </p>
              <p className="text-muted-foreground/60 text-xs mt-1">
                Substitua o src do iframe pelo link de embed do seu relatório
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>

    {/* CTA */}
    <section className="py-20 md:py-28 bg-background">
      <div className="max-w-3xl mx-auto px-6 md:px-12 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground mb-4"
        >
          Quer ver isso com{" "}
          <span className="text-primary">os seus dados</span>?
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-muted-foreground mb-8 max-w-xl mx-auto"
        >
          Agende uma conversa com nosso time e descubra como transformar seus
          dados em decisões estratégicas — sem modelos genéricos.
        </motion.p>
        <motion.a
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          href={WHATSAPP_LINK}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-primary text-primary-foreground font-bold text-lg hover:brightness-110 transition-all shadow-lg shadow-primary/25"
        >
          Fale com um Especialista
          <ArrowRight className="w-5 h-5" />
        </motion.a>
      </div>
    </section>

    <Footer />
  </>
);

export default Demo;
