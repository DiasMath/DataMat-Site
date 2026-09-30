import { MessageCircle, MousePointer2 } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

/** Duração da cena em segundos (aparece no relógio da aba). */
export const LENGTH = 18;

const captions = [
  "Site confuso: o visitante não acha o que precisa e sai.",
  "Refazemos com o que o cliente procura logo no topo.",
  "Um botão claro leva direto para o WhatsApp.",
  "As conversas começam a chegar.",
];

/** Sites: página confusa no celular vira página clara que gera conversas. */
export function SitesScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      caption(0, 0);
      tl.from(
        q(".old > *"),
        { autoAlpha: 0, stagger: 0.08, duration: 0.3 },
        0.3,
      )
        .from(q(".cursor"), { autoAlpha: 0, duration: 0.3 })
        .to(q(".cursor"), { x: 40, y: 60, duration: 0.9, ease: "sine.inOut" })
        .to(q(".cursor"), { x: -10, y: 120, duration: 0.9, ease: "sine.inOut" })
        .to(q(".cursor"), { x: 60, y: 20, duration: 0.9, ease: "sine.inOut" });
      caption(1, "+=0.4");
      tl.to(q(".old"), { autoAlpha: 0, y: -20, duration: 0.5 }, "<")
        .to(q(".cursor"), { autoAlpha: 0, duration: 0.2 }, "<")
        .from(q(".new"), { autoAlpha: 0, duration: 0.3 }, "<")
        .from(
          q(".new > .part"),
          { autoAlpha: 0, y: 14, stagger: 0.35, duration: 0.5 },
          "+=0.2",
        );
      caption(2, "+=1");
      tl.set(q(".cursor"), { x: 30, y: 150 }, "<")
        .to(q(".cursor"), { autoAlpha: 1, duration: 0.2 }, "<")
        .to(q(".cursor"), {
          y: 205,
          x: 45,
          duration: 0.9,
          ease: "power2.inOut",
        })
        .to(q(".cta"), { scale: 0.94, duration: 0.12, yoyo: true, repeat: 1 })
        .to(q(".cta"), {
          boxShadow: "0 0 0 6px rgba(255,176,63,0.35)",
          duration: 0.4,
          yoyo: true,
          repeat: 1,
        });
      caption(3, "+=0.6");
      tl.to(q(".cursor"), { autoAlpha: 0, duration: 0.2 }, "<").from(
        q(".lead"),
        { autoAlpha: 0, x: 24, stagger: 0.9, duration: 0.5 },
        "+=0.2",
      );
    },
    props,
    LENGTH,
  );

  return (
    <div ref={root}>
      <Screen label="Site no celular" captions={captions}>
        <div className="grid h-full grid-cols-[auto_1fr] items-center gap-6 px-6 py-4 md:gap-10 md:px-10">
          <div className="relative h-full max-h-[330px] w-[150px] overflow-hidden rounded-[22px] border-4 border-white/15 bg-white md:w-[170px]">
            <div className="old absolute inset-0 flex flex-col gap-1.5 p-2.5">
              {Array.from({ length: 18 }, (_, i) => (
                <span
                  key={i}
                  className="h-1.5 rounded-sm bg-graphite/25"
                  style={{ width: `${60 + ((i * 17) % 40)}%` }}
                />
              ))}
            </div>
            <div className="new absolute inset-0 flex flex-col gap-2 bg-bg p-3">
              <span className="part h-1.5 w-8 rounded-sm bg-amber" />
              <strong className="part text-sm leading-tight text-cream">
                Material elétrico com entrega no dia
              </strong>
              <span className="part text-[10px] text-text-muted">
                Cotação em minutos pelo WhatsApp.
              </span>
              <span className="part mt-1 grid grid-cols-2 gap-1">
                {["Cabos", "Disjuntores", "Tomadas", "Racks"].map((c) => (
                  <span
                    key={c}
                    className="rounded bg-white/10 px-1.5 py-1 text-[9px] text-cream"
                  >
                    {c}
                  </span>
                ))}
              </span>
              <span className="part cta mt-auto flex items-center justify-center gap-1 rounded-md bg-amber py-2 text-[11px] font-bold text-graphite">
                <MessageCircle size={12} aria-hidden="true" /> Falar no WhatsApp
              </span>
            </div>
            <MousePointer2
              size={20}
              className="cursor absolute top-8 left-10 fill-white text-graphite"
              aria-hidden="true"
            />
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="text-[10px] tracking-widest text-text-muted md:text-xs">
              NOVAS CONVERSAS
            </p>
            {[
              "Pedido de cotação · 09:12",
              "Dúvida sobre entrega · 10:40",
              "Orçamento de obra · 11:05",
            ].map((l) => (
              <div
                key={l}
                className="lead flex items-center gap-2 rounded-lg bg-white/10 px-3 py-2.5 text-xs text-cream md:text-sm"
              >
                <MessageCircle
                  size={15}
                  className="shrink-0 text-amber"
                  aria-hidden="true"
                />{" "}
                {l}
              </div>
            ))}
          </div>
        </div>
      </Screen>
    </div>
  );
}
