import { useEffect, useRef } from "react";
import { gsap, useGSAP } from "../../motion/gsap";
import { motionDisabled } from "../../motion/tokens";

export type SceneProps = {
  /** false = pausa (ex.: seção fora da tela) */
  playing: boolean;
  /** chamado quando a cena termina */
  onEnd?: () => void;
  /** progresso de 0 a 1 (para a barra da aba) */
  onProgress?: (progress: number) => void;
};

/**
 * Monta a timeline de uma cena ("vídeo" feito em código).
 * `build` recebe a timeline e o seletor com escopo na cena.
 */
export function useScene(
  build: (tl: gsap.core.Timeline, q: (s: string) => Element[]) => void,
  { playing, onEnd, onProgress }: SceneProps,
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
      const timeline = gsap.timeline({
        paused: true,
        onComplete: () => end.current?.(),
        onUpdate: () => progress.current?.(timeline.progress()),
      });
      build(timeline, q);
      // Segura o quadro final um pouco antes de passar para a próxima cena.
      timeline.to({}, { duration: 1.6 });
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
