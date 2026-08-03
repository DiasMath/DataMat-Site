import SectionHeading from "@/components/ui-kit/SectionHeading";
import TestimonialCard, { type Testimonial } from "@/components/ui-kit/TestimonialCard";
import Reveal from "@/components/ui-kit/Reveal";

/* TODO CONTEÚDO: depoimentos reais. Fotos: usar FOTO REAL DO CLIENTE, não banco de imagens. */
const testimonials: Testimonial[] = [
  {
    quote:
      "O fechamento que levava dias virou um painel que abre de manhã. A discussão do time mudou de 'o número está certo?' para 'o que fazemos com ele?'.",
    name: "Nome do Cliente",
    role: "CFO • Loja Juntos.com",
    metric: "100%",
    metricLabel: "processo automatizado",
  },
  {
    quote:
      "A sugestão de compra deixou de ser palpite. Hoje o comprador vê margem, giro e estoque na mesma tela antes de decidir.",
    name: "Nome do Cliente",
    role: "Head de Operações",
    metric: "1-click",
    metricLabel: "envio ao fornecedor",
  },
  {
    quote:
      "Eles entenderam nosso ERP melhor do que nós. E entregaram sem transformar o projeto em um ano de consultoria.",
    name: "Nome do Cliente",
    role: "Diretor Comercial",
    metric: "15 dias",
    metricLabel: "primeiro painel",
  },
];

const TestimonialsSection = () => (
  <section id="depoimentos" className="section-padding bg-surface">
    <div className="mx-auto max-w-7xl">
      <SectionHeading kicker="Depoimentos" title="Quem já trocou planilha por decisão." />
    </div>

    <Reveal className="mt-14">
      <div className="no-scrollbar flex snap-x snap-mandatory gap-6 overflow-x-auto px-6 pb-4 md:px-12 lg:px-20">
        {testimonials.map((t, i) => (
          <TestimonialCard key={i} t={t} />
        ))}
      </div>
    </Reveal>
  </section>
);

export default TestimonialsSection;
