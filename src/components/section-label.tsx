function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3">
      <span aria-hidden className="h-px w-7 bg-primary" />
      <span className="font-mono text-[11px] tracking-[0.2em] text-muted-foreground uppercase">
        {children}
      </span>
    </div>
  );
}

export { SectionLabel };
