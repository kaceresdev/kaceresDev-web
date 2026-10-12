import { getTranslations } from "next-intl/server";
import { ArrowUpRight, Mail } from "lucide-react";
import { SocialIcon } from "@/components/icons/SocialIcon";
import { Reveal } from "@/components/motion/Reveal";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { profile } from "@/data/profile";
import { ContactForm } from "./ContactForm";
import { CopyEmailButton } from "./CopyEmailButton";

export async function Contact() {
  const t = await getTranslations("Contact");

  return (
    <Section id="contact" className="overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 left-1/2 h-[30rem] w-[56rem] -translate-x-1/2 translate-y-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(248,101,224,0.14),transparent)]"
      />

      <div className="relative grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:gap-16">
        <div>
          <SectionHeading
            index="05"
            eyebrow={t("eyebrow")}
            title={t("title")}
            subtitle={t("subtitle")}
            className="mb-10 sm:mb-10"
          />

          <Reveal delay={0.1} className="flex flex-col gap-3">
            <Card className="flex flex-wrap items-center justify-between gap-3 p-4 sm:p-5">
              <a
                href={`mailto:${profile.email}`}
                className="inline-flex min-w-0 items-center gap-3 font-medium transition-colors hover:text-brand-amber"
              >
                <span className="grid size-10 shrink-0 place-items-center rounded-full bg-gradient-brand text-bg">
                  <Mail className="size-4" />
                </span>
                <span className="truncate">{profile.email}</span>
              </a>
              <CopyEmailButton email={profile.email} />
            </Card>

            <ul className="grid gap-3 xs:grid-cols-2">
              {profile.socials.map((social) => (
                <li key={social.platform}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group flex items-center justify-between rounded-2xl border border-border bg-surface/70 p-4 text-sm transition-colors duration-300 hover:border-border-strong hover:bg-surface-2"
                  >
                    <span className="inline-flex items-center gap-3">
                      <SocialIcon platform={social.platform} className="size-4 text-muted" />
                      {social.label}
                    </span>
                    <ArrowUpRight className="size-4 text-subtle transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-fg" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>

        <Reveal delay={0.2} className="lg:self-end">
          <Card className="p-6 [--border-opacity:0.35] sm:p-8">
            <ContactForm email={profile.email} ownerName={profile.name} />
          </Card>
        </Reveal>
      </div>
    </Section>
  );
}
