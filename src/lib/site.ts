/**
 * One project, one shape. The home page and the /projects index both read from
 * the single `projects` list below, so a description is only ever edited once.
 *
 * Fields the owner still has to supply are empty strings / empty arrays rather
 * than placeholder values. Every consumer guards on them, so a blank field
 * renders nothing at all instead of a dead link — and starts rendering the
 * moment it is filled in. Adding a project means adding an entry here; no
 * component changes.
 */
export type Project = {
  slug: string;
  name: string;
  /** Short kicker above the name, e.g. "Marketplace". */
  category: string;
  /** Exactly one project should carry this — it gets the large card on /. */
  featured?: boolean;
  /* Three lengths, because there are three differently-sized slots. Each falls
     back to the shorter one above it, so a new project only strictly needs a
     tagline. */
  /** One line — the small cards on the home page. */
  tagline: string;
  /** Medium — the large featured card on the home page. */
  summary: string;
  /** Full description — the /projects index. */
  overview: string;
  /** Not shown on the index — kept for the case-study pages. */
  role: string;
  liveUrl: string;
  repoUrl: string;
  /** Flip to true once /projects/<slug> exists, and the Case study button
   *  appears. Keeps the index free of links to routes that aren't built. */
  caseStudy?: boolean;
  stack: string[];
  image: string;
  /** Intrinsic pixel size of `image`. The case-study hero frames the shot at
   *  exactly this ratio so nothing is cropped — these screenshots differ in
   *  shape (1.65:1 to 2.6:1), and a fixed frame silently cuts the wide ones. */
  imageWidth: number;
  imageHeight: number;
  imageAlt: string;
};

export const projects: Project[] = [
  {
    slug: "cradlen",
    name: "Cradlen",
    category: "SaaS I run in production",
    featured: true,
    caseStudy: true,
    tagline: "Clinic management & EMR software for women's health.",
    summary:
      "Clinic management & EMR software for women's health. It turns care into one continuous patient journey — every visit, exam and prescription on a single unified record, from first antenatal visit to delivery. Bilingual, RTL-ready, role-based access.",
    overview:
      "Clinic management & EMR software for women's health clinics. It turns care into one continuous patient journey — every visit, exam and prescription on a single unified medical record, from the first antenatal visit to delivery. Built bilingual (Arabic & English, RTL-ready) with role-based access for every staff member, scaling from solo clinics to multi-branch networks.",
    role: "",
    liveUrl: "https://www.cradlen.com/en",
    repoUrl: "",
    stack: ["Next.js", "Nest.js", "TypeScript", "PostgreSQL", "Neon"],
    image: "/projects/cradlen.png",
    imageWidth: 1356,
    imageHeight: 823,
    imageAlt:
      "Cradlen landing page beside a patient journey timeline in the app",
  },
  {
    slug: "homely",
    name: "Homely",
    category: "Marketplace",
    caseStudy: true,
    tagline: "A two-sided marketplace for short-stay rentals.",
    summary: "",
    overview:
      "A two-sided marketplace for short-stay rentals — advanced search, smart filters and a clean browsing experience for guests, backed by a host dashboard for listing properties and managing availability and reservations end to end.",
    role: "",
    liveUrl: "https://homely-bookings.vercel.app",
    repoUrl: "https://github.com/ibrahemabodeif/Homely",
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Supabase", "Zod"],
    image: "/projects/homely.png",
    imageWidth: 1780,
    imageHeight: 680,
    imageAlt: "Homely home page with a stay search over a valley photo",
  },
  {
    slug: "pegasus",
    name: "Pegasus",
    category: "E-commerce platform",
    caseStudy: true,
    tagline: "A full store — storefront + admin dashboard, end to end.",
    summary: "",
    overview:
      "A full e-commerce platform built end to end — a storefront with product filtering, sorting, cart and checkout, paired with an admin dashboard for managing products and tracking sales through real-time charts. Storefront and back office as one complete system.",
    role: "",
    liveUrl: "https://pegasus-ecommerce.vercel.app/",
    repoUrl: "https://github.com/ibrahemabodeif/Pegasus-Ecommerce",
    stack: ["React.js", "Redux", "React Query", "Tailwind CSS", "Supabase"],
    image: "/projects/pegasus.png",
    imageWidth: 1864,
    imageHeight: 728,
    imageAlt: "Pegasus storefront showing a product collection grid",
  },
];

/** `?? projects[0]` keeps this total, so the home page can never render empty
 *  if the `featured` flag is dropped from every entry. */
export const featuredProject: Project =
  projects.find((project) => project.featured) ?? projects[0];

export const otherProjects: Project[] = projects.filter(
  (project) => project !== featuredProject,
);

/**
 * Where a project's name should link. Single source of truth so no component
 * can point at a case study that hasn't been built — flipping `caseStudy` on a
 * project is the only change needed to light up every link to it.
 */
export const projectHref = (project: Project): string =>
  project.caseStudy ? `/projects/${project.slug}` : "/projects";

export const site = {
  name: "ibrahem.abodeif",
  // Root-relative, not bare hashes: these have to resolve from /projects too,
  // where "#work" would point at nothing.
  nav: [
    { label: "Work", href: "/#work" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ],
  // Drop the real PDF at public/cv.pdf — this 404s until then.
  cvHref: "/cv.pdf",
  hero: {
    status: "Available for new projects",
    headline: {
      lead: "From idea to ",
      accent: "shipped product",
      tail: " — built to scale.",
    },
    lead: "Full-stack developer taking web apps & SaaS from first commit to production — end to end.",
    primaryCta: { label: "Explore projects", href: "#work" },
    secondaryCta: { label: "Get in touch", href: "#contact" },
  },
  // Deliberately a short, curated marquee for the strip under the hero — not
  // the full inventory. `aboutPage.stack.groups` is the complete, grouped list.
  techStack: [
    "Next.js",
    "Nest.js",
    "TypeScript",
    "Tailwind",
    "shadcn/ui",
    "PostgreSQL",
    "MongoDB",
    "SQL Server",
    "Prisma",
  ],
  whatIDo: {
    label: "What I do",
    heading: "Where do you want to take your product?",
    note: "Find your situation below — that's exactly where I come in.",
    cards: [
      {
        n: "01",
        title: "Building a new SaaS from scratch",
        body: "From an empty repo to a live product — architecture, auth, database and UI, shipped end to end.",
        cta: { label: "Start from zero", href: "#contact" },
      },
      {
        n: "02",
        title: "Scaling or rebuilding a slow app",
        body: "When your product is choking under load — I refactor, optimize and re-architect it to scale cleanly.",
        cta: { label: "Scale it up", href: "#contact" },
      },
      {
        n: "03",
        title: "Taking an MVP to production",
        body: "For when you're ready to grow seriously — hardening, testing and shipping your MVP into a real product.",
        cta: { label: "Go to production", href: "#contact" },
      },
    ],
  },
  whoIAm: {
    label: "Who I am",
    name: "Ibrahem Abo Deif",
    role: "Full-stack developer & SaaS owner",
    statement: {
      lead: "I don't just write code — I ",
      accent: "run my own SaaS in production",
      tail: ". I think like an owner, not just a coder — which means I care about the same things you do: shipping, reliability and growth.",
    },
    primaryCta: { label: "Let's build together", href: "#contact" },
    // This panel is the teaser; /about is the full version.
    secondaryCta: { label: "More about me", href: "/about" },
  },
  work: {
    label: "Selected work",
    heading: "Products I've shipped.",
    allProjects: { label: "All projects", href: "/projects" },
    // Prefix for the featured card's kicker; the rest comes from the project's
    // own `category`, so the two never drift apart.
    featuredPrefix: "Featured",
    cta: {
      heading: "Have a product in mind?",
      note: "From idea to shipped — end to end.",
      action: { label: "Get in touch", href: "#contact" },
    },
  },
  projectsPage: {
    label: "Projects",
    heading: "Things I've built.",
    lead: "A closer look at products I've shipped — the problem, what I built, and the stack behind it.",
    liveLabel: "Visit live site",
    caseStudyLabel: "Case study",
    repoLabel: "GitHub",
    cta: {
      heading: "Like what you see?",
      note: "Tell me about your product — I'll take it from idea to shipped.",
      // Root-relative: this lives on /projects, so a bare "#contact" would
      // point at nothing.
      action: { label: "Get in touch", href: "/#contact" },
    },
  },
  // The long version of `whoIAm`, which is only the teaser panel on the home
  // page. Everything here is unique to /about — nothing is duplicated from a
  // section above, and the closing CTA reads its heading from `contact` below.
  aboutPage: {
    label: "About",
    heading: "I build products, not just features.",
    lead: [
      "I'm Ibrahem — a full-stack developer who runs his own SaaS in production. I'm curious about how things work, and constantly looking for ways to make them more efficient, which is most of what engineering actually is.",
      "I work across the whole stack — interface, API and database — with a bias toward performance and SEO: fast, search-friendly software rather than software that merely works on my machine.",
    ],
    primaryCta: { label: "Work with me", href: "/contact" },
    cvCta: { label: "Download CV" },
    // Fills the slot a portrait would have taken, and answers the three things
    // a recruiter checks first.
    facts: [
      { label: "Based in", value: "Egypt" },
      { label: "Languages", value: "Arabic & English" },
      { label: "Status", value: "Available for new projects" },
    ],
    howIThink: {
      label: "How I think",
      heading: "Running my own product changed how I build other people's.",
      cards: [
        {
          n: "01",
          title: "I think like an owner",
          body: "When you pay for your own hosting and answer to your own users, you stop building features and start weighing what's worth building.",
        },
        {
          n: "02",
          title: "Shipped beats perfect",
          body: "Software in production teaches you things a staging environment never will. I'd rather get something real in front of users and iterate.",
        },
        {
          n: "03",
          title: "Performance is a feature",
          body: "Speed and SEO aren't a polish pass at the end — they're decisions about rendering, queries and payloads made while building.",
        },
      ],
    },
    stack: {
      label: "Stack",
      heading: "What I build with.",
      note: "TypeScript end to end, across the whole stack.",
      groups: [
        {
          title: "Frontend",
          items: [
            "Next.js",
            "React",
            "TypeScript",
            "Tailwind CSS",
            "shadcn/ui",
          ],
        },
        { title: "Backend", items: ["Nest.js", "Node.js", "REST APIs"] },
        {
          title: "Data",
          items: ["PostgreSQL", "Neon", "MongoDB", "Supabase", "SQL Server"],
        },
        {
          title: "Tooling",
          items: ["React Query", "Redux", "Zod", "React Hook Form", "Git"],
        },
      ],
    },
    experience: {
      label: "Experience",
      heading: "Where I've worked.",
      note: "The short version — what I own, and what it taught me.",
      // Newest first. Add a role by adding an entry; the page needs no change.
      roles: [
        {
          // Empty until the real start date is supplied. The row renders
          // without a date rather than showing a placeholder.
          period: "",
          title: "Founder & Full-Stack Developer",
          org: "Cradlen",
          body: "Building and running clinic management and EMR software for women's health clinics — the product, the code, and the decisions behind it.",
        },
      ],
    },
    cta: {
      // Heading comes from `contact.heading` — same promise, said once.
      note: "Whether you're starting a product or hiring for a team — I'd like to hear about it.",
      primary: { label: "Get in touch", href: "/contact" },
      secondary: { label: "See my work", href: "/projects" },
    },
  },
  contact: {
    label: "Available for new projects",
    heading: "Let's build something worth shipping.",
    email: "ibrahemabodeif@gmail.com",
    emailLabel: "Prefer email?",
    elsewhereLabel: "Elsewhere",
    links: [
      { label: "GitHub", href: "https://github.com/ibrahemabodeif" },
      { label: "LinkedIn", href: "https://www.linkedin.com/in/ibrahemabodeif" },
    ],
    note: "Based in Egypt, working with teams everywhere. Comfortable in Arabic and English.",
    form: {
      name: { label: "Name", placeholder: "Your name" },
      email: { label: "Email", placeholder: "you@company.com" },
      situation: {
        label: "What's your situation?",
        placeholder: "Select one…",
        // Appended to the situations derived from whatIDo.cards below.
        other: "Something else",
      },
      message: {
        label: "Message",
        placeholder: "Tell me a bit about the product…",
      },
      submit: "Send message",
      sending: "Sending…",
      success: "Thanks — your message is on its way. I'll reply shortly.",
    },
  },
  // Copy unique to /contact. Everything else that page shows — heading, badge,
  // email, links, note, form labels — is read from `contact` above, so the
  // page and the home section can never drift apart.
  contactPage: {
    lead: "Tell me where your product is and where you want it to go, and I'll come back with how I'd approach it.",
    emailNote: "Straight to my inbox — no forms, no gatekeeping.",
    formNote: "I read every message myself. No newsletter, no follow-up spam.",
    // A visitor who navigated here on purpose gets a more pointed prompt than
    // the one on the home section, which has to stay short.
    message: {
      label: "Tell me about it",
      placeholder:
        "What are you building, what's blocking you, and what does success look like?",
    },
    // Same facts as `contact.note`, phrased for a page where this is the only
    // thing standing in for a conversation.
    note: {
      lead: "Based in ",
      accent: "Egypt",
      tail: ", working with teams across time zones. Comfortable in Arabic and English.",
    },
    next: {
      label: "What happens next",
      heading: "No mystery, no sales funnel.",
      steps: [
        {
          n: "01",
          title: "You get an honest reply",
          body: "My first thoughts on your product — including if I think I'm the wrong fit for it.",
        },
        {
          n: "02",
          title: "We scope it together",
          body: "We agree on what ships first, what can wait, and what it realistically takes.",
        },
        {
          n: "03",
          title: "You see progress early",
          body: "Working software in front of you as it's built — not a black box that opens at the deadline.",
        },
      ],
    },
  },
  footer: {
    owner: "Ibrahem Abo Deif",
    tagline: "Full-stack developer",
  },
} as const;

/**
 * Situation options mirror the three service cards, so the dropdown can never
 * drift out of sync with what "What I do" advertises. The server action
 * validates submissions against this same list.
 */
export const situations: readonly string[] = [
  ...site.whatIDo.cards.map((card) => card.title),
  site.contact.form.situation.other,
];
