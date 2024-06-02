import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";
import Link from "next/link";
import type { Octokit } from "octokit";

type PullRequest = Awaited<
  ReturnType<Octokit["rest"]["pulls"]["list"]>
>["data"][number];

interface Props {
  pr: PullRequest;
}

export function PullRequestLink({ pr }: Props) {
  return (
    <Link
      href={pr.html_url}
      className="flex w-full items-baseline gap-2 rounded-xl border bg-card p-4 text-card-foreground shadow"
    >
      <PullRequestIcon status={prStatus(pr)} />
      <div className="flex flex-col gap-1">
        <span> {pr.title}</span>
        <span className="text-slate-600 text-sm">#{pr.number}</span>
      </div>
    </Link>
  );
}

function prStatus(pr: PullRequest): "open" | "closed" | "draft" | "merged" {
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

function PullRequestIcon({
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
