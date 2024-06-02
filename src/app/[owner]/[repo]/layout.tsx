import { getOctokit } from "@/server/octokit";
import Link from "next/link";
import { notFound } from "next/navigation";

interface Props {
  children: React.ReactNode;
  params: { owner: string; repo: string };
}
export default async function RepoLayout({ children, params }: Props) {
  const octokit = await getOctokit();
  const { data } = await octokit.rest.repos
    .get({
      owner: params.owner,
      repo: params.repo,
    })
    .catch(() => notFound());
  return (
    <div className="mx-auto flex max-w-6xl flex-col gap-4 p-4">
      <div className="flex items-center gap-2">
        <a href={data.owner.html_url} className="hover:underline">
          {data.owner.login}
        </a>
        <span>/</span>
        <Link
          href={`/${params.owner}/${params.repo}`}
          className="hover:underline"
        >
          {data.name}
        </Link>
      </div>
      {children}
    </div>
  );
}
