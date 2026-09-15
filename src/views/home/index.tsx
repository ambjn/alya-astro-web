import { motion, MotionConfig } from "framer-motion";
import { NavBar } from "../../components/NavBar";
import { AppleIcon } from "../../components/DownloadButton";
import { ANIMATION_EASE as ease, APP_STORE_URL } from "../../constants";

export const Home = () => {
  return (
    <MotionConfig reducedMotion="user">
    <div className="font-sans bg-lime-50">
      <section className="home-hero relative min-h-svh overflow-hidden scroll-snap-start flex flex-col justify-end bg-[#eee9df]">
        <img
          className="home-hero-poster absolute inset-0 z-0 hidden h-full w-full object-cover object-center"
          src="/videos/alya-background-poster.jpg"
          alt=""
          aria-hidden="true"
        />
        <video
          className="home-hero-video absolute inset-0 w-full h-full object-cover object-[54%_center] sm:object-[58%_center] md:object-left z-0"
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
        <div className="absolute inset-0 bg-linear-to-t from-[#f4f0e7]/95 via-[#f4f0e7]/20 via-55% to-transparent md:bg-linear-to-r md:from-[#f4f0e7]/85 md:via-[#f4f0e7]/35 md:to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-x-0 bottom-0 h-36 bg-linear-to-t from-[#f4f0e7] via-[#f4f0e7]/65 to-transparent md:h-28 md:from-[#f4f0e7]/90 z-10 pointer-events-none" />

        <NavBar currentPath="/" />

        <motion.main
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, ease }}
          className="home-hero-content relative z-20 w-full flex flex-col justify-end px-5 sm:px-10 md:px-16 pb-[max(2rem,env(safe-area-inset-bottom))] sm:pb-14 md:pb-20"
        >
          <div className="home-hero-copy flex flex-col items-start">
            <motion.h1
              initial={{ opacity: 0, y: 28 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.15, ease }}
              className="home-hero-title text-[2.65rem] min-[390px]:text-[2.8rem] sm:text-6xl md:text-7xl font-semibold tracking-[-0.045em] text-neutral-900 leading-[0.94] mb-4 sm:mb-5 max-w-xl"
            >
              learn spanish.<br /><span className="text-lime-600 whitespace-nowrap">by doomscrolling.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.3, ease }}
              className="home-hero-description text-base sm:text-xl leading-relaxed sm:leading-normal font-medium text-neutral-700 mb-6 sm:mb-8 max-w-lg"
            >
              scroll real videos. tap what you don't know.<br />
              grow your companion.
            </motion.p>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease }}
              className="flex w-full flex-wrap items-center gap-x-6 gap-y-5"
            >
              <a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex w-full max-w-72 sm:w-auto items-center justify-center gap-2.5 bg-neutral-900 text-white hover:bg-lime-700 transition-colors font-semibold px-5 sm:px-7 py-3.5 rounded-full text-sm sm:text-base shadow-[0_7px_0_#f4c94c] sm:shadow-[0_8px_0_#f4c94c] active:translate-y-1 active:shadow-[0_4px_0_#f4c94c]"
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
