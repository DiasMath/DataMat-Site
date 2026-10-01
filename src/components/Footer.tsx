import { Link } from "react-router-dom";
import { ArrowUp, ArrowUpRight } from "lucide-react";
import { menuSolutions } from "../content/navigation";
import { ContactButton } from "./Header";
import { DatamatSymbol } from "./DatamatSymbol";

const company = [
  { label: "Sobre", to: "/sobre" },
  { label: "Cases", to: "/cases" },
  { label: "Contato", to: "/contato" },
];

const linkClass =
  "group inline-flex items-center gap-1 text-cream/80 transition hover:text-amber";

/** Rodapé grande: frase da marca, links, contato e a palavra DATAMAT gigante. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bg-hero text-cream">
      <div className="mx-auto max-w-screen-2xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,6fr)_minmax(0,6fr)]">
          <div>
            <DatamatSymbol className="h-14 w-auto text-amber" />
            <p className="mt-8 max-w-xl text-4xl leading-[1.08] font-semibold tracking-tight md:text-5xl">
              Clareza para decidir.{" "}
              <span className="text-text-muted">Estrutura para fazer.</span>
            </p>
            <ContactButton className="mt-10" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3">
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-amber">
                SOLUÇÕES
              </h3>
              <ul className="mt-5 space-y-3">
                {menuSolutions.map((s) => (
                  <li key={s.path}>
                    <Link to={s.path} className={linkClass}>
                      {s.title}
                      <ArrowUpRight
                        size={14}
                        aria-hidden="true"
                        className="opacity-0 transition group-hover:opacity-100"
                      />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-amber">
                EMPRESA
              </h3>
              <ul className="mt-5 space-y-3">
                {company.map((l) => (
                  <li key={l.to}>
                    <Link to={l.to} className={linkClass}>
                      {l.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="text-xs font-semibold tracking-widest text-amber">
                LEGAL
              </h3>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link to="/privacidade" className={linkClass}>
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-text-muted">
          <span>© 2026 DATAMAT · Inteligência para negócios</span>
          <button
            type="button"
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="inline-flex items-center gap-2 transition hover:text-amber"
          >
            Voltar ao topo <ArrowUp size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Palavra gigante, cortada na base, entrando letra por letra */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.48em] flex justify-center px-2 text-[19.5vw] leading-none font-bold tracking-tighter text-white/[0.06] select-none"
        data-reveal
        data-stagger="0.06"
      >
        {"DATAMAT".split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </p>
    </footer>
  );
}
