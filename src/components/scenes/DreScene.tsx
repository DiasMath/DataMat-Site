import { CalendarClock, Check, FileSpreadsheet, Sparkles } from "lucide-react";
import { DatamatSymbol } from "../DatamatSymbol";
import { gsap } from "../../motion/gsap";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

/** Duração da cena em segundos (inclui ~6 s parado no final para análise). */
export const LENGTH = 36;

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

/** Posição horizontal (centro, em %) de cada etapa no fluxo. */
const X = { erp: 9, excel: 33, gpt: 57, planilha: 81, datamat: 45 };

const captions = [
  "Antes: todo mês, alguém exportava do ERP e montava o DRE à mão.",
  "O resultado de outubro só existia dias depois de outubro acabar.",
  "Com a DATAMAT, o ERP alimenta o DRE sozinho, todos os dias.",
  "Outubro aparece enquanto acontece: o DRE do mês já existe no dia 12.",
  "Você acompanha o mês todo, sem esperar o fechamento.",
];

/** Etapa do fluxo: mini-tela com rótulo. */
function Step({
  name,
  x,
  label,
  children,
}: {
  name: string;
  x: number;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`step ${name} absolute top-5 flex w-[19%] flex-col items-center gap-1`}
      style={{ left: `${x}%` }}
    >
      <div className="flex aspect-[3/2] w-full max-w-24 items-center justify-center rounded-lg border border-white/10 bg-bg p-1.5 shadow-lg shadow-black/30 md:p-2">
        {children}
      </div>
      <span className="text-[9px] whitespace-nowrap text-text-muted md:text-[11px]">
        {label}
      </span>
    </div>
  );
}

/** Case DRE: fluxo e visão antigos (fim do mês) x DATAMAT (diária), em tabela. */
export function DreScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      const outCells = q(".out-cell");
      const setOut = (key: "d12" | "d14") =>
        outCells.forEach((c, i) => {
          c.textContent = fmt(rows[i][key]);
        });
      // Centraliza as etapas no ponto X (o GSAP cuida do transform).
      gsap.set(q(".step"), { xPercent: -50 });
      tl.call(
        () => {
          outCells.forEach((c) => (c.textContent = "—"));
          q(".out-head-label").forEach((e) => (e.textContent = "Out"));
        },
        [],
        0,
      );

      // 1. Fluxo antigo: o arquivo passa de mão em mão até virar o DRE.
      caption(0, 0);
      const token = q(".token")[0];
      tl.from(q(".step.erp"), { autoAlpha: 0, y: 8, duration: 0.5 }, 0.4)
        .from(q(".manual-tag"), { autoAlpha: 0, duration: 0.4 })
        .set(token, { left: `${X.erp}%`, autoAlpha: 1 })
        .from(q(".erp-bar"), {
          scaleX: 0,
          transformOrigin: "left",
          duration: 0.8,
        });
      (["excel", "gpt", "planilha"] as const).forEach((name, i) => {
        tl.from(
          q(`.step.${name}`),
          { autoAlpha: 0, y: 8, duration: 0.4 },
          "-=0.1",
        )
          .from(
            q(".old-line")[i],
            { scaleX: 0, transformOrigin: "left", duration: 0.6, ease: "none" },
            "<",
          )
          .to(token, { left: `${X[name]}%`, duration: 0.6, ease: "none" }, "<")
          .from(q(`.${name}-work`), {
            autoAlpha: 0,
            stagger: 0.12,
            duration: 0.25,
          });
      });
      tl.to(token, { autoAlpha: 0, duration: 0.3 })
        .from(
          q(".old-down"),
          { scaleY: 0, transformOrigin: "top", duration: 0.4 },
          "<",
        )
        .from(q(".dre-table"), { autoAlpha: 0, y: 12, duration: 0.6 })
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

      // 3. Fluxo novo: etapas manuais saem; o ERP passa pela DATAMAT e vai direto.
      caption(2, "+=2.4");
      tl.to(q(".wait"), { autoAlpha: 0, duration: 0.3 }, "<")
        .to(
          q(
            ".step.excel, .step.gpt, .step.planilha, .manual-tag, .old-line, .old-down",
          ),
          { autoAlpha: 0, y: 6, duration: 0.5, stagger: 0.08 },
          "<0.2",
        )
        .from(q(".step.datamat"), {
          autoAlpha: 0,
          scale: 0.7,
          duration: 0.7,
          ease: "back.out(1.7)",
        })
        .from(
          q(".new-line"),
          { scaleX: 0, transformOrigin: "left", duration: 0.5 },
          "-=0.2",
        )
        .from(q(".new-down"), {
          scaleY: 0,
          transformOrigin: "top",
          duration: 0.4,
        })
        .from(q(".auto-tag"), { autoAlpha: 0, y: -6, duration: 0.4 }, "<")
        .to(q(".out-head"), { color: "var(--color-graphite)", duration: 0.3 });
      const flowStart = tl.duration();

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

      // Fluxo contínuo de dados: ERP -> DATAMAT -> DRE (até o fim da cena).
      q(".flow-dot").forEach((dot, i) => {
        tl.fromTo(
          dot,
          { left: `${X.erp}%`, top: "46%", autoAlpha: 1 },
          {
            keyframes: [
              { left: `${X.datamat}%`, duration: 0.9, ease: "none" },
              { top: "100%", duration: 0.5, ease: "none" },
              { autoAlpha: 0, duration: 0.1 },
            ],
            // repete até perto do fim da cena
            repeat: Math.max(0, Math.floor((LENGTH - flowStart) / 1.5) - 2),
            delay: i * 0.5,
          },
          flowStart,
        );
      });
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
        <div className="flex h-full flex-col gap-2 p-3 md:gap-3 md:p-5">
          {/* Fluxo de trabalho (visual) */}
          <div className="relative h-[38%] shrink-0">
            {/* linhas do fluxo antigo */}
            <span className="manual-tag absolute -top-0.5 right-0 rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-text-muted md:text-[10px]">
              manual · todo fim de mês
            </span>
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="old-line absolute top-[46%] h-px border-t border-dashed border-white/30"
                style={{
                  left: `${[X.erp, X.excel, X.gpt][i] + 6}%`,
                  width: "12%",
                }}
              />
            ))}
            <span
              className="old-down absolute top-[70%] bottom-0 w-px border-l border-dashed border-white/30"
              style={{ left: `${X.planilha}%` }}
            />
            {/* linhas do fluxo novo */}
            <span
              className="new-line absolute top-[46%] h-0.5 bg-amber/70"
              style={{
                left: `${X.erp + 6}%`,
                width: `${X.datamat - X.erp - 12}%`,
              }}
            />
            <span
              className="new-down absolute top-[74%] bottom-0 w-0.5 bg-amber/70"
              style={{ left: `${X.datamat}%` }}
            />
            <span className="auto-tag absolute -top-0.5 right-0 flex items-center gap-1 rounded bg-amber px-1.5 py-0.5 text-[9px] font-semibold text-graphite md:text-[10px]">
              automático · todo dia, 07:00
            </span>

            <Step name="erp" x={X.erp} label="ERP">
              <span className="flex size-full flex-col justify-center gap-1">
                {[0, 1, 2].map((i) => (
                  <span key={i} className="h-1 rounded-sm bg-cream/30" />
                ))}
                <span className="erp-bar h-1 rounded-sm bg-amber" />
              </span>
            </Step>
            <Step name="excel" x={X.excel} label="Exporta">
              <span className="grid size-full grid-cols-4 content-center gap-[2px]">
                {Array.from({ length: 12 }, (_, i) => (
                  <span
                    key={i}
                    className={`excel-work h-1.5 rounded-[1px] ${i < 4 ? "bg-amber" : "bg-cream/40"}`}
                  />
                ))}
              </span>
            </Step>
            <Step name="gpt" x={X.gpt} label="GPT categoriza">
              <span className="flex size-full flex-col justify-center gap-1">
                <span className="gpt-work h-1.5 w-3/4 self-start rounded-full bg-cream/40" />
                <span className="gpt-work flex items-center gap-1 self-end rounded-full bg-amber/80 px-1.5 py-0.5">
                  <Sparkles
                    size={8}
                    className="text-graphite"
                    aria-hidden="true"
                  />
                  <span className="h-1 w-5 rounded-full bg-graphite/60" />
                </span>
                <span className="gpt-work h-1.5 w-2/3 self-start rounded-full bg-cream/40" />
              </span>
            </Step>
            <Step name="planilha" x={X.planilha} label="Monta o DRE">
              <span className="flex size-full flex-col justify-center gap-[3px]">
                {[0, 1, 2, 3].map((i) => (
                  <span key={i} className="planilha-work flex gap-1">
                    <span className="h-1 flex-[2] rounded-[1px] bg-cream/40" />
                    <span className="h-1 flex-1 rounded-[1px] bg-cream/40" />
                  </span>
                ))}
              </span>
            </Step>
            <Step name="datamat" x={X.datamat} label="DATAMAT">
              <span className="flex size-full items-center justify-center rounded-md bg-amber/15 ring-1 ring-amber/60">
                <DatamatSymbol className="h-[70%] text-amber" />
              </span>
            </Step>

            {/* arquivo passando de etapa em etapa */}
            <span className="token absolute top-[46%] flex -translate-1/2 items-center gap-1 rounded bg-cream px-1.5 py-0.5 text-[9px] font-semibold text-graphite opacity-0 shadow md:text-[10px]">
              <FileSpreadsheet size={10} aria-hidden="true" /> arquivo
            </span>
            {/* dados correndo sozinhos */}
            {[0, 1, 2].map((i) => (
              <span
                key={i}
                className="flow-dot absolute size-2 -translate-1/2 rounded-full bg-amber opacity-0 shadow-[0_0_8px_var(--color-amber)]"
              />
            ))}
          </div>

          {/* DRE: linhas x meses */}
          <div className="relative flex-1">
            <span className="absolute -top-1 right-0 z-10 grid -translate-y-full">
              <span className="wait col-start-1 row-start-1 flex items-center gap-1 justify-self-end rounded-md bg-white/10 px-2 py-0.5 text-[10px] text-cream md:text-xs">
                <CalendarClock
                  size={12}
                  className="text-amber"
                  aria-hidden="true"
                />{" "}
                Out só no dia 5 de novembro
              </span>
              <span className="stamp col-start-1 row-start-1 flex items-center gap-1 justify-self-end rounded-full bg-amber px-2 py-0.5 text-[10px] font-semibold text-graphite md:text-xs">
                <Check size={12} aria-hidden="true" /> atualizado{" "}
                <span className="stamp-day">14/10, 07:00</span>
              </span>
            </span>
            <div className="dre-table h-full overflow-hidden rounded-lg bg-cream text-graphite">
              <div className="grid h-full grid-cols-[1.7fr_repeat(4,1fr)] text-[10px] md:text-xs">
                <span className="border-b border-graphite/15 px-2 py-1 font-semibold text-graphite/60">
                  DRE (R$ mil)
                </span>
                {months.map((m) => (
                  <span
                    key={m}
                    className="past-col border-b border-graphite/15 px-2 py-1 text-right font-semibold text-graphite/60"
                  >
                    {m}
                  </span>
                ))}
                <span className="out-head out-col border-b border-graphite/15 px-2 py-1 text-right font-semibold text-graphite">
                  <span className="out-head-label">Out · até dia 14</span>
                </span>
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className={`col-span-5 grid grid-cols-subgrid ${r.label === "Resultado" ? "result-row rounded-sm" : ""} ${r.total ? "font-semibold" : ""}`}
                  >
                    <span className="px-2 py-0.5">{r.label}</span>
                    {r.values.map((v, k) => (
                      <span
                        key={k}
                        className="past-col px-2 py-0.5 text-right tabular-nums"
                      >
                        {fmt(v)}
                      </span>
                    ))}
                    <span className="out-col px-2 py-0.5 text-right tabular-nums">
                      <span className="out-cell inline-block min-w-8 rounded-sm">
                        {fmt(r.d14)}
                      </span>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
}
