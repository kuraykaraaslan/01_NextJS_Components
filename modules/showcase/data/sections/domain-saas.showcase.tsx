'use client';
import { DashboardKpiGrid } from '@/modules/domain/saas/DashboardKpiGrid';
import { TeamMemberTable } from '@/modules/domain/saas/TeamMemberTable';
import { RolePermissionMatrix } from '@/modules/domain/saas/RolePermissionMatrix';
import { BillingPlanCard } from '@/modules/domain/saas/BillingPlanCard';
import { ApiKeyManager } from '@/modules/domain/saas/ApiKeyManager';
import { NotificationCenter } from '@/modules/domain/saas/NotificationCenter';
import type { ShowcaseComponent } from '../showcase.types';

export function buildSaasData(): ShowcaseComponent[] {
  return [
    {
      id: 'saas-dashboard-kpi',
      title: 'DashboardKpiGrid',
      category: 'Domain' as const,
      abbr: 'Dk',
      description: 'Grid of 4 KPI metric cards (MRR, Churn, DAU, NPS) with trend badges, fill indicators, and explanatory tooltips.',
      filePath: 'modules/domain/saas/DashboardKpiGrid.tsx',
      sourceCode: `import { DashboardKpiGrid } from '@/modules/domain/saas/DashboardKpiGrid';\n\n<DashboardKpiGrid />`,
      variants: [
        {
          title: 'KPI grid',
          layout: 'stack' as const,
          preview: (<div className="w-full"><DashboardKpiGrid /></div>),
          code: `<DashboardKpiGrid />`,
        },
      ],
    },
    {
      id: 'saas-team-table',
      title: 'TeamMemberTable',
      category: 'Domain' as const,
      abbr: 'Tt',
      description: 'AdvancedDataTable of team members with avatar+name, role badge, status badge, and last-active column.',
      filePath: 'modules/domain/saas/TeamMemberTable.tsx',
      sourceCode: `import { TeamMemberTable } from '@/modules/domain/saas/TeamMemberTable';\n\n<TeamMemberTable />`,
      variants: [
        {
          title: 'Team members',
          layout: 'stack' as const,
          preview: (<div className="w-full"><TeamMemberTable /></div>),
          code: `<TeamMemberTable />`,
        },
      ],
    },
    {
      id: 'saas-role-matrix',
      title: 'RolePermissionMatrix',
      category: 'Domain' as const,
      abbr: 'Rm',
      description: 'Permission matrix with roles as rows and permissions as columns, each cell a toggle.',
      filePath: 'modules/domain/saas/RolePermissionMatrix.tsx',
      sourceCode: `import { RolePermissionMatrix } from '@/modules/domain/saas/RolePermissionMatrix';\n\n<RolePermissionMatrix />`,
      variants: [
        {
          title: 'Role permission matrix',
          layout: 'stack' as const,
          preview: (<div className="w-full"><RolePermissionMatrix /></div>),
          code: `<RolePermissionMatrix />`,
        },
      ],
    },
    {
      id: 'saas-billing-plan',
      title: 'BillingPlanCard',
      category: 'Domain' as const,
      abbr: 'Bp',
      description: 'Three pricing plan cards (Starter/Growth/Enterprise) with monthly/annual billing toggle.',
      filePath: 'modules/domain/saas/BillingPlanCard.tsx',
      sourceCode: `import { BillingPlanCard } from '@/modules/domain/saas/BillingPlanCard';\n\n<BillingPlanCard />`,
      variants: [
        {
          title: 'Billing plans',
          layout: 'stack' as const,
          preview: (<div className="w-full"><BillingPlanCard /></div>),
          code: `<BillingPlanCard />`,
        },
      ],
    },
    {
      id: 'saas-api-keys',
      title: 'ApiKeyManager',
      category: 'Domain' as const,
      abbr: 'Ak',
      description: 'API key list with masked keys, copy/revoke actions, and a modal to generate new keys.',
      filePath: 'modules/domain/saas/ApiKeyManager.tsx',
      sourceCode: `import { ApiKeyManager } from '@/modules/domain/saas/ApiKeyManager';\n\n<ApiKeyManager />`,
      variants: [
        {
          title: 'API key manager',
          layout: 'stack' as const,
          preview: (<div className="w-full"><ApiKeyManager /></div>),
          code: `<ApiKeyManager />`,
        },
      ],
    },
    {
      id: 'saas-notif-center',
      title: 'NotificationCenter',
      category: 'Domain' as const,
      abbr: 'Nc',
      description: 'Drawer-based notification center with All/Mentions/System tabs and unread badge counts.',
      filePath: 'modules/domain/saas/NotificationCenter.tsx',
      sourceCode: `import { NotificationCenter } from '@/modules/domain/saas/NotificationCenter';\n\n<NotificationCenter />`,
      variants: [
        {
          title: 'Notification center',
          layout: 'stack' as const,
          preview: (<div className="w-full"><NotificationCenter /></div>),
          code: `<NotificationCenter />`,
        },
      ],
    },
  ];
}
