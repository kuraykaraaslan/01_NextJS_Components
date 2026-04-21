'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Modal } from '@/modules/ui/Modal';
import { Tooltip } from '@/modules/ui/Tooltip';
import { ButtonGroup, type ButtonGroupItem } from '@/modules/ui/ButtonGroup';
import { Card } from '@/modules/ui/Card';
import { Button } from '@/modules/ui/Button';

export type FloorPlan = {
  id: string;
  label: string;
  imageUrl?: string;
  rooms: { name: string; sqm: number; x: string; y: string }[];
};

const ZOOM_ITEMS: ButtonGroupItem[] = [
  { value: '50',  label: '50%'  },
  { value: '100', label: '100%' },
  { value: '150', label: '150%' },
];

export function FloorPlanViewerPanel({
  plans,
  propertyTitle,
  className,
}: {
  plans: FloorPlan[];
  propertyTitle: string;
  className?: string;
}) {
  const [open,        setOpen]        = useState(false);
  const [activeFloor, setActiveFloor] = useState(plans[0]?.id ?? '');
  const [zoom,        setZoom]        = useState('100');

  const current = plans.find((p) => p.id === activeFloor) ?? plans[0];

  const floorItems: ButtonGroupItem[] = plans.map((p) => ({ value: p.id, label: p.label }));

  return (
    <>
      <Card variant="outline" className={className}>
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-sm font-semibold text-text-primary">Floor plans</p>
            <Button variant="outline" size="sm" onClick={() => setOpen(true)} iconLeft="⊡">
              View full plan
            </Button>
          </div>

          <ButtonGroup items={floorItems} value={activeFloor} onChange={setActiveFloor} variant="outline" size="sm" />

          {current && (
            <div className="rounded-lg bg-surface-sunken overflow-hidden h-40 flex items-center justify-center cursor-pointer" onClick={() => setOpen(true)}>
              {current.imageUrl ? (
                <img src={current.imageUrl} alt={current.label} className="max-h-full max-w-full object-contain" />
              ) : (
                <span className="text-text-disabled text-sm">Click to view floor plan</span>
              )}
            </div>
          )}
        </div>
      </Card>

      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title={`${propertyTitle} – ${current?.label ?? 'Floor plan'}`}
        size="lg"
      >
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <ButtonGroup items={floorItems} value={activeFloor} onChange={setActiveFloor} variant="outline" size="sm" />
            <ButtonGroup items={ZOOM_ITEMS} value={zoom} onChange={setZoom} variant="outline" size="sm" />
          </div>

          <div className="relative rounded-lg bg-surface-sunken overflow-auto h-80 flex items-center justify-center">
            {current?.imageUrl ? (
              <img
                src={current.imageUrl}
                alt={current.label}
                style={{ transform: `scale(${parseInt(zoom) / 100})`, transformOrigin: 'center' }}
                className="transition-transform"
              />
            ) : (
              <div className="text-text-disabled text-center space-y-2">
                <div className="text-4xl">📐</div>
                <p className="text-sm">Floor plan image</p>
              </div>
            )}

            {current?.rooms.map((room) => (
              <Tooltip key={room.name} content={`${room.name} – ${room.sqm} m²`}>
                <div
                  className="absolute cursor-pointer text-xs bg-primary/20 border border-primary/40 rounded px-1 py-0.5 text-primary font-medium"
                  style={{ left: room.x, top: room.y }}
                >
                  {room.name}
                </div>
              </Tooltip>
            ))}
          </div>

          {current?.rooms.length > 0 && (
            <div className="grid grid-cols-3 gap-2">
              {current.rooms.map((r) => (
                <div key={r.name} className="text-xs p-2 rounded bg-surface-overlay text-center">
                  <p className="font-medium text-text-primary">{r.name}</p>
                  <p className="text-text-secondary">{r.sqm} m²</p>
                </div>
              ))}
            </div>
          )}
        </div>
      </Modal>
    </>
  );
}
