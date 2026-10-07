import { Link } from "react-router-dom";
import { ArrowUpRight, BarChart3, Globe, Layers } from "lucide-react";
import { people, principles } from "../content/about";
import { clients } from "../content/clients";
import { menuSolutions } from "../content/navigation";
import { CTA } from "../components/FinalCta";
import { DatamatSymbol } from "../components/DatamatSymbol";

/** Três fatos curtos ao lado do título. */
const facts = [
  {
    icon: BarChart3,
    title: "Começamos pelos dados",
    text: "Antes de propor, entendemos os números e a rotina.",
  },
  {
    icon: Layers,
    title: "Quatro frentes, um contato",
    text: "Dados, automação, marca e sites conversando entre si.",
  },
  {
    icon: Globe,
    title: "Atendimento online",
    text: "Para empresas de todo o Brasil.",
  },
];

/** Como é trabalhar com a DATAMAT (mesmas promessas do FAQ e do Contato). */
const howWeWork = [
  {
    title: "Conversa",
    text: "Entendemos o desafio, a rotina e o que já existe na empresa: sistemas, planilhas, pessoas.",
  },
  {
    title: "Caminho",
    text: "Apresentamos o que fazer primeiro, com escopo e prazo definidos antes de qualquer compromisso.",
  },
  {
    title: "Entrega em etapas",
    text: "Sempre que possível, entregamos por partes, para o resultado aparecer cedo.",
  },
  {
    title: "Uso no dia a dia",
    text: "Tudo pensado para quem gere a empresa abrir, entender e decidir, sem depender de especialista.",
  },
];

export function AboutPage() {
  return (
    <>
      {/* Abertura */}
      <section className="relative overflow-hidden bg-bg-hero pt-16 pb-20 md:pt-24 md:pb-28">
        <DatamatSymbol className="pointer-events-none absolute -right-16 bottom-0 w-[42vw] max-w-xl text-white/[0.03] md:-right-8" />
        <div className="relative mx-auto grid max-w-screen-2xl grid-cols-[minmax(0,1fr)] items-end gap-12 px-5 md:px-8 lg:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] lg:gap-16">
          <div>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber">
              <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
              SOBRE A DATAMAT
            </p>
            <h1
              className="mt-5 text-5xl leading-[1.02] font-semibold tracking-tight text-cream md:text-7xl"
              data-reveal="heading"
            >
              Tecnologia, estratégia e execução mais perto do negócio.
            </h1>
            <p className="mt-6 max-w-xl text-xl text-text-muted">
              Começamos pelo problema. A ferramenta vem depois.
            </p>
          </div>
          <ul className="grid gap-3" data-reveal data-stagger="0.1">
            {facts.map(({ icon: Icon, title, text }) => (
              <li
                key={title}
                className="flex gap-4 rounded-2xl border border-white/10 bg-graphite p-5"
              >
                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-amber/10 text-amber">
                  <Icon size={20} aria-hidden="true" />
                </span>
                <span>
                  <span className="block font-semibold text-cream">
                    {title}
                  </span>
                  <span className="text-sm text-text-muted">{text}</span>
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Por que a DATAMAT existe */}
      <section className="bg-cream py-20 text-graphite md:py-28">
        <div className="mx-auto grid max-w-screen-2xl gap-10 px-5 md:px-8 lg:grid-cols-[minmax(0,6fr)_minmax(0,5fr)] lg:gap-20">
          <div data-reveal>
            <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-graphite/75">
              <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
              POR QUE EXISTIMOS
            </p>
            <h2 className="mt-5 text-4xl leading-[1.05] font-semibold tracking-tight md:text-6xl">
              A empresa não precisa de mais fornecedores.{" "}
              <span className="bg-gradient-to-r from-amber/70 to-amber/70 bg-[length:100%_0.3em] bg-left-bottom bg-no-repeat box-decoration-clone">
                Precisa de clareza.
              </span>
            </h2>
          </div>
          <div className="lg:pt-10" data-reveal>
            <p className="relative pl-5 text-xl leading-relaxed font-semibold md:text-2xl">
              <span
                aria-hidden="true"
                className="absolute top-1 bottom-1 left-0 w-1 rounded-full bg-amber"
              />
              Números espalhados, rotinas manuais, marca sem padrão e um site
              que não vende costumam ser tratados por pessoas diferentes, que
              não conversam entre si.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-graphite/75">
              A DATAMAT nasceu da inteligência de dados para juntar essas
              pontas. Primeiro entendemos os números e a rotina da empresa;
              depois agimos onde o problema realmente está, seja no painel, na
              operação, na marca ou no site.
            </p>
            <p className="mt-5 text-lg leading-relaxed text-graphite/75">
              Cada frente resolve um problema sozinha. Quando faz sentido, elas
              se conectam, com um único ponto de contato do início ao fim.
            </p>
          </div>
        </div>

        <div className="mx-auto mt-16 max-w-screen-2xl px-5 md:mt-24 md:px-8">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-graphite/75">
            <span
              aria-hidden="true"
              className="size-1.5 rounded-full bg-amber"
            />
            COMO PENSAMOS
          </p>
          <ol
            className="mt-6 grid gap-8 md:grid-cols-3 md:gap-10"
            data-reveal
            data-stagger="0.1"
          >
            {principles.map((p, i) => (
              <li key={p.title} className="border-t-2 border-amber pt-5">
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
      </section>

      {/* Como é trabalhar com a gente */}
      <section className="bg-bg py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber">
            <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
            COMO É TRABALHAR COM A GENTE
          </p>
          <h2 className="mt-4 max-w-3xl text-4xl leading-tight font-semibold tracking-tight text-cream md:text-5xl">
            Simples de começar. Claro do início ao fim.
          </h2>
          <ol
            className="relative mt-12 grid gap-8 md:grid-cols-4 md:gap-6"
            data-reveal
            data-stagger="0.12"
          >
            <span
              aria-hidden="true"
              className="absolute top-5 right-0 left-0 hidden h-px bg-white/15 md:block"
            />
            {howWeWork.map((s, i) => (
              <li key={s.title} className="relative">
                <span className="relative flex size-10 items-center justify-center rounded-full bg-amber font-bold text-graphite tabular-nums">
                  {i + 1}
                </span>
                <h3 className="mt-5 text-xl font-semibold text-cream">
                  {s.title}
                </h3>
                <p className="mt-2 leading-relaxed text-text-muted">{s.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Frentes */}
      <section className="bg-bg-hero py-20 md:py-28">
        <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
          <p className="flex items-center gap-3 text-xs font-semibold tracking-widest text-amber">
            <span aria-hidden="true" className="h-0.5 w-8 bg-amber" />
            NOSSAS FRENTES
          </p>
          <h2 className="mt-4 text-4xl leading-tight font-semibold tracking-tight text-cream md:text-5xl">
            Escolha por onde começar.
          </h2>
          <ul
            className="mt-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4"
            data-reveal
            data-stagger="0.08"
          >
            {menuSolutions.map(
              ({ title, path, description, icon: Icon }, i) => (
                <li key={path}>
                  <Link
                    to={path}
                    className="group flex h-full flex-col rounded-3xl border border-white/10 bg-graphite p-6 transition hover:-translate-y-1 hover:border-amber/60"
                  >
                    <span className="flex items-center justify-between">
                      <span className="flex size-12 items-center justify-center rounded-2xl bg-amber/10 text-amber transition group-hover:bg-amber group-hover:text-graphite">
                        <Icon size={22} aria-hidden="true" />
                      </span>
                      <span className="text-sm font-semibold text-text-muted tabular-nums">
                        {String(i + 1).padStart(2, "0")}
                      </span>
                    </span>
                    <span className="mt-8 text-xl font-semibold text-cream">
                      {title}
                    </span>
                    <span className="mt-2 flex-1 leading-relaxed text-text-muted">
                      {description}
                    </span>
                    <span className="mt-6 inline-flex items-center gap-1.5 text-sm font-semibold text-cream group-hover:text-amber">
                      Conhecer <ArrowUpRight size={15} aria-hidden="true" />
                    </span>
                  </Link>
                </li>
              ),
            )}
          </ul>

          {clients.length > 0 && (
            <div className="mt-16 flex flex-wrap items-center gap-x-8 gap-y-4 border-t border-white/10 pt-10">
              <p className="text-xs font-semibold tracking-widest text-text-muted">
                QUEM JÁ TRABALHA COM A DATAMAT
              </p>
              {clients.map((c) => (
                <img
                  key={c.name}
                  src={c.logo}
                  alt={`Logo ${c.name}`}
                  width={56}
                  height={56}
                  loading="lazy"
                  className="size-14 rounded-lg"
                />
              ))}
              <Link
                to="/cases"
                className="inline-flex items-center gap-1.5 text-sm font-semibold text-cream hover:text-amber"
              >
                Ver cases <ArrowUpRight size={15} aria-hidden="true" />
              </Link>
            </div>
          )}
        </div>
      </section>

      {people.length > 0 && (
        <section className="bg-cream py-20 text-graphite md:py-28">
          <div className="mx-auto max-w-screen-2xl px-5 md:px-8">
            <h2 className="text-4xl font-semibold tracking-tight md:text-5xl">
              Quem está por trás.
            </h2>
            <div className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
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
                    <p className="text-sm text-graphite/70">{p.role}</p>
                  </figcaption>
                </figure>
              ))}
            </div>
          </div>
        </section>
      )}

      <CTA title="Vamos conversar sobre a sua empresa?" />
    </>
  );
}
