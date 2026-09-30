import { Link } from "react-router-dom";
import logo from "../assets/brand/datamat-horizontal.svg";
import { solutions } from "../data/site";
import { Container } from "./ui";

export function Footer() {
  return (
    <footer className="footer">
      <Container>
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" aria-label="DATAMAT, início">
              <img src={logo} alt="DATAMAT" />
            </Link>
          </div>
          <div>
            <h3>Soluções</h3>
            {solutions.map((s) => (
              <Link key={s.key} to={s.path}>
                {s.title}
              </Link>
            ))}
          </div>
          <div>
            <h3>Empresa</h3>
            <Link to="/sobre">Sobre</Link>
            <Link to="/contato">Contato</Link>
          </div>
          <div>
            <h3>Legal</h3>
            <Link to="/privacidade">Privacidade</Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© 2026 DATAMAT</span>
          <span>Clareza para decidir. Estrutura para fazer.</span>
        </div>
      </Container>
    </footer>
  );
}
