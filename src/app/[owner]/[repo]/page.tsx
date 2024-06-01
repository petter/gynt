import { getOctokit } from "@/server/octokit";
import { notFound } from "next/navigation";

export default async function RepoPage({
  params,
}: {
  params: { owner: string; repo: string };
}) {
  const octokit = await getOctokit();
  const page = 0;
  const { data } = await octokit.rest.repos
    .get({
      owner: params.owner,
      repo: params.repo,
    })
    .catch(() => notFound());

  const { data: pulls, headers } = await octokit.rest.pulls.list({
    owner: params.owner,
    repo: params.repo,
    state: "open",
    page,
    per_page: 100,
  });

  const linkHeader = parseLinkHeader(headers.link);

  return (
    <div className="flex flex-col gap-4">
      <h1 className="font-bold text-4xl">{data.name}</h1>
      <p>
        Page {page + 1} / {(linkHeader?.lastPage ?? 0) + 1}
      </p>
      <ul>
        {pulls.map((pull) => (
          <li key={pull.number}>
            #{pull.number} {pull.title}
          </li>
        ))}
      </ul>
    </div>
  );
}

function parseLinkHeader(header: string | undefined) {
  if (!isLinkHeader(header)) {
    return undefined;
  }

  const linkPattern = /<([^>]+)>;\s*rel="([^"]+)"/g;
  const links: { [key: string]: string } = {};
  let match: RegExpExecArray | null = null;

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while ((match = linkPattern.exec(header)) !== null) {
    const url = match[1];
    const rel = match[2];
    if (rel === "next" || rel === "last") {
      links[rel] = url;
    }
  }
  const lastEqualsNext = links.next.lastIndexOf("=");
  const lastEqualsLast = links.next.lastIndexOf("=");
  const nextPage = +links.next.substring(lastEqualsNext + 1);
  const lastPage = +links.next.substring(lastEqualsLast + 1);
  return { ...(links as { next: string; last: string }), nextPage, lastPage };
}

function isLinkHeader(header: string | undefined): header is string {
  return header?.includes('rel="next"') ?? false;
}
