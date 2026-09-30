import { useRef, useState } from "react";
import type { FormEvent } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "../data/site";
import { Container, Eyebrow } from "../components/ui";
import { ContactAction } from "../components/contact";
import {
  contactConfigured,
  LIMITS,
  sendContact,
  type ContactLead,
} from "../lib/contact";

type Status = "idle" | "sending" | "sent" | "error" | "offline";

export function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const openedAt = useRef(Date.now());

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    // Antispam: robôs preenchem o campo escondido ou enviam rápido demais.
    // Nesses casos, fingimos sucesso e não gravamos nada.
    if (text("site") || Date.now() - openedAt.current < 3000) {
      setStatus("sent");
      form.reset();
      return;
    }

    if (!contactConfigured) {
      setStatus("offline");
      return;
    }

    const lead: ContactLead = {
      nome: text("nome"),
      empresa: text("empresa"),
      email: text("email"),
      whatsapp: text("whatsapp"),
      solucao: text("solucao"),
      mensagem: text("mensagem"),
      consentimento: data.get("consentimento") === "on",
      origem: window.location.pathname.slice(0, LIMITS.origem),
    };

    setStatus("sending");
    try {
      await sendContact(lead);
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent")
    return (
      <section className="contact-page">
        <Container className="contact-grid">
          <div>
            <Eyebrow>MENSAGEM RECEBIDA</Eyebrow>
            <h1>Obrigado! Recebemos o seu contato.</h1>
            <p>
              Vamos ler com atenção e responder pelo e-mail ou WhatsApp
              informado. Se for urgente, fale direto com a gente.
            </p>
            <ContactAction className="button button-orange">
              Falar pelo WhatsApp <ArrowUpRight size={18} />
            </ContactAction>
          </div>
        </Container>
      </section>
    );

  const sending = status === "sending";
  return (
    <section className="contact-page">
      <Container className="contact-grid">
        <div>
          <Eyebrow>FALE COM A DATAMAT</Eyebrow>
          <h1>Vamos entender o que sua empresa precisa.</h1>
          <p>
            Conte o que está acontecendo. Uma boa solução começa com uma
            conversa clara sobre o problema.
          </p>
          <div className="contact-aside">
            <span>PRIMEIRO PASSO</span>
            <strong>Contexto → conversa → direção</strong>
            <small>Sem escolher ferramenta antes de entender o cenário.</small>
          </div>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          {/* Campo-armadilha para robôs: invisível para pessoas. */}
          <label className="form-trap" aria-hidden="true">
            Site
            <input name="site" tabIndex={-1} autoComplete="off" />
          </label>
          <span>01 / CONTE O SEU CENÁRIO</span>
          <div className="form-grid">
            <label>
              Nome
              <input
                name="nome"
                maxLength={LIMITS.nome}
                autoComplete="name"
                required
                placeholder="Seu nome"
              />
            </label>
            <label>
              Empresa
              <input
                name="empresa"
                maxLength={LIMITS.empresa}
                autoComplete="organization"
                required
                placeholder="Nome da empresa"
              />
            </label>
            <label>
              E-mail
              <input
                name="email"
                maxLength={LIMITS.email}
                type="email"
                autoComplete="email"
                required
                placeholder="voce@empresa.com.br"
              />
            </label>
            <label>
              WhatsApp
              <input
                name="whatsapp"
                maxLength={LIMITS.whatsapp}
                type="tel"
                autoComplete="tel"
                required
                placeholder="(00) 00000-0000"
              />
            </label>
          </div>
          <label>
            O que você quer melhorar?
            <select name="solucao" required defaultValue="">
              <option value="" disabled>
                Selecione uma opção
              </option>
              {solutions.map((s) => (
                <option key={s.key}>{s.title}</option>
              ))}
              <option>Ainda não sei</option>
            </select>
          </label>
          <label>
            Mensagem
            <textarea
              name="mensagem"
              rows={5}
              minLength={5}
              maxLength={LIMITS.mensagem}
              placeholder="Descreva brevemente o cenário"
              required
            />
          </label>
          <label className="form-consent">
            <input type="checkbox" name="consentimento" required />
            <span>
              Concordo que a DATAMAT use estes dados para responder ao meu
              contato, conforme a{" "}
              <Link to="/privacidade">política de privacidade</Link>.
            </span>
          </label>
          <button
            className="button button-dark"
            type="submit"
            disabled={sending}
          >
            {sending ? "Enviando..." : "Enviar mensagem"}{" "}
            <ArrowUpRight size={18} />
          </button>
          {status === "offline" && (
            <p className="form-status" role="status">
              O envio online ainda não está conectado, então seus dados não
              foram enviados. Fale com a gente pelo{" "}
              <ContactAction className="form-status-link">
                WhatsApp
              </ContactAction>
              .
            </p>
          )}
          {status === "error" && (
            <p className="form-status is-error" role="alert">
              Não conseguimos enviar agora. Verifique sua conexão e tente de
              novo, ou fale com a gente pelo{" "}
              <ContactAction className="form-status-link">
                WhatsApp
              </ContactAction>
              .
            </p>
          )}
        </form>
      </Container>
    </section>
  );
}
