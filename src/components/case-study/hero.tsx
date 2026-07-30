import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";

import { site, type Project } from "@/lib/site";
import { type CaseStudy } from "@/lib/case-studies";
import { SectionLabel } from "@/components/section-label";
import { Panel } from "@/components/case-study/panel";
import { Button } from "@/components/ui/button";

function CaseStudyHero({
  project,
  study,
}: {
  project: Project;
  study: CaseStudy;
}) {
  return (
    <Panel>
      <div className="px-6 pt-10 pb-9 md:px-10 md:pt-12 md:pb-11">
        <Link
          href={site.work.allProjects.href}
          className="group inline-flex items-center gap-2 rounded-sm font-mono text-[11px] tracking-[0.18em] text-muted-foreground uppercase outline-none transition-colors hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <ArrowLeftIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-x-0.5" />
          {site.work.allProjects.label}
        </Link>

        <div className="mt-8">
          <SectionLabel>{study.eyebrow}</SectionLabel>
        </div>

        <h1 className="mt-5 text-5xl font-semibold tracking-tighter sm:text-6xl">
          {project.name}
        </h1>

        <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-[17px]">
          {study.intro}
        </p>

        <div className="mt-8 flex flex-wrap items-center gap-3">
          {/* Guarded: the live URL isn't supplied yet, so this renders nothing
              rather than a dead button. */}
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
              className="h-11 px-6 text-sm"
            >
              {study.primaryLabel}
              <ArrowUpRightIcon className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
            </Button>
          )}
          <Button
            variant="outline"
            nativeButton={false}
            render={<a href={study.secondary.href} />}
            className="h-11 px-6 text-sm"
          >
            {study.secondary.label}
          </Button>
        </div>
      </div>

      {/* Bleeds to the panel edge — the panel's overflow-hidden clips it to the
          rounded corners.

          The frame takes the screenshot's own ratio rather than a fixed one:
          the shots range from 1.65:1 to 2.6:1, so any fixed aspect crops some
          of them. At 2:1 this one lost the bottom 18% — the feature strip —
          and the meta bar below read as covering it. */}
      <div
        className="relative w-full border-y border-border bg-secondary/40"
        style={{
          aspectRatio: `${project.imageWidth} / ${project.imageHeight}`,
        }}
      >
        <Image
          src={project.image}
          alt={project.imageAlt}
          fill
          priority
          sizes="(min-width: 1152px) 1152px, 100vw"
          className="object-cover"
        />
      </div>

      {/* gap-px over the border colour draws the rules: the container shows
          through the 1px gaps. Handles 2-up and 4-up identically, with no
          "last cell in the row" special case to get wrong. */}
      <dl className="grid grid-cols-2 gap-px bg-border md:grid-cols-4">
        {study.meta.map((item) => (
          <div key={item.label} className="bg-muted/40 px-6 py-5 md:px-8">
            <dt className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
              {item.label}
            </dt>
            <dd className="mt-2 text-[15px] font-semibold tracking-tight">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </Panel>
  );
}

export { CaseStudyHero };
