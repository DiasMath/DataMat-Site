import { Check } from "lucide-react";
import { Screen } from "./Screen";
import { useScene, type SceneProps } from "./useScene";

const orders = [
  { id: "#1039", item: "2x Disjuntor 32A", value: "R$ 96" },
  { id: "#1040", item: "10x Tomada 20A", value: "R$ 182" },
  { id: "#1041", item: "1x Rack 12U", value: "R$ 1.140" },
];

/** IA & Automação: o cliente pergunta no WhatsApp e o pedido nasce sozinho. */
export function IaScene(props: SceneProps) {
  const root = useScene((tl, q) => {
    const msgs = q(".msg");
    tl.from(msgs[0], { autoAlpha: 0, y: 10, duration: 0.4 })
      .from(q(".typing"), { autoAlpha: 0, duration: 0.2 }, "+=0.4")
      .to(q(".typing"), { autoAlpha: 0, duration: 0.2 }, "+=0.9")
      .from(msgs[1], { autoAlpha: 0, y: 10, duration: 0.4 })
      .from(msgs[2], { autoAlpha: 0, y: 10, duration: 0.4 }, "+=0.8")
      .from(msgs[3], { autoAlpha: 0, y: 10, duration: 0.4 }, "+=0.7")
      .from(
        q(".new-order"),
        { autoAlpha: 0, x: -30, duration: 0.5, ease: "back.out(1.5)" },
        "+=0.2",
      )
      .from(q(".toast"), { autoAlpha: 0, y: 14, duration: 0.4 }, "+=0.4");
  }, props);

  return (
    <Screen label="WhatsApp + sistema">
      <div
        ref={root}
        className="grid h-full grid-rows-[1fr_auto] gap-3 p-3 sm:grid-cols-[1fr_1.1fr] sm:grid-rows-1 sm:gap-4 sm:p-4"
      >
        <div className="flex flex-col gap-2 rounded-xl bg-bg p-3 text-[11px] leading-snug">
          <p className="text-[10px] tracking-widest text-text-muted">
            CLIENTE · WHATSAPP
          </p>
          <p className="msg max-w-[85%] self-start rounded-lg rounded-tl-none bg-white/10 px-2.5 py-1.5 text-cream">
            Oi! Vocês têm cabo CAT6, caixa de 305 m?
          </p>
          <p className="typing self-end px-2 text-text-muted">digitando…</p>
          <p className="msg max-w-[85%] self-end rounded-lg rounded-tr-none bg-amber px-2.5 py-1.5 text-graphite">
            Temos 42 caixas, R$ 689 cada. Quer que eu separe?
          </p>
          <p className="msg max-w-[85%] self-start rounded-lg rounded-tl-none bg-white/10 px-2.5 py-1.5 text-cream">
            Quero 3, por favor.
          </p>
          <p className="msg max-w-[85%] self-end rounded-lg rounded-tr-none bg-amber px-2.5 py-1.5 text-graphite">
            <Check size={12} className="mr-1 inline" aria-hidden="true" />
            Pedido #1042 criado. Entrega amanhã.
          </p>
        </div>
        <div className="relative flex flex-col gap-2 rounded-xl bg-cream p-3 text-graphite">
          <strong className="text-sm">Pedidos de hoje</strong>
          <div className="new-order flex justify-between rounded-md border-2 border-amber bg-white px-2 py-1.5 text-[11px] font-semibold">
            <span>#1042 · 3x Cabo CAT6</span>
            <span>R$ 2.067</span>
          </div>
          {orders.map((o, i) => (
            <div
              key={o.id}
              className={`justify-between rounded-md bg-white px-2 py-1.5 text-[11px] ${i === 2 ? "hidden sm:flex" : "flex"}`}
            >
              <span>
                {o.id} · {o.item}
              </span>
              <span>{o.value}</span>
            </div>
          ))}
          <div className="toast absolute right-3 bottom-3 left-3 rounded-lg bg-graphite px-3 py-2 text-[11px] text-cream">
            Equipe de separação avisada
          </div>
        </div>
      </div>
    </Screen>
  );
}
