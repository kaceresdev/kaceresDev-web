"use client";

import type { ReactNode } from "react";
import { motion, type Variants } from "motion/react";

const EASE = [0.22, 1, 0.36, 1] as const;

type Tag = "div" | "li" | "ul" | "ol" | "dl" | "p" | "header";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: EASE } },
};

interface RevealProps {
  children: ReactNode;
  as?: Tag;
  className?: string;
  delay?: number;
}

export function Reveal({ children, as = "div", className, delay = 0 }: RevealProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.2 }}
      variants={fadeUp}
      transition={{ delay }}
    >
      {children}
    </Component>
  );
}

interface StaggerProps extends RevealProps {
  stagger?: number;
}

export function Stagger({ children, as = "div", className, delay = 0, stagger = 0.08 }: StaggerProps) {
  const Component = motion[as];
  return (
    <Component
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.15 }}
      variants={{ hidden: {}, visible: { transition: { staggerChildren: stagger, delayChildren: delay } } }}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({ children, as = "div", className }: Omit<RevealProps, "delay">) {
  const Component = motion[as];
  return (
    <Component className={className} variants={fadeUp}>
      {children}
    </Component>
  );
}
