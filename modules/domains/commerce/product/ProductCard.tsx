'use client';
import { cn } from '@/libs/utils/cn';
import { ProductTypeBadge } from './ProductTypeBadge';
import { StockStatusBadge } from './StockStatusBadge';
import type { ProductType, StockStatus, ProductStatus } from '../types';

type ProductCardProduct = {
  productId: string;
  title: string;
  slug: string;
  basePrice: number;
  salePrice?: number | null;
  currency: string;
  image?: string | null;
  type: ProductType;
  stockStatus: StockStatus;
  status: ProductStatus;
  tags: string[];
};

type ProductCardProps = {
  product: ProductCardProduct;
  href?: string;
  className?: string;
};

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
}

export function ProductCard({ product, href, className }: ProductCardProps) {
  const isInteractive = !!href;

  const body = (
    <>
      {/* Image */}
      <div className="relative h-48 w-full overflow-hidden bg-surface-sunken">
        {product.image ? (
          <img
            src={product.image}
            alt={product.title}
            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-text-disabled">
            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 p-4">
        {/* Badges */}
        <div className="flex flex-wrap gap-1.5">
          <ProductTypeBadge type={product.type} size="sm" />
          <StockStatusBadge status={product.stockStatus} size="sm" />
        </div>

        {/* Title */}
        <h3 className="text-sm font-semibold text-text-primary line-clamp-2 leading-snug">
          {product.title}
        </h3>

        {/* Price */}
        <div className="flex items-baseline gap-2">
          {product.salePrice != null ? (
            <>
              <span className="text-base font-bold text-primary">
                {formatPrice(product.salePrice, product.currency)}
              </span>
              <span className="text-xs text-text-disabled line-through">
                {formatPrice(product.basePrice, product.currency)}
              </span>
            </>
          ) : (
            <span className="text-base font-bold text-text-primary">
              {formatPrice(product.basePrice, product.currency)}
            </span>
          )}
        </div>

        {/* Tags */}
        {product.tags.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-1">
            {product.tags.slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="inline-block rounded-full bg-surface-sunken px-2 py-0.5 text-[10px] text-text-secondary"
              >
                {tag}
              </span>
            ))}
            {product.tags.length > 3 && (
              <span className="inline-block rounded-full bg-surface-sunken px-2 py-0.5 text-[10px] text-text-secondary">
                +{product.tags.length - 3}
              </span>
            )}
          </div>
        )}
      </div>
    </>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200',
    className
  );

  if (href) {
    return (
      <a
        href={href}
        className={cn(baseClass, 'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </a>
    );
  }

  return <div className={baseClass}>{body}</div>;
}
