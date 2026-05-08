import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { ProductCard } from '@/modules/domains/commerce/product/ProductCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faArrowRight,
  faBoxOpen,
  faTags,
  faUsers,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { PRODUCTS, CATEGORIES } from './commerce.data';

const STATS = [
  { label: 'Products',         value: '2,400+', icon: faBoxOpen },
  { label: 'Categories',       value: '50+',    icon: faTags    },
  { label: 'Happy Customers',  value: '18,000+',icon: faUsers   },
];

export default function CommerceHomePage() {
  const featuredProducts = PRODUCTS.slice(0, 4);

  return (
    <div className="bg-surface-base text-text-primary">
      <style>{`
        @keyframes commerce-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes commerce-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-12px); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_70%_-5%,_var(--primary-subtle),_transparent_70%)]" />
          <div className="absolute -top-20 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl motion-safe:animate-[commerce-float_18s_ease-in-out_infinite]" />
          <div className="absolute top-40 -left-20 h-80 w-80 rounded-full bg-secondary/10 blur-3xl motion-safe:animate-[commerce-float_24s_ease-in-out_infinite]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20">
          <div className="max-w-2xl space-y-6 motion-safe:animate-[commerce-fade_0.8s_ease-out]">
            <Badge variant="primary" size="sm">
              <FontAwesomeIcon icon={faStar} className="w-3 h-3 mr-1" aria-hidden="true" />
              New arrivals this week
            </Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
              Discover Products<br />
              <span className="text-primary">You Will Love</span>
            </h1>
            <p className="text-lg text-text-secondary leading-relaxed max-w-xl">
              From cutting-edge electronics to everyday essentials — shop thousands of curated products with fast shipping and easy returns.
            </p>

            <div className="flex flex-wrap gap-3 pt-2">
              <Button
                as="a"
                href="/theme/commerce/products"
                variant="primary"
                size="lg"
                iconRight={<FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" />}
              >
                Shop Now
              </Button>
              <Button
                as="a"
                href="/theme/commerce/orders"
                variant="outline"
                size="lg"
              >
                Track Orders
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid grid-cols-3 divide-x divide-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 text-center">
                <FontAwesomeIcon icon={stat.icon} className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                <span className="text-xs text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Category filter ── */}
      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Browse Categories</h2>
        </div>
        <div className="flex flex-wrap gap-2">
          <a
            href="/theme/commerce/products"
            className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-primary bg-primary-subtle text-primary hover:bg-primary hover:text-primary-fg transition-colors"
          >
            All
          </a>
          {CATEGORIES.map((cat) => (
            <a
              key={cat.categoryId}
              href={`/theme/commerce/products?category=${cat.slug}`}
              className="inline-flex items-center px-4 py-2 rounded-full text-sm font-medium border border-border bg-surface-raised text-text-secondary hover:border-border-focus hover:text-text-primary transition-colors"
            >
              {cat.title}
            </a>
          ))}
        </div>
      </section>

      {/* ── Featured products ── */}
      <section className="mx-auto max-w-7xl px-6 pb-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Featured Products</h2>
          <a href="/theme/commerce/products" className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline">
            View all <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProducts.map((product) => (
            <ProductCard
              key={product.productId}
              product={product}
              href={`/theme/commerce/products/${product.slug}`}
            />
          ))}
        </div>
      </section>

      {/* ── CTA banner ── */}
      <section className="mx-auto max-w-7xl px-6 pb-16">
        <div className="rounded-2xl bg-primary px-8 py-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary-fg">Ready to start shopping?</h2>
          <p className="text-primary-fg/80 max-w-md mx-auto text-sm leading-relaxed">
            Join 18,000+ happy customers. Free shipping on orders over $100. Easy 30-day returns.
          </p>
          <Button
            as="a"
            href="/theme/commerce/products"
            variant="secondary"
            size="lg"
          >
            Explore All Products
          </Button>
        </div>
      </section>
    </div>
  );
}
