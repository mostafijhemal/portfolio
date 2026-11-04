import {
  SiBootstrap,
  SiGooglecolab,
  SiCss,
  SiDjango,
  SiFastapi,
  SiFlask,
  SiGithub,
  SiGithubpages,
  SiGit,
  SiHtml5,
  SiJavascript,
  SiJquery,
  SiJupyter,
  SiLaravel,
  SiMongodb,
  SiMysql,
  SiNodedotjs,
  SiPandas,
  SiPhp,
  SiPostgresql,
  SiPython,
  SiCplusplus,
  SiReact,
  SiRender,
  SiSqlite,
  SiStreamlit,
  SiTailwindcss,
  SiTypescript,
  SiVercel,
} from 'react-icons/si';
import { FiCode, FiDatabase } from 'react-icons/fi';

function OracleIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
      <path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13" />
      <path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
    </svg>
  );
}

function SqlServerIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      aria-hidden="true"
      {...props}
    >
      <ellipse cx="12" cy="5.5" rx="7" ry="2.8" />
      <path d="M5 5.5v13c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8v-13" />
      <path d="M5 12c0 1.5 3.1 2.8 7 2.8s7-1.3 7-2.8" />
      <path d="m9.4 16.6 2.6-2.2 2.6 2.2" />
    </svg>
  );
}

function VSCodeIcon(props) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
      {...props}
    >
      <path d="M4 5.5 12 3v18L4 18.5v-13Z" />
      <path d="m4 5.5 8 6.5-8 6.5" />
      <path d="M15 8.5 20 12l-5 3.5" />
    </svg>
  );
}

const techIcons = {
  Python: SiPython,
  JavaScript: SiJavascript,
  TypeScript: SiTypescript,
  Cplusplus: SiCplusplus,
  PHP: SiPhp,
  HTML5: SiHtml5,
  CSS3: SiCss,
  Tailwind: SiTailwindcss,
  Bootstrap: SiBootstrap,
  React: SiReact,
  jQuery: SiJquery,
  Flask: SiFlask,
  Django: SiDjango,
  FastAPI: SiFastapi,
  Laravel: SiLaravel,
  Node: SiNodedotjs,
  Streamlit: SiStreamlit,
  Pandas: SiPandas,
  SQLite: SiSqlite,
  MySQL: SiMysql,
  PostgreSQL: SiPostgresql,
  MongoDB: SiMongodb,
  Oracle: OracleIcon,
  MSSQL: SqlServerIcon,
  Git: SiGit,
  GitHub: SiGithub,
  VSCode: VSCodeIcon,
  Jupyter: SiJupyter,
  Colab: SiGooglecolab,
  Render: SiRender,
  Vercel: SiVercel,
  GitHubPages: SiGithubpages,
};

const techAliases = {
  HTML: 'HTML5',
  'Tailwind CSS': 'Tailwind',
  'Node.js': 'Node',
  'C/C++': 'Cplusplus',
  'Google Colab': 'Colab',
  'GitHub Pages': 'GitHubPages',
  'VS Code': 'VSCode',
  'MS SQL Server': 'MSSQL',
};

/**
 * Renders a real brand mark when available, with a neutral fallback
 * for any name that is not mapped yet.
 */
export function TechIcon({ name, icon, color, className = 'h-5 w-5' }) {
  const key = icon || techAliases[name] || name;
  const Component = techIcons[key] || FiCode;
  return (
    <span style={color ? { color } : undefined} aria-hidden="true" className="inline-flex">
      <Component className={className} />
    </span>
  );
}

export const FallbackTechIcon = FiCode;
export const DatabaseIcon = FiDatabase;
