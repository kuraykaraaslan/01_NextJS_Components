'use client';
import { VideoPlayerShell } from '@/modules/domain/video/VideoPlayerShell';
import { EpisodeListPanel } from '@/modules/domain/video/EpisodeListPanel';
import { RecommendationCarousel } from '@/modules/domain/video/RecommendationCarousel';
import { WatchlistManager } from '@/modules/domain/video/WatchlistManager';
import { SubtitleAudioSelector } from '@/modules/domain/video/SubtitleAudioSelector';
import { LiveChatPanel } from '@/modules/domain/video/LiveChatPanel';
import type { ShowcaseComponent } from '../showcase.types';

export function buildVideoData(): ShowcaseComponent[] {
  return [
    {
      id: 'vid-player-shell',
      title: 'VideoPlayerShell',
      category: 'Domain' as const,
      abbr: 'Vp',
      description: 'Video player UI shell with 16:9 placeholder, page header, control bar with play/pause ButtonGroup, and tooltips.',
      filePath: 'modules/domain/video/VideoPlayerShell.tsx',
      sourceCode: `import { VideoPlayerShell } from '@/modules/domain/video/VideoPlayerShell';\n\n<VideoPlayerShell />`,
      variants: [
        {
          title: 'Video player shell',
          layout: 'stack' as const,
          preview: (<div className="w-full"><VideoPlayerShell /></div>),
          code: `<VideoPlayerShell />`,
        },
      ],
    },
    {
      id: 'vid-episode-list',
      title: 'EpisodeListPanel',
      category: 'Domain' as const,
      abbr: 'El',
      description: 'Episode list DataTable with duration/rating badges and watched toggles.',
      filePath: 'modules/domain/video/EpisodeListPanel.tsx',
      sourceCode: `import { EpisodeListPanel } from '@/modules/domain/video/EpisodeListPanel';\n\n<EpisodeListPanel />`,
      variants: [
        {
          title: 'Episode list',
          layout: 'stack' as const,
          preview: (<div className="w-full"><EpisodeListPanel /></div>),
          code: `<EpisodeListPanel />`,
        },
      ],
    },
    {
      id: 'vid-recommendations',
      title: 'RecommendationCarousel',
      category: 'Domain' as const,
      abbr: 'Rc',
      description: '"You might also like" grid of 4 video cards with genre and rating badges.',
      filePath: 'modules/domain/video/RecommendationCarousel.tsx',
      sourceCode: `import { RecommendationCarousel } from '@/modules/domain/video/RecommendationCarousel';\n\n<RecommendationCarousel />`,
      variants: [
        {
          title: 'Recommendation carousel',
          layout: 'stack' as const,
          preview: (<div className="w-full"><RecommendationCarousel /></div>),
          code: `<RecommendationCarousel />`,
        },
      ],
    },
    {
      id: 'vid-watchlist',
      title: 'WatchlistManager',
      category: 'Domain' as const,
      abbr: 'Wm',
      description: 'Watchlist manager with genre filter, checkbox group for bulk removal, and toast feedback.',
      filePath: 'modules/domain/video/WatchlistManager.tsx',
      sourceCode: `import { WatchlistManager } from '@/modules/domain/video/WatchlistManager';\n\n<WatchlistManager />`,
      variants: [
        {
          title: 'Watchlist manager',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><WatchlistManager /></div>),
          code: `<WatchlistManager />`,
        },
      ],
    },
    {
      id: 'vid-subtitle-audio',
      title: 'SubtitleAudioSelector',
      category: 'Domain' as const,
      abbr: 'Sa',
      description: 'A/V settings panel: subtitle language ComboBox, audio track ComboBox, playback speed ButtonGroup, and quality select.',
      filePath: 'modules/domain/video/SubtitleAudioSelector.tsx',
      sourceCode: `import { SubtitleAudioSelector } from '@/modules/domain/video/SubtitleAudioSelector';\n\n<SubtitleAudioSelector />`,
      variants: [
        {
          title: 'Subtitle & audio selector',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><SubtitleAudioSelector /></div>),
          code: `<SubtitleAudioSelector />`,
        },
      ],
    },
    {
      id: 'vid-live-chat',
      title: 'LiveChatPanel',
      category: 'Domain' as const,
      abbr: 'Lc',
      description: 'Live stream chat drawer with scrollable message list, send input, avatar, and new-message toast.',
      filePath: 'modules/domain/video/LiveChatPanel.tsx',
      sourceCode: `import { LiveChatPanel } from '@/modules/domain/video/LiveChatPanel';\n\n<LiveChatPanel />`,
      variants: [
        {
          title: 'Live chat panel',
          layout: 'stack' as const,
          preview: (<div className="w-full"><LiveChatPanel /></div>),
          code: `<LiveChatPanel />`,
        },
      ],
    },
  ];
}
