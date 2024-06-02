import { PullRequestIcon } from "@/components/pull-request-icon";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  type PullRequest as PullRequestType,
  prStatus,
} from "@/lib/pull-request";
import { getOctokit } from "@/server/octokit";
import Image from "next/image";
import Link from "next/link";

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
    per_page: 5,
    state: "open",
  });

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <a
            href={data.owner.html_url}
            className="flex items-center gap-2 hover:underline"
          >
            <Image
              src={data.owner.avatar_url}
              alt=""
              width={32}
              height={32}
              className="rounded-full border border-slate-300"
            />
            <span>{owner}</span>
          </a>
          <span>/</span>
          <Link href={`/${owner}/${repo}`} className="hover:underline">
            {data.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="px-2">
        <ul className="flex flex-col gap-1">
          {prs.map((pull) => (
            <li key={pull.number}>
              <PullRequest pr={pull} />
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}

function PullRequest({ pr }: { pr: PullRequestType }) {
  return (
    <Link
      href={pr.html_url}
      className="flex w-full items-baseline gap-1 rounded-xl bg-card px-4 py-2 text-card-foreground hover:underline"
    >
      <PullRequestIcon status={prStatus(pr)} />
      <div className="flex flex-col gap-1">
        <span>{pr.title}</span>
        <span className="text-slate-600 text-sm">#{pr.number}</span>
      </div>
    </Link>
  );
}
