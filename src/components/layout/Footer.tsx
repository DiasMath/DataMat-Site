import { Link } from "react-router-dom";
import { Instagram, Linkedin } from "lucide-react";
import { SOLUTIONS, WHATSAPP_LINK } from "@/lib/site";

const Footer = () => (
  <footer className="border-t border-border bg-background px-6 py-16 md:px-12 lg:px-20">
    <div className="mx-auto grid max-w-7xl gap-12 md:grid-cols-[1.4fr_1fr_1fr_1fr]">
      <div>
        <Link to="/" className="font-display text-2xl font-extrabold tracking-tight text-foreground">
          DATA<span className="text-primary">MAT</span>
        </Link>
        <p className="mt-4 max-w-xs text-sm leading-relaxed text-muted-foreground">
          Consultoria de dados e IA aplicada a decisões de negócio.
        </p>
        <div className="mt-6 flex gap-4">
          {/* TODO CONTEÚDO: links reais das redes sociais da Datamat */}
          <a href="#" aria-label="LinkedIn da Datamat" className="text-muted-foreground transition-colors hover:text-primary">
            <Linkedin size={20} />
          </a>
          <a href="#" aria-label="Instagram da Datamat" className="text-muted-foreground transition-colors hover:text-primary">
            <Instagram size={20} />
          </a>
        </div>
      </div>

      <div>
        <p className="t-kicker">Soluções</p>
        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          {SOLUTIONS.map((s) => (
            <li key={s.slug}>
              <Link to={`/solucoes/${s.slug}`} className="transition-colors hover:text-foreground">
                {s.label}
              </Link>
            </li>
          ))}
        </ul>
      </div>

      <div>
        <p className="t-kicker">Empresa</p>
        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          <li><Link to="/cases" className="transition-colors hover:text-foreground">Cases</Link></li>
          <li><a href="/#como-trabalhamos" className="transition-colors hover:text-foreground">Como trabalhamos</a></li>
          <li><a href="/#resultados" className="transition-colors hover:text-foreground">Resultados</a></li>
        </ul>
      </div>

      <div>
        <p className="t-kicker">Contato</p>
        {/* TODO CONTEÚDO: e-mail e endereço finais da Datamat */}
        <ul className="mt-5 space-y-3 text-sm text-muted-foreground">
          <li>
            <a href={WHATSAPP_LINK} target="_blank" rel="noopener noreferrer" className="transition-colors hover:text-foreground">
              +55 21 99610-1868
            </a>
          </li>
          <li>
            <a href="mailto:contato@datamat.com.br" className="transition-colors hover:text-foreground">
              contato@datamat.com.br
            </a>
          </li>
          <li>Rio de Janeiro, RJ</li>
        </ul>
      </div>
    </div>

    <p className="mx-auto mt-14 max-w-7xl border-t border-border pt-8 text-xs text-muted-foreground">
      © {new Date().getFullYear()} DATAMAT. Todos os direitos reservados.
    </p>
  </footer>
);

export default Footer;
