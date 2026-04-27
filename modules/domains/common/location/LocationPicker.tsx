'use client';
import { useState } from 'react';
import { getCountryDataList } from 'countries-list';
import { Form } from '@/modules/app/Form';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';
import type { Location } from '../LocationTypes';

type LocationPickerProps = {
  initial?: Partial<Location>;
  onSubmit: (location: Location) => Promise<void> | void;
  onCancel?: () => void;
  error?: string;
  className?: string;
};

const COUNTRY_OPTIONS = getCountryDataList()
  .sort((a, b) => a.name.localeCompare(b.name))
  .map((c) => ({ value: c.iso2, label: c.name }));

export function LocationPicker({ initial = {}, onSubmit, onCancel, error, className }: LocationPickerProps) {
  const [values, setValues] = useState<Location>({
    city:        initial.city        ?? null,
    state:       initial.state       ?? null,
    country:     initial.country     ?? null,
    countryCode: initial.countryCode ?? null,
    postalCode:  initial.postalCode  ?? null,
    latitude:    initial.latitude    ?? null,
    longitude:   initial.longitude   ?? null,
  });
  const [loading, setLoading] = useState(false);

  function set<K extends keyof Location>(key: K, val: Location[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  function handleCountry(code: string) {
    const country = COUNTRY_OPTIONS.find((c) => c.value === code);
    set('countryCode', code || null);
    set('country', country?.label ?? null);
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(values); } finally { setLoading(false); }
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      columns={2}
      className={className}
      actions={
        <>
          {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>}
          <Button type="submit" loading={loading}>Save Location</Button>
        </>
      }
    >
      <Select
        id="loc-country"
        label="Country"
        options={[{ value: '', label: 'Select country…' }, ...COUNTRY_OPTIONS]}
        value={values.countryCode ?? ''}
        onChange={(e) => handleCountry(e.target.value)}
      />

      <Input
        id="loc-city"
        label="City"
        value={values.city ?? ''}
        onChange={(e) => set('city', e.target.value || null)}
      />

      <Input
        id="loc-state"
        label="State / Province"
        value={values.state ?? ''}
        onChange={(e) => set('state', e.target.value || null)}
      />

      <Input
        id="loc-postal"
        label="Postal Code"
        value={values.postalCode ?? ''}
        onChange={(e) => set('postalCode', e.target.value || null)}
      />

      <Input
        id="loc-lat"
        label="Latitude"
        type="number"
        value={values.latitude ?? ''}
        onChange={(e) => set('latitude', e.target.value ? parseFloat(e.target.value) : null)}
      />

      <Input
        id="loc-lng"
        label="Longitude"
        type="number"
        value={values.longitude ?? ''}
        onChange={(e) => set('longitude', e.target.value ? parseFloat(e.target.value) : null)}
      />
    </Form>
  );
}
