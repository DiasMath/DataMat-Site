import { PainSolutions } from "../components/home/PainSolutions";
import { CasesTeaser } from "../components/home/CasesTeaser";
import { CTA } from "../components/FinalCta";

/**
 * Demonstrações: as cenas de cada solução (dados, IA, marca e sites) e o
 * case do DRE, numa página própria.
 */
export function DemosPage() {
  return (
    <>
      <section className="bg-bg-hero pt-16 pb-6 md:pt-24">
        <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber">
            <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
            DEMONSTRAÇÕES
          </p>
          <h1
            className="mt-5 max-w-4xl text-5xl leading-[1.02] font-semibold tracking-tight text-cream md:text-7xl"
            data-reveal="heading"
          >
            Veja na prática o que muda na sua empresa.
          </h1>
          <p className="mt-6 max-w-2xl text-xl text-text-muted">
            Escolha um desafio e acompanhe, passo a passo, como a DATAMAT
            resolve. Os cenários e os números são ilustrativos.
          </p>
        </div>
      </section>
      <PainSolutions id="cenas" />
      <CasesTeaser />
      <CTA title="Quer ver isso com os números da sua empresa?" />
    </>
  );
}
