import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { ANIMATION_EASE as ease } from "../constants";

export interface FAQItem {
  question: string;
  answer: string;
}

export const FAQAccordion = ({ faqs }: { faqs: FAQItem[] }) => {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="space-y-2.5">
      {faqs.map((faq, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 8 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: i * 0.06, ease }}
          className={`rounded-2xl overflow-hidden transition-all duration-200 ${
            open === i
              ? "border border-lime-200 bg-white shadow-md"
              : "border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm"
          }`}
        >
          <button
            onClick={() => setOpen(open === i ? null : i)}
            className="w-full flex items-center justify-between px-6 py-5 text-left group"
            aria-expanded={open === i}
          >
            <span className={`text-base pr-4 leading-snug transition-colors ${
              open === i ? "font-semibold text-neutral-900" : "font-medium text-neutral-700 group-hover:text-neutral-900"
            }`}>
              {faq.question}
            </span>
            <div className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-all duration-300 ${
              open === i
                ? "bg-lime-400 text-neutral-900"
                : "bg-neutral-100 text-neutral-400 group-hover:bg-neutral-200 group-hover:text-neutral-600"
            }`}>
              <motion.div
                animate={{ rotate: open === i ? 180 : 0 }}
                transition={{ duration: 0.3, ease }}
              >
                <ChevronDown size={16} strokeWidth={2.5} />
              </motion.div>
            </div>
          </button>
          <AnimatePresence initial={false}>
            {open === i && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.32, ease }}
              >
                <div className="px-6 pb-6">
                  <div className="border-l-2 border-lime-400 pl-4">
                    <p className="selectable text-neutral-500 text-sm md:text-base leading-relaxed font-light">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      ))}
    </div>
  );
};
