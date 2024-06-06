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
  const octokit = await getOctokit();
  const content = await octokit.rest.git.getBlob({
    owner,
    repo,
    file_sha: file.sha,
  });

  // base64 decode
  const decoded = Buffer.from(content.data.content, "base64").toString("utf-8");
  return (
    <div className="flex flex-col items-start gap-1">
      <div className="flex gap-1 text-sm">
        {file.previous_filename && (
          <>
            <p className="text-slate-600">{file.previous_filename}</p>
            <span className="font-bold">→</span>
          </>
        )}
        <p>{file.filename}</p>
      </div>
      <div className="w-full rounded-sm bg-slate-100 p-4">
        <CodeBlock language={"typescript"}>{decoded}</CodeBlock>
      </div>
    </div>
  );
}
