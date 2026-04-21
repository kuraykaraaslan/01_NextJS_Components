'use client';
import { useState } from 'react';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { Button } from '@/modules/ui/Button';
import { Checkbox } from '@/modules/ui/Checkbox';

export function CommentComposer({ className }: { className?: string }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [comment, setComment] = useState('');
  const [agreed, setAgreed] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const canSubmit = name.trim().length > 0 && comment.trim().length > 10 && agreed;

  function handleSubmit() {
    if (!canSubmit) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1000);
  }

  if (submitted) {
    return (
      <div className={`rounded-xl border border-success bg-success-subtle p-6 text-center ${className}`}>
        <div className="text-3xl mb-2">✓</div>
        <p className="text-sm font-semibold text-success-fg">Comment submitted for review</p>
        <p className="text-xs text-success-fg/80 mt-1">
          Your comment will appear after moderation (usually within 2 hours).
        </p>
        <button
          onClick={() => { setSubmitted(false); setName(''); setEmail(''); setComment(''); setAgreed(false); }}
          className="mt-3 text-xs text-success-fg underline underline-offset-2 hover:opacity-70 transition-opacity"
        >
          Write another comment
        </button>
      </div>
    );
  }

  return (
    <div className={`rounded-xl border border-border bg-surface-raised p-5 space-y-4 ${className}`}>
      <h3 className="text-base font-bold text-text-primary">Leave a comment</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <Input
          id="comment-name"
          label="Name *"
          placeholder="Your full name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <Input
          id="comment-email"
          label="Email (optional)"
          type="email"
          placeholder="your@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>
      <Textarea
        id="comment-body"
        label="Comment *"
        placeholder="Share your thoughts on this article… (minimum 10 characters)"
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        rows={4}
        hint={`${comment.length} characters`}
      />
      <Checkbox
        id="comment-terms"
        label="I agree to the community guidelines and terms of service"
        checked={agreed}
        onChange={(e) => setAgreed(e.target.checked)}
      />
      <div className="flex items-center justify-between gap-3">
        <p className="text-xs text-text-disabled">
          Comments are moderated. Respectful discussion only.
        </p>
        <Button
          variant="primary"
          size="sm"
          disabled={!canSubmit}
          loading={loading}
          onClick={handleSubmit}
        >
          Post comment
        </Button>
      </div>
    </div>
  );
}
