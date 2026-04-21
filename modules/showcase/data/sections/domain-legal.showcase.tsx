'use client';
import { CaseSummaryHeader } from '@/modules/domain/legal/CaseSummaryHeader';
import { CaseTimeline } from '@/modules/domain/legal/CaseTimeline';
import { HearingCalendar } from '@/modules/domain/legal/HearingCalendar';
import { DocumentEvidenceLibrary } from '@/modules/domain/legal/DocumentEvidenceLibrary';
import { TaskDeadlineBoard } from '@/modules/domain/legal/TaskDeadlineBoard';
import { LegalRiskIndicator } from '@/modules/domain/legal/LegalRiskIndicator';
import type { ShowcaseComponent } from '../showcase.types';

export function buildLegalData(): ShowcaseComponent[] {
  return [
    {
      id: 'legl-case-header',
      title: 'CaseSummaryHeader',
      category: 'Domain' as const,
      abbr: 'Ch',
      description: 'Case summary header with PageHeader, status/priority badges, breadcrumb, and Edit/Archive actions.',
      filePath: 'modules/domain/legal/CaseSummaryHeader.tsx',
      sourceCode: `import { CaseSummaryHeader } from '@/modules/domain/legal/CaseSummaryHeader';\n\n<CaseSummaryHeader />`,
      variants: [
        {
          title: 'Case summary header',
          layout: 'stack' as const,
          preview: (<div className="w-full"><CaseSummaryHeader /></div>),
          code: `<CaseSummaryHeader />`,
        },
      ],
    },
    {
      id: 'legl-case-timeline',
      title: 'CaseTimeline',
      category: 'Domain' as const,
      abbr: 'Ct',
      description: 'Case event stepper from Filed to Closed with date badges and tooltips on each step.',
      filePath: 'modules/domain/legal/CaseTimeline.tsx',
      sourceCode: `import { CaseTimeline } from '@/modules/domain/legal/CaseTimeline';\n\n<CaseTimeline />`,
      variants: [
        {
          title: 'Case timeline',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><CaseTimeline /></div>),
          code: `<CaseTimeline />`,
        },
      ],
    },
    {
      id: 'legl-hearing-cal',
      title: 'HearingCalendar',
      category: 'Domain' as const,
      abbr: 'Hc',
      description: 'Hearing scheduler with type, date, time slot, courtroom selectors, and confirmation modal.',
      filePath: 'modules/domain/legal/HearingCalendar.tsx',
      sourceCode: `import { HearingCalendar } from '@/modules/domain/legal/HearingCalendar';\n\n<HearingCalendar />`,
      variants: [
        {
          title: 'Hearing calendar',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><HearingCalendar /></div>),
          code: `<HearingCalendar />`,
        },
      ],
    },
    {
      id: 'legl-evidence-lib',
      title: 'DocumentEvidenceLibrary',
      category: 'Domain' as const,
      abbr: 'De',
      description: 'Evidence library with file upload, searchable DataTable, type badges, and inline tag editor.',
      filePath: 'modules/domain/legal/DocumentEvidenceLibrary.tsx',
      sourceCode: `import { DocumentEvidenceLibrary } from '@/modules/domain/legal/DocumentEvidenceLibrary';\n\n<DocumentEvidenceLibrary />`,
      variants: [
        {
          title: 'Evidence library',
          layout: 'stack' as const,
          preview: (<div className="w-full"><DocumentEvidenceLibrary /></div>),
          code: `<DocumentEvidenceLibrary />`,
        },
      ],
    },
    {
      id: 'legl-task-board',
      title: 'TaskDeadlineBoard',
      category: 'Domain' as const,
      abbr: 'Tb',
      description: 'Legal task board with priority/status badges, overdue alert, and inline completion toggle.',
      filePath: 'modules/domain/legal/TaskDeadlineBoard.tsx',
      sourceCode: `import { TaskDeadlineBoard } from '@/modules/domain/legal/TaskDeadlineBoard';\n\n<TaskDeadlineBoard />`,
      variants: [
        {
          title: 'Task deadline board',
          layout: 'stack' as const,
          preview: (<div className="w-full"><TaskDeadlineBoard /></div>),
          code: `<TaskDeadlineBoard />`,
        },
      ],
    },
    {
      id: 'legl-risk-indicator',
      title: 'LegalRiskIndicator',
      category: 'Domain' as const,
      abbr: 'Lr',
      description: 'Legal risk assessment panel with score bar, high-risk alert, and color-coded risk factors.',
      filePath: 'modules/domain/legal/LegalRiskIndicator.tsx',
      sourceCode: `import { LegalRiskIndicator } from '@/modules/domain/legal/LegalRiskIndicator';\n\n<LegalRiskIndicator />`,
      variants: [
        {
          title: 'Legal risk indicator',
          layout: 'stack' as const,
          preview: (<div className="w-full flex justify-center"><LegalRiskIndicator /></div>),
          code: `<LegalRiskIndicator />`,
        },
      ],
    },
  ];
}
