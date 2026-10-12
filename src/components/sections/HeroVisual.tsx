import { Logo } from "@/components/ui/Logo";

// Static visual shown before the particle scene loads, or instead of it without WebGL / with reduced motion.
export function HeroVisual() {
  return (
    <div className="relative grid size-full place-items-center">
      <div
        aria-hidden
        className="absolute inset-[6%] animate-spin-slow rounded-full border border-dashed border-border-strong/70"
      />
      <div
        aria-hidden
        className="absolute inset-[18%] animate-spin-slow rounded-full [animation-direction:reverse] [background:conic-gradient(from_0deg,transparent_0deg,var(--color-brand-orange)_60deg,transparent_120deg,transparent_200deg,var(--color-brand-pink)_260deg,transparent_320deg)] [mask:radial-gradient(farthest-side,transparent_calc(100%-1.5px),#000_calc(100%-1px))]"
      />
      <div className="relative grid aspect-square w-[58%] animate-float place-items-center rounded-[2rem] border border-border/80 bg-surface/70 shadow-[0_30px_80px_-20px_rgba(248,101,224,0.35)] backdrop-blur-md">
        <Logo preload className="w-[72%]" />
        <span className="absolute -top-3 left-6 rounded-full border border-border bg-bg px-2.5 py-0.5 font-mono text-[10px] text-subtle sm:text-xs">
          &lt;dev /&gt;
        </span>
      </div>
    </div>
  );
}
