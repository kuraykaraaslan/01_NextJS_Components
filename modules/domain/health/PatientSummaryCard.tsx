import { cn } from '@/libs/utils/cn';
import { Card } from '@/modules/ui/Card';
import { Avatar } from '@/modules/ui/Avatar';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';

export type PatientAlert = {
  message: string;
  severity: 'error' | 'warning' | 'info';
};

export type PatientSummaryCardProps = {
  name: string;
  patientId: string;
  dob: string;
  gender?: string;
  bloodType?: string;
  avatar?: string;
  status?: 'admitted' | 'outpatient' | 'discharged' | 'critical';
  ward?: string;
  primaryDoctor?: string;
  allergies?: string[];
  alerts?: PatientAlert[];
  className?: string;
};

const statusConfig: Record<string, { variant: 'error' | 'warning' | 'success' | 'neutral'; label: string }> = {
  admitted:   { variant: 'warning', label: 'Admitted' },
  outpatient: { variant: 'success', label: 'Outpatient' },
  discharged: { variant: 'neutral', label: 'Discharged' },
  critical:   { variant: 'error',   label: 'Critical' },
};

export function PatientSummaryCard({
  name, patientId, dob, gender, bloodType, avatar,
  status = 'outpatient', ward, primaryDoctor, allergies = [], alerts = [],
  className,
}: PatientSummaryCardProps) {
  const cfg = statusConfig[status];

  return (
    <Card className={className}>
      <div className="p-5 space-y-4">
        <div className="flex items-start gap-3">
          <Avatar src={avatar} name={name} size="lg" status={status === 'admitted' ? 'busy' : status === 'critical' ? 'busy' : 'online'} />
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 flex-wrap">
              <h3 className="text-base font-semibold text-text-primary">{name}</h3>
              <Badge variant={cfg.variant} size="sm">{cfg.label}</Badge>
            </div>
            <p className="text-xs text-text-disabled font-mono">ID: {patientId}</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-sm">
          <div><span className="text-text-disabled">DOB</span> <span className="text-text-primary ml-1">{dob}</span></div>
          {gender    && <div><span className="text-text-disabled">Gender</span>     <span className="text-text-primary ml-1">{gender}</span></div>}
          {bloodType && <div><span className="text-text-disabled">Blood type</span> <span className="font-bold text-error-fg ml-1">{bloodType}</span></div>}
          {ward      && <div><span className="text-text-disabled">Ward</span>       <span className="text-text-primary ml-1">{ward}</span></div>}
          {primaryDoctor && <div className="col-span-2"><span className="text-text-disabled">Doctor</span> <span className="text-text-primary ml-1">{primaryDoctor}</span></div>}
        </div>

        {allergies.length > 0 && (
          <div className="flex flex-wrap gap-1.5 items-center">
            <span className="text-xs font-semibold text-error-fg">⚠ Allergies:</span>
            {allergies.map((a) => (
              <Badge key={a} variant="error" size="sm">{a}</Badge>
            ))}
          </div>
        )}

        {alerts.map((alert, i) => (
          <AlertBanner key={i} variant={alert.severity} message={alert.message} />
        ))}
      </div>
    </Card>
  );
}
