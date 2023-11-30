/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { Feature } from './Feature';

export type FeatureToggleDto = {
  applicationName: string;
  features: Array<Feature>;
};
