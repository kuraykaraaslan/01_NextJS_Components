'use client';
import { useState } from 'react';
import { Textarea } from '@/modules/ui/Textarea';
import { TagInput } from '@/modules/ui/TagInput';
import { Select } from '@/modules/ui/Select';
import { Button } from '@/modules/ui/Button';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Badge } from '@/modules/ui/Badge';
import { Card } from '@/modules/ui/Card';

const CHAR_LIMIT = 280;

const VISIBILITY_OPTIONS = [
  { value: 'public', label: '🌍 Public' },
  { value: 'friends', label: '👥 Friends' },
  { value: 'private', label: '🔒 Private' },
];

export function FeedComposer() {
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [visibility, setVisibility] = useState('public');

  const charsLeft = CHAR_LIMIT - body.length;
  const nearLimit = charsLeft < 40;
  const overLimit = charsLeft < 0;

  return (
    <Card className="max-w-lg">
      <div className="p-4 space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">Create Post</h3>

        {overLimit && (
          <AlertBanner variant="error" title="Character limit exceeded" message={`Your post is ${Math.abs(charsLeft)} characters over the limit.`} />
        )}

        <div className="relative">
          <Textarea
            id="feed-body"
            label="What&apos;s on your mind?"
            placeholder="Share something with your community…"
            rows={4}
            value={body}
            onChange={(e) => setBody(e.target.value)}
          />
          <span className={`absolute bottom-2 right-2 text-xs font-medium ${nearLimit ? (overLimit ? 'text-error-fg' : 'text-warning-fg') : 'text-text-disabled'}`}>
            {charsLeft}
          </span>
        </div>

        <TagInput id="feed-tags" label="Topics" placeholder="Add topics…" value={tags} onChange={setTags} />

        <div className="flex items-center gap-3 justify-between flex-wrap">
          <Select id="feed-visibility" label="" options={VISIBILITY_OPTIONS} value={visibility} onChange={(e) => setVisibility(e.target.value)} className="w-40" />
          <div className="flex items-center gap-2">
            {tags.length > 0 && <Badge variant="neutral" size="sm">{tags.length} topic{tags.length !== 1 ? 's' : ''}</Badge>}
            <Button variant="primary" disabled={!body.trim() || overLimit} iconLeft="📝">Post</Button>
          </div>
        </div>
      </div>
    </Card>
  );
}
