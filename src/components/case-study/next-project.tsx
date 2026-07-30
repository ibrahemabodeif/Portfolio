import Link from "next/link";
import { ArrowRightIcon, ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { projects, projectHref } from "@/lib/site";
import { type CaseStudy } from "@/lib/case-studies";
import { Panel, cardShell } from "@/components/case-study/panel";
import { Button } from "@/components/ui/button";

function ClosingBlock({ data }: { data: CaseStudy["closing"] }) {
  const next = projects.find((project) => project.slug === data.next.slug);

  return (
    <Panel dark={data.dark} className="px-6 py-12 md:px-10 md:py-16">
      <div className="grid items-center gap-10 md:grid-cols-12">
        <div className="md:col-span-6">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {data.heading}
          </h2>
          <p className="mt-5 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
            {data.body}
          </p>
          <Button
            nativeButton={false}
            render={<a href={data.action.href} />}
            className="mt-8 h-11 px-6 text-sm"
          >
            {data.action.label}
            <ArrowUpRightIcon className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
          </Button>
        </div>

        {/* Guarded: if the referenced slug is ever removed from `projects`,
            the block drops rather than rendering a broken card. */}
        {next && (
          <div className="md:col-span-5 md:col-start-8">
            <article
              className={cn(
                cardShell,
                "group relative p-7 transition-colors hover:border-foreground/20"
              )}
            >
              <p className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                {data.nextEyebrow}
              </p>
              <h3 className="mt-3 flex items-center gap-3 text-2xl font-semibold tracking-tight">
                {/* after:inset-0 stretches this link over the whole card while
                    the accessible name stays just the project title. */}
                <Link
                  href={projectHref(next)}
                  className="rounded-sm outline-none after:absolute after:inset-0 focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
                >
                  {next.name}
                </Link>
                <ArrowRightIcon
                  aria-hidden
                  className="size-5 transition-transform duration-200 group-hover:translate-x-1"
                />
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {data.next.blurb}
              </p>
            </article>
          </div>
        )}
      </div>
    </Panel>
  );
}

export { ClosingBlock };
