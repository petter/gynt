export function parseLinkHeader(header: string | undefined) {
  if (!isLinkHeader(header)) {
    return undefined;
  }

  const linkPattern = /<([^>]+)>;\s*rel="([^"]+)"/g;
  const links: { [key: string]: string } = {};
  let match: RegExpExecArray | null = null;

  // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
  while ((match = linkPattern.exec(header)) !== null) {
    const url = match[1];
    const rel = match[2];
    if (rel === "next" || rel === "last") {
      links[rel] = url;
    }
  }
  const lastEqualsNext = links.next.lastIndexOf("=");
  const lastEqualsLast = links.next.lastIndexOf("=");
  const nextPage = +links.next.substring(lastEqualsNext + 1);
  const lastPage = +links.next.substring(lastEqualsLast + 1);
  return { ...(links as { next: string; last: string }), nextPage, lastPage };
}

function isLinkHeader(header: string | undefined): header is string {
  return header?.includes('rel="next"') ?? false;
}
