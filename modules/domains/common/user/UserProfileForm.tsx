'use client';
import { useState } from 'react';
import { Form } from '@/modules/app/Form';
import { Input } from '@/modules/ui/Input';
import { Textarea } from '@/modules/ui/Textarea';
import { Button } from '@/modules/ui/Button';
import type { UserProfile } from '../types';

type UserProfileFormErrors = Partial<Record<keyof UserProfile, string>>;

type UserProfileFormProps = {
  initial?: Partial<UserProfile>;
  onSubmit: (values: UserProfile) => Promise<void> | void;
  onCancel?: () => void;
  error?: string;
  className?: string;
};

export function UserProfileForm({ initial = {}, onSubmit, onCancel, error, className }: UserProfileFormProps) {
  const [values, setValues] = useState<UserProfile>({
    name:           initial.name           ?? null,
    username:       initial.username       ?? null,
    biography:      initial.biography      ?? null,
    profilePicture: initial.profilePicture ?? null,
  });
  const [errors, setErrors] = useState<UserProfileFormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: UserProfileFormErrors = {};
    if (values.username && !/^[a-z0-9_]{3,32}$/.test(values.username)) {
      next.username = 'Username must be 3–32 characters: lowercase letters, numbers, underscores.';
    }
    if (values.biography && values.biography.length > 300) {
      next.biography = 'Bio must be 300 characters or less.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try { await onSubmit(values); } finally { setLoading(false); }
  }

  function set<K extends keyof UserProfile>(key: K, val: UserProfile[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      className={className}
      actions={
        <>
          {onCancel && <Button type="button" variant="outline" onClick={onCancel} disabled={loading}>Cancel</Button>}
          <Button type="submit" loading={loading}>Save Profile</Button>
        </>
      }
    >
      <Input
        id="profile-name"
        label="Display Name"
        type="text"
        autoComplete="name"
        value={values.name ?? ''}
        onChange={(e) => set('name', e.target.value || null)}
        error={errors.name ?? undefined}
      />

      <Input
        id="profile-username"
        label="Username"
        type="text"
        autoComplete="username"
        value={values.username ?? ''}
        onChange={(e) => set('username', e.target.value || null)}
        error={errors.username ?? undefined}
      />

      <Textarea
        id="profile-bio"
        label="Bio"
        rows={3}
        value={values.biography ?? ''}
        onChange={(e) => set('biography', e.target.value || null)}
        error={errors.biography ?? undefined}
      />

      <Input
        id="profile-picture"
        label="Profile Picture URL"
        type="url"
        value={values.profilePicture ?? ''}
        onChange={(e) => set('profilePicture', e.target.value || null)}
        error={errors.profilePicture ?? undefined}
      />
    </Form>
  );
}
