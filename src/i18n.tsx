"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { profile } from "@/data/profile";
import { localize, type Lang } from "@/lib/localize";

// 界面上的固定文字
const UI = {
  zh: {
    placeholder: "有什么想问我的？",
    back: "返回首页",
    age: (n: number) => `${n} 岁`,
    hideQuick: "收起快捷问题",
    showQuick: "显示快捷问题",
    more: "更多问题",
    moreQuestions: ["你的求职意向是什么？", "你最有成就感的项目是哪个？", "你的优势是什么？", "你为什么喜欢写代码？"],
    sections: {
      projects: { title: "项目", subtitle: "最近做的一些东西" },
      skills: { title: "技能", subtitle: "我的技术栈" },
      fun: { title: "生活", subtitle: "工作之外的我" },
      funHeading: { lead: "工作之外的", accent: "我", subtitle: "写代码之外，这些事情让我保持好奇和快乐。" },
      contact: { title: "联系我", subtitle: "欢迎随时打招呼" },
    },
    contact: {
      lead: "一起做点",
      accent: "有意思",
      tail: "的东西吧",
      subtitle: "无论是工作机会、项目合作，还是想聊聊 AI Agent，都欢迎来信。",
      emailLabel: "邮箱",
      send: "发邮件",
      copy: "复制",
      copied: "已复制",
    },
    networkError: "网络好像出了点问题，请稍后再试。",
    wechat: "微信",
    questions: {
      me: "介绍一下你自己吧",
      projects: "你做过哪些项目？",
      skills: "你掌握哪些技能？",
      fun: "工作之外你喜欢做什么？",
      contact: "怎么联系你？",
    },
    // 点按钮时记入对话历史的一句话，让 AI 知道访客刚看过哪个板块
    intros: {
      me: (name: string, role: string) => `嗨！我是 ${name}，${role}。下面是关于我的简单介绍 👇`,
      projects: "这些是我最近做的一些项目，点击卡片可以查看详情：",
      skills: "这是我目前的技术栈：",
      fun: "工作之外，我喜欢这些：",
      contact: "欢迎随时联系我！",
    },
  },
  en: {
    placeholder: "Ask me anything…",
    back: "Back to home",
    age: (n: number) => `${n} years old`,
    hideQuick: "Hide quick questions",
    showQuick: "Show quick questions",
    more: "More questions",
    moreQuestions: [
      "What kind of role are you looking for?",
      "Which project are you most proud of?",
      "What are your strengths?",
      "Why do you love coding?",
    ],
    sections: {
      projects: { title: "Projects", subtitle: "Things I've built recently" },
      skills: { title: "Skills", subtitle: "My tech stack" },
      fun: { title: "Fun", subtitle: "Me outside of work" },
      funHeading: { lead: "When I'm", accent: "offline", subtitle: "Away from the keyboard, these keep me curious and happy." },
      contact: { title: "Contact", subtitle: "Feel free to say hi" },
    },
    contact: {
      lead: "Let's build something",
      accent: "interesting",
      tail: "",
      subtitle: "Whether it's a role, a collaboration, or just a chat about AI agents — my inbox is open.",
      emailLabel: "Email",
      send: "Send email",
      copy: "Copy",
      copied: "Copied",
    },
    networkError: "Something went wrong with the network. Please try again later.",
    wechat: "WeChat",
    questions: {
      me: "Tell me about yourself",
      projects: "What projects have you worked on?",
      skills: "What are your skills?",
      fun: "What do you do for fun?",
      contact: "How can I reach you?",
    },
    // 点按钮时记入对话历史的一句话，让 AI 知道访客刚看过哪个板块
    intros: {
      me: (name: string, role: string) => `Hi! I'm ${name}, ${role}. Here's a bit about me 👇`,
      projects: "Here are some things I've built recently — click a card for details:",
      skills: "Here's my current tech stack:",
      fun: "Outside of work, I enjoy:",
      contact: "Feel free to reach out!",
    },
  },
};

const LangContext = createContext<{ lang: Lang; setLang: (lang: Lang) => void }>({
  lang: "zh",
  setLang: () => {},
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("zh");

  // 首次加载：优先用上次的选择，否则跟随浏览器语言
  useEffect(() => {
    let saved: string | null = null;
    try {
      saved = localStorage.getItem("lang");
    } catch {}
    if (saved === "zh" || saved === "en") setLang(saved);
    else if (!navigator.language.startsWith("zh")) setLang("en");
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang === "zh" ? "zh-CN" : "en";
    try {
      localStorage.setItem("lang", lang);
    } catch {}
  }, [lang]);

  return <LangContext.Provider value={{ lang, setLang }}>{children}</LangContext.Provider>;
}

export function useLang() {
  const { lang, setLang } = useContext(LangContext);
  return { lang, setLang, ui: UI[lang], p: localize(profile, lang) };
}
