'use client';
import { Card } from '@/modules/ui/Card';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { CheckboxGroup } from '@/modules/ui/CheckboxGroup';
import { useState } from 'react';

const ALL_SERVICES = [
  'SNAP Benefits',
  'Medicaid',
  'Unemployment Insurance',
  'Social Security',
  'Housing Assistance',
];

export function CitizenProfileCard() {
  const [services, setServices] = useState<string[]>(['SNAP Benefits', 'Medicaid']);

  return (
    <Card className="max-w-sm">
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-4">
          <Avatar name="Maria Rodriguez" size="lg" />
          <div className="flex-1 min-w-0">
            <h3 className="text-base font-semibold text-text-primary">Maria Rodriguez</h3>
            <div className="flex flex-wrap gap-1 mt-1">
              <Badge variant="neutral" size="sm">ID: 789-XX-4521</Badge>
              <Badge variant="success" size="sm">✓ Verified</Badge>
            </div>
          </div>
        </div>

        <AlertBanner
          variant="warning"
          title="Document expiring soon"
          message="Your driver's license expires in 14 days. Renew online or visit your local DMV."
        />

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Registered Services</h4>
          <CheckboxGroup
            legend="Registered services"
            options={ALL_SERVICES}
            selected={services}
            onChange={setServices}
          />
        </div>
      </div>
    </Card>
  );
}
