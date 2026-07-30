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
| `/projects/[slug]` | Case study — built per project, SSG |

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
│   ├── case-study/          Panel shell, hero, content blocks, closing
│   ├── ui/                  shadcn primitives
│   ├── contact-form.tsx     Client component: form state + validation display
│   ├── project-row.tsx      One project on the /projects index
│   ├── site-header.tsx      Sticky nav, blurs on scroll
│   ├── site-footer.tsx
│   ├── section-label.tsx    The "—— WHAT I DO" eyebrow
│   └── wordmark.tsx         Shared by header and footer
└── lib/
    ├── site.ts              All copy, plus the canonical `projects` list
    ├── case-studies.ts      Long-form case-study content, keyed by slug
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

**The case study runs three surface levels.** Page ground (`bg-muted`), section
panel (`bg-background`), card inside a panel (`bg-card`) — three ascending steps
the token set already provides in both palettes, so the dark blocks need no
special-casing.

**Unfilled project fields render nothing rather than something broken.**
`role`, `liveUrl`, `repoUrl` and `stack` are guarded at every use site, so a
half-filled entry is publishable and the links appear on their own once the
strings are supplied. No placeholder `#` hrefs to remember to swap out.

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

## Known gaps

Nothing here renders broken — every one of these is a guarded field that simply
shows nothing until it's filled in.

- **The "Running in the real world" traction block is switched off.** Its
  `stats` entries are commented out in `case-studies.ts`, and `StandsBlock`
  returns `null` on an empty array, so the section drops out of the page
  entirely. The heading, note and footnote are still there: uncomment the four
  entries and fill in each `value` to bring it back.
- **`repoUrl` is empty on all three projects**, so no "GitHub" button renders.
  `liveUrl` is set for Cradlen only — Homely and Pegasus show no "Visit live
  site" button until theirs land.
- **`role` is empty on all three.** Not used on the index; it's there for the
  case-study pages.
- **Only Cradlen has a case study.** Homely and Pegasus link to the `/projects`
  index instead, and `/projects/homely` correctly 404s. Adding one means an
  entry in `case-studies.ts` plus `caseStudy: true`.
- **Homely and Pegasus have no `summary`**, so the home page's large featured
  card would fall back to their one-line tagline if either were made featured.
- `public/cv.pdf` is absent, so the "Download CV" button 404s.

## Deployment

Deploys to Vercel with no configuration. Set `RESEND_API_KEY` and
`CONTACT_TO_EMAIL` as project environment variables — `.env.local` is not
committed.
