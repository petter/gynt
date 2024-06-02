import ReactMarkdown from "react-markdown";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";

interface Props {
  children: string | null;
}
export function Markdown({ children }: Props) {
  console.log(children);
  return (
    <ReactMarkdown
      remarkPlugins={[remarkGfm]}
      rehypePlugins={[rehypeRaw]}
      disallowedElements={["script"]}
    >
      {children}
    </ReactMarkdown>
  );
}
