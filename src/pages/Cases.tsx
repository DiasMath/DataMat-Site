import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Clock, BarChart3, Target, Rocket } from "lucide-react";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import logoLojaJuntos from "/clients_logos/logo_lojajuntos.png";
import DashboardMockup from "@/components/sections/demo/DashboardMockup";
import FiltersMockup from "@/components/sections/demo/FiltersMockup";
import RealtimeMockup from "@/components/sections/demo/RealtimeMockup";

const WHATSAPP_LINK = "https://wa.me/5521996101868?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20DATAMAT";

const cases = [
  {
    company: "Loja Juntos.com",
    industry: "E-commerce / Varejo",
    logo: "LJ",
    color: "from-green-500 to-emerald-600",
    caseTitle: "DRE Automatizado e Fluxo de Caixa",
    challenge: "Todo final de mês, o cliente extraía dados do ERP, jogava no GPT para categorizar e só então tinha o DRE do mês inteiro. Processo manual e demorado. Cada fechamento levava dias de trabalho manual para consolidar informações de diferentes fontes e transformar em relatórios.",
    solution: "Dashboard de DRE automatizado que gera relatório no dia seguinte. Agora tem visão do mês antes dele acabar e visão de DFC. O cliente consegue acompanhar a evolução financeira diariamente sem depender de planilhas e processos manuais.",
    results: [
      { icon: Clock, value: "100%", label: "Automação do processo mensal" },
      { icon: TrendingUp, value: "Antes do fim", label: "Visão do mês em tempo real" },
      { icon: BarChart3, value: "Diário", label: "Acompanhamento diário de métricas importantes." },
    ],
  },
  {
    company: "Loja Juntos.com",
    industry: "E-commerce / Varejo",
    logo: "LJ",
    color: "from-green-500 to-emerald-600",
    caseTitle: "Tela de Sugestão de Compras Inteligente",
    challenge: "Antes, a sugestão de compras era baseada apenas no que vendeu nos últimos 12 meses, projetando 3 meses seguintes. Não tinha análise de melhor produto, prioridade, margem ou estoque. As compras eram feitas no escuro, sem visibilidade de rentabilidade",
    solution: "Tela de sugestão de compras com análise completa: melhor produto, prioridade, margem de cada produto, quantidade em estoque e entre outros indicadores. Exporta para Excel e envia direto para o fornecedor a lista de produtos. Agora o comprador tem informação para decidir o que comprar baseado em dados",
    results: [
      { icon: Target, value: "Multiplos", label: "Fatores analisados (antes era 1)" },
      { icon: TrendingUp, value: "Melhor", label: "Decisão baseada em margem" },
      { icon: Rocket, value: "1-click", label: "Exporta e envia para fornecedor" },
    ],
  },
];

const CaseCard = ({ caseData, index }: { caseData: typeof cases[0]; index: number }) => {
  const isReversed = index % 2 !== 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className={`flex flex-col md:flex-row gap-10 md:gap-16 items-stretch ${isReversed ? "md:flex-row-reverse" : ""}`}
    >
      {/* Título do case */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? 40 : -40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="flex-1 space-y-6 flex flex-col justify-center h-full"
      >
        <div>
          <h3 className="text-2xl font-bold text-foreground">{caseData.caseTitle}</h3>
        </div>

        <div className="space-y-4">
          <div className="p-6 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm font-semibold text-primary mb-2">Desafio</p>
            <p className="text-muted-foreground">{caseData.challenge}</p>
          </div>
          <div className="p-6 rounded-xl bg-muted/50 border border-border">
            <p className="text-sm font-semibold text-primary mb-2">Solução</p>
            <p className="text-muted-foreground">{caseData.solution}</p>
          </div>
        </div>
      </motion.div>

      {/* Resultados */}
      <motion.div
        initial={{ opacity: 0, x: isReversed ? -40 : 40 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.15 }}
        className="flex-1 w-full flex flex-col gap-6"
      >
        <div className="p-8 rounded-2xl bg-card border border-border h-full">
          <p className="text-base font-semibold text-primary mb-6">Resultados Alcançados</p>
          <div className="grid gap-4">
            {caseData.results.map((r, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.1 }}
                className="flex items-center gap-4 p-4 rounded-xl bg-background border border-border"
              >
                <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center">
                  <r.icon className="w-7 h-7 text-primary" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-foreground">{r.value}</p>
                  <p className="text-base text-muted-foreground">{r.label}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

const Cases = () => {
  return (
    <>
      <Header />

      {/* Hero */}
      <section className="relative pt-32 pb-20 md:pt-44 md:pb-28 overflow-hidden bg-foreground">
        <div className="absolute inset-0 bg-gradient-to-br from-foreground via-background/5 to-primary/10" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-primary/5 blur-[100px]" />

        <div className="relative max-w-4xl mx-auto px-6 md:px-12 text-center">
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-block px-4 py-1.5 mb-6 rounded-full bg-primary/15 text-primary text-sm font-semibold tracking-wide"
          >
            Cases de Sucesso
          </motion.span>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-4xl md:text-6xl font-extrabold text-background leading-tight"
          >
            Empresas que{" "}
            <span className="text-primary">transformaram dados</span> em resultados
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mt-6 text-lg md:text-xl text-background/60 max-w-2xl mx-auto"
          >
            Veja como outras empresas usaram a nossa consultoria de BI personalizada para tomar decisões mais
            rápidas e alcançar resultados expressivos.
          </motion.p>
        </div>
      </section>

      {/* Company Card */}
      <section className="pt-12 pb-6 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-6 p-8 rounded-2xl bg-card border border-border"
          >
            <div className="w-24 h-24 flex items-center justify-center shrink-0">
              <img src={logoLojaJuntos} alt="Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <h2 className="text-3xl font-bold text-foreground">{cases[0].company}</h2>
              <p className="text-lg text-muted-foreground mt-1">{cases[0].industry}</p>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Cases List */}
      <section className="pt-6 pb-20 md:pb-28 bg-background">
        <div className="max-w-6xl mx-auto px-6 md:px-12">
          <div className="space-y-16 md:space-y-20">
            {cases.map((caseData, index) => (
              <CaseCard key={caseData.caseTitle || caseData.company} caseData={caseData} index={index} />
            ))}
          </div>
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
            Pronto para transformar{" "}
            <span className="text-primary">sua história</span> também?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-muted-foreground mb-8 max-w-xl mx-auto"
          >
            Milhares de empresas já descobriram o poder dos dados. Venha descobrir
            o que a nossa consultoria de BI pode fazer pelo seu negócio.
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
            Fale Conosco
            <ArrowRight className="w-5 h-5" />
          </motion.a>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Cases;