import { Fragment } from "react";

interface Props {
  language: string;
  children: string;
}

export function CodeBlock({ language, children }: Props) {
  const lines = children.split("\n");
  return (
    <pre className="w-full overflow-x-auto">
      {lines.map((line, i) => (
        // biome-ignore lint/suspicious/noArrayIndexKey: line numbers bruh
        <Fragment key={i}>
          {i + 1}: {line}
          <br />
        </Fragment>
      ))}
    </pre>
  );
}
