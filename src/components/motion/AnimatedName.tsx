"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

// Each word gets its own slice of one wide gradient so the colors stay continuous
// across words (background-clip: text breaks on transformed descendants).
export function AnimatedName({ text, className }: { text: string; className?: string }) {
  const words = text.split(" ");
  const total = words.length;

  return (
    <span className={cn("flex flex-wrap gap-x-[0.25em]", className)}>
      <span className="sr-only">{text}</span>
      {words.map((word, i) => (
        <span key={`${word}-${i}`} aria-hidden className="block overflow-hidden pb-[0.08em]">
          <motion.span
            className="inline-block bg-gradient-brand bg-clip-text text-transparent"
            style={{
              backgroundSize: `${total * 100}% 100%`,
              backgroundPosition: total > 1 ? `${(i / (total - 1)) * 100}% 0` : "0 0",
            }}
            initial={{ y: "110%", rotate: 4 }}
            animate={{ y: "0%", rotate: 0 }}
            transition={{ duration: 0.9, delay: 0.15 + i * 0.12, ease: [0.22, 1, 0.36, 1] }}
          >
            {word}
          </motion.span>
        </span>
      ))}
    </span>
  );
}
