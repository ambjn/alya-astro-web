import { motion, MotionConfig } from "framer-motion";
import { NavBar } from "../../components/NavBar";
import { AppleIcon } from "../../components/DownloadButton";
import { ANIMATION_EASE as ease, APP_STORE_URL } from "../../constants";

export const Home = () => {
  return (
    <MotionConfig reducedMotion="user">
    <div className="font-sans bg-lime-50">
      <section className="relative min-h-170 h-svh overflow-hidden scroll-snap-start flex flex-col justify-end bg-[#eee9df]">
        <video
          className="absolute inset-0 w-full h-full object-cover object-[58%_center] md:object-left z-0"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
          preload="auto"
          poster="/videos/alya-background-poster.jpg"
        >
          <source src="/videos/alya-background.mp4" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-linear-to-r from-[#f4f0e7]/70 via-[#f4f0e7]/20 to-transparent md:from-[#f4f0e7]/85 md:via-[#f4f0e7]/35 z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-28 bg-linear-to-t from-[#f4f0e7]/90 to-transparent z-10 pointer-events-none" />

        <NavBar currentPath="/" />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease }}
          className="relative z-20 w-full flex flex-col justify-end px-6 sm:px-10 md:px-16 pb-16 md:pb-20"
        >
          <div className="flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="text-5xl sm:text-6xl md:text-7xl font-semibold tracking-[-0.045em] text-neutral-900 leading-[0.95] mb-5 max-w-xl"
            >
              learn spanish.<br /><span className="text-lime-600">by doomscrolling.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="text-lg sm:text-xl font-medium text-neutral-700 mb-8 max-w-lg"
            >
              scroll real videos. tap what you don't know.<br />
              grow your companion.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="flex flex-wrap items-center gap-x-6 gap-y-5"
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-neutral-900 text-white hover:bg-lime-700 transition-colors font-semibold px-7 py-3.5 rounded-full text-base shadow-[0_8px_0_#f4c94c] active:translate-y-1 active:shadow-[0_4px_0_#f4c94c]"
              >
                <AppleIcon size={17} />
                download free on iOS
              </a>
              </motion.div>
          </div>
        </motion.main>

      </section>
    </div>
    </MotionConfig>
  );
};
