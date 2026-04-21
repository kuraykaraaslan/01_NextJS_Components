'use client';
import { FeedComposer } from '@/modules/domain/social/FeedComposer';
import { ForumPostCard } from '@/modules/domain/social/ForumPostCard';
import { CommentThread } from '@/modules/domain/social/CommentThread';
import { ForumReactionBar } from '@/modules/domain/social/ForumReactionBar';
import { TopicTagCloud } from '@/modules/domain/social/TopicTagCloud';
import { ModerationQueuePanel } from '@/modules/domain/social/ModerationQueuePanel';
import type { ShowcaseComponent } from '../showcase.types';

export function buildSocialData(): ShowcaseComponent[] {
  return [
    {
      id: 'soc-feed-composer',
      title: 'FeedComposer',
      category: 'Domain' as const,
      abbr: 'Fc',
      description: 'Post composer with textarea, character counter, tag input, visibility selector, and limit warning.',
      filePath: 'modules/domain/social/FeedComposer.tsx',
      sourceCode: `import { FeedComposer } from '@/modules/domain/social/FeedComposer';\n\n<FeedComposer />`,
      variants: [
        {
          title: 'Feed composer',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><FeedComposer /></div>),
          code: `<FeedComposer />`,
        },
      ],
    },
    {
      id: 'soc-post-card',
      title: 'ForumPostCard',
      category: 'Domain' as const,
      abbr: 'Fp',
      description: 'Forum post card with author avatar, title, excerpt, category badge, vote/comment counts, and dropdown menu.',
      filePath: 'modules/domain/social/ForumPostCard.tsx',
      sourceCode: `import { ForumPostCard } from '@/modules/domain/social/ForumPostCard';\n\n<ForumPostCard />`,
      variants: [
        {
          title: 'Forum post card',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><ForumPostCard /></div>),
          code: `<ForumPostCard />`,
        },
      ],
    },
    {
      id: 'soc-comment-thread',
      title: 'CommentThread',
      category: 'Domain' as const,
      abbr: 'Ct',
      description: 'Threaded comment list with inline reply input, like counts, and pagination.',
      filePath: 'modules/domain/social/CommentThread.tsx',
      sourceCode: `import { CommentThread } from '@/modules/domain/social/CommentThread';\n\n<CommentThread />`,
      variants: [
        {
          title: 'Comment thread',
          layout: 'stack' as const,
          preview: (<div className="w-full"><CommentThread /></div>),
          code: `<CommentThread />`,
        },
      ],
    },
    {
      id: 'soc-reactions',
      title: 'ForumReactionBar',
      category: 'Domain' as const,
      abbr: 'Rb',
      description: 'Emoji reaction bar with toggle behavior, count badges, and hover tooltips showing who reacted.',
      filePath: 'modules/domain/social/ForumReactionBar.tsx',
      sourceCode: `import { ForumReactionBar } from '@/modules/domain/social/ForumReactionBar';\n\n<ForumReactionBar />`,
      variants: [
        {
          title: 'Reaction bar',
          layout: 'stack' as const,
          preview: (<div className="w-full"><ForumReactionBar /></div>),
          code: `<ForumReactionBar />`,
        },
      ],
    },
    {
      id: 'soc-tag-cloud',
      title: 'TopicTagCloud',
      category: 'Domain' as const,
      abbr: 'Tc',
      description: 'Topic tag cloud with popularity-coded colors, All/Trending/New filter, and custom topic input.',
      filePath: 'modules/domain/social/TopicTagCloud.tsx',
      sourceCode: `import { TopicTagCloud } from '@/modules/domain/social/TopicTagCloud';\n\n<TopicTagCloud />`,
      variants: [
        {
          title: 'Topic tag cloud',
          layout: 'stack' as const,
          preview: (<div className="w-full"><TopicTagCloud /></div>),
          code: `<TopicTagCloud />`,
        },
      ],
    },
    {
      id: 'soc-moderation',
      title: 'ModerationQueuePanel',
      category: 'Domain' as const,
      abbr: 'Mq',
      description: 'Moderation queue table with report reason badges, approve/remove actions, and pending count alert.',
      filePath: 'modules/domain/social/ModerationQueuePanel.tsx',
      sourceCode: `import { ModerationQueuePanel } from '@/modules/domain/social/ModerationQueuePanel';\n\n<ModerationQueuePanel />`,
      variants: [
        {
          title: 'Moderation queue',
          layout: 'stack' as const,
          preview: (<div className="w-full"><ModerationQueuePanel /></div>),
          code: `<ModerationQueuePanel />`,
        },
      ],
    },
  ];
}
