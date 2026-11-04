import {
  FiAlertCircle,
  FiArrowUpRight,
  FiClock,
  FiCode,
  FiFolder,
  FiGithub,
  FiRefreshCw,
} from 'react-icons/fi';
import { github, profile } from '../data/content';
import { useGitHub } from '../hooks/useGitHub';
import Reveal from './Reveal';
import Section from './Section';
import TiltCard from './TiltCard';

const languageColors = {
  Python: '#4B8BBE',
  JavaScript: '#E8C547',
  TypeScript: '#3178C6',
  HTML: '#E34F26',
  CSS: '#3B9CD9',
  PHP: '#8892BF',
  'C++': '#00599C',
  C: '#A8B9CC',
  Java: '#B07219',
  Shell: '#89E051',
  Vue: '#41B883',
  Dart: '#00B4AB',
  Go: '#00ADD8',
  Ruby: '#CC342D',
  Jupyter: '#F37626',
  'Jupyter Notebook': '#F37626',
};

function timeAgo(isoDate) {
  if (!isoDate) return '';
  const seconds = Math.floor((Date.now() - new Date(isoDate).getTime()) / 1000);
  if (seconds < 60) return 'just now';
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  if (days < 30) return `${days}d ago`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo ago`;
  return `${Math.floor(months / 12)}y ago`;
}

function Stat({ icon: Icon, label, value }) {
  return (
    <div className="rounded-xl border border-line/10 bg-line/[0.02] p-3.5">
      <div className="flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.14em] text-muted/90">
        <Icon className="h-3 w-3 text-accent" aria-hidden="true" />
        {label}
      </div>
      <p className="mt-1.5 text-2xl font-semibold tabular-nums tracking-tight text-ink">{value}</p>
    </div>
  );
}

function GitHubSkeleton() {
  return (
    <TiltCard
      max={2.5}
      lift={-3}
      scale={1.004}
      glare={false}
      className="card overflow-hidden"
      aria-busy="true"
    >
      <div className="flex items-center gap-3 border-b border-line/10 p-5">
        <div className="skeleton h-11 w-11 rounded-full" />
        <div className="space-y-2">
          <div className="skeleton h-3 w-36 rounded" />
          <div className="skeleton h-2.5 w-24 rounded" />
        </div>
      </div>
      <div className="grid gap-6 p-5 lg:grid-cols-2 lg:p-6">
        <div className="grid grid-cols-2 gap-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="skeleton h-[74px] rounded-xl" />
          ))}
        </div>
        <div className="space-y-3">
          {[0, 1, 2, 3].map((item) => (
            <div key={item} className="skeleton h-12 rounded-lg" />
          ))}
        </div>
      </div>
      <span className="sr-only" role="status">
        Loading live GitHub activity
      </span>
    </TiltCard>
  );
}

export default function GitHubActivity() {
  const { status, data, retry } = useGitHub(github.username);
  const topLanguage = data?.languages?.[0]?.name ?? '—';

  return (
    <Section id="github" eyebrow={github.eyebrow} title={github.title} description={github.description}>
      <Reveal className="mt-10">
        {status === 'loading' ? <GitHubSkeleton /> : null}

        {status === 'error' ? (
          <TiltCard
            max={3}
            lift={-3}
            glare={false}
            className="card relative overflow-hidden p-7 text-center sm:p-10"
          >
            <div
              aria-hidden="true"
              className="glow-violet absolute left-1/2 top-0 h-40 w-72 -translate-x-1/2 opacity-60"
            />
            <span className="relative mx-auto grid h-12 w-12 place-items-center rounded-2xl border border-line/10 bg-line/[0.04] text-muted">
              <FiAlertCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <h3 className="relative mt-4 text-lg font-semibold">GitHub is taking a break.</h3>
            <p className="relative mx-auto mt-2 max-w-md text-sm leading-relaxed text-muted">
              {github.fallback}
            </p>
            <div className="relative mt-6 flex flex-wrap items-center justify-center gap-3">
              <button type="button" onClick={retry} className="btn-ghost px-4 py-2.5 text-xs">
                <FiRefreshCw className="h-4 w-4" aria-hidden="true" />
                Try again
              </button>
              <a
                href={github.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="btn-primary px-4 py-2.5 text-xs"
              >
                <FiGithub className="h-4 w-4" aria-hidden="true" />
                Open GitHub
                <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>
          </TiltCard>
        ) : null}

        {status === 'success' && data ? (
          <TiltCard max={2.5} lift={-3} scale={1.004} className="card overflow-hidden">
            <div className="relative z-10 flex flex-col gap-4 border-b border-line/10 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
              <div className="flex items-center gap-3">
                <span className="relative grid h-11 w-11 shrink-0 place-items-center overflow-hidden rounded-full bg-gradient-to-br from-accent/25 to-violet/25 font-mono text-xs font-semibold ring-1 ring-inset ring-line/20">
                  {profile.initials}
                  {data.avatar ? (
                    <img
                      src={data.avatar}
                      alt={`${profile.name} on GitHub`}
                      width="44"
                      height="44"
                      loading="lazy"
                      decoding="async"
                      referrerPolicy="no-referrer"
                      className="absolute inset-0 h-full w-full object-cover"
                      onError={(event) => event.currentTarget.remove()}
                    />
                  ) : null}
                </span>
                <div className="min-w-0">
                  <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-semibold">
                    {profile.name}
                    <span className="inline-flex items-center gap-1 rounded-full border border-emerald-500/25 bg-emerald-500/10 px-2 py-0.5 font-mono text-[8px] uppercase tracking-[0.12em] text-emerald-700 dark:text-emerald-300">
                      <span className="h-1 w-1 animate-pulse-dot rounded-full bg-current" aria-hidden="true" />
                      Live API
                    </span>
                  </p>
                  <p className="font-mono text-xs text-muted">@{github.username}</p>
                </div>
              </div>

              <a
                href={github.profileUrl}
                target="_blank"
                rel="noreferrer noopener"
                className="link-arrow self-start text-xs text-muted hover:text-accent sm:self-auto"
              >
                Open profile
                <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
              </a>
            </div>

            <div className="relative z-10 grid divide-y divide-line/10 lg:grid-cols-[0.95fr_1.05fr] lg:divide-x lg:divide-y-0">
              <div className="p-5 sm:p-6">
                <div className="grid grid-cols-2 gap-3">
                  <Stat icon={FiFolder} label="Public repos" value={data.publicRepos} />
                  <Stat icon={FiCode} label="Top language" value={topLanguage} />
                  <Stat icon={FiCode} label="Languages" value={data.languages.length} />
                  <Stat
                    icon={FiClock}
                    label="Latest push"
                    value={timeAgo(data.recent[0]?.updatedAt) || '—'}
                  />
                </div>

                <div className="mt-6">
                  <div className="flex items-baseline justify-between gap-3">
                    <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted/90">
                      Languages
                    </p>
                    <p className="font-mono text-xs text-muted/90">by primary repo language</p>
                  </div>

                  <ul className="mt-3 space-y-2.5">
                    {data.languages.length ? (
                      data.languages.map((language) => (
                        <li key={language.name}>
                          <div className="flex items-center justify-between gap-3 text-xs">
                            <span className="inline-flex items-center gap-2 text-muted">
                              <span
                                className="h-1.5 w-1.5 rounded-full"
                                style={{ backgroundColor: languageColors[language.name] || '#36BCF7' }}
                                aria-hidden="true"
                              />
                              {language.name}
                            </span>
                            <span className="font-mono text-xs text-muted/90">
                              {language.percent}%
                            </span>
                          </div>
                          <div className="mt-1.5 h-1 overflow-hidden rounded-full bg-line/[0.06]">
                            <div
                              className="h-full rounded-full"
                              style={{
                                width: `${language.percent}%`,
                                backgroundColor: languageColors[language.name] || '#36BCF7',
                              }}
                            />
                          </div>
                        </li>
                      ))
                    ) : (
                      <li className="text-xs text-muted">No language data yet.</li>
                    )}
                  </ul>
                </div>
              </div>

              <div className="p-5 sm:p-6">
                <div className="flex items-baseline justify-between gap-3">
                  <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted/90">
                    Recently pushed
                  </p>
                  <a
                    href={github.reposUrl}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="font-mono text-xs text-muted/90 transition-colors hover:text-accent"
                  >
                    all repos →
                  </a>
                </div>

                <ul className="mt-3 space-y-1">
                  {data.recent.map((repo) => (
                    <li key={repo.id}>
                      <a
                        href={repo.url}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="group/repo block rounded-lg border border-transparent px-2.5 py-2.5 transition-colors hover:border-line/10 hover:bg-line/[0.03]"
                      >
                        <span className="flex items-center gap-2">
                          <FiGithub
                            className="h-3.5 w-3.5 shrink-0 text-muted/90"
                            aria-hidden="true"
                          />
                          <span className="truncate font-mono text-xs font-medium text-ink group-hover/repo:text-accent">
                            {repo.name}
                          </span>
                          <span className="ml-auto shrink-0 font-mono text-xs text-muted/90">
                            {timeAgo(repo.updatedAt)}
                          </span>
                        </span>
                        <span className="mt-1 line-clamp-1 block pl-5 text-xs leading-relaxed text-muted">
                          {repo.description || 'No description yet.'}
                        </span>
                        <span className="mt-1 flex items-center gap-3 pl-5 font-mono text-xs text-muted/90">
                          {repo.language ? (
                            <span className="inline-flex items-center gap-1.5">
                              <span
                                className="h-1 w-1 rounded-full"
                                style={{
                                  backgroundColor: languageColors[repo.language] || '#36BCF7',
                                }}
                                aria-hidden="true"
                              />
                              {repo.language}
                            </span>
                          ) : null}
                          <span className="inline-flex items-center gap-1">
                            <FiClock className="h-2.5 w-2.5" aria-hidden="true" />
                            {timeAgo(repo.updatedAt)}
                          </span>
                        </span>
                      </a>
                    </li>
                  ))}
                </ul>

                <p className="mt-4 border-t border-line/10 pt-3 font-mono text-xs leading-relaxed text-muted/90">
                  Public GitHub API · cached for 10 minutes · non-fork repos
                </p>
              </div>
            </div>
          </TiltCard>
        ) : null}
      </Reveal>
    </Section>
  );
}
