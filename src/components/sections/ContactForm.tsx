"use client";

import type { FormEvent } from "react";
import { useTranslations } from "next-intl";
import { Send } from "lucide-react";
import { Button } from "@/components/ui/Button";

const fieldClass =
  "w-full rounded-xl border border-border bg-bg/60 px-4 py-3 text-sm text-fg placeholder:text-subtle transition-colors duration-300 focus:border-brand-orange/60 focus:outline-none focus-visible:outline-none";

interface ContactFormProps {
  email: string;
  ownerName: string;
}

export function ContactForm({ email, ownerName }: ContactFormProps) {
  const t = useTranslations("Contact.form");

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "");
    const from = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(t("subject", { name: ownerName }));
    const body = encodeURIComponent(`${message}\n\n— ${name} (${from})`);
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  }

  return (
    <form onSubmit={onSubmit} className="grid gap-4">
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
      <Button type="submit" size="lg" className="mt-2 sm:justify-self-start">
        {t("submit")}
        <Send className="size-4 transition-transform duration-300 group-hover:translate-x-0.5" />
      </Button>
    </form>
  );
}
