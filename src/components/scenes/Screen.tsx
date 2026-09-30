import type { ReactNode } from "react";

/**
 * Moldura de "tela" onde as cenas acontecem (16:10; 4:5 no celular) e, logo
 * abaixo, a legenda que narra cada passo da cena.
 */
export function Screen({
  label,
  captions,
  children,
}: {
  label: string;
  captions: string[];
  children: ReactNode;
}) {
  return (
    <div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-graphite shadow-2xl shadow-black/50 sm:aspect-[16/10]">
        <div className="flex h-9 items-center gap-1.5 border-b border-white/10 px-4">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="ml-3 text-xs tracking-widest text-text-muted uppercase">
            {label}
          </span>
        </div>
        <div className="absolute inset-x-0 top-9 bottom-0">{children}</div>
      </div>
      <div className="relative mt-5 h-14" aria-live="polite">
        {captions.map((c, i) => (
          <p
            key={c}
            className="cap absolute inset-x-0 top-0 flex items-baseline gap-3 text-lg text-cream md:text-xl"
          >
            <span className="shrink-0 text-sm font-semibold text-amber tabular-nums">
              {i + 1}/{captions.length}
            </span>
            {c}
          </p>
        ))}
      </div>
    </div>
  );
}
