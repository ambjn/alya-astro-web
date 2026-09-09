import { motion } from "framer-motion";
import { ANIMATION_EASE as ease } from "../../constants";

export const ChatMockup = () => (
  <div className="max-w-[300px] mx-auto w-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      className="bg-neutral-900 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
    >
      <div className="relative bg-neutral-800 aspect-[9/11] flex flex-col justify-end p-4">
        <div className="absolute inset-0 bg-linear-to-t from-black/80 via-black/20 to-black/30" />
        <div className="absolute top-3 left-3 flex gap-1.5">
          <span className="px-2 py-1 rounded-full bg-black/50 text-white text-[9px] font-semibold">Travel</span>
          <span className="px-2 py-1 rounded-full bg-lime-400 text-neutral-900 text-[9px] font-bold">Beginner</span>
        </div>
        <div className="relative">
          <p className="text-white text-sm font-medium leading-snug mb-1">
            ¿Dónde está <span className="bg-lime-400 text-neutral-900 px-1 rounded font-semibold">la estación</span>?
          </p>
          <p className="text-white/70 text-xs mb-3">Where is the station?</p>
          <div className="flex items-center gap-2">
            <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
              <div className="h-full w-2/3 bg-lime-400 rounded-full" />
            </div>
            <span className="text-white/60 text-[10px]">0:07</span>
          </div>
        </div>
      </div>
      <div className="p-3.5 flex items-center justify-between border-t border-white/10">
        <div className="flex gap-3">
          <span className="text-white/70 text-xs">♥ 2.1k</span>
          <span className="text-white/70 text-xs">💬 84</span>
          <span className="text-lime-400 text-xs font-semibold">★ +5</span>
        </div>
        <span className="text-white/50 text-[10px]">0.75x · 1x · 1.5x</span>
      </div>
    </motion.div>
  </div>
);
