import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "../../motion/gsap";
import { motionDisabled } from "../../motion/tokens";

export type SceneProps = {
  /** false = pausa (ex.: seção fora da tela) */
  playing: boolean;
  /** chamado quando a cena termina */
  onEnd?: () => void;
  /** progresso de 0 a 1 e tempo total em segundos (barra e relógio da aba) */
  onProgress?: (progress: number, seconds: number) => void;
};

type Q = (selector: string) => Element[];
/** Mostra a legenda `i` (as outras somem) na posição `at` da timeline. */
type Caption = (i: number, at?: gsap.Position) => void;

/**
 * Monta a timeline de uma cena ("vídeo" feito em código).
 * `length`: duração total em segundos — a cena é completada com o quadro
 * final parado até esse tempo, para o relógio da aba ser exato.
 */
export function useScene(
  build: (tl: gsap.core.Timeline, q: Q, caption: Caption) => void,
  { playing, onEnd, onProgress }: SceneProps,
  length: number,
) {
  const root = useRef<HTMLDivElement>(null);
  const tl = useRef<gsap.core.Timeline | null>(null);
  const end = useRef(onEnd);
  const progress = useRef(onProgress);
  useEffect(() => {
    end.current = onEnd;
    progress.current = onProgress;
  });

  useGSAP(
    () => {
      const q = gsap.utils.selector(root);
      const bar = q(".scene-progress")[0] as HTMLElement | undefined;
      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => end.current?.(),
        onUpdate: () => {
          const p = timeline.progress();
          // a classe scale-x-0 do Tailwind usa a propriedade CSS `scale`
          if (bar) bar.style.scale = `${p} 1`;
          progress.current?.(p, length);
        },
      });
      const caps = q(".cap");
      gsap.set(caps, { autoAlpha: 0 });
      const caption: Caption = (i, at = "+=0") => {
        timeline
          .to(
            caps.filter((_, k) => k !== i),
            { autoAlpha: 0, duration: 0.3 },
            at,
          )
          .fromTo(
            caps[i],
            { autoAlpha: 0, y: 8 },
            { autoAlpha: 1, y: 0, duration: 0.5 },
            "<",
          );
      };
      build(timeline, q, caption);
      const rest = length - timeline.duration();
      if (rest > 0) timeline.to({}, { duration: rest });
      tl.current = timeline;
      if (motionDisabled) timeline.progress(1, true).pause();
    },
    { scope: root },
  );

  useEffect(() => {
    if (motionDisabled) return;
    if (playing) tl.current?.play();
    else tl.current?.pause();
  }, [playing]);

  return root;
}
