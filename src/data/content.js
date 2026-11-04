/**
 * content.js — the single source of truth for every word, link and project.
 * Edit this file to update the site. Components never hard-code content.
 *
 * Values marked [ADD: ...] are intentional placeholders.
 */

export const site = {
  // Used for the canonical URL, sitemap and share image.
  url: 'https://mostafijhemal.github.io/portfolio/',
  title: 'Mostafijur Rahman — Software Engineer',
  description:
    'Portfolio of Mostafijur Rahman, a software engineer in Dhaka building practical web and backend applications with Python, FastAPI and Laravel.',
};

export const profile = {
  name: 'Mostafijur Rahman',
  firstName: 'Mostafijur',
  lastName: 'Rahman',
  initials: 'MR',
  handle: 'mostafijhemal',
  role: 'Software Engineer',
  degree: 'B.Sc. & M.Sc. in Computer Science and Engineering',
  location: 'Dhaka, Bangladesh',
  timezone: 'GMT+6',
  company: 'AristoPharma Ltd.',
  availability: 'Available for freelance projects',
  photo: {
    src: './profile.jpg',
    alt: 'Portrait of Mostafijur Rahman',
    caption: 'Dhaka, Bangladesh',
  },
  tagline: 'Build • Learn • Improve • Share',
  bio: 'I turn ideas into practical, user-friendly applications. I am interested in how software, databases and thoughtful system design solve everyday problems — and I learn by building, testing and refining real projects.',
  valueStatement:
    'I turn ideas into practical, user-friendly software — learning by building, testing and refining real projects.',
  levelNote: 'Beginner to Intermediate — growing fast through hands-on projects.',
  typingPhrases: [
    'Software Engineer',
    'Python Backend',
    'Laravel & Web Development',
    'Always Learning and Building',
  ],
  currentlyExploring: ['Python backend development', 'Laravel', 'Databases', 'Software design'],
  resume: {
    // Replace public/resume.pdf with the real file. [ADD: resume.pdf]
    href: './resume.pdf',
    label: 'Résumé',
    note: 'Replace public/resume.pdf with your real CV.',
  },
};

export const navLinks = [
  { id: 'about', label: 'About', href: '#about' },
  { id: 'skills', label: 'Skills', href: '#skills' },
  { id: 'credentials', label: 'Credentials', href: '#credentials' },
  { id: 'projects', label: 'Projects', href: '#projects' },
  { id: 'youtube', label: 'YouTube', href: '#youtube' },
  { id: 'blog', label: 'Blog', href: '#/blog' },
  { id: 'contact', label: 'Contact', href: '#contact' },
];

export const socials = [
  {
    id: 'github',
    label: 'GitHub',
    handle: '@mostafijhemal',
    href: 'https://github.com/mostafijhemal',
  },
  {
    id: 'linkedin',
    label: 'LinkedIn',
    handle: 'mostafij-hemal',
    href: 'https://www.linkedin.com/in/mostafij-hemal',
  },
  {
    id: 'telegram',
    label: 'Telegram',
    handle: '@mostafijhemal',
    href: 'https://t.me/mostafijhemal',
  },
  {
    id: 'youtube',
    label: 'YouTube',
    handle: '@MostafijHimel',
    href: 'https://youtube.com/@MostafijHimel',
  },
];

export const about = {
  eyebrow: '01 / About',
  title: 'A developer who learns by building.',
  intro:
    'I am Mostafijur — a software engineer based in Dhaka, currently working as an Executive at AristoPharma Ltd. I completed my B.Sc. in Computer Science and Engineering at Eastern University in 2019, followed by an M.Sc. in Computer Science and Engineering at Jahangirnagar University in 2026.',
  paragraphs: [
    'I like turning ideas into practical, user-friendly applications. My curiosity sits at the intersection of software, databases and thoughtful system design: how the pieces fit together, and how they can make an everyday problem a little easier.',
    'Most of what I know comes from hands-on work. I build a project, test it, find what breaks, and refine it. That loop — build, learn, improve, share — is how I keep growing, and it is the idea behind this site.',
  ],
  experience: {
    label: 'Experience',
    items: [
      {
        role: 'Executive',
        company: 'AristoPharma Ltd.',
        location: 'Dhaka, Bangladesh',
        startDate: '2023-02-01',
        period: 'Feb 2023 — Present',
        current: true,
      },
      {
        role: 'Software Support Engineer',
        company: 'Living Support',
        startDate: '2022-02-01',
        endDate: '2022-12-31',
        period: 'Feb 2022 — Dec 2022',
        current: false,
      },
    ],
  },
  storyLabel: 'The short version',
  education: {
    label: 'Education',
    items: [
      {
        value: 'M.Sc. in Computer Science and Engineering',
        institution: 'Jahangirnagar University',
        year: '2026',
      },
      {
        value: 'B.Sc. in Computer Science and Engineering',
        institution: 'Eastern University',
        year: '2019',
      },
    ],
  },
  location: {
    label: 'Based in',
    value: 'Dhaka, Bangladesh',
    note: 'Dhaka · GMT+6',
  },
  exploring: {
    label: 'Currently exploring',
    items: ['Python backend development', 'Laravel', 'Databases', 'Software design'],
  },
  quickFacts: [
    { label: 'Role', value: 'Software Engineer' },
    { label: 'Position', value: 'Executive · AristoPharma Ltd.' },
    { label: 'Since', value: 'February 2023' },
    { label: 'B.Sc.', value: 'Eastern University · 2019' },
    { label: 'M.Sc.', value: 'Jahangirnagar University · 2026' },
    { label: 'Availability', value: 'Freelance projects' },
  ],
  quickFactsNote:
    'Executive at AristoPharma Ltd. in Dhaka since February 2023, previously a Software Support Engineer at Living Support. Available for freelance projects.',
};

export const skills = {
  eyebrow: '02 / Skills',
  title: 'Honest tools for real projects.',
  description:
    'A practical stack, still growing. “Core” is what I reach for first; “Exploring” is what I am actively learning right now.',
  coreSummary: ['Python', 'Web development'],
  exploringSummary: ['Laravel', 'FastAPI'],
  legend: [
    { tier: 'core', label: 'Core', note: 'My daily foundation' },
    { tier: 'working', label: 'Working', note: 'Used in projects' },
    { tier: 'exploring', label: 'Exploring', note: 'Actively learning' },
  ],
  categories: [
    {
      id: 'languages',
      label: 'Languages',
      items: [
        { name: 'Python', icon: 'Python', tier: 'core', color: '#4B8BBE' },
        { name: 'JavaScript', icon: 'JavaScript', tier: 'core', color: '#E8C547' },
        { name: 'C/C++', icon: 'Cplusplus', tier: 'working', color: '#5C9FD6' },
        { name: 'PHP', icon: 'PHP', tier: 'exploring', color: '#8892BF' },
      ],
    },
    {
      id: 'frontend',
      label: 'Frontend',
      items: [
        { name: 'HTML5', icon: 'HTML5', tier: 'core', color: '#E34F26' },
        { name: 'CSS3', icon: 'CSS3', tier: 'core', color: '#3B9CD9' },
        { name: 'Tailwind CSS', icon: 'Tailwind', tier: 'core', color: '#38BDF8' },
        { name: 'Bootstrap', icon: 'Bootstrap', tier: 'working', color: '#8B6FE8' },
        { name: 'React', icon: 'React', tier: 'working', color: '#61DAFB' },
        { name: 'jQuery', icon: 'jQuery', tier: 'working', color: '#4E9CD6' },
      ],
    },
    {
      id: 'backend',
      label: 'Backend',
      items: [
        { name: 'Flask', icon: 'Flask', tier: 'working', color: '#9DB4C8' },
        { name: 'Django', icon: 'Django', tier: 'working', color: '#44B78B' },
        { name: 'FastAPI', icon: 'FastAPI', tier: 'exploring', color: '#009688' },
        { name: 'Laravel', icon: 'Laravel', tier: 'exploring', color: '#FF5A47' },
        { name: 'Node.js', icon: 'Node', tier: 'working', color: '#5FA04E' },
        { name: 'Streamlit', icon: 'Streamlit', tier: 'working', color: '#FF6B6B' },
      ],
    },
    {
      id: 'databases',
      label: 'Databases',
      items: [
        { name: 'SQLite', icon: 'SQLite', tier: 'working', color: '#6CB4D9' },
        { name: 'MySQL', icon: 'MySQL', tier: 'working', color: '#5B9BD5' },
        { name: 'PostgreSQL', icon: 'PostgreSQL', tier: 'working', color: '#6C8EF5' },
        { name: 'MongoDB', icon: 'MongoDB', tier: 'exploring', color: '#47A248' },
        { name: 'Oracle APEX', icon: 'Oracle', tier: 'exploring', color: '#F05454' },
        { name: 'Oracle Database', icon: 'Oracle', tier: 'exploring', color: '#F05454' },
        { name: 'MS SQL Server', icon: 'MSSQL', tier: 'exploring', color: '#E05252' },
      ],
    },
    {
      id: 'tools',
      label: 'Tools',
      items: [
        { name: 'Git', icon: 'Git', tier: 'core', color: '#F05032' },
        { name: 'GitHub', icon: 'GitHub', tier: 'core', color: '#A8B6C8' },
        { name: 'VS Code', icon: 'VSCode', tier: 'core', color: '#3E9EE0' },
        { name: 'Jupyter', icon: 'Jupyter', tier: 'working', color: '#F37626' },
        { name: 'Google Colab', icon: 'Colab', tier: 'working', color: '#F9AB00' },
        { name: 'Render', icon: 'Render', tier: 'working', color: '#46E3B7' },
        { name: 'Vercel', icon: 'Vercel', tier: 'working', color: '#A8B6C8' },
        { name: 'GitHub Pages', icon: 'GitHubPages', tier: 'working', color: '#36BCF7' },
      ],
    },
  ],
};

export const credentials = {
  eyebrow: '03 / Credentials',
  title: 'Certified, and still training.',
  description:
    'Certificates and professional training I have completed — listed with the issuer, date and verification details where they are available.',
  groups: [
    {
      id: 'certifications',
      label: 'Certifications',
      icon: 'award',
      items: [
        {
          title: 'AI Fluency: Framework & Foundations',
          issuer: 'Anthropic',
          meta: 'Certificate of completion',
          image: './certificates/ai-fluency-framework-foundations.jpg',
        },
        {
          title: 'Gemini Certified Educator',
          issuer: 'Google for Education',
          date: '2025-12-28',
          dateLabel: 'Issued 28 Dec 2025',
          validUntil: 'Valid to 28 Dec 2028',
          image: './certificates/gemini-certified-educator.jpg',
        },
        {
          title: 'Python Essentials 1',
          issuer: 'Cisco Networking Academy · Python Institute',
          date: '2026-01-20',
          dateLabel: 'Completed 20 Jan 2026',
          image: './certificates/python-essentials-1.jpg',
        },
        {
          title: 'Python Essentials 2',
          issuer: 'Cisco Networking Academy · Python Institute',
          date: '2026-10-01',
          dateLabel: 'Completed 1 Oct 2026',
          credential: 'Credential ID 82a52cff-7b40-4536-b02b-6f9b62810746',
          image: './certificates/python-essentials-2.jpg',
        },
      ],
    },
    {
      id: 'training',
      label: 'Professional training',
      icon: 'book',
      items: [
        {
          title: 'SAP ABAP Development Specialist',
          issuer: 'SDTEKH · SAP S/4HANA',
          date: '2026-06-21',
          dateLabel: 'Issued 21 Jun 2026',
          credential: 'Graduate No. 22f214ee-f218-454d-8230-42aa8c40a62d',
          image: './certificates/sap-abap-development-specialist.jpg',
        },
        {
          title: 'Software Testing & Quality Assurance',
          issuer: 'PeopleNTech Limited',
          dateLabel: 'Nov 2022 – Jan 2023',
          meta: 'Issued 14 Jan 2023',
          duration: '60 hr',
          credential: 'Bearing ID 15637916532',
          image: './certificates/software-testing-quality-assurance.jpg',
        },
        {
          title: 'Web Application Development in Python and Django',
          issuer: 'PeopleNTech Limited',
          dateLabel: 'Jan – Mar 2022',
          meta: 'Issued 13 Apr 2022',
          duration: '60 hr',
          credential: 'Bearing ID 15637916532',
          image: './certificates/python-django-development.jpg',
        },
        {
          title: 'Laravel',
          issuer: 'PeopleNTech Limited · Bangladesh Hi-Tech Park Authority',
          dateLabel: 'Aug – Dec 2019',
          duration: '90 hr',
          image: './certificates/laravel-peopleNTech.jpg',
        },
        {
          title: 'Web Development (Top Up IT Training)',
          issuer: 'NextTech IT · under LICT',
          dateLabel: 'April 2018',
          duration: '300 hr',
          credential: 'Verification No. G048425',
          verifyUrl: 'https://portal.bdskills.gov.bd/certificates',
          image: './certificates/web-development-lict.jpg',
          note: 'Conducted by Ernst & Young LLP under the LICT project of the Bangladesh Computer Council; certified by George Washington University, USA.',
        },
      ],
    },
  ],
  verifyLabel: 'Verify certificate',
};

export const projectsSection = {
  eyebrow: '04 / Projects',
  title: 'Work that taught me something.',
  description:
    'Five projects, each an attempt to make a real problem a little easier. Every card states the problem, what it does and the stack behind it — with screenshots clearly marked until I add them.',
  allRepos: 'See all repositories',
  empty: 'No projects in this category yet.',
};

export const projectFilters = [
  { id: 'all', label: 'All' },
  { id: 'backend', label: 'Backend' },
  { id: 'web', label: 'Web' },
  { id: 'mobile', label: 'Mobile' },
  { id: 'data', label: 'Data/Research' },
];

export const projects = [
  {
    id: 'sports-iptv-backend',
    index: '01',
    title: 'Sports IPTV Backend',
    category: 'Backend',
    categoryId: 'backend',
    status: { label: 'Live Demo', tone: 'live' },
    accent: 'cyan',
    problem:
      'A sports streaming product needs a dependable backend layer between its content and the client applications people use.',
    does: 'A backend for a sports IPTV platform, built with Python, FastAPI and PostgreSQL.',
    tech: ['Python', 'FastAPI', 'PostgreSQL'],
    links: {
      source: 'https://github.com/mostafijhemal/sports-iptv-backend',
      demo: 'https://mostafijhemal.github.io/sports-iptv-backend/',
    },
    visualNote: '[ADD: screenshot]',
    featured: true,
  },
  {
    id: 'advanced-cookies-analyzer',
    index: '02',
    title: 'Advanced Cookies Analyzer',
    category: 'Data/Research',
    categoryId: 'data',
    status: { label: 'Open Source', tone: 'source' },
    accent: 'violet',
    problem:
      'Cookies make the modern web work, but they also enable tracking and privacy problems that are difficult to see.',
    does: 'An M.Sc. thesis project that analyses website cookies, privacy and tracking behaviour — with a Streamlit interface, Pandas and SQLite.',
    tech: ['Python', 'Streamlit', 'Pandas', 'SQLite'],
    links: {
      source: 'https://github.com/mostafijhemal/advanced-cookies-analyzer',
    },
    visualNote: '[ADD: screenshot]',
  },
  {
    id: 'cgpa-calculator',
    index: '03',
    title: 'Web-Based CGPA Calculator',
    category: 'Web',
    categoryId: 'web',
    status: { label: 'Live Demo', tone: 'live' },
    accent: 'cyan',
    problem:
      'Students calculate SGPA and CGPA by hand, then rebuild transcripts manually — slow, repetitive and easy to get wrong.',
    does: 'A browser-based SGPA/CGPA calculator with transcript generation, built with HTML, Tailwind CSS and JavaScript.',
    tech: ['HTML', 'Tailwind CSS', 'JavaScript'],
    links: {
      source: 'https://github.com/mostafijhemal/CGPA_Calculator',
      demo: 'https://mostafijhemal.github.io/CGPA_Calculator/',
    },
    visualNote: '[ADD: screenshot]',
  },
  {
    id: 'basharent-manager',
    index: '04',
    title: 'BashaRent Manager',
    category: 'Mobile',
    categoryId: 'mobile',
    status: { label: 'Open Source', tone: 'source' },
    accent: 'violet',
    problem:
      'Buildings, flats, tenants, rent, bills, expenses and payments are usually tracked across disconnected spreadsheets and notebooks.',
    does: 'An Android-focused rental management app that brings those workflows together, built with Node.js, React and TypeScript.',
    tech: ['Node.js', 'React', 'TypeScript'],
    links: {
      source: 'https://github.com/mostafijhemal/basharent-manager',
    },
    visualNote: '[ADD: screenshot]',
  },
  {
    id: 'blood-bank-platform',
    index: '05',
    title: 'Blood Bank Management Platform',
    category: 'Web',
    categoryId: 'web',
    status: { label: 'In Development', tone: 'dev' },
    accent: 'cyan',
    problem:
      'Blood donation coordination gets fragmented when donors, organisations, blood banks and hospitals each work in their own system.',
    does: 'A role-based platform in development, with dashboards for donors, social organisations, blood banks, hospitals and admins.',
    tech: [],
    techNote: '[ADD: tech stack]',
    links: {
      source: null, // [ADD: repository URL]
      demo: null,
    },
    visualNote: '[ADD: screenshot]',
  },
];

export const github = {
  eyebrow: '05 / GitHub',
  title: 'Learning in the open.',
  description:
    'Public repositories, languages and recent work pulled live from the GitHub API — no invented numbers, just what is actually there.',
  username: 'mostafijhemal',
  profileUrl: 'https://github.com/mostafijhemal',
  reposUrl: 'https://github.com/mostafijhemal?tab=repositories',
  fallback:
    'Live GitHub stats are unavailable right now — the public API may be rate-limited. The profile is always one click away.',
};

export const youtube = {
  eyebrow: '06 / Learning',
  title: 'I share what I learn.',
  description:
    'The channel is my learning log: things I build, concepts I am figuring out, and notes from the journey from beginner to better.',
  handle: '@MostafijHimel',
  url: 'https://youtube.com/@MostafijHimel',
  cta: 'Visit the channel',
  topics: ['Python backend', 'Laravel & web development', 'Databases & software design'],
  // [ADD: 2–3 videos] Add objects like { title: '...', href: 'https://youtube.com/watch?v=...' }
  featured: [],
  slotLabel: '[ADD: featured video]',
};

export const contact = {
  eyebrow: '07 / Contact',
  title: 'Let’s build something useful.',
  description:
    'Have a project, an idea, or a question? I am always happy to talk about software, learning and the things we can build.',
  email: 'mostafij.hemal@gmail.com',
  // Formspree sends each submission to the notification email on this form.
  formEndpoint: 'https://formspree.io/f/xdeewjrq',
  availability: 'Based in Dhaka, Bangladesh · GMT+6',
  freelance: 'Available for freelance projects',
  formNote:
    'Messages sent through the form arrive straight in my inbox. Prefer a direct message? Telegram is the fastest way to reach me.',
  successMessage: 'Thanks — your message is on its way. I will get back to you soon.',
  errorMessage: 'Something went wrong while sending. Please try again, or reach me on Telegram.',
  unconfiguredMessage:
    'The form is not connected yet. Add a Formspree endpoint or an email in content.js — or message me on Telegram or LinkedIn.',
};

export const blog = {
  eyebrow: 'Notes / Blog',
  title: 'Notes and things I am learning.',
  description:
    'Short, honest notes about software, study and the lessons that stick. Written by hand in Markdown — no feed, no algorithm.',
  backToBlog: 'All notes',
  backToPortfolio: 'Back to portfolio',
  emptyTitle: 'No notes published yet.',
  emptyBody:
    'This is where I will share thoughts as I build, learn and figure things out. Nothing is published yet — when I write a note, it will appear here.',
  emptyCta: 'Say hello in the meantime',
  emptyHref: '#contact',
  notFoundTitle: 'Note not found',
  notFoundBody: 'That note does not exist, or it has not been published yet.',
  notFoundCta: 'Browse all notes',
  notFoundHref: '#/blog',
};

export const footer = {
  builtWith: 'Built with React, Vite and Tailwind CSS.',
  note: 'Designed and built in Dhaka, Bangladesh.',
  backToTop: 'Back to top',
};

export const seo = {
  siteUrl: 'https://mostafijhemal.github.io/portfolio/',
};
