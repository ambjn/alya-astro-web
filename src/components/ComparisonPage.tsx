import { motion } from "framer-motion";
import { Check, X } from "lucide-react";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { FAQAccordion } from "./FAQAccordion";
import { ANIMATION_EASE as ease } from "../constants";

export interface ComparisonRow {
  feature: string;
  alya: string | boolean;
  competitor: string | boolean;
}

export interface ComparisonPageProps {
  competitorName: string;
  competitorTagline: string;
  alyaTagline: string;
  verdict: string;
  heroHeading: string;
  heroSubtitle: string;
  rows: ComparisonRow[];
  sections: { heading: string; body: string }[];
  faqs: { question: string; answer: string }[];
  currentPath?: string;
}

function CellValue({
  value,
  isAlya,
}: {
  value: string | boolean;
  isAlya?: boolean;
}) {
  if (value === true)
    return (
      <div className={`flex justify-center ${isAlya ? "text-lime-500" : "text-neutral-400"}`}>
        <Check size={18} strokeWidth={2.5} />
      </div>
    );
  if (value === false)
    return <X size={18} className="text-neutral-200 mx-auto" strokeWidth={2.5} />;
  return (
    <span className={`text-xs md:text-sm ${isAlya ? "text-neutral-900 font-medium" : "text-neutral-400 font-light"}`}>
      {value}
    </span>
  );
}

export const ComparisonPage = ({
  competitorName,
  competitorTagline,
  alyaTagline,
  verdict,
  heroHeading,
  heroSubtitle,
  rows,
  sections,
  faqs,
  currentPath,
}: ComparisonPageProps) => {
  return (
    <div className="min-h-screen font-sans bg-lime-50">
      <NavBar currentPath={currentPath} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6">
        <section className="pt-24 pb-12 md:pt-32 md:pb-16 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1, ease }}
            className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl font-semibold tracking-tight text-neutral-900 mb-4"
          >
            alya <span className="text-lime-500">vs {competitorName.toLowerCase()}.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2, ease }}
            className="text-neutral-600 text-lg md:text-xl max-w-2xl mx-auto font-light leading-relaxed mb-8"
          >
            {heroSubtitle}
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease }}
            className="p-5 md:p-7 rounded-3xl border border-lime-200 bg-white max-w-2xl mx-auto"
          >
            <p className="text-xs uppercase tracking-widest text-lime-600 font-bold mb-2">
              The Verdict
            </p>
            <p className="text-neutral-700 text-base md:text-lg font-light leading-relaxed">
              &ldquo;{verdict}&rdquo;
            </p>
          </motion.div>
        </section>

        {/* Comparison Table */}
        <motion.section
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease }}
          className="mb-16 md:mb-20"
        >
          <div className="relative rounded-3xl overflow-hidden border border-neutral-200 bg-white shadow-sm">
            <div className="overflow-x-auto">
              <div className="min-w-[480px]">
                <div className="grid grid-cols-10 border-b border-neutral-200 bg-neutral-50 sticky top-[64px] z-20">
                  <div className="col-span-4 px-4 sm:px-8 py-4 sm:py-5 text-neutral-400 text-xs font-bold uppercase tracking-widest flex items-center">
                    Feature
                  </div>
                  <div className="col-span-3 px-4 sm:px-8 py-4 sm:py-5 text-center border-l border-neutral-200 bg-lime-50 relative">
                    <div className="absolute top-0 left-0 right-0 h-1 bg-lime-400" />
                    <span className="text-neutral-900 font-bold text-sm sm:text-lg block">alya</span>
                    <span className="text-lime-600 text-[10px] sm:text-xs mt-1 block font-medium tracking-wide uppercase">
                      {alyaTagline}
                    </span>
                  </div>
                  <div className="col-span-3 px-4 sm:px-8 py-4 sm:py-5 text-center border-l border-neutral-200">
                    <span className="text-neutral-500 font-medium text-sm sm:text-lg block">
                      {competitorName}
                    </span>
                    <span className="text-neutral-400 text-[10px] sm:text-xs mt-1 block tracking-wide uppercase">
                      {competitorTagline}
                    </span>
                  </div>
                </div>

                <div className="divide-y divide-neutral-100">
                  {rows.map((row, i) => (
                    <div
                      key={i}
                      className="grid grid-cols-10 group hover:bg-neutral-50 transition-colors"
                    >
                      <div className="col-span-4 px-4 sm:px-8 py-3 sm:py-4 text-neutral-700 text-xs sm:text-sm font-light flex items-center">
                        {row.feature}
                      </div>
                      <div className="col-span-3 px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-center border-l border-neutral-100 bg-lime-50/50 group-hover:bg-lime-50 transition-colors">
                        <CellValue value={row.alya} isAlya />
                      </div>
                      <div className="col-span-3 px-3 sm:px-8 py-3 sm:py-4 flex items-center justify-center border-l border-neutral-100">
                        <CellValue value={row.competitor} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Content Sections */}
        <div className="max-w-3xl mx-auto space-y-12 mb-16 md:mb-20">
          {sections.map((section, i) => (
            <motion.section
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08, ease }}
            >
              <h2 className="text-xl md:text-2xl font-semibold text-neutral-900 mb-3 leading-tight">
                {section.heading}
              </h2>
              <p className="text-neutral-600 text-base md:text-lg leading-relaxed font-light">
                {section.body}
              </p>
            </motion.section>
          ))}
        </div>

        {/* FAQ */}
        <section className="max-w-3xl mx-auto pb-20 md:pb-28">
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease }}
            className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-8 text-center tracking-tight"
          >
            Questions &amp; Answers
          </motion.h2>
          <FAQAccordion faqs={faqs} />
        </section>
      </main>

      <Footer />
    </div>
  );
};
