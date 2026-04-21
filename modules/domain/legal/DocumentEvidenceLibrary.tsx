'use client';
import { useState } from 'react';
import { FileInput } from '@/modules/ui/FileInput';
import { DataTable } from '@/modules/ui/DataTable';
import { TagInput } from '@/modules/ui/TagInput';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Badge } from '@/modules/ui/Badge';
import type { TableColumn } from '@/modules/ui/DataTable';

type EvidenceDoc = {
  id: string;
  name: string;
  type: string;
  uploadedAt: string;
  tags: string[];
};

const DEFAULT_DOCS: EvidenceDoc[] = [
  { id: 'd1', name: 'police_report_2026.pdf', type: 'PDF', uploadedAt: '2026-01-15', tags: ['police', 'report'] },
  { id: 'd2', name: 'witness_statement_a.docx', type: 'DOCX', uploadedAt: '2026-02-03', tags: ['witness', 'testimony'] },
  { id: 'd3', name: 'cctv_footage_excerpt.mp4', type: 'Video', uploadedAt: '2026-02-10', tags: ['cctv', 'video'] },
  { id: 'd4', name: 'financial_records_q4.xlsx', type: 'XLSX', uploadedAt: '2026-03-01', tags: ['financial', 'records'] },
  { id: 'd5', name: 'defendant_communication.pdf', type: 'PDF', uploadedAt: '2026-03-15', tags: ['communication'] },
];

const typeVariant: Record<string, 'primary' | 'warning' | 'error' | 'neutral'> = {
  PDF: 'error',
  DOCX: 'primary',
  Video: 'warning',
  XLSX: 'neutral',
};

export function DocumentEvidenceLibrary() {
  const [docs] = useState<EvidenceDoc[]>(DEFAULT_DOCS);
  const [search, setSearch] = useState('');
  const [editTags, setEditTags] = useState<Record<string, string[]>>({});

  const filtered = docs.filter((d) =>
    d.name.toLowerCase().includes(search.toLowerCase()) ||
    d.tags.some((t) => t.toLowerCase().includes(search.toLowerCase()))
  );

  function getTagsFor(doc: EvidenceDoc) {
    return editTags[doc.id] ?? doc.tags;
  }

  const columns: TableColumn<EvidenceDoc>[] = [
    { key: 'name', header: 'Document', render: (r) => <span className="font-mono text-xs">{r.name}</span> },
    { key: 'type', header: 'Type', render: (r) => <Badge variant={typeVariant[r.type] ?? 'neutral'} size="sm">{r.type}</Badge> },
    { key: 'uploadedAt', header: 'Uploaded', sortable: true },
    {
      key: 'tags', header: 'Tags',
      render: (r) => (
        <div className="min-w-[160px]">
          <TagInput
            id={`tags-${r.id}`}
            label=""
            value={getTagsFor(r)}
            onChange={(v) => setEditTags((prev) => ({ ...prev, [r.id]: v }))}
            placeholder="Add tags…"
          />
        </div>
      ),
    },
  ];

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-semibold text-text-primary">Evidence Library</h3>
      <FileInput id="evidence-upload" label="Upload evidence" multiple accept=".pdf,.docx,.xlsx,.mp4,.jpg,.png" hint="PDF, DOCX, XLSX, MP4 accepted" />
      <SearchBar value={search} onChange={setSearch} placeholder="Search documents…" />
      <DataTable<EvidenceDoc> columns={columns} rows={filtered} pageSize={5} searchable={false} caption="Evidence documents" />
    </div>
  );
}
