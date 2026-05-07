'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown } from '@fortawesome/free-solid-svg-icons';

export function NavDropdown({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="absolute top-full mt-2 z-[100] rounded-xl overflow-hidden shadow-2xl shadow-black/60"
      style={{ border: '1px solid rgba(255,255,255,0.1)', background: '#1c2a3e' }}
    >
      {children}
    </div>
  );
}

export function NavDropdownHeader({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="px-3 pt-3 pb-2"
      style={{ borderBottom: '1px solid rgba(255,255,255,0.08)' }}
    >
      <p className="text-[11px] font-semibold uppercase tracking-widest" style={{ color: 'rgba(255,255,255,0.4)' }}>
        {children}
      </p>
    </div>
  );
}

export function NavTriggerButton({
  onClick,
  expanded,
  children,
}: {
  onClick: () => void;
  expanded: boolean;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      aria-haspopup="listbox"
      aria-expanded={expanded}
      className="flex items-center gap-1.5 text-xs font-medium transition-colors rounded focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-blue-400"
      style={{ color: 'rgba(255,255,255,0.55)' }}
      onMouseOver={(e) => (e.currentTarget.style.color = '#fff')}
      onMouseOut={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.55)')}
    >
      {children}
      <FontAwesomeIcon
        icon={faChevronDown}
        className="h-3 w-3 transition-transform duration-200"
        style={{ transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)' }}
        aria-hidden="true"
      />
    </button>
  );
}
