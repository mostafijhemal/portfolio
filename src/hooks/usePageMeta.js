import { useEffect } from 'react';

function updateMeta(selector, attribute, value) {
  const element = document.querySelector(selector);
  if (!element) return null;

  const previous = element.getAttribute(attribute);
  element.setAttribute(attribute, value);
  return { element, attribute, previous };
}

/** Keeps the document title and share metadata in sync with the current page. */
export function usePageMeta({ title, description }) {
  useEffect(() => {
    const previousTitle = document.title;
    if (title) document.title = title;

    const changes = [];

    if (title) {
      changes.push(updateMeta('meta[property="og:title"]', 'content', title));
      changes.push(updateMeta('meta[name="twitter:title"]', 'content', title));
    }

    if (description) {
      changes.push(updateMeta('meta[name="description"]', 'content', description));
      changes.push(updateMeta('meta[property="og:description"]', 'content', description));
      changes.push(updateMeta('meta[name="twitter:description"]', 'content', description));
    }

    return () => {
      document.title = previousTitle;
      changes.forEach((change) => {
        if (!change) return;
        if (change.previous === null) change.element.removeAttribute(change.attribute);
        else change.element.setAttribute(change.attribute, change.previous);
      });
    };
  }, [title, description]);
}
