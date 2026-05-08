import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faArrowRight,
  faStore,
  faBoltLightning,
  faShieldHalved,
  faStar,
} from '@fortawesome/free-solid-svg-icons';
import { RestaurantCard } from '@/modules/domains/food/restaurant/RestaurantCard';
import { RESTAURANTS, CUISINE_TYPES } from './food.data';

const HOW_IT_WORKS = [
  {
    step: 1,
    icon: faMagnifyingGlass,
    title: 'Browse restaurants',
    description: 'Explore hundreds of local restaurants filtered by cuisine, rating, and delivery time.',
  },
  {
    step: 2,
    icon: faStore,
    title: 'Choose your meal',
    description: 'Pick your favourite dishes, customise your order, and add everything to your cart.',
  },
  {
    step: 3,
    icon: faBoltLightning,
    title: 'Fast delivery',
    description: 'Track your order in real time as a courier brings it right to your door.',
  },
];

const STATS = [
  { label: 'Restaurants',      value: '600+',  icon: faStore },
  { label: 'Orders delivered', value: '1.2M+', icon: faBoltLightning },
  { label: 'Avg. rating',      value: '4.7',   icon: faStar },
  { label: 'Cities covered',   value: '40+',   icon: faShieldHalved },
];

export default function FoodThemePage() {
  const featuredRestaurants = RESTAURANTS.slice(0, 4);

  return (
    <div className="bg-surface-base text-text-primary">
      <style>{`
        @keyframes food-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes food-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-10px); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(55%_55%_at_70%_-5%,_var(--primary-subtle),_transparent_70%)]" />
          <div className="absolute -top-20 left-10 h-80 w-80 rounded-full bg-primary/10 blur-3xl motion-safe:animate-[food-float_18s_ease-in-out_infinite]" />
          <div className="absolute top-32 -right-20 h-64 w-64 rounded-full bg-secondary/10 blur-3xl motion-safe:animate-[food-float_22s_ease-in-out_infinite]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center space-y-6 motion-safe:animate-[food-fade_0.8s_ease-out]">
            <Badge variant="primary" size="sm">Free delivery on your first order</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
              Order Food From Your<br />
              <span className="text-primary">Favorite Restaurants</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Discover local gems and popular chains. Fresh meals delivered to your door in minutes.
            </p>

            {/* Search */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-xl mx-auto">
              <div className="flex-1 relative">
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none"
                  aria-hidden="true"
                />
                <input
                  type="search"
                  placeholder="Search restaurants or cuisines…"
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface-raised text-sm text-text-primary placeholder:text-text-secondary focus:outline-none focus:ring-2 focus:ring-border-focus transition"
                />
              </div>
              <Button as="a" href="/theme/food/restaurants" variant="primary" size="lg" className="shrink-0 px-6">
                Search
              </Button>
            </div>

            {/* Cuisine filters */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {CUISINE_TYPES.map((cuisine) => (
                <a
                  key={cuisine}
                  href={`/theme/food/restaurants`}
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-border bg-surface-raised text-text-secondary hover:border-border-focus hover:text-text-primary transition-colors"
                >
                  {cuisine}
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats bar ── */}
      <section className="border-y border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-6 py-6">
          <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-border">
            {STATS.map((stat) => (
              <div key={stat.label} className="flex flex-col items-center gap-1 px-4 py-2 text-center">
                <FontAwesomeIcon icon={stat.icon} className="w-5 h-5 text-primary" aria-hidden="true" />
                <span className="text-2xl font-bold text-text-primary">{stat.value}</span>
                <span className="text-xs text-text-secondary">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured restaurants ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Featured Restaurants</h2>
          <a
            href="/theme/food/restaurants"
            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            View all <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {featuredRestaurants.map((r) => (
            <RestaurantCard
              key={r.restaurantId}
              restaurant={r}
              href={`/theme/food/restaurants/${r.slug}`}
            />
          ))}
        </div>
      </section>

      {/* ── How it works ── */}
      <section className="bg-surface-raised border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-xl font-semibold text-text-primary text-center mb-10">How YumDash Works</h2>
          <div className="grid gap-8 sm:grid-cols-3">
            {HOW_IT_WORKS.map((step) => (
              <div key={step.step} className="flex flex-col items-center text-center gap-4">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary text-primary-fg shadow-md">
                  <FontAwesomeIcon icon={step.icon} className="w-6 h-6" aria-hidden="true" />
                </div>
                <div className="space-y-1.5">
                  <div className="inline-flex items-center justify-center w-6 h-6 rounded-full bg-primary-subtle text-primary text-xs font-bold">
                    {step.step}
                  </div>
                  <h3 className="text-base font-semibold text-text-primary">{step.title}</h3>
                  <p className="text-sm text-text-secondary leading-relaxed max-w-xs mx-auto">
                    {step.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-primary px-8 py-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary-fg">Hungry? Order in seconds.</h2>
          <p className="text-primary-fg/80 max-w-md mx-auto text-sm leading-relaxed">
            Join over a million happy customers. Explore menus from your favourite restaurants today.
          </p>
          <Button as="a" href="/theme/food/restaurants" variant="secondary" size="lg">
            Order Now
          </Button>
        </div>
      </section>
    </div>
  );
}
