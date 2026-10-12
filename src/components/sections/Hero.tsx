import { getLocale, getTranslations } from "next-intl/server";
import { ArrowDown, FileText } from "lucide-react";
import { AnimatedName } from "@/components/motion/AnimatedName";
import { Magnetic } from "@/components/motion/Magnetic";
import { Reveal } from "@/components/motion/Reveal";
import { ButtonLink } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";
import { HeroScene } from "./HeroScene";

export async function Hero() {
  const locale = await getLocale();
  const t = await getTranslations("Hero");

  return (
    <section className="relative flex min-h-dvh items-center overflow-hidden pt-(--nav-height)">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 bg-grid [mask-image:radial-gradient(ellipse_70%_60%_at_50%_40%,#000_30%,transparent_100%)]"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 left-1/2 h-[36rem] w-[60rem] -translate-x-1/2 rounded-full bg-[radial-gradient(closest-side,rgba(247,129,63,0.16),transparent)]"
      />

      <Container className="relative grid items-center gap-8 py-10 sm:py-16 lg:grid-cols-[1.1fr_1fr] lg:gap-8">
        <div className="order-2 flex flex-col items-start lg:order-1">
          {profile.available && (
            <Reveal delay={0.05}>
              <p className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-border bg-surface/70 px-3.5 py-1.5 text-xs text-muted backdrop-blur sm:text-sm">
                <span className="relative flex size-2">
                  <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                  <span className="relative inline-flex size-2 rounded-full bg-emerald-400" />
                </span>
                {t("available")}
              </p>
            </Reveal>
          )}

          <Reveal delay={0.1}>
            <p className="font-mono text-sm text-muted sm:text-base">{t("greeting")}</p>
          </Reveal>
          <h1 className="mt-3 font-display text-5xl leading-[1.02] font-bold tracking-tight text-balance xs:text-6xl md:text-7xl xl:text-8xl">
            <AnimatedName text={profile.name} />
          </h1>
          <Reveal delay={0.4}>
            <p className="mt-5 font-display text-2xl font-medium text-fg/90 sm:text-3xl">{profile.role[locale]}</p>
          </Reveal>
          <Reveal delay={0.5}>
            <p className="mt-6 max-w-xl text-base text-pretty text-muted sm:text-lg">{profile.tagline[locale]}</p>
          </Reveal>

          <Reveal delay={0.6} className="mt-10 flex w-full flex-col gap-3 xs:w-auto xs:flex-row">
            <Magnetic>
              <ButtonLink href="#projects" size="lg" className="w-full">
                {t("ctaProjects")}
                <ArrowDown className="size-4 transition-transform duration-300 group-hover:translate-y-0.5" />
              </ButtonLink>
            </Magnetic>
            <Magnetic>
              <ButtonLink
                href={profile.cvUrl[locale]}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="lg"
                className="w-full"
              >
                <FileText className="size-4" />
                {t("ctaCv")}
              </ButtonLink>
            </Magnetic>
          </Reveal>

          <Reveal delay={0.7}>
            <SocialLinks className="mt-10" />
          </Reveal>
        </div>

        <div className="order-1 lg:order-2">
          <HeroScene />
        </div>
      </Container>

      <a
        href="#about"
        className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs text-subtle transition-colors hover:text-fg md:flex"
      >
        {t("scroll")}
        <ArrowDown className="size-4 animate-bounce" />
      </a>
    </section>
  );
}
