import localFont from "next/font/local";

import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

const goodlyLogo = localFont({
  src: "../app/fonts/goodly-medium.otf",
  weight: "700",
  style: "normal",
  display: "swap",
});

// Split so the separating dot can carry the accent colour.
const [firstName, lastName] = site.name.split(".");

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn(goodlyLogo.className, "tracking-normal", className)}>
      {firstName}
      <span className="text-primary">.</span>
      {lastName}
    </span>
  );
}

export { Wordmark };
