import { site, socialLinks } from "@/lib/site";

const LABELS: Record<string, string> = {
  github: "GitHub",
  upwork: "Upwork",
  linkedin: "LinkedIn",
  x: "X",
};

export function Footer() {
  return (
    <footer className="mt-auto border-t border-border/70">
      <div className="mx-auto flex max-w-3xl flex-col gap-4 px-6 py-10 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
        <p>
          © {new Date().getFullYear()} {site.name}
        </p>
        <div className="flex flex-wrap items-center gap-5">
          <a
            href={`mailto:${site.email}`}
            className="transition-colors hover:text-foreground"
          >
            Email
          </a>
          {socialLinks.map(({ key, url }) => (
            <a
              key={key}
              href={url}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-colors hover:text-foreground"
            >
              {LABELS[key] ?? key}
            </a>
          ))}
        </div>
      </div>
    </footer>
  );
}
