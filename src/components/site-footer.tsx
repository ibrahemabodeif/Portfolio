import Link from "next/link";

import { site } from "@/lib/site";
import { Wordmark } from "@/components/wordmark";

function SiteFooter() {
  // Static page, so this bakes in at build time and refreshes on each deploy.
  const year = new Date().getFullYear();

  return (
    <footer className="dark bg-background text-foreground">
      <div className="mx-auto w-full max-w-6xl px-6 md:px-8">
        <div className="flex flex-col gap-4 border-t border-border py-8 sm:flex-row sm:items-center sm:justify-between">
          <Link
            href="/"
            className="w-fit rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background"
          >
            <Wordmark className="text-[15px]" />
          </Link>
          <p className="text-sm text-muted-foreground">
            © {year} {site.footer.owner} — {site.footer.tagline}
          </p>
        </div>
      </div>
    </footer>
  );
}

export { SiteFooter };
