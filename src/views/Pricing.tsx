import { useState } from "react";
import { motion } from "framer-motion";
import { Check, ChevronRight } from "lucide-react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { FAQAccordion } from "../components/FAQAccordion";
import { ANIMATION_EASE as ease, COMPARE_LINKS, PLUS_FEATURES } from "../constants";

type BillingCycle = "monthly" | "annual";

const plans = [
  {
    id: "free",
    name: "free",
    tagline: "daily immersion feed",
    features: [
      "daily immersion feed",
      "tap-to-translate + word glosses",
      "save vocabulary",
      "companion + stars",
    ],
    cta: "download free",
    highlight: false,
  },
  {
    id: "plus",
    name: "plus",
    tagline: "unlimited everything",
    features: [
      ...PLUS_FEATURES.map((f) => `${f.title} — ${f.desc}`),
      "7-day free trial when eligible",
    ],
    cta: "get plus",
    highlight: true,
  },
];

const faqs = [
  {
    question: "is alya really free?",
    answer: "yes. download free and get a daily immersion feed. ALYA Plus unlocks Unlimited Immersion, Advanced Explanations, Unlimited Vocabulary, and Customization.",
  },
  {
    question: "what does ALYA Plus include?",
    answer: "Unlimited Immersion (every clip and collection), Advanced Explanations (nuance and natural phrasing), Unlimited Vocabulary (save and review every phrase), and ALYA Customization (outfits and room items).",
  },
  {
    question: "is there a free trial?",
    answer: "eligible users get a 7-day free trial on Plus. then the selected Annual or Monthly plan renews automatically. cancel anytime before the trial ends.",
  },
  {
    question: "how do I pay?",
    answer: "subscriptions are processed through the App Store with RevenueCat. iOS only. manage, upgrade, or cancel from Settings → Billing & Restore Purchases.",
  },
  {
    question: "can I switch between Annual and Monthly?",
    answer: "yes, anytime from the paywall or settings. changes take effect at the next billing cycle.",
  },
  {
    question: "what happens if I cancel?",
    answer: "you keep Plus until the end of the billing period, then return to the free daily feed. your words, stars, and companion progress stay saved.",
  },
];

const Pricing = ({ currentPath }: { currentPath?: string }) => {
  const [billing, setBilling] = useState<BillingCycle>("annual");

  return (
    <div className="min-h-screen font-sans bg-lime-50">
      <NavBar currentPath={currentPath} />

      <main className="max-w-4xl mx-auto px-4 sm:px-6">

        <section className="pt-32 pb-14 text-center">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease }}
            className="text-4xl sm:text-5xl md:text-6xl font-semibold tracking-tight text-neutral-900 leading-[1.05] mb-4"
          >
            start free.<br />
            <span className="text-lime-500">go Plus for unlimited.</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.12, ease }}
            className="text-neutral-500 text-base mb-10"
          >
            free daily feed. Plus unlocks everything. 7-day free trial when eligible.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2, ease }}
            className="inline-flex items-center gap-1 p-1 rounded-full border border-neutral-200 bg-white shadow-sm"
          >
            {(["monthly", "annual"] as BillingCycle[]).map((cycle) => (
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
                    best value
                  </span>
                )}
              </button>
            ))}
          </motion.div>
          <p className="text-neutral-400 text-xs mt-3">
            {billing === "annual" ? "Annual — best value · billed yearly" : "Monthly — flexible · billed monthly"}
          </p>
        </section>

        <section className="pb-20">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-stretch max-w-3xl mx-auto">
            {plans.map((plan, i) => (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                transition={{ duration: 0.55, delay: i * 0.08, ease }}
                className={`relative rounded-2xl p-7 flex flex-col transition-all duration-300 shadow-sm hover:shadow-xl ${
                  plan.highlight
                    ? "ring-2 ring-lime-400 bg-white"
                    : "bg-neutral-50 hover:bg-white border border-neutral-100"
                }`}
              >
                {plan.highlight && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="px-3 py-1 rounded-full bg-neutral-900 text-white text-[10px] font-bold uppercase tracking-widest whitespace-nowrap">
                      most popular
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <p className="text-[11px] font-bold uppercase tracking-widest mb-3 text-neutral-400">
                    {plan.name}
                  </p>
                  <p className="text-4xl font-semibold tracking-tight mb-1 text-neutral-900 capitalize">
                    {plan.id === "free" ? "free" : billing}
                  </p>
                  <p className="text-xs mb-3 text-neutral-400">
                    {plan.id === "free" ? "daily feed" : "price in App Store · " + (billing === "annual" ? "billed yearly" : "billed monthly")}
                  </p>
                  <p className="text-sm text-neutral-500">
                    {plan.tagline}
                  </p>
                </div>

                <div className="h-px mb-5 bg-neutral-100" />

                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-center gap-2.5">
                      <Check
                        size={14}
                        strokeWidth={2.5}
                        className="shrink-0 text-lime-500"
                      />
                      <span className="text-sm leading-snug text-neutral-700">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5, ease }}
            className="text-center text-neutral-400 text-xs mt-10"
          >
            subscriptions via App Store (RevenueCat) · iOS only · cancel anytime
          </motion.p>
          <p className="text-center text-sm mt-4">
            <a href="/support" className="text-neutral-500 hover:text-lime-600 font-medium transition-colors">
              how billing &amp; trials work →
            </a>
          </p>
        </section>

      </main>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">

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

      </div>

      <Footer />
    </div>
  );
};

export default Pricing;
