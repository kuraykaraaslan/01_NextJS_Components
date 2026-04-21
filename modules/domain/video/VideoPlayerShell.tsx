'use client';
import { useState } from 'react';
import { PageHeader } from '@/modules/ui/PageHeader';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { Tooltip } from '@/modules/ui/Tooltip';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Badge } from '@/modules/ui/Badge';

const PLAY_ITEMS = [
  { value: 'play', label: '▶' },
  { value: 'pause', label: '⏸' },
];

export function VideoPlayerShell() {
  const [playState, setPlayState] = useState('play');
  const [geoRestricted] = useState(false);

  return (
    <div className="space-y-4 max-w-2xl">
      <PageHeader
        title="Building Modern Web Apps with React 18"
        subtitle="TechConf 2026 · Session Recording"
        badge={
          <div className="flex gap-1 flex-wrap">
            <Badge variant="neutral" size="sm">1h 24m</Badge>
            <Badge variant="primary" size="sm">4K</Badge>
            <Badge variant="success" size="sm">Subtitles</Badge>
          </div>
        }
      />

      {geoRestricted && (
        <AlertBanner variant="error" title="Content unavailable in your region" message="This video is not available in your country due to licensing restrictions." />
      )}

      <div className="relative bg-surface-sunken rounded-xl overflow-hidden" style={{ aspectRatio: '16/9' }}>
        <div className="absolute inset-0 flex items-center justify-center bg-black/80">
          <button
            type="button"
            aria-label="Play video"
            className="h-16 w-16 rounded-full bg-white/90 flex items-center justify-center text-2xl hover:bg-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            {playState === 'play' ? '▶' : '⏸'}
          </button>
        </div>
        <div className="absolute bottom-0 inset-x-0 bg-gradient-to-t from-black/80 to-transparent p-4">
          <div className="h-1 bg-white/30 rounded-full mb-3">
            <div className="h-full w-2/5 bg-primary rounded-full" />
          </div>
          <div className="flex items-center gap-3">
            <ButtonGroup items={PLAY_ITEMS} value={playState} onChange={setPlayState} size="sm" />
            <span className="text-white text-xs font-mono">33:12 / 1:24:00</span>
            <div className="flex gap-2 ml-auto">
              <Tooltip content="Toggle subtitles">
                <button type="button" className="text-white/70 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">CC</button>
              </Tooltip>
              <Tooltip content="Volume">
                <button type="button" className="text-white/70 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">🔊</button>
              </Tooltip>
              <Tooltip content="Fullscreen">
                <button type="button" className="text-white/70 hover:text-white text-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-white rounded">⛶</button>
              </Tooltip>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
