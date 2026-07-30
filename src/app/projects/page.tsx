import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";

import { site, projects } from "@/lib/site";
import { SectionLabel } from "@/components/section-label";
import { ProjectRow } from "@/components/project-row";
import { Button } from "@/components/ui/button";

const { label, heading, lead, cta } = site.projectsPage;

export const metadata: Metadata = {
  title: `Projects — ${site.footer.owner}`,
  description: lead,
};

export default function ProjectsPage() {
  return (
    <>
      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
        <div className="reveal grid items-end gap-6 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel>{label}</SectionLabel>
            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {heading}
            </h1>
          </div>
          <p className="text-sm leading-relaxed text-pretty text-muted-foreground md:col-span-4 md:col-start-9">
            {lead}
          </p>
        </div>

        <ul className="mt-12 flex flex-col gap-4 md:mt-16">
          {projects.map((project, index) => (
            <li key={project.slug} className="reveal">
              {/* Odd rows mirror, so the image alternates sides down the page. */}
              <ProjectRow project={project} flip={index % 2 === 1} />
            </li>
          ))}
        </ul>
      </div>

      {/* Full-bleed, like #contact on the home page, so it runs continuously
          into the dark footer instead of leaving a seam between two panels. */}
      <section className="dark bg-background text-foreground">
        <div className="reveal mx-auto w-full max-w-6xl px-6 py-16 text-center md:px-8 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {cta.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
            {cta.note}
          </p>
          <Button
            nativeButton={false}
            render={<a href={cta.action.href} />}
            className="mt-8 h-11 px-6 text-sm"
          >
            {cta.action.label}
            <ArrowUpRightIcon className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </section>
    </>
  );
}
