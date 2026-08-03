import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import SectionHeading from "@/components/ui-kit/SectionHeading";
import BentoCard from "@/components/ui-kit/BentoCard";
import Reveal from "@/components/ui-kit/Reveal";
import { BarChartMock, DashboardMock, LineChartMock, MessySheetMock } from "@/components/ui-kit/DataMock";

/* TODO CONTEÚDO: revisar textos finais de cada solução */
const SolutionsSection = () => (
  <section id="solucoes" className="section-padding">
    <div className="mx-auto max-w-7xl">
      <SectionHeading
        kicker="Soluções"
        title={
          <>
            Quatro frentes,
            <br />
            uma decisão melhor.
          </>
        }
        description="Do encanamento de dados ao modelo que antecipa o próximo mês — entregue no ritmo da sua operação."
      />

      {/* Bento assimétrico 12 colunas: spans irregulares, um card sobrepõe o vizinho */}
      <div className="mt-16 grid grid-cols-1 gap-5 md:grid-cols-12">
        {/* BI — bloco largo, mockup vaza da borda do card */}
        <BentoCard as="article" className="md:col-span-7 md:min-h-[420px]">
          <span className="t-kicker">01</span>
          <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">Business Intelligence</h3>
          <p className="mt-3 max-w-sm text-muted-foreground">
            Painéis que respondem perguntas de negócio no dia seguinte, não no fim do mês.
          </p>
          <Link
            to="/solucoes/business-intelligence"
            className="mt-6 inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary"
          >
            Ver solução <ArrowUpRight size={16} />
          </Link>
          {/* mockup vazando do container */}
          <DashboardMock className="pointer-events-none absolute -bottom-10 -right-16 w-[340px] rotate-[-2deg] opacity-90 md:w-[400px]" />
        </BentoCard>

        {/* Engenharia — bloco alto e estreito */}
        <BentoCard as="article" className="md:col-span-5 md:row-span-2 md:min-h-[560px]">
          <span className="t-kicker">02</span>
          <h3 className="mt-4 font-display text-2xl font-bold md:text-3xl">Engenharia de Dados</h3>
          <p className="mt-3 text-muted-foreground">
            Pipelines, integrações de ERP e um modelo de dados que para de brigar com você.
          </p>

          <div className="mt-8 space-y-4">
            <MessySheetMock />
            <p className="text-center text-xs uppercase tracking-[0.28em] text-muted-foreground">vira</p>
            <DashboardMock />
          </div>

          <Link
            to="/solucoes/engenharia-de-dados"
            className="mt-8 inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary"
          >
            Ver solução <ArrowUpRight size={16} />
          </Link>
        </BentoCard>

        {/* Ciência de dados — card que avança sobre o vizinho */}
        <BentoCard as="article" className="md:col-span-4 md:-mt-8 md:min-h-[300px] md:translate-x-3">
          <span className="t-kicker">03</span>
          <h3 className="mt-4 font-display text-2xl font-bold">Ciência de Dados</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            Previsão de demanda, churn e precificação com método — e com erro medido.
          </p>
          <LineChartMock className="mt-6 h-20 w-full" />
          <Link
            to="/solucoes/ciencia-de-dados"
            className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary"
          >
            Ver solução <ArrowUpRight size={16} />
          </Link>
        </BentoCard>

        <BentoCard as="article" className="md:col-span-3 md:min-h-[300px]">
          <span className="t-kicker">04</span>
          <h3 className="mt-4 font-display text-2xl font-bold">Inteligência Artificial</h3>
          <p className="mt-3 text-sm text-muted-foreground">
            IA aplicada onde ela paga a conta: classificação, agentes internos e automação.
          </p>
          <BarChartMock className="mt-6 h-16 w-full" />
          <Link
            to="/solucoes/inteligencia-artificial"
            className="mt-5 inline-flex items-center gap-2 font-sans text-sm font-semibold text-primary"
          >
            Ver solução <ArrowUpRight size={16} />
          </Link>
        </BentoCard>
      </div>

      <Reveal className="mt-10">
        <p className="max-w-xl text-sm text-muted-foreground">
          Não sabe por onde começar? Normalmente começamos pelo indicador que mais dói.
        </p>
      </Reveal>
    </div>
  </section>
);

export default SolutionsSection;
