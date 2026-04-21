'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { ComboBox, type ComboBoxOption } from '@/modules/ui/ComboBox';
import { DateRangePicker, type DateRange } from '@/modules/ui/DateRangePicker';
import { MultiSelect, type MultiSelectOption } from '@/modules/ui/MultiSelect';
import { Button } from '@/modules/ui/Button';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';

const CLASS_ITEMS: ButtonGroupItem[] = [
  { value: 'economy',  label: 'Economy'  },
  { value: 'business', label: 'Business' },
  { value: 'first',    label: 'First'    },
];

const STOP_OPTIONS: MultiSelectOption[] = [
  { value: 'nonstop', label: 'Non-stop' },
  { value: '1stop',   label: '1 stop'   },
  { value: '2stop',   label: '2+ stops' },
];

export function FlightSearchPanel({
  airportOptions,
  onSearch,
  className,
}: {
  airportOptions: ComboBoxOption[];
  onSearch?: (params: {
    origin: string; destination: string;
    dates: DateRange; cabinClass: string;
    passengers: string; stops: string[];
  }) => void;
  className?: string;
}) {
  const [tripType,    setTripType]    = useState('roundtrip');
  const [origin,      setOrigin]      = useState('');
  const [destination, setDestination] = useState('');
  const [dates,       setDates]       = useState<DateRange>({ start: null, end: null });
  const [cabinClass,  setCabinClass]  = useState('economy');
  const [passengers,  setPassengers]  = useState('1');
  const [stops,       setStops]       = useState<string[]>([]);
  const [errors,      setErrors]      = useState<Record<string, string>>({});

  const TRIP_ITEMS: ButtonGroupItem[] = [
    { value: 'roundtrip', label: 'Round trip' },
    { value: 'oneway',    label: 'One way'    },
  ];

  function validate() {
    const e: Record<string, string> = {};
    if (!origin)      e.origin      = 'Select origin';
    if (!destination) e.destination = 'Select destination';
    if (!dates.start) e.dates       = 'Select departure date';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSearch() {
    if (!validate()) return;
    onSearch?.({ origin, destination, dates, cabinClass, passengers, stops });
  }

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center gap-3">
        <ButtonGroup items={TRIP_ITEMS} value={tripType} onChange={setTripType} variant="outline" size="sm" />
        <ButtonGroup items={CLASS_ITEMS} value={cabinClass} onChange={setCabinClass} variant="outline" size="sm" />
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <ComboBox id="flight-origin"  label="From" options={airportOptions} value={origin}      onChange={setOrigin}      placeholder="City or airport…" error={errors.origin}      required />
        <ComboBox id="flight-dest"    label="To"   options={airportOptions} value={destination} onChange={setDestination} placeholder="City or airport…" error={errors.destination} required />
      </div>

      <DateRangePicker
        id="flight-dates"
        label={tripType === 'roundtrip' ? 'Departure – Return' : 'Departure date'}
        value={dates}
        onChange={setDates}
      />
      {errors.dates && <p className="text-xs text-error-fg -mt-3">{errors.dates}</p>}

      <div className="grid sm:grid-cols-2 gap-4">
        <Input id="flight-passengers" label="Passengers" type="number" value={passengers} onChange={(e) => setPassengers(e.target.value)} />
        <MultiSelect id="flight-stops" label="Stops" options={STOP_OPTIONS} value={stops} onChange={setStops} placeholder="Any" />
      </div>

      <Button variant="primary" fullWidth onClick={handleSearch} iconLeft="✈">
        Search flights
      </Button>
    </div>
  );
}
