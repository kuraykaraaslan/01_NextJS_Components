'use client';
export type { ShowcaseVariant, ShowcaseComponent } from './showcase.types';
import { buildAtomsData } from './sections/ui-atoms.showcase';
import { buildMoleculesData } from './sections/ui-molecules.showcase';
import { buildOrganismsData } from './sections/ui-organisms.showcase';

export function buildShowcaseData() {
  return [
    ...buildAtomsData(),
    ...buildMoleculesData(),
    ...buildOrganismsData(),
  ];
}
