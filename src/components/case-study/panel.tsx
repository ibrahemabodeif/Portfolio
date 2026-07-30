import { cn } from "@/lib/utils";
import { SectionLabel } from "@/components/section-label";

/**
 * A case-study block: a rounded panel floating on the page's darker ground.
 *
 * This page runs three surface levels — ground (`bg-muted`), panel
 * (`bg-background`), card inside a panel (`bg-card`) — which the existing token
 * set already provides as three ascending steps in both palettes. `dark` flips
 * the whole panel to the warm-dark palette; its inner cards then pick up the
 * right contrast on their own, with no hardcoded colours.
 */
function Panel({
  dark,
  className,
  children,
}: {
  dark?: boolean;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <section
      className={cn(
        "reveal overflow-hidden rounded-2xl bg-background",
        dark && "dark text-foreground",
        className
      )}
    >
      {children}
    </section>
  );
}

/** Eyebrow + heading, optionally with a note set beside the heading. */
function PanelHead({
  eyebrow,
  heading,
  note,
  children,
}: {
  eyebrow: string;
  heading: string;
  note?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={note ? "grid items-end gap-4 md:grid-cols-12" : undefined}>
      <div className={note ? "md:col-span-7" : undefined}>
        <SectionLabel>{eyebrow}</SectionLabel>
        <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
          {heading}
        </h2>
        {children}
      </div>
      {note && (
        <p className="text-sm leading-relaxed text-pretty text-muted-foreground md:col-span-4 md:col-start-9 md:text-right">
          {note}
        </p>
      )}
    </div>
  );
}

/** Inner card — one step lighter than the panel it sits on. */
const cardShell = "rounded-xl border border-border bg-card";

export { Panel, PanelHead, cardShell };
