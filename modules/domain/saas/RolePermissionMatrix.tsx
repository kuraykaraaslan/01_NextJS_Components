'use client';
import { useState } from 'react';
import { Toggle } from '@/modules/ui/Toggle';
import { Badge } from '@/modules/ui/Badge';

const ROLES = ['Admin', 'Editor', 'Viewer'] as const;
const PERMISSIONS = ['Read', 'Write', 'Delete', 'Manage'] as const;

type Role = typeof ROLES[number];
type Permission = typeof PERMISSIONS[number];
type PermissionState = Record<Role, Record<Permission, boolean>>;

const DEFAULT_STATE: PermissionState = {
  Admin:  { Read: true,  Write: true,  Delete: true,  Manage: true  },
  Editor: { Read: true,  Write: true,  Delete: false, Manage: false },
  Viewer: { Read: true,  Write: false, Delete: false, Manage: false },
};

export function RolePermissionMatrix({ initial = DEFAULT_STATE }: { initial?: PermissionState }) {
  const [perms, setPerms] = useState<PermissionState>(initial);

  function toggle(role: Role, perm: Permission) {
    setPerms((prev) => ({
      ...prev,
      [role]: { ...prev[role], [perm]: !prev[role][perm] },
    }));
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-semibold text-text-primary">Role Permissions</h3>
        <Badge variant="neutral" size="sm">3 roles · 4 permissions</Badge>
      </div>
      <div className="w-full overflow-x-auto rounded-lg border border-border">
        <table className="w-full text-sm">
          <thead className="bg-surface-sunken border-b border-border">
            <tr>
              <th className="px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-left w-32">Role</th>
              {PERMISSIONS.map((p) => (
                <th key={p} className="px-4 py-3 text-xs font-semibold text-text-secondary uppercase tracking-wider text-center">{p}</th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border bg-surface-base">
            {ROLES.map((role) => (
              <tr key={role} className="hover:bg-surface-overlay transition-colors">
                <td className="px-4 py-3 font-medium text-text-primary">{role}</td>
                {PERMISSIONS.map((perm) => (
                  <td key={perm} className="px-4 py-3 text-center">
                    <div className="flex justify-center">
                      <Toggle
                        id={`perm-${role}-${perm}`}
                        checked={perms[role][perm]}
                        onChange={() => toggle(role, perm)}
                        label={`${role} can ${perm}`}
                      />
                    </div>
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
