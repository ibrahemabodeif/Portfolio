export const site = {
  name: "ibrahem.abodeif",
  nav: [
    { label: "Work", href: "#work" },
    { label: "About", href: "#about" },
    { label: "Contact", href: "#contact" },
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
    secondaryCta: { label: "More about me", href: "#about" },
  },
  work: {
    label: "Selected work",
    heading: "Products I've shipped.",
    allProjects: { label: "All projects", href: "/projects" },
    // Screenshots live in public/projects/ — they 404 until the files are added.
    featured: {
      label: "Featured · SaaS I run in production",
      name: "Cradlen",
      body: "Clinic management & EMR software for women's health. It turns care into one continuous patient journey — every visit, exam and prescription on a single unified record, from first antenatal visit to delivery. Bilingual, RTL-ready, role-based access.",
      stack: ["Next.js", "Nest.js", "TypeScript", "PostgreSQL", "Neon"],
      image: "/projects/cradlen.png",
      imageAlt:
        "Cradlen landing page beside a patient journey timeline in the app",
      href: "/projects/cradlen",
    },
    projects: [
      {
        category: "Marketplace",
        name: "Homely",
        body: "A two-sided marketplace for short-stay rentals.",
        image: "/projects/homely.png",
        imageAlt: "Homely home page with a stay search over a valley photo",
        href: "/projects/homely",
      },
      {
        category: "E-commerce platform",
        name: "Pegasus",
        body: "A full store — storefront + admin dashboard, end to end.",
        image: "/projects/pegasus.png",
        imageAlt: "Pegasus storefront showing a product collection grid",
        href: "/projects/pegasus",
      },
    ],
    cta: {
      heading: "Have a product in mind?",
      note: "From idea to shipped — end to end.",
      action: { label: "Get in touch", href: "#contact" },
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
