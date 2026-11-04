import { useRef, useState } from 'react';
import { FiArrowUpRight } from 'react-icons/fi';
import { profile, skills } from '../data/content';
import { TechIcon } from './TechIcons';
import Reveal from './Reveal';
import Section from './Section';
import TiltCard from './TiltCard';

const tierStyles = {
  core: {
    dot: 'bg-accent',
    text: 'text-accent',
  },
  working: {
    dot: 'bg-violet',
    text: 'text-violet',
  },
  exploring: {
    dot: 'border border-dashed border-muted/70 bg-transparent',
    text: 'text-muted',
  },
};

function SkillTile({ item, tier, legend }) {
  return (
    <TiltCard
      max={8}
      lift={-4}
      scale={1.02}
      title={`${item.name} — ${legend?.label}: ${legend?.note}`}
      className="group flex items-center gap-3 rounded-xl border border-line/10 bg-line/[0.02] p-3.5 hover:border-accent/30 hover:bg-line/[0.04]"
    >
      <span className="relative z-10 grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-line/[0.04] ring-1 ring-inset ring-line/10 transition-colors group-hover:bg-line/[0.07]">
        <TechIcon
          name={item.name}
          icon={item.icon}
          color={item.color}
          className="h-[18px] w-[18px]"
        />
      </span>
      <span className="relative z-10 min-w-0">
        <span className="block truncate text-[13px] font-medium text-ink">{item.name}</span>
        <span
          className={`mt-0.5 flex items-center gap-1.5 font-mono text-xs uppercase tracking-[0.1em] ${tier.text}`}
        >
          <span className={`h-1 w-1 rounded-full ${tier.dot}`} aria-hidden="true" />
          {legend?.label}
        </span>
      </span>
    </TiltCard>
  );
}

export default function Skills() {
  const [activeTab, setActiveTab] = useState(skills.categories[0].id);
  const tabRefs = useRef([]);
  const activeCategory = skills.categories.find((category) => category.id === activeTab);

  const onTabKeyDown = (event, index) => {
    const lastIndex = skills.categories.length - 1;
    let nextIndex = null;

    if (event.key === 'ArrowRight') nextIndex = index === lastIndex ? 0 : index + 1;
    if (event.key === 'ArrowLeft') nextIndex = index === 0 ? lastIndex : index - 1;
    if (event.key === 'Home') nextIndex = 0;
    if (event.key === 'End') nextIndex = lastIndex;

    if (nextIndex !== null) {
      event.preventDefault();
      setActiveTab(skills.categories[nextIndex].id);
      tabRefs.current[nextIndex]?.focus();
    }
  };

  return (
    <Section id="skills" eyebrow={skills.eyebrow} title={skills.title} description={skills.description}>
      <div className="mt-10 grid gap-3 sm:grid-cols-2">
        <Reveal className="h-full">
          <TiltCard
            max={4}
            lift={-3}
            glare={false}
            className="card flex h-full flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-accent/25 bg-accent/[0.07] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              <span className="h-1.5 w-1.5 rounded-full bg-accent" aria-hidden="true" />
              Core
            </span>
            <p className="text-sm text-muted">
              {skills.coreSummary.join(' · ')}
              <span className="ml-2 text-xs text-muted/90">— the foundation I build on</span>
            </p>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.06} className="h-full">
          <TiltCard
            max={4}
            lift={-3}
            glare={false}
            className="card flex h-full flex-col gap-3 p-4 sm:flex-row sm:items-center sm:gap-5 sm:p-5"
          >
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-violet/25 bg-violet/[0.07] px-3 py-1 font-mono text-xs uppercase tracking-[0.18em] text-violet">
              <span className="h-1.5 w-1.5 rounded-full bg-violet" aria-hidden="true" />
              Exploring
            </span>
            <p className="text-sm text-muted">
              {skills.exploringSummary.join(' · ')}
              <span className="ml-2 text-xs text-muted/90">— learning in public, right now</span>
            </p>
          </TiltCard>
        </Reveal>
      </div>

      <Reveal delay={0.1} className="mt-8">
        <div className="flex flex-wrap items-center gap-2" role="tablist" aria-label="Skill categories">
          {skills.categories.map((category, index) => {
            const selected = category.id === activeTab;
            return (
              <button
                key={category.id}
                ref={(element) => {
                  tabRefs.current[index] = element;
                }}
                type="button"
                role="tab"
                id={`skills-tab-${category.id}`}
                aria-selected={selected}
                aria-controls="skills-panel"
                tabIndex={selected ? 0 : -1}
                onClick={() => setActiveTab(category.id)}
                onKeyDown={(event) => onTabKeyDown(event, index)}
                className={`inline-flex items-center gap-2 rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] transition duration-200 ${
                  selected
                    ? 'border-accent/40 bg-accent/10 text-ink'
                    : 'border-line/10 bg-line/[0.02] text-muted hover:border-line/25 hover:text-ink'
                }`}
              >
                {category.label}
                <span
                  className={`rounded-full px-1.5 py-0.5 text-xs ${
                    selected ? 'bg-accent/20 text-accent' : 'bg-line/[0.05] text-muted/90'
                  }`}
                >
                  {category.items.length}
                </span>
              </button>
            );
          })}
        </div>

        <div
          role="tabpanel"
          id="skills-panel"
          aria-labelledby={`skills-tab-${activeTab}`}
          tabIndex={0}
          className="mt-4 rounded-card focus-visible:outline-none"
        >
          <div
            key={activeTab}
            className="panel-enter grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4"
          >
            {activeCategory.items.map((item) => {
              const tier = tierStyles[item.tier];
              const legend = skills.legend.find((entry) => entry.tier === item.tier);
              return <SkillTile key={item.name} item={item} tier={tier} legend={legend} />;
            })}
          </div>
        </div>

        <div className="mt-6 flex flex-col gap-4 border-t border-line/10 pt-5 sm:flex-row sm:items-center sm:justify-between">
          <ul className="flex flex-wrap items-center gap-x-5 gap-y-2">
            {skills.legend.map((entry) => (
              <li key={entry.tier} className="flex items-center gap-2 font-mono text-xs text-muted">
                <span
                  className={`h-1.5 w-1.5 rounded-full ${tierStyles[entry.tier].dot}`}
                  aria-hidden="true"
                />
                <span className="text-ink">{entry.label}</span>
                <span className="text-muted/90">— {entry.note}</span>
              </li>
            ))}
          </ul>
          <p className="font-mono text-xs text-muted/90">No percentage bars. Just honest labels.</p>
        </div>

        <div className="mt-5 flex flex-col gap-2 rounded-xl border border-dashed border-line/15 bg-line/[0.015] p-4 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs leading-relaxed text-muted">
            <span className="font-medium text-ink">Self-assessed, deliberately.</span>{' '}
            {profile.levelNote}
          </p>
          <a
            href="#projects"
            className="link-arrow shrink-0 text-xs text-accent hover:text-ink"
          >
            See it applied
            <FiArrowUpRight className="h-3.5 w-3.5" aria-hidden="true" />
          </a>
        </div>
      </Reveal>
    </Section>
  );
}
