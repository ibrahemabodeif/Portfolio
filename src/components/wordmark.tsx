import { cn } from "@/lib/utils";
import { site } from "@/lib/site";

// Split so the separating dot can carry the accent colour.
const [firstName, lastName] = site.name.split(".");

function Wordmark({ className }: { className?: string }) {
  return (
    <span className={cn("font-semibold tracking-normal", className)}>
      {firstName}
      <span className="text-primary">.</span>
      {lastName}
    </span>
  );
}

export { Wordmark };
