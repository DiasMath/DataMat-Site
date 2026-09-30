import { Clock, FileText } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

/** Duração da cena em segundos. */
export const LENGTH = 17;
const days = Array.from({ length: 30 }, (_, i) => i + 1);
const captions = [
  "Antes: o mês fechava e o DRE só saía dias depois.",
  "Agora: cada dia fechado vira dado no painel no dia seguinte.",
  "O resultado do mês é acompanhado enquanto ele acontece.",
];

/** Case DRE: quando o resultado do mês fica visível, antes e agora. */
export function DreScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      caption(0, 0);
      tl.from(q(".phase-before"), { autoAlpha: 0, duration: 0.4 }, 0.2)
        .to(
          q(".cell"),
          {
            backgroundColor: "rgba(245,240,231,0.35)",
            stagger: 0.07,
            duration: 0.2,
          },
          "+=0.2",
        )
        .from(q(".wait"), { autoAlpha: 0, x: -10, duration: 0.5 }, "+=0.3")
        .from(
          q(".doc"),
          { autoAlpha: 0, scale: 0.8, duration: 0.5, ease: "back.out(1.6)" },
          "+=0.8",
        );
      caption(1, "+=1.2");
      tl.to(q(".phase-before"), { autoAlpha: 0.25, duration: 0.5 }, "<").from(
        q(".phase-after"),
        { autoAlpha: 0, y: 12, duration: 0.5 },
        "<",
      );
      const label = q(".day-label")[0];
      q(".daily").forEach((bar, i) => {
        tl.from(
          bar,
          {
            scaleY: 0,
            transformOrigin: "bottom",
            duration: 0.25,
            onStart: () => {
              label.textContent = `Dia ${i + 1} · DRE atualizado`;
            },
          },
          i === 0 ? "+=0.3" : "+=0.03",
        );
      });
      caption(2, "+=0.8");
      tl.to(q(".phase-before"), { autoAlpha: 0.15, duration: 0.4 }, "<")
        .to(
          q(".daily"),
          {
            backgroundColor: "var(--color-amber-light)",
            stagger: 0.02,
            duration: 0.2,
          },
          "<",
        )
        .from(q(".live"), { autoAlpha: 0, y: 8, duration: 0.5 }, "+=0.2");
    },
    props,
    LENGTH,
  );

  return (
    <div ref={root}>
      <Screen label="DRE do mês" captions={captions}>
        <div className="flex h-full flex-col justify-center gap-6 p-5 md:p-8">
          <div className="phase-before">
            <p className="mb-2 text-xs tracking-widest text-text-muted">
              ANTES · DIAS DO MÊS
            </p>
            <div className="flex items-center gap-1">
              {days.map((d) => (
                <span
                  key={d}
                  className="cell h-6 flex-1 rounded-sm bg-white/10 md:h-8"
                />
              ))}
            </div>
            <div className="mt-3 flex flex-wrap items-center gap-2">
              <span className="wait flex items-center gap-1.5 rounded-md bg-white/10 px-2.5 py-1.5 text-xs text-cream md:text-sm">
                <Clock size={14} className="text-amber" aria-hidden="true" /> +
                alguns dias de fechamento
              </span>
              <span className="doc flex items-center gap-1.5 rounded-md border border-white/20 px-2.5 py-1.5 text-xs text-cream md:text-sm">
                <FileText size={14} aria-hidden="true" /> DRE do mês
              </span>
            </div>
          </div>
          <div className="phase-after">
            <div className="mb-2 flex items-center justify-between">
              <p className="text-xs tracking-widest text-amber">
                AGORA · PAINEL DIÁRIO
              </p>
              <p className="day-label text-xs text-cream tabular-nums md:text-sm">
                Dia 30 · DRE atualizado
              </p>
            </div>
            <div className="flex h-24 items-end gap-1 md:h-32">
              {days.map((d) => (
                <span
                  key={d}
                  className="daily flex-1 rounded-sm bg-amber"
                  style={{ height: `${30 + ((d * 37) % 70)}%` }}
                />
              ))}
            </div>
            <p className="live mt-3 text-sm text-cream md:text-base">
              <strong className="text-amber">Resultado até hoje</strong>, sem
              esperar o mês acabar.
            </p>
          </div>
        </div>
      </Screen>
    </div>
  );
}
