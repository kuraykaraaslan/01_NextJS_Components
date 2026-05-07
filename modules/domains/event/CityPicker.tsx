'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLocationDot } from '@fortawesome/free-solid-svg-icons';
import { useNavPopover } from './useNavPopover';
import { NavDropdown, NavDropdownHeader, NavTriggerButton } from './NavDropdown';

export type CityOption = {
  id: string;
  label: string;
  count: number;
};

const DEFAULT_CITIES: CityOption[] = [
  { id: 'istanbul',  label: 'İstanbul',  count: 142 },
  { id: 'ankara',    label: 'Ankara',    count: 58  },
  { id: 'izmir',     label: 'İzmir',     count: 43  },
  { id: 'bursa',     label: 'Bursa',     count: 21  },
  { id: 'antalya',   label: 'Antalya',   count: 17  },
  { id: 'adana',     label: 'Adana',     count: 9   },
  { id: 'konya',     label: 'Konya',     count: 8   },
  { id: 'gaziantep', label: 'Gaziantep', count: 6   },
];

type CityPickerProps = {
  cities?: CityOption[];
  allCitiesHref?: string;
};

export function CityPicker({ cities = DEFAULT_CITIES, allCitiesHref = '#' }: CityPickerProps) {
  const { open, setOpen, ref } = useNavPopover();
  const [city, setCity] = useState(cities[0]);

  return (
    <div ref={ref} className="relative">
      <NavTriggerButton onClick={() => setOpen((p) => !p)} expanded={open}>
        <FontAwesomeIcon icon={faLocationDot} className="w-3 h-3" aria-hidden="true" />
        <span>{city.label}</span>
      </NavTriggerButton>

      {open && (
        <NavDropdown>
          <NavDropdownHeader>Şehir Seç</NavDropdownHeader>
          <ul role="listbox" className="py-1 max-h-64 overflow-y-auto w-52">
            {cities.map((c) => {
              const active = c.id === city.id;
              return (
                <li key={c.id}>
                  <button
                    role="option"
                    aria-selected={active}
                    onClick={() => { setCity(c); setOpen(false); }}
                    className="w-full flex items-center justify-between px-3 py-2 text-sm text-left transition-colors"
                    style={{
                      color: active ? '#fff' : 'rgba(255,255,255,0.6)',
                      background: active ? 'rgba(59,130,246,0.15)' : 'transparent',
                      fontWeight: active ? 600 : 400,
                    }}
                    onMouseOver={(e) => { if (!active) e.currentTarget.style.background = 'rgba(255,255,255,0.05)'; }}
                    onMouseOut={(e) => { if (!active) e.currentTarget.style.background = 'transparent'; }}
                  >
                    <span>{c.label}</span>
                    <span className="text-xs tabular-nums" style={{ color: 'rgba(255,255,255,0.28)' }}>{c.count}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div className="px-3 py-2" style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}>
            <button onClick={() => setOpen(false)} className="text-xs text-blue-400 hover:text-blue-300 transition-colors">
              <a href={allCitiesHref}>Tüm şehirler →</a>
            </button>
          </div>
        </NavDropdown>
      )}
    </div>
  );
}
