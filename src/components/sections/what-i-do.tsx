import { ArrowRightIcon } from "lucide-react";

import { site } from "@/lib/site";
import { SectionLabel } from "@/components/section-label";

const { label, heading, note, cards } = site.whatIDo;

function WhatIDo() {
  return (
    <section id="services" className="mt-3 scroll-mt-24 md:mt-4 mx-3 md:mx-4">
      <div className="reveal mx-auto w-full max-w-6xl px-6 py-14 md:px-8 md:py-20">
        <SectionLabel>{label}</SectionLabel>

        <div className="mt-6 grid items-end gap-6 md:grid-cols-12">
          <h2 className="text-4xl font-semibold tracking-tight text-balance sm:text-5xl md:col-span-7">
            {heading}
          </h2>
          <p className="text-sm leading-relaxed text-muted-foreground md:col-span-4 md:col-start-9 md:text-right">
            {note}
          </p>
        </div>

        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {cards.map((card) => (
            <article
              key={card.n}
              className="flex flex-col rounded-xl border border-border bg-card p-7"
            >
              <span className="font-mono text-xs text-primary/80">
                {card.n}
              </span>
              <h3 className="mt-5 text-lg font-semibold tracking-tight md:text-xl">
                {card.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                {card.body}
              </p>
              <a
                href={card.cta.href}
                className="group mt-auto inline-flex w-fit items-center gap-2 rounded-sm pt-8 text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
              >
                {card.cta.label}
                <ArrowRightIcon className="size-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export { WhatIDo };
