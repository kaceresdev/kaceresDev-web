import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";

export function cardClasses(interactive = false, className?: string) {
  return cn(
    "border-gradient rounded-2xl border border-border bg-surface/70 [--border-opacity:0]",
    interactive &&
      "transition-[translate,background-color,border-color] duration-300 hover:-translate-y-1 hover:border-transparent hover:bg-surface-2/80 hover:[--border-opacity:0.8]",
    className,
  );
}

type CardProps = ComponentProps<"div"> & { interactive?: boolean };

export function Card({ className, interactive = false, ...props }: CardProps) {
  return <div className={cardClasses(interactive, className)} {...props} />;
}
