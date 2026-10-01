import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../motion/gsap";
import { motionDisabled } from "../motion/tokens";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "../components/ui";
import { ContactAction } from "../components/contact";
import { HeroOrbit } from "../components/home/HeroOrbit";
import { skipIntro } from "../lib/boot";

/**
 * Hero da home: texto à esquerda e o sistema solar da DATAMAT à direita
 * (src/components/home/HeroOrbit.tsx).
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  // Entrada do texto. Na primeira carga pré-renderizada o texto já está na
  // tela (é o que o Google mede como carregamento), então não anima.
  useGSAP(
    () => {
      const section = root.current;
      if (!section || motionDisabled || skipIntro()) return;
      const q = gsap.utils.selector(section);
      gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(
          q(".hero-copy .eyebrow"),
          { autoAlpha: 0, y: 12, duration: 0.6 },
          0.1,
        )
        .from(
          q(".hero-copy > p, .hero-actions"),
          { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1 },
          0.75,
        )
        .from(
          q(".hero-orbit"),
          { autoAlpha: 0, scale: 0.92, duration: 1.4 },
          0.2,
        );
      // Título entra linha por linha; refaz a divisão se a fonte ou a largura mudar.
      SplitText.create(q(".hero-copy h1")[0], {
        type: "lines",
        mask: "lines",
        autoSplit: true,
        onSplit: (self) =>
          gsap.from(self.lines, {
            yPercent: 105,
            duration: 1,
            stagger: 0.09,
            ease: "power4.out",
            delay: 0.2,
          }),
      });
    },
    { scope: root },
  );

  return (
    <section className="home-hero" ref={root}>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true">
        <div className="orbit-grid" />
        <HeroOrbit />
      </div>
      <Container className="new-hero-content">
        <div className="hero-copy">
          <Eyebrow>DATAMAT · SOLUÇÕES EM DADOS & IA</Eyebrow>
          <h1>
            Sua empresa precisa de <em>clareza</em> para crescer.
          </h1>
          <p>
            Entendemos o que impede seu próximo passo e construímos a solução
            que faz sentido para o seu negócio.
          </p>
          <div className="hero-actions">
            <a className="button button-orange" href="#demonstracoes">
              Encontre seu caminho <ArrowDown size={18} />
            </a>
            <ContactAction className="hero-secondary">
              Conversar sobre minha empresa <ArrowUpRight size={17} />
            </ContactAction>
          </div>
        </div>
        <a className="hero-scroll" href="#clientes">
          <span>EXPLORE A PÁGINA</span>
          <ArrowDown size={18} />
        </a>
      </Container>
    </section>
  );
}
