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

/**
 * Órbitas: quantos planetas, segundos por volta, tamanho e intensidade (como o
 * site já tinha). Na mesma órbita todos têm a mesma velocidade e ficam
 * espaçados (com um leve desvio): nunca se aproximam. Cada órbita tem
 * velocidade e ponto de partida próprios, então não alinham entre si.
 */
const rings = [
  { key: "one", planets: 2, secs: 26, size: 7, opacity: 1 },
  { key: "two", planets: 2, secs: 42, size: 7, opacity: 0.7 },
  { key: "three", planets: 3, secs: 64, size: 5, opacity: 0.5 },
].map((ring, ri) => {
  const duration = ring.secs * (0.85 + rand() * 0.3);
  const phase = rand();
  return {
    ...ring,
    carriers: Array.from({ length: ring.planets }, (_, i) => ({
      duration,
      delay: -duration * (phase + i / ring.planets + (rand() - 0.5) * 0.08),
      reverse: ri % 2 === 1,
    })),
  };
});

/**
 * Cartões andando em cima das órbitas: 2 na de dentro e 2 na do meio, em
 * lados opostos, todos com a mesma velocidade (uma volta a cada 10 minutos).
 * [órbita, ângulo inicial em graus]
 */
const LAP = 600;
const LANES = { in: 23, mid: 36 } as const; // raio, em % da órbita
const cardPlan: [keyof typeof LANES, number][] = [
  ["in", -70],
  ["mid", 20],
  ["in", 110],
  ["mid", 200],
];

/**
 * Hero da home: o sistema "DATAMAT".
 * - Universo de estrelas sutis no hero inteiro (src/pages/hero/sky.ts).
 * - Logo DATAMAT no centro da órbita, com as 3 barras "carregando".
 * - Um para um: cada problema (cartão escuro) entra na logo e volta, no mesmo
 *   lugar, como a solução (cartão claro); a logo dá um "pump" quando ele sai.
 *   Embaixo dos botões, um texto digitando conta o que está acontecendo.
 * - Os cartões andam em cima das órbitas bem devagar; perto do texto ou das
 *   bordas, somem e reaparecem logo mais à frente, sem encostar um no outro.
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
      const orbitBox = q(".hero-orbit")[0];
      const levels = q(".hero-level");
      const copy = q(".hero-copy")[0];
      const headline = q(".hero-copy h1")[0];
      const liveTxt = q(".hero-live-txt")[0];
      // Igual ao resto do site: a animação roda sempre (só os testes a desligam).
      const still = motionDisabled;

      // O subtítulo e o texto digitando nunca ficam mais largos que a linha
      // mais longa do título (medida de verdade, a cada mudança de tamanho).
      const fitBelow = () => {
        const range = document.createRange();
        range.selectNodeContents(headline);
        const left = headline.getBoundingClientRect().left;
        let right = left;
        for (const rc of range.getClientRects())
          right = Math.max(right, rc.right);
        copy.style.setProperty("--title-w", `${Math.ceil(right - left)}px`);
      };
      const titleSize = new ResizeObserver(fitBelow);
      titleSize.observe(headline);
      document.fonts?.ready.then(fitBelow);

      const sky = startSky(q<HTMLCanvasElement>(".hero-sky")[0], still);

      // Sem movimento: tudo parado, já com as soluções.
      if (still) {
        section.classList.add("is-paused");
        gsap.set([q(".orbit-ring"), core, q(".is-solution")], { autoAlpha: 1 });
        gsap.set(q(".hero-cardfade"), { opacity: 1 });
        return () => {
          titleSize.disconnect();
          sky.stop();
        };
      }

      // ---------- Texto digitando ----------
      let typing = 0;
      const type = (text: string) => {
        window.clearInterval(typing);
        let n = 0;
        liveTxt.textContent = "";
        typing = window.setInterval(() => {
          liveTxt.textContent = text.slice(0, ++n);
          if (n >= text.length) window.clearInterval(typing);
        }, 42);
      };
      const waiting = () => {
        window.clearInterval(typing);
        liveTxt.textContent = "aguardando…";
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
          .to(core, { scale: 1, duration: 0.3, ease: "power2.out" }, "-=0.15");
      // Entrega a solução: "pump" da logo no mesmo instante em que o cartão sai.
      const pump = () =>
        gsap
          .timeline()
          .to(core, { scale: 1.18, duration: 0.2, ease: "power2.out" })
          .to(core, { scale: 1, duration: 0.9, ease: "elastic.out(1, 0.4)" });

      // Distância de cada cartão até o centro da logo.
      const toCore = (axis: "x" | "y") => (_: number, el: Element) => {
        const a = el.getBoundingClientRect();
        const b = core.getBoundingClientRect();
        return axis === "x"
          ? b.left + b.width / 2 - (a.left + a.width / 2)
          : b.top + b.height / 2 - (a.top + a.height / 2);
      };

      // ---------- Cartões nas órbitas ----------
      // O giro é todo em CSS (suave como os planetas); aqui só lemos o ângulo
      // e, quando precisa, adiantamos o cartão na própria órbita.
      type Card = {
        lane: keyof typeof LANES;
        arm: HTMLElement;
        upright: HTMLElement;
        fade: HTMLElement;
        jumping: boolean;
        busy: boolean; // a caminho da logo: não pula até voltar
        landing: number | null;
      };
      const cards: Card[] = q<HTMLElement>(".hero-lane").map((lane, i) => ({
        lane: cardPlan[i][0],
        arm: lane.querySelector<HTMLElement>(".hero-arm")!,
        upright: lane.querySelector<HTMLElement>(".hero-upright")!,
        fade: lane.querySelector<HTMLElement>(".hero-cardfade")!,
        jumping: false,
        busy: false,
        landing: null,
      }));
      const angleOf = (c: Card) => {
        const a = c.arm.getAnimations()[0];
        const progress = Number(a?.effect?.getComputedTiming().progress) || 0;
        return progress * Math.PI * 2;
      };
      const shift = (c: Card, rad: number) => {
        const ms = (rad / (Math.PI * 2)) * LAP * 1000;
        [c.arm, c.upright].forEach((el) =>
          el.getAnimations().forEach((a) => {
            a.currentTime = Number(a.currentTime ?? 0) + ms;
          }),
        );
      };

      // Linhas de texto, botões e texto digitando (medidos a cada 0,5 s).
      let textLines: DOMRect[] = [];
      let floating: DOMRect | null = null; // botão do WhatsApp, fixo no canto
      let measured = 0;
      const lines = () => {
        const now = performance.now();
        if (now - measured > 500) {
          measured = now;
          textLines = [];
          const walker = document.createTreeWalker(copy, NodeFilter.SHOW_TEXT);
          const range = document.createRange();
          while (walker.nextNode()) {
            if (!walker.currentNode.textContent?.trim()) continue;
            range.selectNodeContents(walker.currentNode);
            for (const rc of range.getClientRects()) textLines.push(rc);
          }
          copy
            .querySelectorAll(".hero-actions > *, .hero-live")
            .forEach((el) => textLines.push(el.getBoundingClientRect()));
          floating =
            document
              .querySelector(".whatsapp-float")
              ?.getBoundingClientRect() ?? null;
        }
        return textLines;
      };

      let started = false; // os cartões só aparecem depois da entrada
      let paused = false;
      let prepareNow: ((k: number) => void) | null = null;
      const watch = () => {
        prepareNow = null;
        if (!started || paused || window.innerWidth <= 1024) return;
        const area = section.getBoundingClientRect();
        const orb = orbitBox.getBoundingClientRect();
        const ox = orb.left + orb.width / 2;
        const oy = orb.top + orb.height / 2;
        const text = lines();
        const centerAt = (c: Card, ang: number) => {
          const R = (LANES[c.lane] / 100) * orb.width;
          return [ox + R * Math.cos(ang), oy + R * Math.sin(ang)];
        };
        const visibleAt = (c: Card, ang: number) => {
          const [cx, cy] = centerAt(c, ang);
          const w = c.fade.offsetWidth;
          const h = c.fade.offsetHeight + 22; // inclui a flutuação
          const l = cx - w / 2;
          const r = cx + w / 2;
          const t = cy - h / 2;
          const b = cy + h / 2;
          // dentro do hero, sem encostar nas bordas
          const inside =
            r < area.right - 16 && t > area.top + 16 && b < area.bottom - 16;
          // e longe do texto
          const hitsText = text.some(
            (rc) => rc.top < b + 12 && rc.bottom > t - 12 && rc.right + 28 > l,
          );
          // nem embaixo do botão do WhatsApp
          const f = floating;
          const underButton =
            !!f &&
            f.width > 0 &&
            f.left < r + 12 &&
            f.right > l - 12 &&
            f.top < b + 12 &&
            f.bottom > t - 12;
          return inside && !hitsText && !underButton;
        };
        const clearFor = (c: Card, ang: number, span: number) => {
          for (let d = 0; d <= span; d += 0.02)
            if (!visibleAt(c, ang + d)) return false;
          return true;
        };
        const tooClose = (c: Card, ang: number) =>
          cards.some((x) => {
            if (x === c) return false;
            // quem está pulando conta pelo lugar onde vai pousar (já reservado)
            const xa = x.jumping ? x.landing : angleOf(x);
            if (xa == null) return false;
            const [ax, ay] = centerAt(c, ang);
            const [bx, by] = centerAt(x, xa);
            return (
              Math.hypot(ax - bx, ay - by) <
              (c.fade.offsetWidth + x.fade.offsetWidth) / 2 + 60
            );
          });
        // Some rápido e reaparece logo mais à frente, longe dos outros.
        const jump = (c: Card) => {
          c.jumping = true;
          c.landing = null;
          c.fade.style.transitionDuration = "0.35s";
          c.fade.style.opacity = "0";
          window.setTimeout(() => {
            const base = angleOf(c);
            // Procura, à frente na órbita, um lugar visível e longe dos outros.
            const find = (span: number, spaced: boolean) => {
              for (let step = 0.02; step < Math.PI * 2; step += 0.02) {
                const ang = base + step;
                if (spaced && tooClose(c, ang)) continue;
                if (clearFor(c, ang, span)) return step;
              }
              return null;
            };
            // quem vai entrar na logo precisa ficar visível a viagem toda;
            // em telas apertadas, aceita um trecho menor
            const step =
              (c.busy ? find(0.18, true) : null) ??
              find(0.04, true) ??
              (c.busy ? find(0.04, false) : null);
            c.fade.style.transitionDuration = "0.5s";
            if (step != null) {
              c.landing = base + step;
              shift(c, step);
              // o cartão que vai entrar na logo tem a vez: quem ficou perto
              // dele sai da frente
              if (c.busy)
                cards.forEach((x) => {
                  if (
                    x !== c &&
                    !x.busy &&
                    !x.jumping &&
                    tooClose(x, angleOf(x))
                  )
                    jump(x);
                });
            }
            // sem lugar livre agora: fica escondido e tenta de novo em seguida
            // (só o cartão que vai entrar na logo aparece de qualquer jeito)
            if (step != null || c.busy) c.fade.style.opacity = "1";
            window.setTimeout(() => {
              c.jumping = false;
              c.landing = null;
            }, 550);
          }, 380);
        };
        // Antes de um cartão entrar na logo: se ele vai precisar pular logo,
        // pula agora (e não no meio da viagem).
        prepareNow = (k) => {
          const c = cards[k];
          if (!c) return;
          c.busy = true;
          if (c.jumping) return;
          if (clearFor(c, angleOf(c), 0.18)) c.fade.style.opacity = "1";
          else jump(c);
        };
        cards.forEach((c) => {
          if (c.jumping || c.busy) return;
          const ang = angleOf(c);
          // vai sumir (texto ou borda) ou está perto de outro cartão: some
          // rápido e reaparece logo mais à frente
          if (!visibleAt(c, ang + 0.03) || tooClose(c, ang)) jump(c);
          else c.fade.style.opacity = "1";
        });
      };
      const prepare = (k: number) => {
        watch();
        prepareNow?.(k);
      };
      const watcher = window.setInterval(watch, 200);

      // ---------- Um para um ----------
      const pairs = q(".hero-pair");
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
        .call(waiting)
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
          .addLabel(`go${k}`, k === 0 ? "+=1.8" : "+=2.2")
          // um pouco antes de sair, o cartão já fica num lugar visível
          .call(() => prepare(k), undefined, `go${k}-=2.6`)
          .call(
            () => type(`› processando: ${pair.problem.toLowerCase()}…`),
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
          .call(() => type(`✓ resolvido: ${pair.solution.toLowerCase()}`))
          .addLabel(`out${k}`)
          .add(pump(), `out${k}`)
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
            `out${k}`,
          )
          .call(() => {
            if (cards[k]) cards[k].busy = false;
          });
      });
      cycle.to(
        pairs,
        { autoAlpha: 0, y: -10, duration: 0.5, stagger: 0.08 },
        "+=3",
      );
      cycle.timeScale(0.75); // ritmo calmo

      // ---------- Entrada ----------
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
            q(".hero-copy > p, .hero-actions, .hero-live"),
            { autoAlpha: 0, y: 18, duration: 0.7, stagger: 0.1 },
            0.75,
          );
        SplitText.create(headline, {
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
        titleSize.disconnect();
        window.removeEventListener("scroll", onScroll);
        window.clearTimeout(idle);
        window.clearInterval(typing);
        window.clearInterval(watcher);
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
        {/* Cartões: .hero-lane = a órbita; .hero-arm gira; .hero-upright gira
            ao contrário (o cartão fica em pé); .hero-cardfade some e aparece;
            .hero-bob flutua; .hero-pair viaja até a logo (GSAP). */}
        {heroPairs.map((pair, i) => {
          const [lane, deg] = cardPlan[i];
          const phase = (((deg % 360) + 360) % 360) / 360;
          const timing = {
            animationDuration: `${LAP}s`,
            animationDelay: `${(-phase * LAP).toFixed(2)}s`,
          };
          return (
            <div key={pair.problem} className={`hero-lane is-${lane}`}>
              <div className="hero-arm" style={timing}>
                <div className="hero-mount">
                  <div className="hero-upright" style={timing}>
                    <div className="hero-cardfade">
                      <div className="hero-bob">
                        <div className="hero-pair">
                          <div className="hero-card is-problem">
                            {pair.problem}
                          </div>
                          <div className="hero-card is-solution">
                            {pair.solution} <ArrowUpRight size={15} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
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
          {/* Texto digitando: conta o que está acontecendo na órbita. */}
          <div className="hero-live" aria-hidden="true">
            <span className="hero-live-txt">aguardando…</span>
            <span className="hero-live-caret" />
          </div>
        </div>
      </Container>
    </section>
  );
}
