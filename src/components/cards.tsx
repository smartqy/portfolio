import Image from "next/image";
import { useLang } from "@/i18n";
import { ContactSection } from "./contact-section";
import { FunSection } from "./fun-section";
import { ProjectsSection } from "./projects-section";
import { SkillsSection } from "./skills-section";
import type { CardKey } from "./quick-actions";

const cardClass = "rounded-2xl border border-border bg-card p-5 shadow-[0_1px_2px_rgb(0_0_0/0.03),0_8px_24px_-12px_rgb(15_118_110/0.12)] backdrop-blur-md";

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

      <div className="grid gap-4 sm:grid-cols-5">
        {/* 经历 */}
        <div className={`${cardClass} sm:col-span-3`}>
          <h3 className="mb-4 text-sm font-medium text-muted">{ui.experienceTitle}</h3>
          {profile.experience.map((job) => (
            <div key={job.company} className="space-y-3">
              <div className="flex flex-wrap items-baseline justify-between gap-x-3 gap-y-1">
                <div>
                  <p className="font-semibold">
                    {job.role} · {job.company}
                  </p>
                  <p className="text-sm text-muted">{job.companyNote}</p>
                </div>
                <span className="text-xs text-muted tabular-nums">{job.period}</span>
              </div>
              <ul className="space-y-2 text-sm leading-relaxed text-foreground/80">
                {job.highlights.map((h) => (
                  <li key={h} className="flex gap-2.5">
                    <span className="mt-2 size-1.5 shrink-0 rounded-full bg-accent/60" />
                    {h}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* 教育背景 */}
        <div className={`${cardClass} sm:col-span-2`}>
          <h3 className="mb-4 text-sm font-medium text-muted">{ui.educationTitle}</h3>
          <ol className="relative space-y-5 border-l border-border pl-5">
            {profile.education.map((e, i) => (
              <li key={e.school} className="relative">
                <span
                  className={`absolute top-1.5 -left-[25px] size-2.5 rounded-full ring-4 ring-card ${
                    i === 0 ? "bg-accent" : "bg-border"
                  }`}
                />
                <p className="font-semibold">{e.school}</p>
                <p className="text-sm text-muted">{e.degree}</p>
                <p className="mt-0.5 text-xs text-muted tabular-nums">{e.period}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </div>
  );
}

export const CARDS: Record<CardKey, () => React.JSX.Element> = {
  me: MeCard,
  projects: ProjectsSection,
  skills: SkillsSection,
  fun: FunSection,
  contact: ContactSection,
};
