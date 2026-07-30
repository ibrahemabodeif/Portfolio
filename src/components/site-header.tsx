"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { MenuIcon } from "lucide-react";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";
import { Wordmark } from "@/components/wordmark";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const focusRing =
  "rounded-sm outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background";

// A nav entry is a real route when it has nothing to scroll to.
const isRoute = (href: string) => !href.includes("#");

function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    // React bails out when the boolean is unchanged, so this does not
    // re-render on every scroll event — only when it crosses the threshold.
    const onScroll = () => setScrolled(window.scrollY > 8);

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 border-b transition-colors duration-300",
        scrolled
          ? "border-border bg-background/70 backdrop-blur-md"
          : "border-transparent bg-transparent"
      )}
    >
      <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-20 md:px-8">
        <Link href="/" className={cn("transition-colors", focusRing)}>
          <Wordmark className="text-lg md:text-xl" />
        </Link>

        {/* Fragment hrefs stay plain <a> on purpose: a router navigation would
            make Next suspend the smooth `scroll-behavior` (see
            data-scroll-behavior in layout.tsx), turning the in-page jump
            instant. Off the home page that costs a full load, which is the
            right trade for keeping the scroll smooth. Real routes have no
            fragment to scroll to, so they get client-side navigation. */}
        <nav className="hidden items-center gap-7 md:flex">
          {site.nav.map((item) => {
            const className = cn(
              "text-sm transition-colors hover:text-foreground",
              pathname === item.href
                ? "text-foreground"
                : "text-muted-foreground",
              focusRing
            );

            return isRoute(item.href) ? (
              <Link key={item.href} href={item.href} className={className}>
                {item.label}
              </Link>
            ) : (
              <a key={item.href} href={item.href} className={className}>
                {item.label}
              </a>
            );
          })}
          <Button
            nativeButton={false}
            render={<a href={site.cvHref} download />}
            className="h-9 bg-foreground px-4 text-[13px] text-background hover:bg-foreground/90"
          >
            Download CV
          </Button>
        </nav>

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden"
                aria-label="Open menu"
              >
                <MenuIcon />
              </Button>
            }
          />
          <DropdownMenuContent align="end" className="min-w-44">
            {site.nav.map((item) => (
              <DropdownMenuItem
                key={item.href}
                render={
                  isRoute(item.href) ? (
                    <Link href={item.href} />
                  ) : (
                    <a href={item.href} />
                  )
                }
              >
                {item.label}
              </DropdownMenuItem>
            ))}
            <DropdownMenuSeparator />
            <DropdownMenuItem render={<a href={site.cvHref} download />}>
              Download CV
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export { SiteHeader };
