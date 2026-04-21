'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { Avatar } from '@/modules/ui/Avatar';
import { Pagination } from '@/modules/ui/Pagination';
import { Badge } from '@/modules/ui/Badge';

type Comment = {
  id: string;
  author: string;
  authorInitials: string;
  date: string;
  text: string;
  likes: number;
  isStaff?: boolean;
  replies?: Comment[];
};

const DEFAULT_COMMENTS: Comment[] = [
  {
    id: 'c1', author: 'Thomas Eriksson', authorInitials: 'TE', date: '2h ago',
    text: 'This is genuinely historic. I was a climate negotiator in the 90s and never thought we\'d see an agreement with actual enforcement mechanisms.',
    likes: 214, isStaff: false,
    replies: [
      { id: 'c1r1', author: 'Sarah Mitchell', authorInitials: 'SM', date: '1h ago', text: 'Thank you for this perspective, Thomas. Would you be open to an interview for a follow-up piece?', likes: 87, isStaff: true },
    ],
  },
  {
    id: 'c2', author: 'Priya Nair', authorInitials: 'PN', date: '3h ago',
    text: 'The $500B commitment sounds huge but developing nations need the money NOW, not in 5-year tranches. The devil will be in the disbursement details.',
    likes: 156, isStaff: false,
    replies: [],
  },
  {
    id: 'c3', author: 'Marcus Chen', authorInitials: 'MC', date: '4h ago',
    text: 'Incredible reporting as always. The detail about the US-China bilateral negotiation is something I haven\'t seen covered anywhere else.',
    likes: 98, isStaff: false,
    replies: [],
  },
  {
    id: 'c4', author: 'Elena Vasquez', authorInitials: 'EV', date: '5h ago',
    text: 'From an economic standpoint, the carbon pricing mechanism embedded in this accord could reshape commodity markets over the next decade.',
    likes: 74, isStaff: false,
    replies: [],
  },
  {
    id: 'c5', author: 'Omar Hassan', authorInitials: 'OH', date: '6h ago',
    text: 'Egypt and other African nations got much better terms than in previous COPs. The $100B annual allocation for adaptation is a real step forward.',
    likes: 62, isStaff: false,
    replies: [],
  },
  {
    id: 'c6', author: 'Julia Hoffmann', authorInitials: 'JH', date: '7h ago',
    text: 'The ratchet mechanism is clever but only as strong as the political will to enforce it. We\'ve seen institutions erode before.',
    likes: 45, isStaff: false,
    replies: [],
  },
];

const PAGE_SIZE = 3;

function CommentItem({ comment, depth = 0 }: { comment: Comment; depth?: number }) {
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(comment.likes);

  return (
    <div className={depth > 0 ? 'ml-8 pl-4 border-l-2 border-border' : ''}>
      <div className="flex items-start gap-3 py-3">
        <Avatar name={comment.author} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap mb-1">
            <span className="text-sm font-semibold text-text-primary">{comment.author}</span>
            {comment.isStaff && <Badge variant="info" size="sm">Staff</Badge>}
            <span className="text-xs text-text-disabled">{comment.date}</span>
          </div>
          <p className="text-sm text-text-primary leading-relaxed">{comment.text}</p>
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => { setLiked((v) => !v); setLikeCount((c) => liked ? c - 1 : c + 1); }}
              className="flex items-center gap-1.5 text-xs text-text-secondary hover:text-primary transition-colors focus-visible:outline-none"
              aria-pressed={liked}
            >
              <span>{liked ? '♥' : '♡'}</span>
              <Badge variant={liked ? 'error' : 'neutral'} size="sm">{likeCount}</Badge>
            </button>
            <button className="text-xs text-text-secondary hover:text-primary transition-colors focus-visible:outline-none">
              Reply
            </button>
          </div>
        </div>
      </div>
      {comment.replies?.map((reply) => (
        <CommentItem key={reply.id} comment={reply} depth={depth + 1} />
      ))}
    </div>
  );
}

export function CommentList({
  comments = DEFAULT_COMMENTS,
  className,
}: {
  comments?: Comment[];
  className?: string;
}) {
  const [page, setPage] = useState(1);
  const totalPages = Math.max(1, Math.ceil(comments.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const paged = comments.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  return (
    <div className={className}>
      <div className="flex items-center gap-2 mb-4">
        <h3 className="text-base font-bold text-text-primary">Comments</h3>
        <Badge variant="neutral" size="sm">{comments.length}</Badge>
      </div>
      <Card>
        <div className="divide-y divide-border px-4">
          {paged.map((comment) => (
            <CommentItem key={comment.id} comment={comment} />
          ))}
        </div>
      </Card>
      {totalPages > 1 && (
        <div className="flex justify-center mt-4">
          <Pagination page={safePage} totalPages={totalPages} onPageChange={setPage} />
        </div>
      )}
    </div>
  );
}
