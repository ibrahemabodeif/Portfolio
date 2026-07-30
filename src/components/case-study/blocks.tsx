import { cn } from "@/lib/utils";
import { type CaseStudy, type Visual } from "@/lib/case-studies";
import { SectionLabel } from "@/components/section-label";
import { Panel, PanelHead, cardShell } from "@/components/case-study/panel";

const panelPad = "px-6 py-11 md:px-10 md:py-14";
const bodyText = "text-sm leading-relaxed text-muted-foreground";

/* ── 2. The problem ─────────────────────────────────────────────────────── */

function ProblemBlock({ data }: { data: CaseStudy["problem"] }) {
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
            <em>{data.intro.emphasis}</em>
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

/* ── 3. The core idea (dark) ────────────────────────────────────────────── */

function IdeaBlock({ data }: { data: CaseStudy["idea"] }) {
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
          <li key={card.n} className={cn(cardShell, "flex flex-col p-6")}>
            <span className="font-mono text-xs text-primary-soft">{card.n}</span>
            <h3 className="mt-4 text-lg font-semibold tracking-tight">
              {card.title}
            </h3>
            <p className={cn(bodyText, "mt-3")}>{card.body}</p>
            <div className="mt-5">
              <CardVisual visual={card.visual} />
            </div>
          </li>
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

/* ── 4. What I built ────────────────────────────────────────────────────── */

function BuiltBlock({ data }: { data: CaseStudy["built"] }) {
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

/* ── 5. Engineering decisions ───────────────────────────────────────────── */

function DecisionsBlock({ data }: { data: CaseStudy["decisions"] }) {
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

/* ── 6. Where it stands (dark) ──────────────────────────────────────────── */

function StandsBlock({ data }: { data: CaseStudy["stands"] }) {
  // Emptying `stats` removes the block outright — the intended escape hatch if
  // it's too early to publish traction.
  if (data.stats.length === 0) return null;

  return (
    <Panel dark className={panelPad}>
      <PanelHead
        eyebrow={data.eyebrow}
        heading={data.heading}
        note={data.note}
      />

      <ul className="mt-10 grid gap-4 sm:grid-cols-2 md:grid-cols-4">
        {data.stats.map((stat) => (
          <li key={stat.label} className={cn(cardShell, "p-5")}>
            {stat.value ? (
              <p className="text-2xl font-semibold tracking-tight">
                {stat.value}
              </p>
            ) : (
              <span aria-hidden className="block h-px w-6 bg-muted-foreground/50" />
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
    </Panel>
  );
}

export { ProblemBlock, IdeaBlock, BuiltBlock, DecisionsBlock, StandsBlock };
