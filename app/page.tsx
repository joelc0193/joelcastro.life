import Link from "next/link";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ProjectCard } from "@/app/components/ProjectCard";
import { featuredProjects } from "@/lib/projects";
import { site, socialLinks } from "@/lib/site";

const LABELS: Record<string, string> = {
  github: "GitHub",
  upwork: "Upwork",
  linkedin: "LinkedIn",
  x: "X",
};

export default function Home() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6">
        {/* ===== HERO (top band = ~42% of attention; name + value prop + CTA) ===== */}
        <section className="py-20 sm:py-28">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            {site.name}
          </h1>
          <p className="mt-4 max-w-xl text-xl text-foreground sm:text-2xl">
            {site.tagline}
          </p>
          <p className="mt-4 max-w-xl leading-relaxed text-muted">
            {site.subtitle}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4 text-sm">
            <a
              href={`mailto:${site.email}`}
              className="rounded-md bg-accent px-4 py-2 font-medium text-accent-fg transition-opacity hover:opacity-90"
            >
              Email me
            </a>
            {socialLinks.map(({ key, url }) => (
              <a
                key={key}
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted transition-colors hover:text-foreground"
              >
                {LABELS[key] ?? key} ↗
              </a>
            ))}
          </div>
        </section>

        {/* ===== FEATURED WORK (3–6 curated projects) ===== */}
        <section id="work" className="scroll-mt-20 border-t border-border py-16">
          <div className="mb-8 flex items-baseline justify-between">
            <h2 className="text-sm font-semibold uppercase tracking-widest text-muted">
              Featured work
            </h2>
            <Link href="/archive" className="text-sm text-accent hover:underline">
              View full archive →
            </Link>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {featuredProjects.map((project) => (
              <ProjectCard key={project.slug} project={project} />
            ))}
          </div>
        </section>

        {/* ===== ABOUT (short, scannable — not a wall of text) ===== */}
        <section id="about" className="scroll-mt-20 border-t border-border py-16">
          <h2 className="mb-6 text-sm font-semibold uppercase tracking-widest text-muted">
            About
          </h2>
          <div className="max-w-xl space-y-4 leading-relaxed text-foreground/90">
            {site.about.map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
          <p className="mt-6 text-sm text-muted">
            Want to work together?{" "}
            <a href={`mailto:${site.email}`} className="text-accent hover:underline">
              Get in touch
            </a>
            .
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}
