import type { ReactNode } from "react";

/** Moldura de "tela" onde as cenas acontecem (16:10; 4:5 no celular). */
export function Screen({
  label,
  children,
}: {
  label: string;
  children: ReactNode;
}) {
  return (
    <div className="relative aspect-[4/5] w-full sm:aspect-[16/10] overflow-hidden rounded-2xl border border-white/10 bg-graphite shadow-2xl shadow-black/40">
      <div className="flex h-8 items-center gap-1.5 border-b border-white/10 px-4">
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="size-2 rounded-full bg-white/20" />
        <span className="ml-3 text-xs tracking-widest text-text-muted uppercase">
          {label}
        </span>
      </div>
      <div className="absolute inset-x-0 top-8 bottom-0">{children}</div>
    </div>
  );
}
