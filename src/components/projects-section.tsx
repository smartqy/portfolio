"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n";

type Filter = "all" | "ai" | "cv" | "systems" | "algo";
const FILTERS: Filter[] = ["all", "ai", "cv", "systems", "algo"];

// 每个分类一个小圆点颜色，和快捷按钮的图标色系一致
const DOT: Record<Exclude<Filter, "all">, string> = {
  ai: "bg-(--icon-me)",
  cv: "bg-(--icon-skills)",
  systems: "bg-(--icon-projects)",
  algo: "bg-(--icon-contact)",
};

export function ProjectsSection() {
  const { p: profile, ui } = useLang();
  const [filter, setFilter] = useState<Filter>("all");
  const projects = profile.projects.filter((p) => filter === "all" || p.category === filter);
  const count = (f: Filter) => profile.projects.filter((p) => f === "all" || p.category === f).length;

  return (
    <div>
      <div className="mb-6 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{ui.sections.projects.title}</h2>
        <p className="text-muted">{ui.sections.projects.subtitle}</p>
      </div>

      {/* 分类筛选 */}
      <div className="mb-5 flex flex-wrap gap-2">
        {FILTERS.filter((f) => count(f) > 0).map((f) => {
          const active = filter === f;
          return (
            <button
              key={f}
              type="button"
              onClick={() => setFilter(f)}
              aria-pressed={active}
              className={`relative flex items-center gap-1.5 rounded-full px-3.5 py-1.5 text-sm transition-colors duration-300 ${
                active ? "text-accent-foreground" : "border border-border bg-card text-muted hover:text-foreground"
              }`}
            >
              {active && (
                <motion.span
                  layoutId="project-filter"
                  className="absolute inset-0 rounded-full bg-accent"
                  transition={{ type: "spring", stiffness: 420, damping: 34 }}
                />
              )}
              {f !== "all" && <span className={`relative size-1.5 rounded-full ${DOT[f]}`} />}
              <span className="relative">{ui.projectFilters[f]}</span>
              <span className={`relative text-xs tabular-nums ${active ? "opacity-70" : "opacity-60"}`}>{count(f)}</span>
            </button>
          );
        })}
      </div>

      <motion.div layout className="grid gap-4 sm:grid-cols-2">
        <AnimatePresence mode="popLayout">
          {projects.map((p) => {
            const cat = p.category as Exclude<Filter, "all">;
            const inner = (
              <>
                <div className="flex items-start justify-between gap-3">
                  <h3 className="font-semibold leading-snug">{p.title}</h3>
                  <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
                    {p.date}
                    {p.link && <ArrowUpRight className="size-4 transition group-hover:text-accent" />}
                  </span>
                </div>
                <p className="mt-1.5 flex items-center gap-1.5 text-xs text-muted">
                  <span className={`size-1.5 rounded-full ${DOT[cat]}`} />
                  {ui.projectFilters[cat]}
                </p>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-foreground/75">{p.description}</p>
                <div className="mt-4 flex flex-wrap gap-1.5">
                  {p.tags.map((t) => (
                    <span key={t} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                      {t}
                    </span>
                  ))}
                </div>
              </>
            );
            const className =
              "group flex flex-col rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.03),0_8px_24px_-12px_rgb(15_118_110/0.12)] backdrop-blur-md transition-shadow duration-300 hover:shadow-[0_16px_36px_-16px_rgb(15_118_110/0.3)]";
            const motionProps = {
              layout: true,
              initial: { opacity: 0, scale: 0.97 },
              animate: { opacity: 1, scale: 1 },
              exit: { opacity: 0, scale: 0.97 },
              transition: { duration: 0.25 },
            };
            return p.link ? (
              <motion.a key={p.title} href={p.link} target="_blank" rel="noreferrer" className={className} {...motionProps}>
                {inner}
              </motion.a>
            ) : (
              <motion.div key={p.title} className={className} {...motionProps}>
                {inner}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>
    </div>
  );
}
