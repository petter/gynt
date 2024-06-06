import { Markdown } from "@/components/markdown";
import { PullRequestBadge } from "@/components/pull-request/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { prStatus } from "@/lib/pull-request";
import { cn } from "@/lib/utils";
import { getOctokit } from "@/server/octokit";
import { notFound } from "next/navigation";

interface Props {
  params: { owner: string; repo: string; pr: string };
}

export default async function PullPage({ params }: Props) {
  async function lgtm() {
    "use server";
    const octokit = await getOctokit();
    await octokit.rest.pulls.createReview({
      owner: params.owner,
      repo: params.repo,
      pull_number: +params.pr,
      event: "APPROVE",
      body: 'LGTM! 🚀\n\n*Looks good with <a href="https://gynt.app/">gynt</a>* 😎',
    });
  }
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

  const commonParams = {
    owner: params.owner,
    repo: params.repo,
    pull_number: prNum,
  };
  const [{ data: user }, { data: pr }, { data: files }, { data: reviews }] =
    await Promise.all([
      octokit.rest.users.getAuthenticated(),
      octokit.rest.pulls.get(commonParams).catch(() => notFound()),
      octokit.rest.pulls.listFiles(commonParams).catch(() => notFound()),
      octokit.rest.pulls.listReviews(commonParams).catch(() => notFound()),
    ]);

  const isMyPr = pr.user.login === user.login;

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">
        {pr.title}{" "}
        <a href={pr.html_url} className="text-slate-500 hover:underline">
          #{pr.number}
        </a>
      </h1>
      <p>
        Opened by{" "}
        <a href={pr.user.html_url} className="text-slate-500 hover:underline">
          {pr.user.login}
        </a>{" "}
        at {pr.created_at}
      </p>
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
      <form action={lgtm}>
        <button
          type="submit"
          disabled={isMyPr}
          className={cn(
            "rounded-lg bg-green-500 px-4 py-2 font-bold text-white",
            !isMyPr && "hover:bg-green-600",
            isMyPr && "cursor-not-allowed opacity-50",
          )}
        >
          LGTM! :)
        </button>
      </form>
      <div>
        <h2 className="text-2xl">Files changed</h2>
        {files.map((file) => (
          <div key={file.filename} className="flex items-center gap-1 text-sm">
            <span className="text-slate-500">{file.status}</span>
            <span>{file.filename}</span>
            <span className="text-green-500">+{file.additions}</span>
            <span className="text-red-500">+{file.deletions}</span>
          </div>
        ))}
      </div>

      <div className="flex flex-col gap-4">
        <h2 className="text-2xl">Reviews</h2>
        {reviews.map((review) => (
          <div
            key={review.id}
            className="flex flex-col items-start gap-1 text-sm"
          >
            <span className="text-slate-500">{review.state}</span>
            <span>{review.user?.login}</span>
            <span>{review.submitted_at}</span>
            <Markdown>{review.body}</Markdown>
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
