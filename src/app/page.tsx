import { getOctokit } from "@/server/octokit";
import { RepoView } from "./repo-view";

export default async function Home() {
  const octokit = await getOctokit();
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  return (
    <main className="mx-auto flex min-h-screen w-full max-w-7xl flex-col items-center gap-4 p-4">
      <h1 className="font-bold text-4xl">Hi, {login}!</h1>
      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 sm:grid-cols-2">
        <RepoView owner="petter" repo="pmoen.me" />
        <RepoView owner="domstolene" repo="designsystem" />
      </div>
    </main>
  );
}
