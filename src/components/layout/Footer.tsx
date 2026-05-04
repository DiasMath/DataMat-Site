const Footer = () => (
  <footer className="bg-foreground text-background/70 py-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <a href="#" className="text-xl font-logo font-black tracking-tight text-background">
        DATA<span className="text-primary">MAT</span>
      </a>
      <nav className="flex gap-6 text-sm">
        <a href="/#sobre" className="nav-link hover:text-background transition-colors relative pb-1">
          Sobre Nós<span className="nav-link-bar" />
        </a>
        <a href="/#abordagem" className="nav-link hover:text-background transition-colors relative pb-1">
          Metodologia<span className="nav-link-bar" />
        </a>
        <a href="/cases" className="nav-link hover:text-background transition-colors relative pb-1">
          Cases<span className="nav-link-bar" />
        </a>
        {/* <a href="/demonstracao" className="nav-link hover:text-background transition-colors relative pb-1">Demonstração<span className="nav-link-bar" /></a> */}
        <a href="/#clientes" className="nav-link hover:text-background transition-colors relative pb-1">
          Clientes<span className="nav-link-bar" />
        </a>
      </nav>
      <p className="text-xs text-background/40">© 2026 DATAMAT. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;
