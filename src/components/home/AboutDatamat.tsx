import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { about, people, principles } from "../../content/about";
import { useInView } from "../scenes/useInView";

/**
 * "Quem é a DATAMAT": seção de texto, em fundo claro, para dar respiro entre
 * as seções animadas. Explica quem somos e como pensamos.
 */
export function AboutDatamat() {
  // Detalhes em âmbar entram de leve quando a seção aparece.
  const [ref, on] = useInView<HTMLElement>(0.25);
  return (
    <section ref={ref} className="bg-cream py-20 text-graphite md:py-32">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div data-reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-graphite/75">
              <span
                aria-hidden="true"
                className={`h-0.5 bg-amber transition-all duration-700 ease-brand-out ${on ? "w-8" : "w-0"}`}
              />
              {about.eyebrow}
            </p>
            <h2 className="mt-5 text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl">
              {about.title}{" "}
              {/* marca-texto âmbar que se desenha atrás da frase */}
              <span
                className={`bg-gradient-to-r from-amber/70 to-amber/70 bg-left-bottom bg-no-repeat box-decoration-clone transition-[background-size] delay-300 duration-[1400ms] ease-brand-out ${on ? "bg-[length:100%_0.32em]" : "bg-[length:0%_0.32em]"}`}
              >
                {about.highlight}
              </span>
            </h2>
          </div>

          <div className="lg:pt-10" data-reveal>
            <p className="relative pl-5 text-xl leading-relaxed font-semibold md:text-2xl">
              <span
                aria-hidden="true"
                className={`absolute top-1 bottom-1 left-0 w-1 origin-top rounded-full bg-amber transition-transform delay-500 duration-700 ease-brand-out ${on ? "scale-y-100" : "scale-y-0"}`}
              />
              {about.lead}
            </p>
            {about.body.map((p) => (
              <p
                key={p}
                className="mt-5 text-lg leading-relaxed text-graphite/75"
              >
                {p}
              </p>
            ))}
            <Link
              to="/sobre"
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-amber pb-1 font-semibold transition hover:text-graphite/70"
            >
              {about.link}
              <span className="flex size-7 items-center justify-center rounded-full bg-amber transition duration-500 ease-brand-out group-hover:rotate-45">
                <ArrowUpRight size={15} aria-hidden="true" />
              </span>
            </Link>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-graphite/75">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-amber"
            />
            COMO PENSAMOS
          </p>
          <ol className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="group relative border-t-2 border-graphite/15 pt-5"
                data-reveal
                data-delay={String(i * 0.1)}
              >
                {/* linha âmbar que se desenha sobre a borda, uma coluna após a outra */}
                <span
                  aria-hidden="true"
                  className={`absolute -top-0.5 left-0 h-0.5 w-full origin-left bg-amber transition-transform duration-1000 ease-brand-out ${on ? "scale-x-100" : "scale-x-0"}`}
                  style={{ transitionDelay: `${600 + i * 250}ms` }}
                />
                <span className="inline-block rounded-md bg-amber px-1.5 py-0.5 text-xs font-bold tabular-nums">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-2 text-xl font-semibold md:text-2xl">
                  {p.title}
                </h3>
                <p className="mt-2 leading-relaxed text-graphite/75">
                  {p.text}
                </p>
              </li>
            ))}
          </ol>
        </div>

        {people.length > 0 && (
          <div className="mt-16 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {people.map((p) => (
              <figure
                key={p.name}
                className="flex items-center gap-5 rounded-3xl bg-white p-5"
                data-reveal
              >
                <img
                  src={p.photo}
                  alt={p.name}
                  width={96}
                  height={96}
                  loading="lazy"
                  className="size-24 rounded-2xl object-cover"
                />
                <figcaption>
                  {p.quote && <p>“{p.quote}”</p>}
                  <p className="mt-2 font-semibold">{p.name}</p>
                  <p className="text-sm text-graphite/60">{p.role}</p>
                </figcaption>
              </figure>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
