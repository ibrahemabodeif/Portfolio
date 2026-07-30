# Portfolio — Ibrahem Abo Deif

Personal portfolio site for a full-stack developer, with a working contact form
backed by a Next.js Server Action and long-form case studies. Every route is
statically prerendered.

| Route | What it is |
|---|---|
| `/` | Home — hero, tech strip, what I do (`#services`), who I am (`#about`), selected work (`#work`), contact (`#contact`) |
| `/about` | The longer version of who I am |
| `/contact` | The contact form on its own page |
| `/projects` | Every project, with stack and links |
| `/projects/[slug]` | Case study — SSG. Built: `cradlen`, `homely`, `pegasus` |

The home page keeps its own `#about` and `#contact` sections as an in-page
summary; the nav points at the dedicated routes.

## Stack

| | |
|---|---|
| Framework | Next.js 16 (App Router, Turbopack) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 |
| Components | shadcn/ui on `@base-ui/react` |
| Icons | lucide-react |
| Fonts | Geist Sans + Geist Mono (`next/font`) |
| Email | Resend, via a Server Action |

## Getting started

Requires Node 20.9+.

```bash
npm install
cp .env.example .env.local   # then fill in the values
npm run dev
```

Open http://localhost:3000.

| Script | Does |
|---|---|
| `npm run dev` | Dev server |
| `npm run build` | Production build + typecheck |
| `npm start` | Serve the production build |
| `npm run lint` | ESLint |

## Environment

Both values live in `.env.local`, which is git-ignored. See `.env.example`.

| Variable | Purpose |
|---|---|
| `RESEND_API_KEY` | Resend API key. Without it the contact form returns a readable error instead of failing silently. |
| `CONTACT_TO_EMAIL` | Where messages are delivered. Falls back to the address in `src/lib/site.ts`. |

**Resend note:** the sender is Resend's sandbox address `onboarding@resend.dev`,
which only delivers to the account that owns the API key. To accept mail at any
other address, verify a domain in Resend and change `from` in
`src/lib/contact-action.ts`.

## Layout

```
src/
├── app/
│   ├── globals.css          Design tokens, dark palette, motion keyframes
│   ├── layout.tsx           Fonts, metadata, header + footer chrome
│   ├── page.tsx             Home — composes every section
│   ├── about/page.tsx       /about
│   ├── contact/page.tsx     /contact
│   └── projects/
│       ├── page.tsx         The /projects index
│       └── [slug]/page.tsx  Case study (SSG, one per project that has one)
├── components/
│   ├── sections/            One file per home-page section
│   ├── case-study/          Panel shell, hero, block dispatcher, closing
│   ├── ui/                  shadcn primitives
│   ├── contact-form.tsx     Client component: form state + validation display
│   ├── project-row.tsx      One project on the /projects index
│   ├── site-header.tsx      Sticky nav, blurs on scroll
│   ├── site-footer.tsx
│   ├── section-label.tsx    The "—— WHAT I DO" eyebrow
│   └── wordmark.tsx         Shared by header and footer
└── lib/
    ├── site.ts              All copy, plus the canonical `projects` list
    ├── case-studies.ts      Case-study content as block sequences, by slug
    ├── contact-action.ts    Server Action: validation + Resend
    └── utils.ts             cn()
```

`SiteHeader` and `SiteFooter` live in `layout.tsx`, not in a page, so every
route gets the same chrome.

## Notes on the implementation

**All copy lives in `src/lib/`.** `site.ts` holds every string the shell and the
home page use; `case-studies.ts` holds the long-form case-study content, keyed by
slug, because it's per-project and long. Text edits never require touching JSX.

**Projects have one canonical shape.** `site.ts` exports a single `projects`
array; the home page derives its featured and secondary cards from it
(`featuredProject`, `otherProjects`) and `/projects` maps the whole list. A
description is therefore only ever edited in one place, and adding a project
means adding an array entry — no component changes.

**A project gets a case study only when two things agree.** A `/projects/<slug>`
page exists when the project has `caseStudy: true` in `site.ts` *and* an entry in
`case-studies.ts`. `generateStaticParams` builds only those slugs and
`dynamicParams = false` 404s the rest, so an unbuilt case study can't be reached.
`projectHref()` is the single source of truth for where a project name links —
flipping the flag lights up every link to it at once, and no component can point
at a page that isn't there.

**A case study is an ordered list of blocks, not a fixed set of sections.**
Each entry in `case-studies.ts` declares `blocks: Block[]`, a discriminated union
(`problem`, `idea`, `metrics`, `built`, `sides`, `decisions`), and the page maps
over it. Projects genuinely tell different stories — Cradlen leads with a product
thesis and ends on traction, Homely leads with the two-sided problem and puts its
numbers inside a performance panel, Pegasus is a three-block story about the two
halves of a store — so *which* blocks appear and in *what order* is per-project
data. The `kind` field picks the component in one `switch`; adding a project
means declaring its sequence, with no type or component change unless it needs a
genuinely new layout. Homely and Pegasus both use `sides`, which shows how that
scales: Pegasus turns on `dark` and gives each column an `image`, both optional,
so Homely's text-only light version is untouched.

**Blocks with nothing to say remove themselves.** `metrics` renders `null` when
both its `stats` and `cards` are empty, and its stat row and footnote drop
independently. That's the escape hatch for "no measured figures yet" — the
numbers are commented out in the data rather than shipped as visible "add your
score" placeholders.

**The case study runs three surface levels.** Page ground (`bg-muted`), section
panel (`bg-background`), card inside a panel (`bg-card`) — three ascending steps
the token set already provides in both palettes, so the dark blocks need no
special-casing.

**Unfilled project fields render nothing rather than something broken.**
`role`, `liveUrl`, `repoUrl` and `stack` are guarded at every use site, so a
half-filled entry is publishable and the links appear on their own once the
strings are supplied. No placeholder `#` hrefs to remember to swap out. The
case-study meta bar goes further and reflows: empty cells are filtered out and
the grid takes its column count from how many survive, so a half-filled bar
still fills its row instead of leaving dead columns.

**The case-study hero takes a list of buttons, not a fixed pair.** A study
declares `actions: HeroAction[]`; the first renders filled and the rest
outlined. Each action either carries its own `href` or names a `site.ts` field
via `use: "liveUrl" | "repoUrl"`, so a project's own URLs are never written
twice. Pegasus needs this — it ships as two deployments with two repos, so its
hero links four places, while Cradlen and Homely link two. An action that
resolves to an empty string renders nothing, which is how Pegasus's two
dashboard links stay switched off without a placeholder. `isExternal()` drives
both `target="_blank"`/`rel="noopener noreferrer"` and the `↗`: the arrow means
"this leaves the site", so Cradlen's internal `Work with me` doesn't get one.

**In-page navigation is smooth; route changes are instant.** `globals.css` sets
`scroll-behavior: smooth`, and `data-scroll-behavior="smooth"` on `<html>` tells
Next 16 to suspend it while the router navigates — otherwise a route change
would slowly glide to the top. For the same reason the header nav uses plain
`<a>` rather than `next/link`: a router navigation would make the in-page jump
instant, which is what the smooth scroll exists to avoid.

**Dark panels reuse the `.dark` token block.** The "who I am" and contact
sections carry `className="dark"`, so every semantic token (`bg-background`,
`text-muted-foreground`, `border-border`) flips automatically. No hardcoded dark
colours anywhere.

**Contact-form validation is duplicated on purpose.** The browser enforces
`required` / `minLength` / `maxLength` for instant feedback, and
`contact-action.ts` re-validates everything server-side — client constraints are
trivially bypassed, so the action is the real boundary. The two rule sets mirror
each other deliberately.

**The situation dropdown derives its options from the service cards**
(`site.whatIDo.cards`), so it cannot drift out of sync with what the page
advertises. The Server Action validates against that same derived list.

**Project cards use a pseudo-element overlay** rather than wrapping the card in
an anchor: only the project title is a link, stretched over the card with
`after:inset-0`. Screen readers announce the title instead of reading a whole
card as link text.

**Colour contrast was measured, not eyeballed.** Small accent text uses a
separate `--primary-soft` token because the base terracotta only reaches ~4:1 on
the dark ground — fine for large text, short of the 4.5:1 that 11px labels need.

**Motion is deliberately minimal:** a page-load stagger on the hero, a pulsing
availability dot, and a section reveal on scroll. All respect
`prefers-reduced-motion`.

**The scroll reveal is CSS-only** (`animation-timeline: view()`), not an
IntersectionObserver, and sits behind `@supports`. Browsers without scroll-driven
animations — Firefox, currently — render the final state, so content can never
get stuck invisible if JS fails or hydration lags. Its range is a fixed 280px
rather than a percentage: percentages scale with element height, which would
leave a tall section half-faded for most of its own length. The class goes on a
section's inner container, never the `<section>`, so dark panels paint their
background immediately instead of fading in as a block.

**Screenshots carry their own dimensions.** `imageWidth` / `imageHeight` on each
project are the file's real pixel size, and the case-study hero frames the shot
at exactly that ratio. The screenshots range from 1.65:1 to 2.6:1, so any fixed
frame silently crops some of them — a 2:1 frame cut 18% off the bottom of
Cradlen's, which is the kind of thing that reads as a layout bug rather than a
crop.

**The `sides` thumbnails break that rule on purpose.** Pegasus's two surface
shots are 2.56:1 and 2.13:1 and sit side by side, so framing each at its own
ratio would leave the two columns different heights. They use a fixed 5:2
`object-cover object-top` frame instead: the storefront comes out effectively
uncropped, the dashboard loses its bottom rows, and the pair line up. These
identify a surface rather than being read, which is why the hero's rule doesn't
apply.

**Non-default image qualities have to be allowlisted.** Next 16 only optimizes
the values in `images.qualities` (`next.config.ts`), because an open-ended
`quality` prop would let anyone request arbitrary re-encodes off the image
route. The `sides` thumbnails ask for 65 — they render at about a quarter of the
hero's width. That also keeps their request URL distinct from the hero's when a
study reuses the same file, as Pegasus does: Next tracks images in a `Map` keyed
by src, so a shared src lets a lazy thumbnail overwrite the eager hero's entry
and produces a bogus "LCP image is lazy" warning in dev.

## Known gaps

Nothing here renders broken — every one of these is a guarded field that simply
shows nothing until it's filled in.

- **Both stat blocks are switched off.** Cradlen's "Running in the real world"
  traction figures and Homely's four performance numbers are commented out in
  `case-studies.ts`. `MetricsBlock` returns `null` when a block has neither
  stats nor cards, so Cradlen's section drops out entirely, while Homely's
  survives on its three numbered cards with the stat row and footnote hidden.
  Uncomment the entries and fill in each `value` to bring them back.
- **Pegasus's two dashboard links are blank.** Its hero declares four actions,
  but `Visit dashboard` and `Dashboard code` have empty hrefs in
  `case-studies.ts`, so only two buttons render. Paste the dashboard's live and
  repo URLs into the two marked lines and the 4-up appears.
- **`repoUrl` is empty on Cradlen**, so it shows no "GitHub" button on the index
  and no "View code" in its hero. Homely and Pegasus have theirs.
- **`role` is empty on all three** `Project` entries. Not used on the index; the
  case-study meta bar reads its own `meta` array in `case-studies.ts` rather
  than this field, and all three studies fill it in there.
- **Homely and Pegasus have no `summary`**, so the home page's large featured
  card would fall back to their one-line tagline if either were made featured.
- **The first project image on `/projects` isn't marked `priority`**, so Next
  logs an LCP advisory in dev. Harmless, but it's a real above-the-fold image.
- `public/cv.pdf` is absent, so the "Download CV" button 404s.

## Deployment

Deploys to Vercel with no configuration. Set `RESEND_API_KEY` and
`CONTACT_TO_EMAIL` as project environment variables — `.env.local` is not
committed.
