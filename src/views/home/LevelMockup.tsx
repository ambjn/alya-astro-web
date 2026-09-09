import { motion } from "framer-motion";
import { ANIMATION_EASE as ease } from "../../constants";

export const LevelMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease }}
    className="max-w-[300px] mx-auto w-full bg-neutral-900 rounded-3xl p-5 shadow-xl border border-white/10"
  >
    <div className="flex items-center gap-3 mb-4">
      <img src="/logo/pet.png" alt="alya companion" className="w-12 h-12 rounded-2xl object-cover" />
      <div>
        <p className="text-white font-semibold text-sm">ALYA</p>
        <p className="text-lime-400 text-[11px] font-medium">★ 1,240 stars</p>
      </div>
    </div>
    <div className="space-y-2.5">
      {[
        { label: "energy", value: 82, color: "bg-orange-400" },
        { label: "bond", value: 64, color: "bg-lime-400" },
        { label: "curiosity", value: 91, color: "bg-amber-300" },
      ].map((m, i) => (
        <motion.div
          key={m.label}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease }}
        >
          <div className="flex justify-between mb-1">
            <p className="text-white/60 text-[10px] uppercase tracking-wider font-semibold">{m.label}</p>
            <p className="text-white text-[10px] font-bold">{m.value}</p>
          </div>
          <div className="h-1.5 rounded-full bg-white/10 overflow-hidden">
            <div className={`h-full rounded-full ${m.color}`} style={{ width: `${m.value}%` }} />
          </div>
        </motion.div>
      ))}
    </div>
    <div className="mt-4 grid grid-cols-3 gap-2">
      {["🔥 12-day", "🏆 8", "📚 47 words"].map((s) => (
        <div key={s} className="bg-white/5 rounded-xl py-2 text-center">
          <p className="text-white text-[10px] font-semibold">{s}</p>
        </div>
      ))}
    </div>
  </motion.div>
);
