import { AgentCard } from '@/modules/domains/real-estate/agent/AgentCard';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUsers } from '@fortawesome/free-solid-svg-icons';
import { AGENTS, PROPERTIES } from '../real-estate.data';

export default function AgentsPage() {
  const agentsWithCounts = AGENTS.map((agent) => ({
    ...agent,
    listingCount: PROPERTIES.filter((p) => p.agentId === agent.agentId).length,
  }));

  return (
    <div className="mx-auto max-w-7xl px-6 py-10">
      {/* Header */}
      <div className="mb-10 text-center">
        <div className="inline-flex items-center justify-center h-12 w-12 rounded-full bg-primary-subtle text-primary mb-4">
          <FontAwesomeIcon icon={faUsers} className="w-6 h-6" aria-hidden="true" />
        </div>
        <h1 className="text-3xl font-bold text-text-primary">Our Expert Agents</h1>
        <p className="text-text-secondary mt-2 max-w-md mx-auto text-sm leading-relaxed">
          Our team of experienced agents are here to help you find your perfect property. Get in touch with any of them directly.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-12 max-w-lg mx-auto">
        <div className="text-center rounded-xl border border-border bg-surface-raised p-4">
          <p className="text-2xl font-bold text-text-primary">{AGENTS.length}</p>
          <p className="text-xs text-text-secondary mt-0.5">Expert Agents</p>
        </div>
        <div className="text-center rounded-xl border border-border bg-surface-raised p-4">
          <p className="text-2xl font-bold text-text-primary">{PROPERTIES.length}</p>
          <p className="text-xs text-text-secondary mt-0.5">Total Listings</p>
        </div>
        <div className="text-center rounded-xl border border-border bg-surface-raised p-4">
          <p className="text-2xl font-bold text-text-primary">5</p>
          <p className="text-xs text-text-secondary mt-0.5">Cities Covered</p>
        </div>
      </div>

      {/* Agent grid */}
      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {agentsWithCounts.map((agent) => (
          <AgentCard key={agent.agentId} agent={agent} />
        ))}
      </div>
    </div>
  );
}
