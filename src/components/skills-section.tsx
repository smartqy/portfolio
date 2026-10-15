"use client";

import { motion, type Variants } from "framer-motion";
import { Bot, Cpu, Route, ScanEye, Search, Server, Sparkles, WandSparkles } from "lucide-react";
import { useLang } from "@/i18n";

// profile.ts 里 skills[].icon 对应的图标
const ICONS = {
  bot: Bot,
  search: Search,
  server: Server,
  eye: ScanEye,
  cpu: Cpu,
  route: Route,
  wand: WandSparkles,
} as const;

const list: Variants = { show: { transition: { staggerChildren: 0.012 } } };
const chip: Variants = {
  hidden: { opacity: 0, y: 6 },
  show: { opacity: 1, y: 0, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] } },
};

export function SkillsSection() {
  const { p: profile, ui } = useLang();

  return (
    <div>
      <h2 className="mb-10 text-4xl font-semibold tracking-tight sm:text-5xl">{ui.sections.skills.title}</h2>

      <div className="space-y-10">
        {profile.skills.map((group, gi) => {
          const Icon = ICONS[group.icon as keyof typeof ICONS] ?? Sparkles;
          return (
            <motion.section
              key={group.category}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, delay: gi * 0.06, ease: [0.22, 1, 0.36, 1] }}
            >
              <h3 className="mb-4 flex items-center gap-2.5 text-xl font-semibold tracking-tight sm:text-2xl">
                <Icon className="size-6" strokeWidth={1.75} />
                {group.category}
              </h3>
              <motion.ul variants={list} initial="hidden" animate="show" className="flex flex-wrap gap-2.5">
                {group.items.map((item) => (
                  <motion.li
                    key={item}
                    variants={chip}
                    className="rounded-xl bg-foreground px-4 py-2 text-[15px] text-background transition-transform duration-200 hover:-translate-y-0.5"
                  >
                    {item}
                  </motion.li>
                ))}
              </motion.ul>
            </motion.section>
          );
        })}
      </div>
    </div>
  );
}
