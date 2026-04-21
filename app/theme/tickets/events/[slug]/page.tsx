import { notFound } from 'next/navigation';
import { EVENTS, getRelatedEvents } from '../../tickets.data';
import { EventDetailView } from './EventDetailView';

export function generateStaticParams() {
  return EVENTS.map((e) => ({ slug: e.slug }));
}

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const event = EVENTS.find((e) => e.slug === slug);
  if (!event) notFound();

  const related = getRelatedEvents(event, 3);

  return <EventDetailView event={event} related={related} />;
}
