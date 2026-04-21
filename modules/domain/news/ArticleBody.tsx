'use client';
import { Card } from '@/modules/ui/Card';
import { Tooltip } from '@/modules/ui/Tooltip';
import { Badge } from '@/modules/ui/Badge';

export function ArticleBody({ className }: { className?: string }) {
  return (
    <div className={className}>
      <article className="prose-like space-y-5 text-text-primary">
        <p className="text-base leading-relaxed">
          GENEVA — After three days of marathon negotiations,{' '}
          <Tooltip content="147 countries representing 89% of global emissions">
            <span className="underline decoration-dotted cursor-help font-medium">147 nations</span>
          </Tooltip>{' '}
          signed a landmark climate framework on Tuesday, committing to reduce greenhouse gas emissions
          by 60 percent before 2040 — a target climate scientists say is the minimum required to avoid
          catastrophic warming above{' '}
          <Tooltip content="Pre-industrial baseline established by IPCC 1.5°C report (2018)">
            <span className="underline decoration-dotted cursor-help font-medium">1.8°C</span>
          </Tooltip>.
        </p>

        {/* Pull quote */}
        <Card className="border-l-4 !border-l-primary bg-primary-subtle/10 p-5">
          <blockquote className="space-y-2">
            <p className="text-lg font-semibold text-text-primary leading-snug italic">
              &ldquo;This is not the end of the road — it is the beginning of the hardest part. Implementation
              must start today, not tomorrow.&rdquo;
            </p>
            <footer className="text-sm text-text-secondary">
              — António Guterres, UN Secretary-General
              <Badge variant="info" size="sm" className="ml-2">Keynote</Badge>
            </footer>
          </blockquote>
        </Card>

        <p className="text-base leading-relaxed">
          The accord introduces a novel &ldquo;ratchet mechanism&rdquo; — requiring signatories to submit updated
          emissions plans every two years, with independent verification by a new body called the
          Global Climate Oversight Bureau{' '}
          <Tooltip content="Footnote 3: The GCOB will be headquartered in Nairobi and report annually to the UN General Assembly">
            <sup className="cursor-help text-primary font-bold">[3]</sup>
          </Tooltip>.
          Critics from the fossil fuel industry argue the timeline is &ldquo;technically impossible,&rdquo; while
          environmental groups call it a floor, not a ceiling.
        </p>

        <p className="text-base leading-relaxed">
          Developing nations secured{' '}
          <Tooltip content="Annotation: $500B annual climate finance to be channeled through the Green Climate Fund and multilateral development banks">
            <span className="bg-warning-subtle text-warning-fg px-1.5 py-0.5 rounded cursor-help font-medium">
              $500 billion in annual climate finance
            </span>
          </Tooltip>{' '}
          — triple the amount promised at COP27. The pledge was brokered after a late-night session
          that saw the US and China agree to joint financing guarantees, a development described by
          negotiators as &ldquo;unprecedented&rdquo;.
        </p>

        {/* Annotation badges */}
        <div className="flex flex-wrap gap-2 my-4">
          <Badge variant="info" size="sm">Key figure: 60% reduction target</Badge>
          <Badge variant="success" size="sm">Verified by IPCC</Badge>
          <Badge variant="warning" size="sm">Contested by fossil fuel lobby</Badge>
          <Badge variant="neutral" size="sm">147 signatories</Badge>
        </div>

        <p className="text-base leading-relaxed">
          The agreement was formally witnessed by{' '}
          <Tooltip content="All five permanent UN Security Council members were present for the signing ceremony">
            <span className="underline decoration-dotted cursor-help font-medium">all P5 members</span>
          </Tooltip>{' '}
          of the UN Security Council — a symbolic first that Swiss officials hailed as a testament
          to the forum&apos;s convening power. Ratification by national parliaments is expected within 18
          months.
        </p>
      </article>
    </div>
  );
}
