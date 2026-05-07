'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPrint, faShareNodes } from '@fortawesome/free-solid-svg-icons';
import { printTicketById } from './printTicket';

const STATUS_LABELS: Record<string, string> = {
  VALID:       'Geçerli',
  USED:        'Kullanıldı',
  CANCELLED:   'İptal',
  REFUNDED:    'İade',
  TRANSFERRED: 'Transfer',
};

const STATUS_COLORS: Record<string, string> = {
  VALID:       'bg-success-subtle text-success border-success/30',
  USED:        'bg-surface-overlay text-text-secondary border-border',
  CANCELLED:   'bg-error-subtle text-error border-error/30',
  REFUNDED:    'bg-warning-subtle text-warning border-warning/30',
  TRANSFERRED: 'bg-info-subtle text-info border-info/30',
};

type TicketRowEntry = {
  event: { image?: string | null; title: string };
  ticket: { ticketId: string; status: string };
};

type MetaProps = { entry: TicketRowEntry; compact?: boolean };

export function TicketRowMeta({ entry, compact }: MetaProps) {
  const status = entry.ticket.status;
  return (
    <div className="flex items-center gap-2 min-w-0">
      {entry.event.image && (
        <img
          src={entry.event.image}
          alt=""
          className={cn('rounded-lg object-cover shrink-0', compact ? 'h-8 w-8' : 'h-10 w-10')}
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

export function TicketRowActions({ entry, compact }: MetaProps) {
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
