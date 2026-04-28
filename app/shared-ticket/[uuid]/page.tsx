'use client';
import { use, useState } from 'react';
import { TicketCard } from '@/modules/domains/event/TicketCard';
import { getTicketById } from '@/app/themes/event/event.data';
import { cn } from '@/libs/utils/cn';

/* ── print isolation helper ──────────────────────────────
   Injects a <style> that hides everything on the page
   except #shared-ticket-print, triggers window.print(),
   then removes the style so the screen view is unaffected.
──────────────────────────────────────────────────────── */
function printTicket() {
  const STYLE_ID = '__ticket-print-style__';
  const existing = document.getElementById(STYLE_ID);
  if (existing) existing.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @media print {
      body > * { display: none !important; }
      #shared-ticket-print { display: block !important; }
    }
  `;
  document.head.appendChild(style);
  window.print();
  // Remove after the print dialog closes (afterprint fires on all modern browsers)
  window.addEventListener('afterprint', () => style.remove(), { once: true });
}

/* ── copy-to-clipboard hook ── */
function useCopyUrl() {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };
  return { copied, copy };
}

/* ════════════════════════════════════════════════════════
   Page
════════════════════════════════════════════════════════ */

export default function SharedTicketPage({ params }: { params: Promise<{ uuid: string }> }) {
  const { uuid } = use(params);
  const entry = getTicketById(uuid);
  const { copied, copy } = useCopyUrl();

  /* ── not found ── */
  if (!entry) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 bg-surface-base px-4">
        <span className="text-5xl">🎫</span>
        <h1 className="text-xl font-bold text-text-primary">Bilet bulunamadı</h1>
        <p className="text-sm text-text-secondary text-center max-w-xs">
          Bu bağlantı geçersiz ya da süresi dolmuş olabilir.
        </p>
        <a
          href="/themes/event"
          className="mt-2 px-5 py-2.5 rounded-lg bg-primary text-primary-fg text-sm font-semibold hover:bg-primary-hover transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          Etkinliklere Göz At
        </a>
      </div>
    );
  }

  const { ticket, event, section } = entry;

  return (
    <div className="min-h-screen bg-surface-base flex flex-col">

      {/* ── minimal header ── */}
      <header className="border-b border-border bg-surface-raised print:hidden">
        <div className="mx-auto max-w-2xl px-4 h-14 flex items-center justify-between">
          <a
            href="/themes/event"
            className="flex items-center gap-2 text-sm font-bold text-text-primary hover:text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
          >
            <span className="text-xl">🎫</span>
            <span>BiletMaster</span>
          </a>
          <span className="text-xs text-text-secondary">Paylaşılan Bilet</span>
        </div>
      </header>

      {/* ── content ── */}
      <main className="flex-1 flex flex-col items-center justify-start py-10 px-4 gap-6">

        {/* intro text – screen only */}
        <div className="text-center print:hidden">
          <p className="text-text-secondary text-sm">
            <span className="font-semibold text-text-primary">{ticket.attendeeName ?? 'Bir kullanıcı'}</span>
            {' '}bu bileti sizinle paylaştı.
          </p>
        </div>

        {/* ticket – this div is targeted by the print style */}
        <div id="shared-ticket-print" className="w-full max-w-xl">
          <TicketCard
            ticket={ticket}
            event={event}
            section={section}
            orientation="horizontal"
          />
        </div>

        {/* action bar – screen only */}
        <div className="flex flex-wrap items-center justify-center gap-2 print:hidden">
          <button
            onClick={printTicket}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors',
              'bg-primary text-primary-fg hover:bg-primary-hover',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            )}
          >
            <PrintIcon className="w-4 h-4" />
            Yazdır
          </button>

          <button
            onClick={copy}
            className={cn(
              'flex items-center gap-2 px-4 py-2.5 rounded-lg text-sm font-semibold transition-colors',
              'border border-border bg-surface-raised hover:bg-surface-overlay text-text-primary',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            )}
          >
            <LinkIcon className="w-4 h-4" />
            {copied ? 'Kopyalandı!' : 'Bağlantıyı Kopyala'}
          </button>
        </div>

        {/* disclaimer */}
        <p className="text-[11px] text-text-disabled text-center max-w-xs print:hidden">
          Bu bilet yalnızca görüntüleme amaçlıdır. Girişte asıl bilet sahibinin kimliği kontrol edilebilir.
        </p>

      </main>
    </div>
  );
}

/* ── icons ── */

function PrintIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <rect x="4" y="2" width="12" height="6" rx="1" />
      <path d="M4 8H2a1 1 0 00-1 1v6a1 1 0 001 1h2" strokeLinecap="round" />
      <path d="M16 8h2a1 1 0 011 1v6a1 1 0 01-1 1h-2" strokeLinecap="round" />
      <rect x="4" y="12" width="12" height="6" rx="1" />
      <circle cx="16" cy="11" r="1" fill="currentColor" stroke="none" />
    </svg>
  );
}

function LinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth={1.7} aria-hidden="true">
      <path d="M8 12a4 4 0 005.66 0l2-2a4 4 0 00-5.66-5.66l-1 1" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M12 8a4 4 0 00-5.66 0l-2 2a4 4 0 005.66 5.66l1-1" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}
