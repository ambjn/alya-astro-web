import { useState } from "react";
import { ChevronDown } from "lucide-react";
import { NAV_LINKS, LEARN_LINKS, COMPARE_LINKS } from "../constants";
import { SocialLinks } from "./SocialLinks";

const footerLinkClass =
  "text-neutral-500 hover:text-neutral-900 text-sm transition-colors duration-200";

const bottomLinkClass =
  "text-neutral-400 hover:text-neutral-900 text-xs transition-colors uppercase tracking-wider font-medium";

function FooterLinkColumn({
  title,
  links,
}: {
  title: string;
  links: readonly { label: string; href: string }[];
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const LIMIT = 3;
  const showExpand = links.length > LIMIT;
  const visibleLinks =
    showExpand && !isExpanded ? links.slice(0, LIMIT) : links;

  return (
    <div className="col-span-1 md:col-span-2 space-y-4">
      <div
        className={`flex items-center gap-2 ${showExpand ? "cursor-pointer group" : ""}`}
        onClick={() => showExpand && setIsExpanded(!isExpanded)}
      >
        <h4 className="text-sm font-semibold text-neutral-900 tracking-wide select-none">
          {title}
        </h4>
        {showExpand && (
          <ChevronDown
            size={14}
            className={`text-neutral-400 group-hover:text-neutral-900 transition-transform duration-300 ${isExpanded ? "rotate-180" : ""}`}
          />
        )}
      </div>
      <ul className="space-y-3">
        {visibleLinks.map((link) => (
          <li key={link.href}>
            <a href={link.href} className={footerLinkClass}>
              {link.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}

export const Footer = () => (
  <footer className="relative pt-16 pb-10 border-t border-neutral-200/60">
    <div className="max-w-7xl mx-auto px-6 md:px-10 relative">
      <div className="grid grid-cols-2 md:grid-cols-12 gap-6 sm:gap-8 mb-16">
        <div className="col-span-2 md:col-span-4 pr-0 md:pr-12 flex flex-col justify-between h-full">
          <div>
            <a href="/" className="inline-flex items-center gap-2 group mb-5">
              <img
                src="/logo/splash-icon.png"
                alt="alya"
                className="w-9 h-9 rounded-full object-cover"
              />
              <span className="text-2xl font-bold tracking-tight text-neutral-900 group-hover:text-lime-600 transition-colors">
                alya
              </span>
            </a>
            <p className="text-neutral-500 text-sm leading-relaxed max-w-sm font-light mb-8">
              Your AI Spanish learning buddy.
              <br />
              learn naturally through conversation,
              <br />
              not drills.
            </p>
          </div>

          <div className="flex justify-center md:justify-start">
            <SocialLinks />
          </div>
        </div>

        <div className="col-span-1 md:col-span-2 md:col-start-6">
          <FooterLinkColumn title="Product" links={NAV_LINKS} />
        </div>
        <div className="col-span-1 md:col-span-2">
          <FooterLinkColumn title="Learn" links={LEARN_LINKS} />
        </div>
        <div className="col-span-2 md:col-span-2">
          <FooterLinkColumn title="Compare" links={COMPARE_LINKS} />
        </div>
      </div>

      <div className="pt-8 border-t border-neutral-200/60 flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="text-neutral-400 text-xs font-medium uppercase tracking-widest">
          © 2026, All rights reserved
        </div>
        <div className="flex items-center gap-6">
          <a href="/privacy" className={bottomLinkClass}>Privacy Policy</a>
          <a href="/terms" className={bottomLinkClass}>Terms of Service</a>
          <a href="/support" className={bottomLinkClass}>Support</a>
        </div>
      </div>
    </div>
  </footer>
);
