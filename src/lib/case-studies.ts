/**
 * Long-form case studies, keyed by project slug.
 *
 * Kept out of site.ts because this content is per-project and long — site.ts is
 * the shared shell copy. A project only gets a /projects/<slug> route when it
 * has an entry here AND `caseStudy: true` in site.ts, so the two can never
 * disagree about whether a page exists.
 *
 * Each study declares an ordered `blocks` array rather than a fixed set of
 * named sections. Projects tell genuinely different stories — Cradlen leads
 * with a product thesis, Homely with performance, Pegasus with the two halves
 * of a store — so the sequence, and which blocks appear at all, is per-project
 * data. Adding a project means declaring its blocks; no type and no component
 * has to change unless it needs a genuinely new layout.
 */

/** Small inline diagrams inside the core-idea cards. Data, not images — these
 *  projects have one screenshot each, so these carry the section instead. */
export type Visual =
  | {
      kind: "timeline";
      steps: {
        label: string;
        note: string;
        state: "done" | "current" | "next";
      }[];
    }
  | { kind: "chips"; items: string[] }
  | { kind: "result"; label: string; state: string };

/** `value` empty falls back to `hint`, so a figure can be added later without
 *  the card changing shape. */
type Stat = { label: string; value: string; hint: string };

/* ── Blocks ───────────────────────────────────────────────────────────────
   One variant per layout. `kind` picks the component in blocks.tsx.        */

export type Block =
  /** Heading left; intro + stacked cards right. */
  | {
      kind: "problem";
      eyebrow: string;
      heading: string;
      /** Split so one word can be emphasised without putting markup in data.
       *  `emphasis`/`tail` are optional — omit both for a plain paragraph. */
      intro: { lead: string; emphasis?: string; tail?: string };
      cards: { title: string; body: string }[];
    }
  /** Numbered cards, each carrying a small inline diagram. */
  | {
      kind: "idea";
      eyebrow: string;
      heading: string;
      body: string;
      cards: { n: string; title: string; body: string; visual: Visual }[];
    }
  /** Stat cards and/or numbered cards. Empty both and the block drops out —
   *  the escape hatch for "no real numbers to publish yet". */
  | {
      kind: "metrics";
      eyebrow: string;
      heading: string;
      note: string;
      footnote: string;
      stats: Stat[];
      cards: { n: string; title: string; body: string }[];
    }
  /** Three cards, then a wider pair that carry their own eyebrows. */
  | {
      kind: "built";
      eyebrow: string;
      heading: string;
      note: string;
      cards: { title: string; body: string }[];
      wide: { eyebrow: string; title: string; body: string }[];
    }
  /** Two columns of arrow bullets — one per side of a two-sided product. */
  | {
      kind: "sides";
      eyebrow: string;
      heading: string;
      dark?: boolean;
      columns: {
        /** A shot of the surface, above the copy. Optional: Homely's two
         *  sides are the same product, so its columns are text-only. */
        image?: { src: string; width: number; height: number; alt: string };
        eyebrow: string;
        title: string;
        items: string[];
      }[];
    }
  /** Hairline-separated rows: title + mono tag left, body right. */
  | {
      kind: "decisions";
      eyebrow: string;
      heading: string;
      rows: { title: string; tag: string; body: string }[];
    };

/** One hero button. A study can have any number — Pegasus ships as two apps,
 *  so it links four places. */
export type HeroAction = {
  label: string;
  /** A literal URL. Omit it and `use` supplies one from site.ts instead, so a
   *  project's own links live in exactly one place. An action that resolves to
   *  neither renders nothing rather than a dead button. */
  href?: string;
  use?: "liveUrl" | "repoUrl";
};

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  intro: string;
  /** In order. The first renders filled, the rest outlined. */
  actions: HeroAction[];
  /** Cells with an empty `value` are skipped, so an unknown field drops out of
   *  the bar rather than showing a placeholder. */
  meta: { label: string; value: string }[];
  blocks: Block[];
  closing: {
    heading: string;
    body: string;
    action: { label: string; href: string };
    nextEyebrow: string;
    next: { slug: string; blurb: string };
    /** Some studies end on a dark panel; Cradlen ends light. */
    dark?: boolean;
  };
};

/* ── Cradlen ──────────────────────────────────────────────────────────────*/

const cradlen: CaseStudy = {
  slug: "cradlen",
  eyebrow: "SaaS I own and run in production",
  intro:
    "Clinic management and EMR software for women's health — built around a single idea: care is a journey, not a list of visits.",
  actions: [
    { label: "Visit Cradlen", use: "liveUrl" },
    { label: "Work with me", href: "/#contact" },
  ],
  meta: [
    { label: "Role", value: "Founder & sole engineer" },
    { label: "Domain", value: "OB-GYN clinics" },
    { label: "Status", value: "Live in production" },
    { label: "Stack", value: "Next.js · Nest.js · Neon" },
  ],

  blocks: [
    {
      kind: "problem",
      eyebrow: "The problem",
      heading: "Clinical software forgets the patient between visits.",
      intro: {
        lead: "Most clinic systems store visits as disconnected rows. For women's health that's actively harmful — pregnancy, surgical care and gynecological history are ",
        emphasis: "continuous",
        tail: ". A doctor opening a patient mid-pregnancy shouldn't have to reconstruct the story from scattered notes.",
      },
      cards: [
        {
          title: "History lives in the doctor's head, not the system",
          body: "Obstetric history, prior surgeries, allergies and screening status need to be visible in one glance — not buried across visit notes.",
        },
        {
          title: "Arabic clinics get second-class software",
          body: "Most EMRs are English-only or bolt RTL on as an afterthought, which makes daily clinical work slower for the staff actually using them.",
        },
        {
          title: "One clinic today, a network tomorrow",
          body: "Software that only fits a solo practice has to be replaced the moment the clinic opens a second branch.",
        },
      ],
    },

    {
      kind: "idea",
      eyebrow: "The core idea",
      heading:
        "The patient journey is the primary object — not the appointment.",
      body: "Every visit, examination and prescription attaches to one unified medical record. Open a patient and you pick up exactly where you left off — the system tells you what's next, not just what happened.",
      cards: [
        {
          n: "01",
          title: "Journey timeline",
          body: "Care tracks as stages — antenatal by trimester, surgical as pre-op through recovery — each with what's done and what's next.",
          visual: {
            kind: "timeline",
            steps: [
              {
                label: "First trimester",
                note: "dating scan done",
                state: "done",
              },
              {
                label: "Second trimester",
                note: "anomaly scan",
                state: "current",
              },
              { label: "Third trimester", note: "", state: "next" },
            ],
          },
        },
        {
          n: "02",
          title: "OB/GYN history summary",
          body: "Gravida/para notation, LMP, blood type, active problems, medical and surgical history, allergies, family, social and screening — structured, not free text.",
          visual: { kind: "chips", items: ["G2 T1 P0 A1 L1", "AB+", "LMP"] },
        },
        {
          n: "03",
          title: "Attachments & results",
          body: "Labs, imaging and documents attach to the record with a review state, so nothing sits unseen in an inbox.",
          visual: {
            kind: "result",
            label: "Complete blood count",
            state: "Reviewed",
          },
        },
      ],
    },

    {
      kind: "built",
      eyebrow: "What I built",
      heading: "A product, not a feature set.",
      note: "I own every layer of this — the clinical data model, the API, the interface, the marketing site, and the decisions about what not to build.",
      cards: [
        {
          title: "Bilingual by design",
          body: "Arabic and English as equals, RTL-ready throughout — layout, forms and clinical data entry all mirror properly rather than being patched.",
        },
        {
          title: "Role-based access",
          body: "Every staff member — doctor, nurse, reception, admin — sees exactly what their role needs and nothing more. Medical data demands this by default.",
        },
        {
          title: "Solo clinic → multi-branch",
          body: "The data model handles one practitioner or a branch network without a rewrite, so the software grows with the clinic instead of being outgrown.",
        },
      ],
      wide: [
        {
          eyebrow: "Onboarding",
          title: "Live in an afternoon",
          body: "Clinics don't have an IT department. Sign-up is self-serve — 14-day trial, no credit card — and a clinic can be seeing patients on it the same day.",
        },
        {
          eyebrow: "Beyond the app",
          title: "Marketing site, pricing & docs",
          body: "Positioning, landing page, pricing tiers and documentation are part of the product. Shipping the app is only half of shipping a SaaS.",
        },
      ],
    },

    {
      kind: "decisions",
      eyebrow: "Engineering decisions",
      heading: "Why it's built this way.",
      rows: [
        {
          title: "Relational, because medicine is relational",
          tag: "PostgreSQL · Neon",
          body: "Patients, journeys, visits, prescriptions and results are deeply interrelated and must stay consistent. A relational database with real constraints is the right tool — clinical data cannot be allowed to drift into an invalid state.",
        },
        {
          title: "Separate API, not route handlers",
          tag: "Nest.js",
          body: "Clinical logic, permissions and validation live in a structured backend rather than scattered across page handlers. It keeps authorization enforceable in one place and leaves room for future clients — mobile, integrations — without rewriting the core.",
        },
        {
          title: "Structured clinical fields over free text",
          tag: "Data model",
          body: "Obstetric history, allergies and problem lists are modeled as data, not notes. That's what makes a summary view possible at all — and what will make reporting and clinical insight possible later.",
        },
        {
          title: "Typed end to end",
          tag: "TypeScript",
          body: "One language and shared types across frontend and backend. In a domain where a wrong field is a clinical risk, catching it at compile time rather than in a clinic is worth the discipline.",
        },
      ],
    },

    {
      kind: "metrics",
      eyebrow: "Where it stands",
      heading: "Running in the real world.",
      note: "Traction is the most persuasive thing on this page — fill these in with your real figures.",
      footnote:
        "↑ Fill these in with real numbers before publishing — or delete the block if it's too early to share traction.",
      // Held back until there are real figures to show. With `stats` and
      // `cards` both empty the whole block drops out of the page. To bring it
      // back, uncomment these and fill in each `value` — the heading, note and
      // footnote above are kept so that's the only edit needed.
      stats: [
        // { label: "Clinics onboarded", value: "", hint: "Add your number" },
        // { label: "Patient records managed", value: "", hint: "Add your number" },
        // { label: "Uptime", value: "", hint: "Add measured uptime" },
        // { label: "Time to onboard a clinic", value: "", hint: "Add your real figure" },
      ],
      cards: [],
    },
  ],

  closing: {
    heading: "I build products, not just features.",
    body: "Cradlen is what I do when I own every decision. Bring me your product and you get the same thinking.",
    action: { label: "Get in touch", href: "/#contact" },
    nextEyebrow: "Next project",
    next: {
      slug: "homely",
      blurb:
        "A two-sided marketplace for short-stay rentals — guests book, hosts manage.",
    },
  },
};

/* ── Homely ───────────────────────────────────────────────────────────────*/

const homely: CaseStudy = {
  slug: "homely",
  eyebrow: "Marketplace · Two-sided",
  intro:
    "A short-stay rental marketplace where guests search and book, and hosts list and manage — built to stay fast as listings grow.",
  actions: [
    { label: "Visit live site", use: "liveUrl" },
    { label: "View code", use: "repoUrl" },
  ],
  meta: [
    // Empty until supplied — the cell is skipped rather than showing a
    // placeholder, and appears the moment a value lands here.
    { label: "Role", value: "Full-stack developer" },
    { label: "Timeline", value: "2 months" },
    { label: "Surfaces", value: "Guest + Host" },
    { label: "Stack", value: "Next.js · Supabase" },
  ],

  blocks: [
    {
      kind: "problem",
      eyebrow: "The challenge",
      heading: "Two audiences, one product.",
      intro: {
        lead: "A marketplace only works if both sides win. Guests need to find the right place in seconds across a growing catalog; hosts need to list, price and manage bookings without friction. Get either wrong and liquidity dies.",
      },
      cards: [
        {
          title: "Search that stays fast as the catalog grows",
          body: "Filtering by location, dates, price and amenities across thousands of listings — without the page crawling.",
        },
        {
          title: "No double bookings, ever",
          body: "Availability is the marketplace's core promise — concurrent requests can't be allowed to collide.",
        },
        {
          title: "Two roles, one clean codebase",
          body: "Guest and host surfaces share data but need separate permissions, dashboards and journeys.",
        },
      ],
    },

    {
      kind: "metrics",
      eyebrow: "Performance",
      heading: "Speed is a conversion feature.",
      note: "In a marketplace, every extra second on search is a lost booking. These are the numbers I optimized for.",
      footnote:
        "↑ Fill these in with your real measured numbers before publishing.",
      // Switched off until measured, same as Cradlen's traction block. The
      // three cards below carry the section on their own. Uncomment and fill
      // in each `value` to bring the stat row and its footnote back.
      stats: [
        // { label: "Lighthouse performance", value: "", hint: "Add your score" },
        // { label: "Largest Contentful Paint", value: "", hint: "Add your measured LCP" },
        // { label: "Search response time", value: "", hint: "Add your query timing" },
        // { label: "Listings supported", value: "", hint: "Add your catalog size" },
      ],
      cards: [
        {
          n: "01",
          title: "Server-rendered search",
          body: "Results render on the server with URL-driven filter state — shareable, SEO-indexable, and fast on first paint.",
        },
        {
          n: "02",
          title: "Indexed, paginated queries",
          body: "Queries indexed on the fields users actually filter by, and paginated rather than loading the whole catalog.",
        },
        {
          n: "03",
          title: "Image discipline",
          body: "Listing photos are the heaviest payload — responsive sizes, modern formats and lazy loading below the fold.",
        },
      ],
    },

    {
      kind: "sides",
      eyebrow: "What I built",
      heading: "Both sides of the marketplace.",
      columns: [
        {
          eyebrow: "Guest side",
          title: "Find and book in seconds",
          items: [
            "Room search with an advanced filter system",
            "Filter state in the URL — back button and sharing just work",
            "Property pages for comparing available options",
            "Booking flow with validated forms (Zod + React Hook Form)",
          ],
        },
        {
          eyebrow: "Host side",
          title: "List and manage without friction",
          items: [
            "Add and manage properties from an integrated host space",
            "Reservation management with detailed booking insights",
            "Profile management, fully responsive across devices",
            "Owner-scoped access so hosts only touch their own listings",
          ],
        },
      ],
    },

    {
      kind: "decisions",
      eyebrow: "Engineering decisions",
      heading: "Why it's built this way.",
      rows: [
        {
          title: "Availability as the source of truth",
          tag: "Data model",
          body: "Bookings validate against the availability record before they are confirmed, so two guests racing for the same night can't both succeed. Correctness here matters more than raw speed — a double booking costs trust you can't buy back.",
        },
        {
          title: "URL-driven filter state",
          tag: "Architecture",
          body: "Every filter lives in the query string rather than component state. Search results become server-rendered, indexable, shareable pages — which turns organic search into a real acquisition channel for a marketplace.",
        },
        {
          title: "Typed end to end",
          tag: "Maintainability",
          body: "TypeScript across the stack means a change to the listing model surfaces as a compile error rather than a production bug — cheap discipline that pays for itself the first time you refactor.",
        },
        {
          title: "Role-based access from day one",
          tag: "Security",
          body: "Guest, host and admin permissions were modeled before features were built, not bolted on. Retrofitting authorization into a live marketplace is one of the most expensive mistakes you can make.",
        },
      ],
    },
  ],

  closing: {
    dark: true,
    heading: "Building a marketplace?",
    body: "Two-sided products fail on the details — search, availability, permissions. I've shipped those. Let's talk about yours.",
    action: { label: "Get in touch", href: "/#contact" },
    nextEyebrow: "Next project",
    next: {
      slug: "pegasus",
      blurb:
        "A full e-commerce platform — storefront and admin dashboard over one database.",
    },
  },
};

/* ── Pegasus ──────────────────────────────────────────────────────────────*/

const pegasus: CaseStudy = {
  slug: "pegasus",
  eyebrow: "E-commerce platform · Storefront + admin",
  intro:
    "A commerce system built as two apps over one database — the storefront customers shop, and the admin panel the business runs on.",
  // Two apps means two live URLs and two repos. The storefront's pair lives in
  // site.ts because /projects reads it too; the dashboard's is only ever used
  // here, so it's written here.
  // An empty href renders no button at all, so the row is a clean 2-up until
  // the dashboard's two URLs are pasted in below — no placeholder, nothing to
  // remember to swap out.
  actions: [
    { label: "Visit storefront", use: "liveUrl" },
    { label: "Visit dashboard", href: "" }, // ← dashboard deployment
    { label: "Store code", use: "repoUrl" },
    { label: "Dashboard code", href: "" }, // ← dashboard repository
  ],
  meta: [
    { label: "Role", value: "Full-stack developer" },
    { label: "Surfaces", value: "Store + Dashboard" },
    { label: "Data", value: "One shared Supabase" },
    { label: "Stack", value: "React · Redux · Supabase" },
  ],

  blocks: [
    {
      kind: "problem",
      eyebrow: "The challenge",
      heading: "A store is only half the product.",
      intro: {
        lead: "Most e-commerce demos stop at a product grid and a fake checkout. A real store needs the other half: someone has to add products, watch inventory and understand whether sales are going up. Both halves read and write the same data, so they can never contradict each other. ",
        emphasis: "I built both.",
      },
      cards: [
        {
          title: "Shoppers need to find products fast",
          body: "Filtering and sorting have to feel instant, and cart state has to survive navigation without surprises.",
        },
        {
          title: "The business needs to see what's happening",
          body: "Orders and sales performance are useless as raw rows — they need to be visualized to be acted on.",
        },
        {
          title: "Two apps, one truth",
          body: "An edit in the dashboard has to show up in the storefront — no stale copies, no second source of truth to reconcile.",
        },
      ],
    },

    {
      kind: "sides",
      dark: true,
      eyebrow: "What I built",
      heading: "One platform, two surfaces.",
      columns: [
        {
          image: {
            src: "/projects/pegasus.png",
            width: 1864,
            height: 728,
            alt: "The Pegasus storefront, showing the collection hero and product grid",
          },
          eyebrow: "Storefront",
          title: "Browse, cart, checkout",
          items: [
            "Product browsing with filters and sorting",
            "Shopping cart and streamlined checkout flow",
            "User authentication and account dashboard",
            "User dashboard for account and order details",
          ],
        },
        {
          image: {
            src: "/projects/dashboard.png",
            width: 1920,
            height: 901,
            alt: "The Pegasus admin dashboard, showing sales totals, order status tiles and top products",
          },
          eyebrow: "Admin dashboard",
          title: "Manage, track, decide",
          items: [
            "Product management — add, edit and delete inventory",
            "Sales tracking with real-time data visualization",
            "Order monitoring against live product listings",
            "Authenticated admin access, responsive on any device",
          ],
        },
      ],
    },

    {
      kind: "decisions",
      eyebrow: "Engineering decisions",
      heading: "Why it's built this way.",
      rows: [
        {
          title: "Server state and client state are different problems",
          tag: "React Query + Redux",
          body: "The stack splits along that line: React Query owns server data — caching, refetching, invalidation — while Redux holds client state like the cart. Treating both as the same thing is where most e-commerce front ends get messy.",
        },
        {
          title: "One database, two clients",
          tag: "Supabase",
          body: "Storefront and dashboard are deployed separately but read from the same Supabase project — no syncing between them, no duplicated schema. A product edited in admin is the same record the customer sees, which is why the two apps can never drift apart.",
        },
        {
          title: "Authenticated on both sides",
          tag: "Access control",
          body: "Customers sign in to reach their own account and orders; the dashboard sits behind its own authentication so management tools aren't publicly reachable.",
        },
      ],
    },
  ],

  closing: {
    heading: "Selling something online?",
    body: "Storefront, admin, payments, data — I've built the whole loop. Let's build yours.",
    action: { label: "Get in touch", href: "/#contact" },
    nextEyebrow: "Next project",
    next: {
      slug: "cradlen",
      blurb:
        "Clinic management & EMR software for women's health — the SaaS I run in production.",
    },
  },
};

const caseStudies: Record<string, CaseStudy> = { cradlen, homely, pegasus };

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies[slug];
