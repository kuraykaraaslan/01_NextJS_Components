import { notFound } from 'next/navigation';
import { VENUES, getEventsByVenue, getRelatedVenues } from '../../tickets.data';
import VenueDetailView from './VenueDetailView';

export function generateStaticParams() {
  return VENUES.map((v) => ({ slug: v.slug }));
}

export default async function VenuePage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const venue = VENUES.find((v) => v.slug === slug);
  if (!venue) notFound();

  const events = getEventsByVenue(venue.name);
  const related = getRelatedVenues(venue, 4);

  return <VenueDetailView venue={venue} events={events} related={related} />;
}
