"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, X } from "lucide-react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n";

type Category = "ai" | "cv" | "systems" | "algo";

export function ProjectsSection() {
  const { p: profile, ui } = useLang();
  const scroller = useRef<HTMLDivElement>(null);
  const [edges, setEdges] = useState({ start: true, end: false });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const open = openIndex === null ? null : profile.projects[openIndex];

  // 根据滚动位置决定左右箭头是否可点
  const updateEdges = () => {
    const el = scroller.current;
    if (!el) return;
    setEdges({ start: el.scrollLeft < 8, end: el.scrollLeft + el.clientWidth > el.scrollWidth - 8 });
  };
  useEffect(updateEdges, []);

  const scrollByCard = (dir: 1 | -1) => {
    const el = scroller.current;
    const card = el?.querySelector<HTMLElement>("[data-card]");
    if (!el || !card) return;
    el.scrollBy({ left: dir * (card.offsetWidth + 16), behavior: "smooth" });
  };

  // 详情弹窗：Esc 关闭，打开时锁定页面滚动
  useEffect(() => {
    if (openIndex === null) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpenIndex(null);
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
    };
  }, [openIndex]);

  return (
    <div>
      <div className="mb-8 space-y-2">
        <h2 className="text-4xl font-semibold tracking-tight sm:text-5xl">{ui.sections.projects.title}</h2>
        <p className="text-muted">{ui.sections.projects.subtitle}</p>
      </div>

      {/* 横向滑动的卡片 */}
      <div
        ref={scroller}
        onScroll={updateEdges}
        className="-mx-4 flex snap-x snap-mandatory scroll-px-4 gap-4 overflow-x-auto px-4 pt-2 pb-6 scrollbar-none [mask-image:linear-gradient(to_right,transparent,black_16px,black_calc(100%-56px),transparent)]"
      >
        {profile.projects.map((p, i) => (
          <motion.button
            key={p.title}
            type="button"
            data-card
            onClick={() => setOpenIndex(i)}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: Math.min(i, 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
            whileHover={{ y: -6 }}
            className="group relative flex aspect-[7/10] w-[72vw] max-w-[300px] shrink-0 snap-start flex-col justify-start overflow-hidden rounded-[2rem] text-left shadow-[0_20px_40px_-24px_rgb(0_0_0/0.45)] sm:w-[300px]"
            style={{ background: `linear-gradient(180deg, ${p.cover.from} 0%, ${p.cover.to} 72%)` }}
          >
            <div className="relative z-10 p-6 text-white">
              <p className="text-sm font-medium text-white/80">{ui.projectFilters[p.category as Category]}</p>
              <h3 className="mt-1.5 text-[1.65rem] leading-tight font-semibold tracking-tight [text-wrap:balance]">
                {p.title}
              </h3>
            </div>
            <Image
              src={p.cover.image}
              alt=""
              width={256}
              height={256}
              className="absolute right-[-8%] bottom-[-4%] w-[82%] drop-shadow-[0_24px_30px_rgb(0_0_0/0.25)] transition-transform duration-500 ease-out group-hover:scale-105 group-hover:-rotate-3"
            />
          </motion.button>
        ))}
      </div>

      <div className="mt-2 flex justify-end gap-3">
        {([-1, 1] as const).map((dir) => {
          const disabled = dir === -1 ? edges.start : edges.end;
          return (
            <button
              key={dir}
              type="button"
              aria-label={dir === -1 ? ui.prev : ui.next}
              disabled={disabled}
              onClick={() => scrollByCard(dir)}
              className="flex size-12 items-center justify-center rounded-full border border-border bg-card backdrop-blur-md transition hover:border-accent/40 disabled:opacity-35"
            >
              {dir === -1 ? <ArrowLeft className="size-5" /> : <ArrowRight className="size-5" />}
            </button>
          );
        })}
      </div>

      {/* 项目详情弹窗 */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-40 flex items-end justify-center bg-black/40 p-0 backdrop-blur-sm sm:items-center sm:p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpenIndex(null)}
          >
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label={open.title}
              onClick={(e) => e.stopPropagation()}
              initial={{ y: 40, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 40, opacity: 0, scale: 0.98 }}
              transition={{ type: "spring", stiffness: 320, damping: 30 }}
              className="max-h-[90dvh] w-full max-w-xl overflow-y-auto rounded-t-[2rem] bg-background shadow-2xl sm:rounded-[2rem]"
            >
              <div
                className="relative h-48 overflow-hidden"
                style={{ background: `linear-gradient(160deg, ${open.cover.from} 0%, ${open.cover.to} 100%)` }}
              >
                <div className="relative z-10 p-6 text-white">
                  <p className="text-sm font-medium text-white/80">{ui.projectFilters[open.category as Category]}</p>
                  <h3 className="mt-1 max-w-[70%] text-2xl leading-tight font-semibold tracking-tight">{open.title}</h3>
                </div>
                <Image
                  src={open.cover.image}
                  alt=""
                  width={256}
                  height={256}
                  className="absolute right-4 -bottom-6 w-44 drop-shadow-[0_20px_24px_rgb(0_0_0/0.25)]"
                />
                <button
                  type="button"
                  aria-label={ui.close}
                  onClick={() => setOpenIndex(null)}
                  className="absolute top-4 right-4 z-20 flex size-9 items-center justify-center rounded-full bg-black/25 text-white backdrop-blur transition hover:bg-black/40"
                >
                  <X className="size-4" />
                </button>
              </div>
              <div className="space-y-5 p-6">
                <p className="leading-relaxed text-foreground/85">{open.description}</p>
                <div className="flex flex-wrap gap-2">
                  {open.tags.map((t) => (
                    <span key={t} className="rounded-xl bg-foreground px-3 py-1.5 text-sm text-background">
                      {t}
                    </span>
                  ))}
                </div>
                {open.link && (
                  <a
                    href={open.link}
                    target="_blank"
                    rel="noreferrer"
                    className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
                  >
                    {ui.viewProject}
                    <ArrowUpRight className="size-4" />
                  </a>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
