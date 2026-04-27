import { z } from 'zod'
import { SafeUserSchema } from '../common/types'
import { AppLanguageEnum } from '../common/I18nTypes'
import { IdSchema } from '../common/BaseTypes'

export const CommentStatusEnum = z.enum([
  'NOT_PUBLISHED',
  'PUBLISHED',
  'SPAM',
])

export const PostStatusEnum = z.enum([
  'PUBLISHED',
  'DRAFT',
  'ARCHIVED',
  'SCHEDULED',
])

export const PostTranslationSchema = z.object({
  id: IdSchema,
  postId: IdSchema,
  lang: AppLanguageEnum,
  title: z.string(),
  content: z.string(),
  description: z.string().nullable(),
  slug: z.string(),
})

export const CategoryTranslationSchema = z.object({
  id: IdSchema,
  categoryId: IdSchema,
  lang: AppLanguageEnum,
  title: z.string(),
  description: z.string().nullable(),
  slug: z.string(),
})

export const CategorySchema = z.object({
  categoryId: IdSchema,
  title: z.string(),
  description: z.string().nullable(),
  slug: z.string(),
  image: z.string().nullable(),
  keywords: z.array(z.string()).optional(),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  createdAt: z.coerce.date().optional(),
  updatedAt: z.coerce.date().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const PostSchema = z.object({
  postId: IdSchema,
  title: z.string(),
  content: z.string(),
  authorId: IdSchema,
  description: z.string().nullable(),
  slug: z.string(),
  keywords: z.array(z.string()).default([]),
  seoTitle: z.string().nullable().optional(),
  seoDescription: z.string().nullable().optional(),
  categoryId: IdSchema,
  image: z.string().nullable(),
  status: PostStatusEnum.default('DRAFT'),
  views: z.number().int().nonnegative().default(0),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date().optional(),
  publishedAt: z.coerce.date().nullable().optional(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const CommentSchema = z.object({
  commentId: IdSchema,
  content: z.string(),
  postId: IdSchema,
  parentId: IdSchema.nullable(),
  email: z.string().email().nullable(),
  name: z.string().nullable(),
  status: CommentStatusEnum.default('NOT_PUBLISHED'),
  createdAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable().optional(),
})

export const SeriesPostStubSchema = z.object({
  postId: IdSchema,
  title: z.string(),
  slug: z.string(),
  status: PostStatusEnum.or(z.string()),
  category: z.object({
    slug: z.string(),
  }),
})

export const SeriesEntrySchema = z.object({
  id: IdSchema,
  order: z.number().int().nonnegative(),
  postId: IdSchema,
  seriesId: IdSchema,
  post: SeriesPostStubSchema,
})

export const PostSeriesSchema = z.object({
  id: IdSchema,
  title: z.string(),
  slug: z.string(),
  description: z.string().nullable(),
  image: z.string().nullable(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  deletedAt: z.coerce.date().nullable().optional(),
  entries: z.array(SeriesEntrySchema).default([]),
})

export const PostSeriesRefSchema = z.object({
  order: z.number().int().nonnegative(),
  seriesId: IdSchema,
  series: PostSeriesSchema,
})

export const PostWithDataSchema = PostSchema.extend({
  author: SafeUserSchema.pick({
    userId: true,
    userProfile: true,
  }),
  category: CategorySchema.pick({
    categoryId: true,
    title: true,
    slug: true,
    image: true,
    description: true,
    keywords: true,
    createdAt: true,
    updatedAt: true,
  }),
  translations: z.array(PostTranslationSchema).optional(),
  seriesEntry: PostSeriesRefSchema.nullable().optional(),
})

export const CommentWithDataSchema = CommentSchema.extend({
  post: PostSchema.pick({
    postId: true,
    title: true,
    slug: true,
  }),
})

export const PostLikeSchema = z.object({
  postLikeId: IdSchema,
  postId: IdSchema,
  userId: IdSchema.nullable().optional(),
  ipAddress: z.string().nullable().optional(),
  deviceFingerprint: z.string().nullable().optional(),
  createdAt: z.coerce.date(),
})


export type CommentStatus = z.infer<typeof CommentStatusEnum>
export type PostStatus = z.infer<typeof PostStatusEnum>

export type Post = z.infer<typeof PostSchema>
export type PostTranslation = z.infer<typeof PostTranslationSchema>
export type PostWithData = z.infer<typeof PostWithDataSchema>
export type PostWithTranslation = PostWithData & {
  translations?: PostTranslation[]
}

export type Category = z.infer<typeof CategorySchema>
export type CategoryTranslation = z.infer<typeof CategoryTranslationSchema>
export type CategoryWithTranslations = Category & {
  translations?: CategoryTranslation[]
}

export type Comment = z.infer<typeof CommentSchema>
export type CommentWithData = z.infer<typeof CommentWithDataSchema>
export type PostLike = z.infer<typeof PostLikeSchema>

export type SeriesPostStub = z.infer<typeof SeriesPostStubSchema>
export type SeriesEntry = z.infer<typeof SeriesEntrySchema>
export type PostSeries = z.infer<typeof PostSeriesSchema>
export type PostSeriesRef = z.infer<typeof PostSeriesRefSchema>
