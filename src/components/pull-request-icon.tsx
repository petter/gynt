import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";

export function PullRequestIcon({
  status,
}: {
  status: "open" | "closed" | "draft" | "merged";
}) {
  if (status === "open") {
    return <GitPullRequestIcon className="text-green-600" />;
  }
  if (status === "closed") {
    return <GitPullRequestClosedIcon className="text-red-600" />;
  }
  if (status === "draft") {
    return <GitPullRequestDraftIcon className="text-slate-600" />;
  }
  if (status === "merged") {
    return <GitMergeIcon className="text-purple-600" />;
  }
}
