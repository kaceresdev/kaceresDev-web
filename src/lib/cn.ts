import { extendTailwindMerge } from "tailwind-merge";

const twMerge = extendTailwindMerge<"border-gradient" | "text-gradient">({
  extend: {
    classGroups: {
      "font-family": ["font-display"],
      "bg-image": ["bg-gradient-brand", "bg-grid"],
      "border-gradient": ["border-gradient"],
      "text-gradient": ["text-gradient"],
    },
  },
});

export function cn(...classes: Array<string | false | null | undefined>) {
  return twMerge(classes.filter(Boolean).join(" "));
}
