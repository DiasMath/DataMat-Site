import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

const messy = [
  "PROMOÇÃO!!!",
  "bom dia",
  "Chegou",
  "LIQUIDA",
  "feriado",
  "novidade :)",
];
const brand = [
  "Painel do mês",
  "Case: compras",
  "3 sinais",
  "Antes e depois",
  "Dica rápida",
  "Bastidores",
];
const tilt = [-4, 3, -2, 5, -3, 2];

/** Marca & Growth: um perfil sem padrão vira uma marca reconhecível. */
export function MarcaScene(props: SceneProps) {
  const root = useScene((tl, q) => {
    tl.from(q(".post"), {
      autoAlpha: 0,
      scale: 0.8,
      stagger: 0.08,
      duration: 0.4,
    })
      .to(
        q(".face-old"),
        { rotateY: 90, stagger: 0.12, duration: 0.3, ease: "power2.in" },
        "+=1",
      )
      .fromTo(
        q(".face-new"),
        { rotateY: -90 },
        { rotateY: 0, stagger: 0.12, duration: 0.3, ease: "power2.out" },
        "<0.3",
      )
      .from(
        q(".logo"),
        { scale: 0, duration: 0.5, ease: "back.out(2)" },
        "-=0.4",
      )
      .from(q(".bio"), { autoAlpha: 0, x: -10, duration: 0.4 }, "<0.2");
  }, props);

  return (
    <Screen label="Perfil da empresa">
      <div ref={root} className="flex h-full flex-col gap-3 p-4">
        <div className="flex items-center gap-3">
          <div className="size-10 rounded-full bg-white/10">
            <div className="logo flex size-10 items-center justify-center rounded-full bg-amber text-sm font-black text-graphite">
              D
            </div>
          </div>
          <div className="bio">
            <p className="text-sm font-semibold text-cream">sua.empresa</p>
            <p className="text-[11px] text-text-muted">
              Distribuidora · Rio de Janeiro
            </p>
          </div>
        </div>
        <div className="grid flex-1 grid-cols-3 gap-2 [perspective:600px]">
          {messy.map((m, i) => (
            <div key={m} className="post relative">
              <div
                className="face-old absolute inset-0 flex items-center justify-center rounded-md bg-white/10 text-[11px] text-text-muted [backface-visibility:hidden]"
                style={{ rotate: `${tilt[i]}deg` }}
              >
                {m}
              </div>
              <div className="face-new absolute inset-0 flex flex-col justify-end rounded-md bg-bg p-2 [backface-visibility:hidden]">
                <span className="mb-1 h-0.5 w-5 bg-amber" />
                <span className="text-[11px] font-semibold text-cream">
                  {brand[i]}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}
