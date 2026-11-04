import { SiGithub, SiTelegram, SiYoutube } from 'react-icons/si';
import { FiMail } from 'react-icons/fi';

/** LinkedIn was removed from Simple Icons; this is the standard glyph. */
export function LinkedInIcon(props) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
      <path d="M4.98 3.5A2.49 2.49 0 1 1 0 3.5a2.49 2.49 0 0 1 4.98 0ZM.22 8h4.56v14H.22V8Zm7.4 0h4.37v1.92h.06c.61-1.16 2.1-2.38 4.32-2.38 4.62 0 5.47 3.04 5.47 6.99V22h-4.56v-6.62c0-1.58-.03-3.61-2.2-3.61-2.2 0-2.54 1.72-2.54 3.5V22H8.02V8Z" />
    </svg>
  );
}

const socialIcons = {
  github: SiGithub,
  linkedin: LinkedInIcon,
  telegram: SiTelegram,
  youtube: SiYoutube,
  email: FiMail,
};

export function SocialIcon({ id, className = 'h-[18px] w-[18px]' }) {
  const Component = socialIcons[id] || FiMail;
  return <Component className={className} aria-hidden="true" />;
}
