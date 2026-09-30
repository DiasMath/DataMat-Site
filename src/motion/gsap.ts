/**
 * Ponto único do GSAP no site: registra os plugins uma vez e aplica os
 * padrões de movimento. Importe o gsap e os plugins SEMPRE daqui.
 * (Desde 2025 todos os plugins do GSAP são gratuitos.)
 */
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrollSmoother } from "gsap/ScrollSmoother";
import { ScrollToPlugin } from "gsap/ScrollToPlugin";
import { SplitText } from "gsap/SplitText";
import { useGSAP } from "@gsap/react";
import { motion, motionDisabled } from "./tokens";

gsap.registerPlugin(
  useGSAP,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
);
gsap.defaults({ duration: motion.duration.base, ease: motion.ease.out });

// Build de testes: toda animação GSAP termina na hora (prints estáveis).
if (motionDisabled) gsap.globalTimeline.timeScale(1000);

export {
  gsap,
  ScrollTrigger,
  ScrollSmoother,
  ScrollToPlugin,
  SplitText,
  useGSAP,
};
