"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { useState } from "react";
import { CARDS } from "@/components/cards";
import { ChatInput } from "@/components/chat-input";
import { FollowAvatar } from "@/components/follow-avatar";
import { Hero } from "@/components/hero";
import { TopControls } from "@/components/lang-toggle";
import { QuickActions, type CardKey } from "@/components/quick-actions";
import { useLang } from "@/i18n";

type Message = {
  id: number;
  role: "user" | "assistant";
  text: string;
  cards: CardKey[];
  error?: boolean;
};

// 当前屏幕上显示的内容：一个板块，或者一问一答
type View =
  | { kind: "section"; id: number; key: CardKey }
  | { kind: "answer"; id: number; question: string; replyId: number };

const CARD_TAG = /\[\[card:(me|projects|skills|fun|contact)\]\]/g;

// 把 AI 输出里的 [[card:xxx]] 标记拆出来，渲染成卡片
function parseReply(raw: string): Pick<Message, "text" | "cards" | "error"> {
  if (raw.includes("[[error]]")) {
    return { text: raw.split("[[error]]")[1], cards: [], error: true };
  }
  const cards = [...new Set([...raw.matchAll(CARD_TAG)].map((m) => m[1] as CardKey))];
  const text = raw
    .replace(CARD_TAG, "")
    .replace(/\[\[[a-z:]*$/, "") // 流式输出时隐藏尚未完整的标记
    .trim();
  return { text, cards };
}

let nextId = 0;

export default function Home() {
  const { lang, ui, p: profile } = useLang();
  // 完整的对话历史只用来给 AI 提供上下文，屏幕上只显示 view
  const [messages, setMessages] = useState<Message[]>([]);
  const [view, setView] = useState<View | null>(null);
  const [loading, setLoading] = useState(false);
  const [showQuick, setShowQuick] = useState(true);

  function showSection(key: CardKey) {
    const intro = key === "me" ? ui.intros.me(profile.name, profile.role) : ui.intros[key];
    setMessages((prev) => [
      ...prev,
      { id: nextId++, role: "user", text: ui.questions[key], cards: [] },
      { id: nextId++, role: "assistant", text: intro, cards: [key] },
    ]);
    setView({ kind: "section", id: nextId++, key });
    window.scrollTo({ top: 0 });
  }

  async function ask(question: string) {
    const history = [...messages, { id: nextId++, role: "user" as const, text: question, cards: [] }];
    const replyId = nextId++;
    setMessages([...history, { id: replyId, role: "assistant", text: "", cards: [] }]);
    setView({ kind: "answer", id: nextId++, question, replyId });
    setLoading(true);
    window.scrollTo({ top: 0 });

    const update = (raw: string) =>
      setMessages((prev) => prev.map((m) => (m.id === replyId ? { ...m, ...parseReply(raw) } : m)));

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          lang,
          messages: history
            .filter((m) => !m.error && m.text)
            .map((m) => ({ role: m.role, content: m.text })),
        }),
      });
      if (!res.body) throw new Error("empty response");
      const reader = res.body.getReader();
      const decoder = new TextDecoder();
      let raw = "";
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        raw += decoder.decode(value, { stream: true });
        update(raw);
      }
    } catch {
      update(`[[error]]${ui.networkError}`);
    } finally {
      setLoading(false);
    }
  }

  const reply = view?.kind === "answer" ? messages.find((m) => m.id === view.replyId) : undefined;

  return (
    <main className="mx-auto flex min-h-dvh max-w-3xl flex-col px-4">
      {!view && <TopControls className="absolute top-4 right-4 z-10" />}
      {!view ? (
        <Hero onAsk={ask} onSelect={showSection} />
      ) : (
        <section className="flex flex-1 flex-col">
          <header className="relative flex justify-start py-6 sm:justify-center">
            <button
              type="button"
              onClick={() => setView(null)}
              aria-label={ui.back}
              title={ui.back}
              className="rounded-full transition hover:scale-110"
            >
              <FollowAvatar src={profile.avatar} size={40} intensity={0.6} className="size-10" />
            </button>
            <TopControls className="absolute top-1/2 right-0 -translate-y-1/2" />
          </header>

          <div className="flex-1 pt-4 pb-72">
            <AnimatePresence mode="wait">
              <motion.div
                key={view.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.25 }}
              >
                {view.kind === "section" ? (
                  (() => {
                    const Section = CARDS[view.key];
                    return <Section />;
                  })()
                ) : (
                  <div className="space-y-6">
                    <div className="flex justify-end">
                      <p className="max-w-[80%] rounded-3xl rounded-br-md bg-accent px-4 py-2.5 text-accent-foreground">
                        {view.question}
                      </p>
                    </div>
                    {reply?.text ? (
                      <p
                        className={`leading-relaxed whitespace-pre-wrap ${reply.error ? "text-red-500" : ""}`}
                      >
                        {reply.text}
                      </p>
                    ) : (
                      loading && <TypingDots />
                    )}
                    {reply?.cards.map((key) => {
                      const Section = CARDS[key];
                      return (
                        <motion.div key={key} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} className="pt-4">
                          <Section />
                        </motion.div>
                      );
                    })}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="fixed inset-x-0 bottom-0 z-10 bg-linear-to-t from-background via-background/90 to-transparent px-4 pt-10 pb-4">
            <div className="mx-auto max-w-3xl space-y-3">
              <button
                type="button"
                onClick={() => setShowQuick((s) => !s)}
                className="mx-auto flex items-center gap-1 text-sm text-muted transition hover:text-foreground"
              >
                {showQuick ? <ChevronDown className="size-4" /> : <ChevronUp className="size-4" />}
                {showQuick ? ui.hideQuick : ui.showQuick}
              </button>
              {showQuick && (
                <QuickActions
                  onSelect={showSection}
                  onAsk={ask}
                  active={view.kind === "section" ? view.key : undefined}
                  compact
                />
              )}
              <ChatInput onSubmit={ask} disabled={loading} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}

function TypingDots() {
  return (
    <div className="flex gap-1 py-2">
      {[0, 1, 2].map((i) => (
        <motion.span
          key={i}
          className="size-2 rounded-full bg-muted"
          animate={{ opacity: [0.3, 1, 0.3] }}
          transition={{ duration: 1, repeat: Infinity, delay: i * 0.15 }}
        />
      ))}
    </div>
  );
}
