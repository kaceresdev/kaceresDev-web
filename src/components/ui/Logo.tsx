import Image from "next/image";
import { cn } from "@/lib/cn";

export function Logo({ className, preload = false }: { className?: string; preload?: boolean }) {
  return (
    <Image
      src="/brand/logo-mark.png"
      alt="KaceresDev"
      width={540}
      height={288}
      preload={preload}
      className={cn("h-auto w-auto", className)}
    />
  );
}
