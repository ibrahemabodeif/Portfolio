import type { Metadata } from "next";
import { ArrowUpRightIcon } from "lucide-react";

import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { SectionLabel } from "@/components/section-label";
import { ContactForm } from "@/components/contact-form";

const { label, heading, email, emailLabel, elsewhereLabel, links } =
  site.contact;
const { lead, emailNote, formNote, message, note, next } = site.contactPage;

const asideLabel =
  "font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase";

const card = "rounded-xl border border-border bg-secondary/25 p-5";

const focusRing =
  "rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

export const metadata: Metadata = {
  title: `Contact — ${site.footer.owner}`,
  description: lead,
};

export default function ContactPage() {
  return (
    <>
      <section
        // `dark` flips every token below to the warm-dark palette in
        // globals.css. Inset like the home panels, but rounded — this block is
        // the page's hero, not a section inside a longer scroll.
        className="dark mt-3 bg-background text-foreground  md:mt-4"
      >
        <div className="reveal mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-24">
          <div className="flex flex-col items-center text-center">
            <Badge
              variant="outline"
              className="h-7 gap-2 bg-secondary/40 px-3 font-mono text-[11px] tracking-[0.16em] text-primary-soft uppercase"
            >
              {/* Green reads as a live availability signal — deliberately
                  outside the brand palette, like on the home section. */}
              <span
                aria-hidden
                className="size-1.5 animate-pulse rounded-full bg-emerald-400"
              />
              {label}
            </Badge>
            <h1 className="mt-7 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
              {heading}
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground">
              {lead}
            </p>
          </div>

          <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
            <div className="md:col-span-7">
              <ContactForm message={message} />
              <p className="mt-4 text-center text-xs text-muted-foreground">
                {formNote}
              </p>
            </div>

            <div className="flex flex-col gap-4 md:col-span-5">
              <div className={card}>
                <p className={asideLabel}>{emailLabel}</p>
                <a
                  href={`mailto:${email}`}
                  className={`group mt-3 inline-flex items-center gap-2 text-lg font-semibold tracking-tight break-all text-primary-soft ${focusRing}`}
                >
                  {email}
                  <ArrowUpRightIcon className="size-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                </a>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {emailNote}
                </p>
              </div>

              <div className={card}>
                <p className={asideLabel}>{elsewhereLabel}</p>
                <ul className="mt-3 flex flex-col gap-3">
                  {links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`group flex items-center justify-between rounded-lg border border-border bg-secondary/25 px-4 py-3.5 text-sm font-medium text-primary-soft transition-colors hover:border-foreground/25 hover:bg-secondary/40 ${focusRing}`}
                      >
                        {link.label}
                        <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              <p
                className={`${card} text-sm leading-relaxed text-muted-foreground`}
              >
                {note.lead}
                <span className="font-medium text-foreground">
                  {note.accent}
                </span>
                {note.tail}
              </p>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-3 mt-3 md:mx-4 md:mt-4">
        <div className="reveal mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
          <SectionLabel>{next.label}</SectionLabel>

          <h2 className="mt-6 max-w-2xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {next.heading}
          </h2>

          <div className="mt-12 grid gap-5 md:grid-cols-3">
            {next.steps.map((step) => (
              <article
                key={step.n}
                className="rounded-xl border border-border bg-card p-7"
              >
                <span className="font-mono text-xs text-primary/80">
                  {step.n}
                </span>
                <h3 className="mt-5 text-lg font-semibold tracking-tight text-primary md:text-xl">
                  {step.title}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
