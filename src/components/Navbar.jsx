import { useEffect, useRef, useState } from 'react';
import { FiArrowUpRight, FiDownload, FiMenu, FiX } from 'react-icons/fi';
import { navLinks, profile, socials } from '../data/content';
import { useActiveSection } from '../hooks/useActiveSection';
import { useTheme } from '../hooks/useTheme';
import ThemeToggle from './ThemeToggle';
import { SocialIcon } from './SocialIcons';

const SECTION_IDS = [
  'home',
  'about',
  'skills',
  'credentials',
  'projects',
  'github',
  'youtube',
  'contact',
];

export default function Navbar({ route = { name: 'home' } }) {
  const { theme, toggleTheme } = useTheme();
  const isHome = route.name === 'home';
  const sectionActive = useActiveSection(SECTION_IDS, isHome);
  const active = isHome ? sectionActive : 'blog';
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const panelRef = useRef(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (!open) return undefined;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setOpen(false);
        menuButtonRef.current?.focus();
      }
    };

    document.addEventListener('keydown', onKeyDown);
    // Move focus into the panel for keyboard users.
    const firstLink = panelRef.current?.querySelector('a');
    firstLink?.focus({ preventScroll: true });

    return () => {
      document.body.style.overflow = previousOverflow;
      document.removeEventListener('keydown', onKeyDown);
    };
  }, [open]);

  // Close the mobile menu when the viewport becomes desktop-sized.
  useEffect(() => {
    const query = window.matchMedia('(min-width: 1024px)');
    const onChange = (event) => {
      if (event.matches) setOpen(false);
    };
    query.addEventListener('change', onChange);
    return () => query.removeEventListener('change', onChange);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? 'border-b border-line/10 bg-canvas/75 shadow-[0_10px_40px_-24px_rgba(0,0,0,0.8)] backdrop-blur-xl'
          : 'border-b border-transparent bg-transparent'
      }`}
    >
      <div className="mx-auto flex h-[72px] w-full max-w-shell items-center justify-between gap-3 px-5 sm:px-8">
        <a
          href="#home"
          onClick={() => setOpen(false)}
          className="group flex shrink-0 items-center gap-3 rounded-lg"
        >
          <span className="relative grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br from-accent/20 to-violet/20 ring-1 ring-inset ring-line/20 transition-transform duration-300 group-hover:-rotate-3">
            <span className="font-mono text-[13px] font-semibold tracking-tight text-ink">
              {profile.initials}
            </span>
            <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-accent ring-2 ring-canvas" />
          </span>
          <span className="flex flex-col leading-tight">
            <span className="text-sm font-semibold tracking-tight">{profile.name}</span>
            <span className="hidden font-mono text-xs uppercase tracking-[0.18em] text-muted sm:block">
              {profile.role}
            </span>
          </span>
        </a>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-6 xl:gap-7">
            {navLinks.map((link) => (
              <li key={link.id}>
                <a
                  href={link.href}
                  className="nav-link"
                  aria-current={active === link.id ? 'location' : undefined}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={profile.resume.href}
            download
            className="btn-ghost hidden px-4 py-2 text-xs md:inline-flex"
            title={`Download résumé — ${profile.resume.note}`}
          >
            <FiDownload className="h-4 w-4" aria-hidden="true" />
            {profile.resume.label}
          </a>

          <ThemeToggle theme={theme} onToggle={toggleTheme} />

          <button
            ref={menuButtonRef}
            type="button"
            onClick={() => setOpen((value) => !value)}
            className="icon-btn lg:hidden"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            aria-controls="mobile-menu"
          >
            {open ? (
              <FiX className="h-5 w-5" aria-hidden="true" />
            ) : (
              <FiMenu className="h-5 w-5" aria-hidden="true" />
            )}
          </button>
        </div>
      </div>

      {open ? (
        <div key="mobile-menu" className="menu-enter lg:hidden">
            <button
              type="button"
              aria-label="Close menu"
              tabIndex={-1}
              className="fixed inset-0 top-[72px] z-30 h-[calc(100dvh-72px)] w-full cursor-default bg-canvas/60 backdrop-blur-sm"
              onClick={() => setOpen(false)}
            />
            <div
              id="mobile-menu"
              ref={panelRef}
              className="fixed inset-x-0 top-[72px] z-40 px-4"
            >
              <div className="max-h-[calc(100dvh-96px)] overflow-y-auto rounded-card border border-line/10 bg-surface p-3 shadow-card">
                <nav aria-label="Mobile">
                  <ul className="flex flex-col">
                    {navLinks.map((link, index) => (
                      <li key={link.id}>
                        <a
                          href={link.href}
                          onClick={() => setOpen(false)}
                          className="flex items-center gap-3 rounded-xl px-3 py-3.5 text-base font-medium text-ink transition-colors hover:bg-line/[0.05] hover:text-accent"
                        >
                          <span className="font-mono text-xs text-muted/90">
                            {String(index + 1).padStart(2, '0')}
                          </span>
                          {link.label}
                          <FiArrowUpRight
                            className="ml-auto h-4 w-4 text-muted"
                            aria-hidden="true"
                          />
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>

                <div className="mt-2 border-t border-line/10 px-1 pt-3">
                  <a
                    href={profile.resume.href}
                    download
                    onClick={() => setOpen(false)}
                    className="btn-ghost w-full py-2.5 text-sm"
                    title={profile.resume.note}
                  >
                    <FiDownload className="h-4 w-4" aria-hidden="true" />
                    Download résumé
                  </a>
                  <div className="mt-3 flex items-center justify-center gap-2 pb-1">
                    {socials.map((social) => (
                      <a
                        key={social.id}
                        href={social.href}
                        target="_blank"
                        rel="noreferrer noopener"
                        className="icon-btn"
                        aria-label={`${social.label} (opens in a new tab)`}
                      >
                        <SocialIcon id={social.id} />
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
        </div>
      ) : null}
    </header>
  );
}
