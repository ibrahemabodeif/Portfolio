import { ArrowUpRightIcon } from "lucide-react";

import { site } from "@/lib/site";
import { SectionLabel } from "@/components/section-label";
import { Button } from "@/components/ui/button";

const { label, name, role, statement, primaryCta, secondaryCta } = site.whoIAm;

function WhoIAm() {
  return (
    <section
      id="about"
      // `dark` flips every semantic token below to the warm-dark palette
      // already defined in globals.css — no hardcoded dark colours here.
      className="dark mt-3 scroll-mt-24 bg-background text-foreground md:mt-4 mx-3 md:mx-4"
    >
      <div className="reveal mx-auto grid w-full max-w-6xl gap-x-10 gap-y-12 px-6 py-14 md:grid-cols-12 md:px-8 md:py-20">
        <div className="flex flex-col justify-end md:col-span-5">
          <SectionLabel>{label}</SectionLabel>
          <p className="mt-6 text-[15px] font-semibold">{name}</p>
          <p className="mt-1 text-sm text-muted-foreground">{role}</p>
        </div>

        <p className="text-2xl leading-snug tracking-tight text-pretty md:col-span-7 md:text-3xl">
          {statement.lead}
          <span className="text-primary">{statement.accent}</span>
          {statement.tail}
        </p>

        <div className="flex flex-col gap-3 sm:flex-row md:col-span-7 md:col-start-6">
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
            className="h-11 w-full px-6 text-sm sm:w-auto"
          >
            {secondaryCta.label}
            <ArrowUpRightIcon className="transition-transform duration-200 group-hover/button:-translate-y-0.5 group-hover/button:translate-x-0.5" />
          </Button>
        </div>
      </div>
    </section>
  );
}

export { WhoIAm };
