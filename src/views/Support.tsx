import { MarkdownPage } from "../components/MarkdownPage";

const Support = ({ currentPath }: { currentPath?: string }) => (
  <MarkdownPage file="support.md" currentPath={currentPath} />
);

export default Support;
