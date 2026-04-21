'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import type { VehicleCategory } from '@/app/theme/rental/rental.data';

type VehicleSearchPanelProps = {
  onSearch?: (params: SearchParams) => void;
  compact?: boolean;
  className?: string;
};

export type SearchParams = {
  location: string;
  dateFrom: string;
  dateTo: string;
  category: VehicleCategory | '';
};

const categoryOptions = [
  { value: '',         label: 'All vehicles'  },
  { value: 'compact',  label: 'Compact'        },
  { value: 'sedan',    label: 'Sedan'          },
  { value: 'suv',      label: 'SUV'            },
  { value: 'electric', label: 'Electric'       },
  { value: 'van',      label: 'Van'            },
  { value: 'luxury',   label: 'Luxury'         },
];

export function VehicleSearchPanel({ onSearch, compact = false, className }: VehicleSearchPanelProps) {
  const [location, setLocation]   = useState('');
  const [dateFrom, setDateFrom]   = useState('');
  const [dateTo, setDateTo]       = useState('');
  const [category, setCategory]   = useState<VehicleCategory | ''>('');

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSearch?.({ location, dateFrom, dateTo, category });
  }

  if (compact) {
    return (
      <form
        onSubmit={handleSubmit}
        className={cn(
          'flex flex-col sm:flex-row items-end gap-3 p-4 rounded-2xl bg-surface-base border border-border shadow-sm',
          className
        )}
      >
        <div className="flex-1 min-w-0">
          <Input id="compact-location" label="Location" value={location} onChange={(e) => setLocation(e.target.value)} placeholder="City or district" />
        </div>
        <div className="w-full sm:w-40">
          <Input id="compact-from" label="From" type="date" value={dateFrom} onChange={(e) => setDateFrom(e.target.value)} />
        </div>
        <div className="w-full sm:w-40">
          <Input id="compact-to" label="To" type="date" value={dateTo} onChange={(e) => setDateTo(e.target.value)} />
        </div>
        <Button variant="primary" type="submit" className="shrink-0 w-full sm:w-auto">Search</Button>
      </form>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className={cn(
        'rounded-2xl bg-surface-base border border-border shadow-lg p-6 space-y-4',
        className
      )}
    >
      <h2 className="text-lg font-bold text-text-primary">Find your ride</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <Input
          id="search-location"
          label="Pick-up location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Istanbul, Kadıköy…"
        />
        <Select
          id="search-category"
          label="Vehicle type"
          options={categoryOptions}
          value={category}
          onChange={(e) => setCategory(e.target.value as VehicleCategory | '')}
        />
        <Input
          id="search-from"
          label="From"
          type="date"
          value={dateFrom}
          onChange={(e) => setDateFrom(e.target.value)}
        />
        <Input
          id="search-to"
          label="To"
          type="date"
          value={dateTo}
          onChange={(e) => setDateTo(e.target.value)}
        />
      </div>

      <Button variant="primary" size="lg" fullWidth type="submit">
        Search available vehicles
      </Button>
    </form>
  );
}
