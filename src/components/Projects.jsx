import { useState } from 'react';
import { FiGithub } from 'react-icons/fi';
import { github, projectFilters, projects, projectsSection } from '../data/content';
import ProjectCard from './ProjectCard';
import Reveal from './Reveal';
import Section from './Section';

const counts = projectFilters.reduce((acc, filter) => {
  acc[filter.id] =
    filter.id === 'all' ? projects.length : projects.filter((p) => p.categoryId === filter.id).length;
  return acc;
}, {});

export default function Projects() {
  const [activeFilter, setActiveFilter] = useState('all');
  const filtered =
    activeFilter === 'all' ? projects : projects.filter((p) => p.categoryId === activeFilter);

  return (
    <Section
      id="projects"
      eyebrow={projectsSection.eyebrow}
      title={projectsSection.title}
      description={projectsSection.description}
    >
      <Reveal delay={0.08} className="mt-9">
        <div
          className="flex flex-wrap items-center gap-2"
          role="group"
          aria-label="Filter projects by category"
        >
          {projectFilters.map((filter) => {
            const selected = activeFilter === filter.id;
            return (
              <button
                key={filter.id}
                type="button"
                onClick={() => setActiveFilter(filter.id)}
                aria-pressed={selected}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] transition duration-200 ${
                  selected
                    ? 'border-accent/40 bg-accent/10 text-ink'
                    : 'border-line/10 bg-line/[0.02] text-muted hover:border-line/25 hover:text-ink'
                }`}
              >
                {filter.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs ${
                    selected ? 'bg-accent/20 text-accent' : 'bg-line/[0.05] text-muted/90'
                  }`}
                >
                  {counts[filter.id]}
                </span>
              </button>
            );
          })}
        </div>
      </Reveal>

      <div
        key={activeFilter}
        className="panel-enter mt-7 grid gap-5 md:grid-cols-2 lg:grid-cols-3"
      >
          {filtered.length ? (
            filtered.map((project) => (
              <ProjectCard
                key={project.id}
                project={project}
                wide={Boolean(project.featured) && filtered.length > 1}
              />
            ))
          ) : (
            <p className="col-span-full rounded-card border border-dashed border-line/15 p-8 text-center text-sm text-muted">
              {projectsSection.empty}
            </p>
          )}
      </div>

      <Reveal delay={0.05} className="mt-10 flex flex-col items-center gap-3">
        <a
          href={github.reposUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="btn-ghost group"
        >
          <FiGithub className="h-4 w-4" aria-hidden="true" />
          {projectsSection.allRepos}
        </a>
        <p className="font-mono text-xs text-muted/90">
          More repositories live on GitHub.
        </p>
      </Reveal>
    </Section>
  );
}
