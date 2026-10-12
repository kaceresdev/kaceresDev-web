"use client";

import type { ReactNode } from "react";
import { ReactLenis } from "lenis/react";
import { MotionConfig, useReducedMotion } from "motion/react";
import "lenis/dist/lenis.css";

export function MotionProviders({ children }: { children: ReactNode }) {
  const reduced = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      {reduced ? (
        children
      ) : (
        <ReactLenis root options={{ lerp: 0.1, anchors: true, autoRaf: true }}>
          {children}
        </ReactLenis>
      )}
    </MotionConfig>
  );
}
