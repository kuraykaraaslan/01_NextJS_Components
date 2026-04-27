'use client';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot, faPhone, faUser } from '@fortawesome/free-solid-svg-icons';
import { Button } from '@/modules/ui/Button';
import { cn } from '@/libs/utils/cn';
import type { Address } from '../AddressTypes';

type AddressCardProps = {
  address: Address;
  onEdit?: () => void;
  onDelete?: () => void;
  selected?: boolean;
  className?: string;
};

export function AddressCard({ address, onEdit, onDelete, selected = false, className }: AddressCardProps) {
  const cityLine    = [address.city, address.state, address.postalCode].filter(Boolean).join(', ');
  const countryLine = [address.country, address.countryCode ? `(${address.countryCode})` : ''].filter(Boolean).join(' ');

  return (
    <div
      className={cn(
        'rounded-lg border bg-surface-raised p-4 space-y-2 transition-colors',
        selected ? 'border-primary ring-2 ring-primary ring-offset-1' : 'border-border',
        className
      )}
    >
      {address.fullName && (
        <div className="flex items-center gap-2 text-sm font-medium text-text-primary">
          <FontAwesomeIcon icon={faUser} className="w-3 h-3 text-text-disabled shrink-0" />
          {address.fullName}
        </div>
      )}

      <div className="flex items-start gap-2 text-sm text-text-secondary">
        <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3 text-text-disabled shrink-0 mt-0.5" />
        <div className="space-y-0.5">
          <p>{address.addressLine1}</p>
          {address.addressLine2 && <p>{address.addressLine2}</p>}
          {cityLine && <p>{cityLine}</p>}
          {countryLine && <p>{countryLine}</p>}
        </div>
      </div>

      {address.phone && (
        <div className="flex items-center gap-2 text-sm text-text-secondary">
          <FontAwesomeIcon icon={faPhone} className="w-3 h-3 text-text-disabled shrink-0" />
          {address.phone}
        </div>
      )}

      {(onEdit || onDelete) && (
        <div className="flex gap-2 pt-2 border-t border-border">
          {onEdit && (
            <Button variant="ghost" size="xs" onClick={onEdit} className="text-primary hover:text-primary-hover">
              Edit
            </Button>
          )}
          {onDelete && (
            <Button variant="ghost" size="xs" onClick={onDelete} className="text-error hover:opacity-80">
              Delete
            </Button>
          )}
        </div>
      )}
    </div>
  );
}
