'use client';
import { useMemo } from 'react';
import { cn } from '@/libs/utils/cn';
import { CommentItem } from './CommentItem';
import { CommentForm } from './CommentForm';
import type { Comment } from '../types';
import type { Id } from '@/modules/domains/common/types';

type SubmitPayload = { name: string; email: string; content: string; postId: Id; parentId?: Id | null };

type CommentListProps = {
  comments: Comment[];
  postId: Id;
  onSubmitComment?: (values: SubmitPayload) => Promise<void> | void;
  className?: string;
};

export function CommentList({ comments, postId, onSubmitComment, className }: CommentListProps) {
  const { roots, repliesMap } = useMemo(() => {
    const published = comments.filter((c) => c.status === 'PUBLISHED');
    const roots = published.filter((c) => c.parentId === null);
    const repliesMap = new Map<Id, Comment[]>();
    for (const c of published) {
      if (c.parentId !== null) {
        const existing = repliesMap.get(c.parentId) ?? [];
        existing.push(c);
        repliesMap.set(c.parentId, existing);
      }
    }
    return { roots, repliesMap };
  }, [comments]);

  return (
    <section className={cn('space-y-8', className)} aria-label="Comments">
      <header className="flex items-center gap-2">
        <h2 className="text-lg font-semibold text-text-primary">Comments</h2>
        {roots.length > 0 && (
          <span className="text-sm text-text-secondary">({roots.length})</span>
        )}
      </header>

      {roots.length === 0 ? (
        <p className="text-sm text-text-secondary">No comments yet. Be the first to comment!</p>
      ) : (
        <div className="space-y-6">
          {roots.map((comment) => (
            <CommentItem
              key={comment.commentId}
              comment={comment}
              replies={repliesMap.get(comment.commentId) ?? []}
              onSubmitReply={onSubmitComment}
              className="pt-6 first:pt-0"
            />
          ))}
        </div>
      )}

      {onSubmitComment && (
        <div className="border-t border-border pt-8">
          <h3 className="text-base font-semibold text-text-primary mb-4">Leave a Comment</h3>
          <CommentForm postId={postId} onSubmit={onSubmitComment} />
        </div>
      )}
    </section>
  );
}
