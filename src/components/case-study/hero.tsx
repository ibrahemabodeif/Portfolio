import Image from "next/image";
import Link from "next/link";
import { ArrowLeftIcon, ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { site, type Project } from "@/lib/site";
import { type CaseStudy } from "@/lib/case-studies";
import { SectionLabel } from "@/components/section-label";
import { Panel } from "@/components/case-study/panel";
import { Button } from "@/components/ui/button";

/** A repo link has to open in a new tab; "/#contact" must not. The same test
 *  drives the ↗ — the arrow means "this leaves the site". */
const isExternal = (href: string) => href.startsWith("http");

/** Written out rather than interpolated, because Tailwind only ships classes it
 *  can see as literal strings. Indexed by how many cells survive the filter, so
 *  a half-filled meta bar still fills its row instead of leaving dead columns. */
const metaCols: Record<number, string> = {
  1: "md:grid-cols-1",
  2: "md:grid-cols-2",
  3: "md:grid-cols-3",
  4: "md:grid-cols-4",
};

function CaseStudyHero({
  project,
  study,
}: {
  project: Project;
  study: CaseStudy;
}) {
  // An action either carries its own href or names a field in site.ts, so a
  // project's URLs are never written twice. Either can be empty — Cradlen has
  // no repo link, Pegasus has no dashboard links yet — and an action that
  // resolves to nothing is dropped rather than rendered as a dead button.
  const actions = study.actions
    .map((action) => ({
      label: action.label,
      href: action.href ?? (action.use ? project[action.use] : ""),
    }))
    .filter((action) => action.href);

  // Cells the owner hasn't filled in drop out rather than showing a
  // placeholder; the bar reflows to whatever is actually known.
  const meta = study.meta.filter((item) => item.value);

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

        {/* Wraps rather than scrolls — Pegasus links four places. */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          {actions.map((action, index) => {
            const external = isExternal(action.href);
            return (
              <Button
                key={action.label}
                // The first action is the one being pushed; the rest support it.
                variant={index === 0 ? "default" : "outline"}
                nativeButton={false}
                render={
                  external ? (
                    <a
                      href={action.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    />
                  ) : (
                    <a href={action.href} />
                  )
                }
                className="h-11 px-6 text-sm"
              >
                {action.label}
                {external && (
                  <ArrowUpRightIcon className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
                )}
              </Button>
            );
          })}
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
      <dl className={cn("grid grid-cols-2 gap-px bg-border", metaCols[meta.length])}>
        {meta.map((item) => (
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
