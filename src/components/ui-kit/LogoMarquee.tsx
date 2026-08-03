/**
 * LogoMarquee — prova social com peso.
 * TODO CONTEÚDO: substituir por LOGOS REAIS de clientes/parceiros
 * (não usar placeholders genéricos nem logos de banco de imagens).
 * Formato ideal: PNG/SVG transparente, altura mínima 48px.
 */
import logoLojaJuntos from "/clients_logos/logo_lojajuntos.png";

type Logo = { name: string; src?: string };

const logos: Logo[] = [
  { name: "Loja Juntos.com", src: logoLojaJuntos },
  // TODO CONTEÚDO: adicionar aqui os demais logos reais de clientes/parceiros
  { name: "Cliente 02" },
  { name: "Cliente 03" },
  { name: "Cliente 04" },
  { name: "Cliente 05" },
  { name: "Cliente 06" },
];

const LogoItem = ({ logo }: { logo: Logo }) =>
  logo.src ? (
    <img
      src={logo.src}
      alt={`Logo ${logo.name}`}
      loading="lazy"
      width={200}
      height={72}
      className="h-14 md:h-16 w-auto object-contain grayscale opacity-60 transition duration-300 hover:grayscale-0 hover:opacity-100"
    />
  ) : (
    <span className="flex h-14 md:h-16 items-center whitespace-nowrap rounded-lg border border-dashed border-border px-7 font-display text-xl md:text-2xl font-bold text-muted-foreground/70 transition-colors duration-300 hover:text-foreground">
      {logo.name}
    </span>
  );

const LogoMarquee = () => {
  const loop = [...logos, ...logos];

  return (
    <div className="mask-fade-x overflow-hidden">
      <div className="flex w-max animate-marquee items-center gap-14 md:gap-20 pr-14 md:pr-20">
        {loop.map((logo, i) => (
          <LogoItem key={`${logo.name}-${i}`} logo={logo} />
        ))}
      </div>
    </div>
  );
};

export default LogoMarquee;
