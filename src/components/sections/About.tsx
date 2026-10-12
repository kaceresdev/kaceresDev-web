import { getLocale, getTranslations } from "next-intl/server";
import { MapPin } from "lucide-react";
import { CountUp } from "@/components/motion/CountUp";
import { Reveal, Stagger, StaggerItem } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { getStats, profile } from "@/data/profile";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("");
}

async function getCurrentYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function About() {
  const locale = await getLocale();
  const t = await getTranslations("About");
  const stats = getStats(await getCurrentYear());

  return (
    <Section id="about">
      <SectionHeading index="01" eyebrow={t("eyebrow")} title={t("title")} />

      <div className="grid gap-10 lg:grid-cols-[1fr_20rem] lg:gap-16">
        <Stagger className="space-y-5 text-base leading-relaxed text-pretty text-muted sm:text-lg" stagger={0.12}>
          {profile.bio[locale].map((paragraph) => (
            <StaggerItem as="p" key={paragraph}>
              {paragraph}
            </StaggerItem>
          ))}
        </Stagger>

        <Reveal delay={0.15}>
          <Card className="flex flex-col items-center gap-5 p-8 text-center [--border-opacity:0.5]">
            {/* Replace with <Image> using your photo in /public when available */}
            <div className="grid size-32 place-items-center rounded-full bg-gradient-brand p-[2px]">
              <div className="grid size-full place-items-center rounded-full bg-surface-2 font-display text-4xl font-bold">
                <span className="text-gradient">{initials(profile.name)}</span>
              </div>
            </div>
            <div>
              <p className="font-display text-xl font-semibold">{profile.name}</p>
              <p className="mt-1 text-sm text-muted">{profile.role[locale]}</p>
            </div>
            <p className="inline-flex items-center gap-1.5 text-sm text-subtle">
              <MapPin className="size-4 text-brand-coral" />
              <span className="sr-only">{t("location")}:</span>
              {profile.location[locale]}
            </p>
          </Card>
        </Reveal>
      </div>

      <Stagger className="mt-14 grid grid-cols-2 gap-4 sm:mt-20 lg:grid-cols-4">
        {stats.map((stat) => (
          <StaggerItem key={stat.key}>
            <TiltCard className="h-full p-6 sm:p-8">
              <dl>
                <dt className="text-sm text-muted">{t(`stats.${stat.key}`)}</dt>
                <dd className="mt-3 font-display text-4xl font-bold sm:text-5xl">
                  <CountUp value={stat.value} className="text-gradient tabular-nums" />
                </dd>
              </dl>
            </TiltCard>
          </StaggerItem>
        ))}
      </Stagger>
    </Section>
  );
}
