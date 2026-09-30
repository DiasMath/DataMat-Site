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
/** Duração da cena em segundos (aparece no relógio da aba). */
export const LENGTH = 18;

const captions = [
  "Cada post de um jeito: o cliente não reconhece a empresa.",
  "Definimos a identidade: cores, tipografia e tom de voz.",
  "Todo conteúdo passa a seguir o mesmo padrão.",
  "A empresa fica reconhecível e passa confiança.",
];

/** Marca & Growth: identidade definida e aplicada, post a post. */
export function MarcaScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      caption(0, 0);
      tl.from(
        q(".post"),
        { autoAlpha: 0, scale: 0.8, stagger: 0.2, duration: 0.5 },
        0.3,
      ).to(
        q(".face-old"),
        { x: "+=4", yoyo: true, repeat: 3, duration: 0.15, stagger: 0.05 },
        "+=0.6",
      );
      caption(1, "+=1.2");
      tl.from(q(".kit"), { autoAlpha: 0, y: 16, duration: 0.6 }, "<")
        .from(q(".swatch"), {
          scale: 0,
          stagger: 0.2,
          duration: 0.4,
          ease: "back.out(2)",
        })
        .from(q(".type"), { autoAlpha: 0, x: -8, duration: 0.5 }, "+=0.2")
        .from(q(".tone"), { autoAlpha: 0, x: -8, duration: 0.5 }, "+=0.2");
      caption(2, "+=1");
      tl.to(
        q(".face-old"),
        { rotateY: 90, stagger: 0.25, duration: 0.35, ease: "power2.in" },
        "<",
      ).fromTo(
        q(".face-new"),
        { rotateY: -90 },
        { rotateY: 0, stagger: 0.25, duration: 0.35, ease: "power2.out" },
        "<0.35",
      );
      caption(3, "+=1");
      tl.from(q(".logo"), { scale: 0, duration: 0.6, ease: "back.out(2)" }, "<")
        .from(q(".bio"), { autoAlpha: 0, x: -10, duration: 0.5 }, "+=0.2")
        .from(
          q(".follow"),
          { autoAlpha: 0, scale: 0.8, duration: 0.5, ease: "back.out(2)" },
          "+=0.3",
        );
    },
    props,
    LENGTH,
  );

  return (
    <div ref={root}>
      <Screen label="Perfil da empresa" captions={captions}>
        <div className="grid h-full gap-4 p-4 sm:grid-cols-[1.4fr_1fr] md:p-5">
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <div className="size-11 rounded-full bg-white/10">
                <div className="logo flex size-11 items-center justify-center rounded-full bg-amber text-base font-black text-graphite">
                  D
                </div>
              </div>
              <div className="bio">
                <p className="text-sm font-semibold text-cream md:text-base">
                  sua.empresa
                </p>
                <p className="text-xs text-text-muted">
                  Distribuidora · Rio de Janeiro
                </p>
              </div>
              <span className="follow ml-auto rounded-md bg-amber px-3 py-1 text-xs font-semibold text-graphite">
                Seguir
              </span>
            </div>
            <div className="grid flex-1 grid-cols-3 gap-2 [perspective:600px]">
              {messy.map((m, i) => (
                <div key={m} className="post relative">
                  <div
                    className="face-old absolute inset-0 flex items-center justify-center rounded-md bg-white/10 text-xs text-text-muted [backface-visibility:hidden]"
                    style={{ rotate: `${tilt[i]}deg` }}
                  >
                    {m}
                  </div>
                  <div className="face-new absolute inset-0 flex flex-col justify-end rounded-md bg-bg p-2 [backface-visibility:hidden] md:p-3">
                    <span className="mb-1.5 h-0.5 w-6 bg-amber" />
                    <span className="text-xs font-semibold text-cream md:text-sm">
                      {brand[i]}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="kit hidden flex-col gap-4 rounded-xl bg-bg p-4 sm:flex">
            <p className="text-xs tracking-widest text-text-muted">
              IDENTIDADE
            </p>
            <div className="flex gap-2">
              {["bg-amber", "bg-graphite", "bg-cream", "bg-bg-hero"].map(
                (c) => (
                  <span
                    key={c}
                    className={`swatch size-9 rounded-lg border border-white/15 ${c}`}
                  />
                ),
              )}
            </div>
            <p className="type text-3xl font-semibold text-cream">
              Aa{" "}
              <span className="text-sm font-normal text-text-muted">
                DM Sans
              </span>
            </p>
            <p className="tone text-sm text-text-muted">
              Tom: direto, próximo, sem exagero.
            </p>
          </div>
        </div>
      </Screen>
    </div>
  );
}
