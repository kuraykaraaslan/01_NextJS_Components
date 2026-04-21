'use client';
import { ArticleEditor } from '@/modules/domain/content/ArticleEditor';
import { SEOScorePanel } from '@/modules/domain/content/SEOScorePanel';
import { ContentApprovalWorkflow } from '@/modules/domain/content/ContentApprovalWorkflow';
import { RevisionDiffViewer } from '@/modules/domain/content/RevisionDiffViewer';
import { PublishScheduler } from '@/modules/domain/content/PublishScheduler';
import type { ShowcaseComponent } from '../showcase.types';

export function buildContentData(): ShowcaseComponent[] {
  return [
    {
      id: 'ct-article-editor',
      title: 'ArticleEditor',
      category: 'Domain' as const,
      abbr: 'Ae',
      description: 'Article authoring form with auto-slug, tag input, SEO content score bar, and save/preview actions.',
      filePath: 'modules/domain/content/ArticleEditor.tsx',
      sourceCode: `import { ArticleEditor } from '@/modules/domain/content/ArticleEditor';\n\n<ArticleEditor\n  onSave={(draft) => saveDraft(draft)}\n  onPreview={(draft) => openPreview(draft)}\n/>`,
      variants: [
        {
          title: 'Article editor',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <ArticleEditor
                initial={{ title: 'Getting Started with TypeScript', tags: ['typescript', 'javascript', 'tutorial'] }}
                onSave={() => {}}
                onPreview={() => {}}
              />
            </div>
          ),
          code: `<ArticleEditor\n  initial={{ title: 'Getting Started with TypeScript', tags: ['typescript'] }}\n  onSave={(draft) => {\n    await saveDraft(draft);\n  }}\n  onPreview={(draft) => openPreview(draft)}\n/>`,
        },
      ],
    },

    {
      id: 'ct-seo-score',
      title: 'SEOScorePanel',
      category: 'Domain' as const,
      abbr: 'Se',
      description: 'SEO audit panel with focus keyword, pass/fail/warning checks, impact badges, and overall score bar.',
      filePath: 'modules/domain/content/SEOScorePanel.tsx',
      sourceCode: `import { SEOScorePanel } from '@/modules/domain/content/SEOScorePanel';\n\n<SEOScorePanel\n  focusKeyword="TypeScript tutorial"\n  scoreValue={scoreStr}\n  checks={seoChecks}\n/>`,
      variants: [
        {
          title: 'SEO score panel',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <SEOScorePanel
                focusKeyword="TypeScript tutorial"
                scoreValue="TypeScript tutorial|title|body|meta|wordcount"
                checks={[
                  { id: 'c1', label: 'Focus keyword in title', description: 'Title contains the focus keyword', status: 'pass', impact: 'high' },
                  { id: 'c2', label: 'Meta description set', description: 'Article has a meta description (120–160 chars)', status: 'pass', impact: 'high' },
                  { id: 'c3', label: 'Sufficient word count', description: 'Article is at least 300 words', status: 'pass', impact: 'medium' },
                  { id: 'c4', label: 'Internal links', description: 'Add at least 2 internal links', status: 'fail', impact: 'medium' },
                  { id: 'c5', label: 'Alt text on images', description: 'All images should have alt text', status: 'warning', impact: 'low' },
                ]}
              />
            </div>
          ),
          code: `<SEOScorePanel\n  focusKeyword="TypeScript tutorial"\n  scoreValue={buildScoreString(article)}\n  checks={[\n    { id: 'c1', label: 'Keyword in title', description: '...', status: 'pass', impact: 'high' },\n    { id: 'c2', label: 'Internal links', description: '...', status: 'fail', impact: 'medium' },\n  ]}\n/>`,
        },
      ],
    },

    {
      id: 'ct-approval-flow',
      title: 'ContentApprovalWorkflow',
      category: 'Domain' as const,
      abbr: 'Ca',
      description: 'Content approval stepper with reviewer actions (approve/revise/reject) and status alerts.',
      filePath: 'modules/domain/content/ContentApprovalWorkflow.tsx',
      sourceCode: `import { ContentApprovalWorkflow } from '@/modules/domain/content/ContentApprovalWorkflow';\n\n<ContentApprovalWorkflow\n  contentTitle="TypeScript Tutorial"\n  stages={stages}\n  currentStageId="legal"\n  canAct={true}\n  onApprove={async () => { /* approve */ }}\n/>`,
      variants: [
        {
          title: 'Approval workflow',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-md">
              <ContentApprovalWorkflow
                contentTitle="Getting Started with TypeScript"
                currentStageId="legal"
                canAct={true}
                stages={[
                  { id: 'author', label: 'Author review', status: 'complete', approver: 'Sarah Kim', approvedAt: '2026-04-18' },
                  { id: 'editor', label: 'Editor review', status: 'complete', approver: 'Tom Chen', approvedAt: '2026-04-19' },
                  { id: 'legal', label: 'Legal review', status: 'active', description: 'Checking compliance' },
                  { id: 'publish', label: 'Ready to publish', status: 'pending' },
                ]}
                onApprove={async () => {}}
                onRequestRevision={async () => {}}
                onReject={async () => {}}
              />
            </div>
          ),
          code: `<ContentApprovalWorkflow\n  contentTitle="TypeScript Tutorial"\n  currentStageId="legal"\n  canAct={isCurrentReviewer}\n  stages={[\n    { id: 'author', label: 'Author review', status: 'complete', approver: 'Sarah Kim' },\n    { id: 'legal',  label: 'Legal review',  status: 'active' },\n    { id: 'publish',label: 'Ready to publish', status: 'pending' },\n  ]}\n  onApprove={handleApprove}\n/>`,
        },
      ],
    },

    {
      id: 'ct-revision-diff',
      title: 'RevisionDiffViewer',
      category: 'Domain' as const,
      abbr: 'Rd',
      description: 'Content revision history with version selector, line-by-line diff view, full-text tab, and restore button.',
      filePath: 'modules/domain/content/RevisionDiffViewer.tsx',
      sourceCode: `import { RevisionDiffViewer } from '@/modules/domain/content/RevisionDiffViewer';\n\n<RevisionDiffViewer\n  revisions={revisions}\n  onRestore={(id) => restoreRevision(id)}\n/>`,
      variants: [
        {
          title: 'Revision diff viewer',
          layout: 'stack' as const,
          preview: (
            <div className="w-full">
              <RevisionDiffViewer
                revisions={[
                  { id: 'r1', version: '1.0', author: 'Sarah Kim', date: '2026-04-15', summary: 'Initial draft', content: 'TypeScript is a typed superset of JavaScript.\nIt compiles to plain JavaScript.\nAny browser, any host, any OS.' },
                  { id: 'r2', version: '1.1', author: 'Tom Chen', date: '2026-04-17', summary: 'Added examples', content: 'TypeScript is a strongly typed superset of JavaScript.\nIt compiles to plain JavaScript.\nAny browser, any host, any OS.\nTypeScript adds optional static typing and class-based OOP.' },
                  { id: 'r3', version: '1.2', author: 'Sarah Kim', date: '2026-04-19', summary: 'SEO improvements', content: 'TypeScript is a strongly typed superset of JavaScript developed by Microsoft.\nIt compiles to plain JavaScript.\nAny browser, any host, any OS.\nTypeScript adds optional static typing, class-based OOP, and module support.' },
                ]}
                onRestore={() => {}}
              />
            </div>
          ),
          code: `<RevisionDiffViewer\n  revisions={[\n    { id: 'r1', version: '1.0', author: 'Sarah', date: '2026-04-15', summary: 'Initial draft', content: '...' },\n    { id: 'r2', version: '1.1', author: 'Tom', date: '2026-04-17', summary: 'Added examples', content: '...' },\n  ]}\n  onRestore={(id) => restoreRevision(id)}\n/>`,
        },
      ],
    },

    {
      id: 'ct-publish',
      title: 'PublishScheduler',
      category: 'Domain' as const,
      abbr: 'Ps',
      description: 'Publish scheduler with channel selector, date/time pickers, timezone dropdown, and publish-now shortcut.',
      filePath: 'modules/domain/content/PublishScheduler.tsx',
      sourceCode: `import { PublishScheduler } from '@/modules/domain/content/PublishScheduler';\n\n<PublishScheduler\n  contentTitle="TypeScript Tutorial"\n  onSchedule={async (date, time, channel, tz) => schedule({ date, time, channel, tz })}\n  onPublishNow={async () => publishImmediately()}\n/>`,
      variants: [
        {
          title: 'Publish scheduler',
          layout: 'stack' as const,
          preview: (
            <div className="w-full max-w-sm">
              <PublishScheduler
                contentTitle="Getting Started with TypeScript"
                onSchedule={async () => {}}
                onPublishNow={async () => {}}
              />
            </div>
          ),
          code: `<PublishScheduler\n  contentTitle="TypeScript Tutorial"\n  onSchedule={async (date, time, channel, timezone) => {\n    await scheduleContent({ date, time, channel, timezone });\n  }}\n  onPublishNow={async () => await publishNow()}\n/>`,
        },
      ],
    },
  ];
}
