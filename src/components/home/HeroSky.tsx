/**
 * Fundo do hero inteiro: grade e estrelas. Mais apagado do lado do texto
 * (esquerda) e mais vivo do lado da órbita, para o texto continuar em foco.
 */
const stars = Array.from({ length: 90 }, (_, i) => {
  const x = (i * 53 + 7) % 100;
  const y = (i * 29 + 11) % 100;
  return {
    x,
    y,
    size: i % 7 === 0 ? 3 : i % 3 === 0 ? 2 : 1.5,
    // mais fracas onde fica o texto
    opacity: x < 45 ? 0.18 : 0.5,
    twinkle: x >= 45 && i % 5 === 0,
  };
});

export function HeroSky() {
  return (
    <div aria-hidden="true" className="hero-sky">
      <div className="hero-sky-grid" />
      {stars.map((s, i) => (
        <span
          key={i}
          className={`absolute rounded-full bg-cream ${s.twinkle ? "animate-pulse" : ""}`}
          style={{
            left: `${s.x}%`,
            top: `${s.y}%`,
            width: s.size,
            height: s.size,
            opacity: s.opacity,
            animationDelay: s.twinkle ? `${(i % 4) * 0.6}s` : undefined,
          }}
        />
      ))}
    </div>
  );
}
