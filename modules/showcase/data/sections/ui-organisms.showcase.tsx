'use client';
import { buildContainerData } from './ui-molecule-container.showcase';
import { buildFeedbackData } from './ui-molecule-feedback.showcase';
import { buildNavigationData } from './ui-molecule-navigation.showcase';
import { buildOverlayData } from './ui-molecule-overlay.showcase';
import { buildDataData } from './ui-molecule-data.showcase';
import type { ShowcaseComponent } from '../showcase.types';

export function buildOrganismsData(): ShowcaseComponent[] {
  return [
    ...buildContainerData(),
    ...buildFeedbackData(),
    ...buildNavigationData(),
    ...buildOverlayData(),
    ...buildDataData(),
  ];
}
