import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { getOctokit } from "@/server/octokit";
import Image from "next/image";
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
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <a href={data.owner.html_url}>
            <Image
              src={data.owner.avatar_url}
              alt=""
              width={32}
              height={32}
              className="rounded-full border border-slate-300"
            />
          </a>
          <a href={data.owner.html_url} className="hover:underline">
            {owner}
          </a>{" "}
          <span>/</span>
          <Link href={`/${owner}/${repo}`} className="hover:underline">
            {data.name}
          </Link>
        </CardTitle>
      </CardHeader>
      <CardContent className="p-4">
        <ul>
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

type Pull = Awaited<
  ReturnType<Octokit["rest"]["pulls"]["list"]>
>["data"][number];

function PullRequest({ pr }: { pr: Pull }) {
  return (
    <Link href={pr.html_url} className="w-full p-2 hover:underline">
      #{pr.number} {pr.title}
    </Link>
  );
}
