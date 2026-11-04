import { useCallback, useEffect, useRef, useState } from 'react';
import Background from './components/Background';
import Footer from './components/Footer';
import Hero from './components/Hero';
import Navbar from './components/Navbar';
import ScrollProgress from './components/ScrollProgress';
import { useHashRoute } from './hooks/useHashRoute';

export default function App() {
  const route = useHashRoute();
  const isHome = route.name === 'home';

  const [BelowFold, setBelowFold] = useState(null);
  const [BlogRoutes, setBlogRoutes] = useState(null);
  const loadingRef = useRef(false);
  const pollRef = useRef(0);

  const loadBelowFold = useCallback(() => {
    if (loadingRef.current) return;
    loadingRef.current = true;

    import('./components/BelowFold')
      .then((module) => setBelowFold(() => module.default))
      .catch(() => {
        loadingRef.current = false;
      });
  }, []);

  // Blog pages are a separate chunk: the home page never downloads marked or
  // the blog components, and the blog never downloads the portfolio sections.
  useEffect(() => {
    if (isHome || BlogRoutes) return undefined;

    let active = true;
    import('./components/blog/BlogRoutes').then((module) => {
      if (active) setBlogRoutes(() => module.default);
    });

    return () => {
      active = false;
    };
  }, [isHome, BlogRoutes]);

  const scrollToSection = useCallback((id) => {
    window.clearInterval(pollRef.current);

    let tries = 0;
    const tryScroll = () => {
      const target = document.getElementById(id);
      if (!target) return false;

      window.clearInterval(pollRef.current);
      target.scrollIntoView();
      return true;
    };

    if (tryScroll()) return;

    pollRef.current = window.setInterval(() => {
      tries += 1;
      if (tryScroll() || tries > 60) window.clearInterval(pollRef.current);
    }, 50);
  }, []);

  // Home-only: load the below-the-fold chunk on scroll, on an anchor click
  // that points at a section that does not exist yet, or after a short delay.
  useEffect(() => {
    if (!isHome) return undefined;

    const onScroll = () => {
      if (window.scrollY > 80) loadBelowFold();
    };

    const onClick = (event) => {
      const link = event.target.closest?.('a[href^="#"]');
      if (!link) return;

      const id = link.getAttribute('href').slice(1);
      if (!id || id.startsWith('/') || document.getElementById(id)) return;

      event.preventDefault();
      loadBelowFold();
      scrollToSection(id);
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    document.addEventListener('click', onClick);
    onScroll();

    // Fallback for visitors who never scroll (and for crawlers that do).
    const fallback = window.setTimeout(loadBelowFold, 8000);

    return () => {
      window.clearTimeout(fallback);
      window.removeEventListener('scroll', onScroll);
      document.removeEventListener('click', onClick);
    };
  }, [isHome, loadBelowFold, scrollToSection]);

  // Reset the scroll position when entering a blog page, and scroll to the
  // requested section when an anchor link brings the visitor back home.
  useEffect(() => {
    if (!isHome) {
      window.scrollTo({ top: 0, left: 0, behavior: 'auto' });
      return;
    }

    const hash = window.location.hash;
    if (!hash || hash === '#' || hash.startsWith('#/')) return;

    const id = hash.slice(1);
    if (!id) return;

    if (!document.getElementById(id)) loadBelowFold();
    scrollToSection(id);
  }, [isHome, route.hash, loadBelowFold, scrollToSection]);

  useEffect(() => () => window.clearInterval(pollRef.current), []);

  // The skip link must not change the hash: `#main` would be parsed as a
  // portfolio anchor and pull the visitor off the blog.
  const onSkip = (event) => {
    event.preventDefault();
    document.getElementById('main')?.focus();
  };

  return (
    <>
      <a href="#main" onClick={onSkip} className="skip-link btn-primary px-4 py-2 text-xs">
        Skip to content
      </a>

      <Background />
      <ScrollProgress />
      <Navbar route={route} />

      <main id="main" tabIndex={-1} className="outline-none">
        {isHome ? (
          <>
            <Hero />
            {BelowFold ? <BelowFold /> : null}
          </>
        ) : BlogRoutes ? (
          <BlogRoutes route={route} />
        ) : (
          <div className="mx-auto flex min-h-[70vh] w-full max-w-shell items-center justify-center px-5 pt-28 sm:px-8">
            <p role="status" className="font-mono text-xs uppercase tracking-[0.2em] text-muted">
              Loading notes…
            </p>
          </div>
        )}
      </main>

      <Footer />
    </>
  );
}
