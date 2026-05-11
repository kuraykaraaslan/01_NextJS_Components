import { notFound } from 'next/navigation';
import { AGENTS, PROPERTIES } from '../../real-estate.data';
import { AgentDetailClient } from './AgentDetailClient';

export function generateStaticParams() {
  return AGENTS.map((a) => ({ id: a.agentId }));
}

type Props = { params: Promise<{ id: string }> };

export default async function AgentDetailPage({ params }: Props) {
  const { id } = await params;
  const agent = AGENTS.find((a) => a.agentId === id);
  if (!agent) notFound();

  const listings = PROPERTIES.filter((p) => p.agentId === id);

  return <AgentDetailClient agent={agent} listings={listings} />;
}
