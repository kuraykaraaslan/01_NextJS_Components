'use client';
import { CourseProgressCard } from '@/modules/domain/education/CourseProgressCard';
import { LessonPlayerShell } from '@/modules/domain/education/LessonPlayerShell';
import { QuizBuilder } from '@/modules/domain/education/QuizBuilder';
import { QuizResultBreakdown } from '@/modules/domain/education/QuizResultBreakdown';
import { AssignmentSubmissionPanel } from '@/modules/domain/education/AssignmentSubmissionPanel';
import type { ShowcaseComponent } from '../showcase.types';

export function buildEducationData(): ShowcaseComponent[] {
  return [
    {
      id: 'ed-course-progress',
      title: 'CourseProgressCard',
      category: 'Domain' as const,
      abbr: 'Cp',
      description: 'Course card with progress score bar, lesson counter, status badge, and continue/certificate CTA.',
      filePath: 'modules/domain/education/CourseProgressCard.tsx',
      sourceCode: `import { CourseProgressCard } from '@/modules/domain/education/CourseProgressCard';\n\n<CourseProgressCard\n  title="Advanced TypeScript"\n  instructor="Sarah Kim"\n  completedLessons={18}\n  totalLessons={24}\n  status="in-progress"\n  onContinue={() => navigate('/courses/ts/lesson/19')}\n/>`,
      variants: [
        {
          title: 'In-progress course',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-xs">
              <CourseProgressCard
                title="Advanced TypeScript Patterns"
                instructor="Sarah Kim"
                category="Programming"
                completedLessons={18}
                totalLessons={24}
                estimatedMinutes={480}
                status="in-progress"
                onContinue={() => {}}
              />
            </div>
          ),
          code: `<CourseProgressCard\n  title="Advanced TypeScript"\n  instructor="Sarah Kim"\n  completedLessons={18}\n  totalLessons={24}\n  status="in-progress"\n  onContinue={() => navigate('/lesson/19')}\n/>`,
        },
      ],
    },

    {
      id: 'ed-lesson-player',
      title: 'LessonPlayerShell',
      category: 'Domain' as const,
      abbr: 'Lp',
      description: 'Full lesson layout with breadcrumb, prev/next navigation, video area, and tabbed content below.',
      filePath: 'modules/domain/education/LessonPlayerShell.tsx',
      sourceCode: `import { LessonPlayerShell } from '@/modules/domain/education/LessonPlayerShell';\n\n<LessonPlayerShell\n  courseName="Advanced TypeScript"\n  lessonTitle="Conditional Types Deep Dive"\n  tabs={[{ id: 'notes', label: 'Notes', content: <Notes /> }]}\n  onPrev={goBack}\n  onNext={goNext}\n/>`,
      variants: [
        {
          title: 'Lesson player shell',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <LessonPlayerShell
                courseName="Advanced TypeScript"
                courseHref="/courses/ts"
                sectionName="Type System"
                lessonTitle="Conditional Types Deep Dive"
                hasPrev={true}
                hasNext={true}
                onPrev={() => {}}
                onNext={() => {}}
                tabs={[
                  { id: 'notes', label: 'Notes', content: <div className="p-4 text-sm text-text-secondary">Lesson notes go here…</div> },
                  { id: 'resources', label: 'Resources', content: <div className="p-4 text-sm text-text-secondary">Download slides and code samples.</div> },
                ]}
              />
            </div>
          ),
          code: `<LessonPlayerShell\n  courseName="Advanced TypeScript"\n  lessonTitle="Conditional Types"\n  hasPrev hasPrev={true}\n  hasNext={true}\n  onPrev={goBack}\n  onNext={goNext}\n  tabs={[{ id: 'notes', label: 'Notes', content: <Notes /> }]}\n/>`,
        },
      ],
    },

    {
      id: 'ed-quiz-builder',
      title: 'QuizBuilder',
      category: 'Domain' as const,
      abbr: 'Qb',
      description: 'Quiz question editor supporting single-choice, multi-choice, and text-answer types with option management.',
      filePath: 'modules/domain/education/QuizBuilder.tsx',
      sourceCode: `import { QuizBuilder } from '@/modules/domain/education/QuizBuilder';\n\n<QuizBuilder onSave={(question) => addQuestion(question)} />`,
      variants: [
        {
          title: 'Quiz question builder',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <QuizBuilder />
            </div>
          ),
          code: `<QuizBuilder\n  initial={{ type: 'single', text: 'Which is a TypeScript utility type?' }}\n  onSave={(q) => addQuestionToQuiz(q)}\n/>`,
        },
      ],
    },

    {
      id: 'ed-quiz-result',
      title: 'QuizResultBreakdown',
      category: 'Domain' as const,
      abbr: 'Qr',
      description: 'Quiz score summary with pass/fail badge, score bar, and paginated per-question result table.',
      filePath: 'modules/domain/education/QuizResultBreakdown.tsx',
      sourceCode: `import { QuizResultBreakdown } from '@/modules/domain/education/QuizResultBreakdown';\n\n<QuizResultBreakdown\n  title="TypeScript Quiz – Chapter 4"\n  items={results}\n/>`,
      variants: [
        {
          title: 'Quiz results',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <QuizResultBreakdown
                title="TypeScript Quiz – Chapter 4"
                items={[
                  { question: 'What does the `keyof` operator do?', yourAnswer: 'Returns a union of keys', correct: true, points: 10, maxPoints: 10 },
                  { question: 'Which utility type makes all properties optional?', yourAnswer: 'Required', correct: false, points: 0, maxPoints: 10 },
                  { question: 'What is a discriminated union?', yourAnswer: 'A union with a common literal type field', correct: true, points: 10, maxPoints: 10 },
                  { question: 'How do you create a readonly array type?', yourAnswer: 'ReadonlyArray<T>', correct: true, points: 10, maxPoints: 10 },
                ]}
              />
            </div>
          ),
          code: `<QuizResultBreakdown\n  title="TypeScript Quiz"\n  items={[\n    { question: 'What does keyof do?', yourAnswer: 'Returns union of keys', correct: true, points: 10, maxPoints: 10 },\n    { question: 'Which type makes all props optional?', yourAnswer: 'Required', correct: false, points: 0, maxPoints: 10 },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'ed-assignment',
      title: 'AssignmentSubmissionPanel',
      category: 'Domain' as const,
      abbr: 'As',
      description: 'Assignment submission panel with file upload, notes textarea, due-date indicator, and overdue warning.',
      filePath: 'modules/domain/education/AssignmentSubmissionPanel.tsx',
      sourceCode: `import { AssignmentSubmissionPanel } from '@/modules/domain/education/AssignmentSubmissionPanel';\n\n<AssignmentSubmissionPanel\n  assignmentTitle="Final Project"\n  dueDate="2026-04-30"\n  instructions="Submit as PDF. Max 20 MB."\n  onSubmit={async (notes) => { /* upload files + notes */ }}\n/>`,
      variants: [
        {
          title: 'Assignment submission',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-lg">
              <AssignmentSubmissionPanel
                assignmentTitle="Final Project: TypeScript API Design"
                dueDate="2026-04-30"
                instructions="Submit your API design document as a PDF. Include type definitions and a usage example."
              />
            </div>
          ),
          code: `<AssignmentSubmissionPanel\n  assignmentTitle="Final Project"\n  dueDate="2026-04-30"\n  instructions="Submit as PDF. Max 20 MB."\n  onSubmit={async (notes) => {\n    await uploadFiles(files, notes);\n  }}\n/>`,
        },
      ],
    },
  ];
}
