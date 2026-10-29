import { useEffect, useState } from 'react';

/** Vira true quando o navegador fica ocioso (ou após `timeout` ms), para adiar trabalho pesado. */
export function useIdleReady(timeout = 1500) {
  const [ready, setReady] = useState(false);

  useEffect(() => {
    if ('requestIdleCallback' in window) {
      const id = window.requestIdleCallback(() => setReady(true), { timeout });
      return () => window.cancelIdleCallback(id);
    }
    const id = window.setTimeout(() => setReady(true), timeout);
    return () => window.clearTimeout(id);
  }, [timeout]);

  return ready;
}
