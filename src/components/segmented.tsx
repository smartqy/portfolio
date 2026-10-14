"use client";

import { motion } from "framer-motion";
import { useId } from "react";

// 胶囊形分段开关，选中项的底色会平滑滑动过去
export function Segmented<T extends string>({
  label,
  value,
  options,
  onChange,
}: {
  label: string;
  value: T | null;
  options: { value: T; content: React.ReactNode; label: string }[];
  onChange: (value: T, e: React.MouseEvent<HTMLButtonElement>) => void;
}) {
  const id = useId();
  return (
    <div
      role="group"
      aria-label={label}
      className="flex rounded-full border border-border bg-card p-0.5 text-xs font-medium shadow-[0_1px_2px_rgb(0_0_0/0.04)] backdrop-blur-md"
    >
      {options.map((o) => {
        const active = o.value === value;
        return (
          <button
            key={o.value}
            type="button"
            aria-label={o.label}
            aria-pressed={active}
            title={o.label}
            onClick={(e) => onChange(o.value, e)}
            className={`relative flex h-7 min-w-8 items-center justify-center rounded-full px-2.5 transition-colors duration-300 ${
              active ? "text-accent-foreground" : "text-muted hover:text-foreground"
            }`}
          >
            {active && (
              <motion.span
                layoutId={`${id}-thumb`}
                className="absolute inset-0 rounded-full bg-accent shadow-sm"
                transition={{ type: "spring", stiffness: 420, damping: 32 }}
              />
            )}
            <span className="relative">{o.content}</span>
          </button>
        );
      })}
    </div>
  );
}
