import type { Metadata } from "next";
import { Nav } from "@/app/components/Nav";
import { Footer } from "@/app/components/Footer";
import { ArchiveList } from "./ArchiveList";
import { projects, projectTypes } from "@/lib/projects";

export const metadata: Metadata = {
  title: "Project Archive",
  description: "Everything I've built — apps, AI agents, tools, and experiments.",
};

// Sort newest-first for the archive.
const sorted = [...projects].sort((a, b) => b.year - a.year);

export default function ArchivePage() {
  return (
    <>
      <Nav />
      <main className="mx-auto w-full max-w-3xl flex-1 px-6 py-16">
        <h1 className="text-3xl font-bold tracking-tight">Project Archive</h1>
        <p className="mt-3 max-w-xl text-muted">
          Everything I&apos;ve built — shipped apps, client work, AI agents, and
          half-finished experiments. Filter by type below.
        </p>
        <div className="mt-10">
          <ArchiveList projects={sorted} types={[...projectTypes]} />
        </div>
      </main>
      <Footer />
    </>
  );
}
