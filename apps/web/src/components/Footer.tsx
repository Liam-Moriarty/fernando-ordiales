import { profile } from '../content/profile';

const footerLink =
  'text-sm text-muted transition-colors duration-150 hover:text-text';

export const Footer = () => {
  // Unset profile links stay hidden; they appear as soon as Fernando fills
  // them in (content/profile.ts).
  const external = [
    { label: 'GitHub', href: profile.links.github },
    { label: 'LinkedIn', href: profile.links.linkedin },
  ].filter((link) => link.href !== '');

  return (
    <footer className="border-t border-border">
      <div className="mx-auto flex max-w-page flex-wrap items-center justify-between gap-x-8 gap-y-4 px-5 py-8 sm:px-8 lg:px-12">
        <nav aria-label="Footer" className="flex flex-wrap items-center gap-5">
          {external.map((link) => (
            <a key={link.label} href={link.href} className={footerLink}>
              {link.label}
            </a>
          ))}
          <a href={profile.links.resume} className={footerLink}>
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
};
