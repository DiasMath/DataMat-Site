import { useCallback, useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import { Link } from "react-router-dom";
import { SOLUTIONS, WHATSAPP_LINK } from "@/lib/site";

const navLinks = [
  { label: "Soluções", href: "/#solucoes" },
  { label: "Cases", href: "/cases", isRoute: true },
  { label: "Sobre", href: "/#como-trabalhamos" },
  { label: "Contato", href: "/#contato" },
];

const Header = () => {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = useCallback(() => setOpen(false), []);

  const linkClass =
    "font-sans text-sm font-medium text-muted-foreground transition-colors hover:text-foreground";

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${
        scrolled ? "border-b border-border bg-background/80 backdrop-blur-md" : "bg-transparent"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 md:px-12">
        <Link to="/" className="font-display text-xl font-extrabold tracking-tight text-foreground">
          DATA<span className="text-primary">MAT</span>
        </Link>

        <nav className="hidden items-center gap-9 md:flex" aria-label="Navegação principal">
          {navLinks.map((l) =>
            l.isRoute ? (
              <Link key={l.href} to={l.href} className={linkClass}>
                {l.label}
              </Link>
            ) : (
              <a key={l.href} href={l.href} className={linkClass}>
                {l.label}
              </a>
            ),
          )}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-xl bg-primary px-5 py-2.5 font-sans text-sm font-semibold text-primary-foreground transition-colors duration-300 hover:bg-secondary"
          >
            Fale com um especialista
          </a>
        </nav>

        <button
          className="text-foreground md:hidden"
          onClick={() => setOpen((v) => !v)}
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? "Fechar menu" : "Abrir menu"}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 top-0 z-40 flex flex-col bg-background px-6 pb-10 pt-24 md:hidden"
          >
            <nav className="flex flex-col gap-6" aria-label="Menu mobile">
              {navLinks.map((l) =>
                l.isRoute ? (
                  <Link key={l.href} to={l.href} onClick={close} className="font-display text-3xl font-bold">
                    {l.label}
                  </Link>
                ) : (
                  <a key={l.href} href={l.href} onClick={close} className="font-display text-3xl font-bold">
                    {l.label}
                  </a>
                ),
              )}
              <div className="mt-2 flex flex-col gap-3 border-t border-border pt-6">
                {SOLUTIONS.map((s) => (
                  <Link
                    key={s.slug}
                    to={`/solucoes/${s.slug}`}
                    onClick={close}
                    className="text-sm text-muted-foreground"
                  >
                    {s.label}
                  </Link>
                ))}
              </div>
            </nav>

            <a
              href={WHATSAPP_LINK}
              target="_blank"
              rel="noopener noreferrer"
              onClick={close}
              className="mt-auto rounded-xl bg-primary px-6 py-4 text-center font-sans font-semibold text-primary-foreground"
            >
              Fale com um especialista
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
