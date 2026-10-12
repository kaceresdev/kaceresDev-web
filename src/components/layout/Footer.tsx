import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { ArrowUp } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Container } from "@/components/ui/Container";
import { Logo } from "@/components/ui/Logo";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { profile } from "@/data/profile";

async function getBuildYear() {
  "use cache";
  return new Date().getFullYear();
}

export async function Footer() {
  const t = await getTranslations("Footer");
  const year = await getBuildYear();

  return (
    <footer className="relative border-t border-border/70">
      <div aria-hidden className="absolute inset-x-0 -top-px mx-auto h-px max-w-3xl bg-gradient-brand opacity-40" />
      <Container className="flex flex-col items-center gap-8 py-12 sm:flex-row sm:justify-between">
        <div className="flex flex-col items-center gap-3 sm:items-start">
          <Logo className="h-8" />
          <p className="text-center text-sm text-subtle sm:text-left">
            © {year} {profile.name}. {t("rights")}
          </p>
          <p className="flex flex-wrap items-center justify-center gap-x-1.5 gap-y-1 text-xs text-subtle sm:justify-start">
            <span>{t("builtWith")}</span>
            <span className="inline-flex items-center gap-1.5">
              <Image
                src="/brand/logo-mark-gray.webp"
                alt=""
                width={40}
                height={25}
                className="h-5 w-auto opacity-80"
              />
              KaceresDev
            </span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <SocialLinks />
          <Magnetic strength={0.4}>
            <a
              href="#top"
              aria-label={t("backToTop")}
              title={t("backToTop")}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface/60 text-muted transition-colors duration-300 hover:border-border-strong hover:text-fg"
            >
              <ArrowUp className="size-4" />
            </a>
          </Magnetic>
        </div>
      </Container>
    </footer>
  );
}
