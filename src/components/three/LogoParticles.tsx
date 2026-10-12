"use client";

import { useEffect, useLayoutEffect, useMemo, useRef, useState } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { AdditiveBlending, MathUtils, type Group, type ShaderMaterial } from "three";
import { sampleLogo, type ParticleData } from "./sampleLogo";
import { fragmentShader, vertexShader } from "./shaders";

const INTRO_DURATION = 2.4;
const CLICK_DURATION = 0.45;

interface PointerState {
  x: number;
  y: number;
  active: boolean;
  clickX: number;
  clickY: number;
  /** Monotonic token bumped on each click so the scene can reset the impulse. */
  clickId: number;
}

function clickEnvelope(age: number) {
  if (age <= 0 || age >= CLICK_DURATION) return 0;
  const t = age / CLICK_DURATION;
  // Quick outward push, then a snappy return.
  if (t < 0.18) return Math.sin((t / 0.18) * (Math.PI / 2));
  const rest = (t - 0.18) / 0.82;
  return Math.pow(1 - rest, 2.2);
}

function Particles({
  data,
  pointer,
  visible,
}: {
  data: ParticleData;
  pointer: React.RefObject<PointerState>;
  visible: boolean;
}) {
  const group = useRef<Group>(null);
  const material = useRef<ShaderMaterial>(null);
  const { viewport, gl } = useThree();
  const elapsed = useRef(0);
  const clickStart = useRef(-99);
  const lastClickId = useRef(0);

  const uniforms = useMemo(
    () => ({
      uTime: { value: 0 },
      uProgress: { value: 0 },
      uMouse: { value: [99, 99] },
      uMouseStrength: { value: 0 },
      uRadius: { value: 0.6 },
      uClick: { value: [99, 99] },
      uClickStrength: { value: 0 },
      uClickRadius: { value: 0.95 },
      uPixelRatio: { value: Math.min(gl.getPixelRatio(), 2) },
      uSize: { value: 8 },
    }),
    [gl],
  );

  // Replay the center-burst intro whenever the scene re-enters the viewport.
  useLayoutEffect(() => {
    if (!visible) return;
    elapsed.current = 0;
    clickStart.current = -99;
    if (material.current) {
      material.current.uniforms.uProgress.value = 0;
      material.current.uniforms.uClickStrength.value = 0;
    }
  }, [visible]);

  useFrame((_, rawDelta) => {
    if (!material.current) return;
    const u = material.current.uniforms as typeof uniforms;
    const delta = Math.min(rawDelta, 0.1);
    elapsed.current += delta;
    const time = elapsed.current;
    u.uTime.value = time;
    u.uProgress.value = Math.min(time / INTRO_DURATION, 1);

    const { x, y, active, clickX, clickY, clickId } = pointer.current;
    const targetX = (x * viewport.width) / 2;
    const targetY = (y * viewport.height) / 2;
    const mouse = u.uMouse.value;
    const ease = 1 - Math.exp(-delta * 8);
    mouse[0] = mouse[0] > 50 ? targetX : MathUtils.lerp(mouse[0], targetX, ease);
    mouse[1] = mouse[1] > 50 ? targetY : MathUtils.lerp(mouse[1], targetY, ease);
    u.uMouseStrength.value = MathUtils.lerp(u.uMouseStrength.value, active ? 1 : 0, 1 - Math.exp(-delta * 4));

    if (clickId !== lastClickId.current) {
      lastClickId.current = clickId;
      clickStart.current = time;
      u.uClick.value = [(clickX * viewport.width) / 2, (clickY * viewport.height) / 2];
    }
    u.uClickStrength.value = clickEnvelope(time - clickStart.current);

    if (group.current) {
      const g = group.current;
      g.rotation.y = MathUtils.lerp(g.rotation.y, active ? x * 0.35 : Math.sin(time * 0.3) * 0.12, ease * 0.4);
      g.rotation.x = MathUtils.lerp(g.rotation.x, active ? -y * 0.2 : Math.cos(time * 0.25) * 0.06, ease * 0.4);
    }
  });

  return (
    <group ref={group}>
      <points>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[data.positions, 3]} />
          <bufferAttribute attach="attributes-aStart" args={[data.starts, 3]} />
          <bufferAttribute attach="attributes-aColor" args={[data.colors, 3]} />
          <bufferAttribute attach="attributes-aRandom" args={[data.randoms, 1]} />
          <bufferAttribute attach="attributes-aSize" args={[data.sizes, 1]} />
        </bufferGeometry>
        <shaderMaterial
          ref={material}
          uniforms={uniforms}
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          transparent
          depthWrite={false}
          blending={AdditiveBlending}
        />
      </points>
    </group>
  );
}

function toLocalPointer(el: HTMLElement, clientX: number, clientY: number) {
  const rect = el.getBoundingClientRect();
  const x = ((clientX - rect.left) / rect.width) * 2 - 1;
  const y = -(((clientY - rect.top) / rect.height) * 2 - 1);
  return { x, y, near: Math.abs(x) < 1.25 && Math.abs(y) < 1.25 };
}

export default function LogoParticles({ onReady }: { onReady?: () => void }) {
  const container = useRef<HTMLDivElement>(null);
  const pointer = useRef<PointerState>({ x: 0, y: 0, active: false, clickX: 0, clickY: 0, clickId: 0 });
  const [data, setData] = useState<ParticleData | null>(null);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    let cancelled = false;
    const small = window.matchMedia("(max-width: 640px)").matches;
    sampleLogo("/brand/logo-mark.png", small ? 5000 : 10000, small ? 150 : 350)
      .then((result) => !cancelled && setData(result))
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const el = container.current;
    if (!el) return;

    const onMove = (event: PointerEvent) => {
      const { x, y, near } = toLocalPointer(el, event.clientX, event.clientY);
      pointer.current = { ...pointer.current, x, y, active: near };
    };
    const onDown = (event: PointerEvent) => {
      if (event.button !== 0) return;
      const { x, y, near } = toLocalPointer(el, event.clientX, event.clientY);
      if (!near) return;
      pointer.current = {
        ...pointer.current,
        x,
        y,
        active: true,
        clickX: x,
        clickY: y,
        clickId: pointer.current.clickId + 1,
      };
    };
    const onLeave = () => {
      pointer.current = { ...pointer.current, active: false };
    };
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.isIntersecting));

    observer.observe(el);
    window.addEventListener("pointermove", onMove, { passive: true });
    window.addEventListener("pointerdown", onDown, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    window.addEventListener("blur", onLeave);
    return () => {
      observer.disconnect();
      window.removeEventListener("pointermove", onMove);
      window.removeEventListener("pointerdown", onDown);
      document.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("blur", onLeave);
    };
  }, []);

  return (
    <div ref={container} className="absolute inset-0">
      {data && (
        <Canvas
          dpr={[1, 2]}
          camera={{ position: [0, 0, 5], fov: 40 }}
          gl={{ antialias: false, alpha: true, powerPreference: "high-performance" }}
          frameloop={visible ? "always" : "never"}
          onCreated={() => onReady?.()}
          aria-hidden
        >
          <Particles data={data} pointer={pointer} visible={visible} />
        </Canvas>
      )}
    </div>
  );
}
