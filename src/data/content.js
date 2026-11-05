/**
 * content.js — the app's read-only view of the editable content.
 *
 * Every word, link and project lives in `src/content/*.json` so it can be
 * edited from the CMS at /admin/. Structural navigation and project filters
 * stay here because changing them also means changing the page layout.
 *
 * Values marked [ADD: ...] are intentional placeholders.
 */

import siteData from '../content/site.json';
import profileData from '../content/profile.json';
import socialsData from '../content/socials.json';
import aboutData from '../content/about.json';
import skillsData from '../content/skills.json';
import credentialsData from '../content/credentials.json';
import projectsData from '../content/projects.json';
import githubData from '../content/github.json';
import youtubeData from '../content/youtube.json';
import contactData from '../content/contact.json';
import blogData from '../content/blog.json';
import footerData from '../content/footer.json';

export const site = siteData;
export const profile = profileData;
export const socials = socialsData.items;
export const about = aboutData;
export const skills = skillsData;
export const credentials = credentialsData;
export const projectsSection = projectsData.section;
export const projects = projectsData.items;
export const github = githubData;
export const youtube = youtubeData;
export const contact = contactData;
export const blog = blogData;
export const footer = footerData;

export const navLinks = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'credentials', label: 'Credentials', href: '#credentials' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'youtube', label: 'YouTube', href: '#youtube' },
  { id: 'blog', label: 'Blog', href: '#/blog' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'data', label: 'Data/Research' },
];
