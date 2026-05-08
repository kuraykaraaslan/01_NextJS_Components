'use client';
import { useState, useEffect } from 'react';

type Breakpoint = 'sm' | 'md' | 'lg' | 'xl' | '2xl';

const BREAKPOINTS: [Breakpoint, number][] = [
  ['2xl', 1536],
  ['xl',  1280],
  ['lg',  1024],
  ['md',   768],
  ['sm',     0],
];

function getCurrentBreakpoint(): Breakpoint {
  for (const [bp, minWidth] of BREAKPOINTS) {
    if (window.innerWidth >= minWidth) return bp;
  }
  return 'sm';
}

export function useBreakpoint() {
  const [breakpoint, setBreakpoint] = useState<Breakpoint>('sm');

  useEffect(() => {
    const update = () => setBreakpoint(getCurrentBreakpoint());
    update();
    window.addEventListener('resize', update, { passive: true });
    return () => window.removeEventListener('resize', update);
  }, []);

  return {
    breakpoint,
    isSm:      breakpoint === 'sm',
    isMd:      breakpoint === 'md',
    isLg:      breakpoint === 'lg',
    isXl:      breakpoint === 'xl',
    is2xl:     breakpoint === '2xl',
    isMobile:  breakpoint === 'sm',
    isTablet:  breakpoint === 'md',
    isDesktop: breakpoint === 'lg' || breakpoint === 'xl' || breakpoint === '2xl',
  };
}
