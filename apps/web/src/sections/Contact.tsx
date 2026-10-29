import { CopyEmailButton } from '../components/CopyEmailButton';
import { EmailButton } from '../components/EmailButton';
import { profile } from '../content/profile';
import { FieldScene } from '../three/FieldScene';

export const Contact = () => (
  <section
    id="contact"
    data-trace-node="contact"
    className="scroll-mt-24 py-16 lg:py-24"
  >
    <div className="grid items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,38%)]">
      <div>
        <h2 className="text-h2">Contact</h2>
        <p className="mt-3 max-w-[68ch] text-muted">
          Tell me what you're building. I read everything that lands here.
        </p>
        <a
          href={`mailto:${profile.email}`}
          className="mt-8 block max-w-full break-all text-h2 decoration-accent underline-offset-8 hover:underline"
        >
          {profile.email}
        </a>
        <div className="mt-10 flex flex-wrap gap-3">
          <EmailButton />
          <CopyEmailButton email={profile.email} />
        </div>
        <p className="mt-8 font-mono text-caption text-muted">
          {profile.availability} · {profile.location} · {profile.timezone}
        </p>
      </div>
      {/* The particle field lives here now, seeing the visitor out. */}
      <FieldScene className="h-56 sm:h-72 lg:h-96" />
    </div>
  </section>
);
