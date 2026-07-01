import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { getProject, projectsWithCaseStudies } from "@/lib/projects";

// Pre-render a static page for every project that has a case study.
export function generateStaticParams() {
  return projectsWithCaseStudies.map((p) => ({ slug: p.slug }));
}

// Next 16: `params` is a Promise and must be awaited.
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project) return {};
  return { title: project.title, description: project.tagline };
}

export default async function ProjectPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = getProject(slug);
  if (!project || !project.caseStudy) notFound();

  const { caseStudy, links } = project;

  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-2xl flex-1 px-6 py-16">
        <Link href="/archive" className="text-sm text-muted hover:text-foreground">
          ← All projects
        </Link>

        <header className="mt-6">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded border border-border px-1.5 py-0.5 text-[11px] uppercase tracking-wide text-muted">
              {project.type}
            </span>
            <span className="font-mono text-sm text-muted">{project.year}</span>
            {project.client && (
              <span className="rounded border border-border px-1.5 py-0.5 text-[11px] uppercase tracking-wide text-muted">
                Client work
              </span>
            )}
          </div>
          <h1 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            {project.title}
          </h1>
          <p className="mt-3 text-lg text-muted">{project.tagline}</p>

          {/* links */}
          <div className="mt-5 flex flex-wrap gap-4 text-sm">
            {links?.live && (
              <a href={links.live} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                Live ↗
              </a>
            )}
            {links?.appStore && (
              <a href={links.appStore} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                App Store ↗
              </a>
            )}
            {links?.playStore && (
              <a href={links.playStore} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                Play Store ↗
              </a>
            )}
            {links?.github && (
              <a href={links.github} target="_blank" rel="noopener noreferrer" className="font-medium text-accent hover:underline">
                GitHub ↗
              </a>
            )}
          </div>
        </header>

        {/* screenshot slot */}
        {project.image && (
          <div className="mt-8 overflow-hidden rounded-xl border border-border">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src={project.image} alt={project.title} className="w-full" />
          </div>
        )}

        {/* tech */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            Stack
          </h2>
          <ul className="mt-3 flex flex-wrap gap-2">
            {project.tech.map((t) => (
              <li
                key={t}
                className="rounded bg-foreground/5 px-2.5 py-1 font-mono text-xs text-muted"
              >
                {t}
              </li>
            ))}
          </ul>
        </section>

        {/* problem */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            The problem
          </h2>
          <p className="mt-3 leading-relaxed text-foreground/90">
            {caseStudy.problem}
          </p>
        </section>

        {/* what I built */}
        <section className="mt-10">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
            What I built
          </h2>
          <ul className="mt-3 space-y-2">
            {caseStudy.build.map((point, i) => (
              <li key={i} className="flex gap-3 leading-relaxed text-foreground/90">
                <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" />
                <span>{point}</span>
              </li>
            ))}
          </ul>
        </section>

        {/* results */}
        {caseStudy.results && (
          <section className="mt-10">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Results
            </h2>
            <p className="mt-3 leading-relaxed text-foreground/90">
              {caseStudy.results}
            </p>
          </section>
        )}

        <div className="mt-14 border-t border-border pt-8">
          <Link href="/#work" className="text-sm text-accent hover:underline">
            ← Back to work
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
