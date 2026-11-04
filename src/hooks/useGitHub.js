import { useCallback, useEffect, useState } from 'react';

const CACHE_KEY = 'github-activity-v1';
const CACHE_TTL = 10 * 60 * 1000; // 10 minutes

async function fetchGitHub(username, signal) {
  const headers = { Accept: 'application/vnd.github+json' };
  const [userRes, reposRes] = await Promise.all([
    fetch(`https://api.github.com/users/${username}`, { signal, headers }),
    fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=pushed`, {
      signal,
      headers,
    }),
  ]);

  if (!userRes.ok || !reposRes.ok) {
    throw new Error(`GitHub API responded with ${userRes.status}/${reposRes.status}`);
  }

  const user = await userRes.json();
  const repos = await reposRes.json();

  if (!Array.isArray(repos)) throw new Error('Unexpected GitHub response');

  const ownRepos = repos.filter((repo) => !repo.fork);
  const stars = ownRepos.reduce((total, repo) => total + (repo.stargazers_count || 0), 0);

  const languageCounts = ownRepos.reduce((acc, repo) => {
    if (!repo.language) return acc;
    acc[repo.language] = (acc[repo.language] || 0) + 1;
    return acc;
  }, {});

  const totalWithLanguage = Object.values(languageCounts).reduce((sum, n) => sum + n, 0) || 1;
  const languages = Object.entries(languageCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 5)
    .map(([name, count]) => ({
      name,
      count,
      percent: Math.round((count / totalWithLanguage) * 100),
    }));

  const recent = [...ownRepos]
    .sort((a, b) => new Date(b.pushed_at) - new Date(a.pushed_at))
    .slice(0, 4)
    .map((repo) => ({
      id: repo.id,
      name: repo.name,
      description: repo.description,
      url: repo.html_url,
      language: repo.language,
      stars: repo.stargazers_count,
      updatedAt: repo.pushed_at,
    }));

  return {
    publicRepos: user.public_repos,
    followers: user.followers,
    stars,
    languages,
    recent,
    avatar: user.avatar_url,
    profileUrl: user.html_url,
    fetchedAt: Date.now(),
  };
}

function readCache() {
  try {
    const raw = sessionStorage.getItem(CACHE_KEY);
    if (!raw) return null;
    const parsed = JSON.parse(raw);
    if (!parsed?.data || Date.now() - parsed.timestamp > CACHE_TTL) return null;
    return parsed.data;
  } catch {
    return null;
  }
}

/**
 * Live public GitHub stats with session caching and a graceful error state.
 */
export function useGitHub(username) {
  const [status, setStatus] = useState('loading');
  const [data, setData] = useState(null);
  const [attempt, setAttempt] = useState(0);

  const retry = useCallback(() => setAttempt((n) => n + 1), []);

  useEffect(() => {
    const controller = new AbortController();
    let cancelled = false;

    async function load() {
      const cached = readCache();
      if (cached) {
        setData(cached);
        setStatus('success');
        return;
      }

      setStatus('loading');
      try {
        const fresh = await fetchGitHub(username, controller.signal);
        if (cancelled) return;
        setData(fresh);
        setStatus('success');
        try {
          sessionStorage.setItem(CACHE_KEY, JSON.stringify({ data: fresh, timestamp: Date.now() }));
        } catch {
          /* Cache is optional. */
        }
      } catch (error) {
        if (cancelled || error.name === 'AbortError') return;
        setStatus('error');
      }
    }

    load();
    return () => {
      cancelled = true;
      controller.abort();
    };
  }, [username, attempt]);

  return { status, data, retry };
}
