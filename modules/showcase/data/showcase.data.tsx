'use client';
export type { ShowcaseVariant, ShowcaseComponent } from './showcase.types';
import { buildAtomsData } from './sections/ui-atoms.showcase';
import { buildMoleculesData } from './sections/ui-molecules.showcase';
import { buildOrganismsData } from './sections/ui-organisms.showcase';
import { buildAppPatternsData } from './sections/app-patterns.showcase';
import { buildAppLayoutData } from './sections/app-layout.showcase';
import { buildEcommerceData } from './sections/domain-ecommerce.showcase';
import { buildFintechData } from './sections/domain-fintech.showcase';
import { buildHealthData } from './sections/domain-health.showcase';
import { buildEducationData } from './sections/domain-education.showcase';
import { buildLogisticsData } from './sections/domain-logistics.showcase';
import { buildHRData } from './sections/domain-hr.showcase';
import { buildRealEstateData } from './sections/domain-realestate.showcase';
import { buildTravelData } from './sections/domain-travel.showcase';
import { buildContentData } from './sections/domain-content.showcase';
import { buildManufacturingData } from './sections/domain-manufacturing.showcase';
import { buildNewsData } from './sections/domain-news.showcase';
import { buildSaasData } from './sections/domain-saas.showcase';
import { buildRestaurantData } from './sections/domain-restaurant.showcase';
import { buildEventData } from './sections/domain-event.showcase';
import { buildSocialData } from './sections/domain-social.showcase';
import { buildVideoData } from './sections/domain-video.showcase';
import { buildEnergyData } from './sections/domain-energy.showcase';
import { buildLegalData } from './sections/domain-legal.showcase';
import { buildGovernmentData } from './sections/domain-government.showcase';

export function buildShowcaseData() {
  return [
    ...buildAtomsData(),
    ...buildMoleculesData(),
    ...buildOrganismsData(),
    ...buildAppPatternsData(),
    ...buildAppLayoutData(),
    ...buildEcommerceData(),
    ...buildFintechData(),
    ...buildHealthData(),
    ...buildEducationData(),
    ...buildLogisticsData(),
    ...buildHRData(),
    ...buildRealEstateData(),
    ...buildTravelData(),
    ...buildContentData(),
    ...buildManufacturingData(),
    ...buildNewsData(),
    ...buildSaasData(),
    ...buildRestaurantData(),
    ...buildEventData(),
    ...buildSocialData(),
    ...buildVideoData(),
    ...buildEnergyData(),
    ...buildLegalData(),
    ...buildGovernmentData(),
  ];
}
