import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

/**
 * BentoCard — bloco base do bento assimétrico.
 * Hover discreto (elevação leve + borda âmbar), sem glow.
 */
const BentoCard = ({
  children,
  className,
  as: Tag = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "article";
}) => (
  <Tag
    className={cn(
      "surface-card relative overflow-hidden p-7 md:p-9 hover-raise",
      className,
    )}
  >
    {children}
  </Tag>
);

export default BentoCard;
