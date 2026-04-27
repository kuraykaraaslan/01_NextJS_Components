'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLock } from '@fortawesome/free-solid-svg-icons';
import { Form } from '@/modules/app/Form';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import type { ChangePassword } from '../types';

type ChangePasswordErrors = Partial<Record<keyof ChangePassword, string>>;

type ChangePasswordFormProps = {
  onSubmit: (values: ChangePassword) => Promise<void> | void;
  error?: string;
  className?: string;
};

export function ChangePasswordForm({ onSubmit, error, className }: ChangePasswordFormProps) {
  const [values, setValues] = useState<ChangePassword>({ currentPassword: '', newPassword: '', confirmPassword: '' });
  const [errors, setErrors] = useState<ChangePasswordErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: ChangePasswordErrors = {};
    if (!values.currentPassword) next.currentPassword = 'Current password is required.';
    if (!values.newPassword) next.newPassword = 'New password is required.';
    else if (values.newPassword.length < 8) next.newPassword = 'Password must be at least 8 characters.';
    if (!values.confirmPassword) next.confirmPassword = 'Please confirm your new password.';
    else if (values.newPassword !== values.confirmPassword) next.confirmPassword = "Passwords don't match.";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try { await onSubmit(values); } finally { setLoading(false); }
  }

  const lockIcon = <FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5" />;

  return (
    <Form onSubmit={handleSubmit} error={error} className={className}>
      <Input
        id="current-password"
        label="Current Password"
        type="password"
        required
        autoComplete="current-password"
        prefixIcon={lockIcon}
        value={values.currentPassword}
        onChange={(e) => setValues((v) => ({ ...v, currentPassword: e.target.value }))}
        error={errors.currentPassword}
      />

      <Input
        id="new-password"
        label="New Password"
        type="password"
        required
        autoComplete="new-password"
        prefixIcon={lockIcon}
        value={values.newPassword}
        onChange={(e) => setValues((v) => ({ ...v, newPassword: e.target.value }))}
        error={errors.newPassword}
      />

      <Input
        id="confirm-password"
        label="Confirm New Password"
        type="password"
        required
        autoComplete="new-password"
        prefixIcon={lockIcon}
        value={values.confirmPassword}
        onChange={(e) => setValues((v) => ({ ...v, confirmPassword: e.target.value }))}
        error={errors.confirmPassword}
      />

      <Button type="submit" fullWidth loading={loading}>
        Update Password
      </Button>
    </Form>
  );
}
