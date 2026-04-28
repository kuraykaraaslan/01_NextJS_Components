'use client';
import { useState } from 'react';
import { UserPreferencesForm } from '@/modules/domains/common/user/UserPreferencesForm';
import { ChangePasswordForm } from '@/modules/domains/common/auth/ChangePasswordForm';
import { DEMO_USER } from '../../common.data';
import type { UserPreferences, ChangePassword } from '@/modules/domains/common/types';

type SaveState = 'idle' | 'saved' | 'error';

function SectionCard({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-xl border border-border bg-surface-raised p-6 space-y-4">
      <h3 className="text-sm font-semibold text-text-primary border-b border-border pb-3">{title}</h3>
      {children}
    </div>
  );
}

function Toast({ state }: { state: SaveState }) {
  if (state === 'idle') return null;
  return (
    <div className={`rounded-lg px-4 py-2.5 text-sm font-medium ${
      state === 'saved'
        ? 'bg-success-subtle border border-success text-success-fg'
        : 'bg-error-subtle border border-error text-error'
    }`}>
      {state === 'saved' ? '✓ Changes saved.' : '✕ Something went wrong.'}
    </div>
  );
}

export default function SettingsPage() {
  const [prefState, setPrefState] = useState<SaveState>('idle');
  const [pwState,   setPwState]   = useState<SaveState>('idle');

  async function handlePreferences(values: UserPreferences) {
    await new Promise((r) => setTimeout(r, 800));
    setPrefState('saved');
    setTimeout(() => setPrefState('idle'), 3000);
  }

  async function handlePassword(values: ChangePassword) {
    await new Promise((r) => setTimeout(r, 900));
    if (values.currentPassword === 'wrong') { setPwState('error'); setTimeout(() => setPwState('idle'), 3000); return; }
    setPwState('saved');
    setTimeout(() => setPwState('idle'), 3000);
  }

  return (
    <div className="space-y-6">
      <h2 className="text-lg font-semibold text-text-primary">Settings</h2>

      <SectionCard title="Preferences">
        <Toast state={prefState} />
        <UserPreferencesForm
          initial={DEMO_USER.userPreferences}
          onSubmit={handlePreferences}
        />
      </SectionCard>

      <SectionCard title="Change Password">
        <Toast state={pwState} />
        <ChangePasswordForm onSubmit={handlePassword} />
      </SectionCard>
    </div>
  );
}
