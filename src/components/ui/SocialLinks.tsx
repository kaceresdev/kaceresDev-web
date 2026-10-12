import { SocialIcon } from "@/components/icons/SocialIcon";
import { Magnetic } from "@/components/motion/Magnetic";
import { profile } from "@/data/profile";
import { cn } from "@/lib/cn";

export function SocialLinks({ className }: { className?: string }) {
  return (
    <ul className={cn("flex items-center gap-2", className)}>
      {profile.socials.map((social) => (
        <li key={social.platform}>
          <Magnetic strength={0.4}>
            <a
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={social.label}
              className="grid size-10 place-items-center rounded-full border border-border bg-surface/60 text-muted transition-colors duration-300 hover:border-border-strong hover:text-fg"
            >
              <SocialIcon platform={social.platform} className="size-4" />
            </a>
          </Magnetic>
        </li>
      ))}
    </ul>
  );
}
