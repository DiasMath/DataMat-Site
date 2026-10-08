import { DatamatSymbol } from "./DatamatSymbol";

/**
 * Símbolo DATAMAT grande e desfocado no fundo do topo das páginas
 * (dá profundidade). A seção precisa de `relative isolate overflow-hidden`.
 */
export function HeroSymbol({ tone = "dark" }: { tone?: "dark" | "light" }) {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-y-0 right-0 -z-10 flex w-full items-center justify-end"
      data-reveal="symbol"
    >
      <DatamatSymbol
        className={`h-[118%] max-h-[64rem] w-auto max-w-none translate-x-[14%] blur-[1.5px] md:translate-x-[8%] ${tone === "dark" ? "text-white/[0.05]" : "text-graphite/[0.06]"}`}
      />
    </div>
  );
}
