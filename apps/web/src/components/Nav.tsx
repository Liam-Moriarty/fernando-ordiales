import { useEffect, useState } from 'react';
import { Link, NavLink } from 'react-router';
import { ButtonLink } from './Button';
import { ThemeToggle } from './ThemeToggle';

// Replaced by content/profile in Task 3 of the plan.
const EMAIL = 'fernando.ordiales23@gmail.com';

const navLink =
  'text-sm text-muted transition-colors duration-150 hover:text-text';

export const Nav = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-40 border-b bg-background ${
        scrolled ? 'border-border' : 'border-transparent'
      }`}
    >
      <nav
        aria-label="Main"
        className="mx-auto flex max-w-page items-center gap-5 px-5 py-3 sm:px-8 lg:px-12"
      >
        <Link to="/" className="mr-1 text-sm font-medium">
          Fernando Ordiales
        </Link>
        <div className="flex flex-1 items-center gap-5">
          <a href="/#work" className={navLink}>
            Work
          </a>
          <NavLink to="/about" className={navLink}>
            About
          </NavLink>
        </div>
        <ThemeToggle />
        <ButtonLink variant="primary" size="sm" href={`mailto:${EMAIL}`}>
          Email me
        </ButtonLink>
      </nav>
    </header>
  );
};
