/**
 * Long-form case studies, keyed by project slug.
 *
 * Kept out of site.ts because this content is per-project and long — site.ts is
 * the shared shell copy. A project only gets a /projects/<slug> route when it
 * has an entry here AND `caseStudy: true` in site.ts, so the two can never
 * disagree about whether a page exists.
 */

/** Small inline diagrams inside the core-idea cards. Data, not images — the
 *  project only has one screenshot, so these carry the section instead. */
export type Visual =
  | {
      kind: "timeline";
      steps: { label: string; note: string; state: "done" | "current" | "next" }[];
    }
  | { kind: "chips"; items: string[] }
  | { kind: "result"; label: string; state: string };

export type CaseStudy = {
  slug: string;
  eyebrow: string;
  intro: string;
  /** Rendered only when the project has a liveUrl. */
  primaryLabel: string;
  secondary: { label: string; href: string };
  meta: { label: string; value: string }[];
  problem: {
    eyebrow: string;
    heading: string;
    /** Split so one word can be emphasised without putting markup in data. */
    intro: { lead: string; emphasis: string; tail: string };
    cards: { title: string; body: string }[];
  };
  idea: {
    eyebrow: string;
    heading: string;
    body: string;
    cards: { n: string; title: string; body: string; visual: Visual }[];
  };
  built: {
    eyebrow: string;
    heading: string;
    note: string;
    cards: { title: string; body: string }[];
    wide: { eyebrow: string; title: string; body: string }[];
  };
  decisions: {
    eyebrow: string;
    heading: string;
    rows: { title: string; tag: string; body: string }[];
  };
  stands: {
    eyebrow: string;
    heading: string;
    note: string;
    footnote: string;
    /** `value` empty falls back to `hint`. Empty the array to drop the block. */
    stats: { label: string; value: string; hint: string }[];
  };
  closing: {
    heading: string;
    body: string;
    action: { label: string; href: string };
    nextEyebrow: string;
    next: { slug: string; blurb: string };
  };
};

const cradlen: CaseStudy = {
  slug: "cradlen",
  eyebrow: "SaaS I own and run in production",
  intro:
    "Clinic management and EMR software for women's health — built around a single idea: care is a journey, not a list of visits.",
  primaryLabel: "Visit Cradlen",
  secondary: { label: "Work with me", href: "/#contact" },
  meta: [
    { label: "Role", value: "Founder & sole engineer" },
    { label: "Domain", value: "OB-GYN clinics" },
    { label: "Status", value: "Live in production" },
    { label: "Stack", value: "Next.js · Nest.js · Neon" },
  ],

  problem: {
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

  idea: {
    eyebrow: "The core idea",
    heading: "The patient journey is the primary object — not the appointment.",
    body: "Every visit, examination and prescription attaches to one unified medical record. Open a patient and you pick up exactly where you left off — the system tells you what's next, not just what happened.",
    cards: [
      {
        n: "01",
        title: "Journey timeline",
        body: "Care tracks as stages — antenatal by trimester, surgical as pre-op through recovery — each with what's done and what's next.",
        visual: {
          kind: "timeline",
          steps: [
            { label: "First trimester", note: "dating scan done", state: "done" },
            { label: "Second trimester", note: "anomaly scan", state: "current" },
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

  built: {
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

  decisions: {
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

  stands: {
    eyebrow: "Where it stands",
    heading: "Running in the real world.",
    note: "Traction is the most persuasive thing on this page — fill these in with your real figures.",
    footnote:
      "↑ Fill these in with real numbers before publishing — or delete the block if it's too early to share traction.",
    // Held back until there are real figures to show: `StandsBlock` renders
    // nothing on an empty array, so the whole section drops out of the page.
    // To bring it back, uncomment these and fill in each `value` — the heading,
    // note and footnote above are kept so that's the only edit needed.
    stats: [
      // { label: "Clinics onboarded", value: "", hint: "Add your number" },
      // { label: "Patient records managed", value: "", hint: "Add your number" },
      // { label: "Uptime", value: "", hint: "Add measured uptime" },
      // { label: "Time to onboard a clinic", value: "", hint: "Add your real figure" },
    ],
  },

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

const caseStudies: Record<string, CaseStudy> = { cradlen };

export const getCaseStudy = (slug: string): CaseStudy | undefined =>
  caseStudies[slug];
