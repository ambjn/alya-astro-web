import { MarkdownPage } from "../components/MarkdownPage";

const Support = ({ currentPath, content }: { currentPath?: string; content?: string }) => (
  <MarkdownPage file="support.md" currentPath={currentPath} content={content} />
);

export default Support;
