"use client";

import { ArrowUp } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n";
import { MagneticButton } from "./magnetic-button";

export function ChatInput({
  onSubmit,
  disabled = false,
  autoFocus = false,
}: {
  onSubmit: (text: string) => void;
  disabled?: boolean;
  autoFocus?: boolean;
}) {
  const { ui } = useLang();
  const [value, setValue] = useState("");

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        const text = value.trim();
        if (!text || disabled) return;
        onSubmit(text);
        setValue("");
      }}
      className="flex w-full items-center gap-2 rounded-full border border-border bg-card/90 py-2 pr-2 pl-5 shadow-sm backdrop-blur transition focus-within:shadow-md"
    >
      <input
        value={value}
        onChange={(e) => setValue(e.target.value)}
        placeholder={ui.placeholder}
        autoFocus={autoFocus}
        className="min-w-0 flex-1 bg-transparent py-1.5 outline-none placeholder:text-muted"
      />
      <MagneticButton
        type="submit"
        strength={0.4}
        max={6}
        aria-label="Submit question"
        disabled={disabled || !value.trim()}
        className="flex size-9 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground transition hover:opacity-90 disabled:opacity-30"
      >
        <ArrowUp className="size-4" strokeWidth={2.5} />
      </MagneticButton>
    </form>
  );
}
