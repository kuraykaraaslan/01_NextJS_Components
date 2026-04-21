'use client';
import { useState } from 'react';
import Link from 'next/link';
import { ProductCard } from '@/modules/domain/ecommerce/ProductCard';
import { AddToCartPanel } from '@/modules/domain/ecommerce/AddToCartPanel';
import { ProductVariantPicker, type VariantConfig, type VariantValues } from '@/modules/domain/ecommerce/ProductVariantPicker';
import { Badge } from '@/modules/ui/Badge';
import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { Card } from '@/modules/ui/Card';
import { TabGroup } from '@/modules/ui/TabGroup';
import { type Product, SPEC_FILTER_KEYS } from '../../shop.data';

function StarRating({ rating, count }: { rating: number; count: number }) {
  const full = Math.round(rating);
  return (
    <div className="flex items-center gap-2">
      <span className="text-warning text-sm">
        {'★'.repeat(full)}{'☆'.repeat(5 - full)}
      </span>
      <span className="text-sm text-text-secondary">{rating.toFixed(1)}</span>
      <span className="text-sm text-text-disabled">({count.toLocaleString()} reviews)</span>
    </div>
  );
}

function ProductImagePlaceholder({ name }: { name: string }) {
  return (
    <div className="w-full aspect-square rounded-2xl bg-surface-sunken flex flex-col items-center justify-center gap-3 border border-border">
      <div className="text-6xl select-none">🛍️</div>
      <p className="text-xs text-text-disabled text-center px-4 line-clamp-2">{name}</p>
    </div>
  );
}

export function ProductDetailView({
  product,
  relatedProducts,
}: {
  product: Product;
  relatedProducts: Product[];
}) {
  const [variantValues, setVariantValues] = useState<VariantValues>({});

  const variantConfigs: VariantConfig[] = [
    ...(product.variants.colors?.length
      ? [{ type: 'buttons' as const, id: 'color', label: 'Color',
           options: product.variants.colors.map((c) => ({ value: c, label: c })) }]
      : []),
    ...(product.variants.sizes?.length
      ? [{ type: 'buttons' as const, id: 'size', label: 'Size',
           options: product.variants.sizes.map((s) => ({ value: s, label: s })) }]
      : []),
  ];

  const discount = product.originalPrice
    ? Math.round((1 - product.price / product.originalPrice) * 100)
    : null;

  const specEntries = product.specs
    ? SPEC_FILTER_KEYS
        .map((k) => ({ label: k.label, value: (product.specs as Record<string, string | undefined>)[k.key] }))
        .filter((e) => !!e.value)
    : [];

  return (
    <div className="max-w-7xl mx-auto px-4 py-6 space-y-10">
      <Breadcrumb
        items={[
          { label: 'Home', href: '/theme/shop' },
          { label: 'Products', href: '/theme/shop/products' },
          { label: product.name },
        ]}
      />

      {/* Main section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
        {/* Images */}
        <div className="space-y-3">
          <ProductImagePlaceholder name={product.name} />
          <div className="grid grid-cols-4 gap-2">
            {[1, 2, 3, 4].map((i) => (
              <div
                key={i}
                className="aspect-square rounded-lg bg-surface-sunken border border-border flex items-center justify-center text-2xl text-text-disabled cursor-pointer hover:border-primary transition-colors"
              >
                🛍️
              </div>
            ))}
          </div>
        </div>

        {/* Info */}
        <div className="space-y-5">
          <div className="flex items-center gap-2 flex-wrap">
            {product.brand && (
              <span className="text-sm font-semibold text-primary">{product.brand}</span>
            )}
            {product.badge && (
              <Badge variant={product.badgeVariant ?? 'primary'} size="sm">{product.badge}</Badge>
            )}
            {discount && (
              <Badge variant="error" size="sm">-{discount}%</Badge>
            )}
            {product.inStock === false && (
              <Badge variant="neutral" size="sm">Out of stock</Badge>
            )}
          </div>

          <h1 className="text-2xl md:text-3xl font-black text-text-primary leading-tight">
            {product.name}
          </h1>

          {product.rating != null && (
            <StarRating rating={product.rating} count={product.reviewCount ?? 0} />
          )}

          <div className="flex items-baseline gap-3">
            <span className="text-3xl font-black text-text-primary">${product.price.toFixed(2)}</span>
            {product.originalPrice && (
              <span className="text-lg text-text-disabled line-through">${product.originalPrice.toFixed(2)}</span>
            )}
          </div>

          <p className="text-sm text-text-secondary leading-relaxed">{product.description}</p>

          {/* Quick spec summary for tech products */}
          {specEntries.length > 0 && (
            <div className="grid grid-cols-2 gap-2">
              {specEntries.slice(0, 4).map((e) => (
                <div key={e.label} className="bg-surface-raised rounded-lg px-3 py-2">
                  <p className="text-xs text-text-secondary">{e.label}</p>
                  <p className="text-xs font-semibold text-text-primary truncate">{e.value}</p>
                </div>
              ))}
            </div>
          )}

          {variantConfigs.length > 0 && (
            <ProductVariantPicker
              variants={variantConfigs}
              values={variantValues}
              onChange={(id, value) => setVariantValues((v) => ({ ...v, [id]: value }))}
            />
          )}

          <AddToCartPanel
            productName={product.name}
            price={product.price}
            maxQuantity={product.inStock === false ? 0 : 20}
          />

          <div className="pt-3 border-t border-border space-y-2">
            <p className="text-xs text-text-disabled">
              SKU: <span className="text-text-secondary">{product.sku}</span>
            </p>
            <div className="flex flex-wrap gap-1">
              {product.tags.map((tag) => (
                <Badge key={tag} variant="neutral" size="sm">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <Card className="p-4">
        <TabGroup
          label="Product details"
          tabs={[
            {
              id: 'description',
              label: 'Description',
              content: (
                <p className="text-sm text-text-secondary leading-relaxed">{product.description}</p>
              ),
            },
            {
              id: 'features',
              label: 'Features',
              content: (
                <ul className="space-y-2">
                  {product.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-text-primary">
                      <span className="text-success mt-0.5">✓</span>
                      {f}
                    </li>
                  ))}
                </ul>
              ),
            },
            {
              id: 'specs',
              label: 'Specifications',
              content: specEntries.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8">
                  {SPEC_FILTER_KEYS.map((k) => {
                    const val = (product.specs as Record<string, string | undefined>)[k.key];
                    if (!val) return null;
                    return (
                      <div key={k.key} className="flex justify-between items-start py-2 border-b border-border gap-4">
                        <span className="text-sm text-text-secondary whitespace-nowrap">{k.label}</span>
                        <span className="text-sm font-medium text-text-primary text-right">{val}</span>
                      </div>
                    );
                  })}
                  {(['battery', 'weight', 'switchType', 'driverSize', 'outputPower', 'refreshRate', 'resolution'] as const)
                    .filter((k) => product.specs?.[k])
                    .map((k) => {
                      const labels: Record<string, string> = {
                        battery: 'Battery Life', weight: 'Weight', switchType: 'Switch Type',
                        driverSize: 'Driver Size', outputPower: 'Output Power',
                        refreshRate: 'Refresh Rate', resolution: 'Resolution',
                      };
                      return (
                        <div key={k} className="flex justify-between items-start py-2 border-b border-border gap-4">
                          <span className="text-sm text-text-secondary whitespace-nowrap">{labels[k]}</span>
                          <span className="text-sm font-medium text-text-primary text-right">{product.specs![k]}</span>
                        </div>
                      );
                    })}
                </div>
              ) : (
                <p className="text-sm text-text-secondary">No detailed specifications available for this product.</p>
              ),
            },
            {
              id: 'shipping',
              label: 'Shipping & Returns',
              content: (
                <div className="space-y-4 text-sm text-text-secondary">
                  {[
                    { icon: '🚚', title: 'Free standard shipping', body: 'On all orders over $50. Delivered in 3–5 business days.' },
                    { icon: '⚡', title: 'Express delivery — $9.99', body: 'Next business day when ordered before 2 pm.' },
                    { icon: '↩️', title: 'Free 30-day returns', body: 'Changed your mind? Return any unused item within 30 days for a full refund.' },
                  ].map((item) => (
                    <div key={item.title} className="flex items-start gap-3">
                      <span className="text-lg">{item.icon}</span>
                      <div>
                        <p className="font-semibold text-text-primary">{item.title}</p>
                        <p>{item.body}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ),
            },
          ]}
        />
      </Card>

      {/* Related products */}
      {relatedProducts.length > 0 && (
        <section aria-labelledby="related-heading">
          <div className="flex items-center justify-between mb-4">
            <h2 id="related-heading" className="text-xl font-bold text-text-primary">You May Also Like</h2>
            <Link href="/theme/shop/products" className="text-sm text-primary hover:text-primary-hover transition-colors">
              View all →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {relatedProducts.map((p) => (
              <Link
                key={p.id}
                href={`/theme/shop/products/${p.slug}`}
                className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded-xl"
              >
                <ProductCard product={p} />
              </Link>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
