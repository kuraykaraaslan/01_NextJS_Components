type Politeness = 'polite' | 'assertive';

function getRegion(politeness: Politeness): HTMLElement {
  const id = `announce-${politeness}`;
  let el = document.getElementById(id);
  if (!el) {
    el = document.createElement('div');
    el.id = id;
    el.setAttribute('role', 'status');
    el.setAttribute('aria-live', politeness);
    el.setAttribute('aria-atomic', 'true');
    Object.assign(el.style, {
      position: 'absolute',
      width: '1px',
      height: '1px',
      padding: '0',
      overflow: 'hidden',
      clip: 'rect(0,0,0,0)',
      whiteSpace: 'nowrap',
      border: '0',
    });
    document.body.appendChild(el);
  }
  return el;
}

// Injects a message into a hidden ARIA live region so screen readers announce
// async state changes (form submissions, toasts, route transitions, etc.).
// SSR-safe: no-ops on the server.
export function announce(message: string, politeness: Politeness = 'polite'): void {
  if (typeof window === 'undefined') return;
  const region = getRegion(politeness);
  // Clear then set forces re-announcement even for identical messages.
  region.textContent = '';
  requestAnimationFrame(() => {
    region.textContent = message;
  });
}
