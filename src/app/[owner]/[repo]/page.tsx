import { notFound } from "next/navigation";

import { getOctokit } from "@/server/octokit";
import { PullRequests } from "./pull-requests";

export default async function RepoPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos
    .get({
      owner: params.owner,
      repo: params.repo,
    })
    .catch(() => notFound());

  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4">
      <h1 className="font-bold text-4xl">{data.name}</h1>
      <PullRequests owner={params.owner} repo={params.repo} />
    </div>
  );
}
