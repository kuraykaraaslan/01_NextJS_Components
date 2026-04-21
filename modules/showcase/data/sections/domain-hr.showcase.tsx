'use client';
import { CandidatePipelineBoard } from '@/modules/domain/hr/CandidatePipelineBoard';
import { InterviewScheduleMatrix } from '@/modules/domain/hr/InterviewScheduleMatrix';
import { LeaveRequestCard } from '@/modules/domain/hr/LeaveRequestCard';
import { PayrollBreakdown } from '@/modules/domain/hr/PayrollBreakdown';
import { PerformanceReviewForm } from '@/modules/domain/hr/PerformanceReviewForm';
import type { ShowcaseComponent } from '../showcase.types';

export function buildHRData(): ShowcaseComponent[] {
  return [
    {
      id: 'hr-candidate-board',
      title: 'CandidatePipelineBoard',
      category: 'Domain' as const,
      abbr: 'Cb',
      description: 'Kanban/list view of candidates across pipeline stages with score bars and action dropdown.',
      filePath: 'modules/domain/hr/CandidatePipelineBoard.tsx',
      sourceCode: `import { CandidatePipelineBoard } from '@/modules/domain/hr/CandidatePipelineBoard';\n\n<CandidatePipelineBoard candidates={candidates} />`,
      variants: [
        {
          title: 'Candidate pipeline',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <CandidatePipelineBoard
                candidates={[
                  { id: 'c1', name: 'Alice Chen', role: 'Senior Engineer', stage: 'interview', appliedAt: '2026-04-10', score: 82, tags: ['React', 'TypeScript'] },
                  { id: 'c2', name: 'Bob Wilson', role: 'Product Manager', stage: 'screening', appliedAt: '2026-04-12', score: 68 },
                  { id: 'c3', name: 'Carol Diaz', role: 'Senior Engineer', stage: 'offer', appliedAt: '2026-04-08', score: 94, tags: ['React', 'Node'] },
                  { id: 'c4', name: 'David Park', role: 'Designer', stage: 'applied', appliedAt: '2026-04-15', score: 55 },
                  { id: 'c5', name: 'Emma Brown', role: 'Senior Engineer', stage: 'hired', appliedAt: '2026-03-28', score: 91, tags: ['TypeScript'] },
                ]}
              />
            </div>
          ),
          code: `<CandidatePipelineBoard\n  candidates={[\n    { id: 'c1', name: 'Alice Chen', role: 'Senior Engineer', stage: 'interview', appliedAt: '2026-04-10', score: 82 },\n    { id: 'c2', name: 'Bob Wilson', role: 'Product Manager', stage: 'screening', appliedAt: '2026-04-12' },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'hr-interview',
      title: 'InterviewScheduleMatrix',
      category: 'Domain' as const,
      abbr: 'Is',
      description: 'Interview schedule table with date/time, type icons, interviewer list, and schedule-new modal.',
      filePath: 'modules/domain/hr/InterviewScheduleMatrix.tsx',
      sourceCode: `import { InterviewScheduleMatrix } from '@/modules/domain/hr/InterviewScheduleMatrix';\n\n<InterviewScheduleMatrix\n  slots={slots}\n  onBook={async (date, time, candidate) => scheduleInterview({ date, time, candidate })}\n/>`,
      variants: [
        {
          title: 'Interview schedule',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <InterviewScheduleMatrix
                slots={[
                  { id: 'i1', candidateName: 'Alice Chen', role: 'Senior Engineer', interviewers: ['Sarah Kim', 'James Lee'], date: '2026-04-22', time: '10:00', duration: '60 min', type: 'video' },
                  { id: 'i2', candidateName: 'Bob Wilson', role: 'Product Manager', interviewers: ['David Park'], date: '2026-04-22', time: '14:00', duration: '45 min', type: 'phone', location: 'Zoom' },
                  { id: 'i3', candidateName: 'Carol Diaz', role: 'Senior Engineer', interviewers: ['Sarah Kim', 'James Lee', 'Tom Chan'], date: '2026-04-24', time: '11:00', duration: '90 min', type: 'onsite', location: 'HQ Room 3B' },
                ]}
                onBook={async () => {}}
              />
            </div>
          ),
          code: `<InterviewScheduleMatrix\n  slots={[\n    { id: 'i1', candidateName: 'Alice Chen', role: 'Senior Engineer', interviewers: ['Sarah Kim'], date: '2026-04-22', time: '10:00', duration: '60 min', type: 'video' },\n  ]}\n  onBook={async (date, time, candidate) => scheduleInterview(date, time, candidate)}\n/>`,
        },
      ],
    },

    {
      id: 'hr-leave-request',
      title: 'LeaveRequestCard',
      category: 'Domain' as const,
      abbr: 'Lr',
      description: 'Leave request form with type selector, date range picker, balance badges, and exceed-balance warning.',
      filePath: 'modules/domain/hr/LeaveRequestCard.tsx',
      sourceCode: `import { LeaveRequestCard } from '@/modules/domain/hr/LeaveRequestCard';\n\n<LeaveRequestCard\n  employeeName="Alice Johnson"\n  balances={[{type:'annual',used:5,total:20},{type:'sick',used:2,total:10}]}\n  onSubmit={async (range, type) => submitLeaveRequest({ range, type })}\n/>`,
      variants: [
        {
          title: 'Leave request form',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <LeaveRequestCard
                employeeName="Alice Johnson"
                balances={[
                  { type: 'annual', used: 5, total: 20 },
                  { type: 'sick', used: 2, total: 10 },
                  { type: 'parental', used: 0, total: 90 },
                ]}
              />
            </div>
          ),
          code: `<LeaveRequestCard\n  employeeName="Alice Johnson"\n  balances={[\n    { type: 'annual', used: 5, total: 20 },\n    { type: 'sick', used: 2, total: 10 },\n  ]}\n  onSubmit={async (range, type) => {\n    await submitLeaveRequest({ range, type });\n  }}\n/>`,
        },
      ],
    },

    {
      id: 'hr-payroll',
      title: 'PayrollBreakdown',
      category: 'Domain' as const,
      abbr: 'Pb',
      description: 'Payroll line-item table (earnings, deductions, taxes) with gross/net summary cards.',
      filePath: 'modules/domain/hr/PayrollBreakdown.tsx',
      sourceCode: `import { PayrollBreakdown } from '@/modules/domain/hr/PayrollBreakdown';\n\n<PayrollBreakdown\n  period="April 2026"\n  employeeName="Alice Johnson"\n  items={payrollItems}\n/>`,
      variants: [
        {
          title: 'Payroll breakdown',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <PayrollBreakdown
                period="April 2026"
                employeeName="Alice Johnson"
                currency="USD"
                items={[
                  { id: '1', description: 'Base salary', type: 'earning', amount: 5000 },
                  { id: '2', description: 'Performance bonus', type: 'earning', amount: 500 },
                  { id: '3', description: 'Health insurance', type: 'deduction', amount: 150, note: 'Employee contribution' },
                  { id: '4', description: 'Federal income tax', type: 'tax', amount: 900 },
                  { id: '5', description: 'Social security', type: 'tax', amount: 310 },
                ]}
              />
            </div>
          ),
          code: `<PayrollBreakdown\n  period="April 2026"\n  employeeName="Alice Johnson"\n  items={[\n    { id: '1', description: 'Base salary', type: 'earning', amount: 5000 },\n    { id: '2', description: 'Health insurance', type: 'deduction', amount: 150 },\n    { id: '3', description: 'Federal income tax', type: 'tax', amount: 900 },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'hr-performance',
      title: 'PerformanceReviewForm',
      category: 'Domain' as const,
      abbr: 'Pr',
      description: 'Performance review form with radio rating, strengths/improvements textareas, and promotion/bonus toggles.',
      filePath: 'modules/domain/hr/PerformanceReviewForm.tsx',
      sourceCode: `import { PerformanceReviewForm } from '@/modules/domain/hr/PerformanceReviewForm';\n\n<PerformanceReviewForm\n  employeeName="Alice Johnson"\n  period="Q1 2026"\n  onSubmit={(review) => saveReview(review)}\n  onCancel={() => setOpen(false)}\n/>`,
      variants: [
        {
          title: 'Performance review form',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <PerformanceReviewForm employeeName="Alice Johnson" period="Q1 2026" />
            </div>
          ),
          code: `<PerformanceReviewForm\n  employeeName="Alice Johnson"\n  period="Q1 2026"\n  onSubmit={(review) => {\n    await saveReview(review);\n    closeModal();\n  }}\n  onCancel={() => closeModal()}\n/>`,
        },
      ],
    },
  ];
}
