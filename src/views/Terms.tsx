import { MarkdownPage } from "../components/MarkdownPage";

const Terms = ({ currentPath }: { currentPath?: string }) => (
  <MarkdownPage file="terms.md" currentPath={currentPath} />
);

export default Terms;
