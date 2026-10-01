import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { whatsappLink, whatsappUrl } from "../data/site";

export function ContactAction({
  className,
  children,
  message,
}: {
  className?: string;
  children: React.ReactNode;
  /** Mensagem pronta do WhatsApp (opcional) */
  message?: string;
}) {
  const href = whatsappLink(message);
  return href ? (
    <a
      className={className}
      href={href}
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
