"use client";

import { useLocale, useTranslations } from "next-intl";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { cn } from "@/lib/cn";

export function LocaleSwitcher({ className }: { className?: string }) {
  const locale = useLocale();
  const t = useTranslations("Nav");

  return (
    <div
      role="group"
      aria-label={t("language")}
      className={cn(
        "flex items-center rounded-full border border-border bg-surface/60 p-1 font-mono text-xs",
        className,
      )}
    >
      {routing.locales.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href="/"
            locale={l}
            scroll={false}
            aria-current={active ? "true" : undefined}
            className={cn(
              "rounded-full px-2.5 py-1 uppercase transition-colors duration-300",
              active ? "bg-surface-2 text-fg" : "text-subtle hover:text-fg",
            )}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
