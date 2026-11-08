"use client";

import type { FormEvent } from "react";
import { useState } from "react";
import { useTranslations } from "next-intl";
import { CheckCircle2, Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors duration-300 focus:border-brand-orange/60 focus:outline-none focus-visible:outline-none";

type Status = "idle" | "loading" | "success" | "error";

export function ContactForm() {
  const t = useTranslations("Contact.form");
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget;
    const data = new FormData(form);

    setStatus("loading");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: String(data.get("name") ?? ""),
          email: String(data.get("email") ?? ""),
          message: String(data.get("message") ?? ""),
          website: String(data.get("website") ?? ""),
        }),
      });

      const result = (await response.json().catch(() => null)) as { ok?: boolean } | null;

      if (!response.ok || !result?.ok) {
        setStatus("error");
        return;
      }

      form.reset();
      setStatus("success");
    } catch {
      setStatus("error");
    }
  }

  return (
    <form onSubmit={onSubmit} className="relative grid gap-4">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -left-[9999px] top-auto h-0 w-0 overflow-hidden opacity-0"
      >
        <label>
          Website
          <input type="text" name="website" tabIndex={-1} autoComplete="off" />
        </label>
      </div>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="grid gap-2 text-sm text-muted">
          {t("name")}
          <input name="name" required autoComplete="name" placeholder={t("namePlaceholder")} className={fieldClass} />
        </label>
        <label className="grid gap-2 text-sm text-muted">
          {t("email")}
          <input
            name="email"
            type="email"
            required
            autoComplete="email"
            placeholder={t("emailPlaceholder")}
            className={fieldClass}
          />
        </label>
      </div>
      <label className="grid gap-2 text-sm text-muted">
        {t("message")}
        <textarea
          name="message"
          required
          rows={5}
          placeholder={t("messagePlaceholder")}
          className={`${fieldClass} resize-y`}
        />
      </label>
      <Button type="submit" size="lg" disabled={status === "loading"} className="mt-2 sm:justify-self-start">
        {status === "loading" ? t("sending") : t("submit")}
        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Button>

      {status === "success" && (
        <p
          role="status"
          className="flex items-start gap-3 rounded-xl border border-emerald-400/35 bg-emerald-500/15 px-4 py-3 text-sm font-medium text-emerald-300 shadow-[0_0_24px_-8px_rgba(52,211,153,0.45)]"
        >
          <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-emerald-400" aria-hidden />
          {t("success")}
        </p>
      )}
      {status === "error" && (
        <p role="alert" className="rounded-xl border border-brand-coral/35 bg-brand-coral/10 px-4 py-3 text-sm text-brand-coral">
          {t("error")}
        </p>
      )}
    </form>
  );
}
