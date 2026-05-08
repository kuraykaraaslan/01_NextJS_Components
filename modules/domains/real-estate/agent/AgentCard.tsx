'use client';
import { cn } from '@/libs/utils/cn';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPhone, faEnvelope, faBuilding } from '@fortawesome/free-solid-svg-icons';

type AgentCardData = {
  agentId: string;
  name: string;
  phone?: string | null;
  email: string;
  bio?: string | null;
  avatarUrl?: string | null;
  listingCount?: number | null;
};

type AgentCardProps = {
  agent: AgentCardData;
  className?: string;
};

export function AgentCard({ agent, className }: AgentCardProps) {
  return (
    <div
      className={cn(
        'rounded-xl border border-border bg-surface-raised p-5 flex flex-col gap-4',
        className
      )}
    >
      {/* Header: avatar + name + listing count */}
      <div className="flex items-start gap-3">
        <Avatar
          src={agent.avatarUrl ?? undefined}
          name={agent.name}
          size="lg"
          className="shrink-0"
        />
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-semibold text-text-primary truncate">{agent.name}</h3>
          <p className="text-xs text-text-secondary mt-0.5">Real Estate Agent</p>
          {agent.listingCount != null && (
            <Badge variant="primary" size="sm" className="mt-1.5">
              <FontAwesomeIcon icon={faBuilding} className="w-3 h-3 mr-1" aria-hidden="true" />
              {agent.listingCount} listing{agent.listingCount !== 1 ? 's' : ''}
            </Badge>
          )}
        </div>
      </div>

      {/* Bio */}
      {agent.bio && (
        <p className="text-sm text-text-secondary leading-relaxed line-clamp-3">{agent.bio}</p>
      )}

      {/* Contact info */}
      <div className="flex flex-col gap-1.5 text-sm text-text-secondary">
        <a
          href={`mailto:${agent.email}`}
          className="flex items-center gap-2 hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
        >
          <FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
          <span className="truncate">{agent.email}</span>
        </a>
        {agent.phone && (
          <a
            href={`tel:${agent.phone}`}
            className="flex items-center gap-2 hover:text-text-primary transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus rounded"
          >
            <FontAwesomeIcon icon={faPhone} className="w-3.5 h-3.5 text-primary shrink-0" aria-hidden="true" />
            <span>{agent.phone}</span>
          </a>
        )}
      </div>

      {/* Contact button */}
      <Button
        variant="outline"
        size="sm"
        fullWidth
        className="mt-auto"
        onClick={() => window.location.href = `mailto:${agent.email}`}
      >
        Contact Agent
      </Button>
    </div>
  );
}
