import { getTranslations } from "next-intl/server";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { projects } from "@/data/projects";
import { ProjectsGrid } from "./ProjectsGrid";

export async function Projects() {
  const t = await getTranslations("Projects");

  return (
    <Section id="projects">
      <SectionHeading index="03" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <ProjectsGrid projects={projects} />
    </Section>
  );
}
