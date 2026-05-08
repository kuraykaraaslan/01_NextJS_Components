'use client';
import { cn } from '@/libs/utils/cn';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleCheck, faLocationDot, faIndustry } from '@fortawesome/free-solid-svg-icons';
import type { Company } from '../types';

type CompanyCardProps = {
  company: Company;
  jobCount?: number;
  href?: string;
  onClick?: () => void;
  className?: string;
};

export function CompanyCard({ company, jobCount, href, onClick, className }: CompanyCardProps) {
  const isInteractive = !!(href || onClick);

  const body = (
    <div className="p-5 flex flex-col gap-3">
      <div className="flex items-start gap-3">
        <Avatar
          src={company.logo ?? undefined}
          name={company.name}
          size="lg"
          className="rounded-xl flex-shrink-0"
        />
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <span className="font-semibold text-text-primary truncate">{company.name}</span>
            {company.verified && (
              <FontAwesomeIcon icon={faCircleCheck} className="w-4 h-4 text-primary flex-shrink-0" aria-label="Verified" />
            )}
          </div>
          {company.industry && (
            <p className="text-xs text-text-secondary mt-0.5 flex items-center gap-1">
              <FontAwesomeIcon icon={faIndustry} className="w-3 h-3" aria-hidden="true" />
              {company.industry}
            </p>
          )}
        </div>
      </div>

      {company.description && (
        <p className="text-sm text-text-secondary line-clamp-2 leading-relaxed">
          {company.description}
        </p>
      )}

      <div className="flex flex-wrap items-center gap-2 mt-auto pt-2 border-t border-border">
        {company.location && (
          <span className="flex items-center gap-1 text-xs text-text-secondary">
            <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" aria-hidden="true" />
            {company.location}
          </span>
        )}
        {company.size && (
          <span className="text-xs text-text-secondary">{company.size}</span>
        )}
        {jobCount !== undefined && (
          <Badge variant="primary" size="sm" className="ml-auto">
            {jobCount} {jobCount === 1 ? 'job' : 'jobs'}
          </Badge>
        )}
      </div>
    </div>
  );

  const baseClass = cn(
    'group rounded-xl border border-border bg-surface-raised flex flex-col overflow-hidden',
    isInteractive && 'hover:shadow-md hover:border-border-focus transition-all duration-200',
    className
  );

  if (href) return <a href={href} className={baseClass}>{body}</a>;
  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        className={cn(baseClass, 'text-left w-full cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus')}
      >
        {body}
      </button>
    );
  }
  return <div className={baseClass}>{body}</div>;
}
