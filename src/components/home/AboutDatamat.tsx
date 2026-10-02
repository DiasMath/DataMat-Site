import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";
import { about, people, principles } from "../../content/about";

/**
 * "Quem é a DATAMAT": seção de texto, em fundo claro, para dar respiro entre
 * as seções animadas. Explica quem somos e como pensamos.
 */
export function AboutDatamat() {
  return (
    <section className="bg-cream py-20 text-graphite md:py-32">
      <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
        <div className="grid gap-10 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div data-reveal>
            <p className="text-xs font-semibold tracking-widest text-graphite/60">
              {about.eyebrow}
            </p>
            <h2 className="mt-5 text-5xl leading-[1.02] font-semibold tracking-tight md:text-7xl">
              {about.title}{" "}
              <span className="text-graphite/45">{about.highlight}</span>
            </h2>
          </div>

          <div className="lg:pt-10" data-reveal>
            <p className="text-xl leading-relaxed font-semibold md:text-2xl">
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
              className="group mt-8 inline-flex items-center gap-2 border-b-2 border-graphite pb-1 font-semibold transition hover:border-amber"
            >
              {about.link}
              <ArrowUpRight
                size={18}
                aria-hidden="true"
                className="transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </Link>
          </div>
        </div>

        <div className="mt-16 md:mt-24">
          <p className="text-xs font-semibold tracking-widest text-graphite/60">
            COMO PENSAMOS
          </p>
          <ol className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10">
            {principles.map((p, i) => (
              <li
                key={p.title}
                className="border-t-2 border-graphite pt-5"
                data-reveal
                data-delay={String(i * 0.1)}
              >
                <span className="text-sm font-semibold text-graphite/50 tabular-nums">
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
