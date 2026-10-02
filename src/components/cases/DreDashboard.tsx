import { Fragment, useState } from "react";
import { ArrowDownRight, ArrowUpRight, ChevronRight } from "lucide-react";
import {
  demoMonths,
  groups,
  groupTotal,
  metrics,
} from "../../content/dre-demo";

const fmt = (v: number) => (v < 0 ? `(${Math.abs(v)})` : String(v));
const pct = (part: number, whole: number) =>
  `${((Math.abs(part) / whole) * 100).toFixed(1).replace(".", ",")}%`;

type Tab = "painel" | "tabela";

/** Subtotais do DRE, logo depois do grupo que fecha cada um. */
const totalsAfter: Record<
  string,
  { label: string; get: (i: number) => number }
> = {
  deducoes: { label: "Receita líquida", get: (i) => metrics(i).liquida },
  cmv: { label: "Lucro bruto", get: (i) => metrics(i).lucroBruto },
  variaveis: { label: "Resultado", get: (i) => metrics(i).resultado },
};

function TotalRow({
  label,
  get,
  month,
  receita,
}: {
  label: string;
  get: (i: number) => number;
  month: number;
  receita: number;
}) {
  return (
    <tr
      className={`border-b border-graphite/15 font-bold ${label === "Resultado" ? "bg-amber/15" : "bg-graphite/[0.04]"}`}
    >
      <td className="py-2 pr-3">{label}</td>
      {demoMonths.map((mm, i) => (
        <td
          key={mm}
          className={`px-2 py-2 text-right tabular-nums ${i === month ? "bg-amber/25" : ""}`}
        >
          {fmt(get(i))}
        </td>
      ))}
      <td className="px-2 py-2 text-right tabular-nums">
        {pct(get(month), receita)}
      </td>
    </tr>
  );
}

/** Variação contra o mês anterior. `goodWhenUp`: subir é bom (receita) ou ruim (despesa). */
function Delta({
  now,
  before,
  goodWhenUp = true,
  partial = false,
}: {
  now: number;
  before?: number;
  goodWhenUp?: boolean;
  /** mês em andamento: não compara com o mês fechado anterior */
  partial?: boolean;
}) {
  if (partial)
    return <span className="text-xs text-graphite/50">mês parcial</span>;
  if (before === undefined)
    return <span className="text-xs text-graphite/40">—</span>;
  const change = ((Math.abs(now) - Math.abs(before)) / Math.abs(before)) * 100;
  const up = change >= 0;
  const good = up === goodWhenUp;
  const Icon = up ? ArrowUpRight : ArrowDownRight;
  return (
    <span
      className={`inline-flex items-center gap-0.5 text-xs font-semibold ${good ? "text-positive" : "text-negative"}`}
    >
      <Icon size={13} aria-hidden="true" />
      {Math.abs(change).toFixed(1).replace(".", ",")}%
    </span>
  );
}

function Kpi({
  label,
  value,
  sub,
  delta,
}: {
  label: string;
  value: string;
  sub?: string;
  delta: React.ReactNode;
}) {
  return (
    <div className="rounded-xl bg-white p-3 md:p-4">
      <p className="text-xs text-graphite/60">{label}</p>
      <p className="mt-1 text-xl font-bold tabular-nums md:text-2xl">{value}</p>
      <div className="mt-1 flex items-center justify-between gap-2">
        {sub && <span className="text-xs text-graphite/60">{sub}</span>}
        {delta}
      </div>
    </div>
  );
}

/** Rosca de duas fatias (SVG). */
function Donut({ a, b }: { a: number; b: number }) {
  const total = a + b;
  const r = 15.915; // circunferência = 100
  const pa = (a / total) * 100;
  return (
    <svg
      viewBox="0 0 42 42"
      className="size-32 shrink-0 md:size-36"
      role="img"
      aria-label={`Fixas ${pct(a, total)}, variáveis ${pct(b, total)}`}
    >
      <circle
        cx="21"
        cy="21"
        r={r}
        fill="none"
        stroke="var(--color-amber)"
        strokeWidth="6"
      />
      <circle
        cx="21"
        cy="21"
        r={r}
        fill="none"
        stroke="var(--color-graphite)"
        strokeWidth="6"
        strokeDasharray={`${pa} ${100 - pa}`}
        strokeDashoffset="25"
        className="transition-all duration-500"
      />
      <text
        x="21"
        y="20"
        textAnchor="middle"
        className="fill-graphite text-[5px] font-bold"
      >
        {pct(a, total)}
      </text>
      <text
        x="21"
        y="26"
        textAnchor="middle"
        className="fill-graphite/60 text-[3px]"
      >
        fixas
      </text>
    </svg>
  );
}

/**
 * Painel de DRE de demonstração (dados ilustrativos), para o visitante mexer:
 * aba "Painel" com KPIs e gráficos e aba "Tabela DRE" com as linhas
 * detalhadas. Escolher um mês (botões, barras ou cabeçalho da tabela)
 * atualiza tudo.
 */
export function DreDashboard() {
  const [tab, setTab] = useState<Tab>("painel");
  const [month, setMonth] = useState(3);
  const [open, setOpen] = useState<Record<string, boolean>>({ receita: true });
  const m = metrics(month);
  const prev = month > 0 ? metrics(month - 1) : undefined;
  const all = demoMonths.map((_, i) => metrics(i));
  const maxReceita = Math.max(...all.map((x) => x.receita));
  const linePt = (v: number, i: number) =>
    `${12 + i * 25},${52 - (v / 160) * 44}`;

  return (
    <div className="overflow-hidden rounded-2xl border border-white/10 bg-graphite shadow-2xl shadow-black/50">
      {/* Barra superior: abas e meses */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 px-4 py-3">
        <div
          role="tablist"
          aria-label="Visão do DRE"
          className="flex rounded-full bg-white/5 p-1"
        >
          {(["painel", "tabela"] as const).map((t) => (
            <button
              key={t}
              type="button"
              role="tab"
              aria-selected={tab === t}
              onClick={() => setTab(t)}
              className={`rounded-full px-4 py-1.5 text-sm font-semibold transition ${tab === t ? "bg-amber text-graphite" : "text-cream/70 hover:text-cream"}`}
            >
              {t === "painel" ? "Painel" : "Tabela DRE"}
            </button>
          ))}
        </div>
        <div className="flex items-center gap-1.5" aria-label="Mês">
          {demoMonths.map((label, i) => (
            <button
              key={label}
              type="button"
              aria-pressed={month === i}
              onClick={() => setMonth(i)}
              className={`rounded-lg px-3 py-1.5 text-sm font-semibold transition ${month === i ? "bg-cream text-graphite" : "text-cream/70 hover:bg-white/10 hover:text-cream"}`}
            >
              {label}
            </button>
          ))}
        </div>
      </div>

      <div className="bg-cream p-3 text-graphite md:p-5">
        {tab === "painel" ? (
          <div className="grid gap-3 md:gap-4">
            <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
              <Kpi
                label="Receita bruta"
                value={`R$ ${m.receita} mil`}
                delta={
                  <Delta
                    now={m.receita}
                    before={prev?.receita}
                    partial={month === 3}
                  />
                }
              />
              <Kpi
                label="Lucro bruto"
                value={`R$ ${m.lucroBruto} mil`}
                sub={`margem ${pct(m.lucroBruto, m.receita)}`}
                delta={
                  <Delta
                    now={m.lucroBruto}
                    before={prev?.lucroBruto}
                    partial={month === 3}
                  />
                }
              />
              <Kpi
                label="Resultado"
                value={`R$ ${m.resultado} mil`}
                sub={`margem ${pct(m.resultado, m.receita)}`}
                delta={
                  <Delta
                    now={m.resultado}
                    before={prev?.resultado}
                    partial={month === 3}
                  />
                }
              />
              <Kpi
                label="Despesas"
                value={`R$ ${Math.abs(m.despesas)} mil`}
                sub={`${pct(m.despesas, m.receita)} da receita`}
                delta={
                  <Delta
                    now={m.despesas}
                    before={prev?.despesas}
                    goodWhenUp={false}
                    partial={month === 3}
                  />
                }
              />
            </div>

            <div className="grid gap-3 md:gap-4 lg:grid-cols-2">
              {/* Barras: receita por mês (clicáveis) */}
              <div className="rounded-xl bg-white p-4">
                <p className="text-sm font-semibold">Receita bruta por mês</p>
                <p className="text-xs text-graphite/60">
                  Clique numa barra para ver o mês
                </p>
                <div className="mt-3 flex h-36 items-end gap-3">
                  {all.map((x, i) => (
                    <button
                      key={demoMonths[i]}
                      type="button"
                      onClick={() => setMonth(i)}
                      aria-label={`${demoMonths[i]}: R$ ${x.receita} mil`}
                      className="group flex h-full flex-1 flex-col items-center justify-end gap-1"
                    >
                      <span className="text-xs tabular-nums">{x.receita}</span>
                      <span
                        className={`w-full rounded-t-md transition-all duration-300 ${i === month ? "bg-amber" : "bg-amber/35 group-hover:bg-amber/60"}`}
                        style={{ height: `${(x.receita / maxReceita) * 75}%` }}
                      />
                      <span
                        className={`text-xs ${i === month ? "font-bold" : "text-graphite/60"}`}
                      >
                        {demoMonths[i]}
                      </span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Linha: lucro bruto x resultado */}
              <div className="rounded-xl bg-white p-4">
                <p className="text-sm font-semibold">Lucro bruto x resultado</p>
                <p className="text-xs text-graphite/60">
                  Tendência mês a mês (R$ mil)
                </p>
                <svg
                  viewBox="0 0 100 60"
                  className="mt-3 h-36 w-full overflow-visible"
                  preserveAspectRatio="none"
                  role="img"
                  aria-label="Gráfico de linhas de lucro bruto e resultado"
                >
                  <polyline
                    points={all
                      .map((x, i) => linePt(x.lucroBruto, i))
                      .join(" ")}
                    fill="none"
                    stroke="var(--color-graphite)"
                    strokeWidth="1"
                  />
                  <polyline
                    points={all.map((x, i) => linePt(x.resultado, i)).join(" ")}
                    fill="none"
                    stroke="var(--color-amber)"
                    strokeWidth="1.4"
                  />
                  <line
                    x1={12 + month * 25}
                    x2={12 + month * 25}
                    y1="4"
                    y2="56"
                    stroke="rgba(36,35,38,0.2)"
                    strokeWidth="0.5"
                    strokeDasharray="1.5 1.5"
                  />
                </svg>
                <div className="mt-1 flex gap-4 text-xs">
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 bg-graphite" /> Lucro bruto:{" "}
                    {m.lucroBruto}
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span className="h-0.5 w-4 bg-amber" /> Resultado:{" "}
                    {m.resultado}
                  </span>
                </div>
              </div>

              {/* Rosca: despesas fixas x variáveis */}
              <div className="flex items-center gap-5 rounded-xl bg-white p-4">
                <Donut a={Math.abs(m.fixas)} b={Math.abs(m.variaveis)} />
                <div>
                  <p className="text-sm font-semibold">
                    Despesas fixas x variáveis
                  </p>
                  <p className="mt-2 flex items-center gap-2 text-sm">
                    <span className="size-2.5 rounded-sm bg-graphite" /> Fixas:
                    R$ {Math.abs(m.fixas)} mil
                  </p>
                  <p className="mt-1 flex items-center gap-2 text-sm">
                    <span className="size-2.5 rounded-sm bg-amber" /> Variáveis:
                    R$ {Math.abs(m.variaveis)} mil
                  </p>
                </div>
              </div>

              {/* Deduções e impostos: composição */}
              <div className="rounded-xl bg-white p-4">
                <p className="text-sm font-semibold">Deduções e impostos</p>
                <p className="text-xs text-graphite/60">
                  {pct(m.deducoes, m.receita)} da receita bruta
                </p>
                <div className="mt-3 grid gap-2">
                  {groups
                    .find((g) => g.key === "deducoes")!
                    .lines.map((l) => {
                      const v = Math.abs(l.values[month]);
                      return (
                        <div
                          key={l.label}
                          className="grid grid-cols-[6.5rem_1fr_2.5rem] items-center gap-2 text-sm"
                        >
                          <span className="text-graphite/70">{l.label}</span>
                          <span className="h-2.5 rounded-full bg-graphite/10">
                            <span
                              className="block h-full rounded-full bg-amber transition-all duration-500"
                              style={{ width: `${(v / 35) * 100}%` }}
                            />
                          </span>
                          <span className="text-right tabular-nums">{v}</span>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Tabela detalhada */
          <div className="overflow-x-auto">
            <table className="w-full min-w-[34rem] text-sm">
              <thead>
                <tr className="border-b border-graphite/15 text-graphite/60">
                  <th className="py-2 pr-3 text-left font-semibold">
                    DRE (R$ mil)
                  </th>
                  {demoMonths.map((label, i) => (
                    <th
                      key={label}
                      className={`px-2 py-2 text-right font-semibold ${i === month ? "bg-amber/20 text-graphite" : ""}`}
                    >
                      <button
                        type="button"
                        onClick={() => setMonth(i)}
                        className="hover:text-graphite"
                      >
                        {label}
                      </button>
                    </th>
                  ))}
                  <th className="px-2 py-2 text-right font-semibold">
                    % receita
                  </th>
                </tr>
              </thead>
              <tbody>
                {groups.map((g) => {
                  const isOpen = !!open[g.key];
                  return (
                    <Fragment key={g.key}>
                      <tr className="border-b border-graphite/10 font-semibold">
                        <td className="py-2 pr-3">
                          <button
                            type="button"
                            aria-expanded={isOpen}
                            onClick={() =>
                              setOpen((o) => ({ ...o, [g.key]: !o[g.key] }))
                            }
                            className="flex items-center gap-1.5 text-left hover:text-amber"
                          >
                            <ChevronRight
                              size={15}
                              aria-hidden="true"
                              className={`transition-transform ${isOpen ? "rotate-90" : ""}`}
                            />
                            {g.label}
                          </button>
                        </td>
                        {demoMonths.map((label, i) => (
                          <td
                            key={label}
                            className={`px-2 py-2 text-right tabular-nums ${i === month ? "bg-amber/20" : ""}`}
                          >
                            {fmt(groupTotal(g.key, i))}
                          </td>
                        ))}
                        <td className="px-2 py-2 text-right tabular-nums">
                          {pct(groupTotal(g.key, month), m.receita)}
                        </td>
                      </tr>
                      {isOpen &&
                        g.lines.map((l) => (
                          <tr
                            key={l.label}
                            className="border-b border-graphite/5 text-graphite/75"
                          >
                            <td className="py-1.5 pr-3 pl-7">{l.label}</td>
                            {l.values.map((v, i) => (
                              <td
                                key={i}
                                className={`px-2 py-1.5 text-right tabular-nums ${i === month ? "bg-amber/10" : ""}`}
                              >
                                {fmt(v)}
                              </td>
                            ))}
                            <td className="px-2 py-1.5 text-right tabular-nums">
                              {pct(l.values[month], m.receita)}
                            </td>
                          </tr>
                        ))}
                      {totalsAfter[g.key] && (
                        <TotalRow
                          {...totalsAfter[g.key]}
                          month={month}
                          receita={m.receita}
                        />
                      )}
                    </Fragment>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
        <p className="mt-3 text-xs text-graphite/50">
          Valores ilustrativos. *Out: mês em andamento, acumulado até o dia 23.
        </p>
      </div>
    </div>
  );
}
