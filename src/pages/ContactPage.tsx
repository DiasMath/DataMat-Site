import { useRef, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowUpRight, Check, Clock, Mail, MessageCircle } from "lucide-react";
import { solutions } from "../data/site";
import { whatsappDisplay, whatsappUrl } from "../data/site";
import { contact } from "../content/contact";
import { ContactAction } from "../components/contact";
import {
  contactConfigured,
  LIMITS,
  sendContact,
  type ContactLead,
} from "../lib/contact";

type Status = "idle" | "sending" | "sent" | "error";

/** O que acontece depois do contato (o mesmo que o FAQ promete). */
const steps = [
  {
    title: "Você conta o cenário",
    text: "Pelo WhatsApp, e-mail ou formulário.",
  },
  {
    title: "Uma conversa",
    text: "Para entender o desafio e a rotina da empresa.",
  },
  {
    title: "O caminho proposto",
    text: "Escopo e prazo definidos antes de qualquer compromisso.",
  },
];

const field =
  "mt-1.5 w-full rounded-xl border border-graphite/15 bg-white px-4 py-3 text-base text-graphite outline-none transition placeholder:text-graphite/40 focus:border-amber focus:ring-2 focus:ring-amber/30";
const labelClass = "block text-sm font-semibold text-graphite";

function Channel({
  icon,
  label,
  value,
  href,
  external,
  primary,
}: {
  icon: ReactNode;
  label: string;
  value: string;
  href: string;
  external?: boolean;
  primary?: boolean;
}) {
  return (
    <a
      href={href}
      {...(external ? { target: "_blank", rel: "noreferrer" } : {})}
      className={`group flex items-center gap-4 rounded-2xl border p-4 transition hover:-translate-y-0.5 md:p-5 ${primary ? "border-amber bg-amber text-graphite" : "border-white/10 bg-graphite text-cream hover:border-amber/60"}`}
    >
      <span
        className={`flex size-11 shrink-0 items-center justify-center rounded-xl ${primary ? "bg-graphite text-amber" : "bg-white/5 text-amber"}`}
      >
        {icon}
      </span>
      <span className="min-w-0 flex-1">
        <span
          className={`block text-xs ${primary ? "text-graphite/70" : "text-text-muted"}`}
        >
          {label}
        </span>
        <span className="block text-sm font-semibold [overflow-wrap:anywhere] sm:text-base">
          {value}
        </span>
      </span>
      <ArrowUpRight
        size={18}
        aria-hidden="true"
        className="shrink-0 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
      />
    </a>
  );
}

export function ContactPage() {
  const [status, setStatus] = useState<Status>("idle");
  const openedAt = useRef(Date.now());
  const [params] = useSearchParams();
  // /contato?assunto=dados já vem com a solução escolhida
  const preset =
    solutions.find((s) => s.key === params.get("assunto"))?.title ?? "";

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);
    const text = (name: string) => String(data.get(name) ?? "").trim();

    // Antispam: robôs preenchem o campo escondido ou enviam rápido demais.
    if (text("site") || Date.now() - openedAt.current < 3000) {
      setStatus("sent");
      form.reset();
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

  const sending = status === "sending";

  return (
    <section className="bg-bg-hero pt-32 pb-20 md:pt-40 md:pb-28">
      <div className="mx-auto grid max-w-screen-2xl grid-cols-[minmax(0,1fr)] gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,5fr)_minmax(0,7fr)] lg:gap-16">
        {/* Canais e o que acontece depois */}
        <div>
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber">
            <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
            FALE COM A DATAMAT
          </p>
          <h1
            className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight text-cream md:text-6xl"
            data-reveal="heading"
          >
            Vamos entender o que sua empresa precisa.
          </h1>
          <p className="mt-5 max-w-lg text-lg text-text-muted">
            Conte o que está acontecendo. O atendimento é online, para empresas
            de todo o Brasil.
          </p>

          <div className="mt-8 grid gap-3" data-reveal data-stagger="0.08">
            {whatsappUrl && (
              <Channel
                primary
                icon={<MessageCircle size={20} aria-hidden="true" />}
                label="WhatsApp · o jeito mais rápido"
                value={whatsappDisplay}
                href={whatsappUrl}
                external
              />
            )}
            {contact.email && (
              <Channel
                icon={<Mail size={20} aria-hidden="true" />}
                label="E-mail"
                value={contact.email}
                href={`mailto:${contact.email}`}
              />
            )}
          </div>
          {contact.hours && (
            <p className="mt-4 flex items-center gap-2 text-sm text-text-muted">
              <Clock size={15} aria-hidden="true" className="text-amber" />
              Atendimento: {contact.hours}
            </p>
          )}

          <div className="mt-10 border-t border-white/10 pt-8">
            <p className="text-xs font-semibold tracking-widest text-text-muted">
              O QUE ACONTECE DEPOIS
            </p>
            <ol className="mt-5 grid gap-5">
              {steps.map((s, i) => (
                <li key={s.title} className="flex gap-4">
                  <span className="flex size-8 shrink-0 items-center justify-center rounded-full bg-amber text-sm font-bold text-graphite tabular-nums">
                    {i + 1}
                  </span>
                  <span>
                    <span className="block font-semibold text-cream">
                      {s.title}
                    </span>
                    <span className="text-sm text-text-muted">{s.text}</span>
                  </span>
                </li>
              ))}
            </ol>
            <Link
              to="/#perguntas"
              className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cream hover:text-amber"
            >
              Ver perguntas frequentes{" "}
              <ArrowUpRight size={15} aria-hidden="true" />
            </Link>
          </div>
        </div>

        {/* Formulário (só quando o envio está conectado) */}
        <div className="rounded-3xl bg-cream p-6 text-graphite md:p-10">
          {status === "sent" ? (
            <div
              className="flex h-full flex-col items-start justify-center py-10"
              role="status"
            >
              <span className="flex size-14 items-center justify-center rounded-full bg-amber">
                <Check size={28} aria-hidden="true" />
              </span>
              <h2 className="mt-6 text-3xl font-semibold tracking-tight">
                Recebemos o seu contato.
              </h2>
              <p className="mt-3 max-w-md text-lg text-graphite/75">
                Vamos ler com atenção e responder pelo e-mail ou WhatsApp
                informado
                {contact.hours
                  ? `, no horário de atendimento (${contact.hours})`
                  : ""}
                .
              </p>
              {whatsappUrl && (
                <ContactAction className="group mt-8 inline-flex items-center gap-3 rounded-full bg-graphite py-2.5 pr-2.5 pl-6 font-semibold text-cream">
                  Falar pelo WhatsApp
                  <span className="flex size-9 items-center justify-center rounded-full bg-amber text-graphite transition-transform duration-500 group-hover:rotate-45">
                    <ArrowUpRight size={17} aria-hidden="true" />
                  </span>
                </ContactAction>
              )}
            </div>
          ) : contactConfigured ? (
            <form onSubmit={handleSubmit} className="grid gap-5">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight md:text-3xl">
                  Prefere escrever?
                </h2>
                <p className="mt-1 text-graphite/70">
                  Leva 1 minuto. Respondemos pelo canal que você preferir.
                </p>
              </div>
              {/* Campo-armadilha para robôs: invisível para pessoas. */}
              <label
                className="absolute -left-[9999px] size-px overflow-hidden"
                aria-hidden="true"
              >
                Site
                <input name="site" tabIndex={-1} autoComplete="off" />
              </label>
              <div className="grid gap-5 sm:grid-cols-2">
                <label className={labelClass}>
                  Nome
                  <input
                    className={field}
                    name="nome"
                    maxLength={LIMITS.nome}
                    autoComplete="name"
                    required
                    placeholder="Seu nome"
                  />
                </label>
                <label className={labelClass}>
                  Empresa
                  <input
                    className={field}
                    name="empresa"
                    maxLength={LIMITS.empresa}
                    autoComplete="organization"
                    required
                    placeholder="Nome da empresa"
                  />
                </label>
                <label className={labelClass}>
                  E-mail
                  <input
                    className={field}
                    name="email"
                    maxLength={LIMITS.email}
                    type="email"
                    autoComplete="email"
                    required
                    placeholder="voce@empresa.com.br"
                  />
                </label>
                <label className={labelClass}>
                  WhatsApp
                  <input
                    className={field}
                    name="whatsapp"
                    maxLength={LIMITS.whatsapp}
                    type="tel"
                    autoComplete="tel"
                    required
                    placeholder="(00) 00000-0000"
                  />
                </label>
              </div>
              <label className={labelClass}>
                O que você quer melhorar?
                <select
                  className={field}
                  name="solucao"
                  required
                  defaultValue={preset}
                >
                  <option value="" disabled>
                    Selecione uma opção
                  </option>
                  {solutions.map((s) => (
                    <option key={s.key}>{s.title}</option>
                  ))}
                  <option>Ainda não sei</option>
                </select>
              </label>
              <label className={labelClass}>
                Conte o cenário
                <textarea
                  className={field}
                  name="mensagem"
                  rows={5}
                  minLength={5}
                  maxLength={LIMITS.mensagem}
                  placeholder="O que está acontecendo hoje e o que você gostaria que mudasse?"
                  required
                />
              </label>
              <label className="flex items-start gap-3 text-sm text-graphite/75">
                <input
                  type="checkbox"
                  name="consentimento"
                  required
                  className="mt-0.5 size-4 accent-amber"
                />
                <span>
                  Concordo que a DATAMAT use estes dados para responder ao meu
                  contato, conforme a{" "}
                  <Link
                    to="/privacidade"
                    className="font-semibold underline underline-offset-2"
                  >
                    política de privacidade
                  </Link>
                  .
                </span>
              </label>
              <button
                type="submit"
                disabled={sending}
                className="group inline-flex items-center justify-center gap-3 justify-self-start rounded-full bg-graphite py-2.5 pr-2.5 pl-6 font-semibold text-cream transition hover:bg-black disabled:opacity-60"
              >
                {sending ? "Enviando..." : "Enviar mensagem"}
                <span className="flex size-9 items-center justify-center rounded-full bg-amber text-graphite transition-transform duration-500 group-hover:rotate-45">
                  <ArrowUpRight size={17} aria-hidden="true" />
                </span>
              </button>
              {status === "error" && (
                <p
                  className="rounded-xl bg-negative/10 p-4 text-sm text-negative"
                  role="alert"
                >
                  Não conseguimos enviar agora. Verifique sua conexão e tente de
                  novo,
                  {whatsappUrl
                    ? " ou fale com a gente pelo WhatsApp."
                    : " ou escreva para o nosso e-mail."}
                </p>
              )}
            </form>
          ) : (
            /* Sem formulário conectado: nada de campos que não enviam. */
            <div className="flex h-full flex-col justify-center py-6">
              <h2 className="text-3xl font-semibold tracking-tight">
                Uma mensagem já é suficiente.
              </h2>
              <p className="mt-3 max-w-md text-lg text-graphite/75">
                Diga em poucas linhas o que está travando a sua empresa. Se
                ajudar, comece por um destes assuntos:
              </p>
              <ul className="mt-6 grid gap-2">
                {solutions.map((s) => (
                  <li key={s.key}>
                    <ContactAction
                      message={`Olá! Vim pelo site da DATAMAT e quero conversar sobre ${s.title}.`}
                      className="group flex items-center justify-between gap-3 rounded-2xl border border-graphite/15 bg-white px-5 py-4 font-semibold transition hover:border-amber hover:bg-amber/15"
                    >
                      {s.title}
                      <ArrowUpRight
                        size={18}
                        aria-hidden="true"
                        className="text-graphite/50 transition group-hover:text-graphite"
                      />
                    </ContactAction>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
