import { MarkdownPage } from "../components/MarkdownPage";

const Terms = ({ currentPath, content }: { currentPath?: string; content?: string }) => (
  <MarkdownPage file="terms.md" currentPath={currentPath} content={content} />
);

export default Terms;
