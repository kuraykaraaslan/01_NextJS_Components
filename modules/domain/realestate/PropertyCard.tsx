'use client';
import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { Badge } from '@/modules/ui/Badge';
import { TabGroup } from '@/modules/ui/TabGroup';
import { Button } from '@/modules/ui/Button';
import { useState } from 'react';

export type PropertyCardProps = {
  id: string;
  title: string;
  address: string;
  price: number;
  currency?: string;
  type: 'sale' | 'rent';
  status?: 'active' | 'sold' | 'pending' | 'rented';
  bedrooms?: number;
  bathrooms?: number;
  sqm?: number;
  images?: string[];
  badge?: string;
  onContact?: () => void;
  onSave?: () => void;
  className?: string;
};

const statusConfig: Record<string, { variant: 'success' | 'error' | 'warning' | 'neutral'; label: string }> = {
  active:  { variant: 'success', label: 'Active' },
  sold:    { variant: 'error',   label: 'Sold'   },
  pending: { variant: 'warning', label: 'Pending' },
  rented:  { variant: 'neutral', label: 'Rented' },
};

export function PropertyCard({
  title, address, price, currency = 'USD', type, status = 'active',
  bedrooms, bathrooms, sqm, images = [], badge, onContact, onSave, className,
}: PropertyCardProps) {
  const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format;
  const cfg = statusConfig[status];

  const tabs = images.map((src, i) => ({
    id: `img-${i}`,
    label: `${i + 1}`,
    content: <img src={src} alt={`${title} – photo ${i + 1}`} className="w-full h-48 object-cover" />,
  }));

  return (
    <Card className={className} hoverable>
      {images.length > 1 ? (
        <TabGroup tabs={tabs} />
      ) : images.length === 1 ? (
        <img src={images[0]} alt={title} className="w-full h-48 object-cover" />
      ) : (
        <div className="w-full h-48 bg-surface-sunken flex items-center justify-center text-5xl text-text-disabled">🏠</div>
      )}

      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <h3 className="text-sm font-semibold text-text-primary leading-snug line-clamp-1">{title}</h3>
            <p className="text-xs text-text-secondary mt-0.5 line-clamp-1">{address}</p>
          </div>
          <div className="flex flex-col gap-1 shrink-0 items-end">
            <Badge variant={cfg.variant} size="sm">{cfg.label}</Badge>
            {badge && <Badge variant="info" size="sm">{badge}</Badge>}
          </div>
        </div>

        <p className="text-xl font-bold text-text-primary tabular-nums">
          {fmt(price)}
          {type === 'rent' && <span className="text-sm font-normal text-text-disabled"> /mo</span>}
        </p>

        <div className="flex items-center gap-3 text-xs text-text-secondary">
          {bedrooms  != null && <span>🛏 {bedrooms} bed</span>}
          {bathrooms != null && <span>🚿 {bathrooms} bath</span>}
          {sqm       != null && <span>📐 {sqm} m²</span>}
        </div>

        <div className="flex gap-2">
          {onContact && (
            <Button variant="primary"  size="sm" fullWidth onClick={onContact}>Contact</Button>
          )}
          {onSave && (
            <Button variant="outline" size="sm" onClick={onSave} iconLeft="♡" aria-label="Save property" />
          )}
        </div>
      </div>
    </Card>
  );
}
