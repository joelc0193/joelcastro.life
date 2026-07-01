import Link from "next/link";
import { site } from "@/lib/site";
import { ThemeToggle } from "./ThemeToggle";

// Sticky, minimal nav — 4 items (research: "max 7" is a myth; sticky aids
// discoverability). Name on the left (F-pattern), links on the right.
export function Nav() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/80 backdrop-blur">
      <nav className="mx-auto flex max-w-3xl items-center justify-between px-6 py-4">
        <Link href="/" className="font-mono text-sm font-semibold tracking-tight">
          {site.name}
        </Link>
        <div className="flex items-center gap-5 text-sm text-muted">
          <Link href="/#work" className="transition-colors hover:text-foreground">
            Work
          </Link>
          <Link href="/archive" className="transition-colors hover:text-foreground">
            Archive
          </Link>
          <Link href="/#about" className="transition-colors hover:text-foreground">
            About
          </Link>
          <a
            href={`mailto:${site.email}`}
            className="rounded-md bg-accent px-3 py-1.5 font-medium text-accent-fg transition-opacity hover:opacity-90"
          >
            Email
          </a>
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}
