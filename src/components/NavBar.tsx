import { motion, AnimatePresence } from "framer-motion";
import { APP_STORE_URL, NAV_LINKS, ANIMATION_EASE } from "../constants";
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
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${isScrolled
          ? "py-3 bg-[#f4f0e7]/90 backdrop-blur-xl border-b border-neutral-900/10 shadow-[0_6px_24px_rgba(32,35,29,0.05)]"
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
            <span className={`font-semibold text-3xl tracking-tighter ${dark && !isScrolled ? "text-white" : "text-neutral-900"}`}>
              alya<span className="text-lime-600">.</span>
            </span>
          </a>

          <div className="hidden md:flex items-center">
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

          </div>

          <button
            className={`md:hidden z-50 p-3 -mr-1 transition-colors ${dark && !isScrolled ? "text-white/80 hover:text-white" : "text-neutral-600 hover:text-neutral-900"}`}
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
            className={`fixed inset-0 z-40 backdrop-blur-2xl md:hidden flex flex-col items-center justify-center ${dark ? "bg-black/80" : "bg-white/95"}`}
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
                  className={`text-3xl font-semibold tracking-tight transition-colors ${dark ? "text-white/90 hover:text-white" : "text-neutral-900/80 hover:text-neutral-900"}`}
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
                className={`mt-4 px-10 py-4 rounded-full font-bold text-xl shadow-lg transition-transform active:scale-95 ${dark ? "bg-lime-400 text-neutral-900" : "bg-neutral-900 text-white"}`}
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
