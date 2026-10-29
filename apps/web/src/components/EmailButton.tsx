import { useRef, useState } from 'react';
import { profile } from '../content/profile';
import { Button } from './Button';

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

// FormSubmit relays the POST to Fernando's inbox with no account or key —
// the address is public on this page anyway. The FIRST message ever sent
// makes FormSubmit email Fernando an activation link; messages flow once he
// confirms it. The mail-app mailto stays as the failure fallback.
export const SEND_ENDPOINT = `https://formsubmit.co/ajax/${profile.email}`;

type SendState = 'idle' | 'sending' | 'sent' | 'error';

const field =
  'mt-1 w-full rounded-sm border border-border bg-surface px-3 py-2 text-sm text-text';

export const EmailButton = ({
  size = 'md',
  className,
}: {
  size?: 'md' | 'sm';
  className?: string;
}) => {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [state, setState] = useState<SendState>('idle');

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
    setState('idle');
  };

  const send = async () => {
    setState('sending');
    try {
      // FormData keeps this a "simple" request: a JSON body forces a CORS
      // preflight that FormSubmit answers without CORS headers, which makes
      // the browser block the send entirely.
      const form = new FormData();
      form.set('_subject', subject || 'Portfolio contact');
      form.set('message', body);
      form.set('_captcha', 'false');
      form.set('_template', 'box');
      // no-cors because FormSubmit's responses carry no CORS headers: the
      // response is opaque, so a resolved fetch means the relay took the
      // message and a rejected one means it was unreachable.
      await fetch(SEND_ENDPOINT, {
        method: 'POST',
        mode: 'no-cors',
        body: form,
      });
      setState('sent');
      setSubject('');
      setBody('');
    } catch {
      // Offline, blocked, or the relay is down: hand over to the mail app.
      setState('error');
    }
  };

  return (
    <>
      <Button
        variant="primary"
        size={size}
        className={className}
        onClick={open}
      >
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
        {state === 'sent' ? (
          <>
            <p className="mt-3 text-sm" role="status">
              Sent — thank you. I read everything that lands here.
            </p>
            <div className="mt-6 flex justify-end">
              <Button variant="secondary" onClick={close}>
                Close
              </Button>
            </div>
          </>
        ) : (
          <>
            <p className="mt-1 text-sm text-muted">
              Goes straight to {profile.email}.
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
            {state === 'error' && (
              <p className="mt-4 text-sm text-error" role="alert">
                Couldn't send just now —{' '}
                <a
                  href={buildMailto(profile.email, subject, body)}
                  className="text-accent underline decoration-accent-quiet underline-offset-4 hover:decoration-accent"
                >
                  open in your mail app
                </a>{' '}
                instead.
              </p>
            )}
            <div className="mt-6 flex justify-end gap-3">
              <Button variant="ghost" onClick={close}>
                Cancel
              </Button>
              <Button
                variant="primary"
                onClick={() => void send()}
                disabled={body.trim() === '' || state === 'sending'}
              >
                {state === 'sending' ? 'Sending…' : 'Send'}
              </Button>
            </div>
          </>
        )}
      </dialog>
    </>
  );
};
