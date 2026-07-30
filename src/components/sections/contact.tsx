import { ArrowUpRightIcon } from "lucide-react";

import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { ContactForm } from "@/components/contact-form";

const { label, heading, email, emailLabel, elsewhereLabel, links, note } =
  site.contact;

const asideLabel =
  "font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase";

const focusRing =
  "rounded-lg outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

function Contact() {
  return (
    <section
      id="contact"
      // `dark` flips every token below to the warm-dark palette in globals.css.
      // Full-bleed, unlike #about — this is the page's closing block.
      className="dark scroll-mt-24 bg-background text-foreground"
    >
      <div className="reveal mx-auto w-full max-w-6xl px-6 py-16 md:px-8 md:py-24">
        <div className="flex flex-col items-center text-center">
          <Badge
            variant="outline"
            className="h-7 gap-2 bg-secondary/40 px-3 font-mono text-[11px] tracking-[0.16em] text-primary-soft uppercase"
          >
            {/* Green reads as a live availability signal — deliberately
                outside the brand palette, unlike the hero's terracotta dot. */}
            <span
              aria-hidden
              className="size-1.5 animate-pulse rounded-full bg-emerald-400"
            />
            {label}
          </Badge>
          <h2 className="mt-7 max-w-2xl text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
            {heading}
          </h2>
        </div>

        <div className="mt-14 grid gap-10 md:mt-16 md:grid-cols-12 md:gap-12">
          <div className="md:col-span-7">
            <ContactForm />
          </div>

          <div className="flex flex-col gap-8 md:col-span-5">
            <div>
              <p className={asideLabel}>{emailLabel}</p>
              <a
                href={`mailto:${email}`}
                className={`group mt-3 inline-flex items-center gap-2 text-lg font-semibold tracking-tight break-all md:text-xl ${focusRing}`}
              >
                {email}
                <ArrowUpRightIcon className="size-4 shrink-0 text-primary transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </div>

            <div>
              <p className={asideLabel}>{elsewhereLabel}</p>
              <ul className="mt-3 flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className={`group flex items-center justify-between rounded-lg border border-border bg-secondary/25 px-4 py-3.5 text-sm font-medium transition-colors hover:border-foreground/25 hover:bg-secondary/40 ${focusRing}`}
                    >
                      {link.label}
                      <ArrowUpRightIcon className="size-3.5 text-muted-foreground transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            <p className="rounded-lg bg-secondary/25 p-5 text-sm leading-relaxed text-muted-foreground">
              {note}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

export { Contact };
