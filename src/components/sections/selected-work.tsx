import Image from "next/image";
import Link from "next/link";
import { ArrowUpRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { site, featuredProject, otherProjects, projectHref } from "@/lib/site";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";

const { label, heading, allProjects, featuredPrefix, cta } = site.work;

const cardShell =
  "group relative flex flex-col overflow-hidden rounded-xl border border-border bg-card transition-colors hover:border-foreground/20 focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-2 focus-within:ring-offset-background";

const imageFrame =
  "relative overflow-hidden border-b border-border bg-secondary/40";

// `after:inset-0` stretches this single link across the whole card, so the
// card is clickable while the accessible name stays just the project title.
const cardLink = "rounded-sm outline-none after:absolute after:inset-0";

const zoom =
  "object-cover object-top transition-transform duration-500 group-hover:scale-[1.02]";

function SelectedWork() {
  return (
    <section id="work" className="mt-3 scroll-mt-24 md:mt-4 mx-3 md:mx-4">
      <div className="reveal mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
        <SectionLabel>{label}</SectionLabel>

        <div className="mt-6 grid items-end gap-6 md:grid-cols-12">
          <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:col-span-8">
            {heading}
          </h2>
          <div className="md:col-span-4 md:justify-self-end">
            <Link
              href={allProjects.href}
              className="group inline-flex items-center gap-1.5 rounded-sm border-b border-foreground/30 pb-1 text-sm font-medium outline-none transition-colors hover:border-foreground focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {allProjects.label}
              <ArrowUpRightIcon className="size-3.5 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
            </Link>
          </div>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          <article className={cn(cardShell, "md:col-span-2")}>
            <div className={cn(imageFrame, "aspect-2/1")}>
              <Image
                src={featuredProject.image}
                alt={featuredProject.imageAlt}
                fill
                sizes="(min-width: 768px) 66vw, 100vw"
                className={zoom}
              />
            </div>
            <div className="p-7 md:p-8">
              <SectionLabel>
                {featuredPrefix} · {featuredProject.category}
              </SectionLabel>
              <h3 className="mt-5 text-2xl font-semibold tracking-tight md:text-3xl">
                <Link href={projectHref(featuredProject)} className={cardLink}>
                  {featuredProject.name}
                </Link>
              </h3>
              <p className="mt-4 max-w-xl text-sm leading-relaxed text-muted-foreground md:text-[15px]">
                {featuredProject.summary}
              </p>
              <ul className="mt-6 flex flex-wrap gap-2">
                {featuredProject.stack.map((tech) => (
                  <li
                    key={tech}
                    className="rounded-md border border-border bg-secondary/50 px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <div className="flex flex-col gap-5">
            {otherProjects.map((project) => (
              <article key={project.slug} className={cn(cardShell, "flex-1")}>
                <div className={cn(imageFrame, "aspect-7/3")}>
                  <Image
                    src={project.image}
                    alt={project.imageAlt}
                    fill
                    sizes="(min-width: 768px) 33vw, 100vw"
                    className={zoom}
                  />
                </div>
                <div className="p-6">
                  <span className="font-mono text-[11px] tracking-[0.16em] text-primary uppercase">
                    {project.category}
                  </span>
                  <h3 className="mt-3 text-xl font-semibold tracking-tight">
                    <Link href={projectHref(project)} className={cardLink}>
                      {project.name}
                    </Link>
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {project.tagline}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>

        <div className="mt-5 flex flex-col gap-6 rounded-xl border border-border bg-card p-7 md:flex-row md:items-center md:justify-between md:p-9">
          <div>
            <p className="text-xl font-semibold tracking-tight md:text-2xl">
              {cta.heading}
            </p>
            <p className="mt-1.5 text-sm text-muted-foreground">{cta.note}</p>
          </div>
          <Button
            nativeButton={false}
            render={<a href={cta.action.href} />}
            className="h-11 shrink-0 px-6 text-sm"
          >
            {cta.action.label}
            <ArrowUpRightIcon />
          </Button>
        </div>
      </div>
    </section>
  );
}

export { SelectedWork };
