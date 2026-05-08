import { notFound } from 'next/navigation';
import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { ProductCard } from '@/modules/domains/commerce/product/ProductCard';
import { ProductStatusBadge } from '@/modules/domains/commerce/product/ProductStatusBadge';
import { ProductTypeBadge } from '@/modules/domains/commerce/product/ProductTypeBadge';
import { StockStatusBadge } from '@/modules/domains/commerce/product/StockStatusBadge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faShoppingCart, faArrowLeft, faStar } from '@fortawesome/free-solid-svg-icons';
import { PRODUCTS } from '../../commerce.data';

type PageProps = {
  params: Promise<{ slug: string }>;
};

export async function generateStaticParams() {
  return PRODUCTS.map((p) => ({ slug: p.slug }));
}

function formatPrice(amount: number, currency: string): string {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount);
}

export default async function ProductDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const product = PRODUCTS.find((p) => p.slug === slug);

  if (!product) notFound();

  const related = PRODUCTS.filter(
    (p) => p.productId !== product.productId && p.categoryId === product.categoryId
  ).slice(0, 3);

  const fallbackRelated = PRODUCTS.filter((p) => p.productId !== product.productId).slice(0, 3);
  const relatedProducts = related.length > 0 ? related : fallbackRelated;

  return (
    <div className="bg-surface-base text-text-primary">
      <div className="mx-auto max-w-7xl px-6 py-10">
        {/* Back link */}
        <a
          href="/theme/commerce/products"
          className="inline-flex items-center gap-1.5 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors"
        >
          <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" aria-hidden="true" />
          Back to Products
        </a>

        {/* Product layout */}
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Image */}
          <div className="rounded-2xl overflow-hidden bg-surface-sunken aspect-square flex items-center justify-center">
            {product.image ? (
              <img
                src={product.image}
                alt={product.title}
                className="w-full h-full object-cover"
              />
            ) : (
              <div className="flex items-center justify-center text-text-disabled w-full h-full">
                <svg className="w-24 h-24" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
            )}
          </div>

          {/* Details */}
          <div className="space-y-6">
            {/* Badges */}
            <div className="flex flex-wrap gap-2">
              <ProductTypeBadge type={product.type} />
              <ProductStatusBadge status={product.status} />
              <StockStatusBadge status={product.stockStatus} />
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-text-primary leading-tight">{product.title}</h1>

            {/* Rating placeholder */}
            <div className="flex items-center gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <FontAwesomeIcon
                  key={i}
                  icon={faStar}
                  className={i <= 4 ? 'w-4 h-4 text-warning' : 'w-4 h-4 text-surface-sunken'}
                  aria-hidden="true"
                />
              ))}
              <span className="text-xs text-text-secondary ml-1">(128 reviews)</span>
            </div>

            {/* Price */}
            <div className="flex items-baseline gap-3">
              {product.salePrice != null ? (
                <>
                  <span className="text-3xl font-bold text-primary">
                    {formatPrice(product.salePrice, product.currency)}
                  </span>
                  <span className="text-lg text-text-disabled line-through">
                    {formatPrice(product.basePrice, product.currency)}
                  </span>
                  <Badge variant="error" size="sm">
                    Sale
                  </Badge>
                </>
              ) : (
                <span className="text-3xl font-bold text-text-primary">
                  {formatPrice(product.basePrice, product.currency)}
                </span>
              )}
            </div>

            {/* Short description */}
            <p className="text-text-secondary text-sm leading-relaxed">{product.shortDescription}</p>

            {/* Description */}
            <p className="text-text-primary text-sm leading-relaxed">{product.description}</p>

            {/* Tags */}
            {product.tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5">
                {product.tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-block rounded-full bg-surface-sunken px-3 py-0.5 text-xs text-text-secondary"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}

            {/* Add to cart */}
            <div className="flex flex-col sm:flex-row gap-3 pt-2 border-t border-border">
              <Button
                variant="primary"
                size="lg"
                fullWidth
                iconLeft={<FontAwesomeIcon icon={faShoppingCart} className="w-4 h-4" />}
                disabled={product.stockStatus === 'OUT_OF_STOCK'}
              >
                {product.stockStatus === 'OUT_OF_STOCK' ? 'Out of Stock' : 'Add to Cart'}
              </Button>
              <Button variant="outline" size="lg" className="sm:w-auto shrink-0">
                Save
              </Button>
            </div>
          </div>
        </div>

        {/* Related products */}
        {relatedProducts.length > 0 && (
          <section className="mt-16">
            <h2 className="text-xl font-semibold text-text-primary mb-6">You May Also Like</h2>
            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {relatedProducts.map((p) => (
                <ProductCard
                  key={p.productId}
                  product={p}
                  href={`/theme/commerce/products/${p.slug}`}
                />
              ))}
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
