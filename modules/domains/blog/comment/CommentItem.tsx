'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Avatar } from '@/modules/ui/Avatar';
import { Button } from '@/modules/ui/Button';
import { CommentForm } from './CommentForm';
import type { Comment } from '../types';
import type { Id } from '@/modules/domains/common/types';

type CommentItemProps = {
  comment: Comment;
  replies?: Comment[];
  onSubmitReply?: (values: { name: string; email: string; content: string; postId: Id; parentId: Id | null }) => Promise<void> | void;
  depth?: number;
  className?: string;
};

export function CommentItem({ comment, replies = [], onSubmitReply, depth = 0, className }: CommentItemProps) {
  const [showReplyForm, setShowReplyForm] = useState(false);

  const authorName = comment.name ?? 'Anonymous';
  const dateStr = comment.createdAt.toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className={cn('flex gap-3', className)}>
      <Avatar src={null} name={authorName} size="sm" className="shrink-0 mt-0.5" />
      <div className="flex-1 min-w-0">
        <div className="flex items-baseline gap-2 flex-wrap">
          <span className="text-sm font-semibold text-text-primary">{authorName}</span>
          <time className="text-xs text-text-secondary" dateTime={comment.createdAt.toISOString()}>
            {dateStr}
          </time>
        </div>
        <p className="mt-1.5 text-sm text-text-primary leading-relaxed whitespace-pre-wrap">
          {comment.content}
        </p>
        {depth < 1 && onSubmitReply && (
          <div className="mt-2">
            {showReplyForm ? (
              <CommentForm
                postId={comment.postId}
                parentId={comment.commentId}
                onSubmit={async (vals) => {
                  await onSubmitReply({ ...vals, parentId: vals.parentId ?? null });
                  setShowReplyForm(false);
                }}
                onCancel={() => setShowReplyForm(false)}
                className="mt-3"
              />
            ) : (
              <Button
                variant="ghost"
                size="xs"
                onClick={() => setShowReplyForm(true)}
              >
                Reply
              </Button>
            )}
          </div>
        )}
        {replies.length > 0 && (
          <div className="mt-4 space-y-4 pl-4">
            {replies.map((reply) => (
              <CommentItem
                key={reply.commentId}
                comment={reply}
                depth={depth + 1}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
