import { ButtonLink } from '../components/Button';
import { CopyEmailButton } from '../components/CopyEmailButton';
import { profile } from '../content/profile';

export const Contact = () => (
  <section
    id="contact"
    data-trace-node="contact"
    className="scroll-mt-24 py-16 lg:py-24"
  >
    <h2 className="text-h2">Contact</h2>
    <p className="mt-3 max-w-[68ch] text-muted">
      Tell me what you're building. I read everything that lands here.
    </p>
    <a
      href={`mailto:${profile.email}`}
      className="mt-10 block max-w-full break-all text-h1 decoration-accent underline-offset-8 hover:underline"
    >
      {profile.email}
    </a>
    <div className="mt-10 flex flex-wrap gap-3">
      <ButtonLink variant="primary" href={`mailto:${profile.email}`}>
        Email me
      </ButtonLink>
      <CopyEmailButton email={profile.email} />
    </div>
    <p className="mt-8 font-mono text-caption text-muted">
      {profile.availability} · {profile.location} · {profile.timezone}
    </p>
  </section>
);
