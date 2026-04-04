import { useEffect } from "react";
import { motion } from "framer-motion";
import { BarChart3, SlidersHorizontal, Zap, MonitorPlay, ArrowRight, Paintbrush, Database, Sparkles } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";

const WHATSAPP_LINK =
  "https://wa.me/5521996101868?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20DATAMAT";

/* ── Mockup Components ── */

const DashboardMockup = () => (
  <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm">
    <div className="flex gap-2 mb-4">
      <div className="h-8 w-24 rounded-lg bg-primary/20" />
      <div className="h-8 w-16 rounded-lg bg-muted" />
      <div className="h-8 w-20 rounded-lg bg-muted" />
    </div>
    <div className="flex gap-3 items-end h-32">
      {[60, 85, 45, 95, 70, 50, 80].map((h, i) => (
        <div key={i} className="flex-1 rounded-t-md bg-primary/30" style={{ height: `${h}%` }}>
          <div className="w-full rounded-t-md bg-primary" style={{ height: `${Math.min(100, h + 20)}%` }} />
        </div>
      ))}
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {["R$ 1.2M", "+23%", "847"].map((v, i) => (
        <div key={i} className="p-2 rounded-lg bg-card border border-border text-center">
          <p className="text-xs text-muted-foreground">KPI</p>
          <p className="text-sm font-bold text-primary">{v}</p>
        </div>
      ))}
    </div>
    <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-primary/10 blur-2xl" />
  </div>
);

const FiltersMockup = () => (
  <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm">
    <div className="space-y-3 mb-5">
      {["Região", "Produto", "Período"].map((label) => (
        <div key={label} className="flex items-center gap-3">
          <span className="text-xs text-muted-foreground w-16">{label}</span>
          <div className="flex-1 h-8 rounded-lg bg-card border border-border flex items-center px-3">
            <div className="h-2 rounded-full bg-primary/40" style={{ width: "60%" }} />
          </div>
        </div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
        <div className="w-full h-12 flex items-end gap-1">
          {[30, 50, 70, 40, 90].map((h, i) => (
            <div key={i} className="flex-1 rounded-sm bg-primary" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="p-3 rounded-xl bg-card border border-border">
        <div className="w-12 h-12 mx-auto rounded-full border-4 border-primary border-t-transparent" />
      </div>
    </div>
    <div className="absolute -bottom-3 -left-3 w-20 h-20 rounded-full bg-primary/10 blur-2xl" />
  </div>
);

const RealtimeMockup = () => (
  <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm">
    <div className="flex items-center gap-2 mb-4">
      <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
      <span className="text-xs text-green-600 font-semibold">Conectado</span>
    </div>
    <div className="space-y-2">
      {[
        { label: "Vendas Hoje", value: "R$ 47.320", change: "+12%" },
        { label: "Pedidos", value: "234", change: "+8%" },
        { label: "Ticket Médio", value: "R$ 202", change: "+3%" },
      ].map((item) => (
        <div key={item.label} className="flex items-center justify-between p-3 rounded-xl bg-card border border-border">
          <div>
            <p className="text-xs text-muted-foreground">{item.label}</p>
            <p className="text-sm font-bold text-foreground">{item.value}</p>
          </div>
          <span className="text-xs font-semibold text-green-600">{item.change}</span>
        </div>
      ))}
    </div>
    <div className="mt-4 h-16 flex items-end gap-0.5">
      {Array.from({ length: 20 }).map((_, i) => (
        <div key={i} className="flex-1 rounded-t-sm bg-primary/40" style={{ height: `${20 + Math.sin(i * 0.8) * 30 + Math.random() * 30}%` }} />
      ))}
    </div>
  </div>
);

const CustomMockup = () => (
  <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm">
    <div className="flex items-center gap-3 mb-5">
      <div className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center">
        <Paintbrush className="w-5 h-5 text-primary" />
      </div>
      <div>
        <p className="text-sm font-bold text-foreground">Seu Dashboard</p>
        <p className="text-xs text-muted-foreground">Personalizado para você</p>
      </div>
    </div>
    <div className="grid grid-cols-2 gap-3">
      <div className="col-span-2 h-20 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center">
        <div className="flex gap-1 items-end h-10">
          {[40, 65, 50, 80, 55, 70, 90].map((h, i) => (
            <div key={i} className="w-3 rounded-t-sm bg-primary/60" style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
      <div className="h-16 rounded-xl bg-card border border-border flex items-center justify-center">
        <div className="w-10 h-10 rounded-full border-[3px] border-primary/50 border-b-transparent" />
      </div>
      <div className="h-16 rounded-xl bg-card border border-border flex flex-col items-center justify-center">
        <p className="text-lg font-bold text-primary">98%</p>
        <p className="text-[10px] text-muted-foreground">Satisfação</p>
      </div>
    </div>
  </div>
);

/* ── Zig-zag feature data ── */
const zigzagFeatures = [
  {
    icon: BarChart3,
    title: "Dashboards Interativos",
    description: "Navegue por visualizações ricas e dinâmicas que transformam números brutos em narrativas visuais. Com apenas alguns cliques, você explora tendências, compara períodos e identifica oportunidades que antes ficavam escondidas em planilhas.",
    visual: <DashboardMockup />,
  },
  {
    icon: SlidersHorizontal,
    title: "Filtros que Revelam Insights",
    description: "Segmente por região, produto, período ou qualquer dimensão relevante ao seu negócio. Cada filtro aplicado revela uma nova camada de informação, permitindo análises cruzadas que geram insights acionáveis em segundos.",
    visual: <FiltersMockup />,
  },
  {
    icon: Zap,
    title: "Dados Sempre Atualizados",
    description: "Seus dashboards são conectados diretamente às suas fontes de dados. As informações se atualizam automaticamente, garantindo que cada decisão seja baseada nos números mais recentes — sem esperar relatórios manuais.",
    visual: <RealtimeMockup />,
  },
  {
    icon: Paintbrush,
    title: "Feito Sob Medida",
    description: "Nada de modelos genéricos. Cada painel, cada métrica, cada visualização é projetada especificamente para os KPIs e processos do seu negócio. O resultado é um BI que fala a língua da sua empresa.",
    visual: <CustomMockup />,
  },
];

/* ── Steps data ── */
const steps = [
  { icon: Database, title: "Conectamos seus dados", desc: "Integramos com ERPs, planilhas e bancos de dados." },
  { icon: Sparkles, title: "Criamos seus dashboards", desc: "Painéis personalizados para seus KPIs." },
  { icon: MonitorPlay, title: "Você explora e decide", desc: "Dados vivos, acessíveis e acionáveis." },
];

const Demo = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
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

    {/* Zig-zag Features */}
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
          className="text-3xl md:text-4xl font-bold text-foreground text-center mb-20"
        >
          Funcionalidades em ação
        </motion.h2>

        <div className="space-y-24 md:space-y-32">
          {zigzagFeatures.map((f, i) => {
            const isReversed = i % 2 !== 0;
            return (
              <div
                key={f.title}
                className={`flex flex-col gap-10 md:gap-16 items-center ${isReversed ? "md:flex-row-reverse" : "md:flex-row"}`}
              >
                {/* Text */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="flex-1 space-y-4"
                >
                  <div className="w-12 h-12 rounded-xl bg-primary/10 flex items-center justify-center">
                    <f.icon className="w-6 h-6 text-primary" />
                  </div>
                  <h3 className="text-2xl md:text-3xl font-bold text-foreground">{f.title}</h3>
                  <p className="text-muted-foreground leading-relaxed text-base md:text-lg">{f.description}</p>
                </motion.div>

                {/* Visual */}
                <motion.div
                  initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.15 }}
                  className="flex-1 w-full"
                >
                  {f.visual}
                </motion.div>
              </div>
            );
          })}
        </div>
      </div>
    </section>

    {/* Como Funciona — Steps */}
    <section className="py-20 md:py-28 bg-muted/30">
      <div className="max-w-5xl mx-auto px-6 md:px-12">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center text-sm font-semibold text-primary tracking-widest uppercase mb-4"
        >
          Como funciona
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-bold text-foreground text-center mb-16"
        >
          Do dado bruto à decisão estratégica
        </motion.h2>

        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 md:gap-4">
          {steps.map((step, i) => (
            <div key={step.title} className="flex flex-col md:flex-row items-center flex-1 gap-4 md:gap-0">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="flex flex-col items-center text-center flex-1"
              >
                <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-lg font-bold text-foreground mb-1">{step.title}</h3>
                <p className="text-sm text-muted-foreground max-w-[200px]">{step.desc}</p>
              </motion.div>

              {i < steps.length - 1 && (
                <ArrowRight className="hidden md:block w-6 h-6 text-primary/40 shrink-0 mt-6" />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>

    {/* Dashboard Preview / iframe */}
    <section className="py-20 md:py-28 bg-background">
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
          {/* Browser chrome bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-foreground/5 border-b border-border">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-400" />
              <div className="w-3 h-3 rounded-full bg-yellow-400" />
              <div className="w-3 h-3 rounded-full bg-green-400" />
            </div>
            <div className="flex-1 mx-4">
              <div className="h-6 rounded-md bg-background/60 border border-border flex items-center px-3">
                <span className="text-[10px] text-muted-foreground">app.powerbi.com/view?r=...</span>
              </div>
            </div>
          </div>

          {/* Aspect ratio container */}
          <div className="relative w-full" style={{ aspectRatio: "16 / 9" }}>
            <iframe
              title="Dashboard Power BI - Demonstração DATAMAT"
              src="about:blank"
              className="absolute inset-0 w-full h-full"
              allowFullScreen
              style={{ border: "none" }}
            />

            {/* Placeholder overlay */}
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
    <section className="py-20 md:py-28 bg-muted/30">
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
};

export default Demo;
