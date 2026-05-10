import type { TopicStatus, ForumPostStatus } from '@/modules/domains/forum/types';

/* =========================================================
   GROUPS
========================================================= */

export type ForumGroup = {
  groupId: string;
  title: string;
  categoryIds: string[];
};

export const CATEGORY_GROUPS: ForumGroup[] = [
  { groupId: 'grp-01', title: 'Community', categoryIds: ['cat-01', 'cat-02', 'cat-03'] },
  { groupId: 'grp-02', title: 'Off the Clock', categoryIds: ['cat-04', 'cat-05'] },
];

/* =========================================================
   BOARD STATISTICS
========================================================= */

export const BOARD_STATS = {
  totalTopics: 784,
  totalPosts: 10682,
  totalMembers: 18402,
  newestMember: 'pixel_wizard',
  onlineCount: 23,
  registeredOnline: 5,
  guestOnline: 18,
};

/* =========================================================
   CATEGORIES
========================================================= */

export type ForumCategoryData = {
  categoryId: string;
  title: string;
  slug: string;
  description: string;
  topicCount: number;
  postCount: number;
  lastActivityAt: string;
  moderators?: string[];
};

export const FORUM_CATEGORIES: ForumCategoryData[] = [
  {
    categoryId: 'cat-01',
    title: 'General Discussion',
    slug: 'general',
    description: 'Chat about anything and everything. A place for open, friendly conversation with the community.',
    topicCount: 342,
    postCount: 4810,
    lastActivityAt: '2026-05-08T09:12:00Z',
    moderators: ['admin', 'mod_jane'],
  },
  {
    categoryId: 'cat-02',
    title: 'Tech Help',
    slug: 'tech-help',
    description: 'Got a technical problem? Ask the community. Someone has probably solved it before.',
    topicCount: 198,
    postCount: 3204,
    lastActivityAt: '2026-05-08T08:45:00Z',
    moderators: ['admin', 'veteran_member'],
  },
  {
    categoryId: 'cat-03',
    title: 'Show & Tell',
    slug: 'show-and-tell',
    description: 'Share what you have built, designed, or created. Get feedback and celebrate wins.',
    topicCount: 87,
    postCount: 912,
    lastActivityAt: '2026-05-07T22:30:00Z',
    moderators: ['mod_jane'],
  },
  {
    categoryId: 'cat-04',
    title: 'Off-Topic',
    slug: 'off-topic',
    description: 'Everything that does not fit elsewhere. Games, hobbies, random thoughts — all welcome.',
    topicCount: 134,
    postCount: 1567,
    lastActivityAt: '2026-05-07T18:00:00Z',
    moderators: ['admin'],
  },
  {
    categoryId: 'cat-05',
    title: 'Announcements',
    slug: 'announcements',
    description: 'Official news and updates from the moderators and community team.',
    topicCount: 23,
    postCount: 189,
    lastActivityAt: '2026-05-06T12:00:00Z',
    moderators: ['admin', 'moderator_team'],
  },
];

/* =========================================================
   TOPICS
========================================================= */

export type TopicData = {
  topicId: string;
  categoryId: string;
  title: string;
  slug: string;
  status: TopicStatus;
  authorName: string;
  authorAvatar?: string;
  replyCount: number;
  viewCount: number;
  createdAt: string;
  isPinned?: boolean;
  isLocked?: boolean;
};

export const TOPICS: TopicData[] = [
  {
    topicId: 'topic-01',
    categoryId: 'cat-01',
    title: 'Welcome to Discourse — please read before posting!',
    slug: 'welcome-to-discourse',
    status: 'PINNED',
    authorName: 'admin',
    replyCount: 24,
    viewCount: 8120,
    createdAt: '2025-01-01T10:00:00Z',
    isPinned: true,
  },
  {
    topicId: 'topic-02',
    categoryId: 'cat-01',
    title: 'Introduce yourself — who are you and what do you do?',
    slug: 'introduce-yourself',
    status: 'OPEN',
    authorName: 'community_bot',
    replyCount: 312,
    viewCount: 14340,
    createdAt: '2025-01-05T08:00:00Z',
    isPinned: true,
  },
  {
    topicId: 'topic-03',
    categoryId: 'cat-02',
    title: 'How do I deploy a Next.js app to a VPS without Docker?',
    slug: 'deploy-nextjs-vps-no-docker',
    status: 'OPEN',
    authorName: 'dev_sarah',
    replyCount: 17,
    viewCount: 2340,
    createdAt: '2026-04-20T14:32:00Z',
  },
  {
    topicId: 'topic-04',
    categoryId: 'cat-02',
    title: 'TypeScript: best patterns for handling nullable API responses',
    slug: 'typescript-nullable-api-patterns',
    status: 'OPEN',
    authorName: 'ts_enjoyer',
    replyCount: 31,
    viewCount: 5670,
    createdAt: '2026-04-15T09:10:00Z',
  },
  {
    topicId: 'topic-05',
    categoryId: 'cat-02',
    title: 'PostgreSQL query is slow after 1M rows — help needed',
    slug: 'postgres-slow-query-1m-rows',
    status: 'LOCKED',
    authorName: 'db_newbie',
    replyCount: 45,
    viewCount: 9800,
    createdAt: '2026-03-10T11:25:00Z',
    isLocked: true,
  },
  {
    topicId: 'topic-06',
    categoryId: 'cat-03',
    title: 'I built an open-source Kanban board in Rust + WASM — feedback welcome',
    slug: 'open-source-kanban-rust-wasm',
    status: 'OPEN',
    authorName: 'rustacean99',
    replyCount: 58,
    viewCount: 3210,
    createdAt: '2026-05-01T16:45:00Z',
  },
  {
    topicId: 'topic-07',
    categoryId: 'cat-03',
    title: 'My portfolio redesign after 3 years — before & after screenshots',
    slug: 'portfolio-redesign-before-after',
    status: 'OPEN',
    authorName: 'ux_grace',
    replyCount: 72,
    viewCount: 4530,
    createdAt: '2026-04-28T20:00:00Z',
  },
  {
    topicId: 'topic-08',
    categoryId: 'cat-04',
    title: 'What book changed how you think about software?',
    slug: 'books-that-changed-software-thinking',
    status: 'OPEN',
    authorName: 'book_worm_dev',
    replyCount: 94,
    viewCount: 6120,
    createdAt: '2026-04-10T13:00:00Z',
  },
  {
    topicId: 'topic-09',
    categoryId: 'cat-04',
    title: 'Your unpopular dev opinions — go!',
    slug: 'unpopular-dev-opinions',
    status: 'ARCHIVED',
    authorName: 'hot_takes_pete',
    replyCount: 210,
    viewCount: 18900,
    createdAt: '2025-11-20T07:00:00Z',
  },
  {
    topicId: 'topic-10',
    categoryId: 'cat-05',
    title: 'Community update — May 2026: new categories and moderation changes',
    slug: 'community-update-may-2026',
    status: 'PINNED',
    authorName: 'moderator_team',
    replyCount: 8,
    viewCount: 2100,
    createdAt: '2026-05-01T09:00:00Z',
    isPinned: true,
  },
];

/* =========================================================
   POSTS (replies for topic-01)
========================================================= */

export type PostData = {
  postId: string;
  topicId: string;
  authorName: string;
  authorAvatar?: string;
  authorPostCount: number;
  content: string;
  status: ForumPostStatus;
  createdAt: string;
  likeCount: number;
};

export const POSTS: PostData[] = [
  {
    postId: 'post-01',
    topicId: 'topic-01',
    authorName: 'admin',
    authorPostCount: 1204,
    content:
      'Welcome to our community! Please take a moment to read our community guidelines before posting. We expect all members to be respectful, constructive, and kind. Off-topic posts may be removed at moderator discretion. Enjoy your time here!',
    status: 'PUBLISHED',
    createdAt: '2025-01-01T10:05:00Z',
    likeCount: 88,
  },
  {
    postId: 'post-02',
    topicId: 'topic-01',
    authorName: 'first_timer',
    authorPostCount: 3,
    content:
      'Thanks for the warm welcome! I am new here and really excited to be part of this community. Looking forward to learning from everyone.',
    status: 'PUBLISHED',
    createdAt: '2025-01-02T14:20:00Z',
    likeCount: 14,
  },
  {
    postId: 'post-03',
    topicId: 'topic-01',
    authorName: 'veteran_member',
    authorPostCount: 567,
    content:
      'Been here since the beginning — it is a great community. My tip for newcomers: use the search bar before posting a new topic. Chances are your question has already been answered.',
    status: 'PUBLISHED',
    createdAt: '2025-01-03T09:45:00Z',
    likeCount: 42,
  },
  {
    postId: 'post-04',
    topicId: 'topic-01',
    authorName: 'curious_dev',
    authorPostCount: 11,
    content:
      'Quick question — is there a dark mode for the forum? Would love that feature. Also, loving the clean layout so far!',
    status: 'PUBLISHED',
    createdAt: '2025-01-10T17:00:00Z',
    likeCount: 6,
  },
  {
    postId: 'post-05',
    topicId: 'topic-01',
    authorName: 'mod_jane',
    authorPostCount: 892,
    content:
      'Dark mode is on our roadmap! We are working on it and hope to ship it in the next few weeks. Stay tuned for the announcement in the Announcements category.',
    status: 'PUBLISHED',
    createdAt: '2025-01-10T18:30:00Z',
    likeCount: 37,
  },
];
