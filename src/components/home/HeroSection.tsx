import { useEffect, useState } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "framer-motion";
import { ArrowRight } from "lucide-react";
import heroPoster from "@/assets/hero-poster.jpg";
import CTAButton from "@/components/ui-kit/CTAButton";
import { WHATSAPP_LINK } from "@/lib/site";

/**
 * Hero — parallax e brilho são permitidos APENAS aqui e no CTA final.
 * TODO CONTEÚDO: substituir /hero.mp4 pelo vídeo final da Datamat
 * (loop curto, ~8s, comprimido, sem áudio) e hero-poster.jpg pelo frame real.
 */
const HeroSection = () => {
  const reduce = useReducedMotion();
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 120]);
  const [allowVideo, setAllowVideo] = useState(false);

  useEffect(() => {
    // Vídeo apenas em desktop e conexões rápidas; mobile/lento usa o poster estático.
    const conn = (navigator as Navigator & { connection?: { saveData?: boolean; effectiveType?: string } }).connection;
    const slow = conn?.saveData || (conn?.effectiveType && !/4g/.test(conn.effectiveType));
    const desktop = window.matchMedia("(min-width: 1024px)").matches;
    setAllowVideo(Boolean(desktop && !slow && !reduce));
  }, [reduce]);

  return (
    <section className="relative flex min-h-[92vh] items-end overflow-hidden pb-20 pt-36 md:min-h-screen md:pb-28">
      <motion.div style={reduce ? undefined : { y }} className="absolute inset-0 -z-10 scale-110">
        {allowVideo ? (
          <video
            className="h-full w-full object-cover"
            poster={heroPoster}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          >
            {/* TODO CONTEÚDO: trocar pelo vídeo institucional final (mp4 comprimido, sem áudio) */}
            <source src="/hero.mp4" type="video/mp4" />
          </video>
        ) : (
          <img
            src={heroPoster}
            alt="Painel de dados da Datamat exibindo indicadores de receita e margem"
            width={1920}
            height={1088}
            className="h-full w-full object-cover"
          />
        )}
        <div className="absolute inset-0 bg-gradient-veil" />
        <div className="absolute inset-0 texture-lines opacity-40" />
      </motion.div>

      <div className="mx-auto w-full max-w-7xl px-6 md:px-12 lg:px-20">
        <motion.div
          initial={reduce ? false : { opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="max-w-4xl"
        >
          <p className="t-kicker">Business Intelligence • Dados • IA</p>

          {/* Headline assimétrica: segunda linha recuada */}
          <h1 className="t-hero mt-6 text-foreground">
            <span className="block">Menos planilha.</span>
            <span className="mt-1 block pl-[8vw] text-primary md:pl-[14vw]">Mais decisão.</span>
          </h1>

          <p className="mt-8 max-w-xl text-lg text-foreground/75 md:ml-1">
            Transformamos o dado bruto da sua operação em decisões que cabem numa tela.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <CTAButton href={WHATSAPP_LINK} external>
              Fale com um especialista <ArrowRight size={18} className="ml-2" />
            </CTAButton>
            <CTAButton href="#solucoes" variant="ghost">
              Ver soluções
            </CTAButton>
          </div>
        </motion.div>
      </div>

      {/* brilho âmbar — exclusivo do hero */}
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 right-[-10%] h-[420px] w-[420px] rounded-full blur-[140px]"
        style={{ background: "hsl(var(--primary) / 0.22)" }}
      />
    </section>
  );
};

export default HeroSection;
