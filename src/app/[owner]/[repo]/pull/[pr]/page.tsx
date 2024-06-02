import { PullRequestBadge } from "@/components/pull-request/badge";
import { prStatus } from "@/lib/pull-request";
import { getOctokit } from "@/server/octokit";
import { notFound } from "next/navigation";

interface Props {
  params: { owner: string; repo: string; pr: string };
}

export default async function PullPage({ params }: Props) {
  const octokit = await getOctokit();
  const prNum = +params.pr;
  if (Number.isNaN(prNum)) {
    notFound();
  }

  const { data: pr } = await octokit.rest.pulls.get({
    owner: params.owner,
    repo: params.repo,
    pull_number: prNum,
  });

  return (
    <div className="flex flex-col gap-4">
      <h1 className="text-3xl">
        {pr.title} <span className="text-slate-500">#{pr.number}</span>
      </h1>
      <PullRequestBadge status={prStatus(pr)} />
      <p>{pr.body}</p>
    </div>
  );
}
