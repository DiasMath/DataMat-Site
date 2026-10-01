import { CalendarClock, Check, FileSpreadsheet, Sparkles } from "lucide-react";
import { DatamatSymbol } from "../DatamatSymbol";
import { gsap } from "../../motion/gsap";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

/** Duração da cena em segundos (o fim mostra os dias passando, devagar). */
export const LENGTH = 48;
/** Segundos entre um dia e outro no fim da cena. */
const DAY_STEP = 1.4;

const months = ["Jul", "Ago", "Set"];
/** Linhas do DRE e valores fictícios (R$ mil). Out: acumulado até o dia 12. */
const rows: {
  label: string;
  values: number[];
  d12: number;
  total?: boolean;
}[] = [
  { label: "Receita bruta", values: [412, 398, 431], d12: 168 },
  { label: "(−) Deduções", values: [-49, -47, -52], d12: -20 },
  { label: "Receita líquida", values: [363, 351, 379], d12: 148, total: true },
  { label: "(−) CMV", values: [-228, -224, -236], d12: -92 },
  { label: "Lucro bruto", values: [135, 127, 143], d12: 56, total: true },
  { label: "(−) Despesas", values: [-96, -94, -99], d12: -38 },
  { label: "Resultado", values: [39, 33, 44], d12: 18, total: true },
];
const fmt = (v: number) => (v < 0 ? `(${Math.abs(v)})` : String(v));
/** Valor acumulado de outubro no dia `day` (ritmo diário a partir do dia 12). */
const upTo = (d12: number, day: number) => Math.round((d12 / 12) * day);

/** Posição horizontal (centro, em %) de cada etapa no fluxo. */
const X = { erp: 9, excel: 33, gpt: 57, planilha: 81, datamat: 45 };
/** Altura da mini-tela de cada etapa (19% da largura do fluxo, proporção 3:2). */
const TILE_H = "min(12.67cqw,4rem)";

const captions = [
  "Antes: todo mês, alguém exportava do ERP e montava o DRE à mão.",
  "O resultado de outubro só existia dias depois de outubro acabar.",
  "Com a DATAMAT, o ERP alimenta o DRE sozinho, todos os dias.",
  "Outubro aparece enquanto acontece: o DRE do mês já existe no dia 12.",
  "E segue atualizando, dia após dia, sem ninguém montar nada.",
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
      className={`step ${name} absolute top-5 flex w-[19%] max-w-24 flex-col items-center gap-1`}
      style={{ left: `${x}%` }}
    >
      <div className="flex aspect-[3/2] w-full items-center justify-center rounded-lg border border-white/10 bg-bg p-1.5 shadow-lg shadow-black/30 md:p-2">
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
      const setDay = (day: number) => {
        outCells.forEach((c, i) => {
          c.textContent = fmt(upTo(rows[i].d12, day));
        });
        q(".out-head-label").forEach(
          (e) => (e.textContent = `Out · até dia ${day}`),
        );
        q(".stamp-day").forEach((e) => (e.textContent = `${day}/10, 07:00`));
      };
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
            {
              scaleX: 0,
              transformOrigin: "left",
              duration: 1.2,
              ease: "sine.inOut",
            },
            "<",
          )
          .to(
            token,
            { left: `${X[name]}%`, duration: 1.2, ease: "sine.inOut" },
            "<",
          )
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

      // 4. Outubro já existe no dia 12.
      caption(3, "+=1");
      tl.call(() => setDay(12), [], "<")
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
        .from(q(".stamp"), { autoAlpha: 0, y: -6, duration: 0.4 }, "-=0.3")
        .to(
          q(".out-col"),
          { backgroundColor: "rgba(255,176,63,0.14)", duration: 0.4 },
          "+=1.2",
        );

      // 5. Os dias seguem passando, devagar, até o fim da cena.
      caption(4, "+=1.4");
      tl.to(
        q(".result-row"),
        { boxShadow: "inset 0 0 0 2px var(--color-amber)", duration: 0.5 },
        "<",
      );
      const daysStart = tl.duration() + 0.6;
      const days = Math.max(
        0,
        Math.floor((LENGTH - 0.5 - daysStart) / DAY_STEP),
      );
      for (let k = 0; k < days; k++) {
        const at = daysStart + k * DAY_STEP;
        tl.call(() => setDay(13 + k), [], at).fromTo(
          q(".out-cell"),
          { color: "var(--color-amber)" },
          {
            color: "var(--color-graphite)",
            duration: 0.9,
            immediateRender: false,
          },
          at,
        );
      }

      // Dados correndo sozinhos (sutil): ERP -> DATAMAT e DATAMAT -> tabela.
      const cycles = Math.max(0, Math.floor((LENGTH - flowStart) / 2.4) - 1);
      q(".flow-dot").forEach((dot, i) => {
        tl.to(
          dot,
          {
            keyframes: {
              left: [`${X.erp + 5}%`, `${X.datamat - 5}%`],
              autoAlpha: [0, 0.7, 0.7, 0],
            },
            duration: 2.4,
            ease: "none",
            repeat: cycles,
          },
          flowStart + i * 1.2,
        );
      });
      q(".down-dot").forEach((dot, i) => {
        tl.to(
          dot,
          {
            keyframes: { top: ["0%", "100%"], autoAlpha: [0, 0.7, 0.7, 0] },
            duration: 1.2,
            ease: "none",
            repeat: cycles * 2,
          },
          flowStart + 0.6 + i * 0.6,
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
          <div className="@container relative h-[30%] shrink-0">
            <span className="manual-tag absolute top-0 right-0 rounded bg-white/10 px-1.5 py-0.5 text-[9px] text-text-muted md:text-[10px]">
              manual · todo fim de mês
            </span>
            <span className="auto-tag absolute top-0 right-0 flex items-center gap-1 rounded bg-amber px-1.5 py-0.5 text-[9px] font-semibold text-graphite md:text-[10px]">
              automático · todo dia, 07:00
            </span>

            {/* Trilho na altura do centro das mini-telas: linhas, arquivo e dados passam aqui */}
            <div
              className="absolute inset-x-0 top-5"
              style={{ height: TILE_H }}
            >
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="old-line absolute top-1/2 h-px border-t border-dashed border-white/30"
                  style={{
                    left: `${[X.erp, X.excel, X.gpt][i] + 6}%`,
                    width: "12%",
                  }}
                />
              ))}
              <span
                className="new-line absolute top-1/2 h-px bg-amber/50"
                style={{
                  left: `${X.erp + 6}%`,
                  width: `${X.datamat - X.erp - 12}%`,
                }}
              />
              {/* arquivo Excel passando de etapa em etapa */}
              <span className="token absolute top-1/2 flex -translate-1/2 items-center gap-1 rounded-md bg-excel px-1.5 py-1 text-[9px] font-semibold text-white opacity-0 shadow-md shadow-black/30 md:text-[10px]">
                <FileSpreadsheet size={11} aria-hidden="true" /> fechamento.xlsx
              </span>
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="flow-dot absolute top-1/2 size-1.5 -translate-1/2 rounded-full bg-amber opacity-0 shadow-[0_0_4px_var(--color-amber)]"
                />
              ))}
            </div>

            {/* Descidas até a tabela (do pé da etapa até o fim do fluxo) */}
            <span
              className="old-down absolute bottom-0 w-px border-l border-dashed border-white/30"
              style={{
                left: `${X.planilha}%`,
                top: `calc(1.25rem + ${TILE_H} + 1.1rem)`,
              }}
            />
            <span
              className="new-down absolute bottom-0 w-px bg-amber/50"
              style={{
                left: `${X.datamat}%`,
                top: `calc(1.25rem + ${TILE_H} + 1.1rem)`,
              }}
            >
              {[0, 1].map((i) => (
                <span
                  key={i}
                  className="down-dot absolute left-1/2 size-1.5 -translate-1/2 rounded-full bg-amber opacity-0 shadow-[0_0_4px_var(--color-amber)]"
                />
              ))}
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
                <DatamatSymbol className="w-[30%] text-amber" />
              </span>
            </Step>
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
                <span className="stamp-day">12/10, 07:00</span>
              </span>
            </span>
            <div className="dre-table h-full overflow-hidden rounded-lg bg-cream text-graphite">
              <div className="grid h-full grid-cols-[1.7fr_repeat(4,1fr)] content-stretch text-[10px] md:text-xs">
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
                  <span className="out-head-label">Out · até dia 12</span>
                </span>
                {rows.map((r) => (
                  <div
                    key={r.label}
                    className={`col-span-5 grid grid-cols-subgrid items-center ${r.label === "Resultado" ? "result-row rounded-sm" : ""} ${r.total ? "font-semibold" : ""}`}
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
                    <span className="out-col flex h-full items-center justify-end px-2 py-1 tabular-nums">
                      <span className="out-cell inline-block min-w-8 rounded-sm text-right">
                        {fmt(r.d12)}
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
