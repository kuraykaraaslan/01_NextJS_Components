'use client';
import { useEffect, useState, useCallback, useRef } from 'react';
import type * as ReactLeaflet from 'react-leaflet';
import type * as LeafletLib from 'leaflet';
import { cn } from '@/libs/utils/cn';
import { Button } from '@/modules/ui/Button';
import { Card } from '@/modules/ui/Card';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
  faLocationDot,
  faRoute,
  faLayerGroup,
  faPlus,
  faXmark,
  faEye,
  faEyeSlash,
} from '@fortawesome/free-solid-svg-icons';

// ─── types ────────────────────────────────────────────────────────────────────

export type MapVariant = 'primary' | 'success' | 'warning' | 'error' | 'info' | 'neutral';

export type MapTooltipField = { label: string; value: string };

export type MapTooltipData = {
  title: string;
  description?: string;
  fields?: MapTooltipField[];
};

export type MapMarker = {
  id: string;
  position: [number, number];
  variant?: MapVariant;
  tooltip?: MapTooltipData;
  label?: string;
};

export type MapZone = {
  id: string;
  positions: [number, number][];
  label?: string;
  variant?: MapVariant;
  fillOpacity?: number;
};

export type MapRoute = {
  id: string;
  positions: [number, number][];
  label?: string;
  color?: string;
  weight?: number;
  dashed?: boolean;
};

type MapViewProps = {
  center?: [number, number];
  zoom?: number;
  markers?: MapMarker[];
  zones?: MapZone[];
  routes?: MapRoute[];
  onMarkerAdd?: (position: [number, number]) => void;
  onMarkerClick?: (id: string) => void;
  height?: string | number;
  className?: string;
};

// ─── color maps ───────────────────────────────────────────────────────────────

const VARIANT_HEX: Record<MapVariant, string> = {
  primary: '#3b82f6',
  success: '#22c55e',
  warning: '#f59e0b',
  error:   '#ef4444',
  info:    '#06b6d4',
  neutral: '#6b7280',
};

const VARIANT_FILL: Record<MapVariant, string> = {
  primary: '#3b82f620',
  success: '#22c55e20',
  warning: '#f59e0b20',
  error:   '#ef444420',
  info:    '#06b6d420',
  neutral: '#6b728020',
};

// ─── helpers ──────────────────────────────────────────────────────────────────

function markerSvg(color: string): string {
  return `
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="24" height="36" style="filter:drop-shadow(0 2px 3px rgba(0,0,0,0.35))">
      <path d="M12 0C5.373 0 0 5.373 0 12c0 3.143 1.204 5.997 3.17 8.126L12 36l8.83-15.874A11.945 11.945 0 0 0 24 12C24 5.373 18.627 0 12 0z" fill="${color}"/>
      <circle cx="12" cy="12" r="4.5" fill="white" opacity="0.9"/>
    </svg>`;
}

function TooltipContent({ tooltip }: { tooltip: MapTooltipData }) {
  return (
    <div style={{ minWidth: 130, maxWidth: 220 }}>
      <p style={{ fontWeight: 600, fontSize: 13, color: '#111827', marginBottom: tooltip.description || tooltip.fields?.length ? 3 : 0 }}>
        {tooltip.title}
      </p>
      {tooltip.description && (
        <p style={{ fontSize: 11, color: '#6b7280', marginBottom: tooltip.fields?.length ? 4 : 0, lineHeight: 1.4 }}>
          {tooltip.description}
        </p>
      )}
      {tooltip.fields && tooltip.fields.length > 0 && (
        <table style={{ width: '100%', borderCollapse: 'collapse', marginTop: 2 }}>
          <tbody>
            {tooltip.fields.map((f, i) => (
              <tr key={i}>
                <td style={{ fontSize: 11, color: '#6b7280', paddingRight: 6, paddingTop: 1, whiteSpace: 'nowrap' }}>{f.label}</td>
                <td style={{ fontSize: 11, color: '#111827', fontWeight: 500, paddingTop: 1 }}>{f.value}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

// ─── inner map components (only rendered client-side after mount) ─────────────

function MapInner({
  center,
  zoom,
  markers,
  zones,
  routes,
  showZones,
  showRoutes,
  addMode,
  onMapClick,
  onMarkerClick,
}: {
  center: [number, number];
  zoom: number;
  markers: MapMarker[];
  zones: MapZone[];
  routes: MapRoute[];
  showZones: boolean;
  showRoutes: boolean;
  addMode: boolean;
  onMapClick: (lat: number, lng: number) => void;
  onMarkerClick?: (id: string) => void;
}) {
  type LeafletComps = {
    MapContainer: typeof ReactLeaflet.MapContainer;
    TileLayer:    typeof ReactLeaflet.TileLayer;
    Marker:       typeof ReactLeaflet.Marker;
    Tooltip:      typeof ReactLeaflet.Tooltip;
    Polygon:      typeof ReactLeaflet.Polygon;
    Polyline:     typeof ReactLeaflet.Polyline;
    useMapEvents: typeof ReactLeaflet.useMapEvents;
    L:            typeof LeafletLib;
  };

  const [Comps, setComps] = useState<LeafletComps | null>(null);

  useEffect(() => {
    (async () => {
      const [rl, leaflet] = await Promise.all([
        import('react-leaflet'),
        import('leaflet'),
      ]);
      setComps({
        MapContainer: rl.MapContainer,
        TileLayer:    rl.TileLayer,
        Marker:       rl.Marker,
        Tooltip:      rl.Tooltip,
        Polygon:      rl.Polygon,
        Polyline:     rl.Polyline,
        useMapEvents: rl.useMapEvents,
        L:            leaflet as unknown as typeof LeafletLib,
      });
    })();
  }, []);

  if (!Comps) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-surface-raised">
        <span className="text-sm text-text-secondary">Harita yükleniyor…</span>
      </div>
    );
  }

  const { MapContainer, TileLayer, Marker, Tooltip, Polygon, Polyline, useMapEvents, L } = Comps;

  function ClickHandler() {
    useMapEvents({
      click(e: { latlng: { lat: number; lng: number } }) {
        if (addMode) onMapClick(e.latlng.lat, e.latlng.lng);
      },
    });
    return null;
  }

  return (
    <MapContainer
      center={center}
      zoom={zoom}
      style={{ width: '100%', height: '100%' }}
      className={addMode ? 'cursor-crosshair' : ''}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      <ClickHandler />

      {showZones && zones.map((zone) => {
        const variant = zone.variant ?? 'primary';
        const strokeColor = VARIANT_HEX[variant];
        const fillColor = VARIANT_FILL[variant];
        return (
          <Polygon
            key={zone.id}
            positions={zone.positions}
            pathOptions={{
              color: strokeColor,
              fillColor,
              fillOpacity: zone.fillOpacity ?? 0.25,
              weight: 2,
            }}
          >
            {zone.label && (
              <Tooltip sticky>
                <span style={{ fontWeight: 600, fontSize: 12, color: strokeColor }}>{zone.label}</span>
              </Tooltip>
            )}
          </Polygon>
        );
      })}

      {showRoutes && routes.map((route) => (
        <Polyline
          key={route.id}
          positions={route.positions}
          pathOptions={{
            color: route.color ?? VARIANT_HEX.primary,
            weight: route.weight ?? 3,
            dashArray: route.dashed ? '8 6' : undefined,
          }}
        >
          {route.label && (
            <Tooltip sticky>
              <span style={{ fontWeight: 600, fontSize: 12 }}>{route.label}</span>
            </Tooltip>
          )}
        </Polyline>
      ))}

      {markers.map((marker) => {
        const variant = marker.variant ?? 'primary';
        const color = VARIANT_HEX[variant];
        const icon = L.divIcon({
          html: markerSvg(color),
          className: '',
          iconSize: [24, 36],
          iconAnchor: [12, 36],
          tooltipAnchor: [0, -38],
        });
        return (
          <Marker
            key={marker.id}
            position={marker.position}
            icon={icon}
            eventHandlers={{
              click: () => onMarkerClick?.(marker.id),
            }}
          >
            {marker.tooltip && (
              <Tooltip>
                <TooltipContent tooltip={marker.tooltip} />
              </Tooltip>
            )}
            {!marker.tooltip && marker.label && (
              <Tooltip>
                <span style={{ fontSize: 12, fontWeight: 600 }}>{marker.label}</span>
              </Tooltip>
            )}
          </Marker>
        );
      })}
    </MapContainer>
  );
}

// ─── main component ───────────────────────────────────────────────────────────

export function MapView({
  center = [39.9334, 32.8597],
  zoom = 6,
  markers = [],
  zones = [],
  routes = [],
  onMarkerAdd,
  onMarkerClick,
  height = 480,
  className,
}: MapViewProps) {
  const [mounted, setMounted] = useState(false);
  const [addMode, setAddMode] = useState(false);
  const [showZones, setShowZones] = useState(true);
  const [showRoutes, setShowRoutes] = useState(true);
  const [extraMarkers, setExtraMarkers] = useState<MapMarker[]>([]);
  const markerCounter = useRef(0);

  useEffect(() => { setMounted(true); }, []);

  const allMarkers = [...markers, ...extraMarkers];

  const handleMapClick = useCallback((lat: number, lng: number) => {
    const pos: [number, number] = [lat, lng];
    if (onMarkerAdd) {
      onMarkerAdd(pos);
    } else {
      markerCounter.current += 1;
      setExtraMarkers((prev) => [
        ...prev,
        {
          id: `auto-${markerCounter.current}`,
          position: pos,
          variant: 'primary',
          tooltip: {
            title: `İşaretçi ${markerCounter.current}`,
            fields: [
              { label: 'Enlem', value: lat.toFixed(5) },
              { label: 'Boylam', value: lng.toFixed(5) },
            ],
          },
        },
      ]);
    }
    setAddMode(false);
  }, [onMarkerAdd]);

  const cssHeight = typeof height === 'number' ? `${height}px` : height;

  const toolbar = (
    <div className="flex items-center gap-2 flex-wrap">
      <Button
        size="xs"
        variant={addMode ? 'primary' : 'outline'}
        title={addMode ? 'İşaretçi eklemeyi iptal et' : 'Haritaya işaretçi ekle'}
        onClick={() => setAddMode((v) => !v)}
        iconLeft={<FontAwesomeIcon icon={addMode ? faXmark : faPlus} aria-hidden="true" />}
        iconRight={<FontAwesomeIcon icon={faLocationDot} aria-hidden="true" />}
      >
        {addMode ? 'İptal' : 'İşaretçi Ekle'}
      </Button>

      {zones.length > 0 && (
        <Button
          size="xs"
          variant={showZones ? 'primary' : 'outline'}
          title={showZones ? 'Bölgeleri gizle' : 'Bölgeleri göster'}
          onClick={() => setShowZones((v) => !v)}
          iconLeft={<FontAwesomeIcon icon={showZones ? faEye : faEyeSlash} aria-hidden="true" />}
          iconRight={<FontAwesomeIcon icon={faLayerGroup} aria-hidden="true" />}
        >
          Bölgeler
        </Button>
      )}

      {routes.length > 0 && (
        <Button
          size="xs"
          variant={showRoutes ? 'primary' : 'outline'}
          title={showRoutes ? 'Rotaları gizle' : 'Rotaları göster'}
          onClick={() => setShowRoutes((v) => !v)}
          iconLeft={<FontAwesomeIcon icon={showRoutes ? faEye : faEyeSlash} aria-hidden="true" />}
          iconRight={<FontAwesomeIcon icon={faRoute} aria-hidden="true" />}
        >
          Rotalar
        </Button>
      )}

      {addMode && (
        <span className="text-xs text-primary font-medium animate-pulse">
          Haritaya tıklayarak işaretçi ekleyin
        </span>
      )}
    </div>
  );

  return (
    <Card variant="raised" className={cn('overflow-hidden', className)}>
      {/*
       * Card wraps children in `px-6 py-4`. The negative-margin wrapper below
       * cancels that padding so the toolbar and map render edge-to-edge while
       * still sitting inside Card's rounded border.
       *
       * `isolation: isolate` on the map div creates a new stacking context so
       * Leaflet's internal z-indexes (up to 1000) don't escape and overlap
       * elements outside this component (e.g. a fixed site header).
       */}
      <div className="-mx-6 -my-4 flex flex-col">
        {/* toolbar */}
        <div className="px-4 py-2.5 bg-surface-raised border-b border-border">
          {toolbar}
        </div>

        {/* map */}
        <div style={{ height: cssHeight, isolation: 'isolate' }}>
          {!mounted ? (
            <div className="w-full h-full flex items-center justify-center bg-surface-raised">
              <span className="text-sm text-text-secondary">Harita yükleniyor…</span>
            </div>
          ) : (
            <MapInner
              center={center}
              zoom={zoom}
              markers={allMarkers}
              zones={zones}
              routes={routes}
              showZones={showZones}
              showRoutes={showRoutes}
              addMode={addMode}
              onMapClick={handleMapClick}
              onMarkerClick={onMarkerClick}
            />
          )}
        </div>
      </div>
    </Card>
  );
}
