'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import { cn } from '@/libs/utils/cn';
import type { LoginRequest } from '../types';

type LoginFormValues = LoginRequest & { rememberMe: boolean };
type LoginFormErrors = Partial<Record<keyof LoginRequest, string>>;

type LoginFormProps = {
  onSubmit: (values: LoginFormValues) => Promise<void> | void;
  error?: string;
  className?: string;
};

export function LoginForm({ onSubmit, error, className }: LoginFormProps) {
  const [values, setValues] = useState<LoginFormValues>({ email: '', password: '', rememberMe: false });
  const [errors, setErrors] = useState<LoginFormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: LoginFormErrors = {};
    if (!values.email) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.password) next.password = 'Password is required.';
    else if (values.password.length < 8) next.password = 'Password must be at least 8 characters.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try { await onSubmit(values); } finally { setLoading(false); }
  }

  return (
    <form onSubmit={handleSubmit} noValidate className={cn('space-y-4', className)}>
      {error && (
        <div role="alert" className="rounded-md bg-error-subtle border border-error px-4 py-3 text-sm text-error">
          {error}
        </div>
      )}

      <Input
        id="login-email"
        label="Email"
        type="email"
        required
        autoComplete="email"
        prefixIcon={<FontAwesomeIcon icon={faEnvelope} className="w-3.5 h-3.5" />}
        value={values.email}
        onChange={(e) => setValues((v) => ({ ...v, email: e.target.value }))}
        error={errors.email}
      />

      <Input
        id="login-password"
        label="Password"
        type="password"
        required
        autoComplete="current-password"
        prefixIcon={<FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5" />}
        value={values.password}
        onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
        error={errors.password}
      />

      <label className="flex items-center gap-2 text-sm text-text-secondary cursor-pointer select-none">
        <input
          type="checkbox"
          checked={values.rememberMe}
          onChange={(e) => setValues((v) => ({ ...v, rememberMe: e.target.checked }))}
          className="rounded border-border accent-primary focus-visible:ring-2 focus-visible:ring-border-focus"
        />
        Remember me
      </label>

      <Button type="submit" fullWidth loading={loading}>
        Sign In
      </Button>
    </form>
  );
}
