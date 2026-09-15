import { MarkdownPage } from "../components/MarkdownPage";

const Terms = ({ currentPath, content }: { currentPath?: string; content: string }) => (
  <MarkdownPage currentPath={currentPath} content={content} />
);

export default Terms;
