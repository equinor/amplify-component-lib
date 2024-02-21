/* generated using openapi-typescript-codegen -- do no edit */
/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import { CustomTutorialStep } from './CustomTutorialStep';
import { GenericTutorialStep } from './GenericTutorialStep';

export type Tutorial = {
  id: string;
  name: string;
  shortName: string;
  path: string;
  application: string;
  steps: Array<CustomTutorialStep | GenericTutorialStep>;
  showInProd: boolean;
  willPopUp: boolean;
  dynamicPositioning?: boolean | null;
};
