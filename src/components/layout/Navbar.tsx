"use client";

import { useCallback, useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { Menu, X } from "lucide-react";
import { Magnetic } from "@/components/motion/Magnetic";
import { Logo } from "@/components/ui/Logo";
import { buttonClasses } from "@/components/ui/Button";
import { cn } from "@/lib/cn";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { MobileMenu } from "./MobileMenu";
import { navItems } from "./navItems";
import { useActiveSection } from "./useActiveSection";

const sectionIds = navItems.map((item) => item.id);

export function Navbar() {
  const t = useTranslations("Nav");
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const active = useActiveSection(sectionIds);
  const close = useCallback(() => setOpen(false), []);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={cn(
          "fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300",
          scrolled || open
            ? "border-b border-border/70 bg-bg/75 backdrop-blur-xl"
            : "border-b border-transparent bg-transparent",
        )}
      >
        <nav className="mx-auto flex h-(--nav-height) w-full max-w-6xl items-center justify-between px-5 sm:px-8">
          <a href="#top" aria-label={t("home")} className="shrink-0" onClick={close}>
            <Logo preload className="h-8 sm:h-9" />
          </a>

          <ul className="hidden items-center gap-1 md:flex">
            {navItems.map((item) => (
              <li key={item.id}>
                <a
                  href={`#${item.id}`}
                  className={cn(
                    "relative rounded-full px-3.5 py-2 text-sm transition-colors duration-300",
                    active === item.id ? "text-fg" : "text-muted hover:text-fg",
                  )}
                >
                  {t(item.key)}
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-x-3.5 -bottom-0.5 h-px origin-left bg-gradient-brand transition-transform duration-300",
                      active === item.id ? "scale-x-100" : "scale-x-0",
                    )}
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2 sm:gap-3">
            <LocaleSwitcher className="hidden sm:flex" />
            <Magnetic className="hidden md:inline-flex">
              <a href="#contact" className={buttonClasses("primary", "sm")}>
                {t("cta")}
              </a>
            </Magnetic>
            <button
              type="button"
              onClick={() => setOpen((v) => !v)}
              aria-expanded={open}
              aria-controls="mobile-menu"
              aria-label={open ? t("closeMenu") : t("openMenu")}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface/60 text-fg md:hidden"
            >
              {open ? <X className="size-5" /> : <Menu className="size-5" />}
            </button>
          </div>
        </nav>
      </header>
      <MobileMenu open={open} active={active} onNavigate={close} />
    </>
  );
}
