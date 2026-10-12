import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

type BadgeProps = ComponentProps<"span"> & { tone?: "neutral" | "brand" };

export function Badge({ className, tone = "neutral", ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border px-3 py-1 font-mono text-xs",
        tone === "neutral" && "border-border bg-surface-2/70 text-muted",
        tone === "brand" && "border-brand-orange/30 bg-brand-orange/10 text-brand-amber",
        className,
      )}
      {...props}
    />
  );
}
