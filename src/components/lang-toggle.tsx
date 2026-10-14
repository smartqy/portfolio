"use client";

import { useLang } from "@/i18n";
import { Segmented } from "./segmented";
import { ThemeToggle } from "./theme-toggle";

export function LangToggle() {
  const { lang, setLang } = useLang();
  return (
    <Segmented
      label="Language"
      value={lang}
      onChange={setLang}
      options={[
        { value: "zh", label: "中文", content: "中" },
        { value: "en", label: "English", content: "EN" },
      ]}
    />
  );
}

// 右上角的明暗 + 语言开关
export function TopControls({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <ThemeToggle />
      <LangToggle />
    </div>
  );
}
