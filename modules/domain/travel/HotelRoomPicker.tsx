'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { MultiSelect, type MultiSelectOption } from '@/modules/ui/MultiSelect';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';

export type HotelRoom = {
  id: string;
  name: string;
  type: string;
  sqm: number;
  maxOccupants: number;
  pricePerNight: number;
  currency?: string;
  amenities: string[];
  images?: string[];
  available: boolean;
  badge?: string;
};

const AMENITY_OPTIONS: MultiSelectOption[] = [
  { value: 'wifi',       label: 'Wi-Fi'         },
  { value: 'breakfast',  label: 'Breakfast'      },
  { value: 'pool',       label: 'Pool access'    },
  { value: 'gym',        label: 'Gym'            },
  { value: 'parking',    label: 'Parking'        },
  { value: 'ac',         label: 'Air conditioning' },
  { value: 'balcony',    label: 'Balcony'        },
  { value: 'oceanview',  label: 'Ocean view'     },
];

export function HotelRoomPicker({
  rooms,
  nights = 1,
  onSelect,
  className,
}: {
  rooms: HotelRoom[];
  nights?: number;
  onSelect?: (room: HotelRoom) => void;
  className?: string;
}) {
  const [amenityFilter, setAmenityFilter] = useState<string[]>([]);

  const filtered = rooms.filter((r) =>
    amenityFilter.every((a) => r.amenities.includes(a))
  );

  return (
    <div className={cn('space-y-4', className)}>
      <MultiSelect
        id="room-amenities-filter"
        label="Filter by amenities"
        options={AMENITY_OPTIONS}
        value={amenityFilter}
        onChange={setAmenityFilter}
        placeholder="Any amenities"
      />

      <p className="text-sm text-text-secondary">{filtered.length} room{filtered.length !== 1 ? 's' : ''} available</p>

      <div className="space-y-3">
        {filtered.map((room) => {
          const fmt = new Intl.NumberFormat('en-US', { style: 'currency', currency: room.currency ?? 'USD', maximumFractionDigits: 0 }).format;
          return (
            <Card key={room.id} variant={room.available ? 'raised' : 'flat'} hoverable={room.available}>
              <div className="flex flex-col sm:flex-row">
                {room.images?.[0] ? (
                  <img src={room.images[0]} alt={room.name} className="w-full sm:w-32 h-24 object-cover rounded-tl-xl rounded-tr-xl sm:rounded-tr-none sm:rounded-bl-xl shrink-0" />
                ) : (
                  <div className="w-full sm:w-32 h-24 bg-surface-sunken flex items-center justify-center text-2xl text-text-disabled rounded-tl-xl rounded-tr-xl sm:rounded-tr-none sm:rounded-bl-xl shrink-0">🛏</div>
                )}
                <div className="flex-1 p-3 space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-sm font-semibold text-text-primary">{room.name}</p>
                        {room.badge && <Badge variant="primary" size="sm">{room.badge}</Badge>}
                        {!room.available && <Badge variant="error" size="sm">Unavailable</Badge>}
                      </div>
                      <p className="text-xs text-text-secondary">{room.type} · {room.sqm} m² · max {room.maxOccupants} guests</p>
                    </div>
                    <div className="text-right shrink-0">
                      <p className="text-base font-bold text-text-primary">{fmt(room.pricePerNight)}</p>
                      <p className="text-xs text-text-disabled">/night</p>
                      {nights > 1 && <p className="text-xs text-text-secondary font-medium">{fmt(room.pricePerNight * nights)} total</p>}
                    </div>
                  </div>
                  <div className="flex flex-wrap gap-1">
                    {room.amenities.slice(0, 5).map((a) => (
                      <Badge key={a} variant="neutral" size="sm">{a}</Badge>
                    ))}
                    {room.amenities.length > 5 && (
                      <Badge variant="neutral" size="sm">+{room.amenities.length - 5}</Badge>
                    )}
                  </div>
                  {room.available && (
                    <Button variant="primary" size="sm" onClick={() => onSelect?.(room)}>
                      Select room
                    </Button>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}
