import type { ReactNode } from "react";
import Reveal from "./Reveal";

/**
 * SectionHeading — kicker + título em Syne.
 * A textura de grid de pontos aparece SOMENTE aqui (headers de seção)
 * e atrás dos números da seção de resultados. É a assinatura gráfica da marca.
 */
const SectionHeading = ({
  kicker,
  title,
  description,
  align = "left",
  texture = true,
}: {
  kicker: string;
  title: ReactNode;
  description?: string;
  align?: "left" | "center";
  texture?: boolean;
}) => (
  <Reveal className={`relative ${align === "center" ? "text-center mx-auto max-w-2xl" : "max-w-3xl"}`}>
    {texture && (
      <span
        aria-hidden
        className={`pointer-events-none absolute -top-8 h-24 w-40 texture-dots opacity-60 ${
          align === "center" ? "left-1/2 -translate-x-1/2" : "-left-4"
        }`}
      />
    )}
    <p className="t-kicker relative">{kicker}</p>
    <h2 className="t-section relative mt-4 text-foreground">{title}</h2>
    {description && (
      <p className="relative mt-5 text-base md:text-lg text-muted-foreground leading-relaxed">{description}</p>
    )}
  </Reveal>
);

export default SectionHeading;
