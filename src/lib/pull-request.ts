import type { Octokit } from "octokit";

export type PullRequest = Awaited<
  ReturnType<Octokit["rest"]["pulls"]["list"]>
>["data"][number];

export function prStatus(
  pr: PullRequest,
): "open" | "closed" | "draft" | "merged" {
  if (pr.draft === true) {
    return "draft";
  }
  if (pr.state === "open") {
    return "open";
  }
  if (pr.merged_at !== null) {
    return "merged";
  }
  return "closed";
}
