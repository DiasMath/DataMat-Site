import { motion } from "framer-motion";

const DashboardMockup = () => (
  <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm">
    <div className="flex gap-2 mb-4">
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 96, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.1 }}
        className="h-8 rounded-lg bg-primary/20" 
      />
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 64, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="h-8 rounded-lg bg-muted" 
      />
      <motion.div 
        initial={{ width: 0, opacity: 0 }}
        whileInView={{ width: 80, opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="h-8 rounded-lg bg-muted" 
      />
    </div>
    <div className="flex gap-3 items-end h-32">
      {[60, 85, 45, 95, 70, 50, 80].map((h, i) => (
        <motion.div
          key={i}
          initial={{ height: 0 }}
          whileInView={{ height: `${h}%` }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: i * 0.1, ease: "easeOut" }}
          className="flex-1 rounded-t-md bg-primary/30 overflow-hidden"
        >
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: `${Math.min(100, h + 20)}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: i * 0.1 + 0.2, ease: "easeOut" }}
            className="w-full rounded-t-md bg-primary" 
          />
        </motion.div>
      ))}
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {[
        { label: "KPI", value: "R$ 1.2M" },
        { label: "KPI", value: "+23%" },
        { label: "KPI", value: "847" },
      ].map((v, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 0.8 + i * 0.1 }}
          className="p-2 rounded-lg bg-card border border-border text-center"
        >
          <p className="text-xs text-muted-foreground">{v.label}</p>
          <p className="text-sm font-bold text-primary">{v.value}</p>
        </motion.div>
      ))}
    </div>
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1 }}
      className="absolute -top-3 -right-3 w-16 h-16 rounded-full bg-primary/10 blur-2xl" 
    />
  </div>
);

export default DashboardMockup;