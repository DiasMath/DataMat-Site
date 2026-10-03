import { Check, Search } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

const orders = [
  { id: "#1039", item: "2x Disjuntor 32A", value: "R$ 96" },
  { id: "#1040", item: "10x Tomada 20A", value: "R$ 182" },
  { id: "#1041", item: "1x Rack 12U", value: "R$ 1.140" },
];
/** Duração da cena em segundos (aparece no relógio da aba). */
export const LENGTH = 22;

const captions = [
  "O cliente chama no WhatsApp, até fora do horário.",
  "A IA entende o pedido e consulta o estoque no sistema.",
  "Responde com preço e disponibilidade, e fecha o pedido.",
  "O pedido entra no sistema e a equipe é avisada.",
];

/** IA & Automação: pergunta no WhatsApp vira pedido no sistema, sem ninguém digitar. */
export function IaScene(props: SceneProps) {
  const root = useScene(
    (tl, q, caption) => {
      const msgs = q(".msg");
      caption(0, 0);
      tl.from(q(".clock"), { autoAlpha: 0, y: -6, duration: 0.5 }, 0.3).from(
        msgs[0],
        { autoAlpha: 0, y: 12, duration: 0.6 },
        "+=0.4",
      );
      caption(1, "+=1.6");
      tl.from(q(".typing"), { autoAlpha: 0, duration: 0.3 }, "<")
        .from(q(".lookup"), { autoAlpha: 0, x: 16, duration: 0.5 }, "+=0.3")
        .to(
          q(".stock"),
          {
            backgroundColor: "rgba(255,176,63,0.25)",
            duration: 0.4,
            yoyo: true,
            repeat: 3,
          },
          "+=0.2",
        )
        .to(q(".typing"), { autoAlpha: 0, duration: 0.3 }, "+=0.4");
      caption(2, "+=0.4");
      tl.from(msgs[1], { autoAlpha: 0, y: 12, duration: 0.6 }, "<")
        .from(msgs[2], { autoAlpha: 0, y: 12, duration: 0.6 }, "+=1.4")
        .from(msgs[3], { autoAlpha: 0, y: 12, duration: 0.6 }, "+=1");
      caption(3, "+=0.8");
      tl.to(q(".lookup"), { autoAlpha: 0, duration: 0.3 }, "<")
        .from(
          q(".new-order"),
          { autoAlpha: 0, x: -30, duration: 0.7, ease: "back.out(1.5)" },
          "+=0.2",
        )
        .from(q(".toast"), { autoAlpha: 0, y: 14, duration: 0.5 }, "+=0.8");
    },
    props,
    LENGTH,
  );

  return (
    <div ref={root}>
      <Screen label="WhatsApp + sistema da empresa" captions={captions} tall>
        <div className="grid h-full grid-rows-[1fr_auto] gap-3 p-3 sm:grid-cols-[1fr_1.1fr] sm:grid-rows-1 sm:gap-5 sm:p-5">
          <div className="flex flex-col gap-2.5 rounded-xl bg-bg p-3 text-xs leading-snug md:p-4 md:text-sm">
            <div className="flex items-center justify-between">
              <p className="text-[10px] tracking-widest text-text-muted md:text-xs">
                CLIENTE · WHATSAPP
              </p>
              <span className="clock text-[10px] text-text-muted md:text-xs">
                22:47
              </span>
            </div>
            <p className="msg max-w-[85%] self-start rounded-lg rounded-tl-none bg-white/10 px-3 py-2 text-cream">
              Oi! Vocês têm cabo CAT6, caixa de 305 m?
            </p>
            <p className="typing self-end px-2 text-text-muted">
              IA digitando…
            </p>
            <p className="msg max-w-[85%] self-end rounded-lg rounded-tr-none bg-amber px-3 py-2 text-graphite">
              Temos 42 caixas, R$ 689 cada. Quer que eu separe?
            </p>
            <p className="msg max-w-[85%] self-start rounded-lg rounded-tl-none bg-white/10 px-3 py-2 text-cream">
              Quero 3, pode entregar amanhã?
            </p>
            <p className="msg max-w-[85%] self-end rounded-lg rounded-tr-none bg-amber px-3 py-2 text-graphite">
              <Check size={13} className="mr-1 inline" aria-hidden="true" />
              Pedido #1042 criado. Entrega amanhã de manhã.
            </p>
          </div>
          <div className="relative flex flex-col gap-2 rounded-xl bg-cream p-3 text-graphite md:p-4">
            <strong className="text-sm md:text-base">
              Sistema · Pedidos de hoje
            </strong>
            <div className="lookup flex items-center gap-2 rounded-md bg-graphite px-3 py-2 text-xs text-cream md:text-sm">
              <Search size={14} className="text-amber" aria-hidden="true" />{" "}
              Estoque: cabo CAT6 305 m
              <span className="stock ml-auto rounded px-1.5 font-semibold">
                42 un.
              </span>
            </div>
            <div className="new-order flex justify-between rounded-md border-2 border-amber bg-white px-3 py-2 text-xs font-semibold md:text-sm">
              <span>#1042 · 3x Cabo CAT6</span>
              <span>R$ 2.067</span>
            </div>
            {orders.map((o, i) => (
              <div
                key={o.id}
                className={`justify-between rounded-md bg-white px-3 py-2 text-xs md:text-sm ${i === 2 ? "hidden sm:flex" : i === 1 ? "flex max-[380px]:hidden" : "flex"}`}
              >
                <span>
                  {o.id} · {o.item}
                </span>
                <span>{o.value}</span>
              </div>
            ))}
            <div className="toast absolute right-3 bottom-3 left-3 rounded-lg bg-graphite px-3 py-2.5 text-xs text-cream md:text-sm">
              Separação avisada: pedido #1042 para amanhã
            </div>
          </div>
        </div>
      </Screen>
    </div>
  );
}
