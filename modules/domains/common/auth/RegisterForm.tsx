'use client';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEnvelope, faLock } from '@fortawesome/free-solid-svg-icons';
import { Form } from '@/modules/app/Form';
import { Input } from '@/modules/ui/Input';
import { Button } from '@/modules/ui/Button';
import type { RegisterRequest } from '../types';

type FormValues = RegisterRequest;
type FormErrors = Partial<Record<keyof FormValues, string>>;

type RegisterFormProps = {
  onSubmit: (values: Omit<RegisterRequest, 'confirmPassword'>) => Promise<void> | void;
  error?: string;
  className?: string;
};

export function RegisterForm({ onSubmit, error, className }: RegisterFormProps) {
  const [values, setValues] = useState<FormValues>({ email: '', password: '', confirmPassword: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [loading, setLoading] = useState(false);

  function validate(): boolean {
    const next: FormErrors = {};
    if (!values.email) next.email = 'Email is required.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = 'Enter a valid email address.';
    if (!values.password) next.password = 'Password is required.';
    else if (values.password.length < 8) next.password = 'Password must be at least 8 characters.';
    if (!values.confirmPassword) next.confirmPassword = 'Please confirm your password.';
    else if (values.password !== values.confirmPassword) next.confirmPassword = 'Passwords do not match.';
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setLoading(true);
    try { await onSubmit({ email: values.email, password: values.password }); } finally { setLoading(false); }
  }

  return (
    <Form onSubmit={handleSubmit} error={error} className={className}>
      <Input
        id="register-email"
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
        id="register-password"
        label="Password"
        type="password"
        required
        autoComplete="new-password"
        hint="Minimum 8 characters"
        prefixIcon={<FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5" />}
        value={values.password}
        onChange={(e) => setValues((v) => ({ ...v, password: e.target.value }))}
        error={errors.password}
      />

      <Input
        id="register-confirm-password"
        label="Confirm Password"
        type="password"
        required
        autoComplete="new-password"
        prefixIcon={<FontAwesomeIcon icon={faLock} className="w-3.5 h-3.5" />}
        value={values.confirmPassword}
        onChange={(e) => setValues((v) => ({ ...v, confirmPassword: e.target.value }))}
        error={errors.confirmPassword}
      />

      <Button type="submit" fullWidth loading={loading}>
        Create Account
      </Button>
    </Form>
  );
}
