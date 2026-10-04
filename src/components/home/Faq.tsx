import { useState } from "react";
import { Plus } from "lucide-react";
import { faq } from "../../content/faq";
import { ContactAction } from "../contact";

/** Dados estruturados (FAQPage) para buscadores e assistentes de IA. */
const schema = JSON.stringify({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faq.map(({ q, a }) => ({
    "@type": "Question",
    name: q,
    acceptedAnswer: { "@type": "Answer", text: a },
  })),
});

/**
 * Perguntas frequentes: lista simples que abre e fecha suavemente, uma
 * resposta por vez. Sem animação contínua.
 */
export function Faq() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="perguntas" className="bg-bg py-20 md:py-28">
      <div className="mx-auto grid max-w-screen-2xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] lg:gap-16">
        <div data-reveal>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber">
            <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
            PERGUNTAS FREQUENTES
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-semibold tracking-tight text-cream md:text-5xl">
            Antes de conversar, o que costumam perguntar.
          </h2>
          <p className="mt-5 max-w-sm text-lg text-text-muted">
            Ficou alguma dúvida? Pergunte direto pelo WhatsApp.
          </p>
          <ContactAction
            message="Olá! Vim pelo site da DATAMAT e tenho uma dúvida."
            className="group mt-6 inline-flex items-center gap-2 border-b-2 border-amber pb-1 font-semibold text-cream transition hover:text-amber"
          >
            Tirar uma dúvida
          </ContactAction>
        </div>

        <ul className="border-t border-white/10" data-reveal>
          {faq.map(({ q, a }, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <li key={q} className="border-b border-white/10">
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
                  >
                    <span
                      className={`text-lg font-semibold transition-colors md:text-xl ${isOpen ? "text-amber" : "text-cream group-hover:text-amber"}`}
                    >
                      {q}
                    </span>
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition duration-500 ease-brand-out ${isOpen ? "rotate-45 border-amber bg-amber text-graphite" : "border-white/15 text-cream group-hover:border-amber"}`}
                    >
                      <Plus size={18} aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div
                  id={id}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-brand-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="min-h-0 max-w-2xl overflow-hidden pr-12 text-base leading-relaxed text-text-muted md:text-lg">
                    <span className="block pb-6">{a}</span>
                  </p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
      <script
        type="application/ld+json"
        // conteúdo gerado a partir de src/content/faq.ts (sem dados do usuário)
        dangerouslySetInnerHTML={{ __html: schema }}
      />
    </section>
  );
}
