import { useEffect } from 'react';

export const usePageMeta = (title: string, description: string): void => {
  useEffect(() => {
    document.title = title;
    document
      .querySelector('meta[name="description"]')
      ?.setAttribute('content', description);
  }, [title, description]);
};
