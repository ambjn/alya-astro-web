import { MarkdownPage } from "../components/MarkdownPage";

const Terms = ({ content, currentPath }: { content?: string; currentPath?: string }) => (
  <MarkdownPage file="terms.md" content={content} currentPath={currentPath} />
);

export default Terms;
