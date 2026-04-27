'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { Button } from '@/modules/ui/Button';
import type { Id } from '@/modules/domains/common/types';

type CommentFormValues = {
  name: string;
  email: string;
  content: string;
};

type CommentFormErrors = Partial<Record<keyof CommentFormValues, string>>;

type CommentFormProps = {
  postId: Id;
  parentId?: Id | null;
  onSubmit?: (values: CommentFormValues & { postId: Id; parentId?: Id | null }) => Promise<void> | void;
  onCancel?: () => void;
  className?: string;
};

export function CommentForm({ postId, parentId, onSubmit, onCancel, className }: CommentFormProps) {
  const [values, setValues] = useState<CommentFormValues>({ name: '', email: '', content: '' });
  const [errors, setErrors] = useState<CommentFormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: CommentFormErrors = {};
    if (!values.name.trim()) next.name = 'Name is required';
    if (!values.email.trim()) next.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email';
    if (!values.content.trim()) next.content = 'Comment is required';
    else if (values.content.trim().length < 3) next.content = 'Must be at least 3 characters';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try {
      await onSubmit?.({ ...values, postId, parentId });
      setValues({ name: '', email: '', content: '' });
      setErrors({});
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('space-y-4', className)}>
      {parentId && (
        <p className="text-sm font-medium text-text-secondary">Replying to comment</p>
      )}
      <div className="grid sm:grid-cols-2 gap-4">
        <Input
          id={`comment-name-${parentId ?? 'root'}`}
          label="Name"
          required
          value={values.name}
          onChange={(e) => {
            setValues(v => ({ ...v, name: e.target.value }));
            setErrors(prev => ({ ...prev, name: undefined }));
          }}
          error={errors.name}
          placeholder="Your name"
        />
        <Input
          id={`comment-email-${parentId ?? 'root'}`}
          label="Email"
          type="email"
          required
          value={values.email}
          onChange={(e) => {
            setValues(v => ({ ...v, email: e.target.value }));
            setErrors(prev => ({ ...prev, email: undefined }));
          }}
          error={errors.email}
          placeholder="email@example.com"
        />
      </div>
      <Textarea
        id={`comment-content-${parentId ?? 'root'}`}
        label="Comment"
        required
        rows={4}
        value={values.content}
        onChange={(e) => {
          setValues(v => ({ ...v, content: e.target.value }));
          setErrors(prev => ({ ...prev, content: undefined }));
        }}
        error={errors.content}
        placeholder="Write your comment..."
      />
      <div className="flex items-center gap-3 justify-end">
        {onCancel && (
          <Button type="button" variant="ghost" size="sm" onClick={onCancel}>
            Cancel
          </Button>
        )}
        <Button type="submit" variant="primary" size="sm" loading={loading}>
          {parentId ? 'Reply' : 'Post Comment'}
        </Button>
      </div>
    </form>
  );
}
