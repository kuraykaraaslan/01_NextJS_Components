import { z } from 'zod'
import { IdSchema } from '../common/BaseTypes'

/* =========================================================
   ENUMS
========================================================= */

export const PostStatusEnum = z.enum(['DRAFT', 'PUBLISHED', 'ARCHIVED', 'DELETED'])
export const PostTypeEnum = z.enum(['TEXT', 'IMAGE', 'VIDEO', 'LINK'])
export const PrivacyEnum = z.enum(['PUBLIC', 'FRIENDS', 'PRIVATE'])
export const FriendshipStatusEnum = z.enum(['PENDING', 'ACCEPTED', 'BLOCKED', 'DECLINED'])
export const NotificationTypeEnum = z.enum(['LIKE', 'COMMENT', 'FOLLOW', 'MENTION', 'SHARE'])
export const ReactionTypeEnum = z.enum(['LIKE', 'LOVE', 'HAHA', 'WOW', 'SAD', 'ANGRY'])
export const MarketplaceListingStatusEnum = z.enum(['ACTIVE', 'SOLD', 'RESERVED', 'REMOVED'])
export const MarketplaceConditionEnum = z.enum(['NEW', 'LIKE_NEW', 'GOOD', 'FAIR', 'POOR'])

/* =========================================================
   USER
========================================================= */

export const SocialUserSchema = z.object({
  userId: IdSchema,
  username: z.string(),
  name: z.string(),
  avatar: z.string().nullable().optional(),
  coverImage: z.string().nullable().optional(),
  bio: z.string().nullable().optional(),
  location: z.string().nullable().optional(),
  website: z.string().nullable().optional(),
  followerCount: z.number().int().nonnegative().default(0),
  followingCount: z.number().int().nonnegative().default(0),
  postCount: z.number().int().nonnegative().default(0),
  isVerified: z.boolean().default(false),
  isFollowing: z.boolean().default(false),
  isFollowedBy: z.boolean().default(false),
  joinedAt: z.coerce.date().optional(),
})

/* =========================================================
   POST / FEED
========================================================= */

export const PostSchema = z.object({
  postId: IdSchema,
  authorId: IdSchema,
  content: z.string(),
  type: PostTypeEnum.default('TEXT'),
  status: PostStatusEnum.default('PUBLISHED'),
  privacy: PrivacyEnum.default('PUBLIC'),
  mediaUrls: z.array(z.string()).optional(),
  linkUrl: z.string().nullable().optional(),
  linkTitle: z.string().nullable().optional(),
  linkPreviewImage: z.string().nullable().optional(),
  likeCount: z.number().int().nonnegative().default(0),
  commentCount: z.number().int().nonnegative().default(0),
  shareCount: z.number().int().nonnegative().default(0),
  isLiked: z.boolean().default(false),
  isBookmarked: z.boolean().default(false),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const PostWithAuthorSchema = PostSchema.extend({
  author: SocialUserSchema,
})

/* =========================================================
   COMMENT
========================================================= */

export const CommentSchema = z.object({
  commentId: IdSchema,
  postId: IdSchema,
  authorId: IdSchema,
  parentCommentId: IdSchema.nullable().optional(),
  content: z.string(),
  likeCount: z.number().int().nonnegative().default(0),
  isLiked: z.boolean().default(false),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const CommentWithAuthorSchema = CommentSchema.extend({
  author: SocialUserSchema,
})

/* =========================================================
   NOTIFICATION
========================================================= */

export const NotificationSchema = z.object({
  notificationId: IdSchema,
  userId: IdSchema,
  type: NotificationTypeEnum,
  actorId: IdSchema.nullable().optional(),
  postId: IdSchema.nullable().optional(),
  commentId: IdSchema.nullable().optional(),
  message: z.string(),
  isRead: z.boolean().default(false),
  createdAt: z.coerce.date().optional(),
})

export const NotificationWithActorSchema = NotificationSchema.extend({
  actor: SocialUserSchema.nullable().optional(),
})

/* =========================================================
   MESSAGING
========================================================= */

export const ConversationSchema = z.object({
  conversationId: IdSchema,
  participantIds: z.array(IdSchema),
  lastMessage: z.string().nullable().optional(),
  lastMessageAt: z.coerce.date().nullable().optional(),
  unreadCount: z.number().int().nonnegative().default(0),
})

export const ConversationWithParticipantSchema = ConversationSchema.extend({
  participant: SocialUserSchema,
})

export const DirectMessageSchema = z.object({
  messageId: IdSchema,
  conversationId: IdSchema,
  senderId: IdSchema,
  content: z.string(),
  isRead: z.boolean().default(false),
  createdAt: z.coerce.date().optional(),
})

/* =========================================================
   FRIENDSHIP
========================================================= */

export const FriendshipSchema = z.object({
  friendshipId: IdSchema,
  requesterId: IdSchema,
  recipientId: IdSchema,
  status: FriendshipStatusEnum.default('PENDING'),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

/* =========================================================
   MARKETPLACE
========================================================= */

export const MarketplaceListingSchema = z.object({
  listingId: IdSchema,
  sellerId: IdSchema,
  title: z.string(),
  description: z.string(),
  price: z.number().nonnegative(),
  currency: z.string().default('USD'),
  status: MarketplaceListingStatusEnum.default('ACTIVE'),
  condition: MarketplaceConditionEnum.default('GOOD'),
  category: z.string(),
  location: z.string().nullable().optional(),
  imageUrls: z.array(z.string()).optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().nullable().optional(),
})

export const MarketplaceListingWithSellerSchema = MarketplaceListingSchema.extend({
  seller: SocialUserSchema,
})

/* =========================================================
   TYPES
========================================================= */

export type PostStatus = z.infer<typeof PostStatusEnum>
export type PostType = z.infer<typeof PostTypeEnum>
export type SocialPrivacy = z.infer<typeof PrivacyEnum>
export type FriendshipStatus = z.infer<typeof FriendshipStatusEnum>
export type NotificationType = z.infer<typeof NotificationTypeEnum>
export type ReactionType = z.infer<typeof ReactionTypeEnum>
export type MarketplaceListingStatus = z.infer<typeof MarketplaceListingStatusEnum>
export type MarketplaceCondition = z.infer<typeof MarketplaceConditionEnum>

export type SocialUser = z.infer<typeof SocialUserSchema>
export type Post = z.infer<typeof PostSchema>
export type PostWithAuthor = z.infer<typeof PostWithAuthorSchema>
export type Comment = z.infer<typeof CommentSchema>
export type CommentWithAuthor = z.infer<typeof CommentWithAuthorSchema>
export type Notification = z.infer<typeof NotificationSchema>
export type NotificationWithActor = z.infer<typeof NotificationWithActorSchema>
export type Conversation = z.infer<typeof ConversationSchema>
export type ConversationWithParticipant = z.infer<typeof ConversationWithParticipantSchema>
export type DirectMessage = z.infer<typeof DirectMessageSchema>
export type Friendship = z.infer<typeof FriendshipSchema>
export type MarketplaceListing = z.infer<typeof MarketplaceListingSchema>
export type MarketplaceListingWithSeller = z.infer<typeof MarketplaceListingWithSellerSchema>
