'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCalendar, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { OrderStatusBadge } from './OrderStatusBadge';
import type { OrderStatus } from '../types';

type OrderCardOrder = {
  orderId: string;
  orderNumber: string;
  status: OrderStatus;
  total: number;
  currency: string;
  itemCount: number;
  createdAt?: Date;
};

type OrderCardProps = {
  order: OrderCardOrder;
  href?: string;
  className?: string;
};

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
}

function formatDate(date?: Date): string {
  if (!date) return '—';
  return new Intl.DateTimeFormat('en-US', { month: 'short', day: 'numeric', year: 'numeric' }).format(date);
}

export function OrderCard({ order, href, className }: OrderCardProps) {
  const isInteractive = !!href;

  const body = (
    <div className="flex items-center gap-4 p-4">
      {/* Icon */}
      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary-subtle text-primary">
        <FontAwesomeIcon icon={faBox} className="w-5 h-5" aria-hidden="true" />
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm font-semibold text-text-primary">#{order.orderNumber}</span>
          <OrderStatusBadge status={order.status} size="sm" />
        </div>
        <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-0.5 text-xs text-text-secondary">
          <span className="flex items-center gap-1">
            <FontAwesomeIcon icon={faBox} className="w-3 h-3" aria-hidden="true" />
            {order.itemCount} {order.itemCount === 1 ? 'item' : 'items'}
          </span>
          {order.createdAt && (
            <span className="flex items-center gap-1">
              <FontAwesomeIcon icon={faCalendar} className="w-3 h-3" aria-hidden="true" />
              {formatDate(order.createdAt)}
            </span>
          )}
        </div>
      </div>

      {/* Total + arrow */}
      <div className="flex shrink-0 items-center gap-2">
        <span className="text-sm font-bold text-text-primary">
          {formatPrice(order.total, order.currency)}
        </span>
        {isInteractive && (
          <FontAwesomeIcon icon={faChevronRight} className="w-3.5 h-3.5 text-text-secondary" aria-hidden="true" />
        )}
      </div>
    </div>
  );

  const baseClass = cn(
    'rounded-xl border border-border bg-surface-raised overflow-hidden',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClass, 'block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </a>
    );
  }

  return <div className={baseClass}>{body}</div>;
}
