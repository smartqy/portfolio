"use client";

import { useEffect, useRef } from "react";

// 跟随鼠标的柔和光晕：放在内容下方，带一点缓动；触屏设备不显示
export function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el || !window.matchMedia("(pointer: fine)").matches) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const target = { x: window.innerWidth / 2, y: window.innerHeight / 3 };
    const pos = { ...target };
    let frame = 0;

    const render = () => {
      const ease = reduceMotion ? 1 : 0.2;
      pos.x += (target.x - pos.x) * ease;
      pos.y += (target.y - pos.y) * ease;
      el.style.transform = `translate3d(${pos.x}px, ${pos.y}px, 0) translate(-50%, -50%)`;
      if (Math.abs(target.x - pos.x) > 0.1 || Math.abs(target.y - pos.y) > 0.1) {
        frame = requestAnimationFrame(render);
      } else {
        frame = 0;
      }
    };

    const onMove = (e: PointerEvent) => {
      target.x = e.clientX;
      target.y = e.clientY;
      el.style.opacity = "1";
      if (!frame) frame = requestAnimationFrame(render);
    };
    const onLeave = () => {
      el.style.opacity = "0";
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", onLeave);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", onLeave);
      cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div
      ref={ref}
      aria-hidden
      className="pointer-events-none fixed top-0 left-0 -z-10 size-40 rounded-full opacity-0 transition-opacity duration-500"
      style={{
        background: "radial-gradient(circle, var(--cursor-glow) 0%, transparent 70%)",
      }}
    />
  );
}
