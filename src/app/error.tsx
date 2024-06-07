"use client";

import { Button } from "@/components/ui/button";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex h-screen flex-col items-center justify-center">
      <h1 className="font-bold text-4xl">Oh, no!</h1>
      <p>Something went wrong.</p>
      <pre>{error.message}</pre>
      <p className="text-sm">{error.digest}</p>
      <Button onClick={reset}>Try again...</Button>
    </div>
  );
}
