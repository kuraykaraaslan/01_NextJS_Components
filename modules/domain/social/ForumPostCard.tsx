'use client';
import { Card } from '@/modules/ui/Card';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { DropdownMenu } from '@/modules/ui/DropdownMenu';
import { Button } from '@/modules/ui/Button';

export type ForumPost = {
  id: string;
  author: string;
  title: string;
  excerpt: string;
  category: string;
  votes: number;
  comments: number;
  timeAgo: string;
};

const DEFAULT_POST: ForumPost = {
  id: 'p1',
  author: 'Alice Chen',
  title: 'Best practices for React state management in 2026?',
  excerpt: 'I\'ve been exploring various state management solutions and wondering what the community thinks about Zustand vs Redux Toolkit vs Jotai for large-scale apps...',
  category: 'React',
  votes: 142,
  comments: 38,
  timeAgo: '3h ago',
};

export function ForumPostCard({ post = DEFAULT_POST }: { post?: ForumPost }) {
  return (
    <Card className="max-w-lg">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Avatar name={post.author} size="sm" />
            <div>
              <p className="text-sm font-medium text-text-primary">{post.author}</p>
              <p className="text-xs text-text-secondary">{post.timeAgo}</p>
            </div>
          </div>
          <DropdownMenu
            trigger={<Button variant="ghost" size="sm">⋮</Button>}
            items={[
              { label: 'Save post', icon: '🔖' },
              { label: 'Share post', icon: '🔗' },
              { type: 'separator' },
              { label: 'Report', icon: '⚠', danger: true },
            ]}
            align="right"
          />
        </div>

        <div>
          <Badge variant="primary" size="sm">{post.category}</Badge>
          <h3 className="text-base font-semibold text-text-primary mt-1">{post.title}</h3>
          <p className="text-sm text-text-secondary mt-1 line-clamp-2">{post.excerpt}</p>
        </div>

        <div className="flex items-center gap-3">
          <Button variant="ghost" size="sm">▲ {post.votes}</Button>
          <Badge variant="neutral" size="sm">💬 {post.comments} replies</Badge>
        </div>
      </div>
    </Card>
  );
}
