import { motion } from "framer-motion";
import { ANIMATION_EASE as ease } from "../../constants";

export const CorrectionsMockup = () => (
  <div className="max-w-[300px] mx-auto w-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      className="bg-neutral-800 rounded-3xl p-4 shadow-xl border border-white/5"
    >
      <div className="flex items-center gap-2.5 pb-3 mb-3 border-b border-white/10">
        <img src="/logo/splash-icon.png" alt="alya" className="w-7 h-7 rounded-full object-cover" />
        <div>
          <p className="text-white text-xs font-semibold">alya</p>
          <p className="text-lime-400 text-[10px]">● online</p>
        </div>
      </div>
      <div className="space-y-2.5">
        {[
          {
            side: "right",
            text: <p className="text-neutral-900 text-xs font-medium">me llamo Alya did i say right?</p>,
          },
          {
            side: "left",
            text: (
              <>
                <p className="text-white text-xs">
                  <span className="text-lime-400 font-semibold">¡Me llamo Alya!</span> perfect 🎉
                </p>
                <p className="text-neutral-300 text-[10px] mt-1">already speaking Spanish!</p>
                <div className="mt-1.5 bg-neutral-800 rounded-lg px-2 py-1 inline-flex items-center gap-1">
                  <span className="text-neutral-400 text-[10px]">🔊 tap for pronunciation</span>
                </div>
              </>
            ),
          },
          {
            side: "right",
            text: <p className="text-neutral-900 text-xs font-medium">how do i ask for water?</p>,
          },
          {
            side: "left",
            text: (
              <>
                <p className="text-white text-xs">
                  say: <span className="text-lime-400 font-semibold">quiero agua, por favor</span>
                </p>
                <p className="text-neutral-400 text-[10px] mt-1">means "I'd like water, please" 💧</p>
              </>
            ),
          },
        ].map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: m.side === "left" ? -10 : 10, y: 5 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ delay: 0.2 + i * 0.15, duration: 0.4, ease }}
            className={`flex ${m.side === "right" ? "justify-end" : ""}`}
          >
            <div
              className={`${m.side === "left" ? "bg-neutral-700 rounded-tl-sm" : "bg-lime-400 rounded-tr-sm"} rounded-2xl px-3 py-2.5 max-w-[90%]`}
            >
              {m.text}
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  </div>
);
