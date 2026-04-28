import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 bg-surface-base">

      {/* big 404 */}
      <div className="select-none text-[120px] sm:text-[180px] font-black leading-none tabular-nums"
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          opacity: 0.15,
        }}
      >
        404
      </div>

      {/* icon */}
      <div
        className="flex h-20 w-20 -mt-8 mb-6 items-center justify-center rounded-2xl text-4xl shadow-lg"
        style={{
          background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
          boxShadow: '0 8px 32px color-mix(in srgb, var(--primary) 30%, transparent)',
        }}
      >
        🔍
      </div>

      <h1 className="text-2xl sm:text-3xl font-bold text-text-primary text-center">
        Sayfa Bulunamadı
      </h1>

      <p className="mt-3 max-w-md text-center text-text-secondary text-sm sm:text-base leading-relaxed">
        Aradığınız sayfa kaldırılmış, taşınmış ya da hiç var olmamış olabilir.
      </p>

      {/* action buttons */}
      <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
        <Link
          href="/"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-primary-fg transition-transform hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
          style={{
            background: 'linear-gradient(135deg, var(--primary) 0%, var(--secondary) 100%)',
            boxShadow: '0 4px 16px color-mix(in srgb, var(--primary) 30%, transparent)',
          }}
        >
          <span>←</span>
          Ana Sayfa
        </Link>

        <Link
          href="javascript:history.back()"
          className="inline-flex items-center gap-2 px-6 py-2.5 rounded-xl text-sm font-semibold text-text-primary border border-border transition-colors hover:bg-surface-overlay focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus"
        >
          Geri Dön
        </Link>
      </div>

      {/* decorative dots */}
      <div className="mt-16 flex items-center gap-2 opacity-20" aria-hidden>
        {[...Array(5)].map((_, i) => (
          <span
            key={i}
            className="rounded-full bg-primary"
            style={{ width: i === 2 ? 10 : i === 1 || i === 3 ? 7 : 5, height: i === 2 ? 10 : i === 1 || i === 3 ? 7 : 5 }}
          />
        ))}
      </div>
    </div>
  );
}
