import type { PullRequestStatus } from "@/lib/pull-request";
import { cn } from "@/lib/utils";
import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
} from "@primer/octicons-react";

interface Props {
  status: PullRequestStatus;
  className?: string;
}

export function PullRequestIcon({ status, className }: Props) {
  if (status === "open") {
    return <GitPullRequestIcon className={cn("text-green-600", className)} />;
  }
  if (status === "closed") {
    return (
      <GitPullRequestClosedIcon className={cn("text-red-600", className)} />
    );
  }
  if (status === "draft") {
    return (
      <GitPullRequestDraftIcon className={cn("text-slate-600", className)} />
    );
  }
  if (status === "merged") {
    return <GitMergeIcon className={cn("text-purple-600", className)} />;
  }
}
