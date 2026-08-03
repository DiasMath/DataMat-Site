import { useEffect } from "react";
import { useParams, Navigate } from "react-router-dom";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import SectionHeading from "@/components/ui-kit/SectionHeading";
import BentoCard from "@/components/ui-kit/BentoCard";
import Reveal from "@/components/ui-kit/Reveal";
import CTAButton from "@/components/ui-kit/CTAButton";
import { DashboardMock } from "@/components/ui-kit/DataMock";
import { WHATSAPP_LINK } from "@/lib/site";

/* TODO CONTEÚDO: textos definitivos de cada página de solução */
const CONTENT = {
  "business-intelligence": {
    title: "Business Intelligence",
    lead: "Painéis que respondem perguntas de negócio no dia seguinte, não no fim do mês.",
    who: "Gestores que ainda dependem de planilha consolidada à mão para saber como o mês foi.",
    deliver: ["DRE e fluxo de caixa automatizados", "Painéis de vendas, margem e estoque", "Camada semântica e dicionário de indicadores", "Alertas e distribuição automática"],
  },
  "engenharia-de-dados": {
    title: "Engenharia de Dados",
    lead: "Pipelines, integrações de ERP e um modelo de dados que para de brigar com você.",
    who: "Empresas com dados espalhados entre ERP, marketplaces, planilhas e sistemas legados.",
    deliver: ["Ingestão e integração de fontes", "Data warehouse modelado", "Qualidade e testes de dados", "Governança e controle de acesso"],
  },
  "ciencia-de-dados": {
    title: "Ciência de Dados",
    lead: "Previsão de demanda, churn e precificação com método — e com erro medido.",
    who: "Operações que já têm dado organizado e precisam antecipar o que vem pela frente.",
    deliver: ["Previsão de demanda e vendas", "Segmentação e propensão", "Precificação e elasticidade", "Monitoramento de performance do modelo"],
  },
  "inteligencia-artificial": {
    title: "Inteligência Artificial",
    lead: "IA aplicada onde ela paga a conta: classificação, agentes internos e automação.",
    who: "Times afogados em tarefas repetitivas de leitura, categorização e resposta.",
    deliver: ["Classificação automática de lançamentos", "Assistentes internos sobre dados da empresa", "Extração de documentos", "Automação de rotinas operacionais"],
  },
} as const;

type Slug = keyof typeof CONTENT;

const SolutionPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const data = slug && (CONTENT as Record<string, (typeof CONTENT)[Slug]>)[slug];

  useEffect(() => {
    window.scrollTo({ top: 0 });
    if (data) document.title = `${data.title} | DATAMAT`;
  }, [data]);

  if (!data) return <Navigate to="/404" replace />;

  return (
    <>
      <Header />
      <main>
        <section className="section-padding pt-40">
          <div className="mx-auto max-w-7xl">
            <p className="t-kicker">Soluções</p>
            <h1 className="t-hero mt-6 max-w-4xl">{data.title}</h1>
            <p className="mt-8 max-w-xl text-lg text-muted-foreground">{data.lead}</p>
          </div>
        </section>

        <section className="section-padding pt-0">
          <div className="mx-auto grid max-w-7xl gap-6 md:grid-cols-12">
            <BentoCard className="md:col-span-5 md:min-h-[260px]">
              <span className="t-kicker">Para quem é</span>
              <p className="mt-4 text-lg leading-relaxed text-foreground/85">{data.who}</p>
            </BentoCard>
            <BentoCard className="md:col-span-7 md:-mt-6">
              <span className="t-kicker">O que entregamos</span>
              <ul className="mt-5 grid gap-3 sm:grid-cols-2">
                {data.deliver.map((d) => (
                  <li key={d} className="rounded-lg border border-border bg-background/50 px-4 py-3 text-sm text-muted-foreground">
                    {d}
                  </li>
                ))}
              </ul>
            </BentoCard>
            <Reveal className="md:col-span-12">
              <DashboardMock className="mx-auto max-w-3xl rotate-[1deg]" />
            </Reveal>
          </div>
        </section>

        <section className="section-padding bg-surface">
          <div className="mx-auto max-w-7xl">
            <SectionHeading kicker="Próximo passo" title="Vamos discutir o seu caso?" />
            <div className="mt-8">
              <CTAButton href={WHATSAPP_LINK} external>
                Fale com um especialista
              </CTAButton>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
};

export default SolutionPage;
