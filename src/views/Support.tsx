import { MarkdownPage } from "../components/MarkdownPage";

const Support = ({ content, currentPath }: { content?: string; currentPath?: string }) => (
  <MarkdownPage file="support.md" content={content} currentPath={currentPath} />
);

export default Support;
