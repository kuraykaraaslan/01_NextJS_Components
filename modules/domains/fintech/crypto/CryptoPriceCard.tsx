'use client';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Filler,
} from 'chart.js';
import { Line } from 'react-chartjs-2';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCaretUp, faCaretDown } from '@fortawesome/free-solid-svg-icons';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Filler);

type CryptoPriceCardProps = {
  symbol: string;
  name: string;
  price: number;
  change24h: number;
  priceHistory: number[];
  quoteCurrency: string;
  className?: string;
};

export function CryptoPriceCard({
  symbol,
  name,
  price,
  change24h,
  priceHistory,
  quoteCurrency,
  className,
}: CryptoPriceCardProps) {
  const isPositive = change24h >= 0;
  const color = isPositive ? '#22c55e' : '#ef4444';

  const chartData = {
    labels: priceHistory.map((_, i) => `${i}`),
    datasets: [
      {
        data: priceHistory,
        borderColor: color,
        backgroundColor: isPositive ? 'rgba(34,197,94,0.08)' : 'rgba(239,68,68,0.08)',
        fill: true,
        tension: 0.4,
        pointRadius: 0,
        borderWidth: 2,
      },
    ],
  };

  return (
    <div className={cn('rounded-xl border border-border bg-surface-raised p-4 flex flex-col gap-3', className)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs font-semibold text-text-secondary tracking-wide uppercase">{symbol}</p>
          <p className="text-sm font-medium text-text-primary">{name}</p>
        </div>
        <span
          className={cn(
            'flex items-center gap-0.5 text-xs font-semibold px-2 py-0.5 rounded-full',
            isPositive ? 'bg-success-subtle text-success' : 'bg-error-subtle text-error',
          )}
        >
          <FontAwesomeIcon icon={isPositive ? faCaretUp : faCaretDown} className="w-2.5 h-2.5" aria-hidden="true" />
          {Math.abs(change24h).toFixed(2)}%
        </span>
      </div>

      <div className="h-12">
        <Line
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: false,
            plugins: { legend: { display: false }, tooltip: { enabled: false } },
            scales: { x: { display: false }, y: { display: false } },
            animation: false,
          }}
        />
      </div>

      <p className="text-lg font-bold text-text-primary">
        {quoteCurrency === 'USD' ? '$' : quoteCurrency === 'TRY' ? '₺' : ''}
        {price.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        <span className="text-xs text-text-secondary font-normal ml-1">{quoteCurrency}</span>
      </p>
    </div>
  );
}
