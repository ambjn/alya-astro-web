import { motion } from "framer-motion";
import { ANIMATION_EASE as ease } from "../../constants";

export const CorrectionsMockup = () => (
  <div className="max-w-[300px] mx-auto w-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      className="bg-white rounded-3xl p-4 shadow-xl border border-neutral-200"
    >
      <p className="text-neutral-400 text-[10px] font-bold uppercase tracking-widest mb-3">
        tap any word
      </p>
      <div className="bg-neutral-900 rounded-2xl p-4 mb-3">
        <p className="text-white text-sm leading-relaxed">
          Quiero <span className="bg-lime-400 text-neutral-900 px-1.5 py-0.5 rounded-md font-semibold">aprovechar</span> el viaje
        </p>
        <p className="text-neutral-400 text-xs mt-1.5">I want to make the most of the trip</p>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.4, duration: 0.4, ease }}
        className="bg-lime-50 border border-lime-200 rounded-2xl p-3.5"
      >
        <div className="flex items-center justify-between mb-1">
          <p className="text-neutral-900 font-bold text-sm">aprovechar</p>
          <span className="text-[10px]">🔊</span>
        </div>
        <p className="text-neutral-500 text-xs mb-2">to make the most of · verb</p>
        <div className="flex gap-2">
          <span className="px-2.5 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-semibold">+ save word</span>
          <span className="px-2.5 py-1 rounded-full bg-white border border-neutral-200 text-neutral-600 text-[10px] font-medium">hear it</span>
        </div>
      </motion.div>
    </motion.div>
  </div>
);
