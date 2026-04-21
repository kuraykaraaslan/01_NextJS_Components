'use client';
import { useState } from 'react';
import { cn } from '@/libs/utils/cn';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { TagInput } from '@/modules/ui/TagInput';
import { ContentScoreBar, type ScoreRule } from '@/modules/ui/ContentScoreBar';
import { Button } from '@/modules/ui/Button';

const SEO_RULES: ScoreRule[] = [
  { label: 'Title is 50–70 characters',      check: (v) => v.length >= 50 && v.length <= 70,   points: 25 },
  { label: 'Body is at least 300 words',      check: (v) => v.split(/\s+/).filter(Boolean).length >= 300, points: 30 },
  { label: 'Has at least 3 tags',             check: () => true, points: 0 }, // evaluated separately
  { label: 'Excerpt is 120–160 characters',   check: (v) => v.length >= 120 && v.length <= 160, points: 20 },
];

function buildSeoRules(tags: string[]): ScoreRule[] {
  return [
    { label: 'Title is 50–70 characters',    check: (v) => v.length >= 50 && v.length <= 70,   points: 25 },
    { label: 'Body is at least 300 words',   check: (v) => v.split(/\s+/).filter(Boolean).length >= 300, points: 30 },
    { label: 'Has at least 3 tags',          check: () => tags.length >= 3,                     points: 25 },
    { label: 'Excerpt is 120–160 chars',     check: (v) => v.length >= 120 && v.length <= 160,  points: 20 },
  ];
}

export type ArticleDraft = {
  title: string;
  slug: string;
  excerpt: string;
  body: string;
  tags: string[];
};

export function ArticleEditor({
  initial,
  onSave,
  onPreview,
  className,
}: {
  initial?: Partial<ArticleDraft>;
  onSave?: (draft: ArticleDraft) => void;
  onPreview?: (draft: ArticleDraft) => void;
  className?: string;
}) {
  const [title,   setTitle]   = useState(initial?.title   ?? '');
  const [slug,    setSlug]    = useState(initial?.slug    ?? '');
  const [excerpt, setExcerpt] = useState(initial?.excerpt ?? '');
  const [body,    setBody]    = useState(initial?.body    ?? '');
  const [tags,    setTags]    = useState<string[]>(initial?.tags ?? []);
  const [errors,  setErrors]  = useState<Record<string, string>>({});

  const seoRules = buildSeoRules(tags);
  const scoreValue = title + ' ' + excerpt + ' ' + body;

  function autoSlug(t: string) {
    return t.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
  }

  function handleTitleChange(v: string) {
    setTitle(v);
    if (!slug || slug === autoSlug(title)) setSlug(autoSlug(v));
  }

  function validate() {
    const e: Record<string, string> = {};
    if (!title)   e.title   = 'Title is required';
    if (!body)    e.body    = 'Body content is required';
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function handleSave() {
    if (!validate()) return;
    onSave?.({ title, slug, excerpt, body, tags });
  }

  return (
    <div className={cn('space-y-5', className)}>
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="sm:col-span-2">
          <Input
            id="article-title"
            label="Title"
            placeholder="Enter article title…"
            value={title}
            onChange={(e) => handleTitleChange(e.target.value)}
            error={errors.title}
            required
            showCount
            maxLength={70}
          />
        </div>
        <Input
          id="article-slug"
          label="URL slug"
          placeholder="auto-generated-from-title"
          value={slug}
          onChange={(e) => setSlug(e.target.value)}
          prefixIcon="/"
        />
        <TagInput
          id="article-tags"
          label="Tags"
          placeholder="Add tags…"
          value={tags}
          onChange={setTags}
        />
        <div className="sm:col-span-2">
          <Textarea
            id="article-excerpt"
            label="Excerpt"
            placeholder="Brief description shown in search results and social previews (120–160 chars)…"
            rows={2}
            value={excerpt}
            onChange={(e) => setExcerpt(e.target.value)}
          />
        </div>
        <div className="sm:col-span-2">
          <Textarea
            id="article-body"
            label="Body"
            placeholder="Write your article content here…"
            rows={12}
            value={body}
            onChange={(e) => setBody(e.target.value)}
            error={errors.body}
            required
          />
        </div>
      </div>

      <ContentScoreBar value={scoreValue} rules={seoRules} label="SEO & content score" />

      <div className="flex justify-end gap-3">
        {onPreview && (
          <Button variant="outline" onClick={() => onPreview({ title, slug, excerpt, body, tags })} iconLeft="👁">
            Preview
          </Button>
        )}
        <Button variant="primary" onClick={handleSave} iconLeft="💾">Save draft</Button>
      </div>
    </div>
  );
}
