import { Markdown } from "@/components/markdown";
import { PullRequestBadge } from "@/components/pull-request/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { prStatus } from "@/lib/pull-request";
import { getOctokit } from "@/server/octokit";
import { notFound } from "next/navigation";

interface Props {
  params: { owner: string; repo: string; pr: string };
}

export default async function PullPage({ params }: Props) {
  async function addComment(formData: FormData) {
    "use server";
    const octokit = await getOctokit();
    const comment = formData.get("comment");
    if (!comment || typeof comment !== "string") {
      return;
    }
    try {
      const { data } = await octokit.request(
        "POST /repos/{owner}/{repo}/pulls/{pull_number}/reviews",
        {
          owner: params.owner,
          repo: params.repo,
          pull_number: +params.pr,
          body: comment,
          event: "COMMENT",
        },
      );
      return data;
    } catch (e) {
      console.log(e);
    }
  }

  const prNum = +params.pr;
  if (Number.isNaN(prNum)) {
    notFound();
  }

  const octokit = await getOctokit();
  const { data: pr } = await octokit.rest.pulls.get({
    owner: params.owner,
    repo: params.repo,
    pull_number: prNum,
  });

  const files = await octokit.rest.pulls.listFiles({
    owner: params.owner,
    repo: params.repo,
    pull_number: prNum,
  });
  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">
        {pr.title}{" "}
        <a href={pr.html_url} className="text-slate-500 hover:underline">
          #{pr.number}
        </a>
      </h1>
      <div className="flex items-center justify-between gap-2">
        <PullRequestBadge status={prStatus(pr)} />
        <div className="flex gap-2 text-sm">
          <p>{pr.changed_files} files changed</p>
          <p className="text-green-500">+{pr.additions}</p>
          <p className="text-red-500">-{pr.deletions}</p>
        </div>
      </div>
      <div className="h-96 overflow-y-scroll rounded-xl border p-4 shadow">
        <Markdown>{pr.body}</Markdown>
      </div>
      <div>
        <h2 className="text-2xl">Files changed</h2>
        {files.data.map((file) => (
          <div key={file.filename} className="flex items-center gap-1 text-sm">
            <span className="text-slate-500">{file.status}</span>
            <span>{file.filename}</span>
            <span className="text-green-500">+{file.additions}</span>
            <span className="text-red-500">+{file.deletions}</span>
          </div>
        ))}
      </div>
      <form action={addComment} className="flex flex-col items-start gap-2">
        <Textarea name="comment" />
        <Button type="submit">Comment</Button>
      </form>
    </div>
  );
}
