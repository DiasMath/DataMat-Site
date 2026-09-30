import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { ArrowUpRight, ChevronDown, Menu, X } from "lucide-react";
import logo from "../assets/brand/datamat-horizontal.svg";
import { solutions } from "../data/site";
import { Container } from "./ui";
import { ContactAction } from "./contact";

export function Header() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const progressBar = useRef<HTMLDivElement>(null);
  const { pathname, hash } = useLocation();
  useEffect(() => {
    setOpen(false);
    setDropdown(false);
  }, [pathname, hash]);
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
  return (
    <header className="site-header">
      <Container className="header-inner">
        <Link to="/" className="logo-box" aria-label="DATAMAT, início">
          <img src={logo} alt="DATAMAT" />
        </Link>
        <nav className="desktop-nav" aria-label="Navegação principal">
          <div
            className="nav-dropdown"
            onMouseEnter={() => setDropdown(true)}
            onMouseLeave={() => setDropdown(false)}
          >
            <button
              onClick={() => setDropdown((v) => !v)}
              aria-expanded={dropdown}
              aria-controls="solutions-menu"
            >
              Soluções <ChevronDown size={14} />
            </button>
            {dropdown && (
              <div className="dropdown-panel" id="solutions-menu">
                {solutions.map((s) => (
                  <Link key={s.key} to={s.path}>
                    <span>{s.number}</span>
                    {s.title}
                    <ArrowUpRight size={15} />
                  </Link>
                ))}
              </div>
            )}
          </div>
          <NavLink to="/#demonstracoes">Demonstrações</NavLink>
          <NavLink to="/sobre">Sobre</NavLink>
        </nav>
        <ContactAction className="header-cta">
          Falar com a DATAMAT <ArrowUpRight size={16} />
        </ContactAction>
        <button
          className="menu-toggle"
          onClick={() => setOpen((v) => !v)}
          aria-label={open ? "Fechar menu" : "Abrir menu"}
          aria-expanded={open}
        >
          {open ? <X /> : <Menu />}
        </button>
      </Container>
      {open && (
        <nav
          className="mobile-nav"
          aria-label="Navegação mobile"
          onClick={(event) => {
            if ((event.target as Element).closest("a, button")) setOpen(false);
          }}
        >
          <span className="mobile-nav-label">Soluções</span>
          {solutions.map((s) => (
            <Link key={s.key} to={s.path}>
              {s.title}
              <ArrowUpRight size={16} />
            </Link>
          ))}
          <Link to="/#demonstracoes">Demonstrações</Link>
          <Link to="/sobre">Sobre</Link>
          <ContactAction className="mobile-contact">
            Falar com a DATAMAT <ArrowUpRight size={16} />
          </ContactAction>
        </nav>
      )}
      <div
        ref={progressBar}
        className="scroll-progress"
        style={{ transform: "scaleX(0)" }}
        aria-hidden="true"
      />
    </header>
  );
}
