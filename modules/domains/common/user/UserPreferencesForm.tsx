'use client';
import { useState } from 'react';
import { Form } from '@/modules/app/Form';
import { Toggle } from '@/modules/ui/Toggle';
import { Button } from '@/modules/ui/Button';
import { LanguageSwitcher } from '../i18n/LanguageSwitcher';
import { ThemeSwitcher } from '@/modules/app/ThemeSwitcher';
import type { UserPreferences } from '../types';

type UserPreferencesFormProps = {
  initial?: Partial<UserPreferences>;
  onSubmit: (values: UserPreferences) => Promise<void> | void;
  error?: string;
  className?: string;
};

type ThemeValue = UserPreferences['theme'];

const ControlledThemeSwitcher = ThemeSwitcher as React.ComponentType<{
  value: ThemeValue;
  onChange: (theme: ThemeValue) => void;
}>;

export function UserPreferencesForm({ initial = {}, onSubmit, error, className }: UserPreferencesFormProps) {
  const [values, setValues] = useState<UserPreferences>({
    theme:              initial.theme              ?? 'SYSTEM',
    language:           initial.language           ?? 'en',
    emailNotifications: initial.emailNotifications ?? true,
    pushNotifications:  initial.pushNotifications  ?? true,
    newsletter:         initial.newsletter         ?? true,
    timezone:           initial.timezone           ?? 'UTC',
  });
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try { await onSubmit(values); } finally { setLoading(false); }
  }

  function setField<K extends keyof UserPreferences>(key: K, val: UserPreferences[K]) {
    setValues((v) => ({ ...v, [key]: val }));
  }

  return (
    <Form
      onSubmit={handleSubmit}
      error={error}
      className={className}
      actions={<Button type="submit" loading={loading}>Save Preferences</Button>}
    >
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-text-primary">Appearance</h3>
        <ControlledThemeSwitcher value={values.theme} onChange={(theme) => setField('theme', theme)} />
        <LanguageSwitcher value={values.language} onChange={(lang) => setField('language', lang)} />
      </div>

      <div className="space-y-3 pt-2 border-t border-border">
        <h3 className="text-sm font-semibold text-text-primary pt-2">Notifications</h3>
        <Toggle
          id="email-notifications"
          label="Email notifications"
          checked={values.emailNotifications}
          onChange={(checked) => setField('emailNotifications', checked)}
        />
        <Toggle
          id="push-notifications"
          label="Push notifications"
          checked={values.pushNotifications}
          onChange={(checked) => setField('pushNotifications', checked)}
        />
        <Toggle
          id="newsletter"
          label="Newsletter"
          checked={values.newsletter}
          onChange={(checked) => setField('newsletter', checked)}
        />
      </div>
    </Form>
  );
}
