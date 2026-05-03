'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faLock, faShield, faFingerprint, faIdCard } from '@fortawesome/free-solid-svg-icons';
import type { SecuritySchemeType } from './types';

const SCHEME_CONFIG: Record<SecuritySchemeType, { label: string; icon: typeof faKey; style: string }> = {
  apiKey: {
    label: 'API Key',
    icon: faKey,
    style: 'bg-warning-subtle text-warning-fg border-warning/30',
  },
  http: {
    label: 'HTTP',
    icon: faLock,
    style: 'bg-info-subtle text-info-fg border-info/30',
  },
  oauth2: {
    label: 'OAuth 2.0',
    icon: faShield,
    style: 'bg-primary-subtle text-primary border-primary/30',
  },
  openIdConnect: {
    label: 'OpenID Connect',
    icon: faFingerprint,
    style: 'bg-success-subtle text-success-fg border-success/30',
  },
  mutualTLS: {
    label: 'Mutual TLS',
    icon: faIdCard,
    style: 'bg-surface-sunken text-text-secondary border-border',
  },
};

type Props = {
  type: SecuritySchemeType;
  name?: string;
  className?: string;
};

export function SecurityBadge({ type, name, className }: Props) {
  const config = SCHEME_CONFIG[type];
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded border text-xs font-medium px-2 py-0.5',
        config.style,
        className,
      )}
    >
      <FontAwesomeIcon icon={config.icon} className="w-3 h-3" aria-hidden="true" />
      <span>{name ?? config.label}</span>
    </span>
  );
}
