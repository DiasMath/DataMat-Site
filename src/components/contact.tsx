import { useEffect, useState } from "react";
import { ArrowUpRight, X } from "lucide-react";
import symbol from "../assets/brand/datamat-symbol.svg";
import { whatsappUrl } from "../data/site";
import { Container, Eyebrow } from "./ui";

export function ContactAction({
  className,
  children,
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return whatsappUrl ? (
    <a
      className={className}
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
    >
      {children}
    </a>
  ) : (
    <button
      className={className}
      type="button"
      onClick={() =>
        window.dispatchEvent(new Event("datamat:whatsapp-preview"))
      }
    >
      {children}
    </button>
  );
}

export function WhatsAppPreview() {
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const show = () => setOpen(true);
    window.addEventListener("datamat:whatsapp-preview", show);
    return () => window.removeEventListener("datamat:whatsapp-preview", show);
  }, []);
  useEffect(() => {
    if (!open) return;
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", closeOnEscape);
    return () => window.removeEventListener("keydown", closeOnEscape);
  }, [open]);
  if (whatsappUrl || !open) return null;
  return (
    <div className="wa-preview-backdrop" onMouseDown={() => setOpen(false)}>
      <div
        className="wa-preview-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="wa-preview-title"
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="wa-preview-head">
          <img src="/whatsapp.svg" width="24" height="24" alt="" />
          <strong id="wa-preview-title">Conversa com a DATAMAT</strong>
          <button
            type="button"
            onClick={() => setOpen(false)}
            aria-label="Fechar prévia"
          >
            <X size={20} />
          </button>
        </div>
        <div className="wa-preview-body">
          <span>PRÉVIA DO CANAL</span>
          <p>Olá! Quero entender como a DATAMAT pode ajudar minha empresa.</p>
          <small>
            Esta é uma simulação. O número comercial será conectado antes da
            publicação.
          </small>
        </div>
        <button
          className="wa-preview-close"
          type="button"
          onClick={() => setOpen(false)}
        >
          Voltar ao site
        </button>
      </div>
    </div>
  );
}

export function CTA({
  title = "Vamos conversar sobre o que vem a seguir?",
}: {
  title?: string;
}) {
  return (
    <section className="cta-section">
      <Container>
        <div>
          <Eyebrow>PRÓXIMO PASSO</Eyebrow>
          <h2>{title}</h2>
          <p>
            Conte o que está acontecendo na sua empresa. A conversa começa pelo
            seu desafio.
          </p>
          <ContactAction className="button button-orange">
            {whatsappUrl ? "Conversar no WhatsApp" : "Falar com a DATAMAT"}
            <ArrowUpRight size={18} />
          </ContactAction>
        </div>
        <img src={symbol} alt="" />
      </Container>
    </section>
  );
}

export function WhatsAppFloat() {
  return (
    <ContactAction className="whatsapp-float">
      <img
        src="/whatsapp.svg"
        width="27"
        height="27"
        alt=""
        aria-hidden="true"
      />
      <span className="sr-only">
        {whatsappUrl
          ? "Conversar com a DATAMAT no WhatsApp"
          : "Ver prévia do contato por WhatsApp"}
      </span>
    </ContactAction>
  );
}
