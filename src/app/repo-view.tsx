import { getOctokit } from "@/server/octokit";
import Link from "next/link";
import type { Octokit } from "octokit";

export async function RepoView({
  owner,
  repo,
}: {
  owner: string;
  repo: string;
}) {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos.get({
    owner,
    repo,
  });
  const { data: prs } = await octokit.rest.pulls.list({
    owner,
    repo,
  });

  return (
    <div className="p-4 bg-slate-700 rounded-sm text-slate-50 max-w-lg w-full">
      <h2>{data.name}</h2>
      <ul>
        {prs.map((pull) => (
          <li key={pull.number}>
            <PullRequest pr={pull} />
          </li>
        ))}
      </ul>
    </div>
  );
}

type Pull = Awaited<
  ReturnType<Octokit["rest"]["pulls"]["list"]>
>["data"][number];

function PullRequest({ pr }: { pr: Pull }) {
  return (
    <Link href={pr.html_url} className="p-2 w-full">
      #{pr.number} {pr.title}
    </Link>
  );
}
