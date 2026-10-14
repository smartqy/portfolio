import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/i18n";
import { ContactSection } from "./contact-section";
import { FunSection } from "./fun-section";
import type { CardKey } from "./quick-actions";

const cardClass = "rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.03),0_8px_24px_-12px_rgb(15_118_110/0.12)] backdrop-blur-md";

function SectionTitle({ title, subtitle }: { title: string; subtitle: string }) {
  return (
    <div className="mb-6 space-y-1">
      <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
      <p className="text-muted">{subtitle}</p>
    </div>
  );
}

function MeCard() {
  const { p: profile, ui } = useLang();
  return (
    <div className="space-y-8">
      <div className="grid items-center gap-6 sm:grid-cols-2 sm:gap-10">
        <Image
          src={profile.photo}
          alt={profile.name}
          width={600}
          height={600}
          priority
          className="aspect-square w-full max-w-xs rounded-2xl object-cover sm:max-w-none"
        />
        <div className="space-y-4">
          <div className="space-y-1">
            <h2 className="text-3xl font-semibold tracking-tight">{profile.name}</h2>
            <p className="flex flex-wrap items-center gap-x-3 text-muted">
              <span>{ui.age(profile.age)}</span>
              <span className="size-1.5 rounded-full bg-border" />
              <span>{profile.location}</span>
            </p>
          </div>
          <div className="space-y-2">
            <div className="text-lg">👋</div>
            <p className="leading-relaxed">{profile.bio}</p>
          </div>
          <div className="flex flex-wrap gap-2">
            {profile.interests.map((tag) => (
              <span key={tag} className="rounded-full bg-foreground/5 px-3 py-1 text-sm">
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
      <p className="leading-relaxed">{profile.about}</p>
    </div>
  );
}

function ProjectsCard() {
  const { p: profile, ui } = useLang();
  return (
    <div>
      <SectionTitle {...ui.sections.projects} />
      <div className="grid gap-4 sm:grid-cols-2">
        {profile.projects.map((p) => {
          const inner = (
            <>
              <div className="flex items-start justify-between gap-3">
                <h3 className="font-semibold">{p.title}</h3>
                <span className="flex shrink-0 items-center gap-1 text-xs text-muted">
                  {p.date}
                  {p.link && <ArrowUpRight className="size-4 transition group-hover:text-accent" />}
                </span>
              </div>
              <p className="mt-2 text-sm leading-relaxed text-muted">{p.description}</p>
              <div className="mt-4 flex flex-wrap gap-1.5">
                {p.tags.map((t) => (
                  <span key={t} className="rounded-full bg-accent/10 px-2.5 py-0.5 text-xs text-accent">
                    {t}
                  </span>
                ))}
              </div>
            </>
          );
          return p.link ? (
            <a
              key={p.title}
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className={`${cardClass} group transition hover:-translate-y-0.5 hover:shadow-md`}
            >
              {inner}
            </a>
          ) : (
            <div key={p.title} className={cardClass}>
              {inner}
            </div>
          );
        })}
      </div>
    </div>
  );
}

function SkillsCard() {
  const { p: profile, ui } = useLang();
  return (
    <div>
      <SectionTitle {...ui.sections.skills} />
      <div className="grid gap-4 sm:grid-cols-2">
        {profile.skills.map((s) => (
          <div key={s.category} className={cardClass}>
            <h3 className="mb-3 font-semibold">{s.category}</h3>
            <div className="flex flex-wrap gap-2">
              {s.items.map((item) => (
                <span key={item} className="rounded-full bg-foreground/5 px-3 py-1 text-sm">
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export const CARDS: Record<CardKey, () => React.JSX.Element> = {
  me: MeCard,
  projects: ProjectsCard,
  skills: SkillsCard,
  fun: FunSection,
  contact: ContactSection,
};
