import { Container, Eyebrow, Button } from "../components/ui";

export function PrivacyPage() {
  return (
    <section className="simple-hero privacy-page">
      <Container>
        <Eyebrow>PRIVACIDADE</Eyebrow>
        <h1 data-reveal="heading">Tratamento de dados neste protótipo.</h1>
        <p>
          O formulário de contato desta versão ainda não envia dados para a
          DATAMAT. As informações digitadas permanecem no seu navegador durante
          a visita e não são transmitidas pelo site.
        </p>
        <p>
          Antes de ativar o formulário e publicar uma política completa, será
          necessário definir o canal de recebimento, a finalidade, o prazo de
          retenção e os responsáveis pelo tratamento.
        </p>
        <Button to="/contato">Voltar ao contato</Button>
      </Container>
    </section>
  );
}
