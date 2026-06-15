import { MarkdownPage } from "../components/MarkdownPage";

const Privacy = ({ content, currentPath }: { content?: string; currentPath?: string }) => (
  <MarkdownPage file="privacy.md" content={content} currentPath={currentPath} />
);

export default Privacy;
