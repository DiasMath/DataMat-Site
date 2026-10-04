import { useState } from "react";
import { useInView } from "../scenes/useInView";
import { ArrowUpRight, Plus } from "lucide-react";
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
  // Detalhes em âmbar entram de leve quando a seção aparece (como no "Quem é").
  const [ref, on] = useInView<HTMLElement>(0.25);

  return (
    <section
      ref={ref}
      id="perguntas"
      className="flex min-h-svh items-center bg-cream py-20 text-graphite md:py-28"
    >
      <div className="mx-auto grid w-full max-w-screen-2xl gap-10 px-5 md:px-8 xl:grid-cols-[minmax(0,4fr)_minmax(0,8fr)] xl:gap-16">
        <div data-reveal>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-graphite/75">
            <span
              aria-hidden="true"
              className={`h-0.5 bg-amber transition-all duration-700 ease-brand-out ${on ? "w-8" : "w-0"}`}
            />
            PERGUNTAS FREQUENTES
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-semibold tracking-tight md:text-5xl">
            Antes de conversar,{" "}
            <span
              className={`bg-gradient-to-r from-amber/70 to-amber/70 bg-left-bottom bg-no-repeat box-decoration-clone transition-[background-size] delay-300 duration-[1400ms] ease-brand-out ${on ? "bg-[length:100%_0.3em]" : "bg-[length:0%_0.3em]"}`}
            >
              o que costumam perguntar.
            </span>
          </h2>
          <p className="mt-5 max-w-md text-lg text-graphite/70">
            Ficou alguma dúvida? Pergunte direto pelo WhatsApp.
          </p>
          <ContactAction
            message="Olá! Vim pelo site da DATAMAT e tenho uma dúvida."
            className="group mt-6 inline-flex items-center gap-2 border-b-2 border-amber pb-1 font-semibold transition hover:text-graphite/70"
          >
            Tirar uma dúvida
            <span className="flex size-7 items-center justify-center rounded-full bg-amber transition duration-500 ease-brand-out group-hover:rotate-45">
              <ArrowUpRight size={15} aria-hidden="true" />
            </span>
          </ContactAction>
        </div>

        <ul className="border-t-2 border-graphite/15" data-reveal>
          {faq.map(({ q, a }, i) => {
            const isOpen = open === i;
            const id = `faq-${i}`;
            return (
              <li key={q} className="relative border-b border-graphite/15">
                {/* linha âmbar na pergunta aberta */}
                <span
                  aria-hidden="true"
                  className={`absolute -bottom-px left-0 h-0.5 w-full origin-left bg-amber transition-transform duration-700 ease-brand-out ${isOpen ? "scale-x-100" : "scale-x-0"}`}
                />
                <h3>
                  <button
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={id}
                    onClick={() => setOpen(isOpen ? null : i)}
                    className="group flex w-full items-center justify-between gap-6 py-5 text-left md:py-6"
                  >
                    <span
                      className={`text-lg font-semibold transition-colors md:text-xl ${isOpen ? "text-graphite" : "text-graphite/80 group-hover:text-graphite"}`}
                    >
                      {q}
                    </span>
                    <span
                      className={`flex size-9 shrink-0 items-center justify-center rounded-full border transition duration-500 ease-brand-out ${isOpen ? "rotate-45 border-amber bg-amber text-graphite" : "border-graphite/20 text-graphite group-hover:border-amber group-hover:bg-amber/20"}`}
                    >
                      <Plus size={18} aria-hidden="true" />
                    </span>
                  </button>
                </h3>
                <div
                  id={id}
                  className={`grid transition-[grid-template-rows,opacity] duration-500 ease-brand-out ${isOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
                >
                  <p className="min-h-0 max-w-2xl overflow-hidden pr-12 text-base leading-relaxed text-graphite/75 md:text-lg">
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
