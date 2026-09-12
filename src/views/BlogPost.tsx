import { motion } from "framer-motion";
import { ArrowLeft, Clock, ChevronRight, BookOpen, Link2 } from "lucide-react";
import { Footer } from "../components/Footer";
import { FAQAccordion } from "../components/FAQAccordion";
import { posts, DEFAULT_AUTHOR, type BlogPost, type BlogSection } from "../blog/posts";
import { ANIMATION_EASE, COMPARE_LINKS } from "../constants";
import { DownloadButton } from "../components/DownloadButton";
import { NavBar } from "../components/NavBar";

function renderSection(section: BlogSection, index: number) {
  switch (section.type) {
    case "h2":
      return (
        <h2
          key={index}
          className="text-2xl md:text-3xl font-semibold text-neutral-900 mt-12 mb-5 leading-tight"
        >
          {section.content as string}
        </h2>
      );
    case "h3":
      return (
        <h3
          key={index}
          className="text-xl font-semibold text-neutral-700 mt-8 mb-3"
        >
          {section.content as string}
        </h3>
      );
    case "p":
      return (
        <p
          key={index}
          className="text-neutral-600 text-lg leading-relaxed mb-6"
        >
          {section.content as string}
        </p>
      );
    case "ul":
      return (
        <ul key={index} className="space-y-2.5 mb-8 pl-2">
          {(section.content as string[]).map((item, i) => (
            <li
              key={i}
              className="flex items-start gap-3 text-neutral-600 text-lg"
            >
              <span className="mt-2.5 w-1.5 h-1.5 rounded-full bg-lime-500 shrink-0" />
              <span className="leading-relaxed">{item}</span>
            </li>
          ))}
        </ul>
      );
    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-4 border-lime-400 pl-6 py-4 my-10 bg-lime-50 rounded-r-2xl text-neutral-600 text-xl italic"
        >
          {section.content as string}
        </blockquote>
      );
    case "cta":
      return (
        <div
          key={index}
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

interface BlogPostClientProps {
  post: BlogPost;
  currentPath?: string;
}

const BlogPostClient = ({ post, currentPath }: BlogPostClientProps) => {
  const related = posts.filter((p) => p.slug !== post.slug).slice(0, 3);
  const author = post.author ?? DEFAULT_AUTHOR;
  const initials = author.name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("");
  return (
    <div className="min-h-screen font-sans bg-lime-50">
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
          <p className="text-neutral-500 text-xl font-light leading-relaxed border-l-2 border-lime-400 pl-5 mb-8">
            {post.excerpt}
          </p>
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-full bg-lime-500 text-white flex items-center justify-center text-sm font-bold shrink-0">
              {initials}
            </div>
            <div>
              <p className="text-neutral-900 text-sm font-semibold leading-tight">{author.name}</p>
              <p className="text-neutral-400 text-xs leading-tight mt-0.5">
                {author.role} · Updated{" "}
                {new Date(post.updatedAt).toLocaleDateString("en-US", { month: "long", day: "numeric", year: "numeric" })}
              </p>
            </div>
          </div>
        </motion.header>

        <motion.aside
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.12, ease: ANIMATION_EASE }}
          className="mb-12 p-7 md:p-8 rounded-3xl border border-lime-200 bg-white"
        >
          <p className="flex items-center gap-2 text-lime-700 font-bold text-xs uppercase tracking-widest mb-3">
            <BookOpen size={14} />
            the short version
          </p>
          <p className="text-neutral-600 text-base leading-relaxed">{post.tldr}</p>
        </motion.aside>

        <motion.article
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.15, ease: ANIMATION_EASE }}
        >
          {post.content.map((section, i) => renderSection(section, i))}
        </motion.article>

        {post.faqs && post.faqs.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6 tracking-tight">frequently asked questions</h2>
            <FAQAccordion faqs={post.faqs} />
          </section>
        )}

        {post.sources && post.sources.length > 0 && (
          <section className="mt-16">
            <h2 className="text-2xl font-semibold text-neutral-900 mb-6 tracking-tight">sources & further reading</h2>
            <ul className="space-y-2.5">
              {post.sources.map((s) => (
                <li key={s.url}>
                  <a
                    href={s.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center gap-3 p-4 rounded-2xl border border-neutral-200 bg-white hover:border-lime-300 transition-all text-sm"
                  >
                    <Link2 size={14} className="text-lime-600 shrink-0" />
                    <span className="text-neutral-600 group-hover:text-neutral-900 transition-colors">{s.title}</span>
                  </a>
                </li>
              ))}
            </ul>
          </section>
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
              put it into practice
            </p>
            <h3 className="text-3xl font-semibold text-neutral-900 mb-4">
              scroll with alya.
            </h3>
            <p className="text-neutral-500 text-base mb-8 max-w-sm mx-auto">
              try what you just read in the feed. 7-day free trial when eligible.
            </p>
            <DownloadButton className="inline-flex items-center gap-2.5 px-8 py-3.5 text-sm rounded-full bg-lime-500 text-white font-semibold hover:bg-lime-400 transition-all duration-300 shadow-md shadow-lime-200" />
          </div>
        </motion.div>

        <section className="mt-16">
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6 tracking-tight">keep reading</h2>
          <div className="grid gap-3">
            {related.map((r) => (
              <a
                key={r.slug}
                href={`/blog/${r.slug}`}
                className="group flex items-center justify-between gap-4 p-5 rounded-2xl border border-neutral-200 bg-white hover:border-lime-300 hover:shadow-sm transition-all"
              >
                <div>
                  <p className="text-neutral-900 font-semibold leading-snug group-hover:text-lime-700 transition-colors">{r.title}</p>
                  <p className="text-neutral-400 text-sm mt-1">{r.readingTime}</p>
                </div>
                <ChevronRight size={16} className="text-neutral-300 group-hover:text-lime-500 group-hover:translate-x-0.5 transition-all shrink-0" />
              </a>
            ))}
          </div>
        </section>

        <section className="mt-10 text-center">
          <p className="text-neutral-500 text-xs font-semibold mb-4 uppercase tracking-widest">see how alya compares</p>
          <div className="flex flex-wrap justify-center gap-2">
            {COMPARE_LINKS.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="px-4 py-2 rounded-full border border-neutral-200 bg-white hover:border-neutral-300 text-neutral-600 text-xs font-medium transition-all"
              >
                {item.label}
              </a>
            ))}
            <a
              href="/learn-spanish"
              className="px-4 py-2 rounded-full bg-neutral-900 text-white text-xs font-semibold hover:bg-neutral-700 transition-all"
            >
              learn spanish →
            </a>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default BlogPostClient;
