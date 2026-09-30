import { AlertTriangle, Check, Clock } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

const sources = [
  { label: "vendas.xlsx", x: "8%", y: "16%", r: -8 },
  { label: "ERP", x: "30%", y: "58%", r: 6 },
  { label: "financeiro.xlsx", x: "6%", y: "72%", r: 4 },
  { label: "WhatsApp", x: "34%", y: "26%", r: -4 },
  { label: "estoque.csv", x: "14%", y: "44%", r: 9 },
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
/** Duração da cena em segundos (aparece no relógio da aba). */
export const LENGTH = 20;

const captions = [
  "Hoje, a informação está espalhada em vários arquivos e sistemas.",
  "A DATAMAT conecta tudo automaticamente.",
  "O painel se monta sozinho e se atualiza todo dia.",
  "Você bate o olho e vê onde agir.",
];

function toward(el: Element, target: Element, axis: "x" | "y") {
  const a = el.getBoundingClientRect();
  const b = target.getBoundingClientRect();
  return axis === "x"
    ? b.left + b.width / 2 - (a.left + a.width / 2)
    : b.top + b.height / 2 - (a.top + a.height / 2);
}

/** Dados & BI: arquivos soltos entram no painel, que se monta e aponta um alerta. */
export function DadosScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      const dash = q(".dash")[0];
      caption(0, 0);
      tl.from(
        q(".src"),
        {
          autoAlpha: 0,
          scale: 0.6,
          stagger: 0.35,
          duration: 0.6,
          ease: "back.out(1.6)",
        },
        0.3,
      )
        .from(q(".late"), { autoAlpha: 0, y: 10, duration: 0.5 }, "+=0.3")
        .to(
          q(".src"),
          {
            rotate: "+=6",
            yoyo: true,
            repeat: 3,
            duration: 0.25,
            stagger: 0.05,
          },
          "+=0.2",
        );
      caption(1, "+=0.8");
      tl.to(q(".late"), { autoAlpha: 0, duration: 0.3 }, "<")
        .to(
          q(".src"),
          {
            x: (_i: number, el: Element) => toward(el, dash, "x"),
            y: (_i: number, el: Element) => toward(el, dash, "y"),
            scale: 0.3,
            autoAlpha: 0,
            rotate: 0,
            stagger: 0.25,
            duration: 0.9,
            ease: "power2.in",
          },
          "+=0.3",
        )
        .from(
          q(".linked"),
          { autoAlpha: 0, x: -10, stagger: 0.25, duration: 0.4 },
          "-=0.6",
        );
      caption(2, "+=0.6");
      tl.from(dash, { autoAlpha: 0, scale: 0.94, duration: 0.8 }, "<").from(
        q(".kpi"),
        { autoAlpha: 0, y: 12, stagger: 0.25, duration: 0.5 },
      );
      q(".kpi-value").forEach((el, i) => {
        const counter = { v: 0 };
        tl.to(
          counter,
          {
            v: kpis[i].to,
            duration: 1.6,
            ease: "power2.out",
            onUpdate: () => (el.textContent = kpis[i].fmt(counter.v)),
          },
          i === 0 ? "-=0.4" : "<0.2",
        );
      });
      tl.from(
        q(".bar"),
        { scaleY: 0, transformOrigin: "bottom", stagger: 0.12, duration: 0.6 },
        "-=1",
      ).from(q(".stamp"), { autoAlpha: 0, y: -8, duration: 0.5 });
      caption(3, "+=1");
      tl.to(
        q(".kpi")[1],
        { boxShadow: "0 0 0 2px var(--color-amber)", duration: 0.4 },
        "<",
      ).from(
        q(".alert"),
        { autoAlpha: 0, y: 12, duration: 0.6, ease: "back.out(1.4)" },
        "+=0.3",
      );
    },
    props,
    LENGTH,
  );

  return (
    <div ref={root}>
      <Screen label="Painel de gestão" captions={captions}>
        <div className="relative h-full">
          {sources.map((s) => (
            <span
              key={s.label}
              className="src absolute rounded-md border border-white/15 bg-bg px-3 py-1.5 text-xs text-cream md:text-sm"
              style={{ left: s.x, top: s.y, rotate: `${s.r}deg` }}
            >
              {s.label}
            </span>
          ))}
          <span className="late absolute bottom-[8%] left-[5%] flex items-center gap-2 rounded-md bg-white/10 px-3 py-1.5 text-xs text-cream md:text-sm">
            <Clock size={14} className="text-amber" aria-hidden="true" />{" "}
            Fechamento do mês: 5 dias de trabalho
          </span>

          <div className="absolute top-[6%] left-[5%] flex flex-wrap gap-2 sm:top-[12%] sm:max-w-[36%] sm:flex-col">
            <p className="linked w-full text-[10px] tracking-widest text-text-muted md:text-xs">
              FONTES CONECTADAS
            </p>
            {["ERP", "Planilhas", "WhatsApp"].map((l) => (
              <span
                key={l}
                className="linked flex items-center gap-1.5 rounded-md bg-white/5 px-2.5 py-1.5 text-xs text-cream md:text-sm"
              >
                <Check size={14} className="text-amber" aria-hidden="true" />{" "}
                {l}
              </span>
            ))}
          </div>

          <div className="dash absolute inset-x-[5%] top-[38%] bottom-[5%] flex flex-col gap-3 rounded-xl bg-cream p-4 text-graphite sm:inset-y-[7%] sm:right-[4%] sm:left-[44%] md:p-5">
            <div className="flex items-center justify-between">
              <strong className="text-sm md:text-base">Visão do mês</strong>
              <span className="stamp rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold md:text-xs">
                atualizado hoje, 07:00
              </span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              {kpis.map((k) => (
                <div
                  key={k.label}
                  className="kpi rounded-lg bg-white p-2 md:p-3"
                >
                  <p className="text-[10px] text-graphite/60 md:text-xs">
                    {k.label}
                  </p>
                  <p className="kpi-value text-sm font-bold md:text-lg">
                    {k.fmt(k.to)}
                  </p>
                </div>
              ))}
            </div>
            <div className="relative flex flex-1 items-end gap-1.5 rounded-lg bg-white p-2 md:p-3">
              {bars.map((h, i) => (
                <span
                  key={i}
                  className="bar flex-1 rounded-sm bg-amber"
                  style={{ height: `${h}%` }}
                />
              ))}
              <div className="alert absolute top-2 right-2 left-2 flex items-center gap-2 rounded-md bg-graphite px-3 py-2 text-xs text-cream md:text-sm">
                <AlertTriangle
                  size={15}
                  className="shrink-0 text-amber"
                  aria-hidden="true"
                />
                Margem caiu 3 pontos na região Sul
              </div>
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
}
