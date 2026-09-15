import { motion } from "framer-motion";
import { NavBar } from "../components/NavBar";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { ANIMATION_EASE as ease } from "../constants";

export const faqs = [
  {
    question: "is alya free to download?",
    answer: "Yes, free to download on iOS. ALYA Plus membership is required to use the feed. Eligible new users get 7 days free, then Plus Monthly ($4.99/month) or Plus Annual ($29.99/year) renews automatically. Cancel anytime.",
  },
  {
    question: "how is alya different from Duolingo?",
    answer: "Duolingo drills vocabulary with exercises. Alya is immersion: short native videos where you tap to understand, save words to My Words, and grow a companion. Drills teach recognition. Immersion builds understanding.",
  },
  {
    question: "do I need to know Spanish already?",
    answer: "No. Beginner clips come with full translations and per-word glosses. The feed adapts from Beginner to Intermediate to Advanced as you improve, onboarding maps brand-new and elementary starters to Beginner.",
  },
  {
    question: "how much time per day?",
    answer: "5–30 minutes. Onboarding builds a personalized plan (minutes/day, streak goal, level, focus) from your goals and challenges, and you can set reminders for Morning (8:00), Afternoon (14:00), Evening (19:00), or Night (21:30).",
  },
  {
    question: "how does tap-to-translate work?",
    answer: "Every clip ships pre-transcribed with a synchronized Spanish transcript, English translation, and word timing. Tap any phrase for its instant explanation in context, hear native pronunciation (Aura-2 Selena), slow to 0.75x, and save it to My Words for spaced review.",
  },
  {
    question: "what is the ALYA companion?",
    answer: "Completing clips and saving words earns stars. Stars grow ALYA's energy, bond, and curiosity, with streaks (7 / 14 / 30 / 60-day goals, milestones at 7, 14, every 30) and achievements to keep you consistent.",
  },
  {
    question: "what does ALYA Plus include?",
    answer: "Unlimited Immersion (every clip, picked for your level), Instant Explanations (tap any phrase to understand it in context), and Your Evolving Companion (complete clips and save words to grow ALYA).",
  },
  {
    question: "is there a free trial?",
    answer: "Eligible new users get 7 days free. The paywall shows Start Free Trial only when your Apple ID is eligible. Then $4.99/month or $29.99/year renews automatically. Billing is via the App Store, iOS only. Already subscribed? Tap Restore.",
  },
  {
    question: "can I filter what I watch?",
    answer: "Yes. Explore filters by level (Beginner / Intermediate / Advanced), grammar (Questions, Present/Past tense, Commands, Polite phrases, Conversation), source (Anime, Cartoon, Drama, Movie, Music, News, Vlog, Podcast, Interview, Lesson), and format (Shorts ≤90s vs Videos), plus 20 topics and search.",
  },
  {
    question: "what Spanish will I hear?",
    answer: "Real-world Spanish from native videos, street interviews, vlogs, food, travel, music, Spanish Culture. Always pre-transcribed and translated so you understand in context, with 0.75x–1.5x playback and 10s skip.",
  },
  {
    question: "how do I manage billing or delete my data?",
    answer: "Manage, upgrade, or cancel from Settings → Billing or your Apple ID subscriptions. You can delete progress, vocabulary, preferences, and your account from Settings, it signs you out and clears local data.",
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
