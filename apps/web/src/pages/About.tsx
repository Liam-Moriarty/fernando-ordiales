import { ButtonLink } from '../components/Button';
import { profile } from '../content/profile';
import { PageTransition } from '../components/PageTransition';
import { usePageMeta } from '../lib/meta';

export const About = () => {
  usePageMeta(
    'About — Fernando Ordiales',
    'AI engineer in Metro Manila. Information Systems graduate, two engineering bootcamps, building AI products end to end at Hytel.'
  );

  return (
    <PageTransition>
      <section className="mx-auto max-w-page px-5 py-16 sm:px-8 lg:px-12 lg:py-24">
        <h1 className="text-h1">About</h1>

        <div className="mt-8 max-w-[68ch] space-y-5 text-muted">
          <p>
            I'm Fernando, an AI engineer in Metro Manila. At Hytel I build AI
            products end to end: retrieval-augmented generation on Vertex AI,
            the interfaces those features live in, and the Google Cloud
            infrastructure underneath — across five concurrent projects.
          </p>
          <p>
            Before that I led the migration of FGP's site off WordPress onto a
            modern stack, with REST APIs, Docker and CI/CD on GitHub Actions.
            The common thread: I like owning a feature the whole way down, from
            the prompt to the pipeline that deploys it.
          </p>
          <p>
            I studied Information Systems at Makati Science Technological
            Institute of the Philippines (2021–2025) and came up through Hytel's
            software engineering and AI enablement bootcamps, after a frontend
            internship at Digiplus Interactive.
          </p>
        </div>

        <div className="mt-10 flex flex-wrap gap-3">
          <ButtonLink variant="primary" href={`mailto:${profile.email}`}>
            Email me
          </ButtonLink>
          <ButtonLink
            variant="secondary"
            href={profile.links.resume}
            target="_blank"
            rel="noreferrer"
          >
            View resume (PDF)
          </ButtonLink>
        </div>

        <p className="mt-8 font-mono text-caption text-muted">
          {profile.availability} · {profile.location} · {profile.timezone}
        </p>
      </section>
    </PageTransition>
  );
};
