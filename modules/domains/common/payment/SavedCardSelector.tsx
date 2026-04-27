'use client';
import { useState } from 'react';
import { Button } from '@/modules/ui/Button';
import { cn } from '@/libs/utils/cn';
import type { SavedCard, CardBrand } from '../PaymentTypes';

const BRAND_COLOR: Record<CardBrand, string> = {
  VISA:       'bg-blue-600',
  MASTERCARD: 'bg-orange-500',
  AMEX:       'bg-teal-600',
  DISCOVER:   'bg-orange-400',
  UNKNOWN:    'bg-gray-500',
};

function CardBrandBadge({ brand }: { brand: CardBrand }) {
  const labels: Record<CardBrand, string> = {
    VISA: 'VISA', MASTERCARD: 'MC', AMEX: 'AMEX', DISCOVER: 'DISC', UNKNOWN: '••',
  };
  return (
    <span className={cn('inline-flex items-center justify-center rounded px-1.5 py-0.5 text-[10px] font-bold text-white tracking-wide shrink-0', BRAND_COLOR[brand])}>
      {labels[brand]}
    </span>
  );
}

type SavedCardSelectorProps = {
  cards: SavedCard[];
  selectedCardId?: string;
  onSelect: (cardId: string, card: SavedCard) => void;
  onRemove?: (cardId: string) => void;
  onAddNew?: () => void;
  className?: string;
};

export function SavedCardSelector({
  cards,
  selectedCardId,
  onSelect,
  onRemove,
  onAddNew,
  className,
}: SavedCardSelectorProps) {
  const [active, setActive] = useState<string | undefined>(selectedCardId);

  function handleSelect(card: SavedCard) {
    setActive(card.cardId);
    onSelect(card.cardId, card);
  }

  return (
    <fieldset className={cn('space-y-3', className)}>
      <legend className="sr-only">Select payment card</legend>

      {cards.length === 0 ? (
        <p className="text-sm text-text-secondary py-4 text-center">No saved cards.</p>
      ) : (
        <div className="space-y-2">
          {cards.map((card) => {
            const isSelected = active === card.cardId;
            return (
              <label
                key={card.cardId}
                className={cn(
                  'flex items-center gap-3 rounded-lg border bg-surface-raised p-3 cursor-pointer transition-colors',
                  'focus-within:ring-2 focus-within:ring-border-focus',
                  isSelected ? 'border-primary ring-2 ring-primary ring-offset-1' : 'border-border hover:border-border-strong',
                )}
              >
                <input
                  type="radio"
                  name="saved-card"
                  value={card.cardId}
                  checked={isSelected}
                  onChange={() => handleSelect(card)}
                  className="sr-only"
                />

                {/* Radio dot */}
                <span
                  aria-hidden="true"
                  className={cn(
                    'flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 transition-colors',
                    isSelected ? 'border-primary bg-primary' : 'border-border bg-surface-base',
                  )}
                >
                  {isSelected && <span className="h-1.5 w-1.5 rounded-full bg-white" />}
                </span>

                <CardBrandBadge brand={card.brand} />

                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-text-primary font-mono">
                    •••• •••• •••• {card.last4}
                  </p>
                  <p className="text-xs text-text-secondary">
                    {card.cardholderName} &middot; {card.expiryMonth}/{card.expiryYear}
                    {card.isDefault && (
                      <span className="ml-2 text-[10px] font-semibold text-primary uppercase">Default</span>
                    )}
                  </p>
                </div>

                {onRemove && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="xs"
                    onClick={(e) => { e.preventDefault(); onRemove(card.cardId); }}
                    className="text-error shrink-0"
                  >
                    Remove
                  </Button>
                )}
              </label>
            );
          })}
        </div>
      )}

      {onAddNew && (
        <Button variant="outline" size="sm" onClick={onAddNew} className="w-full">
          + Add new card
        </Button>
      )}
    </fieldset>
  );
}
