"use client";

import { BriefcaseBusiness, Ellipsis, Laugh, Layers, PartyPopper, UserRoundSearch } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { useLang } from "@/i18n";
import { MagneticButton } from "./magnetic-button";

export type CardKey = "me" | "projects" | "skills" | "fun" | "contact";

export const QUICK_ACTIONS: {
  key: CardKey;
  label: string;
  icon: typeof Laugh;
  color: string;
}[] = [
  // 图标颜色在 globals.css 的 --icon-* 里，明暗模式各一套
  { key: "me", label: "Me", icon: Laugh, color: "text-(--icon-me)" },
  { key: "projects", label: "Projects", icon: BriefcaseBusiness, color: "text-(--icon-projects)" },
  { key: "skills", label: "Skills", icon: Layers, color: "text-(--icon-skills)" },
  { key: "fun", label: "Fun", icon: PartyPopper, color: "text-(--icon-fun)" },
  { key: "contact", label: "Contact", icon: UserRoundSearch, color: "text-(--icon-contact)" },
];

export function QuickActions({
  onSelect,
  onAsk,
  active,
  compact = false,
}: {
  onSelect: (key: CardKey) => void;
  onAsk?: (question: string) => void;
  active?: CardKey;
  compact?: boolean;
}) {
  const buttonClass = `flex shrink-0 items-center rounded-2xl border bg-card font-medium text-foreground/80 shadow-[0_1px_2px_rgb(0_0_0/0.03)] backdrop-blur-md transition-[border-color,box-shadow,color] duration-300 hover:text-foreground hover:shadow-[0_10px_30px_-12px_rgb(15_118_110/0.25)] ${
    compact ? "gap-2 px-4 py-2.5 text-sm" : "flex-col gap-2.5 px-6 py-5 text-[15px] sm:min-w-32"
  }`;

  return (
    <div
      className={`flex ${
        compact
          ? "-mx-4 gap-2 overflow-x-auto px-4 py-2 scrollbar-none sm:justify-center"
          : "flex-wrap justify-center gap-3"
      }`}
    >
      {QUICK_ACTIONS.map(({ key, label, icon: Icon, color }) => (
        <MagneticButton
          key={key}
          type="button"
          strength={compact ? 0.25 : 0.35}
          max={compact ? 5 : 10}
          onClick={() => onSelect(key)}
          aria-pressed={active === key}
          className={`${buttonClass} ${active === key ? "border-accent/50" : "border-border"}`}
        >
          <Icon className={`${compact ? "size-4" : "size-[22px]"} ${color}`} strokeWidth={1.75} />
          {label}
        </MagneticButton>
      ))}
      {onAsk && <MoreButton className={`${buttonClass} border-border`} onAsk={onAsk} />}
    </div>
  );
}

function MoreButton({ className, onAsk }: { className: string; onAsk: (q: string) => void }) {
  const { ui } = useLang();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const close = (e: MouseEvent) => {
      if (!ref.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", close);
    return () => document.removeEventListener("mousedown", close);
  }, [open]);

  return (
    <div ref={ref} className="shrink-0">
      <MagneticButton
        type="button"
        strength={0.25}
        max={5}
        aria-label={ui.more}
        aria-expanded={open}
        onClick={() => setOpen((o) => !o)}
        className={`${className} h-full`}
      >
        <Ellipsis className="size-4" />
      </MagneticButton>
      {open && (
        <div className="fixed inset-x-4 bottom-36 z-20 mx-auto max-w-sm rounded-2xl border border-border bg-card p-1.5 shadow-lg">
          {ui.moreQuestions.map((q) => (
            <button
              key={q}
              type="button"
              onClick={() => {
                setOpen(false);
                onAsk(q);
              }}
              className="block w-full rounded-xl px-3 py-2.5 text-left text-sm transition hover:bg-accent/10"
            >
              {q}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
