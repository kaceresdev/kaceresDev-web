"use client";

import { useEffect, type MouseEvent } from "react";
import { useLenis } from "lenis/react";
import { useTranslations } from "next-intl";
import { buttonClasses } from "@/components/ui/Button";
import { SocialLinks } from "@/components/ui/SocialLinks";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { navItems } from "./navItems";

interface MobileMenuProps {
  open: boolean;
  active: string | null;
  onNavigate: () => void;
}

export function MobileMenu({ open, active, onNavigate }: MobileMenuProps) {
  const t = useTranslations("Nav");
  const lenis = useLenis();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onNavigate();
    const media = window.matchMedia("(min-width: 48rem)");
    const onResize = () => media.matches && onNavigate();
    document.body.style.overflow = "hidden";
    lenis?.stop();
    window.addEventListener("keydown", onKey);
    media.addEventListener("change", onResize);
    return () => {
      document.body.style.overflow = "";
      lenis?.start();
      window.removeEventListener("keydown", onKey);
      media.removeEventListener("change", onResize);
    };
  }, [open, onNavigate, lenis]);

  function goTo(event: MouseEvent<HTMLAnchorElement>, id: string) {
    event.preventDefault();
    onNavigate();
    const target = document.getElementById(id);
    if (!target) return;
    requestAnimationFrame(() => {
      if (lenis) {
        lenis.start();
        lenis.scrollTo(target);
      } else {
        target.scrollIntoView();
      }
    });
  }

  return (
    <div
      id="mobile-menu"
      inert={!open}
      className={cn(
        "fixed inset-x-0 top-(--nav-height) bottom-0 z-40 bg-bg/95 backdrop-blur-xl transition-[opacity,visibility] duration-300 md:hidden",
        open ? "visible opacity-100" : "invisible opacity-0",
      )}
    >
      <div className="flex h-full flex-col justify-between px-5 pt-8 pb-10 sm:px-8">
        <ul className="flex flex-col gap-1">
          {navItems.map((item, i) => (
            <li
              key={item.id}
              className={cn(
                "transition-[opacity,translate] duration-500",
                open ? "translate-y-0 opacity-100" : "translate-y-3 opacity-0",
              )}
              style={{ transitionDelay: open ? `${80 + i * 50}ms` : "0ms" }}
            >
              <a
                href={`#${item.id}`}
                onClick={(e) => goTo(e, item.id)}
                className={cn(
                  "flex items-baseline gap-4 py-3 font-display text-3xl font-medium",
                  active === item.id ? "text-fg" : "text-muted",
                )}
              >
                <span className="font-mono text-sm text-brand-orange">0{i + 1}</span>
                {t(item.key)}
              </a>
            </li>
          ))}
        </ul>

        <div className="flex flex-col gap-6">
          <a href="#contact" onClick={(e) => goTo(e, "contact")} className={buttonClasses("primary", "lg", "w-full")}>
            {t("cta")}
          </a>
          <div className="flex items-center justify-between">
            <SocialLinks />
            <LocaleSwitcher />
          </div>
        </div>
      </div>
    </div>
  );
}
