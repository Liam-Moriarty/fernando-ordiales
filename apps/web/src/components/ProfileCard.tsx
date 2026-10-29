import {
  FacebookLogoIcon,
  GithubLogoIcon,
  InstagramLogoIcon,
  LinkedinLogoIcon,
} from '@phosphor-icons/react';
import { profile } from '../content/profile';
import { EmailButton } from './EmailButton';

const socials = [
  { label: 'GitHub', href: profile.links.github, Icon: GithubLogoIcon },
  { label: 'LinkedIn', href: profile.links.linkedin, Icon: LinkedinLogoIcon },
  {
    label: 'Instagram',
    href: profile.links.instagram,
    Icon: InstagramLogoIcon,
  },
  { label: 'Facebook', href: profile.links.facebook, Icon: FacebookLogoIcon },
];

// The hero identity card, following Fernando's reference exactly:
// availability pill, photo, email, location, socials, one full-width CTA.
export const ProfileCard = () => (
  <div className="rounded-xl border border-border bg-elevated p-5">
    <div className="flex items-center justify-between gap-3">
      <span aria-hidden className="h-3 w-3 rounded-full bg-accent" />
      <span className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1 text-caption text-muted">
        <span aria-hidden className="h-1.5 w-1.5 rounded-full bg-accent" />
        {profile.availability}
      </span>
    </div>

    <figure className="card-photo relative mt-4 aspect-square overflow-hidden rounded-lg">
      <img
        src="/pfp-2.jpg"
        alt="Fernando walking under string lights at night"
        width={954}
        height={960}
        className="h-full w-full object-cover"
      />
    </figure>

    <div className="mt-4 text-center">
      <a
        href={`mailto:${profile.email}`}
        className="break-all text-sm font-medium decoration-accent underline-offset-4 hover:underline"
      >
        {profile.email}
      </a>
      <p className="mt-1 text-caption text-muted">
        Based in {profile.location}
      </p>
    </div>

    <div className="mt-4 flex justify-center gap-2">
      {socials.map(({ label, href, Icon }) => (
        <a
          key={label}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          title={label}
          className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border text-muted transition-colors duration-150 hover:border-accent hover:text-text"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>

    <div className="mt-5">
      <EmailButton className="w-full" />
    </div>
  </div>
);
