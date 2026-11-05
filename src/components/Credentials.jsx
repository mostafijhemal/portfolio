import { FiArrowUpRight, FiAward, FiBookOpen, FiCheckCircle } from 'react-icons/fi';
import { credentials } from '../data/content';
import { assetUrl } from '../lib/assetUrl';
import Reveal from './Reveal';
import Section from './Section';
import TiltCard from './TiltCard';

const groupIcons = {
  award: FiAward,
  book: FiBookOpen,
};

function CredentialItem({ item }) {
  return (
    <li className="rounded-xl border border-line/10 bg-line/[0.02] p-4 transition-colors hover:border-accent/25 hover:bg-line/[0.04]">
      <div className="flex items-start justify-between gap-3">
        <p className="text-sm font-medium leading-snug text-ink">{item.title}</p>
        {item.duration ? (
          <span className="chip shrink-0 border-line/15 bg-line/[0.04] text-muted">
            {item.duration}
          </span>
        ) : null}
      </div>

      <p className="mt-1 text-xs leading-relaxed text-muted">{item.issuer}</p>

      {item.dateLabel || item.validUntil || item.meta || item.credential ? (
        <div className="mt-2 flex flex-wrap items-center gap-x-2 gap-y-1 font-mono text-[11px] text-muted/90">
          {item.dateLabel ? (
            item.date ? (
              <time dateTime={item.date}>{item.dateLabel}</time>
            ) : (
              <span>{item.dateLabel}</span>
            )
          ) : null}
          {item.validUntil ? (
            <>
              <span aria-hidden="true">·</span>
              <span>{item.validUntil}</span>
            </>
          ) : null}
          {item.meta ? <span>{item.meta}</span> : null}
          {item.credential ? (
            <span className="break-all text-muted/80">{item.credential}</span>
          ) : null}
        </div>
      ) : null}

      {item.note ? (
        <p className="mt-2 text-[11px] leading-relaxed text-muted/90">{item.note}</p>
      ) : null}

      {item.verifyUrl ? (
        <a
          href={item.verifyUrl}
          target="_blank"
          rel="noreferrer noopener"
          className="link-arrow mt-2 text-[11px] text-accent hover:text-ink"
        >
          {credentials.verifyLabel}
          <FiArrowUpRight className="h-3 w-3" aria-hidden="true" />
          <span className="sr-only"> (opens in a new tab)</span>
        </a>
      ) : null}

      {item.image ? (
        <a
          href={assetUrl(item.image)}
          target="_blank"
          rel="noreferrer noopener"
          aria-label={`View ${item.title} certificate (opens in a new tab)`}
          className="link-arrow mt-2 text-[11px] text-accent hover:text-ink"
        >
          View certificate
          <FiArrowUpRight className="h-3 w-3" aria-hidden="true" />
        </a>
      ) : null}
    </li>
  );
}

export default function Credentials() {
  return (
    <Section
      id="credentials"
      eyebrow={credentials.eyebrow}
      title={credentials.title}
      description={credentials.description}
    >
      <div className="mt-10 grid gap-5 lg:grid-cols-2">
        {credentials.groups.map((group, index) => {
          const Icon = groupIcons[group.icon] || FiCheckCircle;

          return (
            <Reveal key={group.id} delay={index * 0.06} className="h-full">
              <TiltCard
                max={2.5}
                lift={-3}
                glare={false}
                className="card h-full p-6 sm:p-7"
              >
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-lg bg-accent/10 text-accent ring-1 ring-inset ring-accent/20">
                    <Icon className="h-4 w-4" aria-hidden="true" />
                  </span>
                  <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/90">
                    {group.label}
                  </p>
                  <span className="ml-auto font-mono text-xs text-muted/80">
                    {String(group.items.length).padStart(2, '0')}
                  </span>
                </div>

                <ul className="mt-5 space-y-3">
                  {group.items.map((item) => (
                    <CredentialItem key={item.title} item={item} />
                  ))}
                </ul>
              </TiltCard>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
