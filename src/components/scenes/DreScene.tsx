import { ArrowRight, CalendarClock, Check, Zap } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

/** Duração da cena em segundos (inclui ~6 s parado no final para análise). */
export const LENGTH = 30;

const months = ["Jul", "Ago", "Set"];
/** Linhas do DRE e valores fictícios (R$ mil). Out: parcial até o dia 12 e 14. */
const rows: {
  label: string;
  values: number[];
  d12: number;
  d14: number;
  total?: boolean;
}[] = [
  { label: "Receita bruta", values: [412, 398, 431], d12: 168, d14: 196 },
  { label: "(−) Deduções", values: [-49, -47, -52], d12: -20, d14: -23 },
  {
    label: "Receita líquida",
    values: [363, 351, 379],
    d12: 148,
    d14: 173,
    total: true,
  },
  { label: "(−) CMV", values: [-228, -224, -236], d12: -92, d14: -107 },
  {
    label: "Lucro bruto",
    values: [135, 127, 143],
    d12: 56,
    d14: 66,
    total: true,
  },
  { label: "(−) Despesas", values: [-96, -94, -99], d12: -38, d14: -44 },
  { label: "Resultado", values: [39, 33, 44], d12: 18, d14: 22, total: true },
];
const fmt = (v: number) => (v < 0 ? `(${Math.abs(v)})` : String(v));

const oldFlow = ["Exporta do ERP", "Categoriza no GPT", "Monta a planilha"];

const captions = [
  "Antes: todo mês, o DRE era montado à mão, em várias etapas.",
  "O resultado de outubro só existia dias depois de outubro acabar.",
  "Com a DATAMAT, o ERP alimenta o DRE sozinho, todos os dias.",
  "Outubro aparece enquanto acontece: o DRE do mês já existe no dia 12.",
  "Você acompanha o mês todo, sem esperar o fechamento.",
];

/** Case DRE: fluxo e visão antigos (fim do mês) x DATAMAT (diária), em tabela. */
export function DreScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      const outCells = q(".out-cell");
      const setOut = (key: "d12" | "d14") =>
        outCells.forEach((c, i) => {
          c.textContent = fmt(rows[i][key]);
        });

      // Outubro começa vazio.
      tl.call(
        () => {
          outCells.forEach((c) => (c.textContent = "—"));
          q(".out-head-label").forEach((e) => (e.textContent = "Out"));
        },
        [],
        0,
      );

      // 1. Fluxo antigo, etapa por etapa.
      caption(0, 0);
      tl.from(
        q(".flow-old > :not(.auto)"),
        { autoAlpha: 0, x: -10, stagger: 0.55, duration: 0.5 },
        0.4,
      )
        .from(q(".dre-table"), { autoAlpha: 0, y: 12, duration: 0.6 }, "-=0.2")
        .from(q(".past-col"), { autoAlpha: 0, stagger: 0.25, duration: 0.4 });

      // 2. Outubro vazio até depois do fechamento.
      caption(1, "+=1.2");
      tl.to(q(".out-head"), { color: "var(--color-amber)", duration: 0.3 }, "<")
        .to(
          q(".out-cell"),
          {
            backgroundColor: "rgba(36,35,38,0.08)",
            stagger: 0.06,
            duration: 0.25,
          },
          "<",
        )
        .from(q(".wait"), { autoAlpha: 0, y: 8, duration: 0.5 }, "+=0.2");

      // 3. Fluxo novo: as etapas manuais somem, a DATAMAT entra no meio.
      caption(2, "+=2.4");
      tl.to(q(".wait"), { autoAlpha: 0, duration: 0.3 }, "<")
        .to(
          q(".flow-old .manual"),
          {
            autoAlpha: 0,
            width: 0,
            paddingLeft: 0,
            paddingRight: 0,
            marginLeft: 0,
            duration: 0.6,
            stagger: 0.1,
          },
          "<0.2",
        )
        .from(
          q(".auto"),
          { autoAlpha: 0, scale: 0.8, duration: 0.6, ease: "back.out(1.6)" },
          "-=0.2",
        )
        .to(q(".out-head"), { color: "var(--color-graphite)", duration: 0.3 });

      // 4. Outubro se preenche no dia 12 e é atualizado no dia 14.
      caption(3, "+=1");
      tl.call(() => setOut("d12"), [], "<")
        .call(
          () =>
            q(".out-head-label").forEach(
              (e) => (e.textContent = "Out · até dia 12"),
            ),
          [],
          "<",
        )
        .fromTo(
          q(".out-cell"),
          { autoAlpha: 0 },
          {
            autoAlpha: 1,
            stagger: 0.12,
            duration: 0.35,
            immediateRender: false,
          },
          "<",
        )
        .call(
          () =>
            q(".stamp-day").forEach((e) => (e.textContent = "12/10, 07:00")),
          [],
          "<",
        )
        .from(q(".stamp"), { autoAlpha: 0, y: -6, duration: 0.4 }, "-=0.3")
        .to(
          q(".out-col"),
          { backgroundColor: "rgba(255,176,63,0.14)", duration: 0.4 },
          "+=1.6",
        )
        .call(
          () =>
            q(".out-head-label").forEach(
              (e) => (e.textContent = "Out · até dia 14"),
            ),
          [],
          "+=0",
        )
        .call(
          () =>
            q(".stamp-day").forEach((e) => (e.textContent = "14/10, 07:00")),
          [],
          "<",
        )
        .call(() => setOut("d14"), [], "<")
        .fromTo(
          q(".out-cell"),
          { color: "var(--color-amber)" },
          {
            color: "var(--color-graphite)",
            stagger: 0.05,
            duration: 0.6,
            immediateRender: false,
          },
          "<",
        );

      // 5. Conclusão e tempo para olhar a tela.
      caption(4, "+=1.4");
      tl.to(
        q(".result-row"),
        { boxShadow: "inset 0 0 0 2px var(--color-amber)", duration: 0.5 },
        "<",
      );
    },
    props,
    LENGTH,
  );

  return (
    <div ref={root}>
      <Screen
        label="DRE · Loja Juntos.com (valores ilustrativos)"
        captions={captions}
      >
        <div className="flex h-full flex-col gap-3 p-3 md:gap-4 md:p-5">
          {/* Fluxo de trabalho */}
          <div className="flex flex-wrap items-center gap-1.5 text-[10px] md:text-xs">
            <div className="flow-old flex flex-wrap items-center gap-1.5">
              <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-cream">
                ERP
              </span>
              {oldFlow.map((step) => (
                <span
                  key={step}
                  className="manual flex items-center gap-1.5 overflow-hidden whitespace-nowrap"
                >
                  <ArrowRight
                    size={12}
                    className="shrink-0 text-text-muted"
                    aria-hidden="true"
                  />
                  <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-text-muted">
                    {step}
                  </span>
                </span>
              ))}
              <span className="auto flex items-center gap-1.5 whitespace-nowrap">
                <ArrowRight
                  size={12}
                  className="text-amber"
                  aria-hidden="true"
                />
                <span className="flex items-center gap-1 rounded-md bg-amber px-2 py-1 font-semibold text-graphite">
                  <Zap size={12} aria-hidden="true" /> DATAMAT · automático
                </span>
              </span>
              <ArrowRight
                size={12}
                className="text-text-muted"
                aria-hidden="true"
              />
              <span className="rounded-md border border-white/15 bg-white/5 px-2 py-1 text-cream">
                DRE
              </span>
            </div>
            <span className="ml-auto grid">
              <span className="wait col-start-1 row-start-1 flex items-center gap-1 justify-self-end rounded-md bg-white/10 px-2 py-1 text-cream">
                <CalendarClock
                  size={12}
                  className="text-amber"
                  aria-hidden="true"
                />{" "}
                Out só no dia 5 de novembro
              </span>
              <span className="stamp col-start-1 row-start-1 flex items-center gap-1 justify-self-end rounded-full bg-amber px-2 py-0.5 font-semibold text-graphite">
                <Check size={12} aria-hidden="true" /> atualizado{" "}
                <span className="stamp-day">14/10, 07:00</span>
              </span>
            </span>
          </div>

          {/* DRE: linhas x meses */}
          <div className="dre-table flex-1 overflow-hidden rounded-lg bg-cream text-graphite">
            <div className="grid h-full grid-cols-[1.7fr_repeat(4,1fr)] text-[10px] md:text-xs">
              <span className="border-b border-graphite/15 px-2 py-1.5 font-semibold text-graphite/60">
                DRE (R$ mil)
              </span>
              {months.map((m) => (
                <span
                  key={m}
                  className="past-col border-b border-graphite/15 px-2 py-1.5 text-right font-semibold text-graphite/60"
                >
                  {m}
                </span>
              ))}
              <span className="out-head out-col border-b border-graphite/15 px-2 py-1.5 text-right font-semibold text-graphite">
                <span className="out-head-label">Out · até dia 14</span>
              </span>
              {rows.map((r) => (
                <div
                  key={r.label}
                  className={`col-span-5 grid grid-cols-subgrid ${r.label === "Resultado" ? "result-row rounded-sm" : ""} ${r.total ? "font-semibold" : ""}`}
                >
                  <span className="px-2 py-1">{r.label}</span>
                  {r.values.map((v, k) => (
                    <span
                      key={k}
                      className="past-col px-2 py-1 text-right tabular-nums"
                    >
                      {fmt(v)}
                    </span>
                  ))}
                  <span className="out-col px-2 py-1 text-right tabular-nums">
                    <span className="out-cell inline-block min-w-8 rounded-sm">
                      {fmt(r.d14)}
                    </span>
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
}
