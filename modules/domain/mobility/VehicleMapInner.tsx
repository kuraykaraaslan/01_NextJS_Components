'use client';
import 'leaflet/dist/leaflet.css';
import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Polygon, Marker, useMapEvents, Tooltip } from 'react-leaflet';
import L from 'leaflet';
import type { VehicleCardItem, ServiceZone } from '@/app/theme/rental/rental.data';
import { findZoneForPoint } from '@/app/theme/rental/rental.data';

// ─── Props ─────────────────────────────────────────────────────────────────────

type Props = {
  vehicles: VehicleCardItem[];
  zones: ServiceZone[];
  userPosition: [number, number];
  activeVehicleId: string | null;
  onVehicleSelect: (v: VehicleCardItem) => void;
  onMapClick: (lat: number, lng: number) => void;
  className?: string;
};

// ─── Click handler ─────────────────────────────────────────────────────────────

function MapClickHandler({ onMapClick }: { onMapClick: (lat: number, lng: number) => void }) {
  useMapEvents({
    click(e) {
      onMapClick(e.latlng.lat, e.latlng.lng);
    },
  });
  return null;
}

// ─── Vehicle marker factory ────────────────────────────────────────────────────

function makeVehicleIcon(vehicle: VehicleCardItem, isActive: boolean) {
  const bg   = !vehicle.available ? '#9ca3af' : isActive ? '#ef4444' : '#3b82f6';
  const html = `
    <div style="
      background:${bg};
      color:white;
      border-radius:50% 50% 50% 0;
      transform:rotate(-45deg);
      width:36px;height:36px;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,.35);
      border:2px solid white;
    ">
      <span style="transform:rotate(45deg);font-size:16px;line-height:1">${vehicle.emoji}</span>
    </div>`;
  return L.divIcon({ html, className: '', iconSize: [36, 36], iconAnchor: [18, 36] });
}

function makeUserIcon() {
  const html = `
    <div style="
      background:#7c3aed;
      color:white;
      border-radius:50%;
      width:28px;height:28px;
      display:flex;align-items:center;justify-content:center;
      box-shadow:0 2px 8px rgba(0,0,0,.4);
      border:3px solid white;
      font-size:13px;
    ">📍</div>`;
  return L.divIcon({ html, className: '', iconSize: [28, 28], iconAnchor: [14, 14] });
}

// ─── Main map component ────────────────────────────────────────────────────────

export function VehicleMapInner({
  vehicles,
  zones,
  userPosition,
  activeVehicleId,
  onVehicleSelect,
  onMapClick,
  className,
}: Props) {
  const userZone = findZoneForPoint(userPosition[0], userPosition[1]);

  return (
    <MapContainer
      center={[41.040, 29.010]}
      zoom={12}
      className={className}
      style={{ height: '100%', width: '100%' }}
      zoomControl={true}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <MapClickHandler onMapClick={onMapClick} />

      {/* Service zone polygons */}
      {zones.map((zone) => (
        <Polygon
          key={zone.id}
          positions={zone.polygon as [number, number][]}
          pathOptions={{
            color:       zone.color,
            fillColor:   zone.color,
            fillOpacity: 0.14,
            weight:      2.5,
            dashArray:   '8 5',
            lineCap:     'round',
            lineJoin:    'round',
          }}
        >
          <Tooltip
            sticky
            direction="center"
            permanent={false}
            opacity={0.92}
          >
            <div style={{ textAlign: 'center', lineHeight: 1.4 }}>
              <div style={{
                display: 'inline-block',
                width: 10, height: 10,
                borderRadius: '50%',
                background: zone.color,
                marginRight: 5,
                verticalAlign: 'middle',
              }} />
              <strong style={{ fontSize: 12 }}>{zone.name}</strong>
              <div style={{ fontSize: 11, color: '#6b7280' }}>Servis bölgesi</div>
            </div>
          </Tooltip>
        </Polygon>
      ))}

      {/* Vehicle markers */}
      {vehicles.map((v) => (
        <Marker
          key={v.id}
          position={[v.lat, v.lng]}
          icon={makeVehicleIcon(v, v.id === activeVehicleId)}
          eventHandlers={{
            click: () => { if (v.available) onVehicleSelect(v); },
          }}
          opacity={v.available ? 1 : 0.5}
        >
          <Tooltip direction="top" offset={[0, -36]} opacity={1}>
            <div style={{ fontSize: 12, lineHeight: '1.4' }}>
              <strong>{v.brand} {v.name}</strong><br />
              {v.available ? `€${v.pricePerMinute.toFixed(2)}/min · €${v.pricePerDay}/day` : 'Unavailable'}
            </div>
          </Tooltip>
        </Marker>
      ))}

      {/* User position marker */}
      <Marker position={userPosition} icon={makeUserIcon()}>
        <Tooltip direction="top" offset={[0, -14]} opacity={1} permanent={false}>
          <span style={{ fontSize: 12 }}>
            You are here
            {userZone ? ` · ${userZone.name}` : ' · Outside service zone'}
          </span>
        </Tooltip>
      </Marker>
    </MapContainer>
  );
}
