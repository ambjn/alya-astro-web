import { motion } from "framer-motion";
import { ANIMATION_EASE as ease } from "../../constants";

export const ChatMockup = () => (
  <div className="max-w-[300px] mx-auto w-full">
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.6, ease }}
      className="bg-neutral-800 rounded-3xl p-4 shadow-2xl border border-white/5"
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
            text: <p className="text-neutral-900 text-xs font-medium">tengo un perro!</p>,
          },
          {
            side: "left",
            text: (
              <>
                <p className="text-white text-xs">
                  <span className="text-lime-400 font-semibold">mi perro se llama...</span>{" "}
                  <span className="text-neutral-400 text-[10px]">mee peh-ro seh yah-ma</span>,
                  meaning "my dog's name is..."
                </p>
                <p className="text-white text-xs mt-1.5">
                  you're speaking Spanish!! 🎉 what's your dog's name? try using that phrase!
                </p>
              </>
            ),
          },
          {
            side: "right",
            text: <p className="text-neutral-900 text-xs font-medium">can you teach me the colors?</p>,
          },
          {
            side: "left",
            text: (
              <>
                <p className="text-white text-xs">
                  <span className="text-lime-400 font-semibold">rojo</span> ra-ho = red,{" "}
                  <span className="text-lime-400 font-semibold">azul</span> ah-sool = blue,{" "}
                  <span className="text-lime-400 font-semibold">verde</span> ver-deh = green,{" "}
                  <span className="text-lime-400 font-semibold">amarillo</span> ah-mah-ree-yo = yellow 🌻
                </p>
                <p className="text-white text-xs mt-1.5">
                  colors are so fun! what color is your shirt? try answering with one of those!
                </p>
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
