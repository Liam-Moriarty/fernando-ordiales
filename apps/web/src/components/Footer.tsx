import {
  FacebookLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react';
import { profile } from '../content/profile';

const footerLink =
  'text-sm text-muted transition-colors duration-150 hover:text-text';

// Socials from the old portfolio's footer, as bordered icon buttons. An
// unset URL simply doesn't render.
type Social = { label: string; href: string; Icon: typeof GithubLogoIcon };

const allSocials: Social[] = [
  { label: 'GitHub', href: profile.links.github, Icon: GithubLogoIcon },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedinLogoIcon },
  {
    label: 'Instagram',
    href: profile.links.instagram,
    Icon: InstagramLogoIcon,
  },
  { label: 'Facebook', href: profile.links.facebook, Icon: FacebookLogoIcon },
];

const socials = allSocials.filter((social) => social.href !== '');

export const Footer = () => (
  <footer className="border-t border-border">
    <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-8 sm:px-8 lg:px-12">
      <nav aria-label="Footer" className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          {socials.map(({ label, href, Icon }) => (
            <a
              key={label}
              href={href}
              target="_blank"
              rel="noreferrer"
              aria-label={label}
              title={label}
              className="inline-flex h-8 w-8 items-center justify-center rounded-sm border border-border text-muted transition-colors duration-150 hover:border-accent hover:text-text"
            >
              <Icon size={16} />
            </a>
          ))}
        </div>
        <a
          href={profile.links.resume}
          target="_blank"
          rel="noreferrer"
          className={footerLink}
        >
          Resume (PDF)
        </a>
        <a href={`mailto:${profile.email}`} className={footerLink}>
          Email
        </a>
      </nav>
      <p className="font-mono text-caption text-muted">
        © 2026 · {profile.location} ({profile.timezone})
      </p>
    </div>
  </footer>
);
