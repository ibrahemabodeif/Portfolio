import type { Metadata } from "next";
import { notFound } from "next/navigation";

import { site, projects } from "@/lib/site";
import { getCaseStudy } from "@/lib/case-studies";
import { CaseStudyHero } from "@/components/case-study/hero";
import { CaseStudyBlock } from "@/components/case-study/blocks";
import { ClosingBlock } from "@/components/case-study/next-project";

// Only the slugs below are served; anything else 404s without a runtime check.
export const dynamicParams = false;

export async function generateStaticParams() {
  return projects
    .filter((project) => project.caseStudy)
    .map((project) => ({ slug: project.slug }));
}

/** Both the page and the metadata need the same pair, and either may be
 *  missing, so the lookup lives in one place. */
function load(slug: string) {
  const project = projects.find((entry) => entry.slug === slug);
  const study = getCaseStudy(slug);
  return project && study ? { project, study } : null;
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const found = load(slug);
  if (!found) return {};

  return {
    title: `${found.project.name} — ${site.footer.owner}`,
    description: found.study.intro,
  };
}

export default async function CaseStudyPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const found = load(slug);
  // dynamicParams already blocks unknown slugs; this makes that guarantee
  // visible to TypeScript and covers a slug listed without a case study.
  if (!found) notFound();

  const { project, study } = found;

  return (
    // The darker ground the panels float on — the page's one structural idea.
    <div className="bg-muted">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-4 px-3 py-3 md:px-4 md:py-4">
        <CaseStudyHero project={project} study={study} />
        {/* Order and composition are per-project data, not a fixed sequence —
            each study tells a different story. Index in the key because the
            array is static content that never reorders at runtime. */}
        {study.blocks.map((block, index) => (
          <CaseStudyBlock key={`${block.kind}-${index}`} block={block} />
        ))}
        <ClosingBlock data={study.closing} />
      </div>
    </div>
  );
}
