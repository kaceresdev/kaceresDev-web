import type { MetadataRoute } from "next";
import { profile } from "@/data/profile";
import { routing } from "@/i18n/routing";

export default function sitemap(): MetadataRoute.Sitemap {
  const languages = Object.fromEntries(routing.locales.map((locale) => [locale, `${profile.siteUrl}/${locale}`]));

  return routing.locales.map((locale) => ({
    url: `${profile.siteUrl}/${locale}`,
    changeFrequency: "monthly",
    priority: locale === routing.defaultLocale ? 1 : 0.8,
    alternates: { languages },
  }));
}
