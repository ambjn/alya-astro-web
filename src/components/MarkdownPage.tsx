import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { Footer } from "./Footer";
import { NavBar } from "./NavBar";
import { ANIMATION_EASE } from "../constants";

interface MarkdownPageProps {
  currentPath?: string;
  content: string;
}

const proseClasses = `
  prose prose-neutral prose-sm sm:prose-base md:prose-lg max-w-none
  prose-headings:font-semibold prose-headings:tracking-tight prose-headings:text-neutral-800
  prose-h1:text-3xl sm:prose-h1:text-4xl md:prose-h1:text-5xl prose-h1:mb-10 prose-h1:font-bold prose-h1:tracking-tighter
  prose-h2:text-2xl sm:prose-h2:text-3xl prose-h2:mt-14 prose-h2:mb-6 prose-h2:text-neutral-700
  prose-h3:text-xl prose-h3:mt-10 prose-h3:mb-4 prose-h3:text-neutral-600
  prose-p:text-neutral-500 prose-p:leading-relaxed prose-p:mb-6 prose-p:font-light
  prose-a:text-lime-600 prose-a:no-underline hover:prose-a:text-lime-700 prose-a:transition-colors prose-a:font-normal
  prose-strong:text-neutral-700 prose-strong:font-semibold
  prose-ul:list-disc prose-ul:pl-6 prose-ul:my-6 prose-li:marker:text-lime-500 prose-li:pl-2 prose-li:text-neutral-500 prose-li:mb-1.5
  prose-blockquote:border-l-4 prose-blockquote:border-lime-400 prose-blockquote:bg-lime-50 prose-blockquote:py-4 prose-blockquote:px-6 prose-blockquote:rounded-r-2xl prose-blockquote:not-italic prose-blockquote:text-neutral-600 prose-blockquote:my-8 prose-blockquote:font-light
  prose-hr:border-neutral-200 prose-hr:my-16
`;

export const MarkdownPage = ({ currentPath, content }: MarkdownPageProps) => {
  return (
    <div className="min-h-screen text-neutral-900 flex flex-col font-sans bg-lime-50">
      <NavBar currentPath={currentPath} />

      <main className="w-full max-w-4xl mx-auto px-4 sm:px-6 pb-32 pt-28 grow flex flex-col">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: ANIMATION_EASE }}
          className="grow"
        >
          <div className="glass-heavy rounded-3xl p-8 md:p-14 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 left-0 right-0 h-1 bg-lime-400" />

            <article className={proseClasses}>
              <ReactMarkdown>{content}</ReactMarkdown>
            </article>
          </div>
        </motion.div>
      </main>

      <Footer />
    </div>
  );
};
