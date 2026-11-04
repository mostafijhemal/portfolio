import { useEffect, useState } from 'react';
import {
  FiArrowUpRight,
  FiCheckCircle,
  FiClock,
  FiMail,
  FiMapPin,
  FiSend,
  FiAlertTriangle,
} from 'react-icons/fi';
import { contact, socials } from '../data/content';
import { SocialIcon } from './SocialIcons';
import Reveal from './Reveal';
import Section from './Section';
import TiltCard from './TiltCard';

const initialForm = { name: '', email: '', message: '', _gotcha: '' };

function LocalTime() {
  const [time, setTime] = useState('');

  useEffect(() => {
    const format = () =>
      new Intl.DateTimeFormat('en-GB', {
        timeZone: 'Asia/Dhaka',
        hour: '2-digit',
        minute: '2-digit',
        hour12: false,
      }).format(new Date());

    setTime(format());
    const timer = window.setInterval(() => setTime(format()), 30_000);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted/90">
      <FiClock className="h-3 w-3" aria-hidden="true" />
      {time ? `${time} in Dhaka` : 'Dhaka · GMT+6'}
    </span>
  );
}

function validate(values) {
  const errors = {};
  if (values.name.trim().length < 2) errors.name = 'Please enter your name.';
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(values.email.trim())) {
    errors.email = 'Please enter a valid email address.';
  }
  if (values.message.trim().length < 10) {
    errors.message = 'A little more detail, please (10+ characters).';
  }
  return errors;
}

export default function Contact() {
  const [values, setValues] = useState(initialForm);
  const [errors, setErrors] = useState({});
  const [status, setStatus] = useState({ type: 'idle', message: '' });
  const [sending, setSending] = useState(false);

  const update = (event) => {
    const { name, value } = event.target;
    setValues((current) => ({ ...current, [name]: value }));
    if (errors[name]) {
      setErrors((current) => ({ ...current, [name]: undefined }));
    }
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    if (sending) return;

    // Honeypot: bots fill hidden fields, humans never see them.
    if (values._gotcha) {
      setStatus({ type: 'success', message: contact.successMessage });
      setValues(initialForm);
      return;
    }

    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length) {
      const firstField = Object.keys(nextErrors)[0];
      document.getElementById(`contact-${firstField}`)?.focus();
      return;
    }

    setSending(true);
    setStatus({ type: 'idle', message: '' });

    try {
      if (contact.formEndpoint) {
        const response = await fetch(contact.formEndpoint, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({
            name: values.name.trim(),
            email: values.email.trim(),
            message: values.message.trim(),
            _subject: `Portfolio message from ${values.name.trim()}`,
          }),
        });

        if (!response.ok) throw new Error('Form submission failed');
        setStatus({ type: 'success', message: contact.successMessage });
        setValues(initialForm);
      } else if (contact.email) {
        const subject = encodeURIComponent(`Portfolio message from ${values.name.trim()}`);
        const body = encodeURIComponent(
          `${values.message.trim()}\n\n— ${values.name.trim()} (${values.email.trim()})`,
        );
        window.location.href = `mailto:${contact.email}?subject=${subject}&body=${body}`;
        setStatus({
          type: 'success',
          message: 'Your email app should open with the message ready to send.',
        });
      } else {
        setStatus({ type: 'unconfigured', message: contact.unconfiguredMessage });
      }
    } catch {
      setStatus({ type: 'error', message: contact.errorMessage });
    } finally {
      setSending(false);
    }
  };

  const directLinks = socials.map((social) => ({
    ...social,
    value: social.handle,
  }));

  return (
    <Section
      id="contact"
      eyebrow={contact.eyebrow}
      title={contact.title}
      description={contact.description}
    >
      <div className="mt-10 grid gap-5 lg:grid-cols-[0.9fr_1.1fr] lg:items-stretch">
        <Reveal className="h-full">
          <TiltCard
            max={3}
            lift={-3}
            glare={false}
            className="card h-full p-6 sm:p-7"
          >
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/90">
              Direct lines
            </p>

            <ul className="mt-4 divide-y divide-line/10 border-y border-line/10">
              <li>
                {contact.email ? (
                  <a
                    href={`mailto:${contact.email}`}
                    className="group flex items-center gap-3 py-3.5"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-line/10 bg-line/[0.03] text-accent">
                      <FiMail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-xs uppercase tracking-[0.16em] text-muted/90">
                        Email
                      </span>
                      <span className="block truncate text-sm text-ink">{contact.email}</span>
                    </span>
                    <FiArrowUpRight
                      className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                  </a>
                ) : (
                  <div className="flex items-center gap-3 py-3.5">
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-dashed border-line/20 text-muted/90">
                      <FiMail className="h-4 w-4" aria-hidden="true" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-xs uppercase tracking-[0.16em] text-muted/90">
                        Email
                      </span>
                      <span className="block font-mono text-xs text-muted">[ADD: email]</span>
                    </span>
                    <span className="font-mono text-xs text-muted/90">soon</span>
                  </div>
                )}
              </li>

              {directLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group flex items-center gap-3 py-3.5"
                  >
                    <span className="grid h-9 w-9 place-items-center rounded-lg border border-line/10 bg-line/[0.03] text-muted transition-colors group-hover:text-accent">
                      <SocialIcon id={link.id} className="h-4 w-4" />
                    </span>
                    <span className="min-w-0 flex-1">
                      <span className="block font-mono text-xs uppercase tracking-[0.16em] text-muted/90">
                        {link.label}
                      </span>
                      <span className="block truncate text-sm text-ink">{link.value}</span>
                    </span>
                    <FiArrowUpRight
                      className="h-4 w-4 text-muted transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-accent"
                      aria-hidden="true"
                    />
                    <span className="sr-only"> (opens in a new tab)</span>
                  </a>
                </li>
              ))}
            </ul>

            <div className="mt-5 flex flex-col gap-2">
              <span className="inline-flex items-center gap-2 self-start rounded-full border border-emerald-500/25 bg-emerald-500/[0.07] px-3 py-1 font-mono text-xs text-emerald-700 dark:text-emerald-300">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" aria-hidden="true" />
                {contact.freelance}
              </span>
              <span className="inline-flex items-center gap-1.5 font-mono text-xs text-muted/90">
                <FiMapPin className="h-3 w-3 text-accent" aria-hidden="true" />
                {contact.availability}
              </span>
              <LocalTime />
            </div>

            <p className="mt-5 border-t border-line/10 pt-4 text-xs leading-relaxed text-muted">
              {contact.formNote}
            </p>
          </TiltCard>
        </Reveal>

        <Reveal delay={0.08} className="h-full">
          <TiltCard
            max={1.5}
            lift={-2}
            scale={1.002}
            glare={false}
            className="card flex h-full flex-col p-6 sm:p-7"
          >
            <form onSubmit={onSubmit} noValidate className="flex h-full flex-col">
              <div className="flex items-center justify-between gap-3">
                <p className="font-mono text-xs uppercase tracking-[0.2em] text-muted/90">
                  Send a message
                </p>
                <span className="font-mono text-xs text-muted/90">* required</span>
              </div>

              <div className="mt-5 grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="contact-name" className="mb-1.5 block text-xs font-medium text-ink">
                    Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-name"
                    name="name"
                    type="text"
                    autoComplete="name"
                    value={values.name}
                    onChange={update}
                    className="field"
                    placeholder="Your name"
                    required
                    aria-invalid={Boolean(errors.name)}
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                  />
                  {errors.name ? (
                    <p id="contact-name-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.name}
                    </p>
                  ) : null}
                </div>

                <div>
                  <label htmlFor="contact-email" className="mb-1.5 block text-xs font-medium text-ink">
                    Email <span className="text-accent">*</span>
                  </label>
                  <input
                    id="contact-email"
                    name="email"
                    type="email"
                    autoComplete="email"
                    inputMode="email"
                    value={values.email}
                    onChange={update}
                    className="field"
                    placeholder="you@example.com"
                    required
                    aria-invalid={Boolean(errors.email)}
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                  />
                  {errors.email ? (
                    <p id="contact-email-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>

              <div className="mt-4">
                <label htmlFor="contact-message" className="mb-1.5 block text-xs font-medium text-ink">
                  Message <span className="text-accent">*</span>
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  rows="5"
                  value={values.message}
                  onChange={update}
                  className="field resize-y"
                  placeholder="Tell me what you are working on, or what you would like to build."
                  required
                  aria-invalid={Boolean(errors.message)}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                />
                {errors.message ? (
                  <p id="contact-message-error" className="mt-1.5 text-xs text-red-500 dark:text-red-400">
                    {errors.message}
                  </p>
                ) : null}
              </div>

              <div className="sr-only" aria-hidden="true">
                <label htmlFor="contact-gotcha">Leave this field empty</label>
                <input
                  id="contact-gotcha"
                  name="_gotcha"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                  value={values._gotcha}
                  onChange={update}
                />
              </div>

              <div className="mt-auto flex flex-wrap items-center gap-3 pt-5">
                <button
                  type="submit"
                  className="btn-primary group disabled:cursor-not-allowed disabled:opacity-60"
                  disabled={sending}
                >
                  {sending ? (
                    <>
                      <span
                        className="h-4 w-4 animate-spin rounded-full border-2 border-accent-contrast/40 border-t-accent-contrast"
                        aria-hidden="true"
                      />
                      Sending…
                    </>
                  ) : (
                    <>
                      Send message
                      <FiSend
                        className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                        aria-hidden="true"
                      />
                    </>
                  )}
                </button>
                <span className="font-mono text-xs text-muted/90">
                  No newsletter. No spam. Just a reply.
                </span>
              </div>

              {!contact.formEndpoint && !contact.email ? (
                <p className="mt-4 rounded-lg border border-dashed border-line/15 bg-line/[0.015] px-3 py-2 font-mono text-xs leading-relaxed text-muted/90">
                  Setup: [ADD: Formspree endpoint] or [ADD: email] in src/data/content.js — the form
                  will then send directly.
                </p>
              ) : null}

              <div aria-live="polite" role="status" className="min-h-[1.25rem]">
                {status.message ? (
                  <div
                    className={`mt-4 flex items-start gap-2 rounded-lg border px-3 py-2.5 text-xs leading-relaxed ${
                      status.type === 'success'
                        ? 'border-emerald-500/25 bg-emerald-500/[0.07] text-emerald-800 dark:text-emerald-300'
                        : status.type === 'error'
                          ? 'border-red-500/25 bg-red-500/[0.07] text-red-700 dark:text-red-300'
                          : 'border-amber-500/25 bg-amber-500/[0.07] text-amber-800 dark:text-amber-300'
                    }`}
                  >
                    {status.type === 'success' ? (
                      <FiCheckCircle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    ) : (
                      <FiAlertTriangle className="mt-0.5 h-3.5 w-3.5 shrink-0" aria-hidden="true" />
                    )}
                    <span>{status.message}</span>
                  </div>
                ) : null}
              </div>
            </form>
          </TiltCard>
        </Reveal>
      </div>
    </Section>
  );
}
