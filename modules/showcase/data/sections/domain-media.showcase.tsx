'use client';
import type { ShowcaseComponent } from '../showcase.types';
import { VideoStatusBadge } from '@/modules/domains/media/video/VideoStatusBadge';
import { VideoCard } from '@/modules/domains/media/video/VideoCard';
import { ChannelCard } from '@/modules/domains/media/channel/ChannelCard';
import { VideoMeta } from '@/modules/domains/media/video/VideoMeta';

/* ─── demo data ─── */

const DEMO_VIDEO_PUBLISHED = {
  videoId: 'demo-v-01',
  title: 'Next.js 16 App Router — Complete Beginner Guide',
  slug: 'nextjs-16-app-router-complete-guide',
  thumbnailUrl: 'https://picsum.photos/seed/video1/640/360',
  duration: 3842,
  viewCount: 128400,
  likeCount: 5320,
  status: 'PUBLISHED' as const,
  channelName: 'CodeWithAlex',
  channelHandle: 'codewithAlex',
  channelVerified: true,
  publishedAt: new Date('2026-04-15'),
};

const DEMO_VIDEO_DRAFT = {
  ...DEMO_VIDEO_PUBLISHED,
  videoId: 'demo-v-02',
  title: 'Building a Full-Stack App with Prisma and tRPC',
  slug: 'full-stack-prisma-trpc',
  thumbnailUrl: undefined,
  duration: 5460,
  viewCount: 0,
  likeCount: 0,
  status: 'DRAFT' as const,
  publishedAt: undefined,
};

const DEMO_CHANNEL = {
  channelId: 'demo-ch-01',
  name: 'CodeWithAlex',
  handle: 'codewithAlex',
  description: 'Deep dives into web development, TypeScript, and modern frameworks. New videos every week.',
  avatarUrl: 'https://picsum.photos/seed/channel1/100/100',
  subscriberCount: 482000,
  videoCount: 214,
  verified: true,
};

const DEMO_CHANNEL_UNVERIFIED = {
  channelId: 'demo-ch-02',
  name: 'ChefMarco',
  handle: 'chefmarco',
  description: 'Italian home cooking made easy. Simple recipes, fresh ingredients, incredible results.',
  avatarUrl: 'https://picsum.photos/seed/channel3/100/100',
  subscriberCount: 315000,
  videoCount: 189,
  verified: false,
};

/* ─── builder ─── */

export function buildMediaDomainData(): ShowcaseComponent[] {
  return [
    {
      id: 'media-video-status-badge',
      title: 'VideoStatusBadge',
      category: 'Domain',
      abbr: 'VS',
      description: 'Displays video lifecycle status with semantic colour coding.',
      filePath: 'modules/domains/media/video/VideoStatusBadge.tsx',
      sourceCode: `import { VideoStatusBadge } from '@/modules/domains/media/video/VideoStatusBadge';
<VideoStatusBadge status="PUBLISHED" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['DRAFT', 'PROCESSING', 'PUBLISHED', 'PRIVATE', 'UNLISTED', 'BLOCKED', 'DELETED'] as const).map((s) => (
                <VideoStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['DRAFT', 'PROCESSING', 'PUBLISHED', 'PRIVATE', 'UNLISTED', 'BLOCKED', 'DELETED'] as const).map((s) => (
  <VideoStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Sizes',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap items-center gap-2">
              <VideoStatusBadge status="PUBLISHED" size="sm" />
              <VideoStatusBadge status="PUBLISHED" size="md" />
            </div>
          ),
          code: `<VideoStatusBadge status="PUBLISHED" size="sm" />
<VideoStatusBadge status="PUBLISHED" size="md" />`,
        },
      ],
    },
    {
      id: 'media-video-card',
      title: 'VideoCard',
      category: 'Domain',
      abbr: 'VC',
      description: 'Thumbnail card for a video: 16:9 image, duration overlay, title, channel, and view count.',
      filePath: 'modules/domains/media/video/VideoCard.tsx',
      sourceCode: `import { VideoCard } from '@/modules/domains/media/video/VideoCard';
<VideoCard video={video} href="/theme/media/videos/slug" />`,
      variants: [
        {
          title: 'Published with thumbnail',
          preview: (
            <div className="max-w-sm">
              <VideoCard video={DEMO_VIDEO_PUBLISHED} href="#" />
            </div>
          ),
          code: `<VideoCard video={video} href="/videos/slug" />`,
        },
        {
          title: 'Draft, no thumbnail',
          preview: (
            <div className="max-w-sm">
              <VideoCard video={DEMO_VIDEO_DRAFT} />
            </div>
          ),
          code: `<VideoCard video={{ ...video, status: 'DRAFT', thumbnailUrl: undefined }} />`,
        },
      ],
    },
    {
      id: 'media-channel-card',
      title: 'ChannelCard',
      category: 'Domain',
      abbr: 'CC',
      description: 'Channel profile card: avatar, name, verified badge, subscriber count, and subscribe button.',
      filePath: 'modules/domains/media/channel/ChannelCard.tsx',
      sourceCode: `import { ChannelCard } from '@/modules/domains/media/channel/ChannelCard';
<ChannelCard channel={channel} href="/channels" />`,
      variants: [
        {
          title: 'Verified channel',
          preview: (
            <div className="max-w-sm">
              <ChannelCard channel={DEMO_CHANNEL} href="#" />
            </div>
          ),
          code: `<ChannelCard channel={channel} href="/channels" />`,
        },
        {
          title: 'Unverified channel',
          preview: (
            <div className="max-w-sm">
              <ChannelCard channel={DEMO_CHANNEL_UNVERIFIED} />
            </div>
          ),
          code: `<ChannelCard channel={{ ...channel, verified: false }} />`,
        },
      ],
    },
    {
      id: 'media-video-meta',
      title: 'VideoMeta',
      category: 'Domain',
      abbr: 'VM',
      description: 'Inline metadata strip: view count, like count, duration, and relative publish date.',
      filePath: 'modules/domains/media/video/VideoMeta.tsx',
      sourceCode: `import { VideoMeta } from '@/modules/domains/media/video/VideoMeta';
<VideoMeta video={video} />`,
      variants: [
        {
          title: 'Full meta',
          layout: 'stack',
          preview: (
            <VideoMeta
              video={{
                viewCount: 128400,
                likeCount: 5320,
                publishedAt: new Date('2026-04-15'),
                duration: 3842,
              }}
            />
          ),
          code: `<VideoMeta video={{ viewCount: 128400, likeCount: 5320, publishedAt: date, duration: 3842 }} />`,
        },
        {
          title: 'Views and date only',
          layout: 'stack',
          preview: (
            <VideoMeta
              video={{
                viewCount: 2340000,
                publishedAt: new Date('2026-04-20'),
              }}
            />
          ),
          code: `<VideoMeta video={{ viewCount: 2340000, publishedAt: date }} />`,
        },
      ],
    },
  ];
}
