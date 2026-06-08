import { motion, AnimatePresence } from "framer-motion";
import { APP_STORE_URL, NAV_LINKS, ANIMATION_EASE } from "../constants";
import { DownloadButton } from "./DownloadButton";
import { Menu, X, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export const NavBar = ({ currentPath = "", dark = false }: { currentPath?: string; dark?: boolean }) => {
  const isHome = currentPath === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: ANIMATION_EASE }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "py-4 bg-transparent backdrop-blur-xl border-b border-neutral-200/60"
          : "py-6 bg-transparent"
          }`}
      >
        <div className="container mx-auto px-6 md:px-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group z-50">
            {!isHome && (
              <div className="p-2 rounded-full bg-neutral-100 group-hover:bg-neutral-200 border border-neutral-200 transition-all">
                <ArrowLeft size={16} className="text-neutral-500 group-hover:text-neutral-900" />
              </div>
            )}
            <span className={`font-semibold text-3xl ${dark && !isScrolled ? "text-white" : "text-neutral-900"}`}>
              alya<span className="text-lime-400/70">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6">
            <div className={`flex items-center gap-1 px-2 py-1.5 rounded-full backdrop-blur-sm border ${dark && !isScrolled ? "bg-white/10 border-white/15" : "bg-transparent border-neutral-300/50"}`}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 relative ${currentPath === link.href
                    ? dark && !isScrolled ? "text-white bg-white/20" : "text-neutral-900 bg-neutral-300/50"
                    : dark && !isScrolled ? "text-white/70 hover:text-white" : "text-neutral-500 hover:text-neutral-900"
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

            <DownloadButton className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-300 shadow-sm ${dark && !isScrolled ? "bg-white text-neutral-900 hover:bg-neutral-100" : "bg-neutral-900 text-white hover:bg-neutral-700"}`} />
          </div>

          <button
            className={`md:hidden z-50 p-3 -mr-1 transition-colors ${dark && !isScrolled ? "text-white/80 hover:text-white" : "text-neutral-600 hover:text-neutral-900"}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className={`fixed inset-0 z-40 backdrop-blur-xl md:hidden flex flex-col items-center justify-center space-y-6 ${dark ? "bg-black/60" : "bg-white/98"}`}
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setIsMobileMenuOpen(false)}
                className={`text-2xl font-medium transition-colors ${dark ? "text-white/80 hover:text-white" : "text-neutral-600 hover:text-neutral-900"}`}
              >
                {link.label}
              </a>
            ))}
            <a
              href={APP_STORE_URL}
              target="_blank"
              rel="noopener noreferrer"
              className={`mt-6 px-8 py-3 rounded-full font-semibold text-lg ${dark ? "bg-white text-neutral-900" : "bg-neutral-900 text-white"}`}
            >
              download app
            </a>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
