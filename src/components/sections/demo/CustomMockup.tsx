import { motion } from "framer-motion";
import { Paintbrush } from "lucide-react";

const CustomMockup = () => (
  <div className="relative w-full max-w-md mx-auto p-6 rounded-2xl bg-foreground/5 border border-border backdrop-blur-sm">
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="flex items-center gap-3 mb-5"
    >
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="w-10 h-10 rounded-xl bg-primary/15 flex items-center justify-center"
      >
        <Paintbrush className="w-5 h-5 text-primary" />
      </motion.div>
      <div>
        <p className="text-sm font-bold text-foreground">Seu Dashboard</p>
        <p className="text-xs text-muted-foreground">Personalizado para você</p>
      </div>
    </motion.div>
    <div className="grid grid-cols-2 gap-3">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="col-span-2 h-20 rounded-xl bg-gradient-to-r from-primary/20 to-primary/5 border border-primary/10 flex items-center justify-center"
      >
        <div className="flex gap-1 items-end h-10">
          {[40, 65, 50, 80, 55, 70, 90].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 + i * 0.08, ease: "easeOut" }}
              className="w-3 rounded-t-sm bg-primary/60"
            />
          ))}
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.8 }}
        className="h-16 rounded-xl bg-card border border-border flex items-center justify-center"
      >
        <div className="relative w-10 h-10">
          <motion.svg viewBox="0 0 36 36" className="w-10 h-10 -rotate-90">
            <motion.circle
              cx="18"
              cy="18"
              r="15.9"
              fill="none"
              stroke="currentColor"
              strokeWidth="3"
              strokeDasharray="75 25"
              initial={{ strokeDashoffset: 0 }}
              whileInView={{ strokeDashoffset: -25 }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: 0.9 }}
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
              transition={{ duration: 0.3, delay: 1.2 }}
            />
          </motion.svg>
        </div>
      </motion.div>
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.9 }}
        className="h-16 rounded-xl bg-card border border-border flex flex-col items-center justify-center"
      >
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, delay: 1 }}
          className="text-lg font-bold text-primary"
        >
          98%
        </motion.p>
        <p className="text-[10px] text-muted-foreground">Satisfação</p>
      </motion.div>
    </div>
  </div>
);

export default CustomMockup;