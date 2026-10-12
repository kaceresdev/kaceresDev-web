import { getLocale, getTranslations } from "next-intl/server";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { skillGroups } from "@/data/skills";

function Marquee({ items }: { items: string[] }) {
  return (
    <div
      aria-hidden
      className="relative mb-14 overflow-hidden [mask-image:linear-gradient(to_right,transparent,#000_12%,#000_88%,transparent)] py-2"
    >
      <div className="flex w-max animate-marquee gap-10">
        {[...items, ...items].map((item, i) => (
          <span key={i} className="flex items-center gap-10 font-display text-2xl font-medium text-subtle sm:text-3xl">
            {item}
            <span className="size-1.5 rounded-full bg-gradient-brand" />
          </span>
        ))}
      </div>
    </div>
  );
}

export async function Skills() {
  const locale = await getLocale();
  const t = await getTranslations("Skills");
  const all = skillGroups.flatMap((group) => group.skills);

  return (
    <Section id="skills">
      <SectionHeading index="04" eyebrow={t("eyebrow")} title={t("title")} subtitle={t("subtitle")} />
      <Reveal>
        <Marquee items={all} />
      </Reveal>

      <Stagger className="grid gap-5 sm:grid-cols-2">
        {skillGroups.map((group, i) => (
          <StaggerItem key={group.id}>
            <TiltCard tilt={3} className="h-full p-6 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <h3 className="font-display text-xl font-semibold">{group.title[locale]}</h3>
                <span className="font-mono text-xs text-subtle">{String(i + 1).padStart(2, "0")}</span>
              </div>
              <ul className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <li
                    key={skill}
                    className="rounded-lg border border-border bg-surface-2/60 px-3 py-1.5 text-sm text-fg/85 transition-colors duration-300 hover:border-brand-orange/50 hover:text-fg"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
