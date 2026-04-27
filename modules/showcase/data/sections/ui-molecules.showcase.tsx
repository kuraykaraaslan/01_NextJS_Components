'use client';
import { buildMoleculeTextData } from './ui-molecule-text.showcase';
import { buildMoleculeSelectionData } from './ui-molecule-selection.showcase';
import { buildMoleculeAdvancedData } from './ui-molecule-advanced.showcase';
import { buildMoleculePickersData } from './ui-molecule-pickers.showcase';
import type { ShowcaseComponent } from '../showcase.types';

export function buildMoleculesData(): ShowcaseComponent[] {
  return [
    ...buildMoleculeTextData(),
    ...buildMoleculeSelectionData(),
    ...buildMoleculeAdvancedData(),
    ...buildMoleculePickersData(),
  ];
}
