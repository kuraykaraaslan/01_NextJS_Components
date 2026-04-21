'use client';
import { ServiceCatalogGrid } from '@/modules/domain/government/ServiceCatalogGrid';
import { ApplicationWizard } from '@/modules/domain/government/ApplicationWizard';
import { CitizenProfileCard } from '@/modules/domain/government/CitizenProfileCard';
import { DocumentUploadPanel } from '@/modules/domain/government/DocumentUploadPanel';
import { StatusTrackingTimeline } from '@/modules/domain/government/StatusTrackingTimeline';
import { ComplaintRequestForm } from '@/modules/domain/government/ComplaintRequestForm';
import type { ShowcaseComponent } from '../showcase.types';

export function buildGovernmentData(): ShowcaseComponent[] {
  return [
    {
      id: 'govt-service-catalog',
      title: 'ServiceCatalogGrid',
      category: 'Domain' as const,
      abbr: 'Sc',
      description: 'Government service catalog grid with search, category filter, department/time/mode badges, and apply buttons.',
      filePath: 'modules/domain/government/ServiceCatalogGrid.tsx',
      sourceCode: `import { ServiceCatalogGrid } from '@/modules/domain/government/ServiceCatalogGrid';\n\n<ServiceCatalogGrid />`,
      variants: [
        {
          title: 'Service catalog',
          layout: 'stack' as const,
          preview: (<div className="w-full"><ServiceCatalogGrid /></div>),
          code: `<ServiceCatalogGrid />`,
        },
      ],
    },
    {
      id: 'govt-app-wizard',
      title: 'ApplicationWizard',
      category: 'Domain' as const,
      abbr: 'Aw',
      description: 'Citizen application stepper: Personal Info → Documents → Review → Submit with reference badge.',
      filePath: 'modules/domain/government/ApplicationWizard.tsx',
      sourceCode: `import { ApplicationWizard } from '@/modules/domain/government/ApplicationWizard';\n\n<ApplicationWizard />`,
      variants: [
        {
          title: 'Application wizard',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><ApplicationWizard /></div>),
          code: `<ApplicationWizard />`,
        },
      ],
    },
    {
      id: 'govt-citizen-profile',
      title: 'CitizenProfileCard',
      category: 'Domain' as const,
      abbr: 'Cp',
      description: 'Citizen profile with avatar, national ID badge, verified status, registered services, and expiry alert.',
      filePath: 'modules/domain/government/CitizenProfileCard.tsx',
      sourceCode: `import { CitizenProfileCard } from '@/modules/domain/government/CitizenProfileCard';\n\n<CitizenProfileCard />`,
      variants: [
        {
          title: 'Citizen profile',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><CitizenProfileCard /></div>),
          code: `<CitizenProfileCard />`,
        },
      ],
    },
    {
      id: 'govt-doc-upload',
      title: 'DocumentUploadPanel',
      category: 'Domain' as const,
      abbr: 'Du',
      description: 'Document upload panel with file input, size limit alert, skeleton upload simulation, and success toast.',
      filePath: 'modules/domain/government/DocumentUploadPanel.tsx',
      sourceCode: `import { DocumentUploadPanel } from '@/modules/domain/government/DocumentUploadPanel';\n\n<DocumentUploadPanel />`,
      variants: [
        {
          title: 'Document upload',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><DocumentUploadPanel /></div>),
          code: `<DocumentUploadPanel />`,
        },
      ],
    },
    {
      id: 'govt-status-tracking',
      title: 'StatusTrackingTimeline',
      category: 'Domain' as const,
      abbr: 'St',
      description: 'Application status stepper with date badges, LiveRegion accessibility announcements, and toast on update.',
      filePath: 'modules/domain/government/StatusTrackingTimeline.tsx',
      sourceCode: `import { StatusTrackingTimeline } from '@/modules/domain/government/StatusTrackingTimeline';\n\n<StatusTrackingTimeline />`,
      variants: [
        {
          title: 'Status tracking',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><StatusTrackingTimeline /></div>),
          code: `<StatusTrackingTimeline />`,
        },
      ],
    },
    {
      id: 'govt-complaint-form',
      title: 'ComplaintRequestForm',
      category: 'Domain' as const,
      abbr: 'Cf',
      description: 'Citizen complaint form with category, subject, description, file attachments, and contact preference.',
      filePath: 'modules/domain/government/ComplaintRequestForm.tsx',
      sourceCode: `import { ComplaintRequestForm } from '@/modules/domain/government/ComplaintRequestForm';\n\n<ComplaintRequestForm />`,
      variants: [
        {
          title: 'Complaint form',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><ComplaintRequestForm /></div>),
          code: `<ComplaintRequestForm />`,
        },
      ],
    },
  ];
}
