import { CodeBlock } from "@/components/code-block";
import { getOctokit } from "@/server/octokit";
import type { Octokit } from "octokit";

interface Props {
  owner: string;
  repo: string;
  file: Awaited<
    ReturnType<Octokit["rest"]["pulls"]["listFiles"]>
  >["data"][number];
}

export async function ChangedFile({ file, owner, repo }: Props) {
  //   const octokit = await getOctokit();
  //   const content = await octokit.rest.git.getBlob({
  //     owner,
  //     repo,
  //     file_sha: file.sha,
  //   });
  //   const decoded = Buffer.from(content.data.content, "base64").toString("utf-8");
  const hunks = file.patch ? parsePatch(file.patch) : [];

  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex w-full justify-between gap-2 text-sm">
        <div className="flex gap-1">
          {file.previous_filename && (
            <>
              <p className="text-slate-600">{file.previous_filename}</p>
              <span className="font-bold">→</span>
            </>
          )}
          <p>{file.filename}</p>
        </div>
        <div className="flex gap-1">
          <span className="text-green-500">+{file.additions}</span>
          <span className="text-red-500">-{file.deletions}</span>
        </div>
      </div>
      <div className="w-full rounded-sm bg-slate-100 p-4">
        <CodeBlock language="typescript">
          {hunks.map((hunk) => hunk.lines.join("\n")).join("\n\n")}
        </CodeBlock>
      </div>
      {/* <div className="w-full rounded-sm bg-slate-100 p-4">
        <CodeBlock language="typescript">{decoded}</CodeBlock>
      </div> */}
    </div>
  );
}

interface Hunk {
  deletionStart: number;
  deletionEnd: number;
  additionStart: number;
  additionEnd: number;
  lines: string[];
}
function parsePatch(patch: string) {
  const lines = patch.split("\n");
  const hunks: Hunk[] = [];

  let currentHunk: Hunk | null = null;

  for (const line of lines) {
    if (line.startsWith("@@")) {
      const [, deletionStart, deletionEnd, additionStart, additionEnd] =
        line.match(/@@ -(\d+),?(\d+) \+(\d+),?(\d+) @@/) ?? [];
      currentHunk = {
        deletionStart: +deletionStart,
        deletionEnd: +deletionEnd,
        additionStart: +additionStart,
        additionEnd: +additionEnd,
        lines: [],
      };
      hunks.push(currentHunk);
    } else if (currentHunk) {
      currentHunk.lines.push(line);
    }
  }

  return hunks;
}
