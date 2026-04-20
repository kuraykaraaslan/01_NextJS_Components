import { cn } from '@/libs/utils/cn';

const sizeMap = {
  xs: 'h-6 w-6 text-xs',
  sm: 'h-8 w-8 text-xs',
  md: 'h-10 w-10 text-sm',
  lg: 'h-12 w-12 text-base',
  xl: 'h-16 w-16 text-lg',
};

function getInitials(name: string) {
  return (
    name
      .trim()
      .split(/\s+/)
      .map((w) => w[0])
      .slice(0, 2)
      .join('')
      .toUpperCase() || '?'
  );
}

export function Avatar({
  src,
  name,
  size = 'md',
  className,
}: {
  src?: string | null;
  name: string;
  size?: keyof typeof sizeMap;
  className?: string;
}) {
  const sizeClass = sizeMap[size];

  if (src) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={src}
        alt={name}
        className={cn(sizeClass, 'rounded-full object-cover border border-border shrink-0', className)}
      />
    );
  }

  return (
    <span
      aria-label={name}
      className={cn(
        sizeClass,
        'rounded-full bg-primary-subtle text-primary font-semibold',
        'flex items-center justify-center shrink-0 border border-primary-subtle select-none',
        className
      )}
    >
      {getInitials(name)}
    </span>
  );
}
