/**
 * Universo do hero da home: estrelas sutis em todo o hero (inclusive atrás
 * do texto), andando bem devagar e piscando, poeira âmbar fraca em volta da
 * órbita e uma estrela cadente de vez em quando. Desenhado num <canvas>.
 *
 * Retorna controles para pausar (scroll, hero fora da tela) e encerrar.
 */
export function startSky(canvas: HTMLCanvasElement, still: boolean) {
  const ctx = canvas.getContext("2d");
  const host = canvas.parentElement;
  if (!ctx || !host) return { pause: () => {}, stop: () => {} };

  type Star = {
    x: number;
    y: number;
    r: number;
    a: number;
    speed: number;
    tw: number;
    warm: boolean;
  };
  let stars: Star[] = [];
  let w = 0;
  let h = 0;
  let shooting: { x: number; y: number; t: number } | null = null;
  let nextShot = performance.now() + 4000;
  let frame = 0;
  let paused = false;

  const seed = () => {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    w = host.clientWidth;
    h = host.clientHeight;
    canvas.width = w * dpr;
    canvas.height = h * dpr;
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    stars = Array.from({ length: Math.round((w * h) / 5200) }, () => {
      const depth = Math.random();
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        r: 0.3 + depth * 1.1,
        a: 0.15 + depth * 0.4,
        speed: 0.01 + depth * 0.045,
        tw: Math.random() * Math.PI * 2,
        warm: Math.random() < 0.18,
      };
    });
  };

  const draw = (now: number) => {
    ctx.clearRect(0, 0, w, h);
    // nebulosas bem fracas: âmbar na órbita, azulada no canto
    const n1 = ctx.createRadialGradient(
      w * 0.74,
      h * 0.5,
      0,
      w * 0.74,
      h * 0.5,
      w * 0.45,
    );
    n1.addColorStop(0, "rgba(255,176,63,0.07)");
    n1.addColorStop(1, "rgba(255,176,63,0)");
    ctx.fillStyle = n1;
    ctx.fillRect(0, 0, w, h);
    const n2 = ctx.createRadialGradient(
      w * 0.18,
      h * 0.82,
      0,
      w * 0.18,
      h * 0.82,
      w * 0.35,
    );
    n2.addColorStop(0, "rgba(120,140,190,0.04)");
    n2.addColorStop(1, "rgba(120,140,190,0)");
    ctx.fillStyle = n2;
    ctx.fillRect(0, 0, w, h);

    for (const s of stars) {
      if (!still) {
        s.x -= s.speed;
        if (s.x < -2) s.x = w + 2;
      }
      const twinkle = still ? 1 : 0.65 + 0.35 * Math.sin(now / 900 + s.tw);
      ctx.globalAlpha = s.a * twinkle;
      ctx.fillStyle = s.warm ? "#ffd59a" : "#f5f0e7";
      ctx.beginPath();
      ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.globalAlpha = 1;

    if (!still && !shooting && now > nextShot) {
      shooting = {
        x: w * (0.1 + Math.random() * 0.4),
        y: h * (0.05 + Math.random() * 0.3),
        t: 0,
      };
    }
    if (shooting) {
      shooting.t += 1;
      const len = 120;
      const x = shooting.x + shooting.t * 9;
      const y = shooting.y + shooting.t * 3.2;
      const life = 1 - shooting.t / 55;
      const g = ctx.createLinearGradient(x, y, x - len, y - len * 0.36);
      g.addColorStop(0, `rgba(255,214,150,${0.5 * life})`);
      g.addColorStop(1, "rgba(255,214,150,0)");
      ctx.strokeStyle = g;
      ctx.lineWidth = 1.4;
      ctx.beginPath();
      ctx.moveTo(x, y);
      ctx.lineTo(x - len, y - len * 0.36);
      ctx.stroke();
      if (shooting.t > 55) {
        shooting = null;
        nextShot = now + 10000 + Math.random() * 8000;
      }
    }
  };

  const loop = (now: number) => {
    draw(now);
    frame = paused ? 0 : requestAnimationFrame(loop);
  };

  seed();
  if (still) draw(0);
  else frame = requestAnimationFrame(loop);

  const resize = new ResizeObserver(() => {
    seed();
    if (still || paused) draw(performance.now());
  });
  resize.observe(host);

  return {
    pause(value: boolean) {
      if (still || value === paused) return;
      paused = value;
      if (!paused && !frame) frame = requestAnimationFrame(loop);
    },
    stop() {
      cancelAnimationFrame(frame);
      resize.disconnect();
    },
  };
}
