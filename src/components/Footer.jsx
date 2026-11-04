import { FiArrowUp, FiArrowUpRight } from 'react-icons/fi';
import { footer, navLinks, profile, socials } from '../data/content';
import { SocialIcon } from './SocialIcons';

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-line/10 pb-10 pt-14">
      <div className="mx-auto w-full max-w-shell px-5 sm:px-8">
        <div className="grid gap-10 md:grid-cols-[1.2fr_0.8fr_0.8fr]">
          <div>
            <a href="#home" className="inline-flex items-center gap-3">
              <span className="grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-violet/20 font-mono text-[13px] font-semibold ring-1 ring-inset ring-line/20">
                {profile.initials}
              </span>
              <span>
                <span className="block text-sm font-semibold">{profile.name}</span>
                <span className="block font-mono text-xs text-muted">{profile.role}</span>
              </span>
            </a>
            <p className="mt-4 max-w-xs text-xs leading-relaxed text-muted">
              {profile.valueStatement}
            </p>
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.18em] text-accent">
              {profile.tagline}
            </p>
          </div>

          <nav aria-label="Footer">
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Explore
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {navLinks.map((link) => (
                <li key={link.id}>
                  <a
                    href={link.href}
                    className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
                  >
                    {link.label}
                  </a>
                </li>
              ))}
              <li>
                <a
                  href="#github"
                  className="inline-flex items-center gap-1 text-xs text-muted transition-colors hover:text-accent"
                >
                  GitHub
                </a>
              </li>
            </ul>
          </nav>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
              Elsewhere
            </p>
            <ul className="mt-3 space-y-2">
              {socials.map((social) => (
                <li key={social.id}>
                  <a
                    href={social.href}
                    target="_blank"
                    rel="noreferrer noopener"
                    className="group inline-flex items-center gap-2 text-xs text-muted transition-colors hover:text-accent"
                    aria-label={`${social.label} (opens in a new tab)`}
                  >
                    <SocialIcon id={social.id} className="h-3.5 w-3.5" />
                    {social.label}
                    <FiArrowUpRight
                      className="h-3 w-3 opacity-0 transition-opacity group-hover:opacity-100"
                      aria-hidden="true"
                    />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-line/10 pt-6 sm:flex-row sm:items-center sm:justify-between">
          <div className="space-y-1">
            <p className="text-xs text-muted">
              © {year} {profile.name}. All rights reserved.
            </p>
            <p className="font-mono text-xs text-muted">
              {footer.builtWith} {footer.note}
            </p>
          </div>

          <a
            href="#home"
            className="group inline-flex items-center gap-2 self-start rounded-full border border-line/10 bg-line/[0.02] px-4 py-2 font-mono text-xs uppercase tracking-[0.12em] text-muted transition-colors hover:border-accent/40 hover:text-accent sm:self-auto"
          >
            {footer.backToTop}
            <FiArrowUp
              className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5"
              aria-hidden="true"
            />
          </a>
        </div>
      </div>
    </footer>
  );
}
