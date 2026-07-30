import Image from "next/image";
import { ArrowRightIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { type Block, type Visual } from "@/lib/case-studies";
import { SectionLabel } from "@/components/section-label";
import { Panel, PanelHead, cardShell } from "@/components/case-study/panel";

const panelPad = "px-6 py-11 md:px-10 md:py-14";
const bodyText = "text-sm leading-relaxed text-muted-foreground";

/**
 * Renders one block of a case study. Studies declare an ordered `blocks` array
 * rather than fixed named sections, so the page maps over it and this switch is
 * the only place that knows which layout a `kind` means. Adding a project needs
 * no change here unless it introduces a genuinely new layout.
 */
function CaseStudyBlock({ block }: { block: Block }) {
  switch (block.kind) {
    case "problem":
      return <ProblemBlock data={block} />;
    case "idea":
      return <IdeaBlock data={block} />;
    case "metrics":
      return <MetricsBlock data={block} />;
    case "built":
      return <BuiltBlock data={block} />;
    case "sides":
      return <SidesBlock data={block} />;
    case "decisions":
      return <DecisionsBlock data={block} />;
  }
}

/** Shared by the idea and metrics blocks — same card, one with a diagram. */
function NumberedCard({
  n,
  title,
  body,
  children,
}: {
  n: string;
  title: string;
  body: string;
  children?: React.ReactNode;
}) {
  return (
    <li className={cn(cardShell, "flex flex-col p-6")}>
      <span className="font-mono text-xs text-primary-soft">{n}</span>
      <h3 className="mt-4 text-lg font-semibold tracking-tight">{title}</h3>
      <p className={cn(bodyText, "mt-3")}>{body}</p>
      {children && <div className="mt-5">{children}</div>}
    </li>
  );
}

/* ── The problem / the challenge ────────────────────────────────────────── */

function ProblemBlock({ data }: { data: Extract<Block, { kind: "problem" }> }) {
  return (
    <Panel className={panelPad}>
      <div className="grid gap-8 md:grid-cols-12 md:gap-10">
        <div className="md:col-span-5">
          <SectionLabel>{data.eyebrow}</SectionLabel>
          <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
            {data.heading}
          </h2>
        </div>

        <div className="md:col-span-7">
          <p className={cn(bodyText, "md:text-[15px]")}>
            {data.intro.lead}
            {/* Guarded so a plain paragraph doesn't emit an empty <em>. */}
            {data.intro.emphasis && <em>{data.intro.emphasis}</em>}
            {data.intro.tail}
          </p>

          <ul className="mt-7 flex flex-col gap-3">
            {data.cards.map((card) => (
              <li key={card.title} className={cn(cardShell, "p-5")}>
                <h3 className="text-[15px] font-semibold tracking-tight">
                  {card.title}
                </h3>
                <p className={cn(bodyText, "mt-1.5")}>{card.body}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Panel>
  );
}

/* ── The core idea (dark) ───────────────────────────────────────────────── */

function IdeaBlock({ data }: { data: Extract<Block, { kind: "idea" }> }) {
  return (
    <Panel dark className={panelPad}>
      <SectionLabel>{data.eyebrow}</SectionLabel>
      <h2 className="mt-5 max-w-3xl text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {data.heading}
      </h2>
      <p className={cn(bodyText, "mt-6 max-w-2xl md:text-[15px]")}>
        {data.body}
      </p>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {data.cards.map((card) => (
          <NumberedCard
            key={card.n}
            n={card.n}
            title={card.title}
            body={card.body}
          >
            <CardVisual visual={card.visual} />
          </NumberedCard>
        ))}
      </ul>
    </Panel>
  );
}

/**
 * The small diagrams inside the core-idea cards. Real markup rather than
 * images: the project has exactly one screenshot, so these carry the section
 * and stay crisp at any size.
 */
function CardVisual({ visual }: { visual: Visual }) {
  if (visual.kind === "timeline") {
    return (
      <ul className="flex flex-col gap-2.5">
        {visual.steps.map((step) => (
          <li key={step.label} className="flex items-center gap-2.5 text-[13px]">
            <span
              aria-hidden
              className={cn(
                "size-3.5 shrink-0 rounded-full border-2",
                step.state === "done" && "border-emerald-400 bg-emerald-400",
                step.state === "current" && "border-foreground/70",
                step.state === "next" && "border-border"
              )}
            />
            <span
              className={cn(
                "font-medium",
                step.state === "next" && "text-muted-foreground"
              )}
            >
              {step.label}
            </span>
            {step.note && (
              <span className="truncate text-muted-foreground">
                · {step.note}
              </span>
            )}
          </li>
        ))}
      </ul>
    );
  }

  if (visual.kind === "chips") {
    return (
      <ul className="flex flex-wrap gap-1.5">
        {visual.items.map((item) => (
          <li
            key={item}
            className="rounded border border-border bg-secondary/60 px-1.5 py-1 font-mono text-[10px] tracking-wider text-muted-foreground"
          >
            {item}
          </li>
        ))}
      </ul>
    );
  }

  return (
    <div className="flex items-center justify-between gap-3 rounded-lg border border-border bg-secondary/40 px-3 py-2.5">
      <span className="truncate text-[13px] font-medium">{visual.label}</span>
      <span className="shrink-0 rounded bg-emerald-400/15 px-2 py-0.5 text-[11px] font-medium text-emerald-400">
        {visual.state}
      </span>
    </div>
  );
}

/* ── What I built ───────────────────────────────────────────────────────── */

function BuiltBlock({ data }: { data: Extract<Block, { kind: "built" }> }) {
  return (
    <Panel className={panelPad}>
      <SectionLabel>{data.eyebrow}</SectionLabel>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {data.heading}
      </h2>
      <p className={cn(bodyText, "mt-5 max-w-xl md:text-[15px]")}>{data.note}</p>

      <ul className="mt-10 grid gap-4 md:grid-cols-3">
        {data.cards.map((card) => (
          <li key={card.title} className={cn(cardShell, "p-6")}>
            <h3 className="text-lg font-semibold tracking-tight">
              {card.title}
            </h3>
            <p className={cn(bodyText, "mt-3")}>{card.body}</p>
          </li>
        ))}
      </ul>

      {/* Wider pair — these carry their own eyebrow, unlike the three above. */}
      <ul className="mt-4 grid gap-4 md:grid-cols-2">
        {data.wide.map((card) => (
          <li key={card.title} className={cn(cardShell, "p-6")}>
            <p className="font-mono text-[10px] tracking-[0.18em] text-primary uppercase">
              {card.eyebrow}
            </p>
            <h3 className="mt-3 text-lg font-semibold tracking-tight">
              {card.title}
            </h3>
            <p className={cn(bodyText, "mt-3")}>{card.body}</p>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ── Both sides ─────────────────────────────────────────────────────────── */

/**
 * One column per side of a two-sided product: an optional screenshot, then
 * eyebrow, title and arrow bullets. Homely's two sides are one app, so its
 * columns are text-only; Pegasus's are two separate deployments and lead with
 * a shot of each.
 */
function SidesBlock({ data }: { data: Extract<Block, { kind: "sides" }> }) {
  return (
    <Panel dark={data.dark} className={panelPad}>
      <SectionLabel>{data.eyebrow}</SectionLabel>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {data.heading}
      </h2>

      <ul className="mt-10 grid gap-4 md:grid-cols-2">
        {data.columns.map((column) => (
          <li
            key={column.eyebrow}
            className={cn(cardShell, "overflow-hidden")}
          >
            {/* Deliberately cropped, unlike the case-study hero. The hero
                frames a shot at its own ratio so nothing is cut; these two are
                2.56:1 and 2.13:1 and sit side by side, so honouring both would
                leave the columns different heights. A fixed 5:2 top-anchored
                frame lines them up — they identify a surface rather than being
                read. */}
            {column.image && (
              <div className="relative aspect-[5/2] w-full border-b border-border bg-secondary/40">
                {/* Lower quality than the default 75: this renders about a
                    quarter the width of the hero and is there to identify a
                    surface, not to be read. It also keeps the request distinct
                    from the hero's when a study reuses the same file — Next
                    tracks images in a Map keyed by src, so a shared src lets
                    this lazy thumbnail mask the eager hero and produces a
                    bogus "LCP image is lazy" warning in dev. */}
                <Image
                  src={column.image.src}
                  alt={column.image.alt}
                  fill
                  quality={65}
                  sizes="(min-width: 768px) 50vw, 100vw"
                  className="object-cover object-top"
                />
              </div>
            )}

            <div className="p-7">
              {/* On the dark panel these label the two products, so they take
                  the accent — --primary-soft rather than --primary, which only
                  reaches ~4:1 there and would fail at 10px. */}
              <p
                className={cn(
                  "font-mono text-[10px] tracking-[0.18em] uppercase",
                  data.dark ? "text-primary-soft" : "text-muted-foreground"
                )}
              >
                {column.eyebrow}
              </p>
              <h3 className="mt-3 text-xl font-semibold tracking-tight">
                {column.title}
              </h3>

              <ul className="mt-6 flex flex-col gap-3">
                {column.items.map((item) => (
                  <li key={item} className="flex gap-3">
                    <ArrowRightIcon
                      aria-hidden
                      className="mt-0.5 size-4 shrink-0 text-primary"
                    />
                    <span className="text-sm leading-relaxed text-foreground/80">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ul>
    </Panel>
  );
}

/* ── Engineering decisions ──────────────────────────────────────────────── */

function DecisionsBlock({
  data,
}: {
  data: Extract<Block, { kind: "decisions" }>;
}) {
  return (
    <Panel className={panelPad}>
      <SectionLabel>{data.eyebrow}</SectionLabel>
      <h2 className="mt-5 text-3xl font-semibold tracking-tight text-balance sm:text-4xl">
        {data.heading}
      </h2>

      <ul className="mt-10 flex flex-col">
        {data.rows.map((row) => (
          <li
            key={row.title}
            className="grid gap-3 border-t border-border py-7 md:grid-cols-12 md:gap-10"
          >
            <div className="md:col-span-5">
              <h3 className="text-[17px] font-semibold tracking-tight">
                {row.title}
              </h3>
              <p className="mt-1.5 font-mono text-[10px] tracking-[0.18em] text-muted-foreground uppercase">
                {row.tag}
              </p>
            </div>
            <p className={cn(bodyText, "md:col-span-7 md:text-[15px]")}>
              {row.body}
            </p>
          </li>
        ))}
      </ul>
      <div className="border-t border-border" />
    </Panel>
  );
}

/* ── Metrics (dark) ─────────────────────────────────────────────────────── */

/**
 * Stat cards, numbered cards, or both. Cradlen uses it for traction alone;
 * Homely folds its performance narrative in beside the numbers.
 */
function MetricsBlock({ data }: { data: Extract<Block, { kind: "metrics" }> }) {
  // Nothing to say without either half — the intended escape hatch when it's
  // too early to publish figures.
  if (data.stats.length === 0 && data.cards.length === 0) return null;

  return (
    <Panel dark className={panelPad}>
      <PanelHead
        eyebrow={data.eyebrow}
        heading={data.heading}
        note={data.note}
      />

      {data.stats.length > 0 && (
        <>
          <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
            {data.stats.map((stat) => (
              <li key={stat.label} className={cn(cardShell, "p-5")}>
                {stat.value ? (
                  <p className="text-2xl font-semibold tracking-tight">
                    {stat.value}
                  </p>
                ) : (
                  <span
                    aria-hidden
                    className="block h-px w-6 bg-muted-foreground/50"
                  />
                )}
                <p className="mt-3 text-[13px] font-semibold tracking-tight">
                  {stat.label}
                </p>
                {!stat.value && (
                  <p className="mt-1 text-[13px] text-muted-foreground">
                    {stat.hint}
                  </p>
                )}
              </li>
            ))}
          </ul>

          {/* Only shown while at least one figure is still missing. */}
          {data.stats.some((stat) => !stat.value) && (
            <p className="mt-6 font-mono text-[11px] leading-relaxed text-muted-foreground">
              {data.footnote}
            </p>
          )}
        </>
      )}

      {data.cards.length > 0 && (
        <ul className="mt-10 grid gap-4 md:grid-cols-3">
          {data.cards.map((card) => (
            <NumberedCard key={card.n} {...card} />
          ))}
        </ul>
      )}
    </Panel>
  );
}

export { CaseStudyBlock };
