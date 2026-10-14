"use client";

import { motion, useMotionValue, useSpring, type HTMLMotionProps } from "framer-motion";

const SPRING = { stiffness: 260, damping: 18, mass: 0.6 };

// 鼠标靠近时被轻轻"吸"过去，离开后弹回原位
export function MagneticButton({
  strength = 0.3,
  max = 10,
  style,
  onPointerMove,
  onPointerLeave,
  ...props
}: HTMLMotionProps<"button"> & { strength?: number; max?: number }) {
  const x = useSpring(useMotionValue(0), SPRING);
  const y = useSpring(useMotionValue(0), SPRING);
  const clamp = (v: number) => Math.max(-max, Math.min(max, v));

  return (
    <motion.button
      {...props}
      style={{ ...style, x, y }}
      onPointerMove={(e) => {
        if (e.pointerType === "mouse") {
          const rect = e.currentTarget.getBoundingClientRect();
          x.set(clamp((e.clientX - rect.left - rect.width / 2) * strength));
          y.set(clamp((e.clientY - rect.top - rect.height / 2) * strength));
        }
        onPointerMove?.(e);
      }}
      onPointerLeave={(e) => {
        x.set(0);
        y.set(0);
        onPointerLeave?.(e);
      }}
    />
  );
}
