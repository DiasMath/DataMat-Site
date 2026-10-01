import type { ReactNode } from "react";

/**
 * Moldura de "tela" onde as cenas acontecem (16:10; 4:5 no celular).
 * Em cima, a legenda que narra cada passo (o olho lê e desce para a cena);
 * na borda de cima da tela, uma barra âmbar mostra o andamento da cena.
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
      <div className="relative mb-4 h-14 md:h-16" aria-live="polite">
        {captions.map((c, i) => (
          <p
            key={c}
            className="cap absolute inset-x-0 bottom-0 flex items-baseline gap-3 text-lg leading-snug text-cream md:text-xl"
          >
            <span className="shrink-0 text-sm font-semibold text-amber tabular-nums">
              {i + 1}/{captions.length}
            </span>
            {c}
          </p>
        ))}
      </div>
      <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl border border-white/10 bg-graphite shadow-2xl shadow-black/50 sm:aspect-[16/10]">
        <div className="relative flex h-9 items-center gap-1.5 border-b border-white/10 px-4">
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="size-2.5 rounded-full bg-white/20" />
          <span className="ml-3 text-xs tracking-widest text-text-muted uppercase">
            {label}
          </span>
          <span
            aria-hidden="true"
            className="scene-progress absolute inset-x-0 -bottom-px h-0.5 origin-left scale-x-0 bg-amber"
          />
        </div>
        <div className="absolute inset-x-0 top-9 bottom-0">{children}</div>
      </div>
    </div>
  );
}
