'use client';
export type { ShowcaseVariant, ShowcaseComponent } from './showcase.types';
import { buildAtomsData } from './sections/ui-atoms.showcase';
import { buildMoleculesData } from './sections/ui-molecules.showcase';
import { buildOrganismsData } from './sections/ui-organisms.showcase';
import { buildAppPatternsData } from './sections/app-patterns.showcase';
import { buildCommonDomainData } from './sections/domain-common.showcase';
import { buildBlogDomainData } from './sections/domain-blog.showcase';
import { buildEventDomainData } from './sections/domain-event.showcase';
import { buildMapData } from './sections/ui-molecule-map.showcase';
import { buildApiDocDomainData } from './sections/domain-api-doc.showcase';
import { buildLandingDomainData } from './sections/domain-landing.showcase';

export function buildShowcaseData() {
  return [
    ...buildAtomsData(),
    ...buildMoleculesData(),
    ...buildOrganismsData(),
    ...buildAppPatternsData(),
    ...buildCommonDomainData(),
    ...buildBlogDomainData(),
    ...buildEventDomainData(),
    ...buildMapData(),
    ...buildApiDocDomainData(),
    ...buildLandingDomainData(),
  ];
}
