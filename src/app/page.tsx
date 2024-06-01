import { getOctokit } from "@/server/octokit";
import { RepoView } from "./repo-view";

export default async function Home() {
  const octokit = await getOctokit();
  const {
    data: { login },
  } = await octokit.rest.users.getAuthenticated();

  return (
    <main className="flex min-h-screen flex-col items-center p-24">
      <h1 className="font-bold text-4xl">Hi, {login}!</h1>
      <RepoView owner="petter" repo="pmoen.me" />
    </main>
  );
}
