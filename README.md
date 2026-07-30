# Portfolio — Ibrahem Abo Deif

Personal portfolio site for a full-stack developer. Single-page layout with a
working contact form backed by a Next.js Server Action.

**Sections:** hero → tech strip → what I do (`#services`) → who I am (`#about`)
→ selected work (`#work`) → contact (`#contact`) → footer.

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
│   ├── globals.css          Design tokens, dark palette, load-stagger keyframe
│   ├── layout.tsx           Fonts + metadata
│   └── page.tsx             Composes every section
├── components/
│   ├── sections/            One file per page section
│   ├── ui/                  shadcn primitives
│   ├── contact-form.tsx     Client component: form state + validation display
│   ├── site-header.tsx      Sticky nav, blurs on scroll
│   ├── site-footer.tsx
│   ├── section-label.tsx    The "—— WHAT I DO" eyebrow
│   └── wordmark.tsx         Shared by header and footer
└── lib/
    ├── site.ts              All copy and content, in one place
    ├── contact-action.ts    Server Action: validation + Resend
    └── utils.ts             cn()
```

## Notes on the implementation

**All copy lives in `src/lib/site.ts`.** Text edits never require touching JSX.

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

**Motion is deliberately minimal:** one page-load stagger on the hero, one
pulsing availability dot. Both respect `prefers-reduced-motion`.

## Known gaps

- `/projects` and `/projects/[slug]` routes don't exist yet — the four project
  links 404.
- `public/cv.pdf` is absent, so the "Download CV" button 404s.

## Deployment

Deploys to Vercel with no configuration. Set `RESEND_API_KEY` and
`CONTACT_TO_EMAIL` as project environment variables — `.env.local` is not
committed.
