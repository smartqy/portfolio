import type { Metadata } from "next";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { profile } from "@/data/profile";
import { CursorGlow } from "@/components/cursor-glow";
import { LangProvider } from "@/i18n";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// 标题里名字用的衬线斜体
const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument-serif",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
});

export const metadata: Metadata = {
  title: `${profile.name.en} · ${profile.name.zh} | Portfolio`,
  description: `${profile.name.zh} 的 AI 个人作品集 · AI portfolio of ${profile.name.en}`,
};

// 在页面渲染前确定明暗主题，避免刷新时闪一下：用户选过就用选择的，否则跟随系统
const themeScript = `(function () {
  var media = window.matchMedia("(prefers-color-scheme: dark)");
  function saved() {
    try { return localStorage.getItem("theme"); } catch (e) { return null; }
  }
  function apply() {
    var t = saved();
    document.documentElement.dataset.theme = t === "dark" || t === "light" ? t : media.matches ? "dark" : "light";
  }
  apply();
  media.addEventListener("change", apply);
})();`;

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${instrumentSerif.variable} bg-glow min-h-dvh antialiased`}
      >
        <CursorGlow />
        <LangProvider>{children}</LangProvider>
      </body>
    </html>
  );
}
