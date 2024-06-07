import { cn } from "@/lib/utils";
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
          <span
            className={cn(
              "w-full",
              line.startsWith("+") && "bg-green-300",
              line.startsWith("-") && "bg-red-300",
            )}
          >
            {i + 1}: {line}
          </span>
          <br />
        </Fragment>
      ))}
    </pre>
  );
}
