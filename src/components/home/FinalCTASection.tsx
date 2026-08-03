import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import ctaBg from "@/assets/cta-bg.jpg";
import CTAButton from "@/components/ui-kit/CTAButton";
import { WHATSAPP_LINK } from "@/lib/site";

/** CTA final — único outro lugar com parallax e brilho âmbar. */
const FinalCTASection = () => {
  const ref = useRef<HTMLElement>(null);
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [-60, 60]);

  return (
    <section id="contato" ref={ref} className="relative isolate overflow-hidden px-6 py-32 md:px-12 md:py-40 lg:px-20">
      {/* TODO CONTEÚDO: trocar por mídia final da Datamat (diferente da mídia do hero) */}
      <motion.img
        src={ctaBg}
        alt=""
        aria-hidden
        loading="lazy"
        width={1920}
        height={1088}
        style={reduce ? undefined : { y }}
        className="absolute inset-0 -z-10 h-[130%] w-full object-cover opacity-70"
      />
      <div aria-hidden className="absolute inset-0 -z-10 bg-background/70" />
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/4 top-1/2 -z-10 h-[380px] w-[380px] -translate-y-1/2 rounded-full blur-[150px]"
        style={{ background: "hsl(var(--primary) / 0.25)" }}
      />

      <div className="mx-auto max-w-4xl">
        <p className="t-kicker">Próximo passo</p>
        <h2 className="t-hero mt-6">
          <span className="block">Vamos olhar</span>
          <span className="block pl-[6vw] text-primary">seus números?</span>
        </h2>
        <p className="mt-8 max-w-lg text-lg text-foreground/75">
          Uma conversa de 30 minutos costuma bastar para mapear o primeiro painel que faz diferença.
        </p>
        <div className="mt-10 flex flex-col gap-4 sm:flex-row">
          <CTAButton href={WHATSAPP_LINK} external>
            Agendar conversa <ArrowRight size={18} className="ml-2" />
          </CTAButton>
          <CTAButton href="/cases" variant="ghost">
            Ver cases
          </CTAButton>
        </div>
      </div>
    </section>
  );
};

export default FinalCTASection;
