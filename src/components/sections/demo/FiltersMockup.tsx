import { motion } from "framer-motion";

const FiltersMockup = () => (
  <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm">
    <div className="space-y-3 mb-5">
      {["Região", "Produto", "Período"].map((label, i) => (
        <motion.div
          key={label}
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: i * 0.1 }}
          className="flex items-center gap-3"
        >
          <span className="text-xs text-muted-foreground w-16">{label}</span>
          <motion.div 
            initial={{ width: 0 }}
            whileInView={{ width: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1 + 0.2 }}
            className="flex-1 h-8 rounded-lg bg-card border border-border flex items-center px-3 overflow-hidden"
          >
            <motion.div 
              initial={{ width: 0 }}
              whileInView={{ width: "60%" }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: i * 0.1 + 0.4 }}
              className="h-2 rounded-full bg-primary/40" 
            />
          </motion.div>
        </motion.div>
      ))}
    </div>
    <div className="grid grid-cols-2 gap-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className="p-3 rounded-xl bg-primary/10 border border-primary/20"
      >
        <div className="w-full h-12 flex items-end gap-1">
          {[30, 50, 70, 40, 90].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 + i * 0.1, ease: "easeOut" }}
              className="flex-1 rounded-sm bg-primary"
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className="p-3 rounded-xl bg-card border border-border flex items-center justify-center"
      >
        <div className="relative w-12 h-12">
          <motion.svg viewBox="0 0 36 36" className="w-12 h-12 -rotate-90">
            <motion.circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="100"
              initial={{ strokeDashoffset: 100 }}
              whileInView={{ strokeDashoffset: 35 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.8 }}
              className="text-primary/30"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="60 40"
              strokeDashoffset={-35}
              initial={{ strokeDashoffset: 0 }}
              whileInView={{ strokeDashoffset: -35 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 1 }}
              className="text-primary"
            />
            <motion.circle
              cx="18"
              cy="18"
              r="10"
              fill="background"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 1.2 }}
            />
          </motion.svg>
        </div>
      </motion.div>
    </div>
    <motion.div 
      initial={{ scale: 0, opacity: 0 }}
      whileInView={{ scale: 1, opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: 1 }}
      className="absolute -bottom-3 -left-3 w-20 h-20 rounded-full bg-primary/10 blur-2xl" 
    />
  </div>
);

export default FiltersMockup;