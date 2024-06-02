import { parseLinkHeader } from "@/lib/octokit";
import { getOctokit } from "@/server/octokit";
import { PullRequestLink } from "./pull-request-link";

interface Props {
  owner: string;
  repo: string;
}

export async function PullRequests({ owner, repo }: Props) {
  const page = 0;
  const octokit = await getOctokit();
  const { data: pulls, headers } = await octokit.rest.pulls.list({
    owner,
    repo,
    state: "open",
    page,
    per_page: 100,
  });

  const linkHeader = parseLinkHeader(headers.link);

  return (
    <div>
      <ul className="flex flex-col gap-2">
        {pulls.map((pull) => (
          <li key={pull.number} className="flex">
            <PullRequestLink pr={pull} />
          </li>
        ))}
      </ul>
      <p>
        Page {page + 1} / {(linkHeader?.lastPage ?? 0) + 1}
      </p>
    </div>
  );
}
