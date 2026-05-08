'use client';
import { cn } from '@/libs/utils/cn';
import { OrderStatusBadge } from './OrderStatusBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBox, faCalendar } from '@fortawesome/free-solid-svg-icons';
import type { Order } from '@/modules/domains/commerce/types';

type OrderCardProps = {
  order: Order;
  itemCount?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function OrderCard({ order, itemCount, href, onClick, className }: OrderCardProps) {
  const isInteractive = !!(href || onClick);

  const createdAt = order.createdAt ? new Date(order.createdAt) : null;
  const dateLabel = createdAt
    ? createdAt.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
    : null;

  const body = (
    <div className="p-5 flex flex-col gap-4">
      {/* Header row */}
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs text-text-secondary">Order</p>
          <h3 className="text-base font-semibold text-text-primary font-mono mt-0.5">
            {order.orderNumber}
          </h3>
        </div>
        <OrderStatusBadge status={order.status} size="sm" />
      </div>

      {/* Meta row */}
      <div className="flex flex-wrap gap-4 text-sm text-text-secondary">
        {dateLabel && (
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faCalendar} className="w-3.5 h-3.5" aria-hidden="true" />
            {dateLabel}
          </span>
        )}
        {itemCount != null && (
          <span className="flex items-center gap-1.5">
            <FontAwesomeIcon icon={faBox} className="w-3.5 h-3.5" aria-hidden="true" />
            {itemCount} {itemCount === 1 ? 'item' : 'items'}
          </span>
        )}
      </div>

      {/* Total */}
      <div className="border-t border-border pt-3 flex items-center justify-between">
        <span className="text-sm text-text-secondary">Total</span>
        <span className="text-base font-bold text-text-primary">
          {order.currency} {order.total.toFixed(2)}
        </span>
      </div>
    </div>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200',
    className
  );

  if (href) {
    return (
      <a href={href} className={baseClass}>
        {body}
      </a>
    );
  }
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(
          baseClass,
          'text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus'
        )}
      >
        {body}
      </button>
    );
  }
  return <div className={baseClass}>{body}</div>;
}
