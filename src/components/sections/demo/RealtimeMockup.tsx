import { motion } from "framer-motion";

const RealtimeMockup = () => {
  const barHeights = Array.from({ length: 20 }, (_, i) => 
    Math.floor(20 + Math.sin(i * 0.8) * 30 + Math.random() * 30)
  );

  return (
    <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm">
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4 }}
        className="flex items-center gap-2 mb-4"
      >
        <motion.div
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          className="w-2 h-2 rounded-full bg-green-500"
        />
        <span className="text-xs text-green-600 font-semibold">Conectado</span>
      </motion.div>
      <div className="space-y-2">
        {[
          { label: "Vendas Hoje", value: "R$ 47.320", change: "+12%" },
          { label: "Pedidos", value: "234", change: "+8%" },
          { label: "Ticket Médio", value: "R$ 202", change: "+3%" },
        ].map((item, i) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.15 }}
            className="flex items-center justify-between p-3 rounded-xl bg-card border border-border"
          >
            <div>
              <p className="text-xs text-muted-foreground">{item.label}</p>
              <p className="text-sm font-bold text-foreground">{item.value}</p>
            </div>
            <motion.span
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: i * 0.15 + 0.2 }}
              className="text-xs font-semibold text-green-600"
            >
              {item.change}
            </motion.span>
          </motion.div>
        ))}
      </div>
      <motion.div 
        className="mt-4 h-16 flex items-end gap-0.5"
      >
        {barHeights.map((h, i) => (
          <motion.div
            key={i}
            initial={{ height: 0 }}
            whileInView={{ height: `${h}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: i * 0.03, ease: "easeOut" }}
            className="flex-1 rounded-t-sm bg-primary/40"
          />
        ))}
      </motion.div>
    </div>
  );
};

export default RealtimeMockup;