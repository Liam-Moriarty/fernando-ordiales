import { useRef, useState } from 'react';
import { profile } from '../content/profile';
import { Button, ButtonLink } from './Button';

export const buildMailto = (
  email: string,
  subject: string,
  body: string
): string => {
  const params = new URLSearchParams();
  if (subject) params.set('subject', subject);
  if (body) params.set('body', body);
  const query = params.toString().replace(/\+/g, '%20');
  return query ? `mailto:${email}?${query}` : `mailto:${email}`;
};

const field =
  'mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-text';

// "Email me" opens a compose dialog; Send hands the drafted message to the
// visitor's mail app via mailto. A static site can't post mail itself — a
// form service or server would be the later-stage upgrade.
export const EmailButton = ({ size = 'md' }: { size?: 'md' | 'sm' }) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');

  const open = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  };

  const close = () => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (typeof dialog.close === 'function') dialog.close();
    else dialog.removeAttribute('open');
  };

  return (
    <>
      <Button variant="primary" size={size} onClick={open}>
        Email me
      </Button>
      <dialog
        ref={dialogRef}
        aria-labelledby="email-dialog-title"
        onClick={(event) => {
          // A click on the backdrop lands on the dialog element itself.
          if (event.target === dialogRef.current) close();
        }}
        className="modal m-auto w-[calc(100%-2.5rem)] max-w-md rounded-xl border border-border bg-elevated p-6 text-text backdrop:bg-black/40"
      >
        <h2 id="email-dialog-title" className="text-h4">
          Email Fernando
        </h2>
        <p className="mt-1 text-sm text-muted">
          Send opens your mail app with everything filled in, addressed to{' '}
          {profile.email}.
        </p>
        <label className="mt-5 block text-sm">
          Subject
          <input
            type="text"
            value={subject}
            onChange={(event) => setSubject(event.target.value)}
            className={field}
          />
        </label>
        <label className="mt-4 block text-sm">
          Message
          <textarea
            rows={6}
            value={body}
            onChange={(event) => setBody(event.target.value)}
            className={field}
          />
        </label>
        <div className="mt-6 flex justify-end gap-3">
          <Button variant="ghost" onClick={close}>
            Cancel
          </Button>
          <ButtonLink
            variant="primary"
            href={buildMailto(profile.email, subject, body)}
            onClick={close}
          >
            Send
          </ButtonLink>
        </div>
      </dialog>
    </>
  );
};
