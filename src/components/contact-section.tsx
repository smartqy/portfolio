"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Check, Copy, Mail, MessageCircle } from "lucide-react";
import { useState } from "react";
import { useLang } from "@/i18n";

// lucide 已移除品牌图标，这里内联官方图形（来自 Simple Icons）
function GitHubIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.42.36.81 1.096.81 2.22 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    </svg>
  );
}

function LinkedInIcon({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden className={className}>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

const handleOf = (url: string) => url.replace(/\/+$/, "").split("/").pop() ?? url;

function useCopy() {
  const [copied, setCopied] = useState<string | null>(null);
  const copy = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
    } catch {
      // 剪贴板不可用（比如非 https）时退回老办法
      const input = document.createElement("textarea");
      input.value = text;
      document.body.appendChild(input);
      input.select();
      document.execCommand("copy");
      input.remove();
    }
    setCopied(text);
    setTimeout(() => setCopied((c) => (c === text ? null : c)), 1800);
  };
  return { copied, copy };
}

const tileClass =
  "group relative flex items-center gap-4 overflow-hidden rounded-2xl border border-border bg-card p-5 backdrop-blur-md transition duration-300 hover:-translate-y-0.5 hover:shadow-[0_14px_36px_-16px_rgb(15_118_110/0.35)]";

export function ContactSection() {
  const { p: profile, ui } = useLang();
  const { email, github, linkedin, wechat } = profile.contact;
  const { copied, copy } = useCopy();
  const t = ui.contact;

  const socials = [
    github && {
      name: "GitHub",
      handle: `@${handleOf(github)}`,
      href: github,
      icon: GitHubIcon,
      hover: "group-hover:text-foreground",
    },
    linkedin && {
      name: "LinkedIn",
      handle: handleOf(linkedin),
      href: linkedin,
      icon: LinkedInIcon,
      hover: "group-hover:text-[#0a66c2] dark:group-hover:text-[#5aa9f5]",
    },
  ].filter(Boolean) as { name: string; handle: string; href: string; icon: typeof GitHubIcon; hover: string }[];

  return (
    <div className="space-y-4">
      {/* 标题 */}
      <div className="space-y-4 pb-4">
        {profile.status && (
          <div className="inline-flex items-center gap-2 rounded-full border border-border bg-card px-3 py-1 text-xs text-muted backdrop-blur-md">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {profile.status}
          </div>
        )}
        <h2 className="text-3xl font-semibold tracking-tight sm:text-5xl">
          {t.lead}{" "}
          <span className="font-display bg-linear-to-r from-teal-600 via-emerald-500 to-sky-500 bg-clip-text pr-[0.12em] text-[1.15em] font-normal italic text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-sky-300">
            {t.accent}
          </span>
          {t.tail}
        </h2>
        <p className="max-w-lg text-muted">{t.subtitle}</p>
      </div>

      {/* 邮箱主卡片 */}
      {email && (
        <div className="relative overflow-hidden rounded-3xl border border-border bg-card p-6 backdrop-blur-md sm:p-8">
          <div
            aria-hidden
            className="pointer-events-none absolute -top-24 -right-16 size-64 rounded-full bg-linear-to-br from-teal-200/60 to-sky-200/40 blur-3xl dark:from-teal-500/15 dark:to-sky-500/10"
          />
          <div className="relative space-y-5">
            <div className="flex items-center gap-2 text-sm text-muted">
              <Mail className="size-4" />
              {t.emailLabel}
            </div>
            <a
              href={`mailto:${email}`}
              className="block w-fit text-2xl font-medium tracking-tight break-all decoration-accent/40 underline-offset-8 transition hover:underline sm:text-4xl"
            >
              {email}
            </a>
            <div className="flex flex-wrap gap-2">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center gap-1.5 rounded-full bg-accent px-4 py-2 text-sm font-medium text-accent-foreground transition hover:opacity-90"
              >
                {t.send}
                <ArrowUpRight className="size-4" />
              </a>
              <button
                type="button"
                onClick={() => copy(email)}
                className="inline-flex items-center gap-1.5 rounded-full border border-border bg-card px-4 py-2 text-sm font-medium transition hover:border-accent/40"
              >
                <motion.span key={copied === email ? "done" : "copy"} initial={{ scale: 0.6, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}>
                  {copied === email ? <Check className="size-4 text-accent" /> : <Copy className="size-4" />}
                </motion.span>
                {copied === email ? t.copied : t.copy}
              </button>
            </div>
          </div>
        </div>
      )}

      {/* 社交账号 */}
      <div className="grid gap-4 sm:grid-cols-2">
        {socials.map(({ name, handle, href, icon: Icon, hover }) => (
          <a key={name} href={href} target="_blank" rel="noreferrer" className={tileClass}>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60">
              <Icon className={`size-6 text-muted transition-colors duration-300 ${hover}`} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{name}</span>
              <span className="block truncate text-sm text-muted">{handle}</span>
            </span>
            <ArrowUpRight className="size-5 text-muted transition duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent" />
          </a>
        ))}
        {wechat && (
          <button type="button" onClick={() => copy(wechat)} className={`${tileClass} text-left`}>
            <span className="flex size-12 shrink-0 items-center justify-center rounded-xl border border-border bg-background/60">
              <MessageCircle className="size-6 text-muted transition-colors duration-300 group-hover:text-[#07c160]" />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold">{ui.wechat}</span>
              <span className="block truncate text-sm text-muted">{wechat}</span>
            </span>
            {copied === wechat ? <Check className="size-5 text-accent" /> : <Copy className="size-5 text-muted" />}
          </button>
        )}
      </div>
    </div>
  );
}
