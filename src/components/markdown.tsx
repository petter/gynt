import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import rehypeSanitize from "rehype-sanitize";
import remarkGfm from "remark-gfm";

interface Props {
  children: string | null;
}
export function Markdown({ children }: Props) {
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeSanitize, rehypeRaw]}
      disallowedElements={["script"]}
    >
      {children}
    </ReactMarkdown>
  );
}
