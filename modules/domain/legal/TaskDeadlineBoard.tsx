'use client';
import { useState } from 'react';
import { AdvancedDataTable } from '@/modules/ui/AdvancedDataTable';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Toggle } from '@/modules/ui/Toggle';
import type { TableColumn } from '@/modules/ui/AdvancedDataTable';

type LegalTask = {
  id: string;
  task: string;
  attorney: string;
  dueDate: string;
  priority: 'critical' | 'high' | 'normal';
  completed: boolean;
  overdue: boolean;
};

const INITIAL_TASKS: LegalTask[] = [
  { id: 't1', task: 'File motion to suppress evidence', attorney: 'J. Martinez', dueDate: '2026-04-22', priority: 'critical', completed: false, overdue: false },
  { id: 't2', task: 'Interview witness #3', attorney: 'S. Kim', dueDate: '2026-04-18', priority: 'high', completed: false, overdue: true },
  { id: 't3', task: 'Prepare cross-examination', attorney: 'J. Martinez', dueDate: '2026-05-01', priority: 'high', completed: false, overdue: false },
  { id: 't4', task: 'Submit discovery documents', attorney: 'T. Nguyen', dueDate: '2026-04-15', priority: 'normal', completed: true, overdue: false },
  { id: 't5', task: 'Research precedent cases', attorney: 'S. Kim', dueDate: '2026-04-25', priority: 'normal', completed: false, overdue: false },
];

const priorityVariant: Record<string, 'error' | 'warning' | 'neutral'> = {
  critical: 'error',
  high: 'warning',
  normal: 'neutral',
};

export function TaskDeadlineBoard() {
  const [tasks, setTasks] = useState<LegalTask[]>(INITIAL_TASKS);

  function toggleComplete(id: string, checked: boolean) {
    setTasks((prev) => prev.map((t) => t.id === id ? { ...t, completed: checked } : t));
  }

  const overdueCount = tasks.filter((t) => t.overdue && !t.completed).length;

  const columns: TableColumn<LegalTask>[] = [
    { key: 'task', header: 'Task' },
    { key: 'attorney', header: 'Attorney' },
    { key: 'dueDate', header: 'Due Date', render: (r) => (
      <span className={r.overdue && !r.completed ? 'text-error-fg font-medium' : ''}>{r.dueDate}</span>
    )},
    { key: 'priority', header: 'Priority', render: (r) => <Badge variant={priorityVariant[r.priority]} size="sm">{r.priority}</Badge> },
    {
      key: 'completed', header: 'Done', align: 'center',
      render: (r) => (
        <Toggle
          id={`task-${r.id}`}
          label="Completed"
          checked={r.completed}
          onChange={(checked) => toggleComplete(r.id, checked)}
          size="sm"
        />
      ),
    },
  ];

  return (
    <div className="space-y-3">
      {overdueCount > 0 && (
        <AlertBanner variant="error" title="Overdue tasks" message={`${overdueCount} task${overdueCount !== 1 ? 's are' : ' is'} past the deadline.`} />
      )}
      <h3 className="text-sm font-semibold text-text-primary">Task Deadline Board</h3>
      <AdvancedDataTable<LegalTask> columns={columns} rows={tasks} caption="Legal task board" />
    </div>
  );
}
