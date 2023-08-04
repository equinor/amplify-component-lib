/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { GraphUser } from './GraphUser';

export type Feature = {
  uuid?: string | null;
  featureKey?: string | null;
  description?: string | null;
  activeUsers?: Array<GraphUser> | null;
  activeEnvironments?: Array<string> | null;
};
