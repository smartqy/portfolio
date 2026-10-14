"use client";

import { AnimatePresence, motion, type Variants } from "framer-motion";
import { useEffect, useState } from "react";
import { useLang } from "@/i18n";
import { ChatInput } from "./chat-input";
import { FollowAvatar } from "./follow-avatar";
import { QuickActions, type CardKey } from "./quick-actions";

const container: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.09, delayChildren: 0.05 } },
};
const item: Variants = {
  hidden: { opacity: 0, y: 14, filter: "blur(6px)" },
  show: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

export function Hero({ onAsk, onSelect }: { onAsk: (q: string) => void; onSelect: (key: CardKey) => void }) {
  const { p: profile, lang } = useLang();

  return (
    <motion.section
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-1 flex-col items-center justify-center gap-7 py-16 text-center"
    >
      {profile.status && (
        <motion.div
          variants={item}
          className="flex items-center gap-2 rounded-full border border-border bg-card px-3.5 py-1.5 text-xs text-muted backdrop-blur-md"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-400 opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
          </span>
          {profile.status}
        </motion.div>
      )}

      <motion.div variants={item} className="space-y-3">
        <h1 className="text-4xl font-semibold tracking-tight sm:text-6xl">
          {profile.greeting}{" "}
          <span
            className={`bg-linear-to-r from-teal-600 via-emerald-500 to-sky-500 bg-clip-text text-transparent dark:from-teal-300 dark:via-emerald-300 dark:to-sky-300 ${
              // 衬线斜体只有拉丁字形，中文名用无衬线粗体，避免浏览器硬"压斜"
              lang === "zh" ? "pr-[0.05em]" : "font-display pr-[0.12em] text-[1.18em] font-normal italic"
            }`}
          >
            {profile.name}
          </span>
          <motion.span
            aria-hidden
            className="ml-1 inline-block origin-[70%_70%]"
            animate={{ rotate: [0, 14, -8, 14, -4, 10, 0] }}
            transition={{ duration: 1.6, delay: 0.8, repeat: Infinity, repeatDelay: 3.5 }}
          >
            👋
          </motion.span>
        </h1>
        <RotatingTagline />
      </motion.div>

      <motion.div variants={item} className="relative my-2">
        <AvatarAura />
        <motion.div
          animate={{ y: [0, -8, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
        >
          <FollowAvatar src={profile.avatar} alt="Hero memoji" size={240} priority className="size-44 sm:size-56" />
        </motion.div>
      </motion.div>

      <motion.div variants={item} className="w-full max-w-xl">
        <ChatInput onSubmit={onAsk} autoFocus />
      </motion.div>

      <motion.div variants={item}>
        <QuickActions onSelect={onSelect} />
      </motion.div>

    </motion.section>
  );
}

function RotatingTagline() {
  const { p: profile, lang } = useLang();
  const words = profile.tagline.words;
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(timer);
  }, [words.length]);

  return (
    <p className="flex items-center justify-center gap-[0.35em] text-lg text-muted sm:text-xl">
      <span>{profile.tagline.prefix}</span>
      <span className="relative inline-flex overflow-hidden py-0.5">
        <AnimatePresence mode="popLayout" initial={false}>
          <motion.span
            key={`${lang}-${index}`}
            initial={{ y: "100%", opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
            className="font-medium whitespace-nowrap text-foreground"
          >
            {words[index]}
          </motion.span>
        </AnimatePresence>
      </span>
    </p>
  );
}

// 头像背后缓慢旋转的柔和渐变光环
function AvatarAura() {
  return (
    <motion.div
      aria-hidden
      className="absolute inset-[6%] -z-10 rounded-full opacity-(--aura-opacity) blur-2xl"
      style={{
        background: "conic-gradient(from 0deg, #99f6e4, #bae6fd, #fde68a, #fbcfe8, #99f6e4)",
      }}
      animate={{ rotate: 360, scale: [1, 1.06, 1] }}
      transition={{
        rotate: { duration: 14, repeat: Infinity, ease: "linear" },
        scale: { duration: 5, repeat: Infinity, ease: "easeInOut" },
      }}
    />
  );
}
