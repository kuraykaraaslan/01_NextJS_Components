import { notFound } from 'next/navigation';
import { PropertyCard } from '@/modules/domains/real-estate/property/PropertyCard';
import { AgentCard } from '@/modules/domains/real-estate/agent/AgentCard';
import { PropertyStatusBadge } from '@/modules/domains/real-estate/property/PropertyStatusBadge';
import { PropertyTypeBadge } from '@/modules/domains/real-estate/property/PropertyTypeBadge';
import { ListingTypeBadge } from '@/modules/domains/real-estate/listing/ListingTypeBadge';
import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faBed,
  faBath,
  faRulerCombined,
  faLocationDot,
  faArrowLeft,
  faShare,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
import { PROPERTIES, AGENTS } from '../../real-estate.data';

export function generateStaticParams() {
  return PROPERTIES.map((p) => ({ slug: p.slug }));
}

function formatPrice(price: number, currency: string): string {
  if (currency === 'TRY') {
    return new Intl.NumberFormat('tr-TR', { style: 'currency', currency: 'TRY', maximumFractionDigits: 0 }).format(price);
  }
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, maximumFractionDigits: 0 }).format(price);
}

type Props = { params: Promise<{ slug: string }> };

export default async function PropertyDetailPage({ params }: Props) {
  const { slug } = await params;
  const property = PROPERTIES.find((p) => p.slug === slug);
  if (!property) notFound();

  const agent = AGENTS.find((a) => a.agentId === property.agentId);
  const similar = PROPERTIES.filter(
    (p) => p.propertyId !== property.propertyId && (p.type === property.type || p.city === property.city)
  ).slice(0, 3);

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Back link */}
      <a
        href="/theme/real-estate/properties"
        className="inline-flex items-center gap-2 text-sm text-text-secondary hover:text-text-primary mb-6 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
      >
        <FontAwesomeIcon icon={faArrowLeft} className="w-3.5 h-3.5" aria-hidden="true" />
        Back to listings
      </a>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* ── Main column ── */}
        <div className="lg:col-span-2 space-y-6">
          {/* Image */}
          <div className="relative rounded-2xl overflow-hidden h-72 sm:h-96 bg-surface-sunken">
            {property.imageUrl ? (
              <img
                src={property.imageUrl}
                alt={property.title}
                className="h-full w-full object-cover"
              />
            ) : (
              <div className="h-full w-full bg-gradient-to-br from-primary-subtle via-surface-overlay to-surface-sunken flex items-center justify-center">
                <FontAwesomeIcon icon={faLocationDot} className="w-16 h-16 text-text-disabled" aria-hidden="true" />
              </div>
            )}
          </div>

          {/* Title + badges + actions */}
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
            <div className="space-y-2">
              <div className="flex flex-wrap gap-2">
                <PropertyTypeBadge type={property.type} />
                <ListingTypeBadge type={property.listingType} />
                <PropertyStatusBadge status={property.status} />
              </div>
              <h1 className="text-2xl font-bold text-text-primary leading-snug">{property.title}</h1>
              <p className="flex items-center gap-1.5 text-sm text-text-secondary">
                <FontAwesomeIcon icon={faLocationDot} className="w-4 h-4 text-primary" aria-hidden="true" />
                {property.district ? `${property.district}, ` : ''}{property.city}
              </p>
            </div>
            <div className="flex gap-2 shrink-0">
              <Button variant="ghost" size="sm" aria-label="Save to favourites">
                <FontAwesomeIcon icon={faHeart} className="w-4 h-4" aria-hidden="true" />
              </Button>
              <Button variant="ghost" size="sm" aria-label="Share property">
                <FontAwesomeIcon icon={faShare} className="w-4 h-4" aria-hidden="true" />
              </Button>
            </div>
          </div>

          {/* Specs grid */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
            {property.bedrooms != null && (
              <div className="rounded-xl border border-border bg-surface-raised p-4 flex items-center gap-3">
                <FontAwesomeIcon icon={faBed} className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-secondary">Bedrooms</p>
                  <p className="text-base font-semibold text-text-primary">{property.bedrooms}</p>
                </div>
              </div>
            )}
            {property.bathrooms != null && (
              <div className="rounded-xl border border-border bg-surface-raised p-4 flex items-center gap-3">
                <FontAwesomeIcon icon={faBath} className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-secondary">Bathrooms</p>
                  <p className="text-base font-semibold text-text-primary">{property.bathrooms}</p>
                </div>
              </div>
            )}
            {property.area != null && (
              <div className="rounded-xl border border-border bg-surface-raised p-4 flex items-center gap-3">
                <FontAwesomeIcon icon={faRulerCombined} className="w-5 h-5 text-primary shrink-0" aria-hidden="true" />
                <div>
                  <p className="text-xs text-text-secondary">Area</p>
                  <p className="text-base font-semibold text-text-primary">{property.area} m²</p>
                </div>
              </div>
            )}
          </div>

          {/* Description */}
          <div className="space-y-2">
            <h2 className="text-base font-semibold text-text-primary">About this property</h2>
            <p className="text-sm text-text-secondary leading-relaxed">{property.description}</p>
          </div>
        </div>

        {/* ── Sidebar ── */}
        <div className="space-y-5">
          {/* Price card */}
          <div className="rounded-2xl border border-border bg-surface-raised p-5 space-y-4">
            <div>
              <p className="text-xs text-text-secondary uppercase tracking-wide">Price</p>
              <p className="text-3xl font-bold text-text-primary mt-1">
                {formatPrice(property.price, property.currency)}
              </p>
              {property.listingType === 'RENT' && (
                <p className="text-xs text-text-secondary mt-0.5">per month</p>
              )}
              {property.listingType === 'SHORT_TERM' && (
                <p className="text-xs text-text-secondary mt-0.5">per night</p>
              )}
            </div>
            <Button variant="primary" fullWidth size="md">
              Request Viewing
            </Button>
            <Button variant="outline" fullWidth size="md">
              Make an Offer
            </Button>
          </div>

          {/* Agent card */}
          {agent && (
            <div>
              <h2 className="text-sm font-semibold text-text-secondary mb-2 uppercase tracking-wide">Listed by</h2>
              <AgentCard agent={agent} />
            </div>
          )}
        </div>
      </div>

      {/* ── Similar properties ── */}
      {similar.length > 0 && (
        <section className="mt-14">
          <h2 className="text-xl font-semibold text-text-primary mb-6">Similar Properties</h2>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {similar.map((p) => (
              <PropertyCard
                key={p.propertyId}
                property={{
                  propertyId: p.propertyId,
                  title: p.title,
                  slug: p.slug,
                  price: p.price,
                  currency: p.currency,
                  type: p.type,
                  listingType: p.listingType,
                  status: p.status,
                  bedrooms: p.bedrooms,
                  bathrooms: p.bathrooms,
                  area: p.area,
                  city: p.city,
                  imageUrl: p.imageUrl,
                }}
                href={`/theme/real-estate/properties/${p.slug}`}
              />
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
