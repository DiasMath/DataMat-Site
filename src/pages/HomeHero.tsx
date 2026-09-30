import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { SplitText } from "gsap/SplitText";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "../components/ui";
import { ContactAction } from "../components/contact";

gsap.registerPlugin(SplitText);

const sources = [
  { key: "a", label: "DADOS DISPERSOS" },
  { key: "b", label: "ROTINAS MANUAIS" },
  { key: "c", label: "OPORTUNIDADES" },
];

/**
 * Hero da home: a órbita "DATAMAT clareza".
 * A animação conta a história do serviço: os problemas (cartões) entram no
 * núcleo DATAMAT e saem como "decisões mais claras". Roda uma vez na entrada
 * e se repete de tempos em tempos enquanto o hero está visível.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useLayoutEffect(() => {
    const section = root.current;
    if (!section) return;

    const ctx = gsap.context(() => {
      const q = gsap.utils.selector(section);
      const core = q(".motion-core")[0];
      const cards = q(".motion-source");
      const result = q(".motion-result")[0];

      // Distância de cada cartão até o centro do núcleo (recalculada a cada ciclo).
      const toCore = (axis: "x" | "y") => (_: number, el: Element) => {
        const a = el.getBoundingClientRect();
        const b = core.getBoundingClientRect();
        return axis === "x"
          ? b.left + b.width / 2 - (a.left + a.width / 2)
          : b.top + b.height / 2 - (a.top + a.height / 2);
      };

      const story = () =>
        gsap
          .timeline()
          .to(result, { autoAlpha: 0, duration: 0.3 }, 0)
          .to(cards, {
            x: toCore("x"),
            y: toCore("y"),
            scale: 0.2,
            autoAlpha: 0,
            duration: 0.9,
            stagger: 0.22,
            ease: "power2.in",
          })
          .to(core, { scale: 1.1, duration: 0.22, ease: "power2.out" }, "-=0.1")
          .to(core, { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" })
          .fromTo(
            result,
            { x: toCore("x"), y: toCore("y"), scale: 0.2, autoAlpha: 0 },
            {
              immediateRender: false,
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.9,
              ease: "back.out(1.5)",
            },
            "<-0.45",
          )
          // os problemas voltam a aparecer no lugar, para o ciclo recomeçar
          .set(cards, { x: 0, y: 0, scale: 0.85 }, "+=0.8")
          .to(cards, {
            scale: 1,
            autoAlpha: 1,
            duration: 0.6,
            stagger: 0.12,
            ease: "power2.out",
          });

      const intro = gsap.timeline({ defaults: { ease: "power3.out" } });
      intro
        .from(q(".orbit-ring"), {
          scale: 0.55,
          autoAlpha: 0,
          duration: 1.6,
          stagger: 0.14,
          ease: "expo.out",
        })
        .from(
          core,
          { scale: 0.3, autoAlpha: 0, duration: 1.2, ease: "back.out(1.7)" },
          0.2,
        )
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
          cards,
          { autoAlpha: 0, scale: 0.8, y: 16, duration: 0.6, stagger: 0.12 },
          0.9,
        )
        .set(result, { autoAlpha: 0 }, 0)
        .add(story(), 2.2);

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

      // Repete a história a cada ~6 s, só enquanto o hero estiver na tela.
      let loop: gsap.core.Tween | null = null;
      const schedule = () => {
        loop = gsap.delayedCall(6, () => {
          story().eventCallback("onComplete", schedule);
        });
      };
      intro.eventCallback("onComplete", schedule);
      const observer = new IntersectionObserver(([entry]) => {
        loop?.paused(!entry.isIntersecting);
      });
      observer.observe(section);
      return () => observer.disconnect();
    }, section);

    return () => ctx.revert();
  }, []);

  return (
    <section className="home-hero" ref={root}>
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true">
        <div className="orbit-grid" />
        {["one", "two", "three"].map((n) => (
          <div key={n} className={`orbit-ring orbit-${n}`}>
            <div className="motion-orbit" />
          </div>
        ))}
        <div className="motion-core">
          <span>DATAMAT</span>
          <strong>clareza</strong>
        </div>
        {sources.map((s) => (
          <div key={s.key} className={`orbit-card source-${s.key}`}>
            <div className="motion-source">{s.label}</div>
          </div>
        ))}
        <div className="orbit-card result-slot">
          <div className="motion-result">
            DECISÕES MAIS CLARAS <ArrowUpRight size={15} />
          </div>
        </div>
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
