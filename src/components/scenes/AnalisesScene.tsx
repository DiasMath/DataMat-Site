import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

/** Duração da cena em segundos (inclui tempo parado no final). */
export const LENGTH = 30;

const months = ["Jul", "Ago", "Set", "Out*"];
// Valores ilustrativos (R$ mil), coerentes com a tabela do DRE. Out* = parcial.
const receita = [412, 398, 431, 322];
const fixas = [58, 58, 60, 44];
const variaveis = [38, 36, 39, 29];
const deducoes = [49, 47, 52, 38];
const lucroBruto = [135, 127, 143, 107];
const resultado = [39, 33, 44, 35];

const captions = [
  "Além da tabela, o painel traz as análises que importam.",
  "Receita bruta mês a mês, com outubro parcial já visível.",
  "Despesas fixas e variáveis, lado a lado.",
  "Deduções e impostos: quanto da receita fica pelo caminho.",
  "Lucro bruto e resultado: a tendência do negócio.",
];

function Card({
  name,
  title,
  note,
  children,
}: {
  name: string;
  title: string;
  note?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`chart ${name} flex min-h-0 flex-col rounded-lg bg-cream p-2.5 text-graphite md:p-3`}
    >
      <div className="flex items-baseline justify-between gap-2">
        <p className="text-[10px] font-semibold md:text-xs">{title}</p>
        {note && (
          <p className="text-[9px] text-graphite/60 md:text-[10px]">{note}</p>
        )}
      </div>
      <div className="mt-2 min-h-0 flex-1">{children}</div>
    </div>
  );
}

/** Barras verticais simples com rótulo do mês. */
function Bars({
  values,
  max,
  cls,
}: {
  values: number[];
  max: number;
  cls: string;
}) {
  return (
    <div className="flex h-full items-end gap-2">
      {values.map((v, i) => (
        <div
          key={i}
          className="flex h-full flex-1 flex-col items-center justify-end gap-1"
        >
          <span className="text-[9px] tabular-nums md:text-[10px]">{v}</span>
          <span
            className={`${cls} w-full rounded-sm ${i === 3 ? "bg-amber/50" : "bg-amber"}`}
            style={{ height: `${(v / max) * 70}%` }}
          />
          <span className="text-[9px] text-graphite/60">{months[i]}</span>
        </div>
      ))}
    </div>
  );
}

/** Pontos de uma linha num quadro 100x60. */
const linePoints = (values: number[], min: number, max: number) =>
  values
    .map((v, i) => `${8 + i * 28},${54 - ((v - min) / (max - min)) * 44}`)
    .join(" ");

/** Case DRE (página /cases): as análises que vêm junto com o DRE. */
export function AnalisesScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      caption(0, 0);
      tl.from(
        q(".chart"),
        { autoAlpha: 0, y: 12, stagger: 0.25, duration: 0.6 },
        0.3,
      );

      caption(1, "+=1.2");
      tl.to(
        q(".chart:not(.receita)"),
        { opacity: 0.35, duration: 0.4 },
        "<",
      ).from(q(".bar-receita"), {
        scaleY: 0,
        transformOrigin: "bottom",
        stagger: 0.25,
        duration: 0.7,
      });

      caption(2, "+=1.6");
      tl.to(q(".chart"), { opacity: 0.35, duration: 0.4 }, "<")
        .to(q(".chart.despesas"), { opacity: 1, duration: 0.4 }, "<")
        .from(q(".seg"), {
          scaleX: 0,
          transformOrigin: "left",
          stagger: 0.15,
          duration: 0.5,
        });

      caption(3, "+=1.6");
      tl.to(q(".chart"), { opacity: 0.35, duration: 0.4 }, "<")
        .to(q(".chart.deducoes"), { opacity: 1, duration: 0.4 }, "<")
        .from(q(".bar-ded"), {
          scaleY: 0,
          transformOrigin: "bottom",
          stagger: 0.25,
          duration: 0.6,
        });

      caption(4, "+=1.6");
      tl.to(q(".chart"), { opacity: 0.35, duration: 0.4 }, "<")
        .to(q(".chart.tendencia"), { opacity: 1, duration: 0.4 }, "<")
        .from(q(".line"), {
          strokeDashoffset: 1,
          duration: 1.6,
          stagger: 0.4,
          ease: "power1.inOut",
        })
        .from(
          q(".dot"),
          { scale: 0, transformOrigin: "50% 50%", stagger: 0.1, duration: 0.3 },
          "-=0.6",
        )
        // no fim, todos os gráficos voltam juntos para análise
        .to(q(".chart"), { opacity: 1, duration: 0.6 }, "+=1.2");
    },
    props,
    LENGTH,
  );

  return (
    <div ref={root}>
      <Screen
        label="Análises do DRE · Loja Juntos.com (valores ilustrativos)"
        captions={captions}
      >
        <div className="grid h-full grid-cols-1 grid-rows-4 gap-2 p-3 sm:grid-cols-2 sm:grid-rows-2 md:gap-3 md:p-4">
          <Card
            name="receita"
            title="Receita bruta"
            note="R$ mil · *Out até dia 23"
          >
            <Bars values={receita} max={431} cls="bar-receita" />
          </Card>

          <Card
            name="despesas"
            title="Despesas fixas x variáveis"
            note="R$ mil"
          >
            <div className="flex h-full flex-col justify-around gap-1">
              {months.map((m, i) => (
                <div key={m} className="flex items-center gap-2">
                  <span className="w-7 text-[9px] text-graphite/60">{m}</span>
                  <span className="flex h-2.5 flex-1 overflow-hidden rounded-sm bg-graphite/10">
                    <span
                      className="seg h-full bg-graphite"
                      style={{ width: `${(fixas[i] / 100) * 100}%` }}
                    />
                    <span
                      className="seg h-full bg-amber"
                      style={{ width: `${(variaveis[i] / 100) * 100}%` }}
                    />
                  </span>
                </div>
              ))}
              <div className="flex gap-3 text-[9px] text-graphite/70">
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-sm bg-graphite" /> fixas
                </span>
                <span className="flex items-center gap-1">
                  <span className="size-2 rounded-sm bg-amber" /> variáveis
                </span>
              </div>
            </div>
          </Card>

          <Card
            name="deducoes"
            title="Deduções e impostos"
            note="≈ 12% da receita"
          >
            <Bars values={deducoes} max={60} cls="bar-ded" />
          </Card>

          <Card name="tendencia" title="Lucro bruto x resultado" note="R$ mil">
            <svg
              viewBox="0 0 100 60"
              className="size-full overflow-visible"
              preserveAspectRatio="none"
            >
              <polyline
                className="line"
                points={linePoints(lucroBruto, 0, 150)}
                fill="none"
                stroke="var(--color-graphite)"
                strokeWidth={1.5}
                pathLength={1}
                strokeDasharray={1}
              />
              <polyline
                className="line"
                points={linePoints(resultado, 0, 150)}
                fill="none"
                stroke="var(--color-amber)"
                strokeWidth={2}
                pathLength={1}
                strokeDasharray={1}
              />
              {[...lucroBruto, ...resultado].map((v, i) => (
                <circle
                  key={i}
                  className="dot"
                  cx={8 + (i % 4) * 28}
                  cy={54 - (v / 150) * 44}
                  r={1.6}
                  fill={i < 4 ? "var(--color-graphite)" : "var(--color-amber)"}
                />
              ))}
            </svg>
          </Card>
        </div>
      </Screen>
    </div>
  );
}
