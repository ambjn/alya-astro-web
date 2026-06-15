import { motion } from "framer-motion";
import { ANIMATION_EASE as ease } from "../../constants";

export const LevelMockup = () => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, amount: 0.2 }}
    transition={{ duration: 0.6, ease }}
    className="max-w-[300px] mx-auto w-full bg-white rounded-3xl p-5 shadow-xl border border-neutral-200"
  >
    <p className="text-neutral-900 font-semibold text-sm mb-0.5">what's your Spanish level?</p>
    <p className="text-neutral-400 text-[11px] mb-4">alya adapts to where you are right now</p>
    <div className="space-y-2">
      {[
        { level: "beginner", desc: "learning basic words & phrases from scratch", active: true },
        { level: "intermediate", desc: "you know some words; alya mixes languages", active: false },
        { level: "advanced", desc: "challenge yourself; alya speaks mostly Spanish", active: false },
      ].map((item, i) => (
        <motion.div
          key={item.level}
          initial={{ opacity: 0, x: -10 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ delay: 0.3 + i * 0.1, duration: 0.4, ease }}
          className={`rounded-xl px-3.5 py-3 border-2 transition-all cursor-default hover:border-lime-300 ${item.active ? "border-lime-400 bg-lime-50" : "border-neutral-100 bg-neutral-50"}`}
        >
          <p className={`font-semibold text-xs capitalize ${item.active ? "text-lime-700" : "text-neutral-600"}`}>
            {item.level}
          </p>
          <p className="text-[11px] text-neutral-400 mt-0.5 leading-relaxed">{item.desc}</p>
        </motion.div>
      ))}
    </div>
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ delay: 0.7, duration: 0.4 }}
      className="mt-4 bg-neutral-900 rounded-xl py-2.5 text-center"
    >
      <span className="text-white text-xs font-semibold">start learning →</span>
    </motion.div>
  </motion.div>
);
