import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { FAQAccordion } from "../components/FAQAccordion";
import { ANIMATION_EASE as ease, COMPARE_LINKS, APP_STORE_URL } from "../constants";

type BillingCycle = "weekly" | "monthly" | "annual";

const plans = [
  {
    id: "free",
    name: "free",
    prices: { weekly: null, monthly: 0, annual: null },
    annualMonthly: undefined as number | undefined,
    tagline: "try alya, no commitment",
    features: [
      "5 messages per day",
      "all 3 proficiency levels",
      "20-message memory",
      "instant corrections",
    ],
    cta: "download free",
    highlight: false,
  },
  {
    id: "plus",
    name: "plus",
    prices: { weekly: 1.99, monthly: 4.99, annual: 29.99 },
    annualMonthly: 2.5,
    tagline: "for serious learners",
    features: [
      "25 messages per day",
      "all 3 proficiency levels",
      "40-message memory",
      "instant corrections",
    ],
    cta: "get plus",
    highlight: true,
  },
  {
    id: "pro",
    name: "pro",
    prices: { weekly: 4.99, monthly: 14.99, annual: 89.99 },
    annualMonthly: 7.5,
    tagline: "for daily immersion",
    features: [
      "75 messages per day",
      "all 3 proficiency levels",
      "60-message memory",
      "instant corrections",
      "deeper conversation memory",
    ],
    cta: "get pro",
    highlight: false,
  },
];

const faqs = [
  {
    question: "is alya really free?",
    answer: "yes. download alya and get 5 messages per day, forever. no credit card required. upgrade to plus or pro anytime from within the app.",
  },
  {
    question: "what counts as a message?",
    answer: "each message you send to alya counts as one. alya's replies don't count. the limit resets every 24 hours.",
  },
  {
    question: "what language do I need to speak to use alya?",
    answer: "any language. alya detects the language you text in, english, hindi, french, portuguese, japanese, and more, and responds in that same language while teaching spanish. you don't need to know english.",
  },
  {
    question: "can I switch plans?",
    answer: "yes, anytime. upgrade or downgrade from the settings screen in the app. changes take effect at the next billing cycle.",
  },
  {
    question: "what payment methods are accepted?",
    answer: "subscriptions are processed through the App Store using your Apple ID. all major cards, Apple Pay, and carrier billing are supported.",
  },
  {
    question: "is there a student discount?",
    answer: "not yet, but the free plan is genuinely useful for casual learners. plus at $4.99/month is less than a single coffee.",
  },
  {
    question: "what happens when I hit my daily limit?",
    answer: "alya lets you know you've reached your limit for the day and shows you upgrade options. your conversation history is saved and ready when the limit resets.",
  },
];

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-3.391.728-3.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.148.581-1.515" />
  </svg>
);

const Pricing = ({ currentPath }: { currentPath?: string }) => {
  const [billing, setBilling] = useState<BillingCycle>("monthly");

  const getPrice = (plan: (typeof plans)[0]) => {
    if (plan.prices.monthly === 0) return "free";
    if (billing === "weekly") return `$${plan.prices.weekly}/wk`;
    if (billing === "annual") return `$${plan.annualMonthly}/mo`;
    return `$${plan.prices.monthly}/mo`;
  };

  const getSub = (plan: (typeof plans)[0]) => {
    if (plan.prices.monthly === 0) return "forever free";
    if (billing === "annual") return `$${plan.prices.annual} billed annually`;
    if (billing === "weekly") return "billed weekly";
    return "billed monthly";
  };

  return (
    <div className="min-h-screen font-sans bg-lime-50">
      <NavBar currentPath={currentPath} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6">

        {/* Hero + Billing Toggle */}
        <section className="pt-32 pb-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-4"
          >
            start free.<br />
            <span className="text-lime-500">upgrade when ready.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="text-neutral-500 text-base mb-10"
          >
            all plans start with a free tier. no credit card needed to download.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="inline-flex items-center gap-1 p-1 rounded-full border border-neutral-200 bg-white shadow-sm"
          >
            {(["weekly", "monthly", "annual"] as BillingCycle[]).map((cycle) => (
              <button
                key={cycle}
                onClick={() => setBilling(cycle)}
                className={`relative px-5 py-2 rounded-full text-xs font-semibold transition-all duration-200 ${billing === cycle
                  ? "bg-neutral-900 text-white shadow-sm"
                  : "text-neutral-400 hover:text-neutral-700"
                  }`}
              >
                <span className="capitalize">{cycle}</span>
                {cycle === "annual" && (
                  <span className={`ml-1.5 text-[10px] font-bold ${billing === cycle ? "text-lime-400" : "text-lime-500"}`}>
                    −50%
                  </span>
                )}
              </button>
            ))}
          </motion.div>
        </section>

        {/* Plans Grid */}
        <section className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-start">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 ${plan.highlight
                  ? "bg-neutral-900 shadow-2xl shadow-neutral-900/20 md:-mt-4 md:mb-4"
                  : "bg-white border border-neutral-100 hover:shadow-md"
                  }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-lime-400 text-neutral-900 text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className={`text-[11px] font-bold uppercase tracking-widest mb-3 ${plan.highlight ? "text-lime-400" : "text-neutral-400"}`}>
                    {plan.name}
                  </p>
                  <p className={`text-4xl font-semibold tracking-tight mb-1 ${plan.highlight ? "text-white" : "text-neutral-900"}`}>
                    {getPrice(plan)}
                  </p>
                  <p className={`text-xs mb-3 ${plan.highlight ? "text-neutral-500" : "text-neutral-400"}`}>
                    {getSub(plan)}
                  </p>
                  <p className={`text-sm ${plan.highlight ? "text-neutral-300" : "text-neutral-500"}`}>
                    {plan.tagline}
                  </p>
                </div>

                <div className={`h-px mb-5 ${plan.highlight ? "bg-white/10" : "bg-neutral-100"}`} />

                <ul className="space-y-3 mb-7 flex-1">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className={`flex-shrink-0 ${plan.highlight ? "text-lime-400" : "text-lime-500"}`}
                      />
                      <span className={`text-sm leading-snug ${plan.highlight ? "text-neutral-200" : "text-neutral-700"}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <a
                  href={APP_STORE_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={`flex items-center justify-center gap-2 w-full py-3.5 rounded-full font-semibold text-sm transition-all duration-200 active:scale-[0.97] ${plan.highlight
                    ? "bg-lime-400 text-neutral-900 hover:bg-lime-300"
                    : plan.prices.monthly === 0
                      ? "bg-neutral-900 text-white hover:bg-neutral-700"
                      : "border border-neutral-200 text-neutral-700 hover:border-neutral-400 hover:text-neutral-900 bg-transparent"
                    }`}
                >
                  <AppleIcon />
                  {plan.cta}
                </a>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="text-center text-neutral-400 text-xs mt-10"
          >
            subscriptions managed via App Store · cancel anytime · iOS only
          </motion.p>
        </section>

        {/* Compare section */}
        <section className="pb-16">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease }}
            className="text-center"
          >
            <p className="text-neutral-500 text-xs font-semibold mb-4 uppercase tracking-widest">see how alya compares</p>
            <div className="flex flex-wrap justify-center gap-2">
              {COMPARE_LINKS.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="flex items-center gap-1.5 px-4 py-2 rounded-full border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-sm text-neutral-600 text-xs font-medium transition-all duration-200"
                >
                  {item.label} <ChevronRight size={12} className="text-neutral-400" />
                </a>
              ))}
            </div>
          </motion.div>
        </section>

        {/* FAQ section */}
        <section className="pb-24">
          <div className="max-w-2xl mx-auto w-full">
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, ease }}
              className="text-2xl md:text-3xl font-semibold text-neutral-900 mb-8 text-center tracking-tight"
            >
              frequently asked questions
            </motion.h2>
            <FAQAccordion faqs={faqs} />
          </div>
        </section>

      </main>

      <Footer />
    </div>
  );
};

export default Pricing;
