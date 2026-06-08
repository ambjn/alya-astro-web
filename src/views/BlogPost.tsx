import { motion } from "framer-motion";
import { ArrowLeft, Clock } from "lucide-react";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { type BlogPost, type BlogSection } from "../blog/posts";
import { ANIMATION_EASE } from "../constants";
import { DownloadButton } from "../components/DownloadButton";
import { NavBar } from "../components/NavBar";

function renderSection(section: BlogSection, index: number) {
  const base = { key: index };

  switch (section.type) {
    case "h2":
      return (
        <h2
          {...base}
          className="text-2xl md:text-3xl font-semibold text-neutral-900 mt-12 mb-5 leading-tight"
        >
          {section.content as string}
        </h2>
      );
    case "h3":
      return (
        <h3
          {...base}
          className="text-xl font-semibold text-neutral-700 mt-8 mb-3"
        >
          {section.content as string}
        </h3>
      );
    case "p":
      return (
        <p
          {...base}
          className="text-neutral-600 text-lg leading-relaxed mb-6"
        >
          {section.content as string}
        </p>
      );
    case "ul":
      return (
        <ul {...base} className="space-y-2.5 mb-8 pl-2">
          {(section.content as string[]).map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-neutral-600 text-lg"
            >
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-lime-500 flex-shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          {...base}
          className="border-l-4 border-lime-400 pl-6 py-4 my-10 bg-lime-50 rounded-r-2xl text-neutral-600 text-xl italic"
        >
          {section.content as string}
        </blockquote>
      );
    case "cta":
      return (
        <div
          {...base}
          className="my-12 p-8 md:p-10 rounded-3xl border border-lime-100 bg-lime-50/60 text-center"
        >
          <p className="text-neutral-600 text-lg mb-6">
            {section.content as string}
          </p>
          <DownloadButton className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm rounded-full bg-lime-500 text-white font-semibold hover:bg-lime-400 hover:scale-105 transition-all duration-300" />
        </div>
      );
    default:
      return null;
  }
}

export interface BlogPostClientProps {
  post: BlogPost;
  currentPath?: string;
}

const BlogPostClient = ({ post, currentPath }: BlogPostClientProps) => {
  return (
    <div className="min-h-screen font-sans">
      <NavBar currentPath={currentPath} />

      <main className="max-w-3xl mx-auto px-4 sm:px-6 pb-32 pt-28">
        <a
          href="/blog"
          className="inline-flex items-center gap-2 text-neutral-400 hover:text-neutral-900 transition-colors mb-10 group"
        >
          <div className="p-2 rounded-full bg-white/80 glass group-hover:bg-white transition-colors">
            <ArrowLeft size={14} />
          </div>
          <span className="text-sm font-medium">Back to blog</span>
        </a>

        <motion.header
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ANIMATION_EASE }}
          className="mb-12"
        >
          <div className="flex items-center gap-3 mb-5">
            <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400 font-medium">
              <Clock size={12} />
              {post.readingTime}
            </span>
            <span className="text-neutral-200">·</span>
            <span className="text-xs text-neutral-400">
              {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-neutral-900 leading-[1.1] mb-6 tracking-tight text-balance">
            {post.title}
          </h1>
          <p className="text-neutral-500 text-xl font-light leading-relaxed border-l-2 border-lime-400 pl-5">
            {post.excerpt}
          </p>
        </motion.header>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: ANIMATION_EASE }}
        >
          {post.content.map((section, i) => renderSection(section, i))}
        </motion.article>

        {post.faqs && post.faqs.length > 0 && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, ease: ANIMATION_EASE }}
            className="mt-20 pt-12 border-t border-neutral-100"
          >
            <h2 className="text-2xl font-semibold text-neutral-900 mb-8">
              Frequently Asked Questions
            </h2>
            <FAQAccordion faqs={post.faqs} />
          </motion.section>
        )}

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: ANIMATION_EASE }}
          className="mt-20 p-10 md:p-12 rounded-3xl bg-lime-50 border border-lime-100 text-center relative overflow-hidden"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-64 h-32 bg-lime-200/50 blur-3xl" />
          <div className="relative">
            <p className="text-lime-600 font-bold text-xs uppercase tracking-widest mb-3">
              Start learning today
            </p>
            <h3 className="text-3xl font-semibold text-neutral-900 mb-4">
              Ready to try alya?
            </h3>
            <p className="text-neutral-500 text-base mb-8 max-w-sm mx-auto">
              5 free messages every day. No credit card required.
            </p>
            <DownloadButton className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm rounded-full bg-lime-500 text-white font-semibold hover:bg-lime-400 transition-all duration-300 shadow-md shadow-lime-200" />
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostClient;
