"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";
import { flushSync } from "react-dom";
import { useLang } from "@/i18n";
import { Segmented } from "./segmented";

type Theme = "light" | "dark";

export function ThemeToggle() {
  const { lang } = useLang();
  // 主题由 layout.tsx 里的脚本在渲染前写到 <html data-theme>，这里只负责同步和切换
  const [theme, setTheme] = useState<Theme | null>(null);

  useEffect(() => {
    const root = document.documentElement;
    const sync = () => setTheme(root.dataset.theme === "dark" ? "dark" : "light");
    sync();
    const observer = new MutationObserver(sync);
    observer.observe(root, { attributes: true, attributeFilter: ["data-theme"] });
    return () => observer.disconnect();
  }, []);

  function choose(next: Theme, e: React.MouseEvent<HTMLButtonElement>) {
    if (next === theme) return;
    const apply = () => {
      document.documentElement.dataset.theme = next;
      try {
        localStorage.setItem("theme", next);
      } catch {}
    };

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!document.startViewTransition || reduceMotion) {
      apply();
      return;
    }

    // 新主题从按钮位置以圆形扩散到整个屏幕
    const rect = e.currentTarget.getBoundingClientRect();
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;
    const radius = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
    const transition = document.startViewTransition(() => {
      apply();
      flushSync(() => setTheme(next));
    });
    transition.ready.then(() => {
      document.documentElement.animate(
        { clipPath: [`circle(0px at ${x}px ${y}px)`, `circle(${radius}px at ${x}px ${y}px)`] },
        { duration: 600, easing: "cubic-bezier(0.65, 0, 0.35, 1)", pseudoElement: "::view-transition-new(root)" },
      );
    });
  }

  return (
    <Segmented
      label={lang === "zh" ? "明暗模式" : "Theme"}
      value={theme}
      onChange={choose}
      options={[
        { value: "light", label: lang === "zh" ? "浅色" : "Light", content: <Sun className="size-3.5" /> },
        { value: "dark", label: lang === "zh" ? "深色" : "Dark", content: <Moon className="size-3.5" /> },
      ]}
    />
  );
}
