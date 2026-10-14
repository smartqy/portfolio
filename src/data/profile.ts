// ✏️ 你的个人信息都在这里 —— 改这个文件就能把网站变成你自己的。
// 页面上的卡片和 AI 助手的回答都以这里的内容为准。
// 需要翻译的文字写成 { zh: "中文", en: "English" }；不需要翻译的（链接、技术名词等）直接写字符串。

export const profile = {
  name: "Otis",
  avatar: "/avatar.png", // 小头像（首页和顶部），换成 public/ 下你自己的，推荐 Memoji 风格
  photo: "/photo.jpg", // "Me" 页面的大照片，换成你的真实照片，比如 /photo.jpg（建议正方形）
  age: 22,
  // 首页大标题："嗨，我是" + 衬线斜体的名字 + 挥手 👋
  greeting: { zh: "嗨，我是", en: "Hey, I'm" },
  // 标题上方的状态小胶囊（留空字符串就不显示）
  status: { zh: "正在寻找 AI 应用 / AI Agent 开发岗位", en: "Open to AI app & AI agent engineering roles" },
  // 标题下方轮播的一句话：前缀 + 不断切换的词
  tagline: {
    prefix: { zh: "我喜欢做", en: "I build" },
    words: [
      { zh: "AI Agent", en: "AI agents" },
      { zh: "AI 应用", en: "AI-powered apps" },
      { zh: "LLM 工作流", en: "LLM workflows" },
      { zh: "全栈 Web 应用", en: "full-stack web apps" },
    ],
  },
  role: { zh: "AI 应用开发者 / 学生", en: "AI Application Developer / Student" },
  location: { zh: "中国 · 上海", en: "Shanghai, China" },
  bio: {
    zh: "我热爱把想法做成真正能用的产品，关注 Web 开发、AI 应用和好的交互体验。平时喜欢折腾新技术，也喜欢把学到的东西分享出来。",
    en: "I love turning ideas into products people actually use. I focus on web development, AI applications and great interaction design, and I enjoy exploring new tech and sharing what I learn.",
  },
  // "Me" 页面名字下方的标签
  interests: ["AI Agent", "LLM Apps", "Full-stack", "Product", "Open Source"],
  // "Me" 页面底部的详细自我介绍
  about: {
    zh: "我是 Otis，目前在上海。我从大学开始自学编程，最初是为了做一个记账小程序，后来逐渐爱上了把想法变成产品的过程。我主要做 Web 全栈开发，最近在探索 AI 应用，比如这个能代表我回答问题的作品集网站。我喜欢简洁的设计和干净的代码，目前正在寻找 AI 应用开发和 AI Agent 开发方向的工作机会。",
    en: "I'm Otis, based in Shanghai. I taught myself to code in college — it started with a small expense-tracking app, and I've loved turning ideas into products ever since. I mostly do full-stack web development and have recently been exploring AI applications, like this portfolio that answers questions on my behalf. I care about clean design and clean code, and I'm currently looking for roles in AI application and AI agent development.",
  },
  // 只给 AI 看的补充信息：性格、经历、求职意向、趣事等，越具体 AI 回答越像你（AI 会自动翻译，写一种语言即可）
  aiNotes: `
- 目前在找工作，方向是 AI 应用开发或 AI Agent 开发；有全栈开发基础，能独立把 AI 能力做成完整产品
- 喜欢简洁的设计，代码洁癖
- 业余时间喜欢摄影、篮球和听播客
`,

  projects: [
    {
      title: { zh: "AI 作品集网站", en: "AI Portfolio Website" },
      description: {
        zh: "就是你正在看的这个网站：用 Next.js 搭建，内置一个能代表我回答问题的 AI 助手。",
        en: "The site you're looking at: built with Next.js, with an AI assistant that answers questions on my behalf.",
      },
      tags: ["Next.js", "TypeScript", "Tailwind", "Claude API"],
      link: "https://github.com/your-name/portfolio",
      date: "2026",
    },
    {
      title: { zh: "随手记小程序", en: "Quick Notes Mini Program" },
      description: {
        zh: "一个基于微信云开发的记账 / 笔记小程序，支持云函数同步和数据统计。",
        en: "A WeChat mini program for notes and expense tracking, with cloud-function sync and statistics.",
      },
      tags: ["WeChat Mini Program", "CloudBase", "JavaScript"],
      link: "",
      date: "2025",
    },
    {
      title: { zh: "项目三（示例）", en: "Project Three (example)" },
      description: {
        zh: "在这里写一句话介绍项目：解决了什么问题、你负责了什么、结果如何。",
        en: "One sentence about the project: what problem it solves, what you did, and the result.",
      },
      tags: ["Python", "Docker"],
      link: "",
      date: "2025",
    },
  ],

  skills: [
    { category: { zh: "前端", en: "Frontend" }, items: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Mini Programs"] },
    { category: { zh: "后端", en: "Backend" }, items: ["Node.js", "Python", "Java", "REST API"] },
    { category: { zh: "云 & 工具", en: "Cloud & Tools" }, items: ["Docker", "Azure", "Git", "Vercel"] },
    { category: { zh: "AI", en: "AI" }, items: ["LLM Apps", "Prompt Engineering", "Claude API"] },
  ],

  fun: [
    {
      emoji: "🏀",
      title: { zh: "篮球", en: "Basketball" },
      text: { zh: "周末一定会去打一场球。", en: "Never miss a game on the weekend." },
    },
    {
      emoji: "📷",
      title: { zh: "摄影", en: "Photography" },
      text: { zh: "喜欢街头摄影，记录城市里的小瞬间。", en: "Street photography — capturing small moments in the city." },
    },
    {
      emoji: "🎧",
      title: { zh: "播客", en: "Podcasts" },
      text: { zh: "通勤路上听科技和人文类播客。", en: "Tech and culture podcasts on my commute." },
    },
    {
      emoji: "🎸",
      title: { zh: "吉他", en: "Guitar" },
      text: { zh: "闲下来会弹弹吉他，是我最好的放松方式。", en: "Picking up the guitar is my favorite way to unwind." },
    },
    {
      emoji: "🎮",
      title: { zh: "游戏", en: "Gaming" },
      text: { zh: "偶尔打打游戏，也会忍不住琢磨里面的交互设计。", en: "Gaming now and then — and can't help studying the UX." },
    },
  ],

  contact: {
    email: "s250176@dtu.dk",
    github: "https://github.com/smartqy",
    linkedin: "https://www.linkedin.com/in/otis-w",
    wechat: "",
  },
};
