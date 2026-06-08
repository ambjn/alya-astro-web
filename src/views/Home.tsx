import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { SocialLinks } from "../components/SocialLinks";
import { ANIMATION_EASE as ease } from "../constants";

export const Home = () => (
  <div className="relative min-h-screen overflow-hidden font-sans">
    <video
      className="absolute inset-0 w-full h-full object-cover z-0"
      autoPlay
      muted
      loop
      playsInline
      aria-hidden="true"
    >
      <source src="/videos/hero.mp4" type="video/mp4" />
    </video>
    {/* gradient darkens bottom-left (text area) while leaving the bear visible */}
    <div className="absolute inset-0 bg-gradient-to-tr from-black/70 via-black/30 to-black/5 z-10 pointer-events-none" />

    <NavBar currentPath="/" dark />

    <motion.main
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1, ease }}
      className="relative z-20 min-h-screen flex flex-col justify-end items-start px-8 sm:px-12 md:px-16 pb-28"
    >
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 0.15, ease }}
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white leading-tight mb-4 max-w-2xl"
      >
        learn spanish the way you actually <span className="text-lime-400">talk.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        className="text-lg sm:text-xl font-medium text-white/85"
      >
        not an app. a conversation.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.68, ease }}
        className="mt-8"
      >
        <SocialLinks dark />
      </motion.div>
    </motion.main>
  </div>
);
