import { MarkdownPage } from "../components/MarkdownPage";

const Privacy = ({ currentPath, content }: { currentPath?: string; content?: string }) => (
  <MarkdownPage file="privacy.md" currentPath={currentPath} content={content} />
);

export default Privacy;
