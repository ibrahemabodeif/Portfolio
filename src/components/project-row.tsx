import Image from "next/image";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { site, type Project } from "@/lib/site";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";

const { liveLabel, caseStudyLabel, repoLabel } = site.projectsPage;

/**
 * One project card on the /projects index.
 *
 * The image bleeds to the card's outer edge and alternates sides down the
 * page — `flip` comes from the row's index, so the rhythm holds however many
 * projects are added.
 *
 * Every link is guarded rather than defaulted: a project with no `liveUrl`,
 * `repoUrl` or built case study renders without those buttons instead of
 * pointing at a route that doesn't exist.
 */
function ProjectRow({ project, flip }: { project: Project; flip: boolean }) {
  const hasActions = Boolean(
    project.liveUrl || project.caseStudy || project.repoUrl
  );

  return (
    <article className="grid overflow-hidden rounded-xl border border-border bg-card md:grid-cols-12">
      <div
        className={cn(
          "relative min-h-56 sm:min-h-72 md:col-span-7 md:min-h-full",
          // Order only matters once the two sit side by side; stacked on
          // mobile the image always leads.
          flip && "md:order-2"
        )}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          sizes="(min-width: 768px) 58vw, 100vw"
          className="object-cover object-top"
        />
      </div>

      <div
        className={cn(
          "flex flex-col justify-center p-7 md:col-span-5 md:p-9",
          flip && "md:order-1"
        )}
      >
        <SectionLabel>{project.category}</SectionLabel>

        <h2 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
          {project.name}
        </h2>

        <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
          {/* Falls back down the three lengths while a fuller write-up is
              still to be written. */}
          {project.overview || project.summary || project.tagline}
        </p>

        {project.stack.length > 0 && (
          <ul className="mt-6 flex flex-wrap gap-2">
            {project.stack.map((tech) => (
              <li
                key={tech}
                className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
              >
                {tech}
              </li>
            ))}
          </ul>
        )}

        {hasActions && (
          <div className="mt-7 flex flex-wrap items-center gap-3">
            {project.liveUrl && (
              <Button
                nativeButton={false}
                render={
                  <a
                    href={project.liveUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="h-10 px-5 text-sm"
              >
                {liveLabel}
                <ArrowUpRightIcon className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
              </Button>
            )}

            {project.caseStudy && (
              <Button
                variant="outline"
                nativeButton={false}
                render={<a href={`/projects/${project.slug}`} />}
                className="h-10 px-5 text-sm"
              >
                {caseStudyLabel}
                <ArrowRightIcon className="transition-transform duration-200 group-hover/button:translate-x-1" />
              </Button>
            )}

            {project.repoUrl && (
              <Button
                variant="outline"
                nativeButton={false}
                render={
                  <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                  />
                }
                className="h-10 px-5 text-sm"
              >
                {repoLabel}
              </Button>
            )}
          </div>
        )}
      </div>
    </article>
  );
}

export { ProjectRow };
