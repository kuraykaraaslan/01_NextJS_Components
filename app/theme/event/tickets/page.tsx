'use client';
import { useState, useMemo } from 'react';
import { TicketCard } from '@/modules/domains/event/TicketCard';
import { EmptyState } from '@/modules/ui/EmptyState';
import { MY_TICKETS } from '@/app/theme/event/event.data';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTableCells, faTableList, faPrint, faShareNodes, faTicket } from '@fortawesome/free-solid-svg-icons';

/* ── print isolation ──────────────────────────────────────
   Injects a @media print rule that hides everything except
   the target ticket wrapper, triggers print, then removes
   the injected style once the dialog closes.
──────────────────────────────────────────────────────── */
function printTicketById(ticketId: string) {
  const STYLE_ID = '__ticket-print-style__';
  document.getElementById(STYLE_ID)?.remove();

  const style = document.createElement('style');
  style.id = STYLE_ID;
  style.textContent = `
    @media print {
      body > * { display: none !important; }
      #ticket-print-${CSS.escape(ticketId)} { display: block !important; position: fixed; inset: 0; padding: 24px; }
    }
  `;
  document.head.appendChild(style);
  window.print();
  window.addEventListener('afterprint', () => style.remove(), { once: true });
}

/* ── types ── */

type FilterTab = 'all' | 'upcoming' | 'past' | 'cancelled';
type Orientation = 'horizontal' | 'vertical';

/* ── helpers ── */

const FMT_CURRENCY = new Intl.NumberFormat('tr-TR', {
  style: 'currency',
  currency: 'TRY',
  maximumFractionDigits: 0,
});

const STATUS_LABELS: Record<string, string> = {
  VALID: 'Geçerli',
  USED: 'Kullanıldı',
  CANCELLED: 'İptal',
  REFUNDED: 'İade',
  TRANSFERRED: 'Transfer',
};

const STATUS_COLORS: Record<string, string> = {
  VALID: 'bg-success-subtle text-success border-success/30',
  USED: 'bg-surface-overlay text-text-secondary border-border',
  CANCELLED: 'bg-error-subtle text-error border-error/30',
  REFUNDED: 'bg-warning-subtle text-warning border-warning/30',
  TRANSFERRED: 'bg-info-subtle text-info border-info/30',
};

/* ── stat card ── */

function StatCard({ label, value, accent }: { label: string; value: number | string; accent?: string }) {
  return (
    <div className="bg-surface-raised border border-border rounded-xl px-5 py-4 flex flex-col gap-1">
      <span className={cn('text-2xl font-black tabular-nums', accent ?? 'text-text-primary')}>{value}</span>
      <span className="text-xs text-text-secondary">{label}</span>
    </div>
  );
}

/* ── filter tab button ── */

function TabButton({
  active,
  onClick,
  children,
  count,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
  count: number;
}) {
  return (
    <button
      onClick={onClick}
      className={cn(
        'flex items-center gap-1.5 px-4 py-2 rounded-lg text-sm font-semibold transition-colors',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
        active
          ? 'bg-primary text-primary-fg shadow-sm'
          : 'text-text-secondary hover:text-text-primary hover:bg-surface-overlay',
      )}
    >
      {children}
      <span
        className={cn(
          'text-[10px] font-bold px-1.5 py-0.5 rounded-full leading-none',
          active ? 'bg-primary-fg/20 text-primary-fg' : 'bg-surface-sunken text-text-disabled',
        )}
      >
        {count}
      </span>
    </button>
  );
}

/* ── view toggle ── */

function ViewToggle({
  value,
  onChange,
}: {
  value: Orientation;
  onChange: (v: Orientation) => void;
}) {
  return (
    <div
      className="flex items-center gap-0.5 rounded-lg p-0.5 border border-border bg-surface-raised"
      role="group"
      aria-label="Görünüm seçenekleri"
    >
      {(['horizontal', 'vertical'] as const).map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          aria-pressed={value === opt}
          className={cn(
            'px-3 py-1.5 rounded-md text-xs font-semibold transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            value === opt
              ? 'bg-primary text-primary-fg shadow-sm'
              : 'text-text-secondary hover:text-text-primary',
          )}
        >
          {opt === 'horizontal' ? (
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faTableList} className="w-3.5 h-3.5" aria-hidden="true" />
              Yatay
            </span>
          ) : (
            <span className="flex items-center gap-1.5">
              <FontAwesomeIcon icon={faTableCells} className="w-3.5 h-3.5" aria-hidden="true" />
              Dikey
            </span>
          )}
        </button>
      ))}
    </div>
  );
}


/* ════════════════════════════════════════════════════════
   Page
════════════════════════════════════════════════════════ */

const now = new Date();

export default function MyTicketsPage() {
  const [tab, setTab] = useState<FilterTab>('all');
  const [orientation, setOrientation] = useState<Orientation>('horizontal');

  /* counts */
  const counts = useMemo(() => {
    const all = MY_TICKETS.length;
    const upcoming = MY_TICKETS.filter(
      (e) => e.ticket.status === 'VALID' && e.event.startAt > now,
    ).length;
    const past = MY_TICKETS.filter(
      (e) => e.ticket.status === 'USED' || (e.ticket.status === 'VALID' && e.event.startAt <= now),
    ).length;
    const cancelled = MY_TICKETS.filter(
      (e) => e.ticket.status === 'CANCELLED' || e.ticket.status === 'TRANSFERRED' || e.ticket.status === 'REFUNDED',
    ).length;
    return { all, upcoming, past, cancelled };
  }, []);

  /* filtered list */
  const filtered = useMemo(() => {
    if (tab === 'upcoming') return MY_TICKETS.filter((e) => e.ticket.status === 'VALID' && e.event.startAt > now);
    if (tab === 'past') return MY_TICKETS.filter((e) => e.ticket.status === 'USED' || (e.ticket.status === 'VALID' && e.event.startAt <= now));
    if (tab === 'cancelled') return MY_TICKETS.filter((e) => ['CANCELLED', 'TRANSFERRED', 'REFUNDED'].includes(e.ticket.status));
    return MY_TICKETS;
  }, [tab]);

  /* total spend */
  const totalSpend = MY_TICKETS.filter((e) => !['CANCELLED', 'REFUNDED'].includes(e.ticket.status))
    .reduce((s, e) => s + e.price, 0);

  /* ── render ── */

  return (
    <div className="min-h-screen bg-surface-base">

      {/* ── hero banner ── */}
      <div className="bg-gradient-to-br from-primary to-secondary px-6 py-10">
        <div className="mx-auto max-w-5xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
            {/* user info */}
            <div className="flex items-center gap-4">
              <div className="h-14 w-14 rounded-full bg-primary-fg/20 border-2 border-primary-fg/30 flex items-center justify-center text-2xl font-black text-primary-fg shrink-0">
                K
              </div>
              <div>
                <p className="text-sm text-primary-fg/70 font-medium">Merhaba,</p>
                <h1 className="text-xl font-black text-primary-fg">Kuray Karaaslan</h1>
                <p className="text-xs text-primary-fg/60 mt-0.5">kuraykaraaslan@gmail.com</p>
              </div>
            </div>

            {/* stats */}
            <div className="grid grid-cols-3 gap-3">
              {[
                { label: 'Toplam Bilet', value: counts.all },
                { label: 'Yaklaşan', value: counts.upcoming },
                { label: 'Harcama', value: FMT_CURRENCY.format(totalSpend) },
              ].map((s) => (
                <div
                  key={s.label}
                  className="rounded-xl px-4 py-3 text-center"
                  style={{ background: 'rgba(255,255,255,0.15)' }}
                >
                  <p className="text-lg font-black text-primary-fg tabular-nums">{s.value}</p>
                  <p className="text-[10px] text-primary-fg/70 mt-0.5 whitespace-nowrap">{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── content ── */}
      <div className="mx-auto max-w-5xl px-4 sm:px-6 py-8 space-y-6">

        {/* ── status summary strip ── */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <StatCard label="Geçerli Bilet" value={MY_TICKETS.filter((e) => e.ticket.status === 'VALID').length} accent="text-success" />
          <StatCard label="Kullanılan" value={MY_TICKETS.filter((e) => e.ticket.status === 'USED').length} accent="text-text-secondary" />
          <StatCard label="Transfer" value={MY_TICKETS.filter((e) => e.ticket.status === 'TRANSFERRED').length} accent="text-info" />
          <StatCard label="İptal" value={MY_TICKETS.filter((e) => e.ticket.status === 'CANCELLED').length} accent="text-error" />
        </div>

        {/* ── filter bar ── */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-1 flex-wrap">
            <TabButton active={tab === 'all'} onClick={() => setTab('all')} count={counts.all}>Tümü</TabButton>
            <TabButton active={tab === 'upcoming'} onClick={() => setTab('upcoming')} count={counts.upcoming}>Yaklaşan</TabButton>
            <TabButton active={tab === 'past'} onClick={() => setTab('past')} count={counts.past}>Geçmiş</TabButton>
            <TabButton active={tab === 'cancelled'} onClick={() => setTab('cancelled')} count={counts.cancelled}>İptal / Transfer</TabButton>
          </div>
          <ViewToggle value={orientation} onChange={setOrientation} />
        </div>

        {/* ── ticket list ── */}
        {filtered.length === 0 ? (
          <EmptyState
            icon={<FontAwesomeIcon icon={faTicket} className="w-5 h-5" aria-hidden="true" />}
            title="Bilet bulunamadı"
            description="Bu kategoride biletiniz bulunmuyor."
          />
        ) : orientation === 'horizontal' ? (
          <div className="space-y-4">
            {filtered.map((entry) => (
              <TicketCardRow key={entry.ticket.ticketId} entry={entry} />
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((entry) => (
              <VerticalTicketCell key={entry.ticket.ticketId} entry={entry} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ── horizontal row ── */

type EntryProps = { entry: (typeof MY_TICKETS)[number] };

function TicketCardRow({ entry }: EntryProps) {
  return (
    <div className="group">
      <div className="flex items-center justify-between mb-2 px-1">
        <EventMeta entry={entry} />
        <TicketActions entry={entry} />
      </div>
      <div id={`ticket-print-${entry.ticket.ticketId}`}>
        <TicketCard
          ticket={entry.ticket}
          event={entry.event}
          section={entry.section}
          orientation="horizontal"
        />
      </div>
    </div>
  );
}

/* ── vertical cell ── */

function VerticalTicketCell({ entry }: EntryProps) {
  return (
    <div className="flex flex-col gap-2">
      <div className="flex items-start justify-between px-1">
        <EventMeta entry={entry} compact />
        <TicketActions entry={entry} compact />
      </div>
      <div id={`ticket-print-${entry.ticket.ticketId}`}>
        <TicketCard
          ticket={entry.ticket}
          event={entry.event}
          section={entry.section}
          orientation="vertical"
        />
      </div>
    </div>
  );
}

/* ── shared sub-components ── */

function EventMeta({ entry, compact }: EntryProps & { compact?: boolean }) {
  const status = entry.ticket.status;
  return (
    <div className="flex items-center gap-2 min-w-0">
      {entry.event.image && (
        <img
          src={entry.event.image}
          alt=""
          className={cn(
            'rounded-lg object-cover shrink-0',
            compact ? 'h-8 w-8' : 'h-10 w-10',
          )}
          aria-hidden="true"
        />
      )}
      <div className="min-w-0">
        <p className={cn('font-semibold text-text-primary truncate', compact ? 'text-xs' : 'text-sm')}>
          {entry.event.title}
        </p>
        <span
          className={cn(
            'inline-flex text-[10px] font-bold px-1.5 py-0.5 rounded-full border',
            STATUS_COLORS[status] ?? STATUS_COLORS['VALID'],
          )}
        >
          {STATUS_LABELS[status] ?? status}
        </span>
      </div>
    </div>
  );
}

function TicketActions({ entry, compact }: EntryProps & { compact?: boolean }) {
  const canPrint = entry.ticket.status === 'VALID';
  const shareUrl = `/shared-ticket/${entry.ticket.ticketId}`;
  return (
    <div className={cn('flex items-center shrink-0', compact ? 'gap-1' : 'gap-1.5')}>
      {canPrint && (
        <button
          className={cn(
            'flex items-center gap-1 rounded-lg border border-border bg-surface-raised text-text-secondary',
            'hover:bg-surface-overlay hover:text-text-primary transition-colors',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
            compact ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1.5 text-xs font-medium',
          )}
          title="Bileti yazdır"
          onClick={() => printTicketById(entry.ticket.ticketId)}
        >
          <FontAwesomeIcon icon={faPrint} className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} aria-hidden="true" />
          {!compact && 'Yazdır'}
        </button>
      )}
      <a
        href={shareUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={cn(
          'flex items-center gap-1 rounded-lg border border-border bg-surface-raised text-text-secondary',
          'hover:bg-surface-overlay hover:text-text-primary transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          compact ? 'px-2 py-1 text-[10px]' : 'px-2.5 py-1.5 text-xs font-medium',
        )}
        title="Bileti paylaş"
      >
        <FontAwesomeIcon icon={faShareNodes} className={compact ? 'w-3 h-3' : 'w-3.5 h-3.5'} aria-hidden="true" />
        {!compact && 'Paylaş'}
      </a>
    </div>
  );
}

