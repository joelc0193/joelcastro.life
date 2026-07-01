"use client";

import { useState } from "react";
import Link from "next/link";
import type { Project } from "@/lib/projects";

const STATUS_LABEL: Record<string, string> = {
  wip: "WIP",
  experiment: "Experiment",
};

// Tagged/filterable archive so many projects stay scannable (research: a
// table/grid with filters lets the archive hold 30+ items without clutter).
export function ArchiveList({
  projects,
  types,
}: {
  projects: Project[];
  types: string[];
}) {
  const [filter, setFilter] = useState<string>("All");
  const filters = ["All", ...types];
  const shown =
    filter === "All" ? projects : projects.filter((p) => p.type === filter);

  return (
    <div>
      {/* filter chips */}
      <div className="mb-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`rounded-full border px-3 py-1 text-sm transition-colors ${
              filter === f
                ? "border-accent bg-accent text-accent-fg"
                : "border-border text-muted hover:text-foreground"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* rows */}
      <ul className="divide-y divide-border border-y border-border">
        {shown.map((p) => {
          const hasCaseStudy = Boolean(p.caseStudy);
          const RowInner = (
            <div className="flex flex-col gap-1 py-4 sm:flex-row sm:items-baseline sm:gap-4">
              <span className="w-12 shrink-0 font-mono text-sm text-muted">
                {p.year}
              </span>
              <div className="flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-medium">{p.title}</span>
                  <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                    {p.type}
                  </span>
                  {p.client && (
                    <span className="rounded border border-border px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-muted">
                      Client
                    </span>
                  )}
                  {p.status && STATUS_LABEL[p.status] && (
                    <span className="rounded border border-accent/40 px-1.5 py-0.5 text-[10px] uppercase tracking-wide text-accent">
                      {STATUS_LABEL[p.status]}
                    </span>
                  )}
                </div>
                <p className="mt-1 text-sm text-muted">{p.tagline}</p>
              </div>
              <div className="flex shrink-0 flex-wrap gap-3 text-sm">
                {hasCaseStudy && (
                  <Link
                    href={`/projects/${p.slug}`}
                    className="text-accent hover:underline"
                  >
                    Case study →
                  </Link>
                )}
                {p.links?.live && (
                  <a href={p.links.live} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
                    Live ↗
                  </a>
                )}
                {p.links?.github && (
                  <a href={p.links.github} target="_blank" rel="noopener noreferrer" className="text-muted hover:text-foreground">
                    GitHub ↗
                  </a>
                )}
              </div>
            </div>
          );
          return <li key={p.slug}>{RowInner}</li>;
        })}
      </ul>
    </div>
  );
}
