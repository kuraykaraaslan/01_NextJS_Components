'use client';
import { useEffect, type RefObject } from 'react';

// Dev-only: runs axe-core against a container ref and logs violations.
// No-ops and tree-shakes out in production — the dynamic import is never
// resolved when NODE_ENV !== 'development'.
export function useA11yCheck(ref: RefObject<HTMLElement | null>, label?: string): void {
  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') return;
    if (!ref.current) return;

    let cancelled = false;
    const node = ref.current;

    import('axe-core').then(({ default: axe }) => {
      if (cancelled) return;
      axe.run(node).then((results) => {
        if (cancelled || results.violations.length === 0) return;
        console.group(`[a11y] ${label ?? 'component'} — ${results.violations.length} violation(s)`);
        results.violations.forEach((v) => {
          console.warn(`[${v.impact}] ${v.description}`, v.nodes.map((n) => n.html));
        });
        console.groupEnd();
      });
    });

    return () => { cancelled = true; };
  }, [ref, label]);
}
