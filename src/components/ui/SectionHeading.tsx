import { Reveal } from "@/components/motion/Reveal";
import { cn } from "@/lib/cn";

interface SectionHeadingProps {
  index: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  className?: string;
}

export function SectionHeading({ index, eyebrow, title, subtitle, className }: SectionHeadingProps) {
  return (
    <Reveal as="header" className={cn("mb-12 max-w-2xl sm:mb-16", className)}>
      <p className="mb-4 flex items-center gap-3 font-mono text-sm text-brand-orange">
        <span className="text-subtle">{index}</span>
        <span className="h-px w-8 bg-gradient-brand" aria-hidden />
        {eyebrow}
      </p>
      <h2 className="font-display text-3xl font-semibold tracking-tight text-balance sm:text-4xl md:text-5xl">
        {title}
      </h2>
      {subtitle && <p className="mt-5 text-base text-pretty text-muted sm:text-lg">{subtitle}</p>}
    </Reveal>
  );
}
