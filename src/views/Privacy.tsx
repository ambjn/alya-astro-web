import { MarkdownPage } from "../components/MarkdownPage";

const Privacy = ({ currentPath }: { currentPath?: string }) => (
  <MarkdownPage file="privacy.md" currentPath={currentPath} />
);

export default Privacy;
