import Anthropic from "@anthropic-ai/sdk";
import { profile } from "@/data/profile";
import { localize, type Lang } from "@/lib/localize";

export const runtime = "nodejs";

const ERRORS = {
  zh: {
    noKey: "AI 助手还没配置好：请在 .env.local 中设置 ANTHROPIC_API_KEY。",
    rateLimit: "提问的人有点多，请稍等几秒再试。",
    generic: "AI 助手暂时不可用，请稍后再试。",
    refusal: "抱歉，这个问题我没法回答，换个问题试试吧～",
  },
  en: {
    noKey: "The AI assistant isn't set up yet: set ANTHROPIC_API_KEY in .env.local.",
    rateLimit: "Lots of questions right now — please try again in a few seconds.",
    generic: "The AI assistant is unavailable right now. Please try again later.",
    refusal: "Sorry, I can't answer that one — try asking something else!",
  },
};

function buildSystemPrompt(lang: Lang) {
  const p = localize(profile, lang);
  return `你是 ${p.name} 的个人作品集网站上的 AI 分身，以第一人称（"我"）代表 ${p.name} 回答访客的问题。

关于我的资料（这是唯一可信的事实来源）：
${JSON.stringify(
  {
    name: p.name,
    age: p.age,
    role: p.role,
    location: p.location,
    bio: p.bio,
    about: p.about,
    interests: p.interests,
    projects: p.projects,
    skills: p.skills,
    fun: p.fun,
    contact: p.contact,
  },
  null,
  2,
)}

补充信息：
${p.aiNotes}

回答要求：
- 语气轻松、友好、简洁，像本人在聊天。
- 网站当前语言是${lang === "zh" ? "中文" : "英文（English）"}，默认用这种语言回答；如果访客明显在用另一种语言提问，就跟随访客的语言。
- 只根据上面的资料回答。资料里没有的事情，坦白说"这个我还没写进作品集"，并建议访客通过联系方式直接问我，不要编造经历、数据或链接。
- 页面可以渲染信息卡片。当回答涉及以下主题时，在回答末尾单独一行写对应标记（可以写多个，每个一行）：
  [[card:me]] 个人介绍  [[card:projects]] 项目  [[card:skills]] 技能  [[card:fun]] 兴趣爱好  [[card:contact]] 联系方式
  卡片会展示完整信息，所以正文不要把卡片里的内容逐条重复一遍，概括 1-3 句即可。
- 不要使用 Markdown 标题和表格，可以用简短的列表。`;
}

export async function POST(req: Request) {
  const body = (await req.json()) as {
    lang?: Lang;
    messages: Anthropic.MessageParam[];
  };
  const lang: Lang = body.lang === "en" ? "en" : "zh";
  const errors = ERRORS[lang];

  const encoder = new TextEncoder();

  const stream = new ReadableStream({
    async start(controller) {
      try {
        const client = new Anthropic();
        const response = client.beta.messages.stream({
          model: "claude-opus-5-5",
          max_tokens: 4096,
          output_config: { effort: "low" },
          betas: ["server-side-fallback-2026-07-01"],
          fallbacks: "default",
          system: buildSystemPrompt(lang),
          cache_control: { type: "ephemeral" },
          messages: body.messages.slice(-20),
        });

        for await (const event of response) {
          if (
            event.type === "content_block_delta" &&
            event.delta.type === "text_delta"
          ) {
            controller.enqueue(encoder.encode(event.delta.text));
          }
        }

        const final = await response.finalMessage();
        if (final.stop_reason === "refusal") {
          controller.enqueue(encoder.encode(`\n\n${errors.refusal}`));
        }
      } catch (error) {
        let message = errors.generic;
        if (
          error instanceof Anthropic.AuthenticationError ||
          (error instanceof Error && /api ?key|apiKey|credential/i.test(error.message))
        ) {
          message = errors.noKey;
        } else if (error instanceof Anthropic.RateLimitError) {
          message = errors.rateLimit;
        } else if (error instanceof Anthropic.APIError) {
          console.error(`Claude API error ${error.status}:`, error.message);
        } else {
          console.error(error);
        }
        controller.enqueue(encoder.encode(`[[error]]${message}`));
      } finally {
        controller.close();
      }
    },
  });

  return new Response(stream, {
    headers: { "Content-Type": "text/plain; charset=utf-8" },
  });
}
