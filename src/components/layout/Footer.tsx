const Footer = () => (
  <footer className="bg-foreground text-background/70 py-12 px-6 md:px-12">
    <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
      <a href="#" className="text-xl font-extrabold tracking-tight text-background">
        DATA<span className="text-primary">MAT</span>
      </a>
      <nav className="flex gap-6 text-sm">
        <a href="#sobre" className="hover:text-background transition-colors">Sobre Nós</a>
        <a href="/#abordagem" className="hover:text-background transition-colors">Metodologia</a>
        {/* <a href="/cases" className="hover:text-background transition-colors">Cases</a> */}
        <a href="#clientes" className="hover:text-background transition-colors">Clientes</a>
      </nav>
      <p className="text-xs text-background/40">© 2026 DATAMAT. Todos os direitos reservados.</p>
    </div>
  </footer>
);

export default Footer;
