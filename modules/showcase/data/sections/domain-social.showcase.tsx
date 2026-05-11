'use client';
import type { ShowcaseComponent } from '../showcase.types';
import { PostStatusBadge } from '@/modules/domains/social/post/PostStatusBadge';
import { PostPrivacyBadge } from '@/modules/domains/social/post/PostPrivacyBadge';
import { PostCard } from '@/modules/domains/social/post/PostCard';
import { SocialProfileCard } from '@/modules/domains/social/profile/SocialProfileCard';
import { SocialNotificationItem } from '@/modules/domains/social/notification/SocialNotificationItem';
import { MarketplaceListingCard } from '@/modules/domains/social/marketplace/MarketplaceListingCard';

/* ─── demo data ─── */

const DEMO_USER_FULL = {
  userId: 'user-01',
  username: 'lena_design',
  name: 'Lena Fischer',
  avatar: 'https://i.pravatar.cc/150?img=47',
  coverImage: 'https://picsum.photos/seed/cover-lena/800/200',
  bio: 'Product designer & creative coder. Turning complex problems into simple, beautiful solutions. ✨',
  location: 'Berlin, Germany',
  website: 'https://lena.design',
  followerCount: 12400,
  followingCount: 320,
  postCount: 284,
  isVerified: true,
  isFollowing: false,
  isFollowedBy: true,
};

const DEMO_USER_MINIMAL = {
  userId: 'user-02',
  username: 'marco_dev',
  name: 'Marco Rossi',
  avatar: 'https://i.pravatar.cc/150?img=11',
  bio: null,
  followerCount: 540,
  followingCount: 210,
  postCount: 47,
  isVerified: false,
  isFollowing: true,
  isFollowedBy: false,
};

const DEMO_POST_TEXT: Parameters<typeof PostCard>[0]['post'] = {
  postId: 'post-01',
  authorId: 'user-01',
  content: 'Just shipped a new open-source design system built with Tailwind CSS and React. Over 40 components, dark mode support, and full accessibility. Check it out! 🚀',
  type: 'TEXT',
  status: 'PUBLISHED',
  privacy: 'PUBLIC',
  likeCount: 248,
  commentCount: 34,
  shareCount: 71,
  isLiked: true,
  isBookmarked: false,
  createdAt: new Date(Date.now() - 3 * 60 * 60 * 1000),
  author: DEMO_USER_FULL,
};

const DEMO_POST_IMAGE: Parameters<typeof PostCard>[0]['post'] = {
  postId: 'post-02',
  authorId: 'user-02',
  content: 'Morning vibes from the home office ☕',
  type: 'IMAGE',
  status: 'PUBLISHED',
  privacy: 'FRIENDS',
  mediaUrls: [
    'https://picsum.photos/seed/office1/600/400',
    'https://picsum.photos/seed/office2/600/400',
  ],
  likeCount: 92,
  commentCount: 8,
  shareCount: 3,
  isLiked: false,
  isBookmarked: true,
  createdAt: new Date(Date.now() - 22 * 60 * 60 * 1000),
  author: DEMO_USER_MINIMAL,
};

const DEMO_NOTIFICATION_LIKE: Parameters<typeof SocialNotificationItem>[0]['notification'] = {
  notificationId: 'notif-01',
  userId: 'me',
  type: 'LIKE',
  actorId: 'user-01',
  postId: 'post-01',
  message: 'liked your post',
  isRead: false,
  createdAt: new Date(Date.now() - 5 * 60 * 1000),
  actor: DEMO_USER_FULL,
};

const DEMO_NOTIFICATION_FOLLOW: Parameters<typeof SocialNotificationItem>[0]['notification'] = {
  notificationId: 'notif-02',
  userId: 'me',
  type: 'FOLLOW',
  actorId: 'user-02',
  message: 'started following you',
  isRead: true,
  createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
  actor: DEMO_USER_MINIMAL,
};

const DEMO_LISTING: Parameters<typeof MarketplaceListingCard>[0]['listing'] = {
  listingId: 'listing-01',
  sellerId: 'user-01',
  title: 'Herman Miller Aeron Chair – Size B',
  description: 'Barely used, great condition. Moving to a new city.',
  price: 650,
  currency: 'USD',
  status: 'ACTIVE',
  condition: 'LIKE_NEW',
  category: 'Furniture',
  location: 'Berlin',
  imageUrls: ['https://picsum.photos/seed/chair1/400/400'],
  seller: DEMO_USER_FULL,
};

const DEMO_LISTING_CHEAP: Parameters<typeof MarketplaceListingCard>[0]['listing'] = {
  listingId: 'listing-02',
  sellerId: 'user-02',
  title: 'Vintage film camera — Pentax K1000',
  description: 'Works perfectly. Great for beginners.',
  price: 89,
  currency: 'USD',
  status: 'ACTIVE',
  condition: 'GOOD',
  category: 'Electronics',
  location: 'Milan',
  seller: DEMO_USER_MINIMAL,
};

/* ─── builder ─── */

export function buildSocialDomainData(): ShowcaseComponent[] {
  return [
    /* PostStatusBadge */
    {
      id: 'social-post-status-badge',
      title: 'PostStatusBadge',
      category: 'Domain',
      abbr: 'PS',
      description: 'Displays the publication status of a social post — published, draft, archived, or deleted.',
      filePath: 'modules/domains/social/post/PostStatusBadge.tsx',
      sourceCode: `import { PostStatusBadge } from '@/modules/domains/social/post/PostStatusBadge';
<PostStatusBadge status="PUBLISHED" />`,
      variants: [
        {
          title: 'All statuses',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['PUBLISHED', 'DRAFT', 'ARCHIVED', 'DELETED'] as const).map((s) => (
                <PostStatusBadge key={s} status={s} />
              ))}
            </div>
          ),
          code: `{(['PUBLISHED', 'DRAFT', 'ARCHIVED', 'DELETED'] as const).map((s) => (
  <PostStatusBadge key={s} status={s} />
))}`,
        },
        {
          title: 'Small size',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-2">
              {(['PUBLISHED', 'DRAFT'] as const).map((s) => (
                <PostStatusBadge key={s} status={s} size="sm" />
              ))}
            </div>
          ),
          code: `<PostStatusBadge status="PUBLISHED" size="sm" />
<PostStatusBadge status="DRAFT" size="sm" />`,
        },
      ],
    },

    /* PostPrivacyBadge */
    {
      id: 'social-post-privacy-badge',
      title: 'PostPrivacyBadge',
      category: 'Domain',
      abbr: 'PP',
      description: 'Compact icon (+ optional label) showing post visibility — public, friends only, or private.',
      filePath: 'modules/domains/social/post/PostPrivacyBadge.tsx',
      sourceCode: `import { PostPrivacyBadge } from '@/modules/domains/social/post/PostPrivacyBadge';
<PostPrivacyBadge privacy="PUBLIC" showLabel />`,
      variants: [
        {
          title: 'Icon + label',
          layout: 'stack',
          preview: (
            <div className="flex flex-wrap gap-4">
              {(['PUBLIC', 'FRIENDS', 'PRIVATE'] as const).map((p) => (
                <PostPrivacyBadge key={p} privacy={p} showLabel />
              ))}
            </div>
          ),
          code: `<PostPrivacyBadge privacy="PUBLIC"  showLabel />
<PostPrivacyBadge privacy="FRIENDS" showLabel />
<PostPrivacyBadge privacy="PRIVATE" showLabel />`,
        },
        {
          title: 'Icon only',
          layout: 'stack',
          preview: (
            <div className="flex gap-3">
              {(['PUBLIC', 'FRIENDS', 'PRIVATE'] as const).map((p) => (
                <PostPrivacyBadge key={p} privacy={p} />
              ))}
            </div>
          ),
          code: `<PostPrivacyBadge privacy="PUBLIC" />
<PostPrivacyBadge privacy="FRIENDS" />
<PostPrivacyBadge privacy="PRIVATE" />`,
        },
      ],
    },

    /* PostCard */
    {
      id: 'social-post-card',
      title: 'PostCard',
      category: 'Domain',
      abbr: 'PC',
      description: 'Social media post card with author info, text content, optional media grid, and like / comment / share / bookmark actions.',
      filePath: 'modules/domains/social/post/PostCard.tsx',
      sourceCode: `import { PostCard } from '@/modules/domains/social/post/PostCard';
<PostCard post={post} />`,
      variants: [
        {
          title: 'Text post (liked)',
          layout: 'stack',
          preview: <PostCard post={DEMO_POST_TEXT} />,
          code: `<PostCard post={{
  postId: 'post-01',
  content: 'Just shipped a new open-source design system…',
  privacy: 'PUBLIC',
  likeCount: 248, commentCount: 34, shareCount: 71,
  isLiked: true, isBookmarked: false,
  author: { name: 'Lena Fischer', username: 'lena_design', isVerified: true, ... },
}} />`,
        },
        {
          title: 'Image post (friends only)',
          layout: 'stack',
          preview: <PostCard post={DEMO_POST_IMAGE} />,
          code: `<PostCard post={{
  postId: 'post-02',
  content: 'Morning vibes from the home office ☕',
  privacy: 'FRIENDS',
  mediaUrls: ['https://picsum.photos/seed/office1/600/400', ...],
  likeCount: 92, commentCount: 8, shareCount: 3,
  isBookmarked: true,
  author: { name: 'Marco Rossi', username: 'marco_dev', ... },
}} />`,
        },
      ],
    },

    /* SocialProfileCard */
    {
      id: 'social-profile-card',
      title: 'SocialProfileCard',
      category: 'Domain',
      abbr: 'SC',
      description: 'User profile card with cover image, avatar, bio, location, website, follower / following stats, and follow / message actions.',
      filePath: 'modules/domains/social/profile/SocialProfileCard.tsx',
      sourceCode: `import { SocialProfileCard } from '@/modules/domains/social/profile/SocialProfileCard';
<SocialProfileCard user={user} />`,
      variants: [
        {
          title: 'Full profile — other user',
          layout: 'stack',
          preview: <SocialProfileCard user={DEMO_USER_FULL} />,
          code: `<SocialProfileCard user={{
  userId: 'user-01',
  name: 'Lena Fischer',
  username: 'lena_design',
  bio: 'Product designer & creative coder.',
  location: 'Berlin, Germany',
  website: 'https://lena.design',
  followerCount: 12400, followingCount: 320, postCount: 284,
  isVerified: true, isFollowing: false,
}} />`,
        },
        {
          title: 'Own profile (edit button)',
          layout: 'stack',
          preview: <SocialProfileCard user={DEMO_USER_MINIMAL} isOwnProfile />,
          code: `<SocialProfileCard user={user} isOwnProfile />`,
        },
      ],
    },

    /* SocialNotificationItem */
    {
      id: 'social-notification-item',
      title: 'SocialNotificationItem',
      category: 'Domain',
      abbr: 'NI',
      description: 'Notification list item showing actor avatar, type icon overlay, message and timestamp. Unread items have a distinct background and dot indicator.',
      filePath: 'modules/domains/social/notification/SocialNotificationItem.tsx',
      sourceCode: `import { SocialNotificationItem } from '@/modules/domains/social/notification/SocialNotificationItem';
<SocialNotificationItem notification={notification} />`,
      variants: [
        {
          title: 'Unread (like) + Read (follow)',
          layout: 'stack',
          preview: (
            <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
              <SocialNotificationItem notification={DEMO_NOTIFICATION_LIKE} />
              <SocialNotificationItem notification={DEMO_NOTIFICATION_FOLLOW} />
            </div>
          ),
          code: `<div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
  <SocialNotificationItem notification={{ type: 'LIKE',   isRead: false, actor: user, message: 'liked your post', ... }} />
  <SocialNotificationItem notification={{ type: 'FOLLOW', isRead: true,  actor: user, message: 'started following you', ... }} />
</div>`,
        },
        {
          title: 'All notification types',
          layout: 'stack',
          preview: (
            <div className="border border-border rounded-xl overflow-hidden divide-y divide-border">
              {(['LIKE', 'COMMENT', 'FOLLOW', 'MENTION', 'SHARE'] as const).map((type) => (
                <SocialNotificationItem
                  key={type}
                  notification={{ ...DEMO_NOTIFICATION_LIKE, notificationId: type, type, isRead: type !== 'LIKE' }}
                />
              ))}
            </div>
          ),
          code: `{(['LIKE', 'COMMENT', 'FOLLOW', 'MENTION', 'SHARE'] as const).map((type) => (
  <SocialNotificationItem key={type} notification={{ type, isRead: false, actor: user, ... }} />
))}`,
        },
      ],
    },

    /* MarketplaceListingCard */
    {
      id: 'social-marketplace-listing-card',
      title: 'MarketplaceListingCard',
      category: 'Domain',
      abbr: 'ML',
      description: 'Compact listing card for the peer-to-peer marketplace: thumbnail, price, condition badge, location, and seller info.',
      filePath: 'modules/domains/social/marketplace/MarketplaceListingCard.tsx',
      sourceCode: `import { MarketplaceListingCard } from '@/modules/domains/social/marketplace/MarketplaceListingCard';
<MarketplaceListingCard listing={listing} />`,
      variants: [
        {
          title: 'Two listings side by side',
          layout: 'stack',
          preview: (
            <div className="grid grid-cols-2 gap-3">
              <MarketplaceListingCard listing={DEMO_LISTING} />
              <MarketplaceListingCard listing={DEMO_LISTING_CHEAP} />
            </div>
          ),
          code: `<div className="grid grid-cols-2 gap-3">
  <MarketplaceListingCard listing={listing1} />
  <MarketplaceListingCard listing={listing2} />
</div>`,
        },
        {
          title: 'Single card',
          layout: 'side',
          preview: (
            <div className="max-w-[200px]">
              <MarketplaceListingCard listing={DEMO_LISTING} href="#" />
            </div>
          ),
          code: `<MarketplaceListingCard listing={listing} href="/marketplace/listing-01" />`,
        },
      ],
    },
  ];
}
