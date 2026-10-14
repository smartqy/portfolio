"use client";

import { motion, type Variants } from "framer-motion";
import { useLang } from "@/i18n";

// 每张卡片一种柔和的渐变底色，按顺序循环使用
const TINTS = [
  "from-orange-100/90 via-amber-50/60 to-transparent dark:from-orange-400/12 dark:via-amber-400/5",
  "from-emerald-100/90 via-teal-50/60 to-transparent dark:from-emerald-400/12 dark:via-teal-400/5",
  "from-sky-100/90 via-cyan-50/60 to-transparent dark:from-sky-400/12 dark:via-cyan-400/5",
  "from-rose-100/90 via-pink-50/60 to-transparent dark:from-rose-400/12 dark:via-pink-400/5",
  "from-violet-100/90 via-indigo-50/60 to-transparent dark:from-violet-400/12 dark:via-indigo-400/5",
];

const grid: Variants = { show: { transition: { staggerChildren: 0.06 } } };
const tile: Variants = {
  hidden: { opacity: 0, y: 14 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};
const emoji: Variants = {
  rest: { rotate: 0, scale: 1 },
  hover: { rotate: [0, -12, 10, -4, 0], scale: 1.15, transition: { duration: 0.6 } },
};
const ghost: Variants = {
  rest: { rotate: 12, x: 0, y: 0 },
  hover: { rotate: 0, x: -8, y: -8, transition: { type: "spring", stiffness: 160, damping: 14 } },
};

export function FunSection() {
  const { p: profile, ui } = useLang();
  const h = ui.sections.funHeading;

  return (
    <div>
      <div className="mb-8 space-y-3">
        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          {h.lead}{" "}
          <span className="font-display bg-linear-to-r from-rose-500 via-orange-400 to-amber-400 bg-clip-text pr-[0.12em] text-[1.15em] font-normal italic text-transparent dark:from-rose-300 dark:via-orange-300 dark:to-amber-200">
            {h.accent}
          </span>
        </h2>
        <p className="text-muted">{h.subtitle}</p>
      </div>

      <motion.div variants={grid} initial="hidden" animate="show" className="grid grid-cols-2 gap-3 sm:grid-cols-3 sm:gap-4">
        {profile.fun.map((f, i) => {
          const featured = i === 0;
          return (
            <motion.div
              key={f.title}
              variants={tile}
              whileHover="hover"
              className={`group relative flex min-h-44 flex-col justify-between overflow-hidden rounded-3xl border border-border bg-card p-5 sm:p-6 backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_18px_40px_-20px_rgb(15_118_110/0.35)] ${
                featured ? "col-span-2" : ""
              }`}
            >
              <div className={`pointer-events-none absolute inset-0 bg-linear-to-br ${TINTS[i % TINTS.length]}`} />
              {/* 右下角放大的半透明 emoji，悬停时会"探出来" */}
              <motion.span
                aria-hidden
                variants={ghost}
                initial="rest"
                className={`pointer-events-none absolute -right-6 -bottom-8 leading-none opacity-[0.14] select-none dark:opacity-[0.1] ${
                  featured ? "text-[11rem]" : "text-[6.5rem] sm:text-[8rem]"
                }`}
              >
                {f.emoji}
              </motion.span>

              <motion.span variants={emoji} initial="rest" className="relative inline-block w-fit text-4xl">
                {f.emoji}
              </motion.span>
              <div className="relative mt-8 space-y-1.5">
                <h3 className={`font-semibold ${featured ? "text-2xl" : "text-lg"}`}>{f.title}</h3>
                <p className={`leading-relaxed text-muted ${featured ? "max-w-sm" : "text-sm"}`}>{f.text}</p>
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
