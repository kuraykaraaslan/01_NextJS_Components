import { Button } from '@/modules/ui/Button';
import { Badge } from '@/modules/ui/Badge';
import { PropertyCard } from '@/modules/domains/real-estate/property/PropertyCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faMagnifyingGlass,
  faLocationDot,
  faArrowRight,
  faBuilding,
  faUsers,
  faHandshake,
  faCity,
  faHome,
  faWarehouse,
  faTree,
  faChartLine,
  faBriefcase,
} from '@fortawesome/free-solid-svg-icons';
import { PROPERTIES, PROPERTY_TYPES, CITIES } from './real-estate.data';
import type { PropertyType } from '@/modules/domains/real-estate/types';

const STATS = [
  { label: 'Properties Listed',  value: '2,400+', icon: faBuilding   },
  { label: 'Cities Covered',     value: '24+',    icon: faCity       },
  { label: 'Satisfied Buyers',   value: '1,800+', icon: faHandshake  },
  { label: 'Expert Agents',      value: '120+',   icon: faUsers      },
];

const TYPE_META: Record<PropertyType, { label: string; icon: typeof faHome }> = {
  APARTMENT:  { label: 'Apartments',  icon: faBuilding   },
  HOUSE:      { label: 'Houses',      icon: faHome       },
  VILLA:      { label: 'Villas',      icon: faHome       },
  LAND:       { label: 'Land',        icon: faTree       },
  COMMERCIAL: { label: 'Commercial',  icon: faWarehouse  },
  OFFICE:     { label: 'Office',      icon: faBriefcase  },
};

export default function RealEstateHomePage() {
  const featuredProperties = PROPERTIES.slice(0, 4);

  return (
    <div className="bg-surface-base text-text-primary">
      <style>{`
        @keyframes re-fade {
          from { opacity: 0; transform: translateY(20px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @keyframes re-float {
          0%, 100% { transform: translateY(0); }
          50%       { transform: translateY(-14px); }
        }
      `}</style>

      {/* ── Hero ── */}
      <section className="relative overflow-hidden">
        <div className="absolute inset-0 -z-10">
          <div className="absolute inset-0 bg-[radial-gradient(60%_50%_at_70%_-10%,_var(--primary-subtle),_transparent_70%)]" />
          <div className="absolute -top-24 right-0 h-96 w-96 rounded-full bg-primary/10 blur-3xl motion-safe:animate-[re-float_20s_ease-in-out_infinite]" />
          <div className="absolute top-32 -left-24 h-80 w-80 rounded-full bg-secondary/10 blur-3xl motion-safe:animate-[re-float_26s_ease-in-out_infinite]" />
        </div>

        <div className="mx-auto max-w-7xl px-6 pt-16 pb-20">
          <div className="max-w-3xl mx-auto text-center space-y-6 motion-safe:animate-[re-fade_0.8s_ease-out]">
            <Badge variant="success" size="sm">8 new listings added today</Badge>
            <h1 className="text-4xl sm:text-5xl font-bold text-text-primary leading-tight tracking-tight">
              Find Your<br />
              <span className="text-primary">Dream Property</span>
            </h1>
            <p className="text-lg text-text-secondary max-w-xl mx-auto leading-relaxed">
              Thousands of verified listings across Turkey. Buy, rent, or explore short-stay options — all in one place.
            </p>

            {/* Search bar */}
            <div className="mt-8 flex flex-col sm:flex-row gap-3 max-w-2xl mx-auto">
              <div className="flex-1 relative">
                <FontAwesomeIcon
                  icon={faLocationDot}
                  className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-secondary pointer-events-none"
                  aria-hidden="true"
                />
                <select
                  className="w-full pl-10 pr-4 py-3 rounded-xl border border-border bg-surface-raised text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus transition appearance-none"
                  aria-label="Select city"
                  defaultValue=""
                >
                  <option value="" disabled>Select city…</option>
                  {CITIES.map((city) => (
                    <option key={city} value={city}>{city}</option>
                  ))}
                </select>
              </div>
              <div className="relative sm:w-44">
                <select
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface-raised text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus transition appearance-none"
                  aria-label="Property type"
                  defaultValue=""
                >
                  <option value="" disabled>Type…</option>
                  {PROPERTY_TYPES.map((t) => (
                    <option key={t} value={t}>{TYPE_META[t].label}</option>
                  ))}
                </select>
              </div>
              <div className="relative sm:w-48">
                <select
                  className="w-full px-4 py-3 rounded-xl border border-border bg-surface-raised text-sm text-text-primary focus:outline-none focus:ring-2 focus:ring-border-focus transition appearance-none"
                  aria-label="Listing type"
                  defaultValue=""
                >
                  <option value="" disabled>For Sale / Rent…</option>
                  <option value="SALE">For Sale</option>
                  <option value="RENT">For Rent</option>
                  <option value="SHORT_TERM">Short-term</option>
                </select>
              </div>
              <Button variant="primary" size="lg" className="shrink-0 px-6">
                <FontAwesomeIcon icon={faMagnifyingGlass} className="w-4 h-4 mr-2" aria-hidden="true" />
                Search
              </Button>
            </div>

            {/* City quick links */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {CITIES.map((city) => (
                <a
                  key={city}
                  href="/theme/real-estate/properties"
                  className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border border-border bg-surface-raised text-text-secondary hover:border-border-focus hover:text-text-primary transition-colors"
                >
                  {city}
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

      {/* ── Featured properties ── */}
      <section className="mx-auto max-w-7xl px-6 py-14">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-text-primary">Featured Properties</h2>
          <a
            href="/theme/real-estate/properties"
            className="flex items-center gap-1.5 text-sm text-primary font-medium hover:underline"
          >
            View all <FontAwesomeIcon icon={faArrowRight} className="w-3.5 h-3.5" aria-hidden="true" />
          </a>
        </div>

        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {featuredProperties.map((property) => (
            <PropertyCard
              key={property.propertyId}
              property={{
                propertyId: property.propertyId,
                title: property.title,
                slug: property.slug,
                price: property.price,
                currency: property.currency,
                type: property.type,
                listingType: property.listingType,
                status: property.status,
                bedrooms: property.bedrooms,
                bathrooms: property.bathrooms,
                area: property.area,
                city: property.city,
                imageUrl: property.imageUrl,
              }}
              href={`/theme/real-estate/properties/${property.slug}`}
            />
          ))}
        </div>
      </section>

      {/* ── Browse by type ── */}
      <section className="bg-surface-raised border-y border-border">
        <div className="mx-auto max-w-7xl px-6 py-14">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Browse by Property Type</h2>
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {PROPERTY_TYPES.map((type) => {
              const meta = TYPE_META[type];
              const count = PROPERTIES.filter((p) => p.type === type).length;
              return (
                <a
                  key={type}
                  href="/theme/real-estate/properties"
                  className="flex flex-col items-center gap-2 rounded-xl border border-border bg-surface-base p-4 hover:border-border-focus hover:shadow-sm transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
                >
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-subtle text-primary">
                    <FontAwesomeIcon icon={meta.icon} className="w-5 h-5" aria-hidden="true" />
                  </span>
                  <span className="text-sm font-medium text-text-primary">{meta.label}</span>
                  <span className="text-xs text-text-secondary">{count} listing{count !== 1 ? 's' : ''}</span>
                </a>
              );
            })}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-6 py-16">
        <div className="rounded-2xl bg-primary px-8 py-10 text-center space-y-4">
          <h2 className="text-2xl font-bold text-primary-fg">Ready to list your property?</h2>
          <p className="text-primary-fg/80 max-w-md mx-auto text-sm leading-relaxed">
            Reach thousands of qualified buyers and renters. List your property on EstateView today.
          </p>
          <Button variant="secondary" size="lg">
            <FontAwesomeIcon icon={faChartLine} className="w-4 h-4 mr-2" aria-hidden="true" />
            Get Started — It&apos;s Free
          </Button>
        </div>
      </section>
    </div>
  );
}
