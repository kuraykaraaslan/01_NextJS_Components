'use client';
import { useState } from 'react';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { TagInput } from '@/modules/ui/TagInput';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Button } from '@/modules/ui/Button';

const SEO_RULES: ScoreRule[] = [
  { label: 'Min 50 chars title', check: (v) => v.length >= 50, points: 20 },
  { label: 'Focus keyword present', check: (v) => v.toLowerCase().includes('climate') || v.toLowerCase().includes('accord') || v.toLowerCase().includes('geneva'), points: 25 },
  { label: 'Min 300 words', check: (v) => v.split(/\s+/).filter(Boolean).length >= 300, points: 30 },
  { label: 'Contains a subheading', check: (v) => v.includes('##') || v.includes('\n\n'), points: 15 },
  { label: 'No excessive caps', check: (v) => (v.match(/[A-Z]{4,}/g) ?? []).length === 0, points: 10 },
];

export function ArticleDraftEditor({ className }: { className?: string }) {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tags, setTags] = useState<string[]>(['climate', 'geneva', 'world']);
  const [saved, setSaved] = useState(false);

  const combinedContent = `${title} ${body}`;

  function handleSave() {
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  }

  return (
    <div className={className}>
      <div className="rounded-xl border border-border bg-surface-raised p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-bold text-text-primary">Article Draft Editor</h3>
          <div className="flex items-center gap-2">
            <span className="text-xs text-text-disabled">
              {body.split(/\s+/).filter(Boolean).length} words
            </span>
            <Button variant={saved ? 'secondary' : 'primary'} size="sm" onClick={handleSave}>
              {saved ? '✓ Saved' : 'Save draft'}
            </Button>
          </div>
        </div>

        <Input
          id="draft-title"
          label="Article title"
          placeholder="Write a compelling headline (aim for 50–70 characters)"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          hint={`${title.length} / 70 characters`}
        />

        <Textarea
          id="draft-body"
          label="Article body"
          placeholder="Start writing your article here… Use ## for subheadings."
          value={body}
          onChange={(e) => setBody(e.target.value)}
          rows={10}
          hint={`${body.split(/\s+/).filter(Boolean).length} words`}
        />

        <TagInput
          id="draft-tags"
          label="Tags / keywords"
          value={tags}
          onChange={setTags}
          placeholder="Add tags and press Enter…"
          hint="Add topic tags to improve discoverability"
        />

        <div className="pt-1">
          <ContentScoreBar
            value={combinedContent}
            rules={SEO_RULES}
            label="SEO Score"
          />
        </div>
      </div>
    </div>
  );
}
