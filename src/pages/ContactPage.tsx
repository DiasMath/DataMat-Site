import { useState } from "react";
import { ArrowUpRight } from "lucide-react";
import { solutions } from "../data/site";
import { Container, Eyebrow } from "../components/ui";

export function ContactPage() {
  const [attempted, setAttempted] = useState(false);
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
        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            setAttempted(true);
          }}
        >
          <span>01 / CONTE O SEU CENÁRIO</span>
          <div className="form-grid">
            <label>
              Nome
              <input
                name="nome"
                autoComplete="name"
                required
                placeholder="Seu nome"
              />
            </label>
            <label>
              Empresa
              <input
                name="empresa"
                autoComplete="organization"
                required
                placeholder="Nome da empresa"
              />
            </label>
            <label>
              E-mail
              <input
                name="email"
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
              placeholder="Descreva brevemente o cenário"
              required
            />
          </label>
          <button className="button button-dark" type="submit">
            Enviar mensagem <ArrowUpRight size={18} />
          </button>
          {attempted && (
            <p className="form-status" role="status">
              O envio online ainda não está conectado. Seus dados não foram
              enviados. Esta interface está pronta para receber a integração do
              formulário.
            </p>
          )}
          {/* Integrar endpoint de envio aqui. Não exibir sucesso antes da confirmação do servidor. */}
        </form>
      </Container>
    </section>
  );
}
