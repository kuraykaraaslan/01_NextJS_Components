'use client';
import { useState } from 'react';
import { Table } from '@/modules/ui/Table';
import { Button } from '@/modules/ui/Button';
import { Modal } from '@/modules/ui/Modal';
import { Input } from '@/modules/ui/Input';
import { Select } from '@/modules/ui/Select';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toast } from '@/modules/ui/Toast';
import { Badge } from '@/modules/ui/Badge';

type ApiKey = {
  id: string;
  name: string;
  masked: string;
  expiry: string;
  created: string;
};

const DEFAULT_KEYS: ApiKey[] = [
  { id: 'k1', name: 'Production App', masked: 'sk-••••••••••••abcd', expiry: '2026-12-31', created: '2026-01-15' },
  { id: 'k2', name: 'Staging', masked: 'sk-••••••••••••xyz9', expiry: '2026-06-30', created: '2026-02-20' },
  { id: 'k3', name: 'CI/CD Pipeline', masked: 'sk-••••••••••••mnop', expiry: 'Never', created: '2025-11-01' },
];

const EXPIRY_OPTIONS = [
  { value: '30d', label: '30 days' },
  { value: '90d', label: '90 days' },
  { value: '1y', label: '1 year' },
  { value: 'never', label: 'Never' },
];

export function ApiKeyManager() {
  const [keys, setKeys] = useState<ApiKey[]>(DEFAULT_KEYS);
  const [modalOpen, setModalOpen] = useState(false);
  const [newName, setNewName] = useState('');
  const [newExpiry, setNewExpiry] = useState('90d');
  const [revokedKey, setRevokedKey] = useState<string | null>(null);
  const [copiedToast, setCopiedToast] = useState(false);
  const [nameError, setNameError] = useState('');

  function handleRevoke(id: string) {
    const key = keys.find((k) => k.id === id);
    setRevokedKey(key?.name ?? null);
    setKeys((prev) => prev.filter((k) => k.id !== id));
  }

  function handleCopy(masked: string) {
    setCopiedToast(true);
  }

  function handleGenerate() {
    if (!newName.trim()) { setNameError('Name is required'); return; }
    const id = `k${Date.now()}`;
    const suffix = Math.random().toString(36).slice(2, 6);
    setKeys((prev) => [
      ...prev,
      { id, name: newName, masked: `sk-••••••••••••${suffix}`, expiry: newExpiry === 'never' ? 'Never' : newExpiry, created: '2026-04-21' },
    ]);
    setNewName('');
    setNewExpiry('90d');
    setNameError('');
    setModalOpen(false);
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">API Keys</h3>
        <Button variant="primary" size="sm" onClick={() => setModalOpen(true)} iconLeft="＋">
          Generate new key
        </Button>
      </div>

      {revokedKey && (
        <AlertBanner variant="warning" title="Key revoked" message={`"${revokedKey}" has been permanently revoked.`} dismissible />
      )}

      {copiedToast && (
        <Toast variant="success" message="API key copied to clipboard." onDismiss={() => setCopiedToast(false)} duration={3000} />
      )}

      <Table
        caption="API keys"
        columns={[
          { key: 'name', header: 'Name' },
          { key: 'masked', header: 'Key' },
          { key: 'expiry', header: 'Expires', render: (row) => <Badge variant={row.expiry === 'Never' ? 'neutral' : 'warning'} size="sm">{row.expiry}</Badge> },
          { key: 'created', header: 'Created' },
          {
            key: 'actions', header: 'Actions', align: 'right',
            render: (row) => (
              <div className="flex gap-2 justify-end">
                <Button variant="ghost" size="sm" onClick={() => handleCopy(row.masked)}>Copy</Button>
                <Button variant="danger" size="sm" onClick={() => handleRevoke(row.id)}>Revoke</Button>
              </div>
            ),
          },
        ]}
        rows={keys}
      />

      <Modal open={modalOpen} onClose={() => setModalOpen(false)} title="Generate New API Key"
        footer={
          <>
            <Button variant="outline" onClick={() => setModalOpen(false)}>Cancel</Button>
            <Button variant="primary" onClick={handleGenerate}>Generate</Button>
          </>
        }
      >
        <div className="space-y-4">
          <Input id="key-name" label="Key name" placeholder="e.g. My App" value={newName} onChange={(e) => { setNewName(e.target.value); setNameError(''); }} error={nameError} required />
          <Select id="key-expiry" label="Expiry" options={EXPIRY_OPTIONS} value={newExpiry} onChange={(e) => setNewExpiry(e.target.value)} />
        </div>
      </Modal>
    </div>
  );
}
