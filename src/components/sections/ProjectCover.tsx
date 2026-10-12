import Image from "next/image";
import type { Project } from "@/data/types";
import { cn } from "@/lib/cn";

const gradients = [
  "from-brand-amber/35 via-brand-orange/15 to-transparent",
  "from-brand-pink/35 via-brand-coral/15 to-transparent",
  "from-brand-orange/35 via-brand-pink/15 to-transparent",
];

export function ProjectCover({
  project,
  index,
  large = false,
  fit = "cover",
}: {
  project: Project;
  index: number;
  large?: boolean;
  fit?: "cover" | "contain";
}) {
  if (project.image) {
    return (
      <Image
        src={project.image}
        alt=""
        fill
        sizes={large ? "(min-width: 1024px) 50vw, 100vw" : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"}
        className={cn(
          "transition-transform duration-700",
          fit === "contain" ? "object-contain" : "object-cover group-hover:scale-105",
        )}
      />
    );
  }

  return (
    <div aria-hidden className="absolute inset-0 overflow-hidden bg-surface-2">
      <div className={cn("absolute inset-0 bg-radial-[at_20%_20%]", gradients[index % gradients.length])} />
      <div className="absolute inset-0 bg-grid [mask-image:linear-gradient(to_bottom,#000,transparent)] opacity-60" />
      <div className="absolute inset-0 flex flex-col justify-end p-6 transition-transform duration-700 group-hover:scale-105">
        <span className="font-mono text-xs text-subtle">
          ~/projects/<span className="text-brand-orange">{project.slug}</span>
        </span>
        <span
          className={cn(
            "mt-1 font-display font-bold tracking-tight text-fg/90",
            large ? "text-4xl sm:text-5xl" : "text-3xl",
          )}
        >
          {project.title}
        </span>
      </div>
    </div>
  );
}
