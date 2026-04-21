'use client';
import { ContentScoreBar } from '@/modules/ui/ContentScoreBar';
import { Badge } from '@/modules/ui/Badge';
import { AlertBanner } from '@/modules/ui/AlertBanner';
import { Card } from '@/modules/ui/Card';

const RISK_SCORE = 74;

const RISK_FACTORS = [
  { label: 'High', factor: 'Prior criminal record', impact: 'Increases sentencing risk significantly' },
  { label: 'High', factor: 'Witness credibility issues', impact: 'Key witness has prior inconsistencies' },
  { label: 'Medium', factor: 'Circumstantial evidence', impact: 'No direct physical evidence links defendant' },
  { label: 'Medium', factor: 'Jury selection bias', impact: 'Potential for venue bias in local court' },
  { label: 'Low', factor: 'Defense alibi strength', impact: 'Alibi partially corroborated by surveillance' },
];

const RISK_RULES = [
  { label: 'Risk score', check: () => true, points: RISK_SCORE },
  { label: 'Safe range', check: () => false, points: 100 - RISK_SCORE },
];

const factorVariant: Record<string, 'error' | 'warning' | 'success'> = {
  High: 'error',
  Medium: 'warning',
  Low: 'success',
};

export function LegalRiskIndicator() {
  const isHighRisk = RISK_SCORE > 70;

  return (
    <Card className="max-w-lg">
      <div className="p-5 space-y-4">
        <div className="flex items-center justify-between">
          <h3 className="text-base font-semibold text-text-primary">Legal Risk Assessment</h3>
          <Badge variant={isHighRisk ? 'error' : RISK_SCORE > 40 ? 'warning' : 'success'}>
            Risk: {RISK_SCORE}/100
          </Badge>
        </div>

        {isHighRisk && (
          <AlertBanner
            variant="error"
            title="High risk case"
            message="This case has a risk score above 70. Consider additional legal strategies and consultation."
          />
        )}

        <ContentScoreBar value="" rules={RISK_RULES} label="Overall risk score" />

        <div className="space-y-2">
          <h4 className="text-xs font-semibold text-text-secondary uppercase tracking-wider">Risk Factors</h4>
          {RISK_FACTORS.map((f, i) => (
            <div key={i} className="flex gap-2 items-start">
              <Badge variant={factorVariant[f.label]} size="sm">{f.label}</Badge>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-text-primary">{f.factor}</p>
                <p className="text-xs text-text-secondary">{f.impact}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  );
}
