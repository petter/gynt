import { MarkGithubIcon } from "@primer/octicons-react";

export function Footer() {
  return (
    <footer className="mt-8 flex flex-col items-center gap-8 bg-slate-100 px-4 py-8 text-slate-400 text-sm">
      <p>
        Made with ❤️ by{" "}
        <a
          href="https://twitter.com/pettsmoen"
          className="underline transition-colors hover:text-blue-500"
        >
          @pettersmoen
        </a>
      </p>
      <a
        href="https://github.com/petter/gynt"
        className="w-min transition-colors hover:text-blue-500"
      >
        <MarkGithubIcon size="medium" />
      </a>
    </footer>
  );
}
