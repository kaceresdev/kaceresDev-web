"use client";

import { useRef, type ReactNode } from "react";
import { motion, useScroll, useSpring } from "motion/react";

export function TimelineTrack({ children, className }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start 75%", "end 60%"] });
  const scaleY = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.4 });

  return (
    <div ref={ref} className={className}>
      <motion.span
        aria-hidden
        style={{ scaleY }}
        className="absolute top-0 left-0 z-10 h-full w-px origin-top bg-linear-to-b from-brand-amber via-brand-coral to-brand-pink"
      />
      {children}
    </div>
  );
}
