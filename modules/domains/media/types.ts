import { z } from 'zod'
import { AppLanguageEnum } from '../common/I18nTypes'
import { IdSchema, BaseEntitySchema, VisibilityEnum, ProcessingStatusEnum } from '../common/BaseTypes'

/* =========================================================
   ENUMS
========================================================= */

export const VideoStatusEnum = z.enum([
  'DRAFT',
  'PROCESSING',
  'PUBLISHED',
  'PRIVATE',
  'UNLISTED',
  'BLOCKED',
  'DELETED',
])

export const CommentStatusEnum = z.enum([
  'VISIBLE',
  'HIDDEN',
  'SPAM',
  'DELETED',
])

export const ReactionTypeEnum = z.enum([
  'LIKE',
  'DISLIKE',
])

export const SubscriptionStatusEnum = z.enum([
  'ACTIVE',
  'MUTED',
  'BLOCKED',
])

export const PlaylistVisibilityEnum = z.enum([
  'PUBLIC',
  'PRIVATE',
  'UNLISTED',
])

/* =========================================================
   RE-EXPORTS FROM COMMON
========================================================= */

export { VisibilityEnum, ProcessingStatusEnum }

/* =========================================================
   CHANNEL (CREATOR)
========================================================= */

export const ChannelSchema = z.object({
  channelId: IdSchema,

  userId: IdSchema,

  name: z.string(),
  handle: z.string(),

  description: z.string().nullable().optional(),

  avatar: z.string().nullable().optional(),
  banner: z.string().nullable().optional(),

  subscriberCount: z.number().int().nonnegative().default(0),
  videoCount: z.number().int().nonnegative().default(0),

  verified: z.boolean().default(false),

  country: z.string().nullable().optional(),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

/* =========================================================
   VIDEO
========================================================= */

export const VideoTranslationSchema = z.object({
  id: IdSchema,
  videoId: IdSchema,
  lang: AppLanguageEnum,

  title: z.string(),
  description: z.string().nullable().optional(),
})

export const VideoSchema = z.object({
  videoId: IdSchema,

  channelId: IdSchema,

  title: z.string(),
  description: z.string().nullable().optional(),

  slug: z.string(),

  thumbnail: z.string().nullable().optional(),
  videoUrl: z.string().nullable().optional(),

  durationSeconds: z.number().int().nonnegative(),

  visibility: VisibilityEnum.default('PUBLIC'),
  status: VideoStatusEnum.default('DRAFT'),
  processingStatus: ProcessingStatusEnum.default('UPLOADING'),

  views: z.number().int().nonnegative().default(0),
  likeCount: z.number().int().nonnegative().default(0),
  dislikeCount: z.number().int().nonnegative().default(0),

  commentCount: z.number().int().nonnegative().default(0),

  tags: z.array(z.string()).default([]),
  category: z.string().nullable().optional(),

  language: AppLanguageEnum.default('en'),

  publishedAt: z.coerce.date().nullable().optional(),
}).extend(BaseEntitySchema.shape)

export const VideoWithDataSchema = VideoSchema.extend({
  channel: ChannelSchema.pick({
    channelId: true,
    name: true,
    handle: true,
    avatar: true,
    verified: true,
  }),

  translations: z.array(VideoTranslationSchema).optional(),
})

/* =========================================================
   VIDEO FILE / STREAMING
========================================================= */

export const VideoFileSchema = z.object({
  fileId: IdSchema,

  videoId: IdSchema,

  quality: z.enum(['144p', '240p', '360p', '480p', '720p', '1080p', '4K']),

  url: z.string(),
  size: z.number().nonnegative(),

  mimeType: z.string(),

  createdAt: z.coerce.date().optional(),
})

export const VideoProcessingJobSchema = z.object({
  jobId: IdSchema,

  videoId: IdSchema,

  status: ProcessingStatusEnum,

  progress: z.number().min(0).max(100),

  error: z.string().nullable().optional(),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

/* =========================================================
   COMMENTS
========================================================= */

export const CommentSchema = z.object({
  commentId: IdSchema,

  videoId: IdSchema,
  userId: IdSchema,

  parentId: IdSchema.nullable().optional(),

  content: z.string(),

  likeCount: z.number().int().nonnegative().default(0),

  status: CommentStatusEnum.default('VISIBLE'),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

/* =========================================================
   REACTIONS
========================================================= */

export const VideoReactionSchema = z.object({
  reactionId: IdSchema,

  videoId: IdSchema,
  userId: IdSchema,

  type: ReactionTypeEnum,

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   SUBSCRIPTIONS
========================================================= */

export const SubscriptionSchema = z.object({
  subscriptionId: IdSchema,

  channelId: IdSchema,
  subscriberUserId: IdSchema,

  status: SubscriptionStatusEnum.default('ACTIVE'),

  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   PLAYLIST
========================================================= */

export const PlaylistSchema = z.object({
  playlistId: IdSchema,

  channelId: IdSchema,

  title: z.string(),
  description: z.string().nullable().optional(),

  visibility: PlaylistVisibilityEnum.default('PUBLIC'),

  videoCount: z.number().int().nonnegative().default(0),
}).extend(BaseEntitySchema.omit({ deletedAt: true }).shape)

export const PlaylistItemSchema = z.object({
  playlistItemId: IdSchema,

  playlistId: IdSchema,
  videoId: IdSchema,

  order: z.number().int().nonnegative(),

  addedAt: z.coerce.date().optional(),
})

/* =========================================================
   WATCH HISTORY
========================================================= */

export const WatchHistorySchema = z.object({
  historyId: IdSchema,

  userId: IdSchema,
  videoId: IdSchema,

  watchedSeconds: z.number().nonnegative(),

  completed: z.boolean().default(false),

  lastWatchedAt: z.coerce.date().optional(),
})

/* =========================================================
   VIDEO ANALYTICS
========================================================= */

export const VideoAnalyticsSchema = z.object({
  videoId: IdSchema,

  totalViews: z.number().int().nonnegative(),
  totalWatchTimeSeconds: z.number().nonnegative(),

  avgWatchTimeSeconds: z.number().nonnegative(),

  likes: z.number().int().nonnegative(),
  dislikes: z.number().int().nonnegative(),

  comments: z.number().int().nonnegative(),

  updatedAt: z.coerce.date(),
})

/* =========================================================
   TYPES
========================================================= */

export type VideoStatus = z.infer<typeof VideoStatusEnum>
export type Visibility = z.infer<typeof VisibilityEnum>
export type ProcessingStatus = z.infer<typeof ProcessingStatusEnum>

export type Channel = z.infer<typeof ChannelSchema>
export type Video = z.infer<typeof VideoSchema>
export type VideoWithData = z.infer<typeof VideoWithDataSchema>
export type VideoFile = z.infer<typeof VideoFileSchema>

export type Comment = z.infer<typeof CommentSchema>
export type VideoReaction = z.infer<typeof VideoReactionSchema>

export type Subscription = z.infer<typeof SubscriptionSchema>

export type Playlist = z.infer<typeof PlaylistSchema>
export type PlaylistItem = z.infer<typeof PlaylistItemSchema>

export type WatchHistory = z.infer<typeof WatchHistorySchema>

export type VideoAnalytics = z.infer<typeof VideoAnalyticsSchema>
