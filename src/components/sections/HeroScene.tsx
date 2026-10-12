"use client";

import { useState, useSyncExternalStore } from "react";
import dynamic from "next/dynamic";
import { cn } from "@/lib/cn";
import { HeroVisual } from "./HeroVisual";

const LogoParticles = dynamic(() => import("@/components/three/LogoParticles"), { ssr: false });

function subscribe(callback: () => void) {
  const media = window.matchMedia("(prefers-reduced-motion: reduce)");
  media.addEventListener("change", callback);
  return () => media.removeEventListener("change", callback);
}

function canRender3D() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return false;
  try {
    const canvas = document.createElement("canvas");
    return Boolean(canvas.getContext("webgl2") ?? canvas.getContext("webgl"));
  } catch {
    return false;
  }
}

let cached: boolean | null = null;
const getSnapshot = () => (cached ??= canRender3D());

export function HeroScene() {
  const enabled = useSyncExternalStore(
    (callback) => {
      const unsubscribe = subscribe(() => {
        cached = null;
        callback();
      });
      return unsubscribe;
    },
    getSnapshot,
    () => false,
  );
  const [ready, setReady] = useState(false);
  const showParticles = enabled && ready;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-72 sm:max-w-sm lg:max-w-none">
      <div
        aria-hidden
        className="absolute inset-[15%] animate-glow rounded-full bg-[radial-gradient(circle_at_30%_30%,rgba(255,174,0,0.5),transparent_60%),radial-gradient(circle_at_70%_70%,rgba(248,101,224,0.5),transparent_60%)] blur-3xl"
      />
      <div
        className={cn(
          "absolute inset-0 transition-[opacity,scale] duration-700",
          showParticles ? "pointer-events-none scale-90 opacity-0" : "opacity-100",
        )}
      >
        <HeroVisual />
      </div>
      {enabled && (
        <div className={cn("absolute inset-0 transition-opacity duration-700", ready ? "opacity-100" : "opacity-0")}>
          <LogoParticles onReady={() => setReady(true)} />
        </div>
      )}
    </div>
  );
}
