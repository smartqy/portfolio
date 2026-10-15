// ✏️ 你的个人信息都在这里 —— 改这个文件就能把网站变成你自己的。
// 页面上的卡片和 AI 助手的回答都以这里的内容为准。
// 需要翻译的文字写成 { zh: "中文", en: "English" }；不需要翻译的（链接、技术名词等）直接写字符串。

export const profile = {
  name: { zh: "吴俊杰", en: "Otis" }, // 中文界面显示中文名，英文界面显示英文名
  avatar: "/avatar.png", // 小头像（首页和顶部），换成 public/ 下你自己的，推荐 Memoji 风格
  photo: "/photo.jpg", // "Me" 页面的大照片，换成你的真实照片，比如 /photo.jpg（建议正方形）
  age: 24,
  // 首页大标题："嗨，我是" + 衬线斜体的名字 + 挥手 👋
  greeting: { zh: "嗨，我是", en: "Hey, I'm" },
  // 标题上方的状态小胶囊（留空字符串就不显示）
  status: { zh: "正在寻找 AI 应用 / AI Agent 开发岗位", en: "Open to AI app & AI agent engineering roles" },
  // 标题下方轮播的一句话：前缀 + 不断切换的词
  tagline: {
    prefix: { zh: "我喜欢做", en: "I build" },
    words: [
      { zh: "AI Agent", en: "AI agents" },
      { zh: "RAG 检索系统", en: "RAG systems" },
      { zh: "多智能体系统", en: "multi-agent systems" },
      { zh: "LLM 应用", en: "LLM applications" },
    ],
  },
  role: { zh: "DTU 计算机硕士在读 · 专注 AI Agent 开发", en: "MSc CS student at DTU · building AI agents" },
  location: { zh: "丹麦 · 哥本哈根", en: "Copenhagen, Denmark" },
  bio: {
    zh: "专注 LLM 应用与 AI Agent 开发。曾在丹麦法律 AI 公司 Juris 实习，做 LangGraph Agent 编排、Hybrid RAG 检索和引用溯源；也做过多智能体系统、计算机视觉和高性能计算项目。",
    en: "I build LLM applications and AI agents. At Juris, a Danish legal-AI company, I worked on LangGraph agent orchestration, hybrid RAG retrieval and citation grounding. I've also built multi-agent systems, computer-vision models and HPC projects.",
  },
  // "Me" 页面名字下方的标签
  interests: ["AI Agent", "LangGraph", "Hybrid RAG", "Computer Vision", "HPC"],
  // "Me" 页面底部的详细自我介绍
  about: {
    zh: "我是吴俊杰，24 岁，目前在丹麦哥本哈根，就读于 DTU（丹麦技术大学）计算机科学与工程硕士。在丹麦法律 AI 公司 Juris 实习期间，我参与了面向法律专业用户的 AI 产品研发，从 LangGraph Agent 编排、Hybrid RAG 检索到 Citation Grounding 幻觉控制，走完了从方案设计、开发到测试验证的完整流程，并独立交付了 MultiQuery 检索模块的调优。我习惯用 Claude、Cursor 等 AI 工具辅助开发，喜欢用实验和日志定位问题、持续迭代。目前正在寻找 AI 应用开发和 AI Agent 开发方向的工作机会。",
    en: "I'm Otis, 24, based in Copenhagen, where I'm doing an MSc in Computer Science and Engineering at DTU (Technical University of Denmark). As an AI application engineer intern at Juris, a Danish legal-AI company, I helped build AI products for legal professionals — from LangGraph agent orchestration and hybrid RAG retrieval to citation grounding for hallucination control — covering the full cycle from design and development to testing, and independently delivered the tuning of the MultiQuery retrieval module. I work AI-natively with tools like Claude and Cursor, and I like using experiments and logs to find problems and keep iterating. I'm currently looking for roles in AI application and AI agent development.",
  },
  // 只给 AI 看的补充信息：性格、经历、求职意向、趣事等，越具体 AI 回答越像你（AI 会自动翻译，写一种语言即可）
  aiNotes: `
- 中文名吴俊杰，英文名 Otis；24 岁，目前在丹麦哥本哈根，就读 DTU（丹麦技术大学）计算机科学与工程硕士（2025.02 – 2027.02）；本科也是计算机科学与技术专业。本科学校不在网站上展示：被问到本科学校时，不要猜测或编造校名，可以说本科读的是计算机专业，具体可以看我的简历或直接联系我
- 目前在找工作，方向是 AI 应用开发或 AI Agent 开发；Juris 实习已于 2026.06 结束，目前没有在职工作
- 实习：2025.11 – 2026.06 在丹麦法律 AI 公司 Juris 任 AI 应用工程师实习生，参与法律检索、智能问答与 Agent 工作流产品的完整研发流程（需求拆解、方案设计、开发、接口联调、测试验证）
- 个人优势：AI Native 开发能力（长期用 Claude、Cursor、GitHub Copilot 辅助需求分析、设计、编码和调试）；有真实 AI 产品研发经历；能独立完成从问题分析、方案设计、代码实现到实验验证的完整流程；有国际化学习背景，能读英文技术文档并在国际团队协作
- 业余时间喜欢篮球、摄影、播客、吉他和游戏
`,

  // 工作 / 实习经历（显示在 Me 页面）
  experience: [
    {
      company: "Juris",
      companyNote: { zh: "丹麦法律 AI 公司", en: "Danish legal-AI company" },
      role: { zh: "AI 应用工程师实习生", en: "AI Application Engineer Intern" },
      period: "2025.11 – 2026.06",
      highlights: [
        {
          zh: "参与基于 LangGraph 的 Agent 编排：显式状态机驱动的工具调用循环、Tool Groups 动态组装工具，以及基于 SHA-256 指纹的 Agent Graph 编译缓存",
          en: "LangGraph agent orchestration: explicit state-machine tool-calling loops, dynamic Tool Groups, and SHA-256-fingerprinted agent-graph compile caching",
        },
        {
          zh: "Hybrid RAG：BM25 + FAISS 双路召回、RRF 融合与多信号加权排序，通过 Feature Flag 灰度验证检索策略",
          en: "Hybrid RAG: BM25 + FAISS dual retrieval, RRF fusion and multi-signal ranking, validated behind feature flags",
        },
        {
          zh: "独立交付 MultiQuery 检索模块的调优，围绕检索延迟与召回效果做方案设计和对比实验",
          en: "Independently delivered MultiQuery retrieval tuning, running experiments on latency vs. recall",
        },
        {
          zh: "Citation Grounding：用 Pydantic 结构化输出把答案中的论断与原文逐字对应，结合 Reranker 过滤无依据回答",
          en: "Citation grounding: Pydantic structured output ties each claim to verbatim source text, combined with a reranker to filter ungrounded answers",
        },
        {
          zh: "基于 FastAPI 构建 AI 服务接口，支持 REST 与 WebSocket 流式输出",
          en: "Built FastAPI service endpoints with REST and WebSocket streaming",
        },
      ],
    },
  ],

  // 教育背景（显示在 Me 页面）
  education: [
    {
      school: { zh: "丹麦技术大学（DTU）", en: "Technical University of Denmark (DTU)" },
      degree: { zh: "计算机科学与工程 硕士", en: "MSc, Computer Science and Engineering" },
      period: "2025.02 – 2027.02",
    },
  ],

  // 项目：category 是卡片上的分类（ai / cv / systems / algo）；cover 是卡片插画和渐变色；link、date 可留空
  projects: [
    {
      title: { zh: "AI 驱动营销分析多智能体系统", en: "Multi-Agent Marketing Analytics System" },
      description: {
        zh: "从 0 到 1 搭建 Supervisor → Analytics / Graph → Report 多 Agent 工作流：Supervisor 用 Structured Output 生成任务计划并动态路由，子 Agent 通过 ReAct 调用工具，GraphAgent 把自然语言转成 Cypher，在 Neo4j 知识图谱上做多跳分析。",
        en: "Built from scratch a Supervisor → Analytics / Graph → Report multi-agent workflow: the supervisor plans and routes via structured output, sub-agents use ReAct tool calling, and a GraphAgent turns natural language into Cypher for multi-hop analysis on a Neo4j knowledge graph.",
      },
      tags: ["Python", "LangChain", "OpenAI API", "Neo4j", "ReAct"],
      category: "ai",
      cover: { image: "/projects/marketing.png", from: "#2f3270", to: "#8e93e6" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "",
      date: "",
    },
    {
      title: { zh: "AI 作品集网站", en: "AI Portfolio Website" },
      description: {
        zh: "就是你正在看的这个网站：内置一个以我身份回答问题的 AI 分身，回答流式输出并自动附上相关信息卡片，支持中英双语和明暗主题。",
        en: "The site you're on: an AI twin answers questions as me with streamed replies and auto-attached info cards, in Chinese and English with light and dark themes.",
      },
      tags: ["Next.js", "TypeScript", "Tailwind", "DeepSeek API"],
      category: "ai",
      cover: { image: "/projects/portfolio.png", from: "#0d4f49", to: "#4fc1ae" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "https://github.com/smartqy/portfolio",
      date: "2026",
    },
    {
      title: { zh: "DTU Pay 事件驱动微服务支付系统", en: "DTU Pay — Event-Driven Payment Microservices" },
      description: {
        zh: "参与构建匿名 Token 支付平台：Account / Token / Payment / Reporting 拆为独立微服务，经 RabbitMQ 事件通信，用 Saga 模式协调银行转账与失败补偿，避免双重支付；作为端到端测试主要负责人用 Cucumber 覆盖成功与各类失败场景，并用 Jenkins 搭建 CI。",
        en: "Helped build an anonymous token-based payment platform: Account / Token / Payment / Reporting microservices over RabbitMQ, with the Saga pattern coordinating bank transfers and compensation to prevent double-spending. Led end-to-end testing with Cucumber across success and failure scenarios, with CI on Jenkins.",
      },
      tags: ["Java", "Quarkus", "RabbitMQ", "Docker", "Saga", "Cucumber"],
      category: "systems",
      cover: { image: "/projects/dtupay.png", from: "#173451", to: "#6aa3db" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "",
      date: "",
    },
    {
      title: { zh: "多智能体协同路径规划与任务分配", en: "Multi-Agent Path Planning & Task Allocation" },
      description: {
        zh: "面向医院送药机器人风格的网格环境，构建基于 MA-CBS 的协同规划系统；负责环境检测与可达性分析，设计 Box-to-Goal / Box-to-Agent 两阶段任务分配，并在多组关卡上对比 CBS 与不同 merge threshold 的求解表现。",
        en: "A MA-CBS-based cooperative planner for a hospital-delivery-robot-style grid world. I built environment detection and reachability analysis, designed two-stage Box-to-Goal / Box-to-Agent task allocation, and benchmarked CBS against MA-CBS merge thresholds.",
      },
      tags: ["Java", "MA-CBS", "CBS", "A*", "Weighted A*"],
      category: "algo",
      cover: { image: "/projects/macbs.png", from: "#7a3517", to: "#f0a35e" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "",
      date: "",
    },
    {
      title: { zh: "基于双流网络的动作识别与视频分类", en: "Dual-Stream Action Recognition" },
      description: {
        zh: "在 UCF-101 子集上对比四种时空建模方案；发现并验证了跨数据划分的受试者泄漏（准确率从 96.67% 降到真实的 59.17%），再用 RGB + 光流双流网络把无泄漏验证准确率提升到 64.17%。",
        en: "Compared four spatio-temporal models on a UCF-101 subset, caught subject leakage across splits (96.67% fell to a true 59.17%), then raised leak-free validation accuracy to 64.17% with an RGB + optical-flow dual-stream network.",
      },
      tags: ["PyTorch", "ResNet18", "3D CNN", "Optical Flow"],
      category: "cv",
      cover: { image: "/projects/video.png", from: "#3d2266", to: "#b08be3" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "",
      date: "",
    },
    {
      title: { zh: "U-Net 医学图像分割与弱监督学习", en: "U-Net Medical Segmentation & Weak Supervision" },
      description: {
        zh: "在 PH2 皮肤病变和 DRIVE 视网膜血管数据集上实现 U-Net 分割，U-Net + Weighted BCE 测试 Dice 达 0.937；仅用 10+10 个随机点击的弱监督训练就达到 0.912 Dice，约为全监督的 97%。",
        en: "U-Net segmentation on PH2 skin lesions and DRIVE retinal vessels — 0.937 test Dice with weighted BCE. Point-level weak supervision with just 10+10 random clicks reached 0.912 Dice, about 97% of full supervision.",
      },
      tags: ["PyTorch", "U-Net", "Weak Supervision", "Dice / IoU"],
      category: "cv",
      cover: { image: "/projects/unet.png", from: "#33291f", to: "#f3d6b4" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "",
      date: "",
    },
    {
      title: { zh: "R-CNN 道路坑洞目标检测", en: "R-CNN Pothole Detection" },
      description: {
        zh: "从零搭建两阶段 R-CNN 流程（Selective Search → CNN 分类 → NMS → AP 评估）；500 个候选框时召回率 83%，用 1:1 均衡采样应对约 162k : 7.2k 的类别不平衡，分类器验证准确率 97.84%。",
        en: "Built a two-stage R-CNN pipeline from scratch (Selective Search → CNN classifier → NMS → AP). 500 proposals reached 83% recall, and 1:1 balanced sampling handled a ~162k : 7.2k class imbalance for 97.84% classifier accuracy.",
      },
      tags: ["PyTorch", "R-CNN", "Selective Search", "NMS"],
      category: "cv",
      cover: { image: "/projects/rcnn.png", from: "#5c4508", to: "#f2c94c" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "",
      date: "",
    },
    {
      title: { zh: "CNN 与迁移学习图像分类", en: "CNN & Transfer Learning Classification" },
      description: {
        zh: "Hotdog / Not-Hotdog 二分类：对比数据增强、BatchNorm、Adam / SGD 等策略，把训练 / 测试差距缩小到约 4.3 个百分点；迁移学习中 ResNet18 测试准确率 91.4%，并用 Saliency Map 分析模型的捷径特征。",
        en: "Hotdog / not-hotdog classification: compared augmentation, BatchNorm and Adam / SGD to shrink the train–test gap to ~4.3 points. ResNet18 transfer learning reached 91.4% test accuracy, with saliency maps exposing shortcut features.",
      },
      tags: ["PyTorch", "CNN", "ResNet18", "YOLOv12n"],
      category: "cv",
      cover: { image: "/projects/hotdog.png", from: "#7a2424", to: "#f39a7a" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "",
      date: "",
    },
    {
      title: { zh: "Jacobi 热传导仿真与高性能计算", en: "Jacobi Heat Simulation & HPC" },
      description: {
        zh: "对 4,571 个建筑平面图用 Jacobi 迭代模拟稳态室内温度；以 NumPy 为基线，分别用 Multiprocessing、Numba JIT、自定义 Numba-CUDA kernel 和 CuPy 加速，并用 Nsight Systems 做性能剖析。",
        en: "Simulated steady-state indoor temperatures for 4,571 floor plans with Jacobi iteration, accelerating the NumPy baseline with multiprocessing, Numba JIT, custom Numba-CUDA kernels and CuPy, profiled with Nsight Systems.",
      },
      tags: ["Python", "NumPy", "Numba", "CUDA", "CuPy"],
      category: "systems",
      cover: { image: "/projects/jacobi.png", from: "#1a4430", to: "#8fd3a3" }, // 卡片插画 + 渐变色（深 → 浅）
      link: "",
      date: "",
    },
  ],

  // icon 可选：bot / search / server / eye / cpu / route / wand
  skills: [
    {
      icon: "bot",
      category: { zh: "AI / 大模型", en: "AI / LLM" },
      items: ["OpenAI API", "LangChain", "LangGraph", "Agent Workflow", "Tool Calling", "Structured Output", "Pydantic", "Prompt Engineering"],
    },
    {
      icon: "search",
      category: { zh: "RAG / 检索", en: "RAG / Retrieval" },
      items: ["RAG Pipeline", "Hybrid Retrieval", "BM25", "FAISS", "Pinecone", "MultiQuery", "RRF", "Reranking", "Citation Grounding", "Chunking"],
    },
    {
      icon: "server",
      category: { zh: "后端 / 工程", en: "Backend / Engineering" },
      items: ["Python", "Java", "SQL", "FastAPI", "Quarkus", "REST API", "WebSocket", "RabbitMQ", "Microservices", "Docker", "Jenkins", "Git", "Linux"],
    },
    {
      icon: "eye",
      category: { zh: "机器学习 / 视觉", en: "ML / Computer Vision" },
      items: ["PyTorch", "Scikit-learn", "NumPy", "Pandas", "CNN", "ResNet", "U-Net", "R-CNN", "YOLO"],
    },
    {
      icon: "cpu",
      category: { zh: "高性能计算", en: "HPC" },
      items: ["Multiprocessing", "Numba", "CUDA", "CuPy", "Nsight Systems"],
    },
    {
      icon: "route",
      category: { zh: "算法", en: "Algorithms" },
      items: ["A*", "CBS / MA-CBS", "Heuristic Search", "Multi-Agent Path Planning"],
    },
    {
      icon: "wand",
      category: { zh: "AI 开发工具", en: "AI Dev Tools" },
      items: ["Claude", "Cursor", "GitHub Copilot", "ChatGPT"],
    },
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
