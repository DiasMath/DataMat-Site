/**
 * TestimonialCard — depoimento com foto, frase em itálico e resultado numérico.
 * TODO CONTEÚDO: usar FOTO REAL DO CLIENTE (não banco de imagens).
 */
export type Testimonial = {
  quote: string;
  name: string;
  role: string;
  photo?: string;
  metric: string;
  metricLabel: string;
};

const TestimonialCard = ({ t }: { t: Testimonial }) => (
  <article className="surface-card flex min-w-[85vw] snap-start flex-col gap-7 p-8 md:min-w-[560px] md:p-10 hover-raise">
    <blockquote className="t-quote text-foreground/90">“{t.quote}”</blockquote>

    <div className="mt-auto flex items-center justify-between gap-6 border-t border-border pt-6">
      <div className="flex items-center gap-4">
        {t.photo ? (
          <img
            src={t.photo}
            alt={`Foto de ${t.name}`}
            loading="lazy"
            width={56}
            height={56}
            className="h-14 w-14 rounded-full object-cover"
          />
        ) : (
          /* TODO CONTEÚDO: trocar por foto real do cliente, não banco de imagens */
          <span className="flex h-14 w-14 items-center justify-center rounded-full border border-dashed border-border font-display text-lg font-bold text-muted-foreground">
            {t.name.slice(0, 2).toUpperCase()}
          </span>
        )}
        <div>
          <p className="font-display text-base font-bold text-foreground">{t.name}</p>
          <p className="text-sm text-muted-foreground">{t.role}</p>
        </div>
      </div>

      <div className="text-right">
        <p className="font-display text-3xl font-extrabold leading-none text-primary">{t.metric}</p>
        <p className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{t.metricLabel}</p>
      </div>
    </div>
  </article>
);

export default TestimonialCard;
