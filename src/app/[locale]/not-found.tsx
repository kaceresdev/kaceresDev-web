import { getTranslations } from "next-intl/server";
import { ArrowLeft } from "lucide-react";
import { buttonClasses } from "@/components/ui/Button";
import { Container } from "@/components/ui/Container";
import { Link } from "@/i18n/navigation";

export default async function NotFound() {
  const t = await getTranslations("NotFound");

  return (
    <Container className="flex min-h-dvh flex-col items-center justify-center gap-6 text-center">
      <p className="font-display text-8xl font-bold">
        <span className="text-gradient">404</span>
      </p>
      <h1 className="font-display text-3xl font-semibold">{t("title")}</h1>
      <p className="max-w-md text-muted">{t("description")}</p>
      <Link href="/" className={buttonClasses("secondary", "md")}>
        <ArrowLeft className="size-4" />
        {t("back")}
      </Link>
    </Container>
  );
}
