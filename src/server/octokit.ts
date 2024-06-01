import { auth, clerkClient } from "@clerk/nextjs/server";
import { Octokit } from "octokit";

let octokit: Octokit | null = null;

export async function getOctokit() {
  if (octokit) {
    return octokit;
  }

  const { userId } = auth();

  if (!userId) {
    throw new Error("No user id");
  }

  const clerkResponse = await clerkClient.users.getUserOauthAccessToken(
    userId,
    "oauth_github",
  );

  const accessToken = clerkResponse.data[0].token;
  octokit = new Octokit({ auth: accessToken });

  return octokit;
}
