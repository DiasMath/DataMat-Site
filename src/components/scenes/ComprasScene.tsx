import { ArrowRight, FileSpreadsheet, HelpCircle, Truck } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

/** Duração da cena em segundos. */
export const LENGTH = 18;
const factors = ["Vendas", "Margem", "Estoque", "Prioridade", "Melhor produto"];
const rows = [
  { p: "Cabo CAT6 305 m", m: "32%", e: "8 un.", pr: "Alta" },
  { p: "Disjuntor 32A", m: "41%", e: "120 un.", pr: "Baixa" },
  { p: "Rack 12U", m: "27%", e: "2 un.", pr: "Alta" },
];
const captions = [
  "Antes: a compra olhava só as vendas dos últimos 12 meses.",
  "Agora: margem, estoque e prioridade entram na mesma conta.",
  "A tela sugere o que comprar primeiro, com os números ao lado.",
  "A lista sai pronta para o fornecedor em um clique.",
];

/** Case compras: de um critério para vários, e a lista direto ao fornecedor. */
export function ComprasScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      caption(0, 0);
      tl.from(
        q(".old > *"),
        { autoAlpha: 0, x: -10, stagger: 0.5, duration: 0.5 },
        0.3,
      ).to(
        q(".doubt"),
        { rotate: 12, yoyo: true, repeat: 3, duration: 0.2 },
        "+=0.3",
      );
      caption(1, "+=1");
      tl.to(q(".old"), { autoAlpha: 0.2, duration: 0.5 }, "<").from(
        q(".factor"),
        { autoAlpha: 0, y: 10, stagger: 0.35, duration: 0.45 },
        "+=0.2",
      );
      caption(2, "+=0.8");
      tl.from(q(".sheet"), { autoAlpha: 0, y: 12, duration: 0.5 }, "<")
        .from(q(".row"), {
          autoAlpha: 0,
          x: -12,
          stagger: 0.45,
          duration: 0.45,
        })
        .to(
          q(".row-hot"),
          { backgroundColor: "rgba(255,176,63,0.22)", duration: 0.4 },
          "+=0.3",
        );
      caption(3, "+=1");
      tl.to(
        q(".excel"),
        { scale: 0.92, duration: 0.12, yoyo: true, repeat: 1 },
        "<0.3",
      ).from(q(".sent"), { autoAlpha: 0, x: -16, duration: 0.6 }, "+=0.3");
    },
    props,
    LENGTH,
  );

  return (
    <div ref={root}>
      <Screen label="Sugestão de compras" captions={captions}>
        <div className="flex h-full flex-col gap-4 p-5 md:p-7">
          <div className="old flex flex-wrap items-center gap-2 text-xs md:text-sm">
            <span className="rounded-md border border-white/15 px-2.5 py-1.5 text-text-muted">
              Vendas de 12 meses
            </span>
            <ArrowRight
              size={14}
              className="text-text-muted"
              aria-hidden="true"
            />
            <span className="flex items-center gap-1.5 rounded-md border border-white/15 px-2.5 py-1.5 text-cream">
              Compra{" "}
              <HelpCircle
                size={14}
                className="doubt text-amber"
                aria-hidden="true"
              />
            </span>
          </div>
          <div className="flex flex-wrap gap-2">
            {factors.map((f) => (
              <span
                key={f}
                className="factor rounded-md border border-amber/60 bg-amber/10 px-2.5 py-1.5 text-xs text-cream md:text-sm"
              >
                {f}
              </span>
            ))}
          </div>
          <div className="sheet flex-1 rounded-xl bg-cream p-3 text-graphite md:p-4">
            <div className="grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 border-b border-graphite/15 pb-2 text-[10px] font-semibold tracking-wide text-graphite/60 md:text-xs">
              <span>PRODUTO</span>
              <span>MARGEM</span>
              <span>ESTOQUE</span>
              <span>PRIORIDADE</span>
            </div>
            {rows.map((r) => (
              <div
                key={r.p}
                className={`row grid grid-cols-[2fr_1fr_1fr_1fr] gap-2 rounded-md px-1 py-2 text-xs md:text-sm ${r.pr === "Alta" ? "row-hot" : ""}`}
              >
                <span className="font-semibold">{r.p}</span>
                <span>{r.m}</span>
                <span>{r.e}</span>
                <span>{r.pr}</span>
              </div>
            ))}
            <div className="mt-2 flex flex-wrap items-center gap-3">
              <span className="excel flex items-center gap-1.5 rounded-md bg-graphite px-3 py-1.5 text-xs font-semibold text-cream md:text-sm">
                <FileSpreadsheet
                  size={14}
                  className="text-amber"
                  aria-hidden="true"
                />{" "}
                Exportar Excel
              </span>
              <span className="sent flex items-center gap-1.5 text-xs font-semibold md:text-sm">
                <Truck size={15} aria-hidden="true" /> Enviado ao fornecedor
              </span>
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
}
