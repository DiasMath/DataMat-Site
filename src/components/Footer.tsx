import { Link } from "react-router-dom";
import {
  ArrowUp,
  ArrowUpRight,
  Instagram,
  Linkedin,
  MapPin,
} from "lucide-react";
import { contact } from "../content/contact";
import { whatsappDisplay, whatsappUrl } from "../data/site";
import { menuSolutions } from "../content/navigation";
import { ContactButton } from "./Header";
import { DatamatSymbol } from "./DatamatSymbol";
import { scrollToTop } from "../motion/scroll";

const company = [
  { label: "Sobre", to: "/sobre" },
  { label: "Cases", to: "/cases" },
  { label: "Demonstrações", to: "/#demonstracoes" },
  { label: "Contato", to: "/contato" },
];

const linkClass =
  "group inline-flex items-center gap-1 text-cream/80 transition hover:text-amber";

/** Ícone do WhatsApp (o lucide não tem a marca). */
function WhatsAppIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      width={18}
      height={18}
      fill="currentColor"
      aria-hidden="true"
    >
      <path d="M17.47 14.38c-.3-.15-1.75-.86-2.02-.96-.27-.1-.47-.15-.67.15-.2.3-.77.96-.94 1.16-.17.2-.35.22-.64.07-.3-.15-1.26-.46-2.4-1.48-.89-.79-1.48-1.77-1.66-2.07-.17-.3-.02-.46.13-.6.13-.14.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.03-.52-.07-.15-.67-1.6-.92-2.2-.24-.58-.49-.5-.67-.51h-.57c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.07 2.88 1.21 3.08.15.2 2.1 3.2 5.08 4.49.71.31 1.26.49 1.7.63.71.22 1.36.19 1.87.12.57-.09 1.75-.72 2-1.41.25-.69.25-1.29.17-1.41-.07-.12-.27-.2-.57-.35M12.05 21.5h-.01a9.4 9.4 0 0 1-4.8-1.31l-.34-.2-3.56.93.95-3.47-.22-.36a9.4 9.4 0 0 1-1.44-5.01c0-5.2 4.23-9.43 9.43-9.43 2.52 0 4.89.98 6.67 2.77a9.36 9.36 0 0 1 2.76 6.67c0 5.2-4.23 9.42-9.43 9.42m8.02-17.45A11.3 11.3 0 0 0 12.04.75C5.8.75.72 5.83.72 12.08c0 2 .52 3.95 1.52 5.66L.62 23.25l5.64-1.48a11.3 11.3 0 0 0 5.78 1.47h.01c6.24 0 11.33-5.08 11.33-11.33 0-3.03-1.18-5.87-3.31-8.01" />
    </svg>
  );
}

const social = [
  { href: whatsappUrl, label: "WhatsApp da DATAMAT", icon: <WhatsAppIcon /> },
  {
    href: contact.instagram,
    label: "Instagram da DATAMAT",
    icon: <Instagram size={18} aria-hidden="true" />,
  },
  {
    href: contact.linkedin,
    label: "LinkedIn da DATAMAT",
    icon: <Linkedin size={18} aria-hidden="true" />,
  },
].filter((s) => s.href);

/**
 * Rodapé grande: à esquerda a frase da marca e o botão de contato; à direita
 * os contatos diretos em tamanho de leitura (telefone e e-mail inteiros,
 * clicáveis); embaixo a navegação e, na base, a palavra DATAMAT cortada.
 */
export function Footer() {
  const hasDirect = Boolean(whatsappDisplay || contact.email || contact.city);
  return (
    <footer className="relative overflow-hidden border-t border-white/10 bg-bg-hero text-cream">
      <div className="mx-auto max-w-screen-2xl px-5 pt-20 md:px-8 md:pt-28">
        {/* Topo: marca + contato direto */}
        <div className="grid gap-14 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-20">
          <div>
            <DatamatSymbol className="h-14 w-auto text-amber" />
            <p className="mt-8 max-w-xl text-4xl leading-[1.08] font-semibold tracking-tight md:text-5xl">
              Clareza para decidir.{" "}
              <span className="text-text-muted">Estrutura para fazer.</span>
            </p>
            <ContactButton className="mt-10" />
          </div>

          {(hasDirect || social.length > 0) && (
            <div className="rounded-3xl border border-white/10 bg-white/[0.03] p-6 md:p-8">
              <h2 className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber">
                <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
                FALE DIRETO
              </h2>
              <dl className="mt-6 grid gap-5">
                {whatsappDisplay && (
                  <div>
                    <dt className="text-xs text-text-muted">WhatsApp</dt>
                    <dd>
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-xl font-semibold whitespace-nowrap tabular-nums transition hover:text-amber md:text-2xl"
                      >
                        {whatsappDisplay}
                      </a>
                    </dd>
                  </div>
                )}
                {contact.email && (
                  <div>
                    <dt className="text-xs text-text-muted">E-mail</dt>
                    <dd>
                      <a
                        href={`mailto:${contact.email}`}
                        className="text-xl font-semibold [overflow-wrap:anywhere] transition hover:text-amber md:text-2xl"
                      >
                        {contact.email}
                      </a>
                    </dd>
                  </div>
                )}
                {contact.city && (
                  <div>
                    <dt className="text-xs text-text-muted">Onde estamos</dt>
                    <dd className="mt-0.5 inline-flex items-center gap-1.5 text-cream/85">
                      <MapPin
                        size={16}
                        aria-hidden="true"
                        className="text-amber"
                      />
                      {contact.city}
                    </dd>
                  </div>
                )}
              </dl>
              {social.length > 0 && (
                <div className="mt-6 flex gap-2 border-t border-white/10 pt-6">
                  {social.map((s) => (
                    <a
                      key={s.label}
                      href={s.href}
                      target="_blank"
                      rel="noreferrer"
                      aria-label={s.label}
                      className="flex size-11 items-center justify-center rounded-full border border-white/15 transition hover:-translate-y-0.5 hover:border-amber hover:bg-amber hover:text-graphite"
                    >
                      {s.icon}
                    </a>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Navegação */}
        <nav
          aria-label="Rodapé"
          className="mt-16 grid grid-cols-2 gap-10 border-t border-white/10 pt-12 sm:grid-cols-[repeat(3,minmax(0,14rem))] md:mt-20"
        >
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
                  Privacidade e LGPD
                </Link>
              </li>
              <li>
                <Link to="/privacidade#direitos" className={linkClass}>
                  Seus direitos
                </Link>
              </li>
              <li>
                <Link to="/privacidade#seguranca" className={linkClass}>
                  Segurança dos dados
                </Link>
              </li>
            </ul>
          </div>
        </nav>

        <div className="mt-16 flex flex-wrap items-center justify-between gap-4 border-t border-white/10 py-6 text-sm text-text-muted">
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
