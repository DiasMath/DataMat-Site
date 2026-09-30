import { Check } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

const sources = [
  { label: "vendas.xlsx", x: "8%", y: "14%", r: -8 },
  { label: "ERP", x: "30%", y: "58%", r: 6 },
  { label: "financeiro.xlsx", x: "6%", y: "70%", r: 4 },
  { label: "WhatsApp", x: "34%", y: "22%", r: -4 },
  { label: "estoque.csv", x: "14%", y: "42%", r: 9 },
];
const bars = [38, 52, 44, 61, 57, 72, 66, 84];
const kpis = [
  {
    label: "Faturamento",
    to: 248,
    fmt: (v: number) => `R$ ${Math.round(v)} mil`,
  },
  { label: "Margem", to: 31, fmt: (v: number) => `${Math.round(v)}%` },
  {
    label: "Pedidos",
    to: 1284,
    fmt: (v: number) => Math.round(v).toLocaleString("pt-BR"),
  },
];

/** Distância do centro de `el` até o centro de `target`. */
function toward(el: Element, target: Element, axis: "x" | "y") {
  const a = el.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  return axis === "x"
    ? b.left + b.width / 2 - (a.left + a.width / 2)
    : b.top + b.height / 2 - (a.top + a.height / 2);
}

/** Dados & BI: arquivos soltos entram no painel, que se monta sozinho. */
export function DadosScene(props: SceneProps) {
  const root = useScene((tl, q) => {
    tl.from(q(".src"), {
      autoAlpha: 0,
      scale: 0.6,
      stagger: 0.12,
      duration: 0.5,
      ease: "back.out(1.6)",
    })
      .to(
        q(".src"),
        {
          x: (_i: number, el: Element) => toward(el, q(".dash")[0], "x"),
          y: (_i: number, el: Element) => toward(el, q(".dash")[0], "y"),
          scale: 0.3,
          autoAlpha: 0,
          rotate: 0,
          stagger: 0.1,
          duration: 0.7,
          ease: "power2.in",
        },
        "+=0.6",
      )
      .from(q(".dash"), { autoAlpha: 0, scale: 0.92, duration: 0.6 }, "-=0.3")
      .from(
        q(".kpi"),
        { autoAlpha: 0, y: 12, stagger: 0.12, duration: 0.4 },
        "-=0.2",
      );
    q(".kpi-value").forEach((el, i) => {
      const counter = { v: 0 };
      tl.to(
        counter,
        {
          v: kpis[i].to,
          duration: 1.1,
          ease: "power2.out",
          onUpdate: () => (el.textContent = kpis[i].fmt(counter.v)),
        },
        i === 0 ? "-=0.1" : "<0.1",
      );
    });
    tl.from(
      q(".bar"),
      { scaleY: 0, transformOrigin: "bottom", stagger: 0.06, duration: 0.5 },
      "-=0.9",
    )
      .from(q(".stamp"), { autoAlpha: 0, y: -8, duration: 0.4 })
      .from(
        q(".linked"),
        { autoAlpha: 0, x: -10, stagger: 0.1, duration: 0.35 },
        "-=0.2",
      );
  }, props);

  return (
    <Screen label="Painel de gestão">
      <div ref={root} className="relative h-full">
        {sources.map((s) => (
          <span
            key={s.label}
            className="src absolute rounded-md border border-white/15 bg-bg px-3 py-1.5 text-xs text-cream"
            style={{ left: s.x, top: s.y, rotate: `${s.r}deg` }}
          >
            {s.label}
          </span>
        ))}
        <div className="absolute top-[6%] left-[5%] flex flex-wrap gap-2 sm:top-[12%] sm:max-w-[36%] sm:flex-col">
          <p className="linked w-full text-[10px] tracking-widest text-text-muted">
            FONTES CONECTADAS
          </p>
          {["ERP", "Planilhas", "WhatsApp"].map((l) => (
            <span
              key={l}
              className="linked flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 text-xs text-cream"
            >
              <Check size={12} className="text-amber" aria-hidden="true" /> {l}
            </span>
          ))}
        </div>
        <div className="dash absolute inset-x-[5%] top-[38%] bottom-[5%] sm:inset-y-[8%] sm:right-[5%] sm:left-[46%] flex flex-col gap-3 rounded-xl bg-cream p-4 text-graphite">
          <div className="flex items-center justify-between">
            <strong className="text-sm">Visão do mês</strong>
            <span className="stamp rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold">
              atualizado hoje, 07:00
            </span>
          </div>
          <div className="grid grid-cols-3 gap-2">
            {kpis.map((k) => (
              <div key={k.label} className="kpi rounded-lg bg-white p-2">
                <p className="text-[10px] text-graphite/60">{k.label}</p>
                <p className="kpi-value text-sm font-bold">{k.fmt(k.to)}</p>
              </div>
            ))}
          </div>
          <div className="flex flex-1 items-end gap-1.5 rounded-lg bg-white p-2">
            {bars.map((h, i) => (
              <span
                key={i}
                className="bar flex-1 rounded-sm bg-amber"
                style={{ height: `${h}%` }}
              />
            ))}
          </div>
        </div>
      </div>
    </Screen>
  );
}
