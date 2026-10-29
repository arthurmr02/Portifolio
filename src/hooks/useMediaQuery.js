import { useSyncExternalStore } from 'react';

/** Retorna true enquanto a media query casar. Ex.: useMediaQuery('(min-width: 768px)'). */
export function useMediaQuery(query) {
  return useSyncExternalStore(
    (notify) => {
      const list = window.matchMedia(query);
      list.addEventListener('change', notify);
      return () => list.removeEventListener('change', notify);
    },
    () => window.matchMedia(query).matches,
    () => false,
  );
}
