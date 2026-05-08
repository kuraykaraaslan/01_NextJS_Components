import { Breadcrumb } from '@/modules/ui/Breadcrumb';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass, faStore } from '@fortawesome/free-solid-svg-icons';
import { RestaurantCard } from '@/modules/domains/food/restaurant/RestaurantCard';
import { RESTAURANTS, CUISINE_TYPES } from '../food.data';

export default function RestaurantsListingPage() {
  return (
    <div className="bg-surface-base text-text-primary">
      {/* Sub-header */}
      <div className="border-b border-border bg-surface-raised">
        <div className="mx-auto max-w-7xl px-6 py-5">
          <Breadcrumb
            items={[
              { label: 'Home',        href: '/theme/food' },
              { label: 'Restaurants' },
            ]}
          />
          <div className="mt-3 flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-2xl font-bold text-text-primary">Restaurants Near You</h1>
              <p className="text-sm text-text-secondary mt-0.5">{RESTAURANTS.length} restaurants available</p>
            </div>
            <div className="flex items-center gap-2 rounded-xl border border-border bg-surface-base px-3 py-2 w-64 focus-within:ring-2 focus-within:ring-border-focus transition-shadow">
              <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 text-text-secondary shrink-0" aria-hidden="true" />
              <input
                type="search"
                placeholder="Search restaurants…"
                className="flex-1 bg-transparent text-sm text-text-primary placeholder:text-text-secondary outline-none"
                aria-label="Search restaurants"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-6 py-8">
        <div className="flex gap-8">
          {/* Sidebar filters */}
          <aside className="hidden lg:block w-56 shrink-0 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3">
                Cuisine
              </p>
              <div className="flex flex-col gap-1">
                <label className="flex items-center gap-2 cursor-pointer py-1 group">
                  <input
                    type="checkbox"
                    defaultChecked
                    className="w-4 h-4 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-border-focus"
                    aria-label="All cuisines"
                  />
                  <span className="text-sm text-text-primary font-medium">All</span>
                </label>
                {CUISINE_TYPES.map((c) => (
                  <label key={c} className="flex items-center gap-2 cursor-pointer py-1 group">
                    <input
                      type="checkbox"
                      className="w-4 h-4 rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-border-focus"
                      aria-label={c}
                    />
                    <span className="text-sm text-text-secondary group-hover:text-text-primary transition-colors">{c}</span>
                  </label>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-text-secondary mb-3">
                Delivery Time
              </p>
              <div className="flex flex-col gap-1">
                {['Under 30 min', '30–45 min', '45+ min'].map((opt) => (
                  <label key={opt} className="flex items-center gap-2 cursor-pointer py-1">
                    <input
                      type="radio"
                      name="delivery-time"
                      className="w-4 h-4 accent-primary focus-visible:ring-2 focus-visible:ring-border-focus"
                      aria-label={opt}
                    />
                    <span className="text-sm text-text-secondary">{opt}</span>
                  </label>
                ))}
              </div>
            </div>
          </aside>

          {/* Cuisine chips (mobile) */}
          <div className="flex-1 min-w-0">
            <div className="flex flex-wrap gap-2 mb-6 lg:hidden">
              <button
                type="button"
                className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-primary bg-primary-subtle text-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
              >
                All
              </button>
              {CUISINE_TYPES.map((c) => (
                <button
                  key={c}
                  type="button"
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-border bg-surface-raised text-text-secondary hover:border-border-focus hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  {c}
                </button>
              ))}
            </div>

            {/* Grid */}
            {RESTAURANTS.length > 0 ? (
              <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
                {RESTAURANTS.map((r) => (
                  <RestaurantCard
                    key={r.restaurantId}
                    restaurant={r}
                    href={`/theme/food/restaurants/${r.slug}`}
                  />
                ))}
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-20 text-center gap-4">
                <FontAwesomeIcon icon={faStore} className="w-10 h-10 text-text-disabled" aria-hidden="true" />
                <p className="text-text-secondary text-sm">No restaurants found. Try a different filter.</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
