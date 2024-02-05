import { ReactElement } from 'react';

// export type Tutorial = {
//   name: string;
//   shortName: string;
//   path: string;
//   dynamicPositioning?: boolean;
//   steps: Array<GenericTutorialStep | CustomTutorialStep>;
// };
//
// export enum TutorialDialogPosition {
//   TOP_LEFT = 'top_left',
//   TOP_RIGHT = 'top_right',
//   BOTTOM_LEFT = 'bottom_left',
//   BOTTOM_RIGHT = 'bottom_right',
//   CENTER = 'center',
// }
//
// type TutorialStepBase = {
//   position?: TutorialDialogPosition;
// };
//
// export type GenericTutorialStep = TutorialStepBase & {
//   title: string;
//   body: string;
//   key?: undefined;
//   imgUrl?: string;
// };
//
// export type CustomTutorialStep = TutorialStepBase & {
//   key: string;
// };

export type HighlightingInfo = {
  top: number;
  left: number;
  width: number;
  height: number;
};

export type CustomTutorialComponent = {
  key: string;
  element: ReactElement;
};
