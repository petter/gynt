import { PullRequestIcon } from "@/components/pull-request-icon";
import { type PullRequest, prStatus } from "@/lib/pull-request";
import Link from "next/link";

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
