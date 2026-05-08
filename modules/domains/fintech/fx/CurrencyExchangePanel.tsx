'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowRightArrowLeft, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import type { Currency } from '../types';

type FXPair = {
  from: Currency;
  to: Currency;
  rate: number;
  spread: number;
};

const FX_PAIRS: FXPair[] = [
  { from: 'USD', to: 'TRY', rate: 32.45, spread: 0.5 },
  { from: 'EUR', to: 'TRY', rate: 35.12, spread: 0.5 },
  { from: 'GBP', to: 'TRY', rate: 41.23, spread: 0.6 },
  { from: 'EUR', to: 'USD', rate: 1.082, spread: 0.3 },
  { from: 'BTC', to: 'USD', rate: 68420.5, spread: 1.0 },
  { from: 'ETH', to: 'USD', rate: 3842.2, spread: 1.0 },
  { from: 'BTC', to: 'TRY', rate: 2219733, spread: 1.2 },
  { from: 'ETH', to: 'TRY', rate: 124679, spread: 1.2 },
];

const CURRENCY_SYMBOLS: Record<Currency, string> = {
  TRY: '₺', USD: '$', EUR: '€', GBP: '£', BTC: '₿', ETH: 'Ξ',
};

type Side = 'BUY' | 'SELL';

export function CurrencyExchangePanel() {
  const [pairIndex, setPairIndex] = useState(0);
  const [side, setSide] = useState<Side>('BUY');
  const [amount, setAmount] = useState('100');

  const pair = FX_PAIRS[pairIndex];
  const buyRate = pair.rate * (1 + pair.spread / 100);
  const sellRate = pair.rate * (1 - pair.spread / 100);
  const activeRate = side === 'BUY' ? buyRate : sellRate;

  const fromCurrency = side === 'BUY' ? pair.from : pair.to;
  const toCurrency = side === 'BUY' ? pair.to : pair.from;

  const numAmount = parseFloat(amount) || 0;
  const convertedAmount = side === 'BUY' ? numAmount * activeRate : numAmount / activeRate;

  return (
    <div className="rounded-xl border border-border bg-surface-raised p-6 shadow-sm space-y-5">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <FontAwesomeIcon icon={faArrowRightArrowLeft} className="w-4 h-4 text-primary" aria-hidden="true" />
          <h3 className="text-sm font-semibold text-text-primary">Currency Exchange</h3>
        </div>
        <div className="flex rounded-lg overflow-hidden border border-border text-xs font-semibold">
          <button
            onClick={() => setSide('BUY')}
            className={cn(
              'px-4 py-1.5 transition-colors focus-visible:outline-none',
              side === 'BUY'
                ? 'bg-success text-white'
                : 'bg-surface-base text-text-secondary hover:bg-surface-overlay',
            )}
          >
            Buy
          </button>
          <button
            onClick={() => setSide('SELL')}
            className={cn(
              'px-4 py-1.5 transition-colors focus-visible:outline-none',
              side === 'SELL'
                ? 'bg-error text-white'
                : 'bg-surface-base text-text-secondary hover:bg-surface-overlay',
            )}
          >
            Sell
          </button>
        </div>
      </div>

      {/* Pair selector */}
      <div className="flex flex-wrap gap-2">
        {FX_PAIRS.map((p, i) => (
          <button
            key={i}
            onClick={() => setPairIndex(i)}
            className={cn(
              'px-3 py-1.5 rounded-lg text-xs font-medium border transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
              pairIndex === i
                ? 'border-primary bg-primary-subtle text-primary'
                : 'border-border bg-surface-base text-text-secondary hover:bg-surface-overlay',
            )}
          >
            {p.from}/{p.to}
          </button>
        ))}
      </div>

      {/* Exchange form */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-text-secondary">
            You {side === 'BUY' ? 'Pay' : 'Send'} ({fromCurrency})
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-border bg-surface-base px-3 py-2.5 focus-within:ring-2 focus-within:ring-border-focus">
            <span className="text-sm font-bold text-text-secondary">{CURRENCY_SYMBOLS[fromCurrency]}</span>
            <input
              type="number"
              min="0"
              step="any"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              className="flex-1 min-w-0 bg-transparent text-sm text-text-primary outline-none"
              aria-label={`Amount in ${fromCurrency}`}
            />
            <span className="text-xs text-text-secondary shrink-0">{fromCurrency}</span>
          </div>
        </div>

        <div className="space-y-1.5">
          <label className="text-xs font-medium text-text-secondary">
            You {side === 'BUY' ? 'Receive' : 'Get'} ({toCurrency})
          </label>
          <div className="flex items-center gap-2 rounded-lg border border-border-strong bg-surface-overlay px-3 py-2.5">
            <span className="text-sm font-bold text-text-secondary">{CURRENCY_SYMBOLS[toCurrency]}</span>
            <span className="flex-1 text-sm font-semibold text-text-primary">
              {convertedAmount.toLocaleString('en', { minimumFractionDigits: 2, maximumFractionDigits: 6 })}
            </span>
            <span className="text-xs text-text-secondary shrink-0">{toCurrency}</span>
          </div>
        </div>
      </div>

      {/* Rate row */}
      <div className="flex flex-wrap items-center justify-between gap-2 px-1 text-xs text-text-secondary">
        <span>
          1 {fromCurrency} ={' '}
          <strong className="text-text-primary">
            {activeRate.toLocaleString('en', { maximumFractionDigits: 6 })}
          </strong>{' '}
          {toCurrency}
        </span>
        <span className="flex items-center gap-1">
          <FontAwesomeIcon icon={faInfoCircle} className="w-3 h-3" aria-hidden="true" />
          Spread {pair.spread}%
        </span>
      </div>

      {/* CTA */}
      <button
        className={cn(
          'w-full rounded-lg py-2.5 text-sm font-semibold text-white transition-colors',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-border-focus',
          'disabled:opacity-50 disabled:cursor-not-allowed',
          side === 'BUY' ? 'bg-success hover:bg-green-600' : 'bg-error hover:bg-red-600',
        )}
        disabled={!numAmount}
      >
        {side === 'BUY' ? 'Buy' : 'Sell'} {pair.from}
      </button>
    </div>
  );
}
