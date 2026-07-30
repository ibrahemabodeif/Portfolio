import { site } from "@/lib/site";

function TechStrip() {
  return (
    <div className="rise border-y border-border" style={{ animationDelay: "300ms" }}>
      <div className="mx-auto flex w-full max-w-6xl flex-wrap items-center gap-x-7 gap-y-3 px-6 py-5 md:px-8">
        <span className="font-mono text-[10px] tracking-[0.18em] text-muted-foreground/70 uppercase">
          Tech stack
        </span>
        {site.techStack.map((tech) => (
          <span key={tech} className="text-[13px] font-medium">
            {tech}
          </span>
        ))}
      </div>
    </div>
  );
}

export { TechStrip };
