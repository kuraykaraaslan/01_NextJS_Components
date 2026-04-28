'use client';
import { cn } from '@/libs/utils/cn';
import type { IssuedTicket } from './types';

type EventInfo = {
  title: string;
  startAt: Date;
  venueName?: string;
  venueCity?: string;
};

type SectionInfo = {
  sectionName: string;
  seatLabel?: string;
};

type Props = {
  ticket: IssuedTicket;
  event: EventInfo;
  section?: SectionInfo;
  className?: string;
};

const FMT_DATE = new Intl.DateTimeFormat('tr-TR', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
const FMT_TIME = new Intl.DateTimeFormat('tr-TR', { hour: '2-digit', minute: '2-digit' });

function QRPattern({ value }: { value: string }) {
  const size = 21;
  const seed = value.split('').reduce((acc, c, i) => acc + c.charCodeAt(0) * (i + 7), 0);
  const cells = Array.from({ length: size * size }, (_, i) => {
    const row = Math.floor(i / size);
    const col = i % size;
    // Always fill corner markers (top-left, top-right, bottom-left)
    const inTL = row < 7 && col < 7;
    const inTR = row < 7 && col >= size - 7;
    const inBL = row >= size - 7 && col < 7;
    if (inTL || inTR || inBL) {
      const r = inTL ? row : (inTR ? row : row - (size - 7));
      const c = inTL || inBL ? col : col - (size - 7);
      return (r === 0 || r === 6 || c === 0 || c === 6) || (r >= 2 && r <= 4 && c >= 2 && c <= 4);
    }
    return ((seed * (i + 1) * 2654435761) >>> 0) % 3 !== 0;
  });

  return (
    <svg viewBox={`0 0 ${size} ${size}`} className="w-full h-full" aria-hidden="true">
      {cells.map((filled, i) => filled ? (
        <rect
          key={i}
          x={i % size}
          y={Math.floor(i / size)}
          width={1}
          height={1}
          fill="currentColor"
        />
      ) : null)}
    </svg>
  );
}

export function TicketCard({ ticket, event, section, className }: Props) {
  const statusColors: Record<string, string> = {
    VALID:       'text-success bg-success-subtle border-success/30',
    USED:        'text-text-secondary bg-surface-overlay border-border',
    CANCELLED:   'text-error bg-error-subtle border-error/30',
    REFUNDED:    'text-warning bg-warning-subtle border-warning/30',
    TRANSFERRED: 'text-info bg-info-subtle border-info/30',
  };
  const statusLabels: Record<string, string> = {
    VALID: 'Geçerli', USED: 'Kullanıldı', CANCELLED: 'İptal', REFUNDED: 'İade', TRANSFERRED: 'Transfer',
  };

  return (
    <div
      className={cn(
        'rounded-2xl border border-border bg-surface-raised overflow-hidden shadow-sm',
        'print:shadow-none print:border-2',
        className,
      )}
    >
      {/* top strip */}
      <div className="bg-primary px-5 py-3 flex items-center justify-between">
        <span className="text-primary-fg font-bold text-sm tracking-wider">BILET</span>
        <span
          className={cn(
            'text-xs font-semibold px-2 py-0.5 rounded-full border',
            statusColors[ticket.status] ?? statusColors['VALID'],
          )}
        >
          {statusLabels[ticket.status] ?? ticket.status}
        </span>
      </div>

      {/* body */}
      <div className="flex flex-col sm:flex-row">
        {/* info side */}
        <div className="flex-1 p-5 space-y-3">
          <div>
            <p className="text-xs text-text-secondary font-medium uppercase tracking-wide">Etkinlik</p>
            <h3 className="text-base font-bold text-text-primary mt-0.5">{event.title}</h3>
          </div>

          <div className="grid grid-cols-2 gap-3 text-sm">
            <div>
              <p className="text-xs text-text-secondary">Tarih</p>
              <p className="font-semibold text-text-primary">{FMT_DATE.format(event.startAt)}</p>
            </div>
            <div>
              <p className="text-xs text-text-secondary">Saat</p>
              <p className="font-semibold text-text-primary">{FMT_TIME.format(event.startAt)}</p>
            </div>
            {event.venueName && (
              <div>
                <p className="text-xs text-text-secondary">Mekan</p>
                <p className="font-semibold text-text-primary">{event.venueName}</p>
              </div>
            )}
            {event.venueCity && (
              <div>
                <p className="text-xs text-text-secondary">Şehir</p>
                <p className="font-semibold text-text-primary">{event.venueCity}</p>
              </div>
            )}
            {section && (
              <>
                <div>
                  <p className="text-xs text-text-secondary">Kategori</p>
                  <p className="font-semibold text-text-primary">{section.sectionName}</p>
                </div>
                {section.seatLabel && (
                  <div>
                    <p className="text-xs text-text-secondary">Koltuk</p>
                    <p className="font-semibold text-text-primary">{section.seatLabel}</p>
                  </div>
                )}
              </>
            )}
            {ticket.attendeeName && (
              <div className="col-span-2">
                <p className="text-xs text-text-secondary">Katılımcı</p>
                <p className="font-semibold text-text-primary">{ticket.attendeeName}</p>
              </div>
            )}
          </div>

          <div className="pt-2 border-t border-border">
            <p className="text-xs text-text-disabled font-mono"># {ticket.ticketId}</p>
          </div>
        </div>

        {/* dashed divider */}
        <div className="relative sm:w-px sm:my-5 h-px sm:h-auto mx-5 sm:mx-0 my-0 bg-transparent">
          <div className="absolute inset-0 border-dashed border-border sm:border-l sm:border-t-0 border-t" />
          <div className="absolute -left-3 sm:left-auto sm:-top-3 top-1/2 sm:top-auto -translate-y-1/2 sm:translate-y-0 sm:-translate-x-1/2 h-6 w-6 rounded-full bg-surface-base border border-border" />
          <div className="absolute -right-3 sm:right-auto sm:-bottom-3 bottom-1/2 sm:bottom-auto -translate-y-1/2 sm:translate-y-0 sm:translate-x-1/2 h-6 w-6 rounded-full bg-surface-base border border-border" />
        </div>

        {/* QR side */}
        <div className="flex flex-col items-center justify-center p-5 gap-2 sm:w-36">
          <div className="h-28 w-28 text-text-primary">
            <QRPattern value={ticket.qrCode} />
          </div>
          <p className="text-[10px] text-text-disabled font-mono text-center break-all">
            {ticket.qrCode.slice(0, 12)}...
          </p>
        </div>
      </div>
    </div>
  );
}
