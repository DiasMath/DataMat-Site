import { useState, useCallback } from "react";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Link, useNavigate, useLocation } from "react-router-dom";

interface NavLinkItem {
  label: string;
  href: string;
  isRoute?: boolean;
}

const navLinks: NavLinkItem[] = [
  { label: "Sobre Nós", href: "#sobre" },
  { label: "Valores", href: "#valores" },
  { label: "Clientes", href: "#clientes" },
  { label: "Demonstração", href: "/demonstracao", isRoute: true },
];

const WHATSAPP_LINK = "https://wa.me/5521996101868?text=Olá,%20gostaria%20de%20saber%20mais%20sobre%20os%20serviços%20da%20DATAMAT";

const Header = () => {
  const [open, setOpen] = useState(false);

  const toggleMenu = useCallback(() => {
    setOpen((prev) => !prev);
  }, []);

  const closeMenu = useCallback(() => {
    setOpen(false);
  }, []);

  const isValidHashLink = (href: string): boolean => {
    return href.startsWith("#") && href.length > 1;
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 md:px-12 py-4">
      <Link to="/" className="flex items-end gap-3" aria-label="DataMat - Página Inicial">
        <span className="text-2xl font-extrabold tracking-tight text-foreground">
          DATA<span className="text-primary">MAT</span>
        </span>
      </Link>

        <nav className="hidden md:flex items-center gap-8" role="navigation" aria-label="Navegação principal">
          {navLinks.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
          <a
            href={WHATSAPP_LINK}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold hover:brightness-110 transition-all"
          >
            Fale Conosco
          </a>
        </nav>

        <button 
          className="md:hidden text-foreground" 
          onClick={toggleMenu}
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
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="md:hidden overflow-hidden bg-background border-b border-border"
          >
            <nav className="flex flex-col gap-4 px-6 py-6" role="navigation" aria-label="Menu mobile">
              {navLinks.map((l) => (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={closeMenu}
                  className="text-base font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  {l.label}
                </a>
              ))}
              <a
                href="#contato"
                onClick={closeMenu}
                className="mt-2 px-5 py-2.5 rounded-lg bg-primary text-primary-foreground text-sm font-semibold text-center hover:brightness-110 transition-all"
              >
                Fale Conosco
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;
