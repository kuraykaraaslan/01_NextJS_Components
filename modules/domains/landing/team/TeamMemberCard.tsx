'use client';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLinkedin, faXTwitter, faGithub } from '@fortawesome/free-brands-svg-icons';
import type { TeamMember } from '../types';

const PLATFORM_ICONS: Record<string, typeof faLinkedin> = {
  linkedin: faLinkedin,
  twitter: faXTwitter,
  x: faXTwitter,
  github: faGithub,
};

type TeamMemberCardProps = {
  member: TeamMember;
  className?: string;
};

export function TeamMemberCard({ member, className }: TeamMemberCardProps) {
  return (
    <div
      className={cn(
        'group flex flex-col items-center text-center rounded-2xl border border-border bg-surface-raised p-6',
        'hover:shadow-md transition-shadow',
        className,
      )}
    >
      {member.avatar ? (
        <img
          src={member.avatar}
          alt={member.name}
          className="w-20 h-20 rounded-full object-cover ring-2 ring-border mb-4"
        />
      ) : (
        <div className="w-20 h-20 rounded-full bg-primary-subtle flex items-center justify-center text-2xl font-bold text-primary ring-2 ring-border mb-4">
          {member.name.charAt(0)}
        </div>
      )}

      <h3 className="text-sm font-semibold text-text-primary">{member.name}</h3>
      <p className="mt-0.5 text-xs text-primary font-medium">{member.role}</p>

      {member.bio && (
        <p className="mt-2 text-xs text-text-secondary leading-relaxed line-clamp-3">{member.bio}</p>
      )}

      {member.socialLinks && member.socialLinks.length > 0 && (
        <div className="mt-4 flex items-center gap-2">
          {member.socialLinks.map((link) => {
            const icon = PLATFORM_ICONS[link.platform.toLowerCase()];
            if (!icon) return null;
            return (
              <a
                key={link.platform}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${member.name} on ${link.platform}`}
                className={cn(
                  'flex items-center justify-center w-7 h-7 rounded-full',
                  'text-text-secondary hover:text-primary hover:bg-primary-subtle transition-colors',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
                )}
              >
                <FontAwesomeIcon icon={icon} className="w-3.5 h-3.5" aria-hidden="true" />
              </a>
            );
          })}
        </div>
      )}
    </div>
  );
}
