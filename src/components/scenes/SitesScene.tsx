import { MessageCircle } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

/** Sites: página confusa no celular vira página clara com botão de WhatsApp. */
export function SitesScene(props: SceneProps) {
  const root = useScene((tl, q) => {
    tl.from(q(".old > *"), { autoAlpha: 0, stagger: 0.05, duration: 0.25 })
      .to(q(".old"), { autoAlpha: 0, y: -20, duration: 0.4 }, "+=1")
      .from(
        q(".new > *"),
        { autoAlpha: 0, y: 14, stagger: 0.12, duration: 0.4 },
        "-=0.1",
      )
      .to(
        q(".cta"),
        { scale: 1.08, duration: 0.25, yoyo: true, repeat: 1 },
        "+=0.3",
      )
      .from(
        q(".lead"),
        { autoAlpha: 0, x: 20, stagger: 0.45, duration: 0.4 },
        "+=0.2",
      );
  }, props);

  return (
    <Screen label="Site no celular">
      <div
        ref={root}
        className="grid h-full grid-cols-[auto_1fr] items-center gap-6 px-6 py-4"
      >
        <div className="relative h-full max-h-[260px] w-[132px] overflow-hidden rounded-[20px] border-4 border-white/15 bg-white">
          <div className="old absolute inset-0 flex flex-col gap-1 p-2">
            {Array.from({ length: 14 }, (_, i) => (
              <span
                key={i}
                className="h-1.5 rounded-sm bg-graphite/25"
                style={{ width: `${60 + ((i * 17) % 40)}%` }}
              />
            ))}
          </div>
          <div className="new absolute inset-0 flex flex-col gap-2 bg-bg p-3">
            <span className="h-1.5 w-8 rounded-sm bg-amber" />
            <strong className="text-[13px] leading-tight text-cream">
              Material elétrico com entrega no dia
            </strong>
            <span className="text-[9px] text-text-muted">
              Cotação em minutos pelo WhatsApp.
            </span>
            <span className="cta mt-auto flex items-center justify-center gap-1 rounded-md bg-amber py-1.5 text-[10px] font-bold text-graphite">
              <MessageCircle size={11} aria-hidden="true" /> Falar no WhatsApp
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <p className="text-[10px] tracking-widest text-text-muted">
            NOVAS CONVERSAS
          </p>
          {[
            "Pedido de cotação",
            "Dúvida sobre entrega",
            "Orçamento de obra",
          ].map((l) => (
            <div
              key={l}
              className="lead flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2 text-xs text-cream"
            >
              <MessageCircle
                size={14}
                className="text-amber"
                aria-hidden="true"
              />{" "}
              {l}
            </div>
          ))}
        </div>
      </div>
    </Screen>
  );
}
