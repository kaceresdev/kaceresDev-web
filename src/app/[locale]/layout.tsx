import type { Metadata, Viewport } from "next";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getTranslations } from "next-intl/server";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CustomCursor } from "@/components/motion/CustomCursor";
import { ScrollProgress } from "@/components/motion/ScrollProgress";
import { MotionProviders } from "@/components/providers/MotionProviders";
import { profile } from "@/data/profile";
import { routing } from "@/i18n/routing";
import { fontVariables } from "@/lib/fonts";
import "../globals.css";

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale();
  const t = await getTranslations("Metadata");

  return {
    metadataBase: new URL(profile.siteUrl),
    title: {
      default: t("title"),
      template: `%s · ${profile.name}`,
    },
    description: t("description"),
    applicationName: profile.shortName,
    authors: [{ name: profile.name, url: profile.siteUrl }],
    creator: profile.name,
    keywords: ["Software Engineer", "Full-Stack", "Next.js", "React", "TypeScript", "Portfolio", profile.name],
    alternates: {
      canonical: `/${locale}`,
      languages: {
        ...Object.fromEntries(routing.locales.map((l) => [l, `/${l}`])),
        "x-default": `/${routing.defaultLocale}`,
      },
    },
    openGraph: {
      type: "website",
      locale: locale === "es" ? "es_ES" : "en_US",
      url: `/${locale}`,
      siteName: profile.shortName,
      title: t("title"),
      description: t("description"),
    },
    twitter: {
      card: "summary_large_image",
      title: t("title"),
      description: t("description"),
    },
  };
}

export const viewport: Viewport = {
  themeColor: "#07070a",
  colorScheme: "dark",
};

export default async function LocaleLayout({ children }: LayoutProps<"/[locale]">) {
  const locale = await getLocale();

  return (
    <html lang={locale} className={fontVariables}>
      <body className="min-h-dvh overflow-x-clip">
        <NextIntlClientProvider>
          <MotionProviders>
            <ScrollProgress />
            <CustomCursor />
            <Navbar />
            <main id="top">{children}</main>
            <Footer />
          </MotionProviders>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
