import {
  FiArrowUpRight,
  FiBookOpen,
  FiBriefcase,
  FiDownload,
  FiMapPin,
  FiTerminal,
} from 'react-icons/fi';
import { about, profile } from '../data/content';
import { assetUrl } from '../lib/assetUrl';
import Reveal from './Reveal';
import Section from './Section';
import TiltCard from './TiltCard';

const loop = ['Build', 'Learn', 'Improve', 'Share'];

function ProfilePortrait() {
  return (
    <div className="relative w-[220px] sm:w-[250px] lg:w-[272px]">
      <div
        aria-hidden="true"
        className="absolute -inset-4 rounded-[36px] bg-gradient-to-br from-accent/25 via-violet/10 to-violet/25 blur-2xl"
      />

      <TiltCard
        max={6}
        lift={-4}
        scale={1.01}
        glare={false}
        className="gradient-ring card relative overflow-hidden p-2 shadow-card"
      >
        <img
          src={assetUrl(profile.photo.src)}
          alt={profile.photo.alt}
          width="460"
          height="460"
          loading="lazy"
          decoding="async"
          className="aspect-square w-full rounded-[20px] object-cover"
        />
      </TiltCard>

      <span className="absolute inset-x-4 -bottom-3 z-10 flex justify-center">
        <span className="rounded-full border border-line/15 bg-canvas/95 px-3 py-1 font-mono text-[10px] uppercase tracking-[0.16em] text-muted backdrop-blur">
          {profile.photo.caption}
        </span>
      </span>
    </div>
  );
}

export default function About() {
  return (
    <Section
      id="about"
      eyebrow={about.eyebrow}
      title={about.title}
      description={about.intro}
      aside={<ProfilePortrait />}
    >
      <div className="mt-12 grid gap-6 lg:grid-cols-[1.45fr_0.85fr] lg:items-start">
        <Reveal>
          <TiltCard
            max={2.5}
            lift={-3}
            scale={1.004}
            glare={false}
            className="card p-6 sm:p-8 lg:p-9"
          >
            <div className="flex items-center gap-3">
              <span className="grid h-8 w-8 place-items-center rounded-lg bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                <FiTerminal className="h-4 w-4" aria-hidden="true" />
              </span>
              <p className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                {about.storyLabel}
              </p>
            </div>

            <div className="mt-8 space-y-4 text-[15px] leading-[1.85] text-muted sm:text-base">
              {about.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 32)}>{paragraph}</p>
              ))}
            </div>

            <div className="mt-8">
              <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted/90">
                <FiBriefcase className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                {about.experience.label}
              </div>
              <ul className="mt-3 space-y-3">
                {about.experience.items.map((item) => (
                  <li
                    key={`${item.company}-${item.startDate}`}
                    className="rounded-xl border border-line/10 bg-line/[0.02] p-4"
                  >
                    <div className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                      <p className="text-sm font-semibold text-ink">{item.role}</p>
                      <span className="font-mono text-xs text-muted/90">
                        {item.period}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-muted">
                      {item.company}
                      {item.location ? ` · ${item.location}` : ''}
                    </p>
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-line/10 bg-line/[0.02] p-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted/90">
                  <FiBookOpen className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {about.education.label}
                </div>
                <ul className="mt-3 space-y-3">
                  {about.education.items.map((item) => (
                    <li key={`${item.institution}-${item.year}`}>
                      <p className="text-sm font-medium leading-snug text-ink">{item.value}</p>
                      <p className="mt-1 font-mono text-xs text-muted/90">
                        {item.institution} · {item.year}
                      </p>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="rounded-xl border border-line/10 bg-line/[0.02] p-4">
                <div className="flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted/90">
                  <FiMapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  {about.location.label}
                </div>
                <p className="mt-2 text-sm font-medium leading-snug text-ink">
                  {about.location.value}
                </p>
                <p className="mt-1 font-mono text-xs text-muted/90">{about.location.note}</p>
              </div>
            </div>

            <div className="mt-8">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/90">
                {about.exploring.label}
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {about.exploring.items.map((item) => (
                  <li key={item} className="chip border-violet/25 bg-violet/[0.06] text-ink">
                    <span className="h-1 w-1 rounded-full bg-violet" aria-hidden="true" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>

            <div className="mt-8 flex items-center gap-4 border-t border-line/10 pt-6">
              <span className="font-mono text-2xl text-accent" aria-hidden="true">
                &ldquo;
              </span>
              <p className="font-mono text-xs tracking-wide text-muted sm:text-[13px]">
                {profile.tagline}
              </p>
            </div>
          </TiltCard>
        </Reveal>

        <div className="flex flex-col gap-6">
          <Reveal delay={0.08}>
            <TiltCard max={4} lift={-3} glare={false} className="card p-6">
              <div className="flex items-center gap-4">
                <span className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-accent/25 to-violet/25 font-mono text-lg font-semibold ring-1 ring-inset ring-line/20">
                  {profile.initials}
                </span>
                <div className="min-w-0">
                  <p className="truncate text-base font-semibold">{profile.name}</p>
                  <p className="font-mono text-xs text-muted">{profile.role}</p>
                </div>
              </div>

              <dl className="mt-6 divide-y divide-line/10 border-y border-line/10">
                {about.quickFacts.map((fact) => (
                  <div key={fact.label} className="flex items-start justify-between gap-4 py-3">
                    <dt className="font-mono text-xs uppercase tracking-[0.16em] text-muted/90">
                      {fact.label}
                    </dt>
                    <dd className="max-w-[58%] text-right text-xs font-medium leading-snug text-ink">
                      {fact.value}
                    </dd>
                  </div>
                ))}
              </dl>

              <p className="mt-3 text-xs leading-relaxed text-muted/90">{about.quickFactsNote}</p>

              <a
                href={assetUrl(profile.resume.href)}
                download
                className="btn-ghost mt-5 w-full py-2.5 text-xs"
                title={profile.resume.note}
              >
                <FiDownload className="h-4 w-4" aria-hidden="true" />
                Download résumé
                <span className="font-mono text-xs text-muted/90">PDF</span>
              </a>
            </TiltCard>
          </Reveal>

          <Reveal delay={0.14}>
            <TiltCard
              max={4}
              lift={-3}
              glare={false}
              className="card relative overflow-hidden p-6"
            >
              <div
                aria-hidden="true"
                className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-violet/10 blur-2xl"
              />
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/90">
                My working loop
              </p>
              <ol className="mt-4 space-y-3">
                {loop.map((step, index) => (
                  <li key={step} className="flex items-center gap-3">
                    <span className="grid h-6 w-6 place-items-center rounded-md border border-line/10 bg-line/[0.03] font-mono text-xs text-accent">
                      {index + 1}
                    </span>
                    <span className="text-sm text-ink">{step}</span>
                    {index < loop.length - 1 ? (
                      <span className="ml-auto font-mono text-xs text-muted/40" aria-hidden="true">
                        ↓
                      </span>
                    ) : (
                      <span
                        className="ml-auto h-1.5 w-1.5 rounded-full bg-accent"
                        aria-hidden="true"
                      />
                    )}
                  </li>
                ))}
              </ol>
              <p className="mt-4 border-t border-line/10 pt-4 text-xs leading-relaxed text-muted">
                {profile.levelNote}
              </p>
              <a href="#skills" className="link-arrow mt-4 text-xs text-muted hover:text-accent">
                See the honest toolkit
                <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </TiltCard>
          </Reveal>
        </div>
      </div>
    </Section>
  );
}
