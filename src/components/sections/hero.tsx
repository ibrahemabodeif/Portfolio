import { ArrowUpRightIcon } from "lucide-react";

import { site } from "@/lib/site";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const { status, headline, lead, primaryCta, secondaryCta } = site.hero;

function Hero() {
  return (
    <section className="mx-auto w-full max-w-6xl px-6 pt-14 pb-16 text-center md:px-8 md:pt-24 md:pb-20">
      <Badge
        variant="outline"
        className="rise h-7 gap-2 bg-secondary/60 px-3 text-[13px] font-normal text-foreground/75"
      >
        <span
          aria-hidden
          className="size-1.5 animate-pulse rounded-full bg-primary"
        />
        {status}
      </Badge>

      <h1
        className="rise mx-auto mt-7 max-w-4xl text-5xl font-semibold tracking-tighter text-balance sm:text-6xl lg:text-7xl"
        style={{ animationDelay: "75ms", lineHeight: 1.03 }}
      >
        {headline.lead}
        <span className="text-primary">{headline.accent}</span>
        {headline.tail}
      </h1>

      <p
        className="rise mx-auto mt-6 max-w-xl text-base leading-relaxed text-pretty text-muted-foreground md:text-[17px]"
        style={{ animationDelay: "150ms" }}
      >
        {lead}
      </p>

      <div
        className="rise mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        style={{ animationDelay: "225ms" }}
      >
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
          render={<a href={secondaryCta.href} />}
          className="h-11 w-full bg-card px-6 text-sm sm:w-auto"
        >
          {secondaryCta.label}
          <ArrowUpRightIcon className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
        </Button>
      </div>
    </section>
  );
}

export { Hero };
