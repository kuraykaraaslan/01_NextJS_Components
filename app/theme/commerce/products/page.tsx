import { ProductCard } from '@/modules/domains/commerce/product/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBoxOpen } from '@fortawesome/free-solid-svg-icons';
import { PRODUCTS, CATEGORIES } from '../commerce.data';

export default function ProductsPage() {
  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Page header */}
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-text-primary">All Products</h1>
        <p className="mt-1 text-sm text-text-secondary">
          {PRODUCTS.length} products across {CATEGORIES.length} categories
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Sidebar filters */}
        <aside className="w-full lg:w-56 shrink-0 space-y-6">
          {/* Category filter */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3">
              Category
            </h2>
            <ul className="space-y-1">
              <li>
                <a
                  href="/theme/commerce/products"
                  className="block px-3 py-1.5 rounded-lg text-sm font-medium bg-primary-subtle text-primary"
                >
                  All
                </a>
              </li>
              {CATEGORIES.map((cat) => (
                <li key={cat.categoryId}>
                  <a
                    href={`/theme/commerce/products?category=${cat.slug}`}
                    className="block px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:bg-surface-overlay hover:text-text-primary transition-colors"
                  >
                    {cat.title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Type filter */}
          <div>
            <h2 className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3">
              Type
            </h2>
            <ul className="space-y-1">
              {(['Physical', 'Digital', 'Service'] as const).map((type) => (
                <li key={type}>
                  <a
                    href={`/theme/commerce/products?type=${type.toUpperCase()}`}
                    className="block px-3 py-1.5 rounded-lg text-sm text-text-secondary hover:bg-surface-overlay hover:text-text-primary transition-colors"
                  >
                    {type}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Product grid */}
        <div className="flex-1">
          {PRODUCTS.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24 text-center">
              <FontAwesomeIcon icon={faBoxOpen} className="w-12 h-12 text-text-disabled mb-4" aria-hidden="true" />
              <p className="text-text-secondary text-sm">No products found.</p>
            </div>
          ) : (
            <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-3">
              {PRODUCTS.map((product) => (
                <ProductCard
                  key={product.productId}
                  product={product}
                  href={`/theme/commerce/products/${product.slug}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
