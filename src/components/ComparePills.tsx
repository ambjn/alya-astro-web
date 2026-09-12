import { COMPARE_LINKS } from "../constants";

export const ComparePills = ({ showLearnLink = false }: { showLearnLink?: boolean }) => (
  <div className="flex flex-wrap justify-center gap-2.5 px-2 max-w-2xl mx-auto">
    {COMPARE_LINKS.map((item) => (
      <a
        key={item.href}
        href={item.href}
        className="rounded-full border border-neutral-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-neutral-700 transition-all duration-200 hover:border-lime-400 hover:text-neutral-900 hover:shadow-sm"
      >
        {item.label}
      </a>
    ))}
    {showLearnLink && (
      <a
        href="/learn-spanish"
        className="rounded-full bg-neutral-900 px-5 py-2.5 text-[13px] font-semibold text-white transition-all hover:bg-neutral-700"
      >
        learn spanish →
      </a>
    )}
  </div>
);
