import { notFound } from 'next/navigation';
import { ARTISTS, getEventsByArtist, getRelatedArtists } from '../../tickets.data';
import ArtistDetailView from './ArtistDetailView';

export function generateStaticParams() {
  return ARTISTS.map((a) => ({ slug: a.slug }));
}

export default async function ArtistPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const artist = ARTISTS.find((a) => a.slug === slug);
  if (!artist) notFound();

  const events = getEventsByArtist(artist.name);
  const related = getRelatedArtists(artist, 4);

  return <ArtistDetailView artist={artist} events={events} related={related} />;
}
