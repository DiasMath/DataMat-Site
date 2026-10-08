import { HeroSymbol } from "../components/HeroSymbol";
import { Container, Eyebrow, Button } from "../components/ui";

export function NotFound() {
  return (
    <section className="simple-hero not-found relative isolate overflow-hidden">
      <HeroSymbol />
      <Container>
        <Eyebrow>404 / PÁGINA NÃO ENCONTRADA</Eyebrow>
        <h1 data-reveal="heading">Esta página não existe.</h1>
        <Button to="/">Voltar ao início</Button>
      </Container>
    </section>
  );
}
