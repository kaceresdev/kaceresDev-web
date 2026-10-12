import type { ComponentProps } from "react";
import { cn } from "@/lib/cn";
import { Container } from "./Container";

export function Section({ className, children, ...props }: ComponentProps<"section">) {
  return (
    <section className={cn("relative py-24 sm:py-32", className)} {...props}>
      <Container>{children}</Container>
    </section>
  );
}
