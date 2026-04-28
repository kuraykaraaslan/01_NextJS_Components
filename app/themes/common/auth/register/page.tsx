'use client';
import { useState } from 'react';
import { RegisterForm } from '@/modules/domains/common/auth/RegisterForm';
import { OAuthButtons } from '@/modules/domains/common/auth/OAuthButtons';

export default function RegisterPage() {
  const [successEmail, setSuccessEmail] = useState('');

  async function handleRegister(values: { email: string; password: string }) {
    await new Promise((r) => setTimeout(r, 1000));
    setSuccessEmail(values.email);
  }

  return (
    <div className="min-h-[calc(100vh-8rem)] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md space-y-6">
        <div className="rounded-2xl border border-border bg-surface-raised shadow-sm p-8 space-y-6">
          {/* Header */}
          <div className="text-center space-y-1">
            <div className="flex justify-center mb-3">
              <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-primary text-primary-fg text-lg font-bold shadow-sm">
                C
              </span>
            </div>
            <h1 className="text-2xl font-bold text-text-primary">Create an account</h1>
            <p className="text-sm text-text-secondary">Join us — it only takes a minute</p>
          </div>

          {successEmail ? (
            <div className="rounded-lg bg-success-subtle border border-success px-4 py-4 space-y-2 text-center">
              <p className="text-2xl" aria-hidden="true">🎉</p>
              <p className="text-sm font-semibold text-success-fg">Account created!</p>
              <p className="text-sm text-success-fg">
                Welcome aboard. We sent a confirmation to{' '}
                <span className="font-mono">{successEmail}</span>.
              </p>
              <a
                href="/themes/common/auth/login"
                className="inline-block mt-2 text-sm font-medium text-primary hover:underline"
              >
                Go to login →
              </a>
            </div>
          ) : (
            <>
              {/* OAuth */}
              <OAuthButtons
                providers={['GOOGLE', 'GITHUB', 'DISCORD']}
                onProvider={async (p) => { await new Promise((r) => setTimeout(r, 800)); }}
              />

              <div className="flex items-center gap-3">
                <div className="flex-1 h-px bg-border" aria-hidden="true" />
                <span className="text-xs text-text-secondary">or sign up with email</span>
                <div className="flex-1 h-px bg-border" aria-hidden="true" />
              </div>

              {/* Form */}
              <RegisterForm onSubmit={handleRegister} />

              <p className="text-xs text-text-secondary text-center leading-relaxed">
                By creating an account you agree to our{' '}
                <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
                {' '}and{' '}
                <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>.
              </p>
            </>
          )}
        </div>

        <p className="text-center text-sm text-text-secondary">
          Already have an account?{' '}
          <a href="/themes/common/auth/login" className="text-primary font-medium hover:underline">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}
