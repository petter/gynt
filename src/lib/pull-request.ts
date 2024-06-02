import type { Octokit } from "octokit";

export type PullRequest = Awaited<
  ReturnType<Octokit["rest"]["pulls"]["list"]>
>["data"][number];

export type PullRequestStatus = "open" | "closed" | "draft" | "merged";

export function prStatus(pr: {
  draft?: boolean;
  state: string;
  merged_at: string | null;
}): PullRequestStatus {
  if (pr.draft) {
    return "draft";
  }
  if (pr.state === "open") {
    return "open";
  }
  if (pr.merged_at !== null) {
    return "merged";
  }
  if (pr.state === "closed") {
    return "closed";
  }

  throw new Error("Unknown pull request state");
}
