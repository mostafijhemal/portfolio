import { useEffect, useState } from 'react';
import { FiArrowDown, FiArrowUpRight, FiClock, FiDownload, FiMapPin } from 'react-icons/fi';
import { profile, socials } from '../data/content';
import { SocialIcon } from './SocialIcons';
import TiltCard from './TiltCard';
import TypewriterLine from './TypewriterLine';

const dhakaTime = new Intl.DateTimeFormat('en-GB', {
  timeZone: 'Asia/Dhaka',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
});

function DhakaClock() {
  const [now, setNow] = useState(() => new Date());

  useEffect(() => {
    const tick = () => setNow(new Date());
    const timer = window.setInterval(tick, 30_000);
    const onVisibility = () => {
      if (!document.hidden) tick();
    };
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      window.clearInterval(timer);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <time
      dateTime={now.toISOString()}
      title="Bangladesh Standard Time (UTC+6)"
      className="inline-flex items-center gap-1 tabular-nums"
    >
      <FiClock className="h-3 w-3 shrink-0 text-line/40" aria-hidden="true" />
      <span className="sr-only">Local time in Dhaka:</span>
      <span>{dhakaTime.format(now)}</span>
      <span className="text-line/40">UTC+6</span>
    </time>
  );
}

const codeLines = [
  { n: '01', content: <><span className="text-violet">const</span> <span className="text-ink">me</span> <span className="text-muted">=</span> <span className="text-muted">{'{'}</span></> },
  { n: '02', content: <>&nbsp;&nbsp;<span className="text-accent">name</span><span className="text-muted">:</span> <span className="text-emerald-700 dark:text-emerald-300/90">&quot;Mostafijur Rahman&quot;</span><span className="text-muted">,</span></> },
  { n: '03', content: <>&nbsp;&nbsp;<span className="text-accent">role</span><span className="text-muted">:</span> <span className="text-emerald-700 dark:text-emerald-300/90">&quot;Software Engineer&quot;</span><span className="text-muted">,</span></> },
  { n: '04', content: <>&nbsp;&nbsp;<span className="text-accent">education</span><span className="text-muted">:</span> <span className="text-emerald-700 dark:text-emerald-300/90">&quot;B.Sc. &amp; M.Sc. CSE&quot;</span><span className="text-muted">,</span></> },
  { n: '05', content: <>&nbsp;&nbsp;<span className="text-accent">based</span><span className="text-muted">:</span> <span className="text-emerald-700 dark:text-emerald-300/90">&quot;Dhaka, Bangladesh&quot;</span><span className="text-muted">,</span></> },
  { n: '06', content: <>&nbsp;&nbsp;<span className="text-accent">core</span><span className="text-muted">:</span> <span className="text-muted">[</span><span className="text-emerald-700 dark:text-emerald-300/90">&quot;Python&quot;</span><span className="text-muted">,</span> <span className="text-emerald-700 dark:text-emerald-300/90">&quot;Web&quot;</span><span className="text-muted">],</span></> },
  { n: '07', content: <>&nbsp;&nbsp;<span className="text-accent">exploring</span><span className="text-muted">:</span> <span className="text-muted">[</span><span className="text-emerald-700 dark:text-emerald-300/90">&quot;Laravel&quot;</span><span className="text-muted">,</span> <span className="text-emerald-700 dark:text-emerald-300/90">&quot;FastAPI&quot;</span><span className="text-muted">],</span></> },
  { n: '08', content: <>&nbsp;&nbsp;<span className="text-accent">motto</span><span className="text-muted">:</span> <span className="text-emerald-700 dark:text-emerald-300/90">&quot;Build • Learn • Improve • Share&quot;</span><span className="text-muted">,</span></> },
  { n: '09', content: <><span className="text-muted">{'};'}</span><span className="ml-2 inline-block h-3.5 w-[7px] translate-y-0.5 animate-blink bg-accent/80" aria-hidden="true" /></> },
];

export default function Hero() {
  return (
    <section
      id="home"
      aria-labelledby="hero-title"
      className="relative flex min-h-[100svh] items-center overflow-hidden pb-16 pt-28 sm:pt-32 lg:pb-24"
    >
      <div className="mx-auto grid w-full max-w-shell gap-14 px-5 sm:px-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
        <div className="min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <div className="inline-flex flex-wrap items-center gap-x-3 gap-y-2 rounded-full border border-line/10 bg-line/[0.03] px-3.5 py-1.5 font-mono text-xs text-muted">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
              </span>
              <span>Software Engineer</span>
              <DhakaClock />
              <span className="inline-flex items-center gap-1">
                <FiMapPin className="h-3 w-3" aria-hidden="true" />
                Dhaka, Bangladesh
              </span>
            </div>

            <span className="inline-flex items-center gap-2 rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-3.5 py-1.5 font-mono text-xs text-emerald-700 dark:text-emerald-300">
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-60" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-400" />
              </span>
              {profile.availability}
            </span>
          </div>

          <h1
            id="hero-title"
            className="mt-6 text-[clamp(2.9rem,8.4vw,5.4rem)] font-semibold leading-[0.95] tracking-[-0.05em]"
          >
            <span className="block">{profile.firstName}</span>
            <span className="text-gradient block">{profile.lastName}</span>
          </h1>

          <div className="mt-5 flex min-h-[28px] items-center gap-2 font-mono text-sm sm:text-base">
            <TypewriterLine phrases={profile.typingPhrases} />
          </div>

          <p className="mt-6 max-w-xl text-base leading-relaxed text-muted sm:text-lg">
            {profile.valueStatement}
          </p>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <a href="#projects" className="btn-primary group">
              View Projects
              <FiArrowDown
                className="h-4 w-4 transition-transform duration-200 group-hover:translate-y-0.5"
                aria-hidden="true"
              />
            </a>
            <a href="#contact" className="btn-ghost group">
              Contact Me
              <FiArrowUpRight
                className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                aria-hidden="true"
              />
            </a>
            <a
              href={profile.resume.href}
              download
              className="link-arrow px-2 py-2 text-muted hover:text-accent"
              title={profile.resume.note}
            >
              <FiDownload className="h-4 w-4" aria-hidden="true" />
              {profile.resume.label}
            </a>
          </div>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-muted/90">
              Find me
            </span>
            <span className="h-px w-8 bg-line/15" aria-hidden="true" />
            <ul className="flex items-center gap-2">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="icon-btn"
                    aria-label={`${social.label} (opens in a new tab)`}
                    title={`${social.label} — ${social.handle}`}
                  >
                    <SocialIcon id={social.id} />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="relative mx-auto w-full min-w-0 max-w-[520px] lg:mx-0 lg:justify-self-end">
          <TiltCard
            max={5}
            lift={-4}
            scale={1.01}
            className="gradient-ring card relative overflow-hidden shadow-card"
          >
            <div className="relative z-10 flex items-center gap-2 border-b border-line/10 px-4 py-3">
              <span className="h-2.5 w-2.5 rounded-full bg-[#ff5f57]/80" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#febc2e]/80" aria-hidden="true" />
              <span className="h-2.5 w-2.5 rounded-full bg-[#28c840]/80" aria-hidden="true" />
              <span className="ml-2 truncate font-mono text-xs text-muted">~/profile.js</span>
            </div>

            <div className="relative z-10 overflow-x-auto px-4 py-5 sm:px-5">
              <pre className="min-w-[240px] font-mono text-xs leading-[1.9] sm:min-w-[300px] sm:text-xs">
                <code>
                  {codeLines.map((line) => (
                    <span key={line.n} className="flex gap-4">
                      <span className="w-4 shrink-0 select-none text-right text-muted/35">
                        {line.n}
                      </span>
                      <span className="whitespace-pre">{line.content}</span>
                    </span>
                  ))}
                </code>
              </pre>
            </div>

            <div className="relative z-10 flex items-center justify-between gap-3 border-t border-line/10 px-4 py-3 font-mono text-xs text-muted">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                build · learn · improve · share
              </span>
              <a
                href="https://github.com/mostafijhemal"
                target="_blank"
                rel="noreferrer noopener"
                className="inline-flex items-center gap-1 text-muted transition-colors hover:text-accent"
              >
                @mostafijhemal
                <FiArrowUpRight className="h-3 w-3" aria-hidden="true" />
              </a>
            </div>
          </TiltCard>

          <TiltCard
            max={8}
            lift={-3}
            glare={false}
            className="card absolute -right-2 -top-4 hidden items-center gap-2 px-3 py-2 font-mono text-xs text-muted shadow-card sm:flex lg:-right-5"
          >
            <FiMapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
            Dhaka, BD
          </TiltCard>

          <TiltCard
            max={8}
            lift={-3}
            glare={false}
            className="card absolute -bottom-5 -left-3 hidden items-center gap-2 px-3 py-2 font-mono text-xs text-muted shadow-card sm:flex lg:-left-6"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
            B.Sc. &amp; M.Sc. CSE
          </TiltCard>
        </div>
      </div>

      <a
        href="#about"
        className="absolute bottom-6 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 font-mono text-xs uppercase tracking-[0.22em] text-muted/90 transition-colors hover:text-accent lg:flex"
      >
        Scroll to explore
        <span className="h-8 w-px bg-gradient-to-b from-accent/70 to-transparent" aria-hidden="true" />
      </a>
    </section>
  );
}

