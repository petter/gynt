import type { PullRequestStatus } from "@/lib/pull-request";
import { PullRequestIcon } from "./icon";

export function PullRequestBadge({ status }: { status: PullRequestStatus }) {
  return (
    <div className="flex w-max items-center gap-1 rounded-full bg-slate-900 px-2 py-1 font-semibold text-white text-xs">
      <PullRequestIcon status={status} className="text-white" />
      <span className="capitalize">{status}</span>
    </div>
  );
}
