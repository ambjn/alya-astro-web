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
    <div className="absolute inset-0 bg-black/55 z-10 pointer-events-none" />

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
        className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-semibold tracking-tight text-white/70 leading-tight mb-4 max-w-2xl"
      >
        learn spanish the way you actually <span className="text-lime-400/70">talk.</span>
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.3, ease }}
        className="text-lg sm:text-xl font-medium text-white/70"
      >
        not an app. a conversation.
      </motion.p>
    </motion.main>

    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: 0.68, ease }}
      className="absolute bottom-10 left-0 right-0 z-20 flex justify-center"
    >
      <SocialLinks dark />
    </motion.div>
  </div>
);
