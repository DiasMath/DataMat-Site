import { DatamatSymbol } from "./DatamatSymbol";

/**
 * Símbolo gigante e quase invisível no fundo das aberturas de página: dá
 * profundidade. A seção precisa de `relative isolate overflow-hidden`.
 */
export function HeroSymbol({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <DatamatSymbol
      className={`pointer-events-none absolute -right-16 bottom-0 -z-10 w-[46vw] max-w-xl md:-right-8 ${tone === "dark" ? "text-white/[0.035]" : "text-graphite/[0.05]"}`}
    />
  );
}
