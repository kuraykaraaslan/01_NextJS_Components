'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle, faGithub, faDiscord, faMicrosoft } from '@fortawesome/free-brands-svg-icons';
import { cn } from '@/libs/utils/cn';
import type { OAuthCallback } from '../types';

type OAuthProvider = OAuthCallback['provider'];

const providerMeta: Record<OAuthProvider, { label: string; icon: React.ReactNode; iconClass: string }> = {
  GOOGLE:    { label: 'Continue with Google',    icon: <FontAwesomeIcon icon={faGoogle}    />, iconClass: 'text-[#EA4335]' },
  GITHUB:    { label: 'Continue with GitHub',    icon: <FontAwesomeIcon icon={faGithub}    />, iconClass: 'text-text-primary' },
  DISCORD:   { label: 'Continue with Discord',   icon: <FontAwesomeIcon icon={faDiscord}   />, iconClass: 'text-[#5865F2]' },
  MICROSOFT: { label: 'Continue with Microsoft', icon: <FontAwesomeIcon icon={faMicrosoft} />, iconClass: 'text-[#00A4EF]' },
};

type OAuthButtonsProps = {
  providers?: OAuthProvider[];
  onProvider: (provider: OAuthProvider) => Promise<void> | void;
  className?: string;
};

export function OAuthButtons({
  providers = ['GOOGLE', 'GITHUB', 'DISCORD', 'MICROSOFT'],
  onProvider,
  className,
}: OAuthButtonsProps) {
  const [loadingProvider, setLoadingProvider] = useState<OAuthProvider | null>(null);

  async function handleClick(provider: OAuthProvider) {
    setLoadingProvider(provider);
    try { await onProvider(provider); } finally { setLoadingProvider(null); }
  }

  return (
    <div className={cn('flex flex-col gap-2', className)}>
      {providers.map((provider) => {
        const meta = providerMeta[provider];
        const isLoading = loadingProvider === provider;
        return (
          <button
            key={provider}
            type="button"
            disabled={loadingProvider !== null}
            onClick={() => handleClick(provider)}
            aria-label={meta.label}
            className={cn(
              'flex items-center justify-center gap-3 w-full rounded-md border border-border px-4 py-2 text-sm font-medium',
              'text-text-primary bg-surface-base transition-colors hover:bg-surface-overlay',
              'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              'disabled:opacity-50 disabled:cursor-not-allowed'
            )}
          >
            <span className={cn('w-4 h-4 flex items-center justify-center shrink-0', !isLoading && meta.iconClass)}>
              {isLoading
                ? <span className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" aria-hidden="true" />
                : meta.icon}
            </span>
            {meta.label}
          </button>
        );
      })}
    </div>
  );
}
