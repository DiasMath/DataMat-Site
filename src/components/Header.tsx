import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import logo from "../assets/brand/datamat-horizontal.svg";
import { menuLinks, menuSolutions } from "../content/navigation";
import { ContactAction } from "./contact";
import { contact } from "../content/contact";
import { scrollToTop } from "../motion/scroll";

/** Botão principal de contato: pílula âmbar com seta que gira no hover. */
export function ContactButton({ className = "" }: { className?: string }) {
  return (
    <ContactAction
      className={`group relative inline-flex items-center gap-3 overflow-hidden rounded-full bg-amber py-2 pr-2 pl-5 text-sm font-semibold text-graphite shadow-[0_0_0_0_var(--color-amber)] transition-all duration-300 hover:shadow-[0_0_28px_-4px_var(--color-amber)] active:scale-[0.97] ${className}`}
    >
      <span
        aria-hidden="true"
        className="absolute inset-0 -translate-x-full bg-cream transition-transform duration-500 ease-brand-out group-hover:translate-x-0"
      />
      {/* Brilho que atravessa o botão de tempos em tempos (some no hover) */}
      <span
        aria-hidden="true"
        className="pointer-events-none absolute inset-y-0 left-0 w-1/3 animate-shine bg-gradient-to-r from-transparent via-white/60 to-transparent group-hover:opacity-0"
      />
      <span className="relative">Fale conosco</span>
      <span className="relative flex size-8 items-center justify-center rounded-full bg-graphite text-amber transition-transform duration-500 ease-brand-out group-hover:rotate-45">
        <ArrowUpRight
          size={16}
          aria-hidden="true"
          className="animate-nudge group-hover:animate-none"
        />
      </span>
    </ContactAction>
  );
}

const linkClass = ({ isActive }: { isActive: boolean }) =>
  `relative py-2 text-sm font-medium transition-colors hover:text-amber after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-amber after:transition-transform after:duration-300 ${isActive ? "text-cream after:scale-x-100" : "text-cream/80 after:scale-x-0 hover:after:scale-x-100"}`;

export function Header() {
  const [open, setOpen] = useState(false);
  const [menu, setMenu] = useState(false);
  const [solutionsOpen, setSolutionsOpen] = useState(false);
  const closeTimer = useRef(0);
  const progressBar = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();

  useEffect(() => {
    setOpen(false);
    setMenu(false);
  }, [pathname, hash]);
  useEffect(() => {
    if (!open) setSolutionsOpen(false);
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenu(false);
        setOpen(false);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  // Barra de progresso: escreve direto no DOM, sem re-renderizar o header a cada scroll.
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      const distance =
        document.documentElement.scrollHeight - window.innerHeight;
      const progress = distance > 0 ? window.scrollY / distance : 0;
      if (progressBar.current)
        progressBar.current.style.transform = `scaleX(${progress})`;
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [pathname]);

  // Abre no hover com um pequeno atraso para fechar (não some ao atravessar o vão).
  const openMenu = () => {
    window.clearTimeout(closeTimer.current);
    setMenu(true);
  };
  const closeMenu = () => {
    closeTimer.current = window.setTimeout(() => setMenu(false), 160);
  };

  return (
    <header className="fixed inset-x-0 top-0 z-50 border-b border-white/10 bg-bg-hero/90 text-cream backdrop-blur-xl">
      <div className="mx-auto flex h-header max-w-7xl items-center px-5 max-[800px]:h-header-mobile md:px-8">
        <Link
          to="/"
          aria-label="DATAMAT, início"
          className="shrink-0"
          onClick={(event) => {
            // Já na home: em vez de recarregar, sobe suavemente até o topo.
            if (pathname === "/") {
              event.preventDefault();
              setOpen(false);
              if (hash) window.history.replaceState(null, "", "/");
              scrollToTop();
            }
          }}
        >
          <img
            src={logo}
            alt="DATAMAT"
            width={218}
            height={60}
            className="h-12 w-auto max-[800px]:h-10"
          />
        </Link>

        <nav
          aria-label="Navegação principal"
          className="ml-auto hidden items-center gap-9 min-[801px]:flex"
        >
          <div
            className="relative"
            onMouseEnter={openMenu}
            onMouseLeave={closeMenu}
          >
            <button
              type="button"
              onClick={() => setMenu((v) => !v)}
              aria-expanded={menu}
              aria-controls="menu-solucoes"
              className="flex items-center gap-1.5 py-2 text-sm font-medium text-cream/80 transition-colors hover:text-amber aria-expanded:text-amber"
            >
              Soluções
              <ChevronDown
                size={15}
                aria-hidden="true"
                className={`transition-transform duration-300 ${menu ? "rotate-180" : ""}`}
              />
            </button>

            {/* Painel compacto, ancorado no botão (com um vão invisível para o mouse atravessar) */}
            <div
              id="menu-solucoes"
              className={`absolute top-full left-1/2 w-[34rem] -translate-x-1/2 pt-4 max-xl:fixed max-xl:top-header max-xl:right-4 max-xl:left-auto max-xl:translate-x-0 transition duration-300 ease-brand-out ${menu ? "visible translate-y-0 opacity-100" : "invisible -translate-y-2 opacity-0"}`}
            >
              <div className="relative rounded-3xl border border-white/10 bg-graphite p-3 shadow-2xl shadow-black/60">
                <span
                  aria-hidden="true"
                  className="absolute -top-1.5 left-1/2 size-3 -translate-x-1/2 rotate-45 border-t border-l border-white/10 bg-graphite"
                />
                <p className="px-3 pt-2 pb-3 text-xs font-semibold tracking-widest text-text-muted">
                  O QUE A DATAMAT FAZ
                </p>
                <ul className="grid grid-cols-2 gap-1">
                  {menuSolutions.map(
                    ({ title, path, description, icon: Icon }) => (
                      <li key={path}>
                        <Link
                          to={path}
                          className="group flex h-full flex-col gap-3 rounded-2xl p-4 transition hover:bg-gradient-to-br hover:from-amber/15 hover:to-transparent"
                        >
                          <span className="flex size-10 items-center justify-center rounded-xl bg-white/5 text-amber ring-1 ring-white/10 transition group-hover:bg-amber group-hover:text-graphite group-hover:ring-amber">
                            <Icon size={19} aria-hidden="true" />
                          </span>
                          <span>
                            <span className="flex items-center gap-1 font-semibold text-cream">
                              {title}
                              <ArrowUpRight
                                size={14}
                                aria-hidden="true"
                                className="-translate-x-1 opacity-0 transition group-hover:translate-x-0 group-hover:opacity-100"
                              />
                            </span>
                            <span className="mt-1 block text-sm leading-snug text-text-muted">
                              {description}
                            </span>
                          </span>
                        </Link>
                      </li>
                    ),
                  )}
                </ul>
              </div>
            </div>
          </div>

          {menuLinks.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              end
              // Links para âncoras (#) nunca ficam marcados como página atual.
              className={({ isActive }) =>
                linkClass({ isActive: isActive && !l.to.includes("#") })
              }
            >
              {l.label}
            </NavLink>
          ))}

          {contact.portal && (
            <a
              href={contact.portal}
              target="_blank"
              rel="noreferrer"
              className="text-sm font-medium text-cream/80 transition-colors hover:text-amber"
            >
              Área do cliente
            </a>
          )}

          <ContactButton className="ml-2" />
        </nav>

        <button
          type="button"
          className="menu-toggle ml-auto flex size-11 items-center justify-center rounded-full text-cream transition hover:bg-white/10 min-[801px]:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          <span className="relative size-6">
            <Menu
              aria-hidden="true"
              className={`absolute inset-0 transition duration-300 ${open ? "scale-50 rotate-90 opacity-0" : ""}`}
            />
            <X
              aria-hidden="true"
              className={`absolute inset-0 transition duration-300 ${open ? "" : "scale-50 -rotate-90 opacity-0"}`}
            />
          </span>
        </button>
      </div>

      {/* Menu do celular: abre e fecha deslizando (altura animada). */}
      <div
        className={`grid transition-[grid-template-rows,opacity] duration-500 ease-brand-out min-[801px]:hidden ${open ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <nav
            aria-label="Navegação mobile"
            className="max-h-[calc(100svh-var(--spacing-header-mobile))] overflow-y-auto border-t border-white/10 bg-bg-hero px-5 pt-3 pb-8"
            onClick={(event) => {
              if ((event.target as Element).closest("a")) setOpen(false);
            }}
          >
            <button
              type="button"
              onClick={() => setSolutionsOpen((v) => !v)}
              aria-expanded={solutionsOpen}
              aria-controls="menu-mobile-solucoes"
              className="flex w-full items-center justify-between py-3 text-lg font-semibold text-cream"
            >
              Soluções
              <ChevronDown
                size={20}
                aria-hidden="true"
                className={`text-amber transition-transform duration-500 ease-brand-out ${solutionsOpen ? "rotate-180" : ""}`}
              />
            </button>
            <div
              id="menu-mobile-solucoes"
              className={`grid transition-[grid-template-rows,opacity] duration-500 ease-brand-out ${solutionsOpen ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"}`}
              inert={!solutionsOpen}
            >
              <ul className="grid min-h-0 gap-1 overflow-hidden">
                {menuSolutions.map(
                  ({ title, path, description, icon: Icon }) => (
                    <li key={path}>
                      <Link
                        to={path}
                        className="flex gap-3 rounded-xl p-3 transition active:bg-white/5"
                      >
                        <Icon
                          size={20}
                          className="mt-0.5 text-amber"
                          aria-hidden="true"
                        />
                        <span>
                          <span className="block font-semibold text-cream">
                            {title}
                          </span>
                          <span className="text-sm text-text-muted">
                            {description}
                          </span>
                        </span>
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            </div>
            <ul className="mt-2 grid border-t border-white/10 pt-2">
              {menuLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="block py-3 text-lg font-semibold text-cream transition hover:text-amber"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
            {contact.portal && (
              <a
                href={contact.portal}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block py-3 text-lg font-semibold text-cream"
              >
                Área do cliente
              </a>
            )}
            <ContactButton className="mt-6" />
          </nav>
        </div>
      </div>

      <div
        ref={progressBar}
        className="absolute inset-x-0 bottom-0 h-0.5 origin-left bg-amber"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />
    </header>
  );
}
