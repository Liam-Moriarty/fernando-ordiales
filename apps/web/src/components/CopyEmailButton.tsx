import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { CheckIcon, CopyIcon } from '@phosphor-icons/react';
import { durBase } from '../lib/motion';
import { Button } from './Button';

export const CopyEmailButton = ({ email }: { email: string }) => {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | undefined>(undefined);

  useEffect(() => () => window.clearTimeout(timer.current), []);

  const copy = async () => {
    // Clipboard can be missing (http, old embeds) or denied. The email is
    // visible on the page and mailto still works, so failure stays quiet.
    if (!navigator.clipboard) return;
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1600);
    } catch {
      // Denied — see above.
    }
  };

  return (
    <>
      <Button variant="secondary" onClick={copy}>
        <motion.span
          key={String(copied)}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: durBase }}
          className="inline-flex items-center gap-2"
        >
          {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
          {copied ? 'Copied' : 'Copy email'}
        </motion.span>
      </Button>
      <span aria-live="polite" className="sr-only">
        {copied ? 'Email copied to clipboard' : ''}
      </span>
    </>
  );
};
