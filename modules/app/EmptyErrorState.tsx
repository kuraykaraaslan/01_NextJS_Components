import { cn } from '@/libs/utils/cn';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Button } from '@/modules/ui/Button';
import { EmptyState } from '@/modules/ui/EmptyState';

export function ErrorState({
  title = 'Something went wrong',
  message,
  onRetry,
  retryLabel = 'Try again',
  className,
}: {
  title?: string;
  message: string;
  onRetry?: () => void;
  retryLabel?: string;
  className?: string;
}) {
  return (
    <div className={cn('space-y-4', className)}>
      <AlertBanner
        variant="error"
        title={title}
        message={message}
        action={onRetry ? { label: retryLabel, onClick: onRetry } : undefined}
      />
      {onRetry && (
        <div className="flex justify-center">
          <EmptyState
            icon="⚠"
            title="Unable to load data"
            description="There was a problem loading this content."
            action={
              <Button variant="outline" size="sm" onClick={onRetry} iconLeft="↺">
                {retryLabel}
              </Button>
            }
          />
        </div>
      )}
    </div>
  );
}

export function NotFoundState({
  title = 'Page not found',
  description = "The page you're looking for doesn't exist or has been moved.",
  onGoBack,
  goBackLabel = 'Go back',
  className,
}: {
  title?: string;
  description?: string;
  onGoBack?: () => void;
  goBackLabel?: string;
  className?: string;
}) {
  return (
    <EmptyState
      icon="🔍"
      title={title}
      description={description}
      action={
        onGoBack ? (
          <Button variant="outline" size="sm" onClick={onGoBack} iconLeft="←">
            {goBackLabel}
          </Button>
        ) : undefined
      }
      className={className}
    />
  );
}

export function NoAccessState({
  title = 'Access denied',
  description = "You don't have permission to view this content.",
  onRequestAccess,
  className,
}: {
  title?: string;
  description?: string;
  onRequestAccess?: () => void;
  className?: string;
}) {
  return (
    <EmptyState
      icon="🔒"
      title={title}
      description={description}
      action={
        onRequestAccess ? (
          <Button variant="primary" size="sm" onClick={onRequestAccess}>
            Request access
          </Button>
        ) : undefined
      }
      className={className}
    />
  );
}
