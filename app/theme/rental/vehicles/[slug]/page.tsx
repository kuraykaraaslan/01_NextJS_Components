import { notFound } from 'next/navigation';
import { VEHICLES } from '../../rental.data';
import { VehicleDetailView } from './VehicleDetailView';

export function generateStaticParams() {
  return VEHICLES.map((v) => ({ slug: v.slug }));
}

export default async function VehicleDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const vehicle  = VEHICLES.find((v) => v.slug === slug);
  if (!vehicle) notFound();

  const similar = VEHICLES
    .filter((v) => v.category === vehicle.category && v.id !== vehicle.id)
    .slice(0, 3);

  return <VehicleDetailView vehicle={vehicle} similar={similar} />;
}
