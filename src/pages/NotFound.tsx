import { Container, Eyebrow, Button } from "../components/ui";

export function NotFound() {
  return (
    <section className="simple-hero not-found">
      <Container>
        <Eyebrow>404 / PÁGINA NÃO ENCONTRADA</Eyebrow>
        <h1>Esta página não existe.</h1>
        <Button to="/">Voltar ao início</Button>
      </Container>
    </section>
  );
}
