import { Mail } from "lucide-react";
import { TWITTER_URL, INSTAGRAM_URL, SUPPORT_EMAIL } from "@/constants";

const XIcon = () => (
  <svg viewBox="0 0 24 24" width={16} height={16} fill="currentColor">
    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
  </svg>
);

const InstagramIcon = () => (
  <svg
    viewBox="0 0 24 24"
    width={18}
    height={18}
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const lightClass =
  "w-11 h-11 rounded-full bg-white hover:bg-neutral-100 border border-neutral-200 flex items-center justify-center text-neutral-500 hover:text-neutral-900 transition-all duration-200 hover:-translate-y-0.5";

const darkClass =
  "w-11 h-11 rounded-full bg-white/15 backdrop-blur-sm flex items-center justify-center text-white hover:bg-white/25 transition-all duration-200";

export const SocialLinks = ({ dark = false }: { dark?: boolean }) => {
  const cls = dark ? darkClass : lightClass;
  return (
    <div className="flex gap-3">
      <a
        href={TWITTER_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="X (Twitter)"
        className={cls}
      >
        <XIcon />
      </a>
      <a
        href={INSTAGRAM_URL}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Instagram"
        className={cls}
      >
        <InstagramIcon />
      </a>
      <a href={`mailto:${SUPPORT_EMAIL}`} aria-label="Email" className={cls}>
        <Mail size={18} />
      </a>
    </div>
  );
};
