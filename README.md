# AI 个人作品集

一个带 AI 分身的个人网站：访客可以直接提问，由 AI（DeepSeek）以你的身份回答，并自动弹出项目、技能、联系方式等卡片。

## 快速开始

```bash
npm install
cp .env.example .env.local   # 填入 DEEPSEEK_API_KEY
npm run dev                  # 打开 http://localhost:3000
```

没有配置 API Key 时，Me / Projects / Skills / Fun / Contact 五个按钮照常可用，只有自由提问会提示未配置。

## 改成你自己的

| 想改什么 | 文件 |
| --- | --- |
| 姓名、简介、项目、技能、爱好、联系方式、给 AI 的补充信息（文字写成 `{ zh, en }` 即中英双语） | `src/data/profile.ts` |
| 按钮、提示语等界面文字（中 / 英） | `src/i18n.tsx` |
| 头像 | 放到 `public/`，再改 `profile.avatar` |
| 快捷按钮图标和颜色 | `src/components/quick-actions.tsx` |
| AI 的语气和回答规则 | `src/app/api/chat/route.ts` 里的 `SYSTEM_PROMPT` |
| 颜色主题 | `src/app/globals.css` 顶部的 CSS 变量 |

## 部署

推荐 [Vercel](https://vercel.com)：把项目推到 GitHub → 在 Vercel 导入 → 在 Environment Variables 中添加 `DEEPSEEK_API_KEY` → 绑定自己的域名。

## 技术栈

Next.js 15 (App Router) · TypeScript · Tailwind CSS v4 · Framer Motion · DeepSeek API（`deepseek-flash`，通过 OpenAI SDK 流式输出）
