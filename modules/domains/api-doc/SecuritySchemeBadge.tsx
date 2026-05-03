'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faKey, faLock, faShield, faFingerprint, faUserShield } from '@fortawesome/free-solid-svg-icons';
import { Badge } from '@/modules/ui/Badge';
import type { SecuritySchemeType } from './types';

const schemeConfig: Record<SecuritySchemeType, { label: string; icon: typeof faKey; variant: 'info' | 'warning' | 'primary' | 'neutral' | 'success' }> = {
  apiKey:         { label: 'API Key',        icon: faKey,         variant: 'warning' },
  http:           { label: 'HTTP',           icon: faLock,        variant: 'info' },
  oauth2:         { label: 'OAuth 2.0',      icon: faShield,      variant: 'primary' },
  openIdConnect:  { label: 'OpenID Connect', icon: faFingerprint, variant: 'success' },
  mutualTLS:      { label: 'mTLS',           icon: faUserShield,  variant: 'neutral' },
};

type Props = {
  type: SecuritySchemeType;
  name?: string;
  size?: 'sm' | 'md';
  className?: string;
};

export function SecuritySchemeBadge({ type, name, size = 'md', className }: Props) {
  const { label, icon, variant } = schemeConfig[type];

  return (
    <Badge variant={variant} size={size} className={cn('gap-1', className)}>
      <FontAwesomeIcon icon={icon} className="w-3 h-3" aria-hidden="true" />
      {name ?? label}
    </Badge>
  );
}
