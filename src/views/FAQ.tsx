import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { ANIMATION_EASE as ease } from "../constants";

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
