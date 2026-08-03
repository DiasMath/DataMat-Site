import LogoMarquee from "@/components/ui-kit/LogoMarquee";
import Reveal from "@/components/ui-kit/Reveal";

/** Prova social — sinal de credibilidade, tratada com peso (não decorativa). */
const SocialProofSection = () => (
  <section id="clientes" className="border-y border-border bg-surface py-16 md:py-20">
    <div className="mx-auto max-w-7xl px-6 md:px-12 lg:px-20">
      <Reveal>
        <p className="mb-10 font-display text-xl font-bold text-foreground md:text-2xl">
          Empresas que confiam seus dados à Datamat
        </p>
      </Reveal>
    </div>
    <LogoMarquee />
  </section>
);

export default SocialProofSection;
