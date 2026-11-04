import { FiArrowUpRight, FiPlay, FiPlus, FiYoutube } from 'react-icons/fi';
import { youtube } from '../data/content';
import Reveal from './Reveal';
import Section from './Section';
import TiltCard from './TiltCard';

export default function YouTubeSection() {
  return (
    <Section
      id="youtube"
      eyebrow={youtube.eyebrow}
      title={youtube.title}
      description={youtube.description}
    >
      <div className="mt-10 grid gap-5 lg:grid-cols-[1.08fr_0.92fr]">
        <Reveal className="h-full">
          <TiltCard max={4} lift={-4} className="card group relative h-full overflow-hidden p-3 sm:p-4">
            <div
              aria-hidden="true"
              className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-[#ff0033]/10 blur-3xl"
            />
            <div className="relative z-10 aspect-video overflow-hidden rounded-xl border border-line/10 bg-canvas">
              <div
                aria-hidden="true"
                className="absolute inset-0"
                style={{
                  background:
                    'radial-gradient(120% 100% at 15% 0%, rgb(var(--c-accent) / 0.2), transparent 55%), radial-gradient(100% 100% at 90% 100%, rgb(var(--c-violet) / 0.22), transparent 55%)',
                }}
              />
              <div aria-hidden="true" className="grid-overlay absolute inset-0 opacity-70" />
              <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                <a
                  href={youtube.url}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${youtube.cta} on YouTube (opens in a new tab)`}
                  className="grid h-16 w-16 place-items-center rounded-full bg-[#ff0033] text-white shadow-[0_18px_50px_-12px_rgba(255,0,51,0.7)] transition duration-300 group-hover:scale-105 sm:h-20 sm:w-20"
                >
                  <FiPlay className="ml-1 h-6 w-6 fill-current sm:h-7 sm:w-7" aria-hidden="true" />
                </a>
                <span className="font-mono text-xs uppercase tracking-[0.22em] text-muted">
                  Learning in public
                </span>
              </div>

              <div className="absolute inset-x-0 bottom-0 flex items-center justify-between gap-3 bg-gradient-to-t from-canvas/90 to-transparent px-4 pb-4 pt-10">
                <div className="flex items-center gap-2">
                  <span className="grid h-8 w-8 place-items-center rounded-lg bg-[#ff0033]/15 text-[#ff0033]">
                    <FiYoutube className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <div>
                    <p className="text-xs font-semibold">{youtube.handle}</p>
                    <p className="font-mono text-xs text-muted">YouTube channel</p>
                  </div>
                </div>
                <span className="hidden rounded-full border border-line/10 bg-canvas/50 px-2.5 py-1 font-mono text-xs text-muted backdrop-blur sm:block">
                  opens in a new tab
                </span>
              </div>
            </div>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <TiltCard
            max={4}
            lift={-3}
            glare={false}
            className="card flex h-full flex-col p-6 sm:p-7"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/90">
              On the channel
            </p>
            <h3 className="mt-3 text-xl font-semibold leading-snug sm:text-2xl">
              Notes from the journey — not a highlight reel.
            </h3>
            <p className="mt-3 text-sm leading-relaxed text-muted">
              I am still learning, and I would rather share the process than pretend to have all the
              answers. The plan is simple: build notes, experiments and things I am figuring out.
            </p>

            <ul className="mt-5 space-y-2.5">
              {youtube.topics.map((topic, index) => (
                <li key={topic} className="flex items-center gap-3">
                  <span className="font-mono text-xs text-accent/80">
                    {String(index + 1).padStart(2, '0')}
                  </span>
                  <span className="h-px flex-1 bg-line/10" aria-hidden="true" />
                  <span className="text-xs text-ink">{topic}</span>
                </li>
              ))}
            </ul>

            <a
              href={youtube.url}
              target="_blank"
              rel="noreferrer noopener"
              className="btn-ghost group mt-6 w-full py-2.5 text-xs"
            >
              <FiYoutube className="h-4 w-4 text-[#ff0033]" aria-hidden="true" />
              {youtube.cta}
              <FiArrowUpRight
                className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
          </TiltCard>
        </Reveal>
      </div>

      <div className="mt-5">
        <div className="flex items-baseline justify-between gap-3">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Featured videos
          </p>
          <p className="font-mono text-xs text-muted">[ADD: 2–3 video links]</p>
        </div>

        <div className="mt-3 grid gap-3 sm:grid-cols-3">
          {youtube.featured.length
            ? youtube.featured.map((video) => (
                <TiltCard
                  as="a"
                  key={video.href}
                  href={video.href}
                  target="_blank"
                  rel="noreferrer noopener"
                  max={8}
                  lift={-4}
                  scale={1.02}
                  className="card group flex items-center gap-3 p-4 hover:border-accent/30"
                >
                  <span className="relative z-10 grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-[#ff0033]/10 text-[#ff0033]">
                    <FiPlay className="ml-0.5 h-4 w-4 fill-current" aria-hidden="true" />
                  </span>
                  <span className="relative z-10 min-w-0 flex-1 text-xs font-medium leading-snug">
                    {video.title}
                  </span>
                  <FiArrowUpRight
                    className="relative z-10 h-3.5 w-3.5 shrink-0 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                    aria-hidden="true"
                  />
                </TiltCard>
              ))
            : [0, 1, 2].map((slot) => (
                <div
                  key={slot}
                  className="flex items-center gap-3 rounded-card border border-dashed border-line/15 bg-line/[0.015] p-4"
                >
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-lg border border-dashed border-line/20 text-muted/90">
                    <FiPlus className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <span className="min-w-0">
                    <span className="block text-xs font-medium text-muted">Video slot</span>
                    <span className="mt-0.5 block truncate font-mono text-xs text-muted">
                      {youtube.slotLabel}
                    </span>
                  </span>
                </div>
              ))}
        </div>
      </div>
    </Section>
  );
}
