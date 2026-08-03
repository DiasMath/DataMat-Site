/**
 * DataMock — mockups de dado real estilizado (dados fictícios).
 * Nada de cérebro/rede neural/circuito/robô/pizza de estoque.
 */

export const LineChartMock = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 320 120" className={className} role="img" aria-label="Gráfico de linha ilustrativo de receita">
    <defs>
      <linearGradient id="dm-line-fill" x1="0" y1="0" x2="0" y2="1">
        <stop offset="0%" stopColor="hsl(var(--primary))" stopOpacity="0.35" />
        <stop offset="100%" stopColor="hsl(var(--primary))" stopOpacity="0" />
      </linearGradient>
    </defs>
    {[0, 30, 60, 90].map((y) => (
      <line key={y} x1="0" y1={y + 15} x2="320" y2={y + 15} stroke="hsl(var(--border))" strokeWidth="1" />
    ))}
    <path
      d="M0 96 L40 84 L80 92 L120 62 L160 70 L200 44 L240 52 L280 24 L320 16"
      fill="none"
      stroke="hsl(var(--primary))"
      strokeWidth="2.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M0 96 L40 84 L80 92 L120 62 L160 70 L200 44 L240 52 L280 24 L320 16 L320 120 L0 120 Z"
      fill="url(#dm-line-fill)"
    />
  </svg>
);

export const BarChartMock = ({ className = "" }: { className?: string }) => (
  <svg viewBox="0 0 320 120" className={className} role="img" aria-label="Gráfico de barras ilustrativo por categoria">
    {[34, 58, 46, 82, 64, 96, 74, 110].map((h, i) => (
      <rect
        key={i}
        x={i * 40 + 8}
        y={120 - h}
        width="22"
        height={h}
        rx="3"
        fill={i === 5 ? "hsl(var(--primary))" : "hsl(var(--primary) / 0.28)"}
      />
    ))}
  </svg>
);

/** Mockup de dashboard: KPIs + gráfico + tabela (dados fictícios). */
export const DashboardMock = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-xl border border-border bg-surface-2 p-4 ${className}`}>
    <div className="flex items-center gap-2 pb-3">
      <span className="h-2 w-2 rounded-full bg-primary" />
      <span className="h-2 w-2 rounded-full bg-border" />
      <span className="h-2 w-2 rounded-full bg-border" />
      <span className="ml-3 font-sans text-[11px] uppercase tracking-widest text-muted-foreground">
        DRE • visão diária
      </span>
    </div>

    <div className="grid grid-cols-3 gap-2">
      {[
        { l: "Receita", v: "R$ 1,84M" },
        { l: "Margem", v: "31,2%" },
        { l: "Ticket", v: "R$ 214" },
      ].map((k) => (
        <div key={k.l} className="rounded-lg border border-border bg-background/60 p-3">
          <p className="text-[10px] uppercase tracking-widest text-muted-foreground">{k.l}</p>
          <p className="mt-1 font-display text-base font-bold text-foreground">{k.v}</p>
        </div>
      ))}
    </div>

    <LineChartMock className="mt-3 h-24 w-full" />

    <div className="mt-3 space-y-1.5">
      {["Marketplace", "Loja própria", "Atacado"].map((row, i) => (
        <div key={row} className="flex items-center gap-3">
          <span className="w-28 shrink-0 text-[11px] text-muted-foreground">{row}</span>
          <span className="h-1.5 flex-1 overflow-hidden rounded-full bg-border">
            <span
              className="block h-full rounded-full bg-primary"
              style={{ width: `${[78, 54, 33][i]}%` }}
            />
          </span>
        </div>
      ))}
    </div>
  </div>
);

/** Antes/depois: planilha bagunçada → painel limpo. */
export const MessySheetMock = ({ className = "" }: { className?: string }) => (
  <div className={`rounded-xl border border-border bg-surface-2 p-3 ${className}`}>
    <p className="pb-2 text-[10px] uppercase tracking-widest text-muted-foreground">planilha_final_v7_REV.xlsx</p>
    <div className="grid grid-cols-6 gap-[3px]">
      {Array.from({ length: 42 }).map((_, i) => (
        <span
          key={i}
          className="h-3 rounded-[2px]"
          style={{
            background:
              i % 11 === 0
                ? "hsl(var(--destructive) / 0.55)"
                : i % 5 === 0
                  ? "hsl(0 0% 100% / 0.16)"
                  : "hsl(0 0% 100% / 0.06)",
          }}
        />
      ))}
    </div>
  </div>
);
