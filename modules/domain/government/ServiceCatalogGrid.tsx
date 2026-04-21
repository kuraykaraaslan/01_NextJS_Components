'use client';
import { useState } from 'react';
import { Card } from '@/modules/ui/Card';
import { SearchBar } from '@/modules/ui/SearchBar';
import { Badge } from '@/modules/ui/Badge';
import { Button } from '@/modules/ui/Button';
import { Select } from '@/modules/ui/Select';

type GovService = {
  id: string;
  name: string;
  department: string;
  estimatedTime: string;
  mode: 'online' | 'in-person' | 'both';
  category: string;
};

const SERVICES: GovService[] = [
  { id: 's1', name: 'Passport Renewal', department: 'State Dept', estimatedTime: '6-8 weeks', mode: 'in-person', category: 'Travel' },
  { id: 's2', name: 'Driver\'s License', department: 'DMV', estimatedTime: '2-3 weeks', mode: 'in-person', category: 'Transportation' },
  { id: 's3', name: 'Tax Filing Assistance', department: 'IRS', estimatedTime: '1 hour', mode: 'online', category: 'Finance' },
  { id: 's4', name: 'Business Registration', department: 'SBA', estimatedTime: '3-5 days', mode: 'online', category: 'Business' },
  { id: 's5', name: 'Social Security Card', department: 'SSA', estimatedTime: '2-4 weeks', mode: 'both', category: 'Identity' },
  { id: 's6', name: 'SNAP Benefits', department: 'USDA', estimatedTime: '30 days', mode: 'both', category: 'Benefits' },
];

const CATEGORY_OPTIONS = [
  { value: 'all', label: 'All categories' },
  { value: 'Travel', label: 'Travel' },
  { value: 'Transportation', label: 'Transportation' },
  { value: 'Finance', label: 'Finance' },
  { value: 'Business', label: 'Business' },
  { value: 'Identity', label: 'Identity' },
  { value: 'Benefits', label: 'Benefits' },
];

const modeVariant: Record<string, 'success' | 'primary' | 'neutral'> = {
  online: 'success',
  'in-person': 'primary',
  both: 'neutral',
};

export function ServiceCatalogGrid() {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');

  const filtered = SERVICES.filter((s) => {
    const matchSearch = s.name.toLowerCase().includes(search.toLowerCase()) ||
      s.department.toLowerCase().includes(search.toLowerCase());
    const matchCat = category === 'all' || s.category === category;
    return matchSearch && matchCat;
  });

  return (
    <div className="space-y-4">
      <div className="flex gap-3 flex-wrap">
        <SearchBar value={search} onChange={setSearch} placeholder="Search services…" className="flex-1 min-w-40" />
        <Select id="service-category" label="" options={CATEGORY_OPTIONS} value={category} onChange={(e) => setCategory(e.target.value)} className="w-48" />
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-text-secondary text-center py-8">No services found.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {filtered.map((s) => (
            <Card key={s.id}>
              <div className="p-4 space-y-3">
                <div>
                  <h3 className="text-sm font-semibold text-text-primary">{s.name}</h3>
                </div>
                <div className="flex flex-wrap gap-1">
                  <Badge variant="neutral" size="sm">🏛 {s.department}</Badge>
                  <Badge variant="warning" size="sm">⏱ {s.estimatedTime}</Badge>
                  <Badge variant={modeVariant[s.mode]} size="sm">
                    {s.mode === 'online' ? '💻 Online' : s.mode === 'in-person' ? '🏢 In-person' : '🔄 Both'}
                  </Badge>
                </div>
                <Button variant="primary" size="sm" fullWidth>Apply Now</Button>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
}
