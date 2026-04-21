'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Avatar } from '@/modules/ui/Avatar';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import { Pagination } from '@/modules/ui/Pagination';
import { Badge } from '@/modules/ui/Badge';

type Comment = {
  id: string;
  author: string;
  body: string;
  likes: number;
  timeAgo: string;
};

const ALL_COMMENTS: Comment[] = [
  { id: 'c1', author: 'Bob Wilson', body: 'Zustand is my go-to — minimal boilerplate and excellent TypeScript support.', likes: 24, timeAgo: '2h ago' },
  { id: 'c2', author: 'Carol Diaz', body: 'Redux Toolkit is still great for large teams due to the ecosystem and devtools.', likes: 18, timeAgo: '3h ago' },
  { id: 'c3', author: 'David Park', body: 'Jotai\'s atomic model is brilliant for complex interdependent state trees.', likes: 15, timeAgo: '4h ago' },
  { id: 'c4', author: 'Emma Brown', body: 'For server state specifically, React Query (TanStack Query) is unbeatable.', likes: 31, timeAgo: '5h ago' },
  { id: 'c5', author: 'Frank Li', body: 'Context API + useReducer still works perfectly for mid-size apps.', likes: 9, timeAgo: '6h ago' },
  { id: 'c6', author: 'Grace Kim', body: 'Valtio is really underrated — mutable proxy state is very ergonomic.', likes: 7, timeAgo: '8h ago' },
  { id: 'c7', author: 'Henry Wu', body: 'Depends on your team size and complexity. No silver bullet!', likes: 12, timeAgo: '10h ago' },
];

const PAGE_SIZE = 3;

export function CommentThread() {
  const [page, setPage] = useState(1);
  const [reply, setReply] = useState('');
  const [comments, setComments] = useState<Comment[]>(ALL_COMMENTS);

  const totalPages = Math.ceil(comments.length / PAGE_SIZE);
  const pageComments = comments.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);

  function handleReply() {
    if (!reply.trim()) return;
    const newComment: Comment = {
      id: `c${Date.now()}`,
      author: 'You',
      body: reply,
      likes: 0,
      timeAgo: 'just now',
    };
    setComments((prev) => [newComment, ...prev]);
    setReply('');
    setPage(1);
  }

  return (
    <div className="space-y-3 max-w-lg">
      <div className="flex items-center gap-2">
        <h3 className="text-sm font-semibold text-text-primary">Comments</h3>
        <Badge variant="neutral" size="sm">{comments.length}</Badge>
      </div>

      <div className="flex gap-2 items-end">
        <Input id="comment-reply" label="" placeholder="Write a reply…" value={reply} onChange={(e) => setReply(e.target.value)} className="flex-1" />
        <Button variant="primary" size="sm" onClick={handleReply} disabled={!reply.trim()}>Reply</Button>
      </div>

      <div className="space-y-2">
        {pageComments.map((c) => (
          <Card key={c.id}>
            <div className="p-3 flex gap-3">
              <Avatar name={c.author} size="sm" />
              <div className="flex-1 min-w-0 space-y-1">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="text-sm font-medium text-text-primary">{c.author}</span>
                  <Badge variant="neutral" size="sm">{c.timeAgo}</Badge>
                </div>
                <p className="text-sm text-text-secondary">{c.body}</p>
                <Button variant="ghost" size="sm">👍 {c.likes}</Button>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {totalPages > 1 && (
        <Pagination page={page} totalPages={totalPages} onPageChange={setPage} />
      )}
    </div>
  );
}
