import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";

import { site } from "@/lib/site";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";

const {
  label,
  heading,
  lead,
  primaryCta,
  cvCta,
  facts,
  howIThink,
  stack,
  experience,
  cta,
} = site.aboutPage;

const asideLabel =
  "font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase";

const card = "rounded-xl border border-border bg-card";

// Section headings sit one step below the page's h1, so the hero stays the
// only thing at full scale.
const sectionHeading =
  "text-3xl font-semibold tracking-tight text-balance sm:text-4xl";

// Reserve the date gutter only if at least one role actually has a date —
// otherwise every row would start a third of the way in, indented past
// nothing. Decided across all roles, not per row, so the column can't
// zig-zag once some roles have dates and others don't.
const datedRoles = experience.roles.some((role) => role.period);

export const metadata: Metadata = {
  title: `About — ${site.footer.owner}`,
  description: lead[0],
};

export default function AboutPage() {
  return (
    <>
      {/* Page head. A bare div, not a <section> — like /projects, this sits
          straight on the page background rather than being an inset panel. */}
      <div className="mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
        <div className="reveal grid gap-x-10 gap-y-12 md:grid-cols-12">
          <div className="md:col-span-7">
            <SectionLabel>{label}</SectionLabel>

            <h1 className="mt-6 text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {heading}
            </h1>

            {lead.map((paragraph) => (
              <p
                key={paragraph}
                className="mt-5 text-base leading-relaxed text-pretty text-muted-foreground"
              >
                {paragraph}
              </p>
            ))}

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Button
                nativeButton={false}
                render={<a href={primaryCta.href} />}
                className="h-11 w-full px-6 text-sm sm:w-auto"
              >
                {primaryCta.label}
              </Button>
              <Button
                variant="outline"
                nativeButton={false}
                render={<a href={site.cvHref} download />}
                className="h-11 w-full px-6 text-sm sm:w-auto"
              >
                {cvCta.label}
              </Button>
            </div>
          </div>

          {/* Right column: the at-a-glance facts, aligned to the bottom of the
              text block so the two columns settle on the same baseline. */}
          <dl className="flex flex-col justify-end md:col-span-4 md:col-start-9">
            {facts.map((fact) => (
              <div
                key={fact.label}
                className="flex items-baseline justify-between gap-4 border-t border-border py-3.5 first:border-t-0 first:pt-0"
              >
                <dt className={asideLabel}>{fact.label}</dt>
                <dd className="text-sm font-medium">{fact.value}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* `dark` flips every semantic token below to the warm-dark palette in
          globals.css. Rounded inset, like the /contact hero. */}
      <section className="dark mx-3 mt-3 rounded-2xl bg-background text-foreground md:mx-4 md:mt-4">
        <div className="reveal mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <SectionLabel>{howIThink.label}</SectionLabel>

          <h2 className={`mt-6 max-w-3xl ${sectionHeading}`}>
            {howIThink.heading}
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {howIThink.cards.map((item) => (
              <article key={item.n} className={`${card} p-7`}>
                <span className="font-mono text-xs text-primary/80">
                  {item.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight md:text-xl">
                  {item.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-3 mt-3 md:mx-4 md:mt-4">
        <div className="reveal mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <SectionLabel>{stack.label}</SectionLabel>

          <div className="mt-6 grid items-end gap-6 md:grid-cols-12">
            <h2 className={`${sectionHeading} md:col-span-7`}>
              {stack.heading}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:text-right">
              {stack.note}
            </p>
          </div>

          <div className="mt-12 grid gap-5 sm:grid-cols-2 md:grid-cols-4">
            {stack.groups.map((group) => (
              <div key={group.title} className={`${card} p-6`}>
                <p className={asideLabel}>{group.title}</p>
                <ul className="mt-4 flex flex-col gap-2">
                  {group.items.map((item) => (
                    <li key={item} className="text-sm">
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-3 mt-3 md:mx-4 md:mt-4">
        <div className="reveal mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <SectionLabel>{experience.label}</SectionLabel>

          <div className="mt-6 grid items-end gap-6 md:grid-cols-12">
            <h2 className={`${sectionHeading} md:col-span-7`}>
              {experience.heading}
            </h2>
            <p className="text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:text-right">
              {experience.note}
            </p>
          </div>

          <ul className="mt-12 flex flex-col">
            {experience.roles.map((role) => (
              <li
                key={`${role.title}-${role.org}`}
                className="grid gap-2 border-t border-border py-8 md:grid-cols-12 md:gap-6"
              >
                {datedRoles ? (
                  <p className={`${asideLabel} md:col-span-3 md:pt-1.5`}>
                    {role.period}
                  </p>
                ) : null}
                <div className={datedRoles ? "md:col-span-9" : "md:col-span-12"}>
                  <h3 className="text-lg font-semibold tracking-tight text-primary md:text-xl">
                    {role.title}
                    {role.org ? ` — ${role.org}` : ""}
                  </h3>
                  <p className="mt-3 max-w-2xl text-sm leading-relaxed text-muted-foreground">
                    {role.body}
                  </p>
                </div>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Full-bleed, like #contact on the home page, so it runs continuously
          into the dark footer instead of leaving a seam between two panels. */}
      <section className="dark bg-background text-foreground">
        <div className="reveal mx-auto w-full max-w-6xl px-6 py-16 text-center md:px-8 md:py-20">
          <h2 className="text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {site.contact.heading}
          </h2>
          <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-pretty text-muted-foreground">
            {cta.note}
          </p>
          <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              nativeButton={false}
              render={<a href={cta.primary.href} />}
              className="h-11 w-full px-6 text-sm sm:w-auto"
            >
              {cta.primary.label}
              <ArrowUpRightIcon className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
            </Button>
            <Button
              variant="outline"
              nativeButton={false}
              render={<a href={cta.secondary.href} />}
              className="h-11 w-full px-6 text-sm sm:w-auto"
            >
              {cta.secondary.label}
            </Button>
          </div>
        </div>
      </section>
    </>
  );
}
