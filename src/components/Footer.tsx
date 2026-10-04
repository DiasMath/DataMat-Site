import { Link } from "react-router-dom";
import {
  ArrowUp,
  ArrowUpRight,
  Instagram,
  Linkedin,
  Mail,
  MapPin,
  MessageCircle,
} from "lucide-react";
import { contact } from "../content/contact";
import { whatsappUrl } from "../data/site";
import { menuSolutions } from "../content/navigation";
import { ContactButton } from "./Header";
import { DatamatSymbol } from "./DatamatSymbol";
import { scrollToTop } from "../motion/scroll";

const company = [
  { label: "Sobre", to: "/sobre" },
  { label: "Cases", to: "/cases" },
  { label: "Contato", to: "/contato" },
];

const linkClass =
  "group inline-flex items-center gap-1 text-cream/80 transition hover:text-amber";

const hasContact = Boolean(
  whatsappUrl ||
  contact.email ||
  contact.city ||
  contact.instagram ||
  contact.linkedin,
);

/** Rodapé grande: frase da marca, links, contato e a palavra DATAMAT gigante. */
export function Footer() {
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bg-hero text-cream">
      <div className="mx-auto max-w-screen-2xl px-5 pt-20 md:px-8 md:pt-28">
        <div className="grid gap-14 lg:grid-cols-[minmax(0,4fr)_minmax(0,8fr)]">
          <div>
            <DatamatSymbol className="h-14 w-auto text-amber" />
            <p className="mt-8 max-w-xl text-4xl leading-[1.08] font-semibold tracking-tight md:text-5xl">
              Clareza para decidir.{" "}
              <span className="text-text-muted">Estrutura para fazer.</span>
            </p>
            <ContactButton className="mt-10" />
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-4">
            <div>
              <h2 className="text-xs font-semibold tracking-widest text-amber">
                SOLUÇÕES
              </h2>
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
              <h2 className="text-xs font-semibold tracking-widest text-amber">
                EMPRESA
              </h2>
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
              <h2 className="text-xs font-semibold tracking-widest text-amber">
                LEGAL
              </h2>
              <ul className="mt-5 space-y-3">
                <li>
                  <Link to="/privacidade" className={linkClass}>
                    Privacidade
                  </Link>
                </li>
              </ul>
            </div>
            {hasContact && (
              <div>
                <h2 className="text-xs font-semibold tracking-widest text-amber">
                  CONTATO
                </h2>
                <ul className="mt-5 space-y-3">
                  {whatsappUrl && (
                    <li>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className={linkClass}
                      >
                        <MessageCircle
                          size={16}
                          aria-hidden="true"
                          className="text-amber"
                        />
                        WhatsApp
                      </a>
                    </li>
                  )}
                  {contact.email && (
                    <li>
                      <a
                        href={`mailto:${contact.email}`}
                        className={`${linkClass} break-all`}
                      >
                        <Mail
                          size={16}
                          aria-hidden="true"
                          className="shrink-0 text-amber"
                        />
                        {contact.email}
                      </a>
                    </li>
                  )}
                  {contact.city && (
                    <li className="inline-flex items-center gap-1 text-cream/80">
                      <MapPin
                        size={16}
                        aria-hidden="true"
                        className="text-amber"
                      />
                      {contact.city}
                    </li>
                  )}
                </ul>
                {(contact.instagram || contact.linkedin) && (
                  <div className="mt-5 flex gap-2">
                    {contact.instagram && (
                      <a
                        href={contact.instagram}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="Instagram da DATAMAT"
                        className="flex size-10 items-center justify-center rounded-full border border-white/15 transition hover:border-amber hover:bg-amber hover:text-graphite"
                      >
                        <Instagram size={18} aria-hidden="true" />
                      </a>
                    )}
                    {contact.linkedin && (
                      <a
                        href={contact.linkedin}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="LinkedIn da DATAMAT"
                        className="flex size-10 items-center justify-center rounded-full border border-white/15 transition hover:border-amber hover:bg-amber hover:text-graphite"
                      >
                        <Linkedin size={18} aria-hidden="true" />
                      </a>
                    )}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>

        <div className="mt-20 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-text-muted">
          <span>
            © 2026 {contact.legalName || "DATAMAT"}
            {contact.cnpj && ` · CNPJ ${contact.cnpj}`} · Inteligência para
            negócios
          </span>
          <button
            type="button"
            onClick={scrollToTop}
            className="inline-flex items-center gap-2 transition hover:text-amber"
          >
            Voltar ao topo <ArrowUp size={15} aria-hidden="true" />
          </button>
        </div>
      </div>

      {/* Palavra gigante, cortada ao meio na base */}
      <p
        aria-hidden="true"
        className="pointer-events-none -mb-[0.48em] flex justify-center px-2 text-[19.5vw] leading-none font-bold tracking-tighter text-white/[0.06] select-none"
      >
        {"DATAMAT".split("").map((letter, i) => (
          <span key={i}>{letter}</span>
        ))}
      </p>
    </footer>
  );
}
