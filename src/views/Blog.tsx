import { motion } from "framer-motion";
import { Clock } from "lucide-react";
import { Footer } from "../components/Footer";
import { NavBar } from "../components/NavBar";
import { posts } from "../blog/posts";
import { ANIMATION_EASE as ease } from "../constants";

const Blog = ({ currentPath }: { currentPath?: string }) => {
  const [featured, ...rest] = posts;

  return (
    <div className="min-h-screen font-sans bg-lime-50">
      <NavBar currentPath={currentPath} />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 pb-32 pt-28">

        <section className="pb-14 max-w-xl">
          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease }}
            className="text-4xl sm:text-5xl font-semibold text-neutral-900 mb-3 tracking-tight leading-tight"
          >
            the blog.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1, ease }}
            className="text-neutral-500 text-base leading-relaxed"
          >
            Guides, tips, and insights on learning Spanish with AI.
          </motion.p>
        </section>

        {featured && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.15, ease }}
            className="mb-5"
          >
            <a
              href={`/blog/${featured.slug}`}
              className="group block rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-lg transition-all duration-300 overflow-hidden"
            >
              <div className="p-8 sm:p-10">
                <div className="flex items-center gap-3 mb-5">
                  <span className="px-2.5 py-1 rounded-full bg-lime-100 text-lime-600 text-[11px] font-semibold uppercase tracking-wide">
                    featured
                  </span>
                  <span className="text-neutral-200">·</span>
                  <span className="inline-flex items-center gap-1.5 text-xs text-neutral-400">
                    <Clock size={11} />
                    {featured.readingTime}
                  </span>
                  <span className="text-neutral-200">·</span>
                  <span className="text-xs text-neutral-400">
                    {new Date(featured.publishedAt).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })}
                  </span>
                </div>
                <h2 className="text-2xl sm:text-3xl font-semibold text-neutral-900 mb-3 group-hover:text-lime-600 transition-colors leading-snug tracking-tight max-w-2xl">
                  {featured.title}
                </h2>
                <p className="text-neutral-500 text-base leading-relaxed max-w-2xl">
                  {featured.excerpt}
                </p>
              </div>
            </a>
          </motion.div>
        )}

        {rest.length > 0 && (
          <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {rest.map((post, i) => (
              <motion.article
                key={post.slug}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45, delay: 0.2 + i * 0.07, ease }}
              >
                <a
                  href={`/blog/${post.slug}`}
                  className="group flex flex-col h-full p-6 rounded-2xl border border-neutral-200 bg-white hover:border-neutral-300 hover:shadow-md transition-all duration-300"
                >
                  <div className="flex items-center gap-2.5 mb-4">
                    <span className="inline-flex items-center gap-1 text-xs text-neutral-400">
                      <Clock size={10} />
                      {post.readingTime}
                    </span>
                    <span className="text-neutral-200">·</span>
                    <span className="text-xs text-neutral-400">
                      {new Date(post.publishedAt).toLocaleDateString("en-US", { month: "short", year: "numeric" })}
                    </span>
                  </div>
                  <h2 className="text-base font-semibold text-neutral-900 mb-2.5 group-hover:text-lime-600 transition-colors leading-snug flex-1">
                    {post.title}
                  </h2>
                  <p className="text-neutral-500 text-sm leading-relaxed line-clamp-2">
                    {post.excerpt}
                  </p>
                </a>
              </motion.article>
            ))}
          </section>
        )}

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.5, ease }}
          className="mt-12 text-center text-neutral-400 text-xs uppercase tracking-widest"
        >
          more posts coming soon
        </motion.p>
      </main>

      <Footer />
    </div>
  );
};

export default Blog;
