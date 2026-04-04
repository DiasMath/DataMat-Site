import { motion } from "framer-motion";
import { BarChart3, TrendingUp, TrendingDown, DollarSign, Users, Package } from "lucide-react";

const HeroDashboard = () => {
  const kpis = [
    { icon: DollarSign, value: "R$ 847K", label: "Receita", change: "+12%", positive: true },
    { icon: Users, value: "1.234", label: "Clientes", change: "+8%", positive: true },
    { icon: Package, value: "3.456", label: "Pedidos", change: "-3%", positive: false },
  ];

  const chartData = [65, 85, 45, 95, 70, 55, 80, 60, 75, 90, 50, 70];

  return (
    <div className="relative w-full max-w-4xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        className="rounded-2xl overflow-hidden border border-primary/20 shadow-2xl shadow-primary/10"
      >
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 bg-foreground/90 border-b border-border">
          <div className="flex gap-1.5">
            <div className="w-3 h-3 rounded-full bg-red-500/80" />
            <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
            <div className="w-3 h-3 rounded-full bg-green-500/80" />
          </div>
          <div className="flex-1 mx-4">
            <div className="h-6 rounded-md bg-background/60 border border-border/50 flex items-center px-3">
              <span className="text-[10px] text-muted-foreground">datamat.com.br/dashboard</span>
            </div>
          </div>
        </div>

        {/* Dashboard content */}
        <div className="p-6 bg-foreground">
          {/* KPIs Row */}
          <div className="grid grid-cols-3 gap-4 mb-6">
            {kpis.map((kpi, i) => (
              <motion.div
                key={kpi.label}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
                className="p-4 rounded-xl bg-foreground/50 border border-border"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div className="w-8 h-8 rounded-lg bg-primary/15 flex items-center justify-center">
                    <kpi.icon className="w-4 h-4 text-primary" />
                  </div>
                  <span className="text-xs text-muted-foreground">{kpi.label}</span>
                </div>
                <div className="flex items-end justify-between">
                  <span className="text-2xl font-bold text-foreground">{kpi.value}</span>
                  <div className={`flex items-center gap-1 text-xs font-medium ${kpi.positive ? 'text-green-500' : 'text-red-500'}`}>
                    {kpi.positive ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
                    {kpi.change}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Main Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.9 }}
            className="p-5 rounded-xl bg-foreground/30 border border-border"
          >
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-sm font-semibold text-foreground">Vendas por Mês</h4>
              <div className="flex gap-2">
                {['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'].map((m) => (
                  <span key={m} className="text-[10px] text-muted-foreground">{m}</span>
                ))}
              </div>
            </div>
            <div className="flex items-end gap-1 h-32">
              {chartData.map((h, i) => (
                <motion.div
                  key={i}
                  initial={{ height: 0 }}
                  animate={{ height: `${h}%` }}
                  transition={{ duration: 0.6, delay: 1 + i * 0.05 }}
                  className="flex-1 rounded-t-sm bg-gradient-to-t from-primary/60 to-primary"
                />
              ))}
            </div>
          </motion.div>

          {/* Secondary Charts Row */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.3 }}
              className="p-4 rounded-xl bg-foreground/30 border border-border"
            >
              <h4 className="text-xs font-semibold text-foreground mb-3">Top Produtos</h4>
              <div className="space-y-2">
                {['Produto A', 'Produto B', 'Produto C'].map((p, i) => (
                  <div key={p} className="flex items-center gap-2">
                    <div className="flex-1 h-2 rounded-full bg-muted overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${80 - i * 20}%` }}
                        transition={{ duration: 0.5, delay: 1.5 + i * 0.1 }}
                        className="h-full bg-primary rounded-full" 
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{80 - i * 20}%</span>
                  </div>
                ))}
              </div>
            </motion.div>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 1.4 }}
              className="p-4 rounded-xl bg-foreground/30 border border-border flex items-center justify-center"
            >
              <div className="relative w-20 h-20">
                <svg viewBox="0 0 36 36" className="w-20 h-20 -rotate-90">
                  <circle cx="18" cy="18" r="15.9" fill="none" stroke="currentColor" strokeWidth="3" className="text-border" />
                  <motion.circle
                    cx="18"
                    cy="18"
                    r="15.9"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    strokeDasharray="75 25"
                    initial={{ strokeDashoffset: 0 }}
                    animate={{ strokeDashoffset: -25 }}
                    transition={{ duration: 1, delay: 1.6 }}
                    className="text-primary"
                  />
                  <circle cx="18" cy="18" r="10" fill="background" />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center">
                  <span className="text-sm font-bold text-foreground">75%</span>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>

      {/* Decorative elements */}
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="absolute -top-4 -right-4 w-32 h-32 rounded-full bg-primary/10 blur-2xl"
      />
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.7 }}
        className="absolute -bottom-6 -left-6 w-40 h-40 rounded-full bg-primary/5 blur-3xl"
      />
    </div>
  );
};

export default HeroDashboard;