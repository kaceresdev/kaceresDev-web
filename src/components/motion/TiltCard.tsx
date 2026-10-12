"use client";

import { useRef, type PointerEvent, type ReactNode } from "react";
import { motion, useSpring } from "motion/react";
import { cardClasses } from "@/components/ui/Card";
import { cn } from "@/lib/cn";
import { useFinePointer } from "./useFinePointer";

const SPRING = { stiffness: 180, damping: 18, mass: 0.5 };

interface TiltCardProps {
  children: ReactNode;
  className?: string;
  /** Max rotation in degrees; 0 keeps only the spotlight. */
  tilt?: number;
}

export function TiltCard({ children, className, tilt = 6 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const enabled = useFinePointer();
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);

  function onMove(event: PointerEvent<HTMLDivElement>) {
    const el = ref.current;
    if (!el || !enabled) return;
    const rect = el.getBoundingClientRect();
    const px = (event.clientX - rect.left) / rect.width;
    const py = (event.clientY - rect.top) / rect.height;
    el.style.setProperty("--mx", `${px * 100}%`);
    el.style.setProperty("--my", `${py * 100}%`);
    if (tilt) {
      rotateY.set((px - 0.5) * tilt * 2);
      rotateX.set(-(py - 0.5) * tilt * 2);
    }
  }

  function reset() {
    rotateX.set(0);
    rotateY.set(0);
  }

  return (
    <motion.div
      ref={ref}
      onPointerMove={onMove}
      onPointerLeave={reset}
      style={{ rotateX, rotateY, transformPerspective: 1000 }}
      className={cardClasses(true, cn("group/card", className))}
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 rounded-[inherit] opacity-0 transition-opacity duration-500 group-hover/card:opacity-100"
        style={{
          background:
            "radial-gradient(420px circle at var(--mx, 50%) var(--my, 50%), rgba(248, 127, 156, 0.13), transparent 45%)",
        }}
      />
      {children}
    </motion.div>
  );
}
