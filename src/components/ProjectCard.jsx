import { FiArrowUpRight, FiExternalLink, FiGithub, FiImage } from 'react-icons/fi';
import { TechIcon } from './TechIcons';
import TiltCard from './TiltCard';

const statusTones = {
  live: 'border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300',
  source: 'border-line/15 bg-canvas/70 text-muted',
  dev: 'border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300',
};

export default function ProjectCard({ project, wide = false }) {
  const { source, demo } = project.links;
  const statusTone = statusTones[project.status.tone] || statusTones.source;

  return (
    <TiltCard
      as="article"
      max={wide ? 4 : 6}
      lift={-5}
      className={`group card relative flex flex-col overflow-hidden hover:border-accent/30 ${
        wide ? 'md:col-span-2 lg:flex-row' : ''
      }`}
    >
      <div
        data-accent={project.accent}
        className={`project-visual relative overflow-hidden ${
          wide
            ? 'min-h-[230px] md:min-h-[260px] lg:min-h-full lg:w-[44%] lg:shrink-0'
            : 'aspect-[16/9]'
        }`}
      >
        <span className="absolute left-4 top-4 z-10 inline-flex items-center gap-2 font-mono text-xs uppercase tracking-[0.18em] text-muted">
          <span className="text-accent">{project.index}</span>
          <span className="text-muted/40">/</span>
          {project.category}
        </span>

        <span
          className={`absolute right-3 top-3 z-10 inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-mono text-xs uppercase tracking-[0.12em] backdrop-blur-md ${statusTone}`}
        >
          <span className="h-1 w-1 rounded-full bg-current" aria-hidden="true" />
          {project.status.label}
        </span>

        <div className="absolute inset-0 flex flex-col items-center justify-center gap-2.5">
          <span className="grid h-11 w-11 place-items-center rounded-xl border border-dashed border-line/25 bg-canvas/30 text-muted backdrop-blur-sm transition-colors duration-300 group-hover:border-accent/40 group-hover:text-accent">
            <FiImage className="h-4 w-4" aria-hidden="true" />
          </span>
          <span className="rounded-full border border-dashed border-line/20 bg-canvas/30 px-2.5 py-1 font-mono text-xs uppercase tracking-[0.16em] text-muted/80 backdrop-blur-sm">
            {project.visualNote}
          </span>
        </div>

        <span
          aria-hidden="true"
          className="pointer-events-none absolute -bottom-6 right-1 select-none font-mono text-[92px] font-bold leading-none text-line/[0.06]"
        >
          {project.index}
        </span>
      </div>

      <div className="relative z-10 flex flex-1 flex-col p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <span className="font-mono text-xs uppercase tracking-[0.18em] text-muted/90">
            Case study
          </span>
          {wide ? (
            <span className="rounded-full border border-accent/20 bg-accent/[0.06] px-2 py-0.5 font-mono text-xs uppercase tracking-[0.14em] text-accent">
              Featured
            </span>
          ) : null}
        </div>

        <h3 className="mt-2 text-xl font-semibold leading-tight tracking-tight sm:text-[1.4rem]">
          {source || demo ? (
            <a
              href={source || demo}
              target="_blank"
              rel="noreferrer noopener"
              className="transition-colors hover:text-accent"
            >
              {project.title}
            </a>
          ) : (
            project.title
          )}
        </h3>

        <div className="mt-4 space-y-3 text-[13px] leading-relaxed text-muted sm:text-sm">
          <p>
            <span className="mr-2 font-mono text-xs uppercase tracking-[0.14em] text-accent">
              Problem
            </span>
            {project.problem}
          </p>
          <p>
            <span className="mr-2 font-mono text-xs uppercase tracking-[0.14em] text-violet">
              Build
            </span>
            {project.does}
          </p>
        </div>

        <ul className="mt-5 flex flex-wrap gap-1.5" aria-label={`${project.title} technology stack`}>
          {project.tech.length ? (
            project.tech.map((tech) => (
              <li key={tech} className="chip text-ink/80">
                <TechIcon name={tech} className="h-3 w-3" />
                {tech}
              </li>
            ))
          ) : (
            <li className="chip border-dashed text-muted/90">{project.techNote}</li>
          )}
        </ul>

        <div className="mt-auto flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line/10 pt-4">
          {source ? (
            <a
              href={source}
              target="_blank"
              rel="noreferrer noopener"
              className="link-arrow text-xs text-muted hover:text-accent"
              aria-label={`${project.title} source code on GitHub (opens in a new tab)`}
            >
              <FiGithub className="h-3.5 w-3.5" aria-hidden="true" />
              Source
              <FiArrowUpRight className="h-3 w-3" aria-hidden="true" />
            </a>
          ) : (
            <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted/90">
              <FiGithub className="h-3.5 w-3.5" aria-hidden="true" />
              [ADD: repository URL]
            </span>
          )}

          {demo ? (
            <a
              href={demo}
              target="_blank"
              rel="noreferrer noopener"
              className="link-arrow text-xs text-muted hover:text-accent"
              aria-label={`${project.title} live demo (opens in a new tab)`}
            >
              <FiExternalLink className="h-3.5 w-3.5" aria-hidden="true" />
              Live demo
            </a>
          ) : null}

          {!demo && project.status.tone === 'dev' ? (
            <span className="font-mono text-xs text-muted/90">Demo — [ADD: link]</span>
          ) : null}
        </div>
      </div>
    </TiltCard>
  );
}
