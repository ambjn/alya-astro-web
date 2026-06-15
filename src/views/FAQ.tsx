import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { APP_STORE_URL, ANIMATION_EASE as ease } from "../constants";

const AppleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" fill="currentColor" viewBox="0 0 16 16">
    <path d="M11.182.008C11.148-.03 9.923.023 8.857 1.18c-1.066 1.156-.902 2.482-.878 2.516s1.52.087 2.475-1.258.762-3.391.728-3.43zm3.314 11.733c-.048-.096-2.325-1.234-2.113-3.422s1.675-2.789 1.698-2.854-.597-.79-1.254-1.157a3.7 3.7 0 0 0-1.563-.434c-.108-.003-.483-.095-1.254.116-.508.139-1.653.589-1.968.607-.316.018-1.256-.522-2.267-.665-.647-.125-1.333.131-1.824.328-.49.196-1.422.754-2.074 2.237-.652 1.482-.311 3.83-.067 4.56s.625 1.924 1.273 2.796c.576.984 1.34 1.667 1.659 1.899s1.219.386 1.843.067c.502-.308 1.408-.485 1.766-.472.357.013 1.061.154 1.782.539.571.197 1.111.115 1.652-.105.541-.221 1.324-1.059 2.238-2.758q.52-1.148.581-1.515" />
  </svg>
);

const faqs = [
  {
    question: "is alya actually free?",
    answer: "Yes. Download alya and get 5 messages per day, forever, no credit card, no trial period. Upgrade to Plus ($4.99/mo) or Pro ($14.99/mo) anytime for more daily messages and deeper conversation memory.",
  },
  {
    question: "how is alya different from Duolingo?",
    answer: "Duolingo teaches you to study Spanish: vocabulary lists, hearts, streaks. Alya teaches you to speak it. Every session is a real conversation where alya corrects you in context, adapts to your level, and responds like a bilingual friend. No preset curriculum, no lives to lose.",
  },
  {
    question: "do I need to speak English to use alya?",
    answer: "Not at all. Alya detects the language you text in (Hindi, Japanese, French, Portuguese, and more) and responds in that same language while teaching you Spanish. Alya was built for learners worldwide, not just English speakers.",
  },
  {
    question: "how long before I can hold a real conversation?",
    answer: "Most learners can handle basic everyday conversations within 4 to 8 weeks of daily practice. The key is consistency over intensity: 10 to 15 minutes every day beats a 2-hour weekend session every time.",
  },
  {
    question: "can I practice speaking, not just typing?",
    answer: "Yes. Send voice messages to alya and she'll transcribe, respond, and teach. Tap any Spanish word in alya's replies to hear native-accent pronunciation. Voice in, voice out.",
  },
  {
    question: "what Spanish does alya teach?",
    answer: "Latin American Spanish, the variety spoken in Mexico, Colombia, Argentina, and across the continent. Modern, natural, and understood everywhere. Alya deliberately avoids Spain-specific slang.",
  },
  {
    question: "what counts as a message?",
    answer: "Each message you send to alya counts as one. Alya's replies don't count. The limit resets every 24 hours.",
  },
  {
    question: "what happens when I hit my daily limit?",
    answer: "Alya lets you know you've reached your limit for the day and shows you upgrade options. Your conversation history is saved and ready when the limit resets.",
  },
  {
    question: "can I switch plans?",
    answer: "Yes, anytime. Upgrade or downgrade from the settings screen in the app. Changes take effect at the next billing cycle.",
  },
  {
    question: "what payment methods are accepted?",
    answer: "Subscriptions are processed through the App Store using your Apple ID. All major cards, Apple Pay, and carrier billing are supported.",
  },
  {
    question: "is there a student discount?",
    answer: "Not yet, but the free plan is genuinely useful for casual learners. Plus at $4.99/month is less than a single coffee.",
  },
];

export const FAQ = ({ currentPath }: { currentPath?: string }) => {
  return (
    <div className="min-h-screen font-sans bg-lime-50">
      <NavBar currentPath={currentPath} />

      <main className="max-w-5xl mx-auto px-6 sm:px-10 pt-32 pb-24">
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.7, ease }}
          className="mb-16"
        >
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-semibold text-neutral-900 tracking-tight leading-[1.05] mb-4">
            questions &amp;<br />
            <span className="text-lime-500">answers.</span>
          </h1>
          <p className="text-neutral-500 text-base sm:text-lg font-light max-w-md">
            straight answers to everything people ask before downloading.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.6, ease }}
        >
          <FAQAccordion faqs={faqs} />
        </motion.div>

      </main>

      <Footer />
    </div>
  );
};

export default FAQ;
