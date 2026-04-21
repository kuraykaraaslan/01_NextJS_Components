'use client';
import { useState } from 'react';
import { ComboBox } from '@/modules/ui/ComboBox';
import { Select } from '@/modules/ui/Select';
import { ButtonGroup } from '@/modules/ui/ButtonGroup';
import { Card } from '@/modules/ui/Card';

const SUBTITLE_LANGS = [
  { value: 'off', label: 'Off' },
  { value: 'en', label: 'English' },
  { value: 'es', label: 'Spanish' },
  { value: 'fr', label: 'French' },
  { value: 'de', label: 'German' },
  { value: 'pt', label: 'Portuguese' },
  { value: 'ja', label: 'Japanese' },
  { value: 'ko', label: 'Korean' },
  { value: 'zh', label: 'Chinese (Simplified)' },
  { value: 'ar', label: 'Arabic' },
  { value: 'ru', label: 'Russian' },
  { value: 'it', label: 'Italian' },
  { value: 'nl', label: 'Dutch' },
  { value: 'pl', label: 'Polish' },
  { value: 'sv', label: 'Swedish' },
  { value: 'no', label: 'Norwegian' },
  { value: 'da', label: 'Danish' },
  { value: 'fi', label: 'Finnish' },
  { value: 'tr', label: 'Turkish' },
  { value: 'hi', label: 'Hindi' },
];

const AUDIO_TRACKS = [
  { value: 'en-orig', label: 'English (Original)' },
  { value: 'es-dub', label: 'Spanish (Dubbed)' },
  { value: 'fr-dub', label: 'French (Dubbed)' },
  { value: 'de-dub', label: 'German (Dubbed)' },
  { value: 'ad', label: 'Audio Description' },
];

const QUALITY_OPTIONS = [
  { value: 'auto', label: 'Auto' },
  { value: '4k', label: '4K UHD' },
  { value: '1080p', label: '1080p HD' },
  { value: '720p', label: '720p' },
  { value: '480p', label: '480p' },
];

const SPEED_ITEMS = [
  { value: '0.5', label: '0.5×' },
  { value: '1', label: '1×' },
  { value: '1.5', label: '1.5×' },
  { value: '2', label: '2×' },
];

export function SubtitleAudioSelector() {
  const [subtitle, setSubtitle] = useState('en');
  const [audio, setAudio] = useState('en-orig');
  const [speed, setSpeed] = useState('1');
  const [quality, setQuality] = useState('auto');

  return (
    <Card className="max-w-sm">
      <div className="p-4 space-y-4">
        <h3 className="text-sm font-semibold text-text-primary">A/V Settings</h3>

        <ComboBox id="subtitle-lang" label="Subtitle language" options={SUBTITLE_LANGS} value={subtitle} onChange={setSubtitle} placeholder="Choose language…" />
        <ComboBox id="audio-track" label="Audio track" options={AUDIO_TRACKS} value={audio} onChange={setAudio} />
        <Select id="video-quality" label="Quality" options={QUALITY_OPTIONS} value={quality} onChange={(e) => setQuality(e.target.value)} />

        <div className="space-y-1">
          <label className="text-sm font-medium text-text-primary">Playback speed</label>
          <ButtonGroup items={SPEED_ITEMS} value={speed} onChange={setSpeed} size="sm" />
        </div>
      </div>
    </Card>
  );
}
