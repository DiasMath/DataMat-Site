import { cn } from "@/lib/utils";
import type { ReactNode } from "react";

type Props = {
  href: string;
  children: ReactNode;
  variant?: "primary" | "ghost";
  external?: boolean;
  className?: string;
};

const CTAButton = ({ href, children, variant = "primary", external, className }: Props) => (
  <a
    href={href}
    {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
    className={cn(
      "inline-flex items-center justify-center rounded-xl px-7 py-3.5 font-sans text-base font-semibold transition-[transform,background-color,border-color,color] duration-300 hover:-translate-y-0.5",
      variant === "primary"
        ? "bg-primary text-primary-foreground hover:bg-secondary"
        : "border border-border text-foreground hover:border-primary hover:text-primary",
      className,
    )}
  >
    {children}
  </a>
);

export default CTAButton;
