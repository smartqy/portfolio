"use client";

import { motion, useReducedMotion, useSpring } from "framer-motion";
import Image from "next/image";
import { useEffect, useRef } from "react";

const SPRING = { stiffness: 120, damping: 14, mass: 0.8 };

// 头像随鼠标方向轻微转头，像在看着访客
export function FollowAvatar({
  src,
  alt = "",
  size,
  className = "",
  intensity = 1,
  priority = false,
}: {
  src: string;
  alt?: string;
  size: number;
  className?: string;
  intensity?: number;
  priority?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const rotateX = useSpring(0, SPRING);
  const rotateY = useSpring(0, SPRING);
  const x = useSpring(0, SPRING);
  const y = useSpring(0, SPRING);

  useEffect(() => {
    if (reduceMotion || !window.matchMedia("(pointer: fine)").matches) return;

    const onMove = (e: PointerEvent) => {
      const rect = ref.current?.getBoundingClientRect();
      if (!rect) return;
      // 鼠标相对头像中心的方向，归一化到 -1 ~ 1
      const dx = Math.max(-1, Math.min(1, (e.clientX - rect.left - rect.width / 2) / (window.innerWidth / 2)));
      const dy = Math.max(-1, Math.min(1, (e.clientY - rect.top - rect.height / 2) / (window.innerHeight / 2)));
      rotateY.set(dx * 22 * intensity);
      rotateX.set(-dy * 16 * intensity);
      x.set(dx * 8 * intensity);
      y.set(dy * 6 * intensity);
    };
    const reset = () => {
      rotateX.set(0);
      rotateY.set(0);
      x.set(0);
      y.set(0);
    };

    window.addEventListener("pointermove", onMove);
    document.documentElement.addEventListener("pointerleave", reset);
    return () => {
      window.removeEventListener("pointermove", onMove);
      document.documentElement.removeEventListener("pointerleave", reset);
    };
  }, [reduceMotion, intensity, rotateX, rotateY, x, y]);

  return (
    <motion.div ref={ref} style={{ rotateX, rotateY, x, y, transformPerspective: 600 }}>
      <Image src={src} alt={alt} width={size} height={size} priority={priority} className={className} />
    </motion.div>
  );
}
