import { SkipLink } from '@/modules/ui/SkipLink';

export default function CommonThemeLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-surface-base text-text-primary">
      <SkipLink href="#main-content" />
      <main id="main-content">{children}</main>
    </div>
  );
}
