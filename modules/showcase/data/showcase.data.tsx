'use client';
export type { ShowcaseVariant, ShowcaseComponent } from './showcase.types';
import { buildAtomsData } from './sections/ui-atoms.showcase';
import { buildMoleculesData } from './sections/ui-molecules.showcase';
import { buildOrganismsData } from './sections/ui-organisms.showcase';
import { buildAppPatternsData } from './sections/app-patterns.showcase';
import { buildCommonDomainData } from './sections/domain-common.showcase';
import { buildBlogDomainData } from './sections/domain-blog.showcase';

export function buildShowcaseData() {
  return [
    ...buildAtomsData(),
    ...buildMoleculesData(),
    ...buildOrganismsData(),
    ...buildAppPatternsData(),
    ...buildCommonDomainData(),
    ...buildBlogDomainData(),
  ];
}
