'use client';
import { useState } from 'react';
import { Form } from '@/modules/app/Form';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { TagInput } from '@/modules/ui/TagInput';
import { Button } from '@/modules/ui/Button';
import type { SeoFields } from '../SeoTypes';

type SeoFormErrors = { seoTitle?: string; seoDescription?: string };

type SeoFormProps = {
  initial?: Partial<SeoFields>;
  onSubmit: (values: SeoFields) => Promise<void> | void;
  onCancel?: () => void;
  error?: string;
  className?: string;
};

export function SeoForm({ initial = {}, onSubmit, onCancel, error, className }: SeoFormProps) {
  const [values, setValues] = useState<SeoFields>({
    seoTitle:       initial.seoTitle       ?? null,
    seoDescription: initial.seoDescription ?? null,
    keywords:       initial.keywords       ?? [],
  });
  const [errors, setErrors] = useState<SeoFormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: SeoFormErrors = {};
    if (values.seoTitle && values.seoTitle.length > 60)
      next.seoTitle = 'Title should be 60 characters or less for best SEO results.';
    if (values.seoDescription && values.seoDescription.length > 160)
      next.seoDescription = 'Description should be 160 characters or less.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try { await onSubmit(values); } finally { setLoading(false); }
  }

  const titleLen = values.seoTitle?.length ?? 0;
  const descLen  = values.seoDescription?.length ?? 0;

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      className={className}
      actions={
        <>
          {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>}
          <Button type="submit" loading={loading}>Save SEO</Button>
        </>
      }
    >
      <Input
        id="seo-title"
        label="SEO Title"
        type="text"
        placeholder="Page title for search engines"
        value={values.seoTitle ?? ''}
        onChange={(e) => setValues((v) => ({ ...v, seoTitle: e.target.value || null }))}
        error={errors.seoTitle}
        hint={`${titleLen}/60`}
      />

      <Textarea
        id="seo-description"
        label="Meta Description"
        rows={3}
        placeholder="Short description shown in search results"
        value={values.seoDescription ?? ''}
        onChange={(e) => setValues((v) => ({ ...v, seoDescription: e.target.value || null }))}
        error={errors.seoDescription}
        hint={`${descLen}/160`}
      />

      <TagInput
        id="seo-keywords"
        label="Keywords"
        value={values.keywords ?? []}
        onChange={(keywords) => setValues((v) => ({ ...v, keywords }))}
        placeholder="Add keyword…"
      />
    </Form>
  );
}
