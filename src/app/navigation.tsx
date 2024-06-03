import { UserButton } from "@clerk/nextjs";
import Link from "next/link";

export function Navigation() {
  return (
    <nav className="sticky top-0 flex items-center justify-between border-b bg-slate-100 p-4">
      <Link href="/" className="text-xl transition-colors hover:text-blue-600">
        gynt
      </Link>
      <UserButton />
    </nav>
  );
}
