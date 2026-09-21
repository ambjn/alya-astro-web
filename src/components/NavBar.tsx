import { motion, AnimatePresence } from "framer-motion";
import { APP_STORE_URL, NAV_LINKS, ANIMATION_EASE } from "../constants";
import { Menu, X, ArrowLeft } from "lucide-react";
import { useState, useEffect } from "react";

export const NavBar = ({ currentPath = "" }: { currentPath?: string }) => {
  const isHome = currentPath === "/";
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const useDarkNavPill = isHome && !isScrolled;

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobileMenuOpen) return;

    document.body.style.overflow = "hidden";
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsMobileMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      <motion.nav
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.4, ease: ANIMATION_EASE }}
        className={`fixed top-0 left-0 right-0 z-50 isolate transition-all duration-500 ${isScrolled
          ? "py-3 bg-[#f4f0e7] border-b border-neutral-900/10 shadow-[0_6px_24px_rgba(32,35,29,0.05)]"
          : "py-6 sm:py-8 md:py-10 bg-transparent"
          }`}
      >
        <div className="container relative mx-auto px-5 sm:px-6 md:px-10 flex items-center justify-between">
          <a href="/" className="flex items-center gap-2 group">
            {!isHome && (
              <div className="p-2 rounded-full bg-neutral-100 group-hover:bg-neutral-200 border border-neutral-200 transition-all">
                <ArrowLeft size={16} className="text-neutral-500 group-hover:text-neutral-900" />
              </div>
            )}
            <span className="font-semibold text-2xl sm:text-3xl tracking-tighter text-neutral-900">
              alya<span className="text-lime-600">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center">
            <div className={`flex items-center gap-1 px-2.5 py-2 rounded-full border backdrop-blur-xl ${useDarkNavPill ? "bg-neutral-950 border-neutral-800 shadow-[0_10px_30px_rgba(0,0,0,0.25)]" : "bg-white/85 border-lime-200/70 shadow-sm"}`}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`px-4 py-1.5 text-sm font-medium rounded-full transition-all duration-200 relative ${currentPath === link.href
                    ? useDarkNavPill ? "bg-lime-400 text-neutral-950" : "text-neutral-900 bg-lime-200"
                    : useDarkNavPill ? "text-white/70 hover:text-white hover:bg-white/10" : "text-neutral-500 hover:text-neutral-900 hover:bg-lime-100"
                    }`}
                >
                  {link.label}
                </a>
              ))}
            </div>

          </div>

          <button
            className="md:hidden z-50 p-2.5 -mr-1 transition-colors rounded-full border border-neutral-900/10 bg-[#f4f0e7]/80 backdrop-blur-md text-neutral-900 hover:bg-[#f4f0e7]"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label={isMobileMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </motion.nav>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center bg-white/95"
          >
            <div className="flex flex-col items-center space-y-8">
              {NAV_LINKS.map((link, i) => (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1, ease: ANIMATION_EASE }}
                  onClick={() => setIsMobileMenuOpen(false)}
                  className="text-3xl font-semibold tracking-tight transition-colors text-neutral-900/80 hover:text-neutral-900"
                >
                  {link.label}
                </motion.a>
              ))}
              <motion.a
                href={APP_STORE_URL}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: NAV_LINKS.length * 0.1, ease: ANIMATION_EASE }}
                className="mt-4 px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-transform active:scale-95 bg-neutral-900 text-white"
              >
                download on iOS
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
