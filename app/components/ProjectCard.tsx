import Link from "next/link";
import type { Project } from "@/lib/projects";

const STATUS_LABEL: Record<string, string> = {
  wip: "WIP",
  experiment: "Experiment",
};

// A featured-project card for the homepage: screenshot slot, one-line
// description, tech tags, and links (live / store / GitHub).
export function ProjectCard({ project }: { project: Project }) {
  const { links } = project;
  const hasCaseStudy = Boolean(project.caseStudy);

  return (
    <article className="group flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-muted/60">
      {/* Screenshot slot — falls back to a placeholder until you add an image */}
      <div className="aspect-[16/9] w-full overflow-hidden border-b border-border bg-gradient-to-br from-accent/10 to-transparent">
        {project.image ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={project.image}
            alt={project.title}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-xs text-muted">
            {/* Placeholder until a screenshot is added */}
            <span className="font-mono">{project.title}</span>
          </div>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-3 p-5">
        <div className="flex items-center gap-2">
          <h3 className="text-lg font-semibold">
            {hasCaseStudy ? (
              <Link
                href={`/projects/${project.slug}`}
                className="transition-colors hover:text-accent"
              >
                {project.title}
              </Link>
            ) : (
              project.title
            )}
          </h3>
          {project.client && (
            <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted">
              Client work
            </span>
          )}
          {project.status && STATUS_LABEL[project.status] && (
            <span className="rounded border border-accent/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent">
              {STATUS_LABEL[project.status]}
            </span>
          )}
        </div>

        <p className="text-sm leading-relaxed text-muted">{project.tagline}</p>

        <ul className="mt-auto flex flex-wrap gap-1.5 pt-2">
          {project.tech.map((t) => (
            <li
              key={t}
              className="rounded bg-foreground/5 px-2 py-0.5 font-mono text-[11px] text-muted"
            >
              {t}
            </li>
          ))}
        </ul>

        <div className="flex flex-wrap gap-4 pt-1 text-sm">
          {hasCaseStudy && (
            <Link
              href={`/projects/${project.slug}`}
              className="font-medium text-accent hover:underline"
            >
              Case study →
            </Link>
          )}
          {links?.live && (
            <a href={links.live} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
              Live ↗
            </a>
          )}
          {links?.appStore && (
            <a href={links.appStore} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
              App Store ↗
            </a>
          )}
          {links?.playStore && (
            <a href={links.playStore} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
              Play Store ↗
            </a>
          )}
          {links?.github && (
            <a href={links.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
              GitHub ↗
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
