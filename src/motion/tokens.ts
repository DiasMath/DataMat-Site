/**
 * Tokens de movimento: o "ritmo" do site. As mesmas curvas existem no CSS
 * (src/styles/tokens.css: --ease-brand-out, --duration-*), para transições
 * CSS e animações GSAP combinarem.
 */
export const motion = {
  duration: {
    fast: 0.2,
    base: 0.65,
    slow: 0.9,
  },
  ease: {
    out: "power3.out",
    inOut: "power3.inOut",
    soft: "power2.out",
    bounce: "back.out(1.7)",
  },
  /** Deslocamento padrão das entradas, em px. */
  distance: 18,
  /** Onde, na tela, uma seção começa a entrar ("top 88%" = 88% da altura). */
  start: "top 88%",
} as const;

/**
 * Build de testes (npm run test) desliga as animações para os prints
 * saírem sempre iguais. Visitantes nunca recebem esse build.
 */
export const motionDisabled = import.meta.env.VITE_DISABLE_MOTION === "1";
