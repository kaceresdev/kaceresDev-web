import { getFormatter, getLocale, getTranslations } from "next-intl/server";
import { ArrowUpRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { Reveal } from "@/components/motion/Reveal";
import { TiltCard } from "@/components/motion/TiltCard";
import { TimelineTrack } from "@/components/motion/TimelineTrack";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { experience } from "@/data/experience";

export async function Experience() {
  const locale = await getLocale();
  const t = await getTranslations("Experience");
  const format = await getFormatter();

  const formatMonth = (value: string) =>
    format.dateTime(new Date(`${value}-01T00:00:00Z`), { month: "short", year: "numeric", timeZone: "UTC" });

  return (
    <Section id="experience">
      <SectionHeading index="02" eyebrow={t("eyebrow")} title={t("title")} />

      <TimelineTrack className="relative ml-1.5 sm:ml-3">
        <ol className="border-l border-border">
          {experience.map((job, i) => (
            <Reveal as="li" key={`${job.company}-${job.start}`} className="relative pb-12 pl-8 last:pb-0 sm:pl-12">
              <span
                aria-hidden
                className="absolute top-7 -left-[7px] z-20 grid size-3.5 place-items-center rounded-full border border-border-strong bg-bg"
              >
                <span
                  className={i === 0 ? "size-1.5 rounded-full bg-gradient-brand" : "size-1.5 rounded-full bg-subtle"}
                />
              </span>

              <TiltCard tilt={1.5} className="p-6 sm:p-8">
                <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:justify-between sm:gap-6">
                  <div>
                    <h3 className="font-display text-xl font-semibold sm:text-2xl">{job.role[locale]}</h3>
                    <p className="mt-1 text-muted">
                      {job.companyUrl ? (
                        <a
                          href={job.companyUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-1 text-brand-orange transition-colors hover:text-brand-amber"
                        >
                          {job.company}
                          <ArrowUpRight className="size-3.5" />
                        </a>
                      ) : (
                        <span className="text-brand-orange">{job.company}</span>
                      )}
                      <span className="text-subtle"> · {job.location[locale]}</span>
                    </p>
                  </div>
                  <p className="shrink-0 font-mono text-xs text-subtle capitalize sm:pt-2 sm:text-sm">
                    <time dateTime={job.start}>{formatMonth(job.start)}</time>
                    {" — "}
                    {job.end ? <time dateTime={job.end}>{formatMonth(job.end)}</time> : t("present")}
                  </p>
                </div>

                <p className="mt-5 text-pretty text-muted">{job.summary[locale]}</p>

                <ul className="mt-4 space-y-2">
                  {job.achievements[locale].map((achievement) => (
                    <li key={achievement} className="flex gap-3 text-sm text-pretty text-muted sm:text-base">
                      <span aria-hidden className="mt-2.5 h-px w-3 shrink-0 bg-gradient-brand" />
                      {achievement}
                    </li>
                  ))}
                </ul>

                <ul className="mt-6 flex flex-wrap gap-2">
                  {job.stack.map((tech) => (
                    <li key={tech}>
                      <Badge>{tech}</Badge>
                    </li>
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          ))}
        </ol>
      </TimelineTrack>
    </Section>
  );
}
