import { useRef } from "react";
import { gsap, SplitText, useGSAP } from "../motion/gsap";
import { motionDisabled } from "../motion/tokens";
import { ArrowDown, ArrowUpRight } from "lucide-react";
import { Container, Eyebrow } from "../components/ui";
import { ContactAction } from "../components/contact";
import { SYMBOL_BARS } from "../components/DatamatSymbol";
import { heroPairs } from "../content/hero";
import { skipIntro } from "../lib/boot";
import { startSky } from "./hero/sky";

/* ---------- Desenho fixo (igual no servidor e no navegador) ---------- */

// Sorteio com semente fixa: as posições dos planetas variam entre si, mas são
// as mesmas na página pré-renderizada e no navegador.
function seeded(seed: number) {
  return () => {
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}
const rand = seeded(17);

/** Órbitas: quantos planetas, segundos por volta, tamanho e intensidade (como o site já tinha). */
const rings = [
  { key: "one", planets: 3, secs: 26, size: 7, opacity: 1 },
  { key: "two", planets: 4, secs: 42, size: 7, opacity: 0.7 },
  { key: "three", planets: 5, secs: 64, size: 5, opacity: 0.5 },
].map((ring, ri) => ({
  ...ring,
  carriers: Array.from({ length: ring.planets }, () => {
    const duration = ring.secs * (0.75 + rand() * 0.6);
    return {
      duration,
      delay: -duration * rand(), // posição inicial sorteada: nada alinhado
      reverse: ri % 2 === 1,
    };
  }),
}));

/** Posição inicial de cada cartão, em % da órbita: [topo, esquerda]. Todos à direita do texto. */
const slots: [number, number][] = [
  [26, 37],
  [19, 64],
  [70, 68],
  [80, 58],
];

/** Uma volta dos cartões pela órbita a cada 6 minutos (radianos por segundo). */
const CARD_TURN = (Math.PI * 2) / 360;

/**
 * Hero da home: o sistema "DATAMAT".
 * - Universo de estrelas sutis no hero inteiro (src/pages/hero/sky.ts).
 * - Logo DATAMAT no centro da órbita, com as 3 barras "carregando".
 * - Um para um: cada problema (cartão escuro) entra na logo e volta, no mesmo
 *   lugar, como a solução (cartão claro). A legenda "AGORA" acompanha.
 * - Os cartões giram bem devagar pela órbita; perto do texto, somem e
 *   reaparecem mais à frente.
 * Tudo pausa durante o scroll e com o hero fora da tela.
 */
export function HomeHero() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const section = root.current;
      if (!section) return;
      const q = gsap.utils.selector(section);
      const core = q(".hero-core")[0];
      const levels = q(".hero-level");
      const pairs = q(".hero-pair");
      const cardSlots = q<HTMLElement>(".hero-slot");
      const copy = q(".hero-copy")[0];
      const liveMsg = q(".hero-live-msg")[0];
      // Igual ao resto do site: a animação roda sempre (só os testes a desligam).
      const still = motionDisabled;

      const sky = startSky(q<HTMLCanvasElement>(".hero-sky")[0], still);

      // Sem movimento: tudo parado, já com as soluções.
      if (still) {
        gsap.set([q(".orbit-ring"), core, q(".is-solution")], { autoAlpha: 1 });
        return () => sky.stop();
      }

      // ---------- Legenda "AGORA" ----------
      let swapTimer = 0;
      const caption = (html: string) => {
        liveMsg.classList.add("is-out");
        window.clearTimeout(swapTimer);
        swapTimer = window.setTimeout(() => {
          liveMsg.innerHTML = html;
          liveMsg.classList.remove("is-out");
        }, 300);
      };

      // ---------- Logo: barras esvaziam e enchem de baixo para cima ----------
      const load = () =>
        gsap
          .timeline()
          .to(levels, { attr: { y: 1100 }, duration: 0.28, ease: "power2.in" })
          .to(core, { scale: 1.06, duration: 0.2, ease: "power2.out" }, "<")
          .to(levels, {
            attr: { y: 0 },
            duration: 0.42,
            stagger: 0.3,
            ease: "power2.inOut",
          })
          .to(
            core,
            { scale: 1, duration: 0.6, ease: "elastic.out(1, 0.5)" },
            "-=0.15",
          );

      // Distância de cada cartão até o centro da logo.
      const toCore = (axis: "x" | "y") => (_: number, el: Element) => {
        const a = el.getBoundingClientRect();
        const b = core.getBoundingClientRect();
        return axis === "x"
          ? b.left + b.width / 2 - (a.left + a.width / 2)
          : b.top + b.height / 2 - (a.top + a.height / 2);
      };

      // ---------- Um para um ----------
      const darks = q(".is-problem");
      const lights = q(".is-solution");
      const cycle = gsap.timeline({
        repeat: -1,
        repeatDelay: 0.4,
        paused: true,
      });
      cycle
        .set(lights, { autoAlpha: 0 })
        .set(pairs, { x: 0, y: 0, scale: 1, autoAlpha: 1 })
        .fromTo(
          darks,
          { y: 14, scale: 0.85, autoAlpha: 0 },
          {
            y: 0,
            scale: 1,
            autoAlpha: 1,
            duration: 0.5,
            stagger: 0.14,
            ease: "power3.out",
          },
        );
      heroPairs.forEach((pair, k) => {
        const el = pairs[k];
        cycle
          .addLabel(`go${k}`, k === 0 ? "+=1.2" : "+=0.5")
          .call(
            () =>
              caption(
                `${pair.problem} <span class="hero-live-arrow">→</span> …`,
              ),
            undefined,
            `go${k}`,
          )
          .to(
            el,
            {
              x: toCore("x"),
              y: toCore("y"),
              scale: 0.2,
              autoAlpha: 0,
              duration: 0.8,
              ease: "power2.in",
            },
            `go${k}`,
          )
          .add(load(), "-=0.3")
          .set(darks[k], { autoAlpha: 0 })
          .set(lights[k], { autoAlpha: 1 })
          .call(() =>
            caption(
              `${pair.problem} <span class="hero-live-arrow">→</span> ${pair.solution}`,
            ),
          )
          .to(
            el,
            {
              x: 0,
              y: 0,
              scale: 1,
              autoAlpha: 1,
              duration: 0.8,
              ease: "back.out(1.5)",
            },
            "-=0.25",
          );
      });
      cycle.to(
        pairs,
        { autoAlpha: 0, y: -10, duration: 0.5, stagger: 0.08 },
        "+=3",
      );
      cycle.timeScale(0.75); // ritmo calmo

      // ---------- Entrada ----------
      let started = false; // os cartões só começam a girar depois da entrada
      gsap.set(levels, { attr: { y: 1100 } });
      const intro = gsap
        .timeline({ defaults: { ease: "power3.out" } })
        .from(q(".orbit-ring"), {
          scale: 0.55,
          autoAlpha: 0,
          duration: 1.6,
          stagger: 0.14,
          ease: "expo.out",
        })
        .fromTo(
          core,
          { autoAlpha: 0, scale: 0.8 },
          { autoAlpha: 1, scale: 1, duration: 0.8 },
          0.2,
        )
        .to(
          levels,
          {
            attr: { y: 0 },
            duration: 0.5,
            stagger: 0.25,
            ease: "power2.inOut",
          },
          0.5,
        )
        .add(() => {
          started = true;
          cycle.play(0);
          apply();
        });

      // Na primeira carga pré-renderizada o texto já está na tela (e é o que o
      // Google mede como carregamento): só a órbita entra animada.
      if (!skipIntro()) {
        intro
          .from(
            q(".hero-copy .eyebrow"),
            { autoAlpha: 0, y: 12, duration: 0.6 },
            0.1,
          )
          .from(
            q(".hero-copy > p, .hero-actions"),
            { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1 },
            0.75,
          );
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
      }

      // ---------- Cartões girando devagar pela órbita ----------
      // Onde o texto realmente termina (a linha mais longa), medido a cada 0,5 s.
      let textEdge = 0;
      let measured = 0;
      const textRight = () => {
        const now = performance.now();
        if (now - measured > 500) {
          measured = now;
          textEdge = 0;
          const walker = document.createTreeWalker(copy, NodeFilter.SHOW_TEXT);
          const range = document.createRange();
          while (walker.nextNode()) {
            if (!walker.currentNode.textContent?.trim()) continue;
            range.selectNodeContents(walker.currentNode);
            for (const rc of range.getClientRects())
              textEdge = Math.max(textEdge, rc.right);
          }
        }
        return textEdge;
      };
      const orbitBox = q(".hero-orbit")[0];
      const orbitState = cardSlots.map((_, i) => {
        const [top, left] = slots[i];
        return {
          r: Math.hypot(left - 50, top - 50),
          a: Math.atan2(top - 50, left - 50),
          fade: { f: 1 },
          jumping: false,
        };
      });
      let paused = false;
      const spin = (_time: number, dt: number) => {
        if (paused || !started) return;
        const wide = window.innerWidth > 1024;
        if (!wide) return; // no celular os cartões não aparecem
        const limit = textRight() + 30;
        const area = section.getBoundingClientRect();
        const orb = orbitBox.getBoundingClientRect();
        cardSlots.forEach((slot, i) => {
          const o = orbitState[i];
          o.a += CARD_TURN * (dt / 1000);
          const leftAt = (ang: number) =>
            orb.left +
            ((50 + o.r * Math.cos(ang)) / 100) * orb.width -
            slot.offsetWidth / 2;
          // Chegou perto do texto: some, pula o trecho e reaparece mais à frente.
          if (!o.jumping && leftAt(o.a) < limit) {
            o.jumping = true;
            gsap.to(o.fade, {
              f: 0,
              duration: 0.5,
              onComplete: () => {
                // pousa logo depois do texto, num ponto sem outro cartão por perto
                const w = slot.offsetWidth;
                const h = slot.offsetHeight;
                const others = cardSlots
                  .filter((s) => s !== slot)
                  .map((s) => s.getBoundingClientRect());
                const clashes = (ang: number) => {
                  const cx =
                    orb.left + ((50 + o.r * Math.cos(ang)) / 100) * orb.width;
                  const cy =
                    orb.top + ((50 + o.r * Math.sin(ang)) / 100) * orb.height;
                  return others.some(
                    (b) =>
                      Math.abs(cx - (b.left + b.width / 2)) <
                        (w + b.width) / 2 + 16 &&
                      Math.abs(cy - (b.top + b.height / 2)) <
                        (h + b.height) / 2 + 12,
                  );
                };
                let ang = o.a;
                for (
                  let n = 0;
                  n < 700 && (leftAt(ang) < limit + 40 || clashes(ang));
                  n++
                )
                  ang += 0.01;
                o.a = ang;
                gsap.to(o.fade, {
                  f: 1,
                  duration: 0.8,
                  onComplete: () => {
                    o.jumping = false;
                  },
                });
              },
            });
          }
          slot.style.left = `${50 + o.r * Math.cos(o.a)}%`;
          slot.style.top = `${50 + o.r * Math.sin(o.a)}%`;
          // Nas bordas do hero o cartão só esmaece, para nunca aparecer cortado.
          const box = slot.getBoundingClientRect();
          const edge = Math.min(
            (area.right - 16 - box.right) / 60,
            (box.top - (area.top + 10)) / 50,
            (area.bottom - 16 - box.bottom) / 60,
          );
          slot.style.opacity = String(Math.min(1, Math.max(0, edge), o.fade.f));
        });
      };
      gsap.ticker.add(spin);

      // ---------- Desempenho ----------
      // A órbita é pesada de desenhar. Durante o scroll, ou com o hero fora da
      // tela, tudo pausa (classe .is-paused) e volta em seguida.
      let visible = true;
      let scrolling = false;
      let idle = 0;
      function apply() {
        paused = scrolling || !visible;
        section!.classList.toggle("is-paused", paused);
        intro.paused(paused);
        if (intro.progress() === 1) cycle.paused(paused);
        sky.pause(paused);
      }
      const onScroll = () => {
        if (!scrolling) {
          scrolling = true;
          apply();
        }
        window.clearTimeout(idle);
        idle = window.setTimeout(() => {
          scrolling = false;
          apply();
        }, 180);
      };
      window.addEventListener("scroll", onScroll, { passive: true });
      const observer = new IntersectionObserver(([entry]) => {
        visible = entry.isIntersecting;
        apply();
      });
      observer.observe(section);
      return () => {
        observer.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(idle);
        window.clearTimeout(swapTimer);
        gsap.ticker.remove(spin);
        cycle.kill();
        sky.stop();
      };
    },
    { scope: root },
  );

  return (
    <section className="home-hero" ref={root}>
      <canvas className="hero-sky" aria-hidden="true" />
      <div className="hero-shade" aria-hidden="true" />
      <div className="hero-orbit" aria-hidden="true">
        <div className="hero-glow" />
        {rings.map((ring) => (
          <div key={ring.key} className={`orbit-ring orbit-${ring.key}`}>
            {ring.carriers.map((c, i) => (
              <div
                key={i}
                className="orbit-carrier"
                style={{
                  animationDuration: `${c.duration.toFixed(2)}s`,
                  animationDelay: `${c.delay.toFixed(2)}s`,
                  animationDirection: c.reverse ? "reverse" : "normal",
                }}
              >
                <span
                  className="orbit-planet"
                  style={{
                    width: ring.size,
                    height: ring.size,
                    opacity: ring.opacity,
                  }}
                />
              </div>
            ))}
          </div>
        ))}
        <div className="hero-core">
          <svg viewBox="0 0 837 1076">
            <defs>
              {SYMBOL_BARS.map((_, i) => (
                <clipPath key={i} id={`hero-bar-${i}`}>
                  <rect
                    className="hero-level"
                    x="-10"
                    y="0"
                    width="860"
                    height="1100"
                  />
                </clipPath>
              ))}
            </defs>
            {SYMBOL_BARS.map((d, i) => (
              <path key={`t${i}`} className="hero-core-track" d={d} />
            ))}
            {SYMBOL_BARS.map((d, i) => (
              <path
                key={`f${i}`}
                className="hero-core-fill"
                d={d}
                clipPath={`url(#hero-bar-${i})`}
              />
            ))}
          </svg>
        </div>
        {heroPairs.map((pair, i) => (
          <div
            key={pair.problem}
            className="hero-slot"
            style={{ top: `${slots[i][0]}%`, left: `${slots[i][1]}%` }}
          >
            <div className="hero-pair">
              <div className="hero-card is-problem">{pair.problem}</div>
              <div className="hero-card is-solution">
                {pair.solution} <ArrowUpRight size={15} />
              </div>
            </div>
          </div>
        ))}
      </div>
      <Container className="new-hero-content">
        <div className="hero-copy">
          <Eyebrow>DO DADO À DECISÃO</Eyebrow>
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
          {/* Legenda ao vivo: conta o que está acontecendo na órbita. */}
          <div className="hero-live" aria-hidden="true">
            <span className="hero-live-tag">AGORA</span>
            <span className="hero-live-msg">
              {heroPairs[0].problem} <span className="hero-live-arrow">→</span>{" "}
              {heroPairs[0].solution}
            </span>
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
