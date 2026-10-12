"use client";

import { useMemo, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { ArrowUpRight, Star } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Badge } from "@/components/ui/Badge";
import type { Project, ProjectCategory } from "@/data/types";
import { cn } from "@/lib/cn";
import { ProjectCover } from "./ProjectCover";

type Filter = ProjectCategory | "all";

function ProjectLinks({ project }: { project: Project }) {
  const t = useTranslations("Projects");
  const linkClass =
    "relative z-10 inline-flex items-center gap-1.5 text-sm text-muted transition-colors duration-300 hover:text-fg";

  return (
    <div className="flex items-center gap-5">
      {project.demoUrl && (
        <a href={project.demoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          {t("demo")}
          <ArrowUpRight className="size-4" />
        </a>
      )}
      {project.repoUrl && (
        <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className={linkClass}>
          <SocialIcon platform="github" className="size-4" />
          {t("code")}
        </a>
      )}
    </div>
  );
}

function StackList({ stack }: { stack: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {stack.map((tech) => (
        <li key={tech}>
          <Badge>{tech}</Badge>
        </li>
      ))}
    </ul>
  );
}

export function ProjectsGrid({ projects }: { projects: Project[] }) {
  const t = useTranslations("Projects");
  const locale = useLocale();
  const [filter, setFilter] = useState<Filter>("all");

  const featured = projects.find((p) => p.featured);
  const categories = useMemo(() => [...new Set(projects.map((p) => p.category))], [projects]);
  const visible = projects.filter((p) => p !== featured && (filter === "all" || p.category === filter));

  return (
    <>
      {featured && (
        <Reveal className="group/featured relative isolate mb-14">
          <div
            aria-hidden
            className="pointer-events-none absolute -inset-2 -z-10 rounded-[1.75rem] bg-gradient-brand opacity-0 blur-2xl transition-opacity duration-700 group-hover/featured:opacity-20"
          />
          <TiltCard
            tilt={2}
            className="group grid overflow-hidden bg-surface [--border-opacity:0.35] hover:bg-surface lg:grid-cols-2"
          >
            <div className="relative aspect-[16/10] w-full self-center overflow-hidden">
              <ProjectCover project={featured} index={0} large fit="contain" />
              <div
                aria-hidden
                className="pointer-events-none absolute inset-0 bg-linear-to-t from-surface to-transparent to-40% lg:bg-linear-to-l lg:to-30%"
              />
            </div>
            <div className="flex flex-col gap-5 p-6 sm:p-10">
              <div className="flex items-center gap-3">
                <Badge tone="brand">
                  <Star className="size-3" />
                  {t("featured")}
                </Badge>
                <span className="font-mono text-xs text-subtle">{featured.year}</span>
              </div>
              <h3 className="font-display text-3xl font-semibold tracking-tight sm:text-4xl">{featured.title}</h3>
              <p className="text-pretty text-muted sm:text-lg">{featured.description[locale]}</p>
              <StackList stack={featured.stack} />
              <div className="mt-auto pt-2">
                <ProjectLinks project={featured} />
              </div>
            </div>
          </TiltCard>
        </Reveal>
      )}

      <Reveal className="mb-8">
        <div role="group" aria-label={t("title")} className="flex flex-wrap gap-2">
          {(["all", ...categories] as Filter[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setFilter(value)}
              aria-pressed={filter === value}
              className={cn(
                "relative isolate rounded-full border px-4 py-1.5 text-sm transition-colors duration-300",
                filter === value
                  ? "border-transparent text-bg"
                  : "border-border bg-surface/60 text-muted hover:border-border-strong hover:text-fg",
              )}
            >
              {filter === value && (
                <motion.span
                  layoutId="project-filter-pill"
                  className="absolute inset-0 -z-10 rounded-full bg-fg"
                  transition={{ type: "spring", stiffness: 380, damping: 32 }}
                />
              )}
              {value === "all" ? t("all") : t(`categories.${value}`)}
            </button>
          ))}
        </div>
      </Reveal>

      <motion.ul layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {visible.map((project) => (
            <motion.li
              key={project.slug}
              layout
              initial={{ opacity: 0, scale: 0.96, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            >
              <TiltCard className="group flex h-full flex-col overflow-hidden bg-surface hover:bg-surface">
                <div className="relative aspect-[16/10] overflow-hidden">
                  <ProjectCover project={project} index={projects.indexOf(project)} />
                  <div aria-hidden className="absolute inset-0 bg-linear-to-t from-surface to-transparent to-35%" />
                </div>
                <div className="flex flex-1 flex-col gap-4 p-6">
                  <div className="flex items-center justify-between gap-3">
                    <h3 className="font-display text-xl font-semibold">{project.title}</h3>
                    <span className="font-mono text-xs text-subtle">{project.year}</span>
                  </div>
                  <p className="text-sm text-pretty text-muted">{project.description[locale]}</p>
                  <StackList stack={project.stack} />
                  <div className="mt-auto pt-2">
                    <ProjectLinks project={project} />
                  </div>
                </div>
              </TiltCard>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
    </>
  );
}
